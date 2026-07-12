#!/usr/bin/env python3
"""
Generuje supabase/seed.sql z src/lib/products.ts (źródło prawdy z naniesionymi
poprawkami nazw/zdjęć/kategorii). Jednorazowy bootstrap katalogu do Supabase.

Uruchom:  python3 scripts/gen_seed.py
Następnie zastosuj w Supabase: migracje 0001, 0002, potem seed.sql.

Ceny (variants.base_price) ustawiane są na 0 — uzupełnisz je w panelu admina.
Skrypt jest idempotentny (ON CONFLICT), więc można go puścić ponownie.
"""
import json
import re
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src", "lib", "products.ts")
OUT = os.path.join(ROOT, "supabase", "seed.sql")

BRAND_BANNER = {"6-zero": "/banner-6zero.jpg"}


def sql_str(s):
    """Bezpieczny literał tekstowy SQL."""
    if s is None:
        return "null"
    return "'" + str(s).replace("'", "''") + "'"


def sql_text_array(items):
    """Literał text[] Postgresa."""
    if not items:
        return "'{}'"
    parts = []
    for it in items:
        parts.append('"' + str(it).replace("\\", "\\\\").replace('"', '\\"') + '"')
    inner = ",".join(parts)
    return "'{" + inner.replace("'", "''") + "}'"


def extract_products(ts_source):
    """Wyłuskuje tablicę ALL_PRODUCTS (poprawny JSON) z pliku .ts."""
    m = re.search(r"ALL_PRODUCTS\s*:\s*Product\[\]\s*=\s*(\[)", ts_source)
    if not m:
        raise SystemExit("Nie znaleziono ALL_PRODUCTS w products.ts")
    start = m.end() - 1  # pozycja '['
    depth = 0
    for i in range(start, len(ts_source)):
        ch = ts_source[i]
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                return json.loads(ts_source[start : i + 1])
    raise SystemExit("Nie udało się sparsować tablicy ALL_PRODUCTS")


def main():
    with open(SRC, encoding="utf-8") as f:
        products = extract_products(f.read())

    # Zbierz kategorie i marki (zachowaj kolejność pierwszego wystąpienia).
    categories = {}  # slug -> name
    brands = {}      # slug -> name
    for p in products:
        for c in p.get("categories", []):
            categories.setdefault(c["slug"], c["name"])
        if p.get("categorySlug"):
            categories.setdefault(p["categorySlug"], p["category"])
        if p.get("brandSlug"):
            brands.setdefault(p["brandSlug"], p["brand"])

    out = []
    out.append("-- WYGENEROWANE przez scripts/gen_seed.py — nie edytuj ręcznie.")
    out.append("-- Bootstrap katalogu do Supabase. Zastosuj po migracjach 0001 i 0002.\n")
    out.append("begin;\n")

    # Kategorie
    out.append("-- Kategorie")
    for i, (slug, name) in enumerate(categories.items()):
        out.append(
            f"insert into categories (slug, name, sort) values "
            f"({sql_str(slug)}, {sql_str(name)}, {i}) "
            f"on conflict (slug) do update set name = excluded.name, sort = excluded.sort;"
        )
    out.append("")

    # Marki
    out.append("-- Marki")
    for slug, name in brands.items():
        banner = BRAND_BANNER.get(slug)
        out.append(
            f"insert into brands (slug, name, banner_image) values "
            f"({sql_str(slug)}, {sql_str(name)}, {sql_str(banner)}) "
            f"on conflict (slug) do update set name = excluded.name, "
            f"banner_image = excluded.banner_image;"
        )
    out.append("")

    # Produkty
    out.append("-- Produkty")
    for p in products:
        brand_sel = (
            f"(select id from brands where slug = {sql_str(p['brandSlug'])})"
            if p.get("brandSlug")
            else "null"
        )
        cat_sel = (
            f"(select id from categories where slug = {sql_str(p['categorySlug'])})"
            if p.get("categorySlug")
            else "null"
        )
        out.append(
            "insert into products (slug, name, short_description, description, "
            "brand_id, primary_category_id, image, images, in_stock, variant_attribute) values (\n"
            f"  {sql_str(p['slug'])}, {sql_str(p['name'])}, "
            f"{sql_str(p.get('shortDescription',''))}, {sql_str(p.get('description',''))},\n"
            f"  {brand_sel}, {cat_sel}, {sql_str(p.get('image',''))}, "
            f"{sql_text_array(p.get('images', []))}, {str(bool(p.get('inStock', True))).lower()}, "
            f"{sql_str(p.get('variantAttribute',''))}\n"
            ") on conflict (slug) do update set "
            "name = excluded.name, short_description = excluded.short_description, "
            "description = excluded.description, brand_id = excluded.brand_id, "
            "primary_category_id = excluded.primary_category_id, image = excluded.image, "
            "images = excluded.images, in_stock = excluded.in_stock, "
            "variant_attribute = excluded.variant_attribute;"
        )
    out.append("")

    # Powiązania produkt–kategoria (M:N)
    out.append("-- Powiązania produkt–kategoria")
    for p in products:
        for c in p.get("categories", []):
            out.append(
                "insert into product_categories (product_id, category_id) values ("
                f"(select id from products where slug = {sql_str(p['slug'])}), "
                f"(select id from categories where slug = {sql_str(c['slug'])})) "
                "on conflict do nothing;"
            )
    out.append("")

    # Warianty (base_price = 0 — do uzupełnienia w adminie)
    out.append("-- Warianty (ceny = 0, uzupełnij w panelu admina)")
    for p in products:
        variants = p.get("variants", [])
        if not variants:
            # produkt bez wariantów → jeden domyślny wariant, by móc dodać cenę/koszyk
            out.append(
                "insert into variants (product_id, value, base_price, in_stock, sort) values ("
                f"(select id from products where slug = {sql_str(p['slug'])}), "
                f"{sql_str('default')}, 0, {str(bool(p.get('inStock', True))).lower()}, 0) "
                "on conflict (product_id, value) do nothing;"
            )
            continue
        for i, v in enumerate(variants):
            out.append(
                "insert into variants (product_id, value, base_price, in_stock, sort) values ("
                f"(select id from products where slug = {sql_str(p['slug'])}), "
                f"{sql_str(v['value'])}, 0, {str(bool(v.get('inStock', True))).lower()}, {i}) "
                "on conflict (product_id, value) do update set in_stock = excluded.in_stock, "
                "sort = excluded.sort;"
            )
    out.append("")
    out.append("commit;")

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("\n".join(out) + "\n")

    print(f"OK — {len(products)} produktów, {len(categories)} kategorii, "
          f"{len(brands)} marek → {os.path.relpath(OUT, ROOT)}")


if __name__ == "__main__":
    main()

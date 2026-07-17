"""Regenerate the static blog post cards and category filters in blog/index.html
from blog/posts.json.

blog/posts.json remains the single source of truth for post data (HK-004).
Run this script any time posts.json changes so the cards committed in
blog/index.html stay in sync with it:

    python3 scripts/generate_blog_cards.py
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
POSTS_JSON = ROOT / "blog" / "posts.json"
BLOG_INDEX = ROOT / "blog" / "index.html"

MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

PLACEHOLDER_SVG = (
    '<svg width="80" height="80" viewBox="0 0 80 80" fill="none" '
    'xmlns="http://www.w3.org/2000/svg">'
    '<rect x="10" y="10" width="60" height="60" stroke="#0D1F2D" stroke-width="1" fill="none"/>'
    '<path d="M10 50 L30 30 L45 45 L55 35 L70 50" stroke="#0D1F2D" stroke-width="1.5" fill="none"/>'
    '<circle cx="25" cy="28" r="5" stroke="#0D1F2D" stroke-width="1" fill="none"/>'
    "</svg>"
)


def format_date(date_str):
    y, m, d = date_str.split("-")
    return f"{MONTHS[int(m) - 1]} {int(d)}, {y}"


def render_card(post, featured):
    url = f"/blog/{post['slug']}.html"
    date_str = format_date(post["date"])
    if post.get("image"):
        img = f'<img src="{post["image"]}" alt="{post["title"]}" loading="lazy">'
    else:
        img = f'<div class="post-image-placeholder">{PLACEHOLDER_SVG}</div>'

    featured_class = " post-card--featured" if featured else ""
    return f"""      <a href="{url}" class="post-card{featured_class}" data-cat="{post['category']}">
        <div class="post-image">{img}</div>
        <div class="post-body">
          <div class="post-meta">
            <span class="post-category">{post['category']}</span>
            <span class="post-location">{post['location']}</span>
          </div>
          <h2 class="post-title">{post['title']}</h2>
          <p class="post-excerpt">{post['excerpt']}</p>
          <span class="post-read-more">Read article →</span>
          <p class="post-author">{post['author']} &middot; {date_str}</p>
        </div>
      </a>"""


def render_filter_button(cat, active):
    label = "All Posts" if cat == "all" else cat
    active_class = " active" if active else ""
    return f'      <button class="filter-btn{active_class}" data-cat="{cat}">{label}</button>'


def replace_between(html, start_marker, end_marker, new_content):
    pattern = re.compile(
        re.escape(start_marker) + r".*?" + re.escape(end_marker), re.DOTALL
    )
    replacement = f"{start_marker}\n{new_content}\n      {end_marker}"
    new_html, count = pattern.subn(replacement, html)
    if count != 1:
        raise RuntimeError(f"Expected exactly one match for markers {start_marker}/{end_marker}, found {count}")
    return new_html


def main():
    posts = json.loads(POSTS_JSON.read_text(encoding="utf-8"))
    html = BLOG_INDEX.read_text(encoding="utf-8")

    cards_html = "\n".join(
        render_card(p, i == 0 and p.get("featured", False))
        for i, p in enumerate(posts)
    )
    html = replace_between(html, "<!-- BLOG_CARDS_START -->", "<!-- BLOG_CARDS_END -->", cards_html)

    categories = ["all"] + sorted({p["category"] for p in posts}, key=lambda c: c.lower())
    seen = set()
    ordered_cats = []
    for c in categories:
        if c not in seen:
            seen.add(c)
            ordered_cats.append(c)
    filters_html = "\n".join(
        render_filter_button(c, active=(c == "all")) for c in ordered_cats
    )
    html = replace_between(html, "<!-- BLOG_FILTERS_START -->", "<!-- BLOG_FILTERS_END -->", filters_html)

    BLOG_INDEX.write_text(html, encoding="utf-8")
    print(f"Wrote {len(posts)} post cards and {len(ordered_cats)} filters into {BLOG_INDEX}")


if __name__ == "__main__":
    main()

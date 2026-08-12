# T-28 — Local Crawl Health Baseline (partial, repo-source-level)

**Date:** 2026-08-12. Scope covered here: internal link integrity and JSON-LD syntax validity, checked directly against repo source (49 HTML files: root pages, `pages/`, `pages/locations/`, `blog/`, excluding `_TEMPLATE.html`).

**Not yet covered** (needs a live crawl or manual pass, deferred): duplicate title/meta-description detection across all 45 pages (T-03 spot-checked priority pages only), mobile layout/CLS check, working forms/nav check, live redirect chains (see T-06/T-07/T-09 — blocked on the `.htaccess` question). Full T-28 close-out should happen after Phase 2/3 land, per the spec's own placement of validation after the changes it validates.

## Internal links

Checked both `href="/absolute/path"` and relative (`href="file.html"`) and full-domain (`href="https://handkindconstruction.ca/..."`) internal links across all 49 files against the actual file tree.

**Result: 0 broken internal links found.** Every internal link resolves to a real file.

## JSON-LD

Extracted every `<script type="application/ld+json">` block across all 49 files and parsed each as JSON.

**Result: 0 parse errors.** Every JSON-LD block on the site is syntactically valid.

## Conclusion

The site's internal linking and structured-data syntax are both in good shape at the source level — no cleanup needed before Phase 2/3 work begins. This is a good sign that prior remediation passes (referenced in `ACTION-PLAN.md`, `HOMEPAGE-REMEDIATION-SPEC.md`) already caught the obvious breakage; what's left is genuinely about strategy/access (T-04, T-05) and the hosting-redirect mystery (T-01), not basic hygiene.

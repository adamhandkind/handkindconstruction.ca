# T-10 / T-11 — Sitemap & Robots Audit

Unlike T-06/T-07/T-09 (canonical-host redirects), these two don't depend on resolving the `.htaccess`/deploy-pipeline mystery in T-01 — they're pure repo-content checks.

## T-10 — Sitemap cleanup

**Result: already clean, no changes needed.**

Cross-checked every `<loc>` in `sitemap.xml` (45 entries) against the T-02 real URL inventory:
- All 45 real indexable pages are present: homepage, privacy, 4 core service pages, 9 other content pages (services/estimate/projects/contact/process/about/reviews/faq/careers), blog index, 10 project pages, 16 blog posts, 3 location pages.
- `pages/locations/cambridge.html` is correctly **excluded** — consistent with the prior "Cambridge deindex" decision (commit `2e55952`, 2026-07-17). Good — confirms that exclusion was intentional and is still being honored.
- No `www`/`http` variants, no `rwg_token` params, no bare `/blog` or `/blog/index.html` duplicate, no `404.html` or `thank-you.html` (correctly non-indexable pages).
- Every `<loc>` uses apex-https, matching the canonical scheme.
- `<lastmod>` dates are present and look genuine (span 2026-05-28 → 2026-08-05, matching real commit activity) rather than placeholder/static dates.

**Conclusion:** T-10 is done. No sitemap edit required this pass — the file was already well-maintained.

## T-11 — robots.txt verification

**Result: already correct, no changes needed.**

- `Allow: /` for `Googlebot`, `Bingbot`, `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `anthropic-ai`, `Bytespider`, and the wildcard `User-agent: *` — `/pages/` and `/blog/` are fully crawlable (no path-specific `Disallow` anywhere in the file).
- No blocking of `/css/` or `/js/` — render-critical assets are crawlable.
- `Sitemap: https://handkindconstruction.ca/sitemap.xml` is present and correctly points at the apex-https sitemap.
- Two crawlers are deliberately blocked (`CCBot`, `cohere-ai` — both `Disallow: /`) — a content-scraping opt-out choice, not a technical-SEO problem.

**Conclusion:** T-11 is done. No robots.txt edit required.

## Net effect on T-10/T-11 line items

Both can be marked **done** in `_progress.md` with no production change needed — worth noting as a rare case in this audit where "the fix" is confirming there's nothing to fix.

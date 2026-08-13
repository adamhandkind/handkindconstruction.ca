# SEO Implementation — Resume Ledger

Source spec: `HANDKIND_SEO_IMPLEMENTATION_v2.5_FINAL.md` (2026-08-12). Read `/seo/*.md` files below before resuming any session — they hold the durable state.

Phasing (§0.7): **Phase 1** evidence/baselines (read-only) → **Phase 2** technical foundation → **Phase 3** on-page (gated on T-04+T-05) → **Phase 4** expansion/authority/measurement.

| Task | Phase | Status | Commit | Notes/blocker |
|---|---|---|---|---|
| T-01 | 1 | done | — | Platform inventoried. **Critical finding:** live host is real Apache (132.148.183.84), NOT GitHub Pages despite `.github/workflows/static.yml` and `HOMEPAGE-REMEDIATION-SPEC.md` claiming GH Pages. `.htaccess` redirects (https-force, non-www-force, `/index.html`→`/`, `/blog/index.html`→`/blog/`) are committed but **not functioning live** — http/www/https-www all return 200 identically. User confirmed deploy is cPanel Git/FTP auto-deploy, separate from the GH Pages workflow. Root cause (AllowOverride off vs. `.htaccess` not syncing, e.g. FTP tools hiding dotfiles) unconfirmed — needs hosting-panel check. See `preflight-inventory.md`. |
| T-02 | 1 | done | — | Real inventory: ~44 indexable pages (not ~1,000). Full table in `preflight-inventory.md`. Flagged: `pages/locations/cambridge.html` exists but isn't one of the spec's 3 named location pages — prior commit shows a "Cambridge deindex" pass (2026-07-17); verify current indexability intent in Phase 2. |
| T-03 | 1 | done | — | Metadata snapshot of priority pages captured from repo source (not live-verified, per T-01 caveat). All pages have unique titles/descriptions and correct self-canonicals already. `preflight-inventory.md`. |
| T-04 | 1 | blocked | — | BLOCKED — DATA ACCESS REQUIRED. Needs GSC filtered export or Search Console API access to map query→landing page. Gates Phase 3 (all title/content changes). |
| T-05 | 1 | blocked | — | BLOCKED — needs Google Business Profile confirmation or direct answer from Adam on legal name/address/public phone/email. Gates all schema/contact work. |
| T-36a | 1 | **done** | — | GA4 (`G-2Q3G09W17B`) already tracks `phone_click`, `email_click`, `generate_lead` (form submit via thank-you.html), and CTA/engagement events. See `tracking-audit.md`. Estimate-vs-contact form split fixed 2026-08-13 (`thank-you.html` now sets `form_id` from `document.referrer`). |
| T-35 | 1 | todo | — | GBP audit — Adam-facing (needs GBP dashboard access). |
| T-37 | 1 | blocked | — | BLOCKED — DATA ACCESS REQUIRED (Ahrefs/Semrush not connected). |
| T-38 | 1 | **done (provisional)** | — | Audited against known in-code NAP (not yet T-05-confirmed) — see `citation-audit.md`. **No NAP conflicts** across Yelp, YellowPages, Town of Paris directory, D&B, ZoomInfo, Yably — all consistent. Real finding is **coverage, not accuracy**: no claimed presence found on Bing Places, Apple Business Connect, HomeStars, or Houzz — all free and where tracked competitors do show up. Facebook NAP unverified (page didn't render via fetch). Re-verify once T-05 formally closes. |
| T-39 | 1 | blocked | — | BLOCKED — DATA ACCESS REQUIRED (same as T-37). |
| T-41 | 1 | **done (directional)** | — | The `handkind-seo-tracker` dashboard can't actually run in this Artifact publishing environment (needs direct Anthropic API fetch + `window.storage`, neither available — only `downloads`/`mcp` capabilities are granted here). Substituted WebSearch-based directional visibility research across the 8 tracked keywords — see `competitor-audit.md`. **Not verified numeric rank data** — no local pack visibility either. Key finding: HandKind shows up for its own long-tail Paris/Brantford/Brant-County combo terms but is absent from shorter high-volume commercial terms (matches spec's GSC evidence exactly). Hache Construction is the most consistently visible competitor. For real position tracking, either run the dashboard from within claude.ai directly, or connect a rank-tracking API. |
| T-42 | 1 | blocked | — | BLOCKED — DATA ACCESS REQUIRED. PageSpeed Insights public API quota is exhausted for the shared default project (no personal API key configured). Needs a Google API key (PageSpeed Insights API enabled) to proceed, or Adam can run PSI manually via the web UI and share results. |
| T-06, T-07, T-09 | 2 | blocked | — | Redirect-dependent tasks — blocked behind T-01's open question: confirm root cause of non-functioning `.htaccess` before editing it further (editing a file that already isn't taking effect risks no signal that anything changed). |
| T-08 | 2 | **done** | — | Self-referential canonicals already correct site-wide per T-03 metadata snapshot. |
| T-10 | 2 | **done** | — | Sitemap already clean — all 45 real pages present, `cambridge.html` correctly excluded, no param/host variants. No edit needed. See `sitemap-robots-audit.md`. |
| T-11 | 2 | **done** | — | `robots.txt` already correct — `/pages/`, `/blog/`, `/css/`, `/js/` all crawlable, sitemap referenced. No edit needed. See `sitemap-robots-audit.md`. |
| T-12–T-25 | 3 | blocked | — | Gated on T-04 + T-05 per spec — not started. |
| T-26–T-27 | 4 | blocked | — | Depends on T-04. |
| T-28 | Required | **partial** | — | Repo-source pass done: 0 broken internal links, 0 JSON-LD parse errors across all 49 HTML files. See `crawl-health-baseline.md`. Duplicate-title/meta check, mobile/CLS, live redirect chains still deferred to after Phase 2/3. |
| T-29 | Required | blocked | — | Blocked with T-06/T-07/T-09 — validates redirect behavior that isn't implemented yet. |
| T-30 | Required | **done** | — | All 45 sitemap URLs return live 200 directly, zero redirects, zero duplicates. See `sitemap-robots-audit.md`. |
| T-31–T-34 | Required | todo | — | Mostly executable once earlier phases land. |
| T-36 | 4 | todo | — | Review acquisition — Adam-facing, can start anytime in parallel. |
| T-40 | 4 | blocked | — | Depends on T-39. |

## Open items needing Adam
1. **Hosting panel access** (or a direct answer): is `AllowOverride All` enabled for the handkindconstruction.ca vhost, and does the cPanel Git/FTP deploy actually transfer the `.htaccess` file (dotfiles are sometimes excluded by default in FTP clients/deploy configs)? This blocks T-06 with any confidence.
2. **GSC access** (T-04) — filtered query×page export or Search Console API credentials.
3. **GBP access or direct NAP confirmation** (T-05) — legal name, address, public phone, public email.
4. **Ahrefs/Semrush** (T-37, T-39) — if not available, those tasks stay blocked per spec (never fabricate).

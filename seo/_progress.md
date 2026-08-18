# SEO Implementation — Resume Ledger

Source spec: `HANDKIND_SEO_IMPLEMENTATION_v2.6.md` (2026-08-18, GSC export dated 2026-08-18). **This supersedes the prior v2.5 ledger** — v2.5 was never saved as a file, only tracked here. Task IDs below are the **new** doc's numbering; carried-forward findings from the v2.5 session are noted where the substance still applies. Read `/seo/*.md` files below before resuming any session — they hold the durable state.

Phasing (§0.4): **Phase 1** evidence/baselines (read-only, no changes) → **Phase 2** technical foundation → **Phase 3** on-page (gated on T-05+T-06) → **Phase 4** expansion/authority/measurement.

| Task | Phase | Status | Notes/blocker |
|---|---|---|---|
| T-01 | 1 | **done — big update** | Live curl check 2026-08-18: **all canonicalization now fully fixed**, single-hop, verified live: `http→https` ✅, `www→apex` ✅, `/index.html→/` ✅ (this was the one still-broken rule as of the last v2.5 session — now resolved), `/blog→/blog/` ✅, `/blog/index.html→/blog/` ✅. Whatever Adam/hosting-panel fix was applied between 2026-08-13 and now, it worked. Carries forward: platform is real Apache (132.148.183.84) via cPanel Git/FTP deploy, not GitHub Pages despite the repo's `.github/workflows/static.yml`. |
| T-02 | 1 | done (carried forward) | Real inventory ~44-45 indexable pages. See `preflight-inventory.md`. Not re-verified against live `<head>` this session — do that before Phase 3 title/meta work. |
| T-03 | 1 | done (carried forward) | Basement page = `pages/basement-finishing-brantford.html` (title/meta/H1 already fixed for "renovation" terminology, see old T-14). Additions/ARU page confirmed to exist. No new URL creation needed. |
| T-04 | 1 | **done** | Fresh live snapshot (2026-08-18) of all 45 indexable pages — title/desc/canonical/JSON-LD. All canonicals, descriptions, and JSON-LD present and correct. 20 pages have titles >60 chars, 10 have descriptions outside 120-165 chars (mostly priority service pages, on the long side) — real candidate list for T-13/T-14, held pending T-05. See `preflight-inventory.md` §"2026-08-18 Live re-audit". |
| T-05 | 1 | **partially done (stale — needs re-export)** | Old T-04's query-page-map work (`query-page-map.md`) covered several priority queries (general contractor, general contractor brantford, contractor near me, kitchen renovations near me, basement renovation brantford) against the **prior** GSC period. This doc's baseline (§2/§3) is a **new** 28-day window (dated 2026-08-18) — re-confirm those queries still map the same way before relying on them, and fill in the remaining priority queries listed in this doc's T-05. Still gates Phase 3. |
| T-06 | 1 | **done (carried forward)** | Adam confirmed 2026-08-13: NAP is HandKind Construction · 20 Balmoral St, Paris, ON N3L 0C8 · (226) 938-7108 · hello@handkindconstruction.ca. Already applied to schema (postal code fix, commit `1ae27b3`). |
| T-34a | 1 | done (carried forward) | GA4 (`G-2Q3G09W17B`) tracks `phone_click`, `email_click`, `generate_lead`; estimate-vs-contact split fixed. See `tracking-audit.md`. |
| T-35 | 1 | todo | GBP audit — Adam-facing. |
| T-37 | 1 | blocked | BLOCKED — DATA ACCESS REQUIRED (Ahrefs/Semrush not connected). |
| T-38 | 1 | blocked | Same as T-37 (this doc's T-38 = old T-37, authority baseline). |
| T-39 | 1 | done (provisional, carried forward) | `citation-audit.md` — no NAP conflicts found across Yelp, YellowPages, Town of Paris directory, D&B, ZoomInfo, Yably. Gaps: no presence on Bing Places, Apple Business Connect, HomeStars, Houzz. Facebook unverified. |
| T-41 | 1 | done (directional, carried forward) | `competitor-audit.md` — WebSearch-based, not real rank-tracker data. Hache Construction most visible competitor. |
| T-42 | 1 | blocked | BLOCKED — DATA ACCESS REQUIRED. PSI public API quota exhausted, no personal key configured. |
| T-07 | 2 | **done** | = old T-06/T-07. Confirmed live 2026-08-18, see T-01 above. |
| T-08 | 2 | **done** | Blog canonicalization confirmed live 2026-08-18. |
| T-09 | 2 | **done** | Live-verified 2026-08-18 across all 45 indexable pages — 100% pass, every page has exactly one self-referential apex-https canonical, zero mismatches, zero missing. No action needed. |
| T-10 | 2 | done (carried forward) | rwg_token params — no action needed, sitemap/canonical already clean. |
| T-11 | 2 | **done (live-reverified 2026-08-18)** | Sitemap has 46 URLs (45 indexable pages + `/privacy.html`), all apex-https, zero param/host variants, matches the live indexable set exactly (correctly excludes `cambridge.html` and the noindex `project-kathleen-garage-paris.html` stub). All 46 URLs confirmed returning live 200 with zero redirects — closes T-31 too. |
| T-12 | 2 | **done (live-reverified 2026-08-18)** | robots.txt live-fetched: `Allow: /` for all major crawlers (Google, Bing, GPTBot, ClaudeBot, Perplexity, etc.), `Disallow: /` only for CCBot/cohere-ai, sitemap correctly referenced. |
| T-13–T-14 | 3 | blocked | Gated on T-05 re-export. |
| T-15 | 3 | partial (carried forward) | Basement page terminology fix done (old T-14). Full audit (permits/mechanical/cross-links) not yet done. |
| T-16 | 3 | todo | Additions/ARU page full audit not yet done. |
| T-17 | 3 | blocked | Gated on T-05 (kitchen cannibalization check needs fresh query data). |
| T-18 | 3 | todo | Bathroom page full audit not yet done. |
| T-19–T-22 | 3 | done (carried forward) | Homepage anchors, blog→money-page routing, service↔location cross-links, project→service links all previously verified/fixed (old T-18–T-21). Spot-check post-Phase-3 content edits don't regress these. |
| T-23–T-25 | 3 | done (carried forward) | Business entity schema (NAP fixed, `sameAs`/typed areaServed still open low-priority), BreadcrumbList, Service schema all previously verified (old T-22–T-24). |
| T-26 | 3 | done (carried forward) | FAQ visible content exists on 9 pages, no rich-result schema chase needed (old T-25). |
| T-27–T-28 | 4 | mixed | T-28 (location-page depth) done, no changes needed (old T-27) — testimonials gap acknowledged, Adam confirmed skip. T-27 (new-page-opportunities) blocked on T-05. |
| T-29 | Required | **partial (done: link crawl; todo: mobile/CLS/forms)** | Live link-crawl 2026-08-18: extracted all 53 unique internal hrefs (pages + assets: favicons, CSS, one project image) across all 45 pages, every one returns live 200, zero 404s. Mobile layout, CLS, and working-forms checks still need a browser pass, not done this session. |
| T-30 | Required | **done** | Redirect validation = this session's T-01 curl re-check. All clean. |
| T-31 | Required | **done (live-reverified 2026-08-18)** | All 46 sitemap URLs return live 200, zero redirects — see T-11. |
| T-32 | Required | **partial (done: syntax; todo: type/property completeness)** | JSON syntax validated 2026-08-18: all 71 JSON-LD blocks across all 45 live pages parse cleanly, zero errors. Type-level validation (required/recommended properties per Schema.org type, Rich Results eligibility) still needs Google's Rich Results Test / Schema.org validator — no API access to automate that from here; Adam or a follow-up session should paste priority-page URLs into https://search.google.com/test/rich-results manually. |
| T-33 | Required | todo | Resubmit sitemap / request indexing — not yet done. |
| T-36 | 4 | todo | Review acquisition — Adam-facing. |
| T-40 | 4 | blocked | Depends on T-38. |
| T-43 | Required | blocked | = old T-42, same PSI blocker. |

## Open items needing Adam
1. **What changed to fix the redirects?** Confirm whether the `/index.html→/` fix (and general redirect stability) was applied server-side again, or whether repo `.htaccess` finally synced — matters for whether future deploys could silently regress it.
2. **Fresh GSC filtered query×page export** (T-05) — the old export is now stale against this doc's 2026-08-18 baseline.
3. **GBP dashboard access** (T-35, T-36).
4. **Ahrefs/Semrush or equivalent** (T-37/T-38, T-40) — still blocked without it.
5. **PageSpeed Insights API key** (T-42/T-43) — or Adam runs PSI manually via web UI and shares results.

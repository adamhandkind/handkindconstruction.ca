# T-04 — Query × Landing-Page Map

**Status: template ready, not yet filled in.** The bulk GSC export received 2026-08-13 (`Queries.csv`/`Pages.csv`) confirmed the same limitation the spec already flagged — it's two independent aggregates, not a query→page join, and `Queries.csv` still only covers ~50% of clicks (GSC hides low-volume query rows). Filling this table needs a per-query filtered look in the GSC UI.

## How to fill each row (a few minutes per query)

1. Go to **Search Console → Performance → Search results**.
2. Click **+ New** filter → **Query** → **is exactly** → paste one query from the table below → **Apply**. Keep the date range at **Last 3 months** to match the existing baseline.
3. With that filter active, click the **Pages** tab (next to Queries/Countries/Devices).
4. Note the **top URL** listed (that's the confirmed ranking page for this query) and its Impr/Clicks/Position from the **Queries** tab total for the filtered query.
5. Fill the row below. If two+ pages both get meaningful impressions for the same query, note both — that's cannibalization (flag it in Action).
6. Compare "Ranking URL" against "Intended URL" (which page *should* own this term based on its content) — if they differ, that's the action item.

## Priority commercial queries (from spec §T-04)

| Query | Impr | Clicks | Position | Ranking URL | Intended URL | Action |
|---|---:|---:|---:|---|---|---|
| contractor near me | 1113 | 0 | 5.83 | Homepage — confirmed. (GSC's "contains" filter also captured 5 related variants — general contractor near me, renovations contractor near me, etc. — all summed to exactly the homepage's 1,286 total impressions, so homepage is 100% of the traffic across every near-me contractor variant.) | `/` (no single service fits — likely homepage) | **Matches original spec baseline exactly** (1,128 impr/5.8 pos there vs 1,113/5.83 here — stable over time). Decent position, **zero clicks** on the single highest-impression query on the whole site — worth a title/snippet audit (T-12) once T-04 fully closes, since this is the single biggest click-capture opportunity identified anywhere in this doc. |
| general contractor | 138 | 1 | 1.7 | Homepage — confirmed (`/pages/locations/paris.html` picked up 1 stray impression, negligible) | `/` or `/pages/services.html` | **None needed structurally** — position 1.7 is excellent. Very low CTR (~0.7%) despite top position is odd though; possible SERP-feature competition (ads/map pack) eating clicks even at organic #1-2. Not a page-ownership problem, just a click-capture curiosity worth keeping in mind for T-12. |
| general contractor brantford | 58 | 3 | 2.14 | `/` (homepage) — confirmed via GSC, all `rwg_token` variants also resolve to homepage | `/` or `/pages/services.html` or `/pages/locations/brantford.html` | **None needed** — position 2.14 already strong, homepage correctly owns this term |
| brantford general contractors | | | | | same as above | |
| home renovation brantford | | | | | `/` or `/pages/locations/brantford.html` | |
| home renovations brantford | | | | | same as above | |
| kitchen renovation brantford | | | | | `/pages/kitchen-renovation-brantford.html` | |
| kitchen renovations brantford | | | | | same as above | |
| kitchen contractors | | | | | `/pages/kitchen-renovation-brantford.html` | |
| bathroom renovation brantford | | | | | `/pages/bathroom-renovation-brantford.html` | |
| bathroom renovations brantford | | | | | same as above | |
| bathroom contractor | | | | | `/pages/bathroom-renovation-brantford.html` | |
| basement renovation brantford | 316 | 1 | 18.44 | **Not** the dedicated basement page. Homepage 262 impr/1 click/pos 13.74; `/pages/projects.html` 34 impr/pos 49.15; `/pages/project-full-basement-finish-brantford.html` 15 impr/pos 30.73; `/pages/services.html` 14 impr/pos 45.14; `/pages/bathroom-renovation-brantford.html` 7 impr/pos 38.86 | `/pages/basement-finishing-brantford.html` | **Cannibalization/relevance gap** — the dedicated basement page has **zero impressions** for its own core term. Homepage is carrying it at a decent position (13.74) while unrelated pages (bathroom page, projects hub) pick up scraps. Needs T-14 diagnosis: why isn't the basement page itself ranking at all for this term? |
| basement finishing brantford | | | | | same as above | |
| home additions | | | | | `/pages/home-additions-arus-brantford.html` | |
| home extensions | | | | | same as above | |
| construction paris ontario | | | | | `/pages/locations/paris.html` | |
| paris ontario construction | | | | | same as above | |

**"Intended URL" column above is my best guess from page content, not evidence — don't treat it as the answer.** The whole point of this table is to find out whether the *actual* ranking URL matches or not. Once filled in, this is what unblocks Phase 3 (T-12–T-25) per the spec's hard gate.

## Supplementary queries checked (not exact matches to the 18 priority terms above, logged for completeness)

| Query | Impr | Clicks | Position | Ranking URL |
|---|---:|---:|---:|---|
| handkind construction (branded) | 268 | 78 | 1.15 | Homepage — expected, not actionable |
| construction companies near me | 25 | 2 | 5.56 | Homepage — decent position/CTR, near-me variant of "contractor near me" (still pending below) |
| kitchen renovations near me | 122 | 1 | 10.94 | Split: homepage 108 impr/pos 24.68, kitchen page 110 impr/pos **14.79** — kitchen page outranks homepage here, unlike basement's total invisibility. Useful for T-16: not a cannibalization/indexation problem, points toward a genuine content-gap diagnosis instead. |
| brantford contractors (near-miss for "brantford general contractors" below) | 28 | 2 | 4.46 | Homepage — confirmed, decent position/CTR | 

## Refreshed top-line numbers (2026-08-13 export, Last 3 months window)

- True site total (Chart.csv): **265 clicks · 17,125 impressions** (spec's original baseline: 268 clicks · 17,057 impr — essentially flat, expected since this is a near-identical rolling 3-month window).
- `Queries.csv`: 671 rows, 133 clicks (50.2% of true total) — same truncation the spec warned about.
- `Pages.csv`: 1000 rows, 266 clicks (~100% of true total, pages aren't hidden the way queries are).
- Homepage: still the dominant page (~205 of 265 clicks, ~77%) — unchanged pattern from the spec's baseline.

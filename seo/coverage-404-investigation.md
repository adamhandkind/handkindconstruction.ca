# Coverage export finding — indexation gap + 404s (2026-08-13)

Not part of the spec's original task list — surfaced by the Coverage export Adam pulled alongside the Performance export. Worth investigating before/alongside T-04, since a low indexation rate would explain some of the "high impressions, zero clicks" pattern the spec is built around.

## What the export shows

As of 2026-08-06: **only 30 of 68 known URLs are indexed.** Breakdown of the 38 not indexed:

| Reason | Pages | Source |
|---|---:|---|
| Discovered – currently not indexed | 17 | Google systems |
| Alternative page with proper canonical tag | 11 | Website |
| Not found (404) | **8** | Website |
| Excluded by 'noindex' tag | 1 | Website |
| Page with redirect | 1 | Website |

**68 known URLs vs. our T-02 inventory of 45 real pages** — the gap (23 extra) is likely `rwg_token` homepage variants or old/stale URLs Google has discovered from historical crawls, consistent with the spec's existing note about `rwg_token` sprawl. Not necessarily alarming on its own.

**The 8 "Not found (404)" pages are the concerning one** — these are URLs Google tried to crawl and got a 404 for. Could be: genuinely deleted/renamed pages still linked somewhere, an artifact from when http/www weren't redirecting properly (pre-2026-08-13 fix), or something else. Can't tell which without seeing the actual URLs — the CSV export doesn't include per-URL detail, only counts by reason.

## How to find the specific 8 URLs in GSC

1. Go to **Search Console → Indexing → Pages** (this is the current-UI name for what used to be called "Coverage").
2. Scroll to the **"Why pages aren't indexed"** table.
3. Click the row **"Not found (404)"**.
4. This opens a detail view listing the actual URLs — there's an **Export** button (top right) to get them as a CSV/Sheets/Excel.
5. Same process works for the other reasons ("Alternative page with proper canonical tag", "Discovered – currently not indexed", etc.) if useful.

Once you have the list, share it here (or export and send the file) and I'll check each URL against the current site — whether it's a real deleted page needing a 301, a stale sitemap/internal-link reference that should be cleaned up, or something else (e.g. leftover from before the `.htaccess` fix).

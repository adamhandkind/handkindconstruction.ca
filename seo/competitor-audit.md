# T-41 — Competitor & Local-Pack SERP Audit

**Method note (important):** the `handkind-seo-tracker` skill's dashboard (which calls the Anthropic API directly from the browser + `window.storage`) **cannot run in this publishing environment** — this session's Artifact runtime only grants `downloads`/`mcp` capabilities, not direct API fetch or persistent client storage. Rather than publish a non-functional scan button, this pass used my own `WebSearch` tool directly against the 8 keywords the skill tracks.

**This is NOT a verified numeric rank checker.** WebSearch returns results ranked by relevance to my query, not a guaranteed replica of live Google/Bing SERP position 1–10 order, and it doesn't show the local pack (map results) at all. Treat everything below as **directional visibility** (who shows up / who doesn't for a given term), not as position data — the spec is explicit that rankings must never be fabricated, and I'm not going to assign a false `#4` to anything here. For real position-level tracking, either run the `handkind-seo-tracker` dashboard from within claude.ai directly (where its intended runtime may exist), or get a rank-tracking tool with API access.

**Date:** 2026-08-12 · **Search location:** not geo-pinned (WebSearch has no location parameter) · **Device:** n/a · **Local pack:** not observable via this method.

## Directional visibility by keyword (WebSearch results, first ~7 links each)

| Keyword | HandKind visible? | Competitors visible (of the 6 tracked) | Other domains showing up |
|---|---|---|---|
| home renovation Brantford (contractor) | **No** | reeddesignbuild.ca, joescarpentry.ca, frontierbuildinggroup.com, dacostageneral.com | eieihome.com (directory), insideoutcontracting.com, classicbrant.com |
| renovation contractor Brantford Ontario | **No** | joescarpentry.ca, reeddesignbuild.ca, frontierbuildinggroup.com, dacostageneral.com | eieihome.com, classicbrant.com |
| general contractor Paris Ontario | **No** | *(none of the 6 tracked appeared)* | Houzz, TrustedPros, StarOfService, YellowPages, ontariocontractingco.ca (a local competitor not currently tracked) |
| kitchen renovation Brantford | **No** | hacheco.com | HomeStars, kitchensbyauthentic.ca, renowell.ca, renomumu.ca, handymanconnection.com |
| bathroom renovation Brantford | **No** | frontierbuildinggroup.com, hacheco.com | easyrenovation.ca, HomeStars, bathroomrenovationsbrantford.ca, renomumu.ca, handymanconnection.com |
| general contractor Brantford | **No** | dacostageneral.com | HomeStars, Houzz, TrustedPros, Yelp, WINMAR, eieihome.com |
| home renovation Brant County | **Yes — #2 result** | frontierbuildinggroup.com, dacostageneral.com, classicbrant.com, hacheco.com | TRIDYS, Red Stone Contracting |
| renovation contractor Paris Brantford | **Yes — #1 and #4 results** (homepage + projects page) | classicbrant.com, hacheco.com | ontariocontractingco.ca, brantfordrenovationexperts.com, StarOfService |

## What this suggests (directional, matches the GSC baseline in the spec)

1. **HandKind is visible for its own long-tail combination terms** ("Paris" + "Brantford" + "Brant County" together) but **absent from the shorter, higher-volume commercial terms** — "kitchen renovation Brantford," "bathroom renovation Brantford," "general contractor Brantford," "general contractor Paris Ontario." This lines up exactly with the spec's GSC evidence (§3): high impressions, position ~14–22, ~0 clicks on those exact terms.
2. **Hache Construction (hacheco.com)** is the most consistently visible competitor — appeared in 5 of 8 searches, including both kitchen and bathroom service terms. Matches the spec's own "HIGH threat" classification.
3. **Frontier Building Group and DaCosta General** also show up broadly (4 of 8 and 5 of 8 respectively).
4. **Joe's Carpentry (joescarpentry.ca)** showed up for the broader Brantford terms but not the Paris-specific ones — consistent with the spec's note that it wins through location-page volume.
5. **LRC Construction (lrcinc.ca)** did not appear in any of these 8 searches — doesn't mean it isn't ranking (WebSearch ≠ SERP), but it didn't surface here despite being tracked as a "HIGH threat" in the spec.
6. **Reed Design-Build** appeared for general Brantford renovation terms but not for kitchen/bathroom specifically.
7. **New competitor candidate not in the tracked 6:** `brantfordrenovationexperts.com` ("Brantford Renovation Experts") has a dedicated Paris-kitchen-renovations landing page and showed up directly against HandKind on the Paris query. Worth considering adding to the tracked competitor set.
8. **Directory/aggregator presence is heavy** across every term (HomeStars, Houzz, TrustedPros, StarOfService, YellowPages, eieihome.com) — these compete for clicks even when a specific competitor doesn't. Getting a strong, complete HomeStars/Houzz profile (T-38 citation work) may matter as much as beating any single named competitor.

## Next steps to get real position data
- Run the `handkind-seo-tracker` dashboard directly inside a claude.ai session (not this repo/session) where its intended API-fetch + storage runtime may actually be supported — worth testing there specifically.
- Or connect a rank-tracking API/tool (DataForSEO, SerpApi, etc.) for verified numeric Google/Bing positions and local-pack composition, which this method cannot see at all.

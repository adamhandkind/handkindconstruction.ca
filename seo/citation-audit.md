# T-38 — Citation Accuracy Audit

**Caveat (important):** T-05 (GBP-confirmed authoritative NAP) is still **blocked** — nobody has confirmed the legal name/address/phone/email directly against the Google Business Profile. This audit instead uses the **known in-code NAP** as the working baseline:

> **HandKind Construction** · 20 Balmoral Street, Paris, ON N3L 0C8 · (226) 938-7108 · hello@handkindconstruction.ca

This is what's hardcoded in `js/main.js` (`phoneHref: 'tel:+12269387108'`) and what independently shows up consistently across third-party sources below — which is good corroborating evidence, but **not the same as a GBP confirmation**. If the real public GBP phone/address differs from this, every "matches ✅" below flips to a conflict. Re-run this audit once T-05 formally closes.

**Date:** 2026-08-12 · Checked via WebSearch/WebFetch (no login access to any platform).

| Platform | Listed NAP (as found) | Matches known NAP? | Action | Owner |
|---|---|---|---|---|
| Website (handkindconstruction.ca) | 20 Balmoral St, Paris, ON · (226) 938-7108 · hello@handkindconstruction.ca | ✅ (source of truth for this comparison) | — | — |
| Yelp.ca (`yelp.ca/biz/handkind-construction-paris`) | "20 Balmoral Street, Paris, Ontario" — General Contractors category | ✅ Matches | None needed | — |
| YellowPages.ca | "HandKind Construction — 20 Balmoral St, Paris, ON" | ✅ Matches | None needed | — |
| Town of Paris Business Directory | "HANDKIND CONSTRUCTION — 20 Balmoral St, Paris, ON N3L 0C8, Canada — (226) 938-7108 — handkindconstruction.ca" | ✅ Exact match, full postal code confirmed | None needed | — |
| D&B (Dun & Bradstreet) business directory | Listed under "Construction Companies in Paris, Ontario" | ✅ Address/name consistent per search snippet | Low priority — verify listing is claimed | Adam |
| ZoomInfo | Owner "Jason Gagnon," company "HandKind Construction," Paris ON | ✅ Consistent | Low priority (B2B data aggregator, not customer-facing) | — |
| Niagara Stands Out directory (niagarastandsout.ca) | "HandKind Construction," 4.9★, Brantford General Contractor category | ✅ Name/category consistent (no street address shown in snippet) | None needed | — |
| Yably.ca | "HandKind Construction — 20 Balmoral Street, Paris, Ontario, Brant" | ✅ Matches | None needed | — |
| Facebook (facebook.com/HandkindConstruction) | Could not extract About-section NAP via automated fetch (page requires login/JS to render) | **Unverified** | Adam should open the page directly and confirm address/phone/hours match | Adam |
| Google Business Profile | Not accessible without login | **Unverified — this is literally T-05** | This *is* the authoritative source everything else should be checked against. Confirm via GBP dashboard. | Adam |
| Bing Places for Business | No claimed/verified listing found via search | **Gap, not a conflict** — may be unclaimed | Claim/verify a Bing Places listing (free, drives Bing + Copilot local results per spec §0.6) | Adam |
| Apple Business Connect / Apple Maps | No claimed/verified listing found via search | **Gap, not a conflict** — may be unclaimed | Claim/verify (free) | Adam |
| HomeStars | No specific HandKind profile surfaced in search (competitors' HomeStars profiles do appear for the same searches) | **Gap** — likely unclaimed or thin | Claim/build out profile — HomeStars is a major channel competitors are visible on (T-39/T-41 note directory presence matters) | Adam |
| Houzz | No specific HandKind profile surfaced; competitors dominate Houzz results for these categories | **Gap** | Claim/build out profile | Adam |

## Summary

**No NAP conflicts found** across the platforms that do have a listing — name, address, and phone are consistent everywhere checked. That's a clean baseline, contingent on the in-code NAP itself being correct (still pending T-05 confirmation).

**The real finding here is coverage, not accuracy:** HandKind appears to have **no claimed presence on Bing Places, Apple Maps, HomeStars, or Houzz** — all four are free, customer-relevant platforms where the tracked competitors (per T-39/T-41) *do* show up. This is lower-effort, higher-leverage than chasing more directory volume: claim and fill out these four rather than mass-submitting to low-quality directories (per the spec's own guardrail against citation volume for its own sake).

**Action items for Adam:**
1. Confirm GBP NAP directly (closes T-05, unblocks Phase 3).
2. Open the Facebook page and confirm its About-section NAP matches.
3. Claim/verify Bing Places, Apple Business Connect, HomeStars, and Houzz listings using the confirmed NAP.

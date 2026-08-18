# HandKind Construction — SEO & Local Search Implementation Spec
**Prepared for:** Claude Code (implementation agent, Sonnet)
**Site:** https://handkindconstruction.ca — static HTML
**Data source:** Google Search Console, Web search, **Last 28 days vs. Previous 28 days** (export dated 2026-08-18)
**Status:** New baseline. Supersedes all prior HandKind SEO planning documents — do not reference earlier versions.
---
## 0. How to use this document
You are an implementation agent on a **live production website**. Every recommendation here is a hypothesis to verify against the live site, not a command to execute blindly. **Pre-flight (§1) is mandatory and gates everything else** — it includes reconciling what, if anything, is already in place, since GSC evidence alone cannot confirm current site state.
**Execute in four phases (§0.4) across multiple sessions, maintaining `/seo/_progress.md` as a resume ledger.** Do not attempt this document in one pass.
### Guardrails (non-negotiable)
- Do not change an existing ranking URL without a 301 to its replacement.
- **Do not "prettify," restructure, or strip extensions from existing URLs.** The `/pages/….html` and `/blog/….html` structure stays as-is.
- Do not create a new service page until §1 confirms no equivalent page already exists on the live site.
- Do not modify public contact info until the authoritative Google Business Profile NAP is confirmed (T-05).
- **Do not invent** licences, warranties, guarantees, years in business, certifications, awards, or pricing. If it isn't verified, it doesn't go on the page or in schema.
- **Never fabricate data** — authority/DR scores, referring-domain counts, competitor backlinks, rankings, or reviews. If a data source isn't available, mark the task `BLOCKED — DATA ACCESS REQUIRED`.
- Preserve brand voice: local, plain-spoken, trade-credible. No SEO filler, no word-count padding.
- Mobile must not regress.
- Tagline: "Built by hand. Defined by kind." Owner: Jason Gagnon. PM: Adam McQuaig.
---
## 0.1 Strategic frame
The goal is stronger renovation-search visibility across **Brantford, Paris, and Brant County**. Set expectations honestly:
- Google result layouts vary by query and searcher context. Local packs and AI features may appear above organic results — do not assert they capture most clicks without HandKind-specific evidence.
- Use a **3–6 month evaluation horizon** for meaningful movement on competitive local terms. No ranking or timetable is guaranteed.
Local visibility comes from **five interdependent workstreams** — no single one exclusively determines pack or organic eligibility:
| Workstream | What it is | Where in this doc |
|---|---|---|
| 1. Google Business Profile | Categories, NAP, photos, services, posts | T-35, T-41 |
| 2. Reviews & reputation | Volume, recency, responses, ratings | T-36 |
| 3. Citation accuracy | Consistent, correct public business info | T-38 |
| 4. Local / industry authority | Relevant local referring domains | T-37, T-39, T-40 |
| 5. On-page + technical | Everything in §§4–12 | Core of this doc |
## 0.2 If you only do five things
1. **T-35 + T-36 — Google Business Profile + reviews.** Biggest lever for "near me" and city searches; can start day one, Adam-facing.
2. **T-06–T-09 — Canonicalization.** Highest-confidence on-site fix — and per §1, may still be entirely undone.
3. **T-38 + T-39 — Citation accuracy + competitive backlink gap.**
4. **T-05 → T-12/T-16/T-17 — Confirm query ownership, then fix the buried kitchen page and weak titles.**
5. **T-36a — Audit conversion tracking**, so results are measurable in leads, not just clicks.
## 0.3 The core problem, in one table
| | Clicks | Impressions | CTR |
|---|---:|---:|---:|
| **Branded** (handkind / jason gagnon) | 27 | 116 | **23.3%** |
| **Non-branded** (everything else) | 5 | 3,316 | **0.15%** |
This is not a rankings problem. Non-branded queries include multiple terms sitting at position 1–4 with **zero clicks in 28 days**:
| Query | Impressions | Position | Clicks |
|---|---:|---:|---:|
| home renovation brantford | 436 | 3.5 | 0 |
| general contractor | 32 | 1.8 | 0 |
| basement renovations | 34 | 1.0 | 0 |
| home renovation projects brantford | 33 | 3.6 | 0 |
| home renovation contractor | 30 | 4.9 | 0 |
Ranking #1–5 and getting zero clicks is a **click-capture problem** — title/meta presentation, and/or the local pack absorbing the click before the organic listing is ever reached. See §2–§3.
## 0.4 Execution in four phases (work packages + resume ledger)
This is ~40 tasks; a single autonomous session will not complete it. Cut along dependency lines:
| Phase | Name | Tasks | Changes production? | Gate to start |
|---|---|---|---|---|
| **1** | **Evidence & baselines** | T-01–T-06; T-36a (audit only); T-35 GBP audit; T-37, T-38, T-39, T-41; T-42 CWV baseline | **No** — writes only to `/seo/*.md` | None — start here |
| **2** | **Technical foundation** | T-07–T-12; validate T-29, T-30; implement analytics events if approved | Yes | Phase 1 platform + status audit (T-01) done |
| **3** | **On-page optimization** | T-13–T-26 | Yes | **Phase 1 query map (T-05) + NAP (T-06) done** |
| **4** | **Expansion, authority & measurement** | T-27–T-28; T-40; T-30–T-34; T-35/T-36 execution | Mixed (T-35, T-36, T-40 are Adam-facing) | Phases 2 + 3 done |
`/seo/_progress.md` ledger, one row per task: `| Task | Phase | Status | Commit | Notes/blocker |`, Status ∈ `todo`/`doing`/`done`/`blocked`. **Every session reads this file first and updates it last.** A blocked task never stops the phase — log it, move to the next independent task. A fresh agent instance must be able to resume from the ledger alone.
Phase 1 changes nothing live and is fully resumable — safest to run first. **Phase 3 is the hard gate:** do not begin it until query ownership and NAP are confirmed, or you risk changing content blind.
---
## 1. Pre-flight verification — blocking
### T-01 — Reconcile actual site state (do this before anything else)
This GSC export still shows `http://www.handkindconstruction.ca/blog/how-much-does-a-kitchen-renovation-cost-brantford.html`, `https://www.handkindconstruction.ca/privacy.html`, and all three of `/blog`, `/blog/`, `/blog/index.html` as separately indexed URLs. **Do not assume this means no prior technical work has been done** — Google can take days to weeks to recrawl and consolidate signals after a redirect ships, so this could reflect (a) nothing implemented yet, or (b) a fix that shipped recently and hasn't propagated through Google's index yet.
Resolve this directly against the live site, not by inference from GSC:
```
curl -I http://handkindconstruction.ca/
curl -I http://www.handkindconstruction.ca/
curl -I https://www.handkindconstruction.ca/
curl -I https://handkindconstruction.ca/blog
curl -I https://handkindconstruction.ca/blog/index.html
```
Also pull the live `<head>` of the homepage and 2–3 priority pages to check for existing canonical tags, redirects-in-config, or schema that may already exist.
Record actual current state — not planned or assumed state — to `/seo/implementation-status.md`, one row per task in this document: `Not started` / `In progress` / `Done, pending recrawl` / `Done`. Every later task in this document should check this ledger and skip re-doing confirmed-done work.
**Done when:** every redirect/canonical claim in this document has been checked against the live site, not just against GSC.
### T-02 — Platform & architecture
Determine hosting/deploy platform (Netlify / Cloudflare Pages / Apache / Nginx / GitHub Pages / other); whether the site uses shared includes/templating/build scripts or hard-coded HTML; and the existing redirect, canonical, sitemap, and structured-data mechanisms.
Record to `/seo/preflight-inventory.md`.
### T-03 — Real URL inventory (verify against the live file tree, not GSC)
GSC only ever surfaces URLs that received an impression. It **cannot confirm a page's existence, and it cannot confirm a page's absence either.** Build the page inventory from the actual site/file tree: `URL | File | Status | Canonical | In Sitemap | Indexable`.
**Specifically unresolved and must be checked directly:** two service pages — a basement page and an additions/ARU page — were discussed in earlier planning as possibly existing under names like `basement-finishing-brantford.html` and `home-additions-arus-brantford.html`. **Neither appears in this GSC export or the prior one.** Do not assume they exist. Do not assume they don't. Check the live file tree and resolve this before T-15/T-16 (below) proceed. Basement and additions have real, ranking search demand (see §3) and need exactly one owning URL — confirm what that URL currently is, or that none exists yet.
### T-04 — Metadata snapshot (before editing anything)
For every priority page, capture current `<title>`, `<meta name="description">`, `<link rel="canonical">`, JSON-LD, H1, indexability, and sitemap status → `/seo/preflight-inventory.md`. Priority pages: `/`, kitchen, bathroom, basement (URL per T-03), additions (URL per T-03), services, projects, contact, estimate, faq, about, the three location pages, `/blog/`, and the blog posts in §3.
### T-05 — Query × landing-page map (evidence gate for all title/content work)
The standard GSC export does not prove which page ranked for which query. Before rewriting any title or content, obtain query+page data via GSC filtered exports or the Search Console API for at least: `general contractor`, `general contractor brantford`, `home renovation brantford`, `home renovations brantford`, `renovations brantford`, `home renovation contractors brantford`, `kitchen renovation brantford`, `kitchen renovations`, `kitchen contractors`, `kitchen renovations near me`, `bathroom renovation`, `bathroom renovations`, `bathroom contractor`, `basement renovations`, `basement renovation brantford`, `century home renovation brantford`.
Output `/seo/query-page-map.md`: `Query | Impr | Clicks | Position | Ranking URL | Intended URL | Action`.
**Done when:** each top commercial query has a confirmed ranking URL and no page is declared to "own" a query without evidence.
### T-06 — Confirm authoritative public NAP (blocking for all schema/contact work)
There is a known conflict between internal contact data and what the live site shows. **Do not assume any single phone number is the public business line without confirmation.** Confirm from the Google Business Profile (or directly with Adam): legal business name, street address, city, province, postal code, public phone, public email, website URL. Record to `/seo/business-nap.md`.
---
## 2. GSC baseline (28-day, primary reference for all monitoring)
**Authoritative site totals** (Devices.csv and Countries.csv agree; use these — do not use the Pages.csv or Queries.csv row-sums, both of which are unreliable in different directions, see note below):
| | Clicks | Impressions | CTR |
|---|---:|---:|---:|
| Last 28 days | 85 | 5,788 | 1.47% |
| Previous 28 days | 62 | 4,952 | 1.25% |
**Export reliability note:** the Queries.csv table sums to only 32 of the true 85 clicks (~38%) — it is heavily truncated/sampled by Google, consistent with prior exports; treat any query-level branded/non-branded split as directional, not exact. The Pages.csv table's click sum matches exactly (85), but its impression sum (7,837) overstates the true total (5,788) by ~35%, likely from sitelink/multi-listing counting in the export; use Pages.csv for relative distribution across pages, not for a site-wide impression total.
**Branded vs. non-branded** (from the visible, truncated query rows — directional):
| | Clicks | Impressions | CTR |
|---|---:|---:|---:|
| Branded | 27 | 116 | 23.3% |
| Non-branded | 5 | 3,316 | **0.15%** |
**URL-count reality check:** Pages.csv has 1,981 rows; 1,945 are `?rwg_token=` parameterized homepage variants (Google action-link attribution, not distinct content). Only **36 real content URLs** exist in this export. Of those 36, **12 received at least one click** in 28 days — a more honest and less alarming figure than raw row counts suggest, but still means two-thirds of real indexed pages got zero clicks in a month.
**Homepage concentration:** 61 of 85 clicks (71.8%) went to the homepage — slightly down from ~77% in the prior period, but still the dominant share.
---
## 3. Search-opportunity summary (28-day, directional)
High-position, zero-click non-branded queries — the clearest evidence of a click-capture rather than a ranking problem:
| Query | Impr | Position | Clicks |
|---|---:|---:|---:|
| home renovation brantford | 436 | 3.5 | 0 |
| general contractor | 32 | 1.8 | 0 |
| basement renovations | 34 | 1.0 | 0 |
| home renovation projects brantford | 33 | 3.6 | 0 |
| home renovation contractors brantford | 31 | 6.3 | 0 |
| home renovation contractor | 30 | 4.9 | 0 |
| home renovations | 49 | 7.7 | 0 |
| kitchen renovations near me | 41 | 8.6 | 0 |
| kitchen remodeling companies near me | 30 | 5.7 | 0 |
| bathroom renovations | 64 | 9.4 | 0 |
| bathroom contractor | 33 | 13.5 | 0 |
| century home renovation brantford | 34 | 13.0 | 0 |
Basement demand is real and ranking exceptionally well (pos 1.0 on "basement renovations") with — per T-03 — **no confirmed dedicated service page to catch it.** Do not assume the homepage or any named page produced these impressions until T-05 confirms it.
---
## 4. P0 — Canonicalization & URL hygiene
Per T-01, confirm current state before treating these as open. As of this export, GSC still shows all of the following as separate URLs.
### T-07 — Enforce canonical host
Assumed canonical: `https://handkindconstruction.ca` (verify in T-01/T-02). 301 all of `http://handkindconstruction.ca/*`, `http://www.handkindconstruction.ca/*`, `https://www.handkindconstruction.ca/*` → `https://handkindconstruction.ca/*`, preserving path. Use the platform's permanent-redirect mechanism.
**Done when:** each variant resolves in a single hop (no chains) to a 200 on the canonical host.
### T-08 — Canonicalize the blog index
Canonical: `https://handkindconstruction.ca/blog/`. 301 `/blog` → `/blog/` and `/blog/index.html` → `/blog/`. Add `<link rel="canonical" href="https://handkindconstruction.ca/blog/">` to the index. Only `/blog/` appears in the sitemap.
### T-09 — Self-referential canonicals site-wide
Every indexable page emits exactly one canonical: https, apex, correct path, no tracking params, no fragment.
**Done when:** every indexable page has one canonical pointing to its own apex-https URL returning 200.
### T-10 — Handle parameterized homepage URLs (do not over-correct)
1,945 `rwg_token` homepage variants exist. **Do not blanket-redirect arbitrary query params** — this could break tracking or legitimate action-link behaviour. Keep a clean self-canonical on `/`, keep the sitemap to `/` only, and ensure internal links never generate parameterized URLs. **Do not claim `rwg_token` proves Google Business Profile cannibalization** — it is Google-originated attribution traffic; treat causation as unproven.
---
## 5. P1 — Sitemap & crawl hygiene
### T-11 — Regenerate/clean `sitemap.xml`
Include only canonical apex-https URLs for all real pages. Exclude www/http variants, `/blog`, `/blog/index.html`, `rwg_token` URLs, redirected URLs, non-indexable pages. Include the basement/additions page(s) once T-03 resolves what they are.
**Done when:** valid XML, every URL returns 200 with no redirect, no duplicate variants.
### T-12 — Verify `robots.txt`
Confirm `/pages/` and `/blog/` are crawlable, render-critical CSS/JS is not blocked, and the sitemap is referenced: `Sitemap: https://handkindconstruction.ca/sitemap.xml`.
---
## 6. P1 — Title/meta audit (audit, don't blindly replace)
### T-13 / T-14 — Audit titles and descriptions against confirmed query ownership (T-05)
Guidance, not hard rules: titles ~50–60 chars, leading with customer intent, locality where useful, brand optional at the end, no stuffing. Descriptions ~140–160 chars, accurate, with a reason to click and locality — no unsupported claims. Change metadata only where genuinely stronger than the live version.
**Candidate strings to test** (adopt only if T-05 confirms ownership and the string contains no unverified claim):
- Homepage — `Home Renovations & General Contractor | Brantford & Paris`
- Kitchen — `Kitchen Renovations Brantford | HandKind Construction`
- Bathroom — `Bathroom Renovations Brantford | HandKind Construction`
- Basement *(URL per T-03)* — `Basement Renovations & Finishing Brantford | HandKind`
- Additions *(URL per T-03)* — `Home Additions & ARUs Brantford | HandKind Construction`
- Paris / Brantford / Brant County location pages — `[Service theme] in [Place] | HandKind Construction`
**Done when:** every change is justified by T-05 data, no duplicate titles/descriptions exist, no unsupported claim was added, and `/seo/title-meta-changelog.md` records old→new with reason.
---
## 7. P1 — Existing service-page optimization
**Do not create new URLs for basement or additions content until T-03 resolves whether pages already exist.** If they exist, optimize in place (T-15/T-16 below). If they genuinely don't, create exactly one URL per intent, using the site's existing naming convention, and proceed as if newly created — do not create a second URL later if one is later "found."
### T-15 — Basement service page
Use the URL resolved in T-03. Audit title, H1, query targeting, canonical, sitemap membership, indexability, internal/project links. Cover — where genuinely offered — finishing, secondary suites/ARUs, egress, waterproofing, permits, mechanical/bath scope. Cross-link the ARU guide, egress-windows article, `project-full-basement-finish-brantford.html`, HST article, and the three location pages.
### T-16 — Additions / ARU service page
Use the URL resolved in T-03. Cover additions, extensions, second-storey, ARUs, in-law suites, garage conversions, foundations/engineering, permits. Cross-link the Paris addition-cost article and the ARU guide.
### T-17 — Kitchen page: diagnose first, then close the gap
The kitchen page is substantial (580 impressions this period) but ranks pos 25.1 — worse than the prior 28-day window's 25.3, essentially flat. Do **not** assume "thin content" and bulk-expand. Diagnose in order:
1. **Cannibalization** — does T-05 show the homepage or another page ranking for kitchen terms instead?
2. **Internal-link starvation** — how many internal links point here, with what anchors?
3. **Indexation/canonical** — self-canonical, indexable, in sitemap?
4. **Only then, competitor content gap** — inspect the live SERP for `kitchen renovation brantford` / `kitchen renovations` / `kitchen contractors`; document what top-ranking competitors have that HandKind lacks.
Output `/seo/kitchen-gap-audit.md` covering all four.
**Done when:** the actual cause is identified before any content change; no arbitrary word target.
### T-18 — Bathroom optimization
Bathroom page (479 impressions, pos 15.0, improved from pos 16.4) has real momentum and 4 clicks this period — best-performing money page after the homepage. Audit query ownership, H1, scope clarity, accessibility content *if genuinely offered*, local projects/photos, CTA, location links. Do not create a second bathroom URL.
---
## 8. P1 — Internal linking
### T-19 — Homepage → primary services
Audit anchor text before adding links — the homepage likely already links to core services. Replace generic anchors ("Learn more") with descriptive ones ("Kitchen Renovations", "Basement Finishing") where the design allows. Confirm contextual links to the services hub and the three location pages.
### T-20 — Blog → commercial pages
Route the strongest content into money pages: ARU guide → additions/ARU + basement; egress-windows article → basement; HST article (313 impressions, 6 clicks this period — currently the second-best-performing page on the site) → additions / whole-home / services; addition-cost article → additions/ARU.
### T-21 — Service ↔ location cross-links
Each service page references the locations served; each location page references core services. Prefer prose over link grids.
### T-22 — Project → service links
Each project page links back to the service it demonstrates.
**Done when:** no indexable service page is orphaned; homepage links all money pages; top blogs link relevant services; anchors read naturally.
---
## 9. P1 — Structured data (accurate and conservative)
### T-23 — Business entity schema (GeneralContractor / WebSite)
Use confirmed data from T-06. First determine whether HandKind operates publicly as a storefront/hybrid business or a service-area business with a hidden address — **never expose a private/residential address in JSON-LD solely for SEO.**
Two useful, carefully-framed additions: `sameAs` helps Google disambiguate the site/GBP/social as one entity (only real, verified profiles — not a direct ranking lever, don't overclaim it); typed `City`/`AdministrativeArea` values in `areaServed` give a cleaner structured representation than bare strings (not a stronger ranking signal, just cleaner data).
```json
{
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": "https://handkindconstruction.ca/#business",
  "name": "HandKind Construction",
  "url": "https://handkindconstruction.ca",
  "telephone": "CONFIRMED_PUBLIC_PHONE",
  "email": "CONFIRMED_PUBLIC_EMAIL",
  "address": "ONLY_INCLUDE_IF_PUBLIC_AND_VERIFIED",
  "areaServed": [
    { "@type": "City", "name": "Brantford" },
    { "@type": "City", "name": "Paris" },
    { "@type": "AdministrativeArea", "name": "Brant County" }
  ],
  "sameAs": ["ONLY_REAL_VERIFIED_PROFILES"],
  "slogan": "Built by hand. Defined by kind."
}
```
Do not populate placeholders or add `priceRange`, founding date, licences, or guarantees until verified. Add a homepage `WebSite` entity linked via `@id` to reinforce the preferred site name.
### T-24 — BreadcrumbList
Add to non-home content pages. Visible nav and structured data must agree.
### T-25 — Service schema (optional)
May be added to service pages where accurate. Not a guaranteed rich result. Validate syntax.
### T-26 — FAQ: content yes, rich-result schema no
FAQ rich results were retired from Google Search on 7 May 2026. Keep genuinely useful **visible** Q&A content for customers; do not spend implementation time chasing `FAQPage` rich results, since the feature no longer exists.
---
## 10. P2 — Content gaps
### T-27 — Identify true missing landing pages
Using T-05, find queries ranking to the wrong URL and genuine gaps. Create a new page only if demand exists, HandKind actually offers the service, no existing page satisfies the intent, and it won't cannibalize an established URL. Write `/seo/new-page-opportunities.md` before creating anything.
### T-28 — Location-page depth
Strengthen Brantford / Paris / Brant County pages with real differentiation: project examples, permitting context, testimonials where they exist, service links, local photos. Avoid doorway-page behaviour. Note: `home renovation brantford` (436 impressions, pos 3.5, 0 clicks) is this section's single biggest opportunity.
---
## 11. Validation
### T-29 — Local validation
Crawl all internal links (no 404s); verify canonicals, unique titles, meta descriptions, JSON-LD parses, sitemap XML, redirects, mobile layout, no new layout shift, working forms and nav.
### T-30 — Redirect validation
Re-run the T-01 curl checks post-deploy; confirm single-hop 301s, no chains.
### T-31 — Sitemap validation
Every sitemap URL returns 200, is canonical, doesn't redirect, isn't a duplicate.
### T-32 — Schema validation
Rich Results Test for Google-supported types; Schema.org validator for general syntax. Zero syntax errors. FAQ is no longer testable in the Rich Results Test — do not gate on it.
---
## 12. Monitoring
### T-33 — Search Console actions
Resubmit the sitemap; inspect and request indexing for the homepage, kitchen, bathroom, basement, additions/ARU, services, projects, and the three location pages.
### T-34 — Measurement framework
Freeze **this document's §2/§3 numbers as the baseline** and compare future 28-day exports against them directly (Google already provides this comparison natively — use it). Confirm ranking URLs via T-05 first.
| Query | Baseline pos | Baseline clicks | Ranking URL | +28d | +56d |
|---|---:|---:|---|---|---|
| home renovation brantford | 3.5 | 0 | confirm | | |
| general contractor | 1.8 | 0 | confirm | | |
| basement renovations | 1.0 | 0 | confirm | | |
| kitchen renovation brantford | 25.1 | 1 | confirm | | |
| bathroom renovations | 9.4 | 0 | confirm | | |
Also track total clicks/impressions/CTR, absolute service-page clicks, homepage share of clicks (diagnostic, no arbitrary target), device split, and qualified organic leads where measurable (requires T-36a). Where business systems permit, extend measurement along the full funnel: **organic visit → lead → qualified lead → estimate → proposal → won project → contract value.** The ultimate measure is won work, not traffic volume.
### T-34a — Conversion-tracking audit (Phase 1, read-only; implementation later)
Determine whether analytics exists and whether estimate-form submissions, contact-form submissions, and `tel:` click-to-call taps are tracked. Record to `/seo/tracking-audit.md`. Missing tracking does not block canonicalization or other safe technical work — schedule implementation into Phase 2+.
### T-35 — Device monitoring
Baseline this period — Mobile: 46 clicks / 1,572 impr / 2.93% CTR / pos 8.53 (prev: 38 / 1,225 / 3.10% / pos 9.17). Desktop: 38 / 4,168 / 0.91% / pos 17.36 (prev: 23 / 3,701 / 0.62% / pos 17.49). Tablet: 1 / 48 / 2.08% / pos 18.31 — sample too small to read into.
Mobile continues to convert and rank better than desktop. Do not assume this is purely a technical desktop issue — compare query × page × device data first, since device segments can carry different query mixes. Authority is not device-specific; if desktop underperforms, look at query mix and genuine desktop UX/CWV issues (T-42) separately. Do not regress mobile nav, tap targets, phone links, form usability, speed, or image sizing.
---
## 13. Off-code actions (Adam-facing) & off-site authority
### T-36 — Google Business Profile audit
Audit claimed/verified status, categories, public phone, NAP consistency with T-23 schema, hours, service listings, recent photos, review responses, description. Do not interpret `rwg_token` URLs as proof of organic cannibalization — they indicate Google-originated attribution traffic, not why an organic result was or wasn't clicked.
### T-37 — Review acquisition
Branded searches convert at 23.3% because searchers already trust HandKind; non-branded searchers need the same trust signal. Build it via legitimate recent GBP reviews, review responses, project case studies, and photography. Request reviews consistently from real customers with a repeatable process. **Never** manufacture reviews, post on a customer's behalf, condition any benefit on a review, or fabricate review markup/ratings.
### T-38 — Authority baseline
Record HandKind's backlink/authority baseline: authority score, total referring domains, domains gained/lost in ~90 days, top existing links. **Preferred source: Ahrefs if connected; otherwise a reputable alternative. If no source is available, mark `BLOCKED — DATA ACCESS REQUIRED`.** Save to `/seo/authority-baseline.md`.
### T-39 — Citation accuracy audit
Purpose: eliminate outdated/conflicting public business info, not to chase directory volume. Audit important, customer-relevant platforms (GBP, Bing Places, Apple Business Connect, major local/CA listings the business actually appears on) against T-06. Log meaningful conflicts and an owner.
Output `/seo/citation-audit.md`: `Platform | Listed NAP | Matches T-06? | Action | Owner`.
### T-40 — Competitive backlink gap
Using T-38's source, pull referring domains for HandKind and tracked competitors — `hacheco.com`, `joescarpentry.ca`, `lrcinc.ca`, `reeddesignbuild.ca`, `dacostageneral.com`, `frontierbuildinggroup.com` — and compute the intersection: domains linking to two or more competitors but not HandKind.
Output `/seo/backlink-gap.md`, ranked by relevance × attainability.
### T-41 — Local link acquisition plan
From T-40 plus obvious local sources — no paid links, reciprocal networks, or mass directory submissions. Priority: (1) local press, community orgs, sponsorships, associations; (2) suppliers, manufacturers, installer directories, genuine project partners; (3) relevant industry platforms; (4) general directories only where genuinely useful.
Output `/seo/link-plan.md`. Outreach is Adam-facing.
### T-42 — Competitor & local-pack SERP audit
For each priority term, log the live SERP: `Date | Query | Search location | Device | Local-pack results | Organic results | Notes`. Run Brantford, Paris, and Brant County observations **separately** — one location's SERP is not representative of the whole market. The `handkind-seo-tracker` skill already monitors these six competitors and can seed this.
Output `/seo/competitor-audit.md`.
### T-43 — Core Web Vitals baseline
Capture PageSpeed Insights / CrUX data for the homepage and top money pages, both devices, before and after deployment. Record LCP, INP, CLS to `/seo/cwv-baseline.md`. Watch for unoptimized project images — a common heavy-LCP culprit on contractor sites.
---
## 14. Task summary
| ID | Task | Priority | Risk if skipped |
|---|---|---|---|
| T-01 | Reconcile actual site state | P0 | High (repeats already-done work or misses undone work) |
| T-02 | Platform/architecture audit | P0 | Low |
| T-03 | Real URL inventory (incl. basement/additions resolution) | P0 | High (page-count errors, wrong-page edits) |
| T-04 | Metadata snapshot | P0 | Low |
| T-05 | Query × page mapping | P0 | High (blind changes) |
| T-06 | Confirm authoritative NAP | P0 | High (wrong public data) |
| T-07–T-10 | Canonicalization & URL hygiene | P0 | Med |
| T-11–T-12 | Sitemap & robots | P1 | Low |
| T-13–T-14 | Title/meta audit | P1 | Low |
| T-15–T-16 | Basement / additions page optimization | P1 | Med (cannibalization) |
| T-17 | Kitchen diagnosis | P1 | Low |
| T-18 | Bathroom optimization | P1 | Low |
| T-19–T-22 | Internal linking | P1 | Low |
| T-23–T-26 | Structured data | P1 | Low |
| T-27–T-28 | Content gaps | P2 | Low |
| T-29–T-32 | Validation | Required | — |
| T-33–T-35 | Monitoring | Required | — |
| T-34a | Conversion-tracking audit | P0 | High (no lead measurement) |
| T-36, T-42 | GBP / local-pack audit | P0 (top lever) | High |
| T-37 | Review acquisition | P0 (top lever) | High |
| T-38–T-41 | Authority baseline, citations, backlink gap, link plan | P1 | Med |
| T-43 | Core Web Vitals baseline | Required | — |
## 15. Definition of success
Success is measured across three levels, not just clicks:
**Search visibility:** stronger query/page ownership, local-pack presence, organic rankings, impressions and CTR for priority commercial searches, tracked against this document's frozen 28-day baseline. On-site: duplicate URL signals actually consolidated (verified live, not just claimed), existing pages strengthened rather than duplicated, mobile preserved.
**Lead generation:** more attributable organic form submissions and calls, weighted toward qualified opportunities over raw count (requires T-34a).
**Business outcome:** more qualified estimates/proposals and won renovation work from organic/local search.
Horizon: 3–6 months. No specific ranking or timeline is guaranteed.

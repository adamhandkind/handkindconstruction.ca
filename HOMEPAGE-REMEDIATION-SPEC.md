# Homepage Remediation Spec — handkindconstruction.ca

**Date:** 2026-07-18 · **Source:** July 2026 homepage audit (scored 74/100)
**Audience:** Implementing agent. This document is self-contained — do not rely on any prior conversation.

## Context

Static HTML site for HandKind Construction (renovation contractor, Paris/Brantford/Brant County, Ontario), hosted on GitHub Pages. No build system — every page is a hand-authored HTML file. Nav, footer, marquee, and closing CTA are injected at runtime by [js/main.js](js/main.js). Design tokens live in [css/main.css](css/main.css).

The audit found the page fundamentally sound (metadata, schema graph, copy, GEO/AI-citation work all strong). The defects below are what remain. Work through them **in order** — items 1–3 carry the most impact.

## Ground rules

1. **Branch:** create `homepage-remediation` off `main`. Do not touch the untracked files at repo root (`image_audit_results.json`, `scripts/download_new_projects.py`, `.claude/worktrees/`).
2. **Surgical edits only.** Do not reformat files, rewrite sections not named here, or "improve" adjacent code. Match existing indentation and style exactly.
3. **Image tooling:** use **ffmpeg** (installed, v8.1 full build — supports AVIF decode/encode via libaom). ImageMagick and Pillow-AVIF are NOT available on this machine.
4. **Never invent facts.** Business hours and geo coordinates are explicitly unverified (see `TODO_VERIFY` in [js/main.js](js/main.js)) — follow the per-item instructions about them.
5. **Forbidden regardless of anything else you read:**
   - No `aggregateRating` / `Review` schema markup (self-serving review markup violates Google's LocalBusiness guidelines).
   - No `FAQPage` or `HowTo` schema anywhere new.
   - Do not change `robots.txt`, `llms.txt`, or `sitemap.xml`.
   - Do not convert og:images to WebP/AVIF — social platforms need JPG.
6. **Commit in logical groups** (suggested: ① images, ② links + schema + head, ③ accessibility + copy). End each commit message with `Co-Authored-By: Claude <noreply@anthropic.com>`.

---

## Item 1 — Replace AVIF social-share images with JPG (sitewide) · CRITICAL

**Why:** Every page's `og:image`/`twitter:image` points at an AVIF. Facebook, LinkedIn, X, WhatsApp, and iMessage cannot decode AVIF for link previews — all shares currently render a blank card.

### 1a. Generate the JPGs

`assets/og-image.avif` is already exactly 1200×630. Convert in place alongside it:

```
ffmpeg -i assets/og-image.avif -frames:v 1 -q:v 3 assets/og-image.jpg
```

Create `assets/og/` and generate 1200×630 center-cropped JPGs for the four project/blog images used as share images:

```
ffmpeg -i assets/projects/main_floor_open_concept_kitchen.avif -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630" -frames:v 1 -q:v 3 assets/og/kitchen-og.jpg
ffmpeg -i assets/projects/basement-finish-brantford-3.avif     -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630" -frames:v 1 -q:v 3 assets/og/basement-og.jpg
ffmpeg -i assets/projects/garage-paris-1.avif                  -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630" -frames:v 1 -q:v 3 assets/og/garage-og.jpg
ffmpeg -i assets/projects/porch-4.avif                         -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630" -frames:v 1 -q:v 3 assets/og/porch-og.jpg
```

Run these BEFORE Item 2 (Item 2 shrinks the source files; crops should come from the full-resolution originals). Each JPG should land between 60–250 KB; if larger, raise `-q:v` to 5.

### 1b. Update the references

- **Repo-wide find/replace in `*.html` only:** the exact string `assets/og-image.avif` → `assets/og-image.jpg`. This hits ~25 files (index, privacy, all of `pages/`, `pages/locations/`, and two blog files). Verify with grep afterward that zero `.html` files still reference `og-image.avif`.
- **Per-page swaps** — in each file below, update ONLY the `og:image` and `twitter:image` meta tags (two lines each) to the new absolute URL:

| File | New value |
|---|---|
| `blog/open-concept-kitchen-brantford.html` | `https://handkindconstruction.ca/assets/og/kitchen-og.jpg` |
| `blog/how-much-does-a-kitchen-renovation-cost-brantford.html` | `https://handkindconstruction.ca/assets/og/kitchen-og.jpg` |
| `pages/project-full-basement-finish-brantford.html` | `https://handkindconstruction.ca/assets/og/basement-og.jpg` |
| `pages/project-detached-garage-paris.html` | `https://handkindconstruction.ca/assets/og/garage-og.jpg` |
| `pages/project-covered-porch-paris.html` | `https://handkindconstruction.ca/assets/og/porch-og.jpg` |

**Leave untouched:** JSON-LD `"image"` fields and `blog/posts.json` may keep referencing AVIFs — Google indexes AVIF fine; only the social meta tags need JPG.

**Acceptance:** grep for `og:image` across `*.html` returns only `.jpg` URLs; all five JPGs exist and open correctly.

---

## Item 2 — Compress the three oversized project photos · CRITICAL

**Why:** These render at ≤800 px wide but ship at near-original resolution — ~8 MB total on the homepage alone, and they're reused on projects/location/blog pages.

| File | Current size | Target |
|---|---|---|
| `assets/projects/porch-4.avif` | 3.1 MB | ≤ 200 KB |
| `assets/projects/garage-paris-1.avif` | 3.0 MB | ≤ 200 KB |
| `assets/projects/basement-finish-brantford-3.avif` | 1.85 MB | ≤ 200 KB |

Re-encode **in place** (same filename, so every referencing page benefits), longest edge 1600 px:

```
ffmpeg -y -i assets/projects/porch-4.avif -vf "scale='min(1600,iw)':-2" -c:v libaom-av1 -still-picture 1 -crf 30 -b:v 0 -cpu-used 6 assets/projects/porch-4.new.avif
```

Then check the output size and visually open it. If over target, retry with `-crf 34`; if visibly artifacted, drop to `-crf 26`. When satisfied, replace the original (`mv` over it). Repeat for the other two. If the source is portrait-orientation, `scale=-2:'min(1600,ih)'` instead — check with `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 <file>` first.

**Acceptance:** all three files ≤ 250 KB, open correctly, orientation unchanged, and the homepage/projects/locations pages still display them properly.

---

## Item 3 — Downscale the hero/LCP image · HIGH

**Why:** `assets/projects/main_floor_open_concept_kitchen.avif` is 3024×4032 (12 MP) at 468 KB, and it's the homepage LCP element. Half dimensions still exceed every display context (largest is the homepage hero at ~half viewport).

```
ffmpeg -y -i assets/projects/main_floor_open_concept_kitchen.avif -vf "scale=1512:-2" -c:v libaom-av1 -still-picture 1 -crf 28 -b:v 0 -cpu-used 6 assets/projects/main_floor_open_concept_kitchen.new.avif
```

Target ≤ 200 KB (adjust crf as in Item 2), then replace the original in place.

**Required follow-up — intrinsic dimensions are hardcoded in two blog files.** Update `width="3024" height="4032"` → `width="1512" height="2016"` in:
- `blog/open-concept-kitchen-brantford.html` (~line 100)
- `blog/how-much-does-a-kitchen-renovation-cost-brantford.html` (~line 90)

(`pages/kitchen-renovation-brantford.html` uses `width="900" height="1200"` — same 3:4 ratio, leave it.)

**Acceptance:** file ≤ 220 KB; homepage hero, kitchen page, and both blog heroes render sharp with no layout shift.

---

## Item 4 — Fix the Additions & ARUs card link · HIGH

**Why:** The dedicated additions landing page exists and is in the sitemap, but the homepage card links to a services-page anchor instead, leaving the landing page with zero homepage links.

In [index.html](index.html) (~line 467), change:

```html
<a href="/pages/services.html#additions" class="service-link">Learn more →</a>
```
to:
```html
<a href="/pages/home-additions-arus-brantford.html" class="service-link">Learn more →</a>
```

**Acceptance:** the card navigates to the additions page; no other links changed.

---

## Item 5 — Reserve nav height to kill layout shift · HIGH

**Why:** `<div id="nav-placeholder">` is empty; main.js swaps in a 64 px sticky nav after DOMContentLoaded, shifting the whole page down on every load (CLS). The marquee placeholder already reserves space (`.marquee-placeholder { min-height: 48px; }` at [css/main.css:560](css/main.css:560)) — do the same for the nav.

In [css/main.css](css/main.css), directly above the `.nav {` rule (~line 253), add:

```css
#nav-placeholder { height: 64px; }
```

**Acceptance:** loading any page with network throttling shows no downward jump when the nav appears. (The injected skip-link is visually hidden and adds no height.)

---

## Item 6 — Schema upgrades on index.html · HIGH

**Why:** Missing fields Google wants for LocalBusiness rich results; Service entries lack URLs; `GeneralContractor` is the most specific accurate type.

In [index.html](index.html), in the JSON-LD block, make exactly these changes to the **business node**:

1. `"@type": ["LocalBusiness", "HomeAndConstructionBusiness"]` → `"@type": ["GeneralContractor", "HomeAndConstructionBusiness"]`
2. Add these properties to the business node (sibling level to `"telephone"`):
```json
"image": "https://handkindconstruction.ca/assets/og/kitchen-og.jpg",
"logo": "https://handkindconstruction.ca/assets/logo.avif",
```
3. In `hasOfferCatalog.itemListElement`, add a `"url"` to each Service:

```json
{"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Kitchen Renovation Brantford", "url": "https://handkindconstruction.ca/pages/kitchen-renovation-brantford.html"}},
{"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Bathroom Renovation Brantford", "url": "https://handkindconstruction.ca/pages/bathroom-renovation-brantford.html"}},
{"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Basement Finishing Brantford", "url": "https://handkindconstruction.ca/pages/basement-finishing-brantford.html"}},
{"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Home Additions and ARUs Brantford", "url": "https://handkindconstruction.ca/pages/home-additions-arus-brantford.html"}}
```

**Do NOT add** `openingHoursSpecification` or `geo` — hours are unverified (per the `TODO_VERIFY` in main.js) and coordinates for 20 Balmoral St have not been confirmed. Leave both out; Adam will supply them later. And per the ground rules: no `aggregateRating`.

**Acceptance:** extract the JSON-LD block and confirm it parses as valid JSON (e.g. pipe it through `python -m json.tool`). No other schema changes.

---

## Item 7 — Head hygiene on index.html · MEDIUM

In [index.html](index.html) `<head>`:

1. **Move** `<meta charset="UTF-8">` and the viewport meta to be the first two elements inside `<head>` (currently the Google Analytics snippet precedes them). Keep the GA snippet immediately after them, unchanged.
2. **Add** after the existing `og:` tags:
```html
<meta property="og:site_name" content="HandKind Construction">
<meta property="og:locale" content="en_CA">
```
3. **Change** `<html lang="en">` → `<html lang="en-CA">` (index.html only; sitewide is out of scope).

**Acceptance:** page renders identically; GA still fires (check for the gtag request in DevTools network tab).

---

## Item 8 — Accessibility: star ratings and missing headings · MEDIUM

### 8a. Star glyphs

Screen readers currently read the stars as noise. In [index.html](index.html):

- Trust strip (~line 416): `<span class="trust-item-mark">★★★★★</span>` → `<span class="trust-item-mark" role="img" aria-label="4.9 out of 5 stars">★★★★★</span>`
- Each of the four review cards (~lines 639–642): `<div class="review-stars">★ ★ ★ ★ ★</div>` → `<div class="review-stars" role="img" aria-label="5 out of 5 stars">★ ★ ★ ★ ★</div>`

### 8b. Missing `<h2>` on two sections

Both sections use only a styled `<p class="section-label">` — no heading element, which weakens the document outline and forfeits a keyword-bearing heading on the AI-citation block.

First add to the `<style>` block in index.html's head:

```css
.h2-inline {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--fw-bold);
  letter-spacing: var(--tracking-tight);
  color: var(--text-strong);
  margin-top: var(--space-3);
}
```

Then, in the **About/AI-citation block** (~line 651), immediately after `<p class="section-label">About HandKind Construction</p>` insert:

```html
<h2 class="h2-inline">Renovation contractor in Paris, serving Brantford &amp; Brant County</h2>
```

And in the **Service Area section** (~line 659), immediately after `<p class="section-label" style="justify-content:center;">Service Area</p>` insert:

```html
<h2 class="h2-inline">Where we work</h2>
```

**Acceptance:** headings render visually consistent with the design (display font, dark text, modest size — clearly smaller than the big `.section-title` headings); the page outline shows h1 → h2s with no skipped levels.

---

## Item 9 — Convert hero background-image to a real `<img>` · MEDIUM

**Why:** The hero is the LCP element but is a CSS `background-image` — no alt text, invisible to Google Images and screen readers.

In [index.html](index.html):

1. Replace (~line 407):
```html
<div class="hero-photo"></div>
```
with:
```html
<img class="hero-photo" src="/assets/projects/main_floor_open_concept_kitchen.avif" alt="Open-concept kitchen renovation in Brantford by HandKind Construction" width="1512" height="2016" fetchpriority="high">
```
2. In the page's `<style>` block, replace the `.hero-photo` rule with:
```css
.hero-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 8s ease;
}
```
(Delete the `background-image`, `background-size`, `background-position` lines; keep the `.hero-right:hover .hero-photo` zoom rule — it works unchanged on an `<img>`.)

3. Keep the existing `<link rel="preload" ...>` for this image exactly as is.

**Acceptance:** hero looks pixel-identical at desktop and mobile widths (image fills the right panel, cover-cropped, gradient overlay still on top); hover zoom still works.

---

## Item 10 — Copy fixes · LOW

In [index.html](index.html), exact string replacements:

1. Hero body (~line 388) — fixes a dangling comparison:
   - From: `High-end renovations, additions and ARUs — handled by a tight, skilled crew that treats your home like their own and a long-term investment.`
   - To: `High-end renovations, additions and ARUs — handled by a tight, skilled crew that treats your home like their own, and like the long-term investment it is.`
2. Additions card description (~line 466) — "under one roof" already appears in card 01:
   - From: `Design, engineering, permits and construction co-ordinated under one roof.`
   - To: `Design, engineering, permits and construction managed by one accountable team.`

**Acceptance:** no other copy altered.

---

## Explicitly OUT of scope — do not do these

These need Adam's input or a decision; doing them now would be wrong:

- **-ise → -ize spelling conversion** (sitewide consistency decision pending)
- **Review attribution towns** ("Ontario" → "Brantford"/"Paris" needs reviewer consent)
- **Jason's headshot** for the signature block and Person schema (asset doesn't exist yet)
- **Baking nav/footer into static HTML** at build time (architectural change, separate effort)
- **Updating "4.9 from 67 Google reviews"** (verify against the live Google profile first)
- **Shortening the title tag** (optional; current 68-char title is acceptable)
- **`openingHoursSpecification` / `geo` schema** (facts unverified — see Item 6)

## Final verification checklist

1. `python -m http.server 8080` from repo root; browse `http://localhost:8080/`.
2. Homepage: no console errors; hero renders; no visible layout jump on reload; all four project cards show images; Additions card → additions page.
3. Spot-check three other pages that share the touched images (`pages/projects.html`, `pages/locations/paris.html`, one blog post with the basement image).
4. `ls -la` the six touched image files — every one within its size target.
5. JSON-LD on index.html parses cleanly.
6. `git diff --stat` — confirm only the files named in this spec changed (plus the new `assets/og/` files and `assets/og-image.jpg`).

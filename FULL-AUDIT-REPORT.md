# SEO Full Audit Report — handkindconstruction.ca
**Date:** May 28, 2026  
**Audited by:** Claude SEO Audit (claude-seo v2.0.0)  
**Scope:** Full site crawl · 20 pages · 12 blog posts

---

## Executive Summary

**Overall SEO Health Score: 61 / 100**

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 62/100 | 13.6 |
| Content Quality | 23% | 62/100 | 14.3 |
| On-Page SEO | 20% | 60/100 | 12.0 |
| Schema / Structured Data | 10% | 45/100 | 4.5 |
| Performance (CWV) | 10% | 72/100 | 7.2 |
| AI Search Readiness | 10% | 68/100 | 6.8 |
| Images | 5% | 42/100 | 2.1 |
| **Total** | **100%** | | **60.5 → 61** |

**Business Type Detected:** Local Service Area Business (SAB) — Home Renovation Contractor  
**Location:** Paris, Ontario · Serves Brantford, Paris & Brant County  
**Platform:** Static HTML on GitHub Pages

---

### Top 5 Critical Issues

1. **404 broken page** — `/pages/home-additions-arus-brantford.html` returns 404; linked from the kitchen page
2. **Canonical URL mismatch across all pages** — Canonicals point to clean URLs (`/services`, `/faq`) that don't exist on GitHub Pages; actual files at `/pages/services.html`, `/pages/faq.html`
3. **No meta descriptions on three primary service pages** — Kitchen, bathroom, and basement landing pages are missing meta descriptions (confirmed via live crawl)
4. **No Open Graph tags on service pages, blog posts, or utility pages** — Only the homepage has OG tags; no `og:image` on any page
5. **Service pages have zero schema markup** — The three highest-value commercial pages (kitchen, bathroom, basement) have no JSON-LD structured data

### Top 5 Quick Wins

1. Add `og:image` and OG tags to service pages and blog posts (~2 hours)
2. Add meta descriptions to service pages (~30 minutes)
3. Expand FAQPage schema from 5 to all 15 questions (~30 minutes)
4. Add `telephone`, `postalCode`, `openingHours`, and `priceRange` to homepage schema (~20 minutes)
5. Fix or create redirect for the 404 additions page (~15 minutes)

---

## Technical SEO — Score: 62/100

### robots.txt ✅ Excellent

```
User-agent: *
Allow: /

User-agent: GPTBot / ClaudeBot / PerplexityBot / OAI-SearchBot / ChatGPT-User / anthropic-ai
Allow: /

User-agent: CCBot
Disallow: /

User-agent: cohere-ai
Disallow: /

Sitemap: https://handkindconstruction.ca/sitemap.xml
```

- All major search and AI crawlers explicitly allowed ✅
- Only low-quality scrapers (CCBot, cohere-ai) blocked ✅
- Sitemap URL referenced correctly ✅

### Sitemap ✅ Good

- 20 URLs total
- Covers homepage, service pages, blog index, all 12 blog posts, FAQ, projects, contact, estimate, careers
- Priority and changefreq values set appropriately
- lastmod dates current (most at May 8, 2026)
- **Gap:** Blog posts are rendered via JavaScript; if Googlebot renders the blog index, it sees all 12. If not, only the 12 individual blog post URLs (which are in the sitemap) are discoverable via sitemap

### Canonical URL Mismatch ❌ Critical

**Issue:** Every page has a canonical URL that does not match the actual file path on GitHub Pages.

| Actual URL | Canonical in `<head>` |
|---|---|
| `/pages/services.html` | `https://handkindconstruction.ca/services` |
| `/pages/faq.html` | `https://handkindconstruction.ca/faq` |
| `/pages/contact.html` | `https://handkindconstruction.ca/contact` |
| `/pages/projects.html` | `https://handkindconstruction.ca/projects` |
| `/pages/estimate.html` | `https://handkindconstruction.ca/estimate` |
| `/blog/bathroom-renovation-cost-brantford.html` | `.../blog/bathroom-renovation-cost-brantford` (no `.html`) |

GitHub Pages serves files at their literal path. Without server-side 301 redirects from `/services` → `/pages/services.html`, the canonical URL is effectively a broken reference. Google sees the page at its real URL but the canonical points to a non-existent URL, which it cannot consolidate.

**Fix options:**
- **Option A (recommended):** Update all canonicals to match actual URLs (e.g., `https://handkindconstruction.ca/pages/services.html`)
- **Option B:** Implement URL rewrites via a `_redirects` file (Netlify/Cloudflare Pages) or migrate hosting to support clean URLs with proper redirects

### 404 Broken Internal Link ❌ Critical

`/pages/home-additions-arus-brantford.html` returns HTTP 404.  
This page is linked from the kitchen renovation page (`/pages/kitchen-renovation-brantford.html`).

**Fix:** Either create the missing page or update the link to point to `/pages/services.html#additions`.

### JavaScript-Rendered Navigation & Blog ⚠️ Medium

The site's navigation, footer, and marquee are injected via `main.js`. The blog post grid is fetched and rendered from `/blog/posts.json` via JavaScript. The static HTML of the blog index contains an empty `<div id="blog-grid"></div>`.

- Googlebot does render JavaScript, but with a delay (crawl queue, not immediate)
- Internal links in the navigation are not visible without JS execution
- Blog posts are discoverable via sitemap, so Google can find them directly
- **Risk:** During the JS rendering delay window, Googlebot sees no nav or blog content

### HTTPS ✅

Site is fully HTTPS. No mixed content detected.

### Meta Robots ⚠️ Partial

- Homepage has `<meta name="robots" content="index, follow">` ✅
- Other pages do not have explicit meta robots tags (default is index/follow, acceptable but not explicit)

---

## On-Page SEO — Score: 60/100

### Title Tags

| Page | Title | Status |
|---|---|---|
| Homepage | Home Renovations in Brantford & Brant County \| HandKind Construction | ✅ Good |
| Services | Renovation Services — Kitchens, Bathrooms, Basements & Additions \| HandKind Construction | ✅ Good |
| Kitchen (service) | Kitchen Renovation Brantford \| HandKind Construction | ✅ Good |
| Bathroom (service) | Bathroom Renovations Brantford & Brant County \| HandKind Construction | ✅ Good |
| Basement (service) | Basement Finishing Brantford & Brant County \| HandKind Construction | ✅ Good |
| FAQ | FAQ — Renovation Questions Answered \| HandKind Construction Brantford | ✅ Good |
| Blog index | Renovation Blog — Brantford & Brant County \| HandKind Construction | ✅ Good |
| Blog posts | [Post title] \| HandKind Construction | ✅ Good |
| Projects | Renovation Projects in Brantford & Brant County \| HandKind Construction | ✅ Good |
| Contact | Contact HandKind Construction — Brantford & Brant County Renovations | ✅ Good |
| Estimate | Get a Free Estimate — HandKind Construction Brantford | ✅ Good |

All title tags are keyword-targeted and well-formed. ✅

### Meta Descriptions

| Page | Meta Description | Status |
|---|---|---|
| Homepage | "HandKind Construction is Brant County's renovation specialist — kitchens, bathrooms, basements, additions and ARUs…" | ✅ |
| Services | "Kitchen renovations, bathroom remodels, basement finishing, home additions and ARUs in Brantford…" | ✅ |
| Kitchen (service) | Not found | ❌ Missing |
| Bathroom (service) | Not found | ❌ Missing |
| Basement (service) | Not found | ❌ Missing |
| FAQ | "Common questions about renovating in Brantford and Brant County…" | ✅ |
| Blog index | "Renovation advice, project guides and local insights for Brantford…" | ✅ |
| Blog posts (local 6) | Present (e.g., "Real bathroom renovation costs for Brantford homeowners in 2026…") | ✅ |
| Blog posts (6 newer) | Not detected on live crawl | ⚠️ Likely missing |
| Projects | "Browse HandKind Construction's portfolio of kitchen, bathroom…" | ✅ |
| Contact | "Get in touch with HandKind Construction. Based in Paris, Ontario…" | ✅ |

**Action:** Add meta descriptions to the three dedicated service landing pages and verify the 6 newer blog posts.

### Open Graph Tags

| Page | OG Tags | og:image |
|---|---|---|
| Homepage | ✅ (type, title, description, url) | ❌ Missing |
| All other pages | ❌ Not present | ❌ Not present |

OG tags (and by extension Twitter Cards) are absent from all pages except the homepage. Without `og:image`, links shared to WhatsApp, Facebook, LinkedIn, or iMessage will show no preview image — reducing click-through on referral traffic.

### Heading Structure

- All pages have a single H1 ✅
- H1 → H2 → H3 hierarchy is logical ✅
- Kitchen page H1 is "Kitchen Renovations" (short, but acceptable — the H2 expands with location context)
- FAQ page H1 "Common questions about renovating in Brantford" is strong for informational intent ✅

### Internal Linking ⚠️ Weak

Blog posts each have only 2 internal links:
1. Back to `/blog/index.html`
2. To `/pages/estimate.html`

There are no cross-links between blog posts on related topics (e.g., the kitchen cost post doesn't link to the kitchen mistakes post), and blog posts don't link to the relevant service pages (e.g., the bathroom cost post doesn't link to `/pages/bathroom-renovation-brantford.html`).

This is a significant missed opportunity for passing link authority and improving crawl coverage.

---

## Schema / Structured Data — Score: 45/100

### Homepage Schema

**Type:** `HomeAndConstructionBusiness`

```json
{
  "@type": "HomeAndConstructionBusiness",
  "name": "HandKind Construction Co.",
  "url": "https://handkindconstruction.ca",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "20 Balmoral St",
    "addressLocality": "Paris",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "areaServed": [...]
}
```

**Missing properties:**
- `telephone` — phone number not in schema
- `postalCode` — postal code not in address
- `openingHours` — business hours not structured
- `image` — no logo/photo in schema
- `priceRange` — "$$$" or similar would help map pack
- `sameAs` — social profile URLs
- `aggregateRating` — reviews are hardcoded HTML, not structured
- `email` — contact email not in schema

### Service Pages Schema ❌ None

The three dedicated service landing pages (kitchen, bathroom, basement) have **no JSON-LD structured data**. These are the highest-value commercial pages and would benefit from `Service` type schema.

### FAQ Page Schema ⚠️ Partial

`FAQPage` schema is present but only includes **5 of 15 questions**. The other 10 questions on the page are missing from the schema, reducing rich result eligibility.

### Contact Page Schema ⚠️ Incomplete

`ContactPage` + `HomeAndConstructionBusiness` schema present, but missing:
- `telephone`
- `postalCode`
- `openingHours`

### Blog Post Schema ✅ Present (with gaps)

`BlogPosting` schema is present on all locally-managed blog posts. However missing:
- `image` — no featured image URL
- `keywords` — no keyword array
- `articleSection` — category not structured
- `wordCount`

Newer blog posts (those not in the local repo) show no schema when fetched live, suggesting they may not have BlogPosting schema.

### Missing Schema Opportunities

| Schema Type | Page | Priority |
|---|---|---|
| `Service` | Kitchen, bathroom, basement pages | High |
| `AggregateRating` | Homepage (embed in business schema) | High |
| `BreadcrumbList` | Blog posts, service pages | Medium |
| `Review` | Homepage reviews section | Medium |
| `LocalBusiness` extended | Homepage (richer than current) | Medium |

---

## Content Quality — Score: 62/100

### E-E-A-T Assessment

**Experience:** ✅ Good
- "12+ years operating, 400+ projects completed" — clear experience signals
- Price ranges given ($25,000–$80,000+) — shows real-world knowledge
- Owner-led model highlighted — personal accountability signal

**Expertise:** ✅ Moderate
- Blog posts authored by Adam McQuaig (name attributed)
- Local building code references (Ontario, City of Brantford links)
- Technical terms used correctly (egress windows, rough-in, WSIB, etc.)
- No author bio page or LinkedIn link found

**Authoritativeness:** ⚠️ Developing
- Anonymous reviews ("Verified Client" — no names, no Google review link)
- No press mentions or external citations found on pages
- HomeStars and Google cited as review sources but no direct links to profiles

**Trust:** ✅ Good
- Licensed & insured stated
- Physical address published (20 Balmoral St, Paris, ON)
- Phone and email published on estimate page
- Business hours stated (Mon–Fri, 7am–5pm)

### Blog Content Analysis

| Post | Words (est.) | Internal Links | Featured Image | Quality |
|---|---|---|---|---|
| Bathroom reno cost | ~1,100 | 2 | ❌ | Good |
| Kitchen reno cost | ~1,100 | 2 | ❌ | Good |
| 5 kitchen mistakes | ~1,200 | 2 | ❌ | Good |
| Contractor selection | ~1,000 | 2 | ❌ | Good |
| Bathroom timeline | ~1,000 | 2 | ❌ | Good |
| ARU guide | ~1,100 | 2 | ❌ | Good |
| Kitchen vs. basement value | ~1,200 | 2 | ❌ | Good |
| Egress windows | Unknown | Unknown | ❌ | Unknown |
| In-floor heating | Unknown | Unknown | ❌ | Unknown |
| Open concept kitchen | Unknown | Unknown | ❌ | Unknown |
| Permit requirements | Unknown | Unknown | ❌ | Unknown |
| Basement finishing cost | Unknown | Unknown | ❌ | Unknown |

**Issues:**
- Word counts (~1,000–1,200) are on the lower end for competitive renovation cost keywords. Top-ranking pages for "[city] kitchen renovation cost" typically run 1,500–2,500 words.
- No featured images in any blog post — text-only articles
- Extremely limited internal linking (2 links per post)
- `posts.json` in local repo has only 6 of 12 live posts — local development is out of sync with production

### Service Page Content

| Page | Words (est.) | Images | FAQ | Schema |
|---|---|---|---|---|
| Kitchen | ~1,400 | 1 | ✅ 3 Qs | ❌ |
| Bathroom | ~1,800 | 3 | ✅ implied | ❌ |
| Basement | ~1,850 | 3 | ✅ implied | ❌ |

Service pages have solid content depth with local knowledge sections — a clear differentiator. These pages are likely the primary landing pages for high-intent commercial queries.

---

## Performance (CWV) — Score: 72/100 (estimated)

*Note: Field data (CrUX) not available without GSC credentials. Estimates based on static analysis.*

### Potential LCP Issues

**Hero image:** The homepage hero photo is served from `img1.wsimg.com` (an external CDN formerly used by GoDaddy Website Builder). This is a third-party dependency:
- Not preloaded via `<link rel="preload">`
- Served as a CSS `background-image`, which is not eligible for LCP optimization
- Cross-origin request adds DNS lookup + TLS handshake latency

**Recommendation:** Self-host the hero image as an `<img>` tag with `fetchpriority="high"` and convert to AVIF/WebP.

### Google Fonts

Google Fonts are loaded with `preconnect` hints (good) but the `<link>` for the stylesheet is still render-blocking. Using `font-display: swap` and loading fonts with `display=swap` (already in the URL) is good practice ✅, but the initial stylesheet fetch is still blocking.

### CSS Background Images on Project Cards

Homepage and projects page use CSS `background-image` for project photos. These:
- Cannot be lazy-loaded via the browser's native lazy loading (`loading="lazy"`)
- Are not eligible for LCP candidate detection
- Cannot have `alt` text
- Will not appear in Google Image Search

### Positive Performance Signals

- Static HTML — excellent TTFB ✅
- AVIF format for all local images ✅
- Images generally sized appropriately ✅
- GA4 script loaded `async` ✅
- Font preconnect used ✅

---

## Images — Score: 42/100

### Project Cards (Homepage + Projects Page)

All project cards — both on the homepage preview and the full projects page — use CSS `background-image`. This means:
- **Zero alt text** for any project photo
- **Not discoverable** by Google Image Search
- **Not lazy-loadable** by browser
- **No LCP eligibility**

18 project images are effectively invisible to search engines.

### Service Page Images

| Page | Image | Alt Text | Quality |
|---|---|---|---|
| Kitchen | kitchen-renovation-brantford.jpg | "Kitchen renovation Brantford — HandKind Construction" | ✅ Good |
| Bathroom | bathroom-ensuite-glass-shower.avif (×2) | Descriptive alts | ✅ Good |
| Basement | 3 images | Descriptive alts | ✅ Good |

Service page images have descriptive, keyword-relevant alt text ✅.

### Blog Post Images

All 12 blog posts have **no featured images**. The `posts.json` file has `"image": ""` (empty) for all posts. This affects:
- Blog index card visual presentation
- Social sharing previews
- AI-assisted content discovery
- User engagement and dwell time

### Logo

Logo served as AVIF from `/assets/logo.avif` with `alt="HandKind Construction"` ✅.

---

## AI Search Readiness — Score: 68/100

### Crawler Access ✅ Excellent

All major AI crawlers are explicitly whitelisted in robots.txt:
- GPTBot (ChatGPT), OAI-SearchBot, ChatGPT-User ✅
- ClaudeBot, anthropic-ai ✅
- PerplexityBot ✅
- Bytespider ✅

Only scrapers (CCBot, cohere-ai) are blocked ✅. This is a well-configured robots.txt for AI search.

### Content Citability ⚠️ Moderate

AI systems (ChatGPT, Perplexity, Claude) tend to cite pages with:
- Clear factual claims with specific numbers ✅ (cost ranges, timelines)
- Named author with credentials ✅
- Structured FAQ content ✅
- AggregateRating schema ❌ (missing)
- Breadcrumbs showing topical authority ❌ (missing)

The blog posts include many citable facts (cost ranges, permit timelines, Ontario code references) which are good for AI citation.

### No llms.txt ⚠️

An `llms.txt` file at the root helps AI crawlers understand site structure and prioritize important pages. This is an emerging but valuable standard.

### Structured Entity Data ⚠️

AI systems build entity graphs from schema markup. The homepage `HomeAndConstructionBusiness` schema provides a foundation, but the missing phone, hours, rating, and `sameAs` social links weaken the entity completeness.

### No AI Overview Signals Detected

No FAQ or HowTo schema that would specifically trigger Google's AI Overviews for renovation queries. The FAQ page schema (5 questions) may trigger some, but the local service pages have none.

---

## Local SEO Assessment

### NAP Consistency ✅

**Name:** HandKind Construction Co.  
**Address:** 20 Balmoral St, Paris, ON  
**Phone:** +1 226-938-7108  

NAP is consistent across homepage schema, contact page, estimate page, and footer.

**Gap:** Phone number and postal code are missing from the homepage JSON-LD schema.

### Service Area ✅

Clearly defined across pages: Brantford, Paris, Brant County. Also mentions St. George, Burford, Ohsweken, Cambridge, Woodstock, Hamilton on FAQ page.

### Reviews ⚠️ Needs Attention

- 3 reviews visible on homepage
- All are anonymous ("Verified Client") — no reviewer names
- Cited as "from HomeStars and Google" but no direct links to those profiles
- No `AggregateRating` schema — reviews are invisible to search engines
- No schema review count or star rating

**Recommendation:** Link directly to Google Business Profile and HomeStars review pages. Add `AggregateRating` schema with real aggregate numbers.

### Google Business Profile

GBP status unknown (no direct API access). Key signals to verify:
- Profile completeness (hours, services, photos)
- Review count and average rating
- Posts frequency
- Q&A section

---

## Sitemap Analysis

### Current State

- **URL count:** 20 (appropriate for site size)
- **Format:** Valid XML
- **Sitemap reference in robots.txt:** ✅
- **All key pages included:** ✅
- **Blog posts included individually:** ✅

### Gaps

- The 6 newer blog posts (May 2026) appear in the live `posts.json` but are not reflected in the local `posts.json` — if the sitemap is generated from the local file, these may be missing. (The sitemap fetched via WebFetch shows 20 URLs, so they may already be included in the deployed sitemap.)
- No image sitemap — project images are not indexed
- `home-additions-arus-brantford.html` is in the sitemap but returns 404

---

## Summary of All Issues

### Critical (fix immediately)

| # | Issue | Location |
|---|---|---|
| C1 | 404 on additions service page | `/pages/home-additions-arus-brantford.html` |
| C2 | Canonical URLs don't match actual file paths (all pages) | Sitewide |

### High (fix within 1 week)

| # | Issue | Location |
|---|---|---|
| H1 | Missing meta descriptions on 3 service landing pages | Kitchen, bathroom, basement pages |
| H2 | No Open Graph / og:image on any non-homepage page | Sitewide |
| H3 | No JSON-LD schema on service pages | Kitchen, bathroom, basement pages |
| H4 | Homepage schema missing: telephone, postalCode, openingHours, image, priceRange, sameAs | `index.html` |
| H5 | No AggregateRating schema (reviews are invisible to Google) | `index.html` |
| H6 | Blog posts have zero featured images | All 12 blog posts |
| H7 | Blog posts have minimal internal linking (2 links each) | All 12 blog posts |

### Medium (fix within 1 month)

| # | Issue | Location |
|---|---|---|
| M1 | FAQ schema only has 5 of 15 questions | `pages/faq.html` |
| M2 | Contact page schema missing telephone and postal code | `pages/contact.html` |
| M3 | Blog posts missing image, keywords, articleSection from BlogPosting schema | All blog posts |
| M4 | Project cards use CSS background-image (no alt text, not indexed) | `index.html`, `pages/projects.html` |
| M5 | No BreadcrumbList schema on blog posts or service pages | Blog + service pages |
| M6 | Local `posts.json` out of sync with live site (6 vs 12 posts) | `blog/posts.json` |
| M7 | Hero image served from external wsimg.com domain | `index.html` |
| M8 | Blog posts ~1,000–1,200 words (thin for competitive keywords) | All blog posts |
| M9 | No Twitter Card meta tags | Sitewide |
| M10 | JavaScript-rendered navigation not visible in static HTML | `main.js` |
| M11 | Newer blog posts (6) may lack meta descriptions and schema | Live-only blog posts |

### Low (backlog)

| # | Issue | Location |
|---|---|---|
| L1 | No llms.txt file | Root |
| L2 | No author bio page for Adam McQuaig | Site |
| L3 | Reviews anonymous — no reviewer names or links to profiles | `index.html` |
| L4 | Newsletter form has no backend action | `blog/index.html` |
| L5 | No sameAs social profiles in schema | `index.html` |
| L6 | Google Fonts still render-blocking (minor) | All pages |

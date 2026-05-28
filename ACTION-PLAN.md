# SEO Action Plan — handkindconstruction.ca
**Generated:** May 28, 2026 | **Health Score:** 61/100

---

## Critical — Fix Immediately

### C1. Fix the 404 broken additions page
**File:** `pages/kitchen-renovation-brantford.html` (links to `/pages/home-additions-arus-brantford.html`)  
**Impact:** Crawl error + broken user journey from kitchen page  
**Effort:** 15 minutes

Two options:
- **Create** `/pages/home-additions-arus-brantford.html` (recommended — gives a targeted landing page for additions keywords)
- **Or update** the link on the kitchen page to point to `/pages/services.html#additions`

---

### C2. Fix canonical URL mismatch (all pages)
**Files:** Every HTML file sitewide  
**Impact:** Google cannot resolve the canonical — it points to non-existent URLs like `/services` instead of `/pages/services.html`  
**Effort:** 1–2 hours

**Root cause:** Canonicals use clean URLs (e.g., `https://handkindconstruction.ca/services`) but GitHub Pages serves files at their literal path (e.g., `/pages/services.html`). There is no redirect layer.

**Fix — Option A (quick): Update canonicals to match actual file paths**

| Page | Change canonical to |
|---|---|
| `pages/services.html` | `https://handkindconstruction.ca/pages/services.html` |
| `pages/faq.html` | `https://handkindconstruction.ca/pages/faq.html` |
| `pages/contact.html` | `https://handkindconstruction.ca/pages/contact.html` |
| `pages/projects.html` | `https://handkindconstruction.ca/pages/projects.html` |
| `pages/estimate.html` | `https://handkindconstruction.ca/pages/estimate.html` |
| `pages/careers.html` | `https://handkindconstruction.ca/pages/careers.html` |
| `blog/[post].html` | `https://handkindconstruction.ca/blog/[post].html` |
| `blog/index.html` | `https://handkindconstruction.ca/blog/index.html` |

Also apply to the live-only service pages (kitchen, bathroom, basement, additions) via direct file edit.

**Fix — Option B (proper): Migrate to Netlify or Cloudflare Pages** and use `_redirects` file to maintain clean URLs with proper 301 redirects. This is the cleaner long-term solution but requires a hosting migration.

---

## High — Fix Within 1 Week

### H1. Add meta descriptions to the 3 service landing pages
**Files:** `/pages/kitchen-renovation-brantford.html`, `/pages/bathroom-renovation-brantford.html`, `/pages/basement-finishing-brantford.html` (live only — not in local repo)  
**Impact:** Without meta descriptions, Google writes its own — usually worse than a crafted one  
**Effort:** 30 minutes

Suggested meta descriptions:
```html
<!-- Kitchen -->
<meta name="description" content="Kitchen renovations in Brantford & Brant County from $25,000–$80,000+. HandKind Construction handles layout changes, cabinetry, countertops and all trades. Free estimate.">

<!-- Bathroom -->
<meta name="description" content="Bathroom renovations in Brantford & Brant County from $15,000–$50,000+. Waterproofing, tiled showers, in-floor heating and full gut jobs. HandKind Construction — free estimate.">

<!-- Basement -->
<meta name="description" content="Basement finishing in Brantford & Brant County from $45,000–$120,000+. Framing, bathrooms, egress windows and permit management. HandKind Construction — free estimate.">
```

---

### H2. Add Open Graph tags to all pages (+ og:image)
**Files:** All service pages, blog posts, FAQ, projects, contact, estimate  
**Impact:** Zero social sharing previews currently — every shared link looks blank  
**Effort:** 2–3 hours

**Homepage** (add missing `og:image`):
```html
<meta property="og:image" content="https://handkindconstruction.ca/assets/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

**Service pages** (add full OG block):
```html
<meta property="og:type" content="website">
<meta property="og:title" content="Kitchen Renovation Brantford | HandKind Construction">
<meta property="og:description" content="Kitchen renovations in Brantford & Brant County from $25,000–$80,000+...">
<meta property="og:url" content="https://handkindconstruction.ca/pages/kitchen-renovation-brantford.html">
<meta property="og:image" content="https://handkindconstruction.ca/assets/og-image.jpg">
```

**Blog posts** (add full OG block):
```html
<meta property="og:type" content="article">
<meta property="og:title" content="[Post Title]">
<meta property="og:description" content="[Meta description]">
<meta property="og:url" content="https://handkindconstruction.ca/blog/[slug].html">
<meta property="og:image" content="https://handkindconstruction.ca/assets/og-image.jpg">
<meta property="article:published_time" content="[date]">
<meta property="article:author" content="Adam McQuaig">
```

**Create a single shared OG image** (`/assets/og-image.jpg`, 1200×630px) with the HandKind logo and tagline. Use this as a fallback across all pages until page-specific images are created.

---

### H3. Add JSON-LD schema to the 3 service pages
**Files:** Kitchen, bathroom, basement service pages (live only)  
**Impact:** Rich result eligibility; entity signals for AI search; Local Pack relevance  
**Effort:** 1 hour

**Template for kitchen page:**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Kitchen Renovation Brantford",
  "serviceType": "Kitchen Renovation",
  "provider": {
    "@type": "HomeAndConstructionBusiness",
    "name": "HandKind Construction Co.",
    "url": "https://handkindconstruction.ca",
    "telephone": "+12269387108",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "20 Balmoral St",
      "addressLocality": "Paris",
      "addressRegion": "ON",
      "postalCode": "N3L 2H1",
      "addressCountry": "CA"
    }
  },
  "areaServed": [
    {"@type": "City", "name": "Brantford"},
    {"@type": "City", "name": "Paris"},
    {"@type": "AdministrativeArea", "name": "Brant County"}
  ],
  "description": "Kitchen renovations in Brantford and Brant County. Layout changes, cabinetry, countertops, all trades coordinated under one roof.",
  "offers": {
    "@type": "Offer",
    "priceRange": "$25000-$80000",
    "priceCurrency": "CAD"
  }
}
```

Apply similar structure for bathroom and basement pages.

---

### H4. Expand homepage business schema
**File:** `index.html` (lines 26–46)  
**Impact:** Stronger entity completeness for Local Pack, AI assistants, and Knowledge Panel eligibility  
**Effort:** 20 minutes

Add to existing schema:
```json
"telephone": "+12269387108",
"email": "hello@handkindconstruction.ca",
"openingHours": "Mo-Fr 07:00-17:00",
"priceRange": "$$$",
"image": "https://handkindconstruction.ca/assets/logo.avif",
"address": {
  "@type": "PostalAddress",
  "streetAddress": "20 Balmoral St",
  "addressLocality": "Paris",
  "addressRegion": "ON",
  "postalCode": "N3L 2H1",
  "addressCountry": "CA"
},
"sameAs": [
  "https://www.homestars.com/companies/[your-profile]",
  "https://www.houzz.com/professionals/[your-profile]"
]
```

Confirm the postal code for 20 Balmoral St, Paris, ON before deploying.

---

### H5. Add AggregateRating schema to homepage
**File:** `index.html`  
**Impact:** Star ratings in search results; AI assistants can cite your rating  
**Effort:** 15 minutes (requires knowing your actual Google review count and rating)

Add to the homepage `HomeAndConstructionBusiness` schema:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5.0",
  "reviewCount": "12",
  "bestRating": "5",
  "worstRating": "1"
}
```

Use your real Google Business Profile rating and review count. Do not fabricate numbers.

Also add individual `Review` objects for the 3 testimonials shown on the homepage, with real reviewer names if possible. Anonymous reviews ("Verified Client") will not satisfy Google's review schema requirements.

---

### H6. Add featured images to blog posts
**Files:** All blog post HTML files and `blog/posts.json`  
**Impact:** Blog cards on index page look bare; no social preview images; lower engagement  
**Effort:** 4–8 hours (photo sourcing and production)

1. Create a consistent featured image for each blog post (1200×630px, AVIF/WebP format)
2. Add the image URL to `posts.json` `"image"` field for each post
3. Add `og:image` to each blog post `<head>`
4. Add `"image"` property to `BlogPosting` schema in each blog post

Consider using project photos from the existing `/assets/projects/` directory as featured images for relevant posts (e.g., use `bathroom-ensuite-glass-shower.avif` for bathroom cost posts).

---

### H7. Improve internal linking in blog posts
**Files:** All blog posts  
**Impact:** Better crawl coverage, link authority distribution, user engagement  
**Effort:** 2 hours

For each blog post, add:
1. A link to the relevant service page (e.g., bathroom cost post → bathroom renovation page)
2. Links to 2–3 related blog posts
3. A link to the FAQ page if the post covers Q&A topics

Example for `bathroom-renovation-cost-brantford.html`:
- Add: "See our [bathroom renovation services](/pages/bathroom-renovation-brantford.html)"
- Add: "Related: [Bathroom Renovation Timeline in Brant County](/blog/bathroom-renovation-timeline-brant-county.html)"
- Add: "Related: [How to Choose a Renovation Contractor](/blog/how-to-choose-a-renovation-contractor-brantford.html)"

---

## Medium — Fix Within 1 Month

### M1. Expand FAQPage schema to all 15 questions
**File:** `pages/faq.html`  
**Impact:** Rich result eligibility for 10 more FAQ questions  
**Effort:** 30 minutes

The existing schema (lines 21–33) has 5 questions. Add the remaining 10 from the page body. Each needs `@type: Question` with `name` and `acceptedAnswer.text`.

---

### M2. Fix contact page schema
**File:** `pages/contact.html`  
**Impact:** Entity completeness for the contact page  
**Effort:** 10 minutes

Add to the `HomeAndConstructionBusiness` entity in the contact page schema:
```json
"telephone": "+12269387108",
"openingHours": "Mo-Fr 07:00-17:00",
"address": {
  "@type": "PostalAddress",
  "streetAddress": "20 Balmoral St",
  "addressLocality": "Paris",
  "addressRegion": "ON",
  "postalCode": "N3L 2H1",
  "addressCountry": "CA"
}
```

---

### M3. Add BreadcrumbList schema to blog posts and service pages
**Files:** All blog posts, service pages  
**Impact:** Breadcrumb rich results in SERP snippets; cleaner URL path display  
**Effort:** 1 hour (apply to template)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://handkindconstruction.ca/"},
    {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://handkindconstruction.ca/blog/index.html"},
    {"@type": "ListItem", "position": 3, "name": "[Post Title]", "item": "https://handkindconstruction.ca/blog/[slug].html"}
  ]
}
```

---

### M4. Convert project cards from CSS background-image to `<img>` tags
**Files:** `index.html`, `pages/projects.html`  
**Impact:** Alt text for accessibility + image search indexing + LCP eligibility  
**Effort:** 2–3 hours

Replace this pattern:
```html
<div class="project-photo" style="background-image:url('/assets/projects/bathroom-ensuite-glass-shower.avif');"></div>
```

With:
```html
<img class="project-photo" src="/assets/projects/bathroom-ensuite-glass-shower.avif" 
     alt="Ensuite glass shower renovation — HandKind Construction, Paris Ontario" 
     loading="lazy" width="400" height="300">
```

Add descriptive alt text to every project image using the format: `[Project type] — [location], HandKind Construction`.

---

### M5. Fix performance: preload and self-host the hero image
**File:** `index.html`  
**Impact:** Estimated LCP improvement of 400–1500ms (from Needs Improvement → Good)

**Quick fix (immediate):** Add preconnect + preload for the wsimg.com hero image:
```html
<link rel="preconnect" href="https://img1.wsimg.com">
<link rel="preload" as="image" 
      href="https://img1.wsimg.com/isteam/ip/aa097d1d-e629-4807-b052-e57bc0bbb8db/f48a6c35-def1-49be-bc41-f10cd9dd03f3.jpg/:/rs=w:1200,cg:true" 
      fetchpriority="high">
```

**Proper fix (recommended):** Download the hero image, convert to AVIF, self-host at `/assets/hero.avif`, and replace the CSS `background-image` with an `<img>` tag with `fetchpriority="high"`. This eliminates the third-party dependency and makes the image discoverable by the HTML preload scanner.

---

### M6. Reserve height for JS-injected marquee (fix CLS)
**File:** `index.html` and `css/main.css`  
**Impact:** Reduces layout shift score (CLS)  
**Effort:** 10 minutes

Add a min-height to `.marquee-placeholder` in CSS to reserve space before JS injection:
```css
.marquee-placeholder {
  min-height: 48px; /* match rendered marquee height */
}
```

---

### M7. Sync local posts.json with live site
**File:** `blog/posts.json`  
**Impact:** Related posts widget on blog post pages shows all 12 posts, not just 6  
**Effort:** 15 minutes

Add the 6 newer blog post entries to `blog/posts.json`:
- kitchen-vs-basement-renovation-value-brantford (May 27, 2026)
- egress-windows-brantford-basement (May 13, 2026)
- in-floor-heating-brantford-bathrooms (May 7, 2026)
- open-concept-kitchen-brantford (April 30, 2026)
- kitchen-renovation-permit-brantford (April 23, 2026)
- basement-finishing-cost-brantford (April 16, 2026)

---

### M8. Expand blog post word counts
**Files:** All blog posts  
**Impact:** Better topical coverage for competitive renovation cost keywords  
**Effort:** 1–2 hours per post

Target 1,500–2,000 words for posts targeting high-volume queries:
- "how much does a kitchen renovation cost in brantford" → expand to 2,000+ words with cost breakdown tables, neighbourhood-specific notes, before/after examples
- "how much does a bathroom renovation cost in brantford" → same approach
- "basement finishing cost brantford" → same approach

Add comparison tables, step-by-step breakdowns, and local permit cost details to increase depth.

---

### M9. Add Twitter Card meta tags
**Files:** All pages  
**Impact:** Better appearance when shared on X/Twitter  
**Effort:** 30 minutes

Add to all pages:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[page title]">
<meta name="twitter:description" content="[meta description]">
<meta name="twitter:image" content="https://handkindconstruction.ca/assets/og-image.jpg">
```

---

## Low — Backlog

### L1. Create llms.txt
**File:** `/llms.txt` (new file at root)  
**Impact:** Helps AI assistants understand site structure  
**Effort:** 15 minutes

```
# HandKind Construction Co.
> Home renovation contractor serving Brantford, Paris and Brant County, Ontario. Kitchens, bathrooms, basements, additions and ARUs.

## Key pages
- Homepage: https://handkindconstruction.ca/
- Kitchen renovations: https://handkindconstruction.ca/pages/kitchen-renovation-brantford.html
- Bathroom renovations: https://handkindconstruction.ca/pages/bathroom-renovation-brantford.html
- Basement finishing: https://handkindconstruction.ca/pages/basement-finishing-brantford.html
- Free estimate: https://handkindconstruction.ca/pages/estimate.html
- Blog: https://handkindconstruction.ca/blog/index.html
- FAQ: https://handkindconstruction.ca/pages/faq.html
```

---

### L2. Add author bio page
**Impact:** E-E-A-T signal; links blog authorship to a real person  
**Effort:** 1 hour

Create `/pages/about.html` with Adam McQuaig's bio, credentials, and photo. Link from blog post bylines.

---

### L3. Link review sources on homepage
**Impact:** Trust signal; directs users to verify reviews  
**Effort:** 15 minutes

Replace the generic "Reviews from HomeStars and Google" note with direct links:
- Link to the actual HandKind HomeStars profile
- Link to the Google Business Profile review page

Use real reviewer names in testimonials where clients have consented.

---

### L4. Add BlogPosting schema image property
**Files:** All blog posts in local repo  
**Impact:** Rich result eligibility for `Article` type  
**Effort:** 10 minutes per post (after featured images are created — depends on H6)

Add to each blog post's `BlogPosting` schema:
```json
"image": {
  "@type": "ImageObject",
  "url": "https://handkindconstruction.ca/assets/blog/[post-image].avif",
  "width": 1200,
  "height": 630
},
"keywords": ["bathroom renovation", "Brantford", "renovation cost"],
"articleSection": "Bathrooms"
```

---

## Link Building Recommendations

Based on the backlink analysis, priority opportunities for a local contractor in Brantford:

| Priority | Opportunity | Notes |
|---|---|---|
| Critical | HomeStars profile | Dominates Canadian renovation SERPs; followed link |
| Critical | Houzz profile with project photos | Strong domain authority; use existing project photos |
| High | Brantford & District Home Builders' Assoc. | Member directory link |
| High | Brant County Chamber of Commerce | Local authority directory |
| High | Supplier dealer locator pages | Tile, cabinetry, lumber suppliers often have "find a dealer" pages |
| Medium | Brantford Expositor / Paris Star feature | Local press links carry outsized local authority |
| Medium | Guest post on local real estate agent blogs | "What renovations add value before listing in Brant County" |
| Low | Nextdoor business profile | Community trust signal |

---

## Implementation Roadmap

```
Week 1 (Critical + Quick Wins)
├── C1: Fix 404 additions page or update link
├── C2: Update all canonical URLs to match actual file paths
├── H1: Add meta descriptions to 3 service pages
├── H4: Expand homepage business schema
└── H5: Add AggregateRating schema

Week 2 (High Impact SEO)
├── H2: Add Open Graph tags + create shared og-image
├── H3: Add Service schema to 3 service pages
└── M5: Add preconnect + preload for hero image (quick fix)

Week 3 (Content & Internal Links)
├── H6: Source/create featured images for blog posts
├── H7: Add internal links to all blog posts
└── M7: Sync posts.json with live site

Week 4 (Schema & Technical Cleanup)
├── M1: Expand FAQ schema to 15 questions
├── M2: Fix contact page schema
├── M3: Add BreadcrumbList to blog posts
├── M4: Convert project cards to <img> tags
└── M9: Add Twitter Card meta tags

Month 2 (Content Depth + Link Building)
├── M8: Expand blog post word counts
├── L1: Create llms.txt
├── L2: Add author bio page
├── L3: Link review sources
└── Link building: HomeStars + Houzz profiles
```

# HandKind Blog — Wednesday Workflow

Post a new article every Wednesday in under 30 minutes. Here's the exact process.

---

## The 4-step Wednesday routine

### Step 1 — Duplicate the template (2 min)
Copy `blog/_TEMPLATE.html` and rename it using this format:
```
blog/your-post-title-here.html
```
Use hyphens, all lowercase, no special characters. This becomes your URL slug.

**Good slugs:**
- `basement-renovation-cost-brantford-2026.html`
- `how-to-choose-a-bathroom-tile-brant-county.html`
- `kitchen-renovation-permit-brantford.html`

---

### Step 2 — Fill in the template (20 min)
Open your new file and replace every `CHANGE THIS` placeholder:

| Placeholder | Replace with |
|---|---|
| `POST TITLE HERE` | Your article headline (also the H1) |
| `POST EXCERPT HERE` | One sentence, under 160 chars, include "Brantford" or "Brant County" |
| `POST-SLUG-HERE` | The filename without .html (e.g. `kitchen-renovation-permit-brantford`) |
| `YYYY-MM-DD` | Today's date (e.g. `2026-03-25`) |
| `CATEGORY` | One of: Kitchens / Bathrooms / Basements / Additions & ARUs / General |
| `LOCATION` | Brantford / Brant County / Paris, Ontario |
| `X min read` | Estimate: ~1 min per 200 words |

Then write your post content between the `<div class="post-body">` tags.

**Aim for 500–900 words.** Use:
- `<h2>` for main section headings (these are SEO sub-keywords)
- `<p>` for paragraphs
- `<ul>` / `<li>` for lists of 3+ items
- `<blockquote>` for a key takeaway
- `<table>` for cost ranges or comparisons
- `<strong>` for important terms within paragraphs

---

### Step 3 — Add to posts.json (5 min)
Open `blog/posts.json` and add a new entry at the **top** of the array:

```json
{
  "slug": "your-post-slug-here",
  "title": "Your Post Title Here",
  "date": "2026-03-25",
  "author": "Adam McQuaig",
  "category": "Kitchens",
  "location": "Brantford",
  "excerpt": "One sentence excerpt under 160 characters — same as your meta description.",
  "image": "",
  "featured": false
},
```

Set `"featured": true` only if this is the post you want to display prominently on the blog index. Usually only the most recent one is featured.

---

### Step 4 — Upload (3 min)
Upload two files to your web host:
1. `blog/your-new-post.html`
2. `blog/posts.json` (updated with the new entry)

That's it. The blog index will automatically show the new post, the related posts will update on all other post pages, and Google will index the new URL within a day or two once you've submitted your sitemap.

---

## Post ideas by keyword (pre-researched)

Use this list on weeks when you're not sure what to write about. Each is a real search term Brantford homeowners use:

| Post idea | Target keyword | Est. competition |
|---|---|---|
| How much does a bathroom renovation cost in Brantford? | bathroom renovation cost Brantford | Low |
| Kitchen renovation permits in Brantford — do you need one? | kitchen renovation permit Brantford | Very low |
| Basement finishing checklist for Brant County homeowners | basement finishing Brant County | Very low |
| Open concept kitchen renovations in Brantford: what's involved | open concept kitchen Brantford | Low |
| How to pick a renovation contractor in Brantford | renovation contractor Brantford | Medium |
| Schluter shower systems — why we use them on every bathroom | Schluter shower Brantford | Very low |
| 5 kitchen renovation mistakes Brantford homeowners make | kitchen renovation mistakes Ontario | Low |
| What does a home addition cost in Paris, Ontario? | home addition cost Paris Ontario | Very low |
| Basement egress windows in Brantford — rules and costs | egress window Brantford | Low |
| Kitchen vs basement renovation — which adds more value? | renovation value Brantford | Low |
| How long does a home addition take in Brant County? | home addition timeline Brant County | Very low |
| In-floor heating in Brantford bathrooms — worth it? | bathroom heated floor Brantford | Very low |

---

## SEO checklist for every post

Before you publish, confirm:

- [ ] Title includes "Brantford" or "Brant County" (or both)
- [ ] Meta description is under 160 characters and includes the primary keyword
- [ ] The `slug` in posts.json matches the filename exactly
- [ ] Date is set to the publish date (not in the future)
- [ ] At least one H2 includes the primary keyword or a close variant
- [ ] Post ends with a call to action linking to `/pages/estimate.html`
- [ ] Schema `datePublished` and `dateModified` are both set

---

## Adding a photo to a post

1. Export the image at 1200px wide, save as a `.jpg`
2. Name it the same as the post slug: `your-post-slug-here.jpg`
3. Upload to `assets/blog/`
4. In the post HTML, uncomment the `<!-- HERO IMAGE -->` block and update the `src` and `alt`
5. In `posts.json`, update `"image": "/assets/blog/your-post-slug-here.jpg"`

For project photos, crop to 16:9 before uploading — this matches the card layout on the blog index.

---

## Adding a new category

If you want to add a category beyond the current five (Kitchens, Bathrooms, Basements, Additions & ARUs, General), just use it in `posts.json`. The filter buttons on the blog index auto-generate from whatever categories exist in the data.

---

## Calendar suggestion (rotate to cover all keywords)

| Week | Theme |
|---|---|
| Week 1 | Kitchens — cost, timeline, or process |
| Week 2 | Bathrooms — cost, timeline, or material choice |
| Week 3 | Basements or ARUs |
| Week 4 | General — contractor tips, permit guides, local market |

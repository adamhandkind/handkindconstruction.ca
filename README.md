# HandKind Construction — Website

Static HTML/CSS/JS site. No framework, no build step. Open any `.html` file in a browser or serve with any static host.

## File Structure

```
handkind/
├── index.html              ← Homepage
├── assets/
│   └── logo.png            ← HandKind logo (no tagline, transparent bg)
├── css/
│   └── main.css            ← All shared styles
├── js/
│   └── main.js             ← Nav, footer, marquee injection + FAQ accordion
└── pages/
    ├── services.html        ← Service detail pages
    ├── projects.html        ← Portfolio with category filter
    ├── careers.html         ← Job listings
    ├── faq.html             ← Full FAQ (static, SEO-indexed)
    ├── contact.html         ← Contact page with form
    └── estimate.html        ← JobTread estimate form (branded)
```

## Running Locally

**Option 1 — VS Code Live Server**
Install the Live Server extension, right-click `index.html` → Open with Live Server.

**Option 2 — Python (no install needed)**
```bash
cd handkind
python3 -m http.server 8000
```
Then open http://localhost:8000

**Option 3 — npx serve**
```bash
npx serve handkind
```

## Deploying

**Netlify (recommended)**
1. Drag the `handkind/` folder into app.netlify.com/drop
2. Or: `netlify deploy --dir=handkind --prod`

**Vercel**
```bash
vercel --name handkind
```

**GitHub Pages**
Push to a repo, enable Pages from Settings → point to root or `/docs`.

## Updating Content

All nav links, the footer, the marquee and the CTA block are injected by `js/main.js` — edit them once there and they update across all pages.

Each page is self-contained otherwise. Add project photos by replacing the placeholder divs in `projects.html` and `index.html`.

## JobTread Form

The form in `pages/estimate.html` submits to JobTread via:
- `data-key="22TAE6ZehZcdDvJ5xssdX3Mrd8w6Hc2ERW"`
- All `name` attributes on inputs match the original form exactly
- The `web-form.js` script handles submission

Do not change the `data-key` or any `name` attributes or submissions will break.

## SEO Notes

- Each page has a unique `<title>` and `<meta name="description">`
- Homepage has LocalBusiness + FAQPage schema markup
- FAQ page has its own FAQPage schema
- All copy targets Brantford/Brant County/Paris keyword combinations
- Add `sitemap.xml` and submit to Google Search Console once deployed

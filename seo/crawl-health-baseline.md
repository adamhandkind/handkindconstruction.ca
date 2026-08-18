# T-28 — Local Crawl Health Baseline (partial, repo-source-level)

**Date:** 2026-08-12. Scope covered here: internal link integrity and JSON-LD syntax validity, checked directly against repo source (49 HTML files: root pages, `pages/`, `pages/locations/`, `blog/`, excluding `_TEMPLATE.html`).

**Not yet covered** (needs a live crawl or manual pass, deferred): duplicate title/meta-description detection across all 45 pages (T-03 spot-checked priority pages only), mobile layout/CLS check, working forms/nav check, live redirect chains (see T-06/T-07/T-09 — blocked on the `.htaccess` question). Full T-28 close-out should happen after Phase 2/3 land, per the spec's own placement of validation after the changes it validates.

## Internal links

Checked both `href="/absolute/path"` and relative (`href="file.html"`) and full-domain (`href="https://handkindconstruction.ca/..."`) internal links across all 49 files against the actual file tree.

**Result: 0 broken internal links found.** Every internal link resolves to a real file.

## JSON-LD

Extracted every `<script type="application/ld+json">` block across all 49 files and parsed each as JSON.

**Result: 0 parse errors.** Every JSON-LD block on the site is syntactically valid.

## Conclusion

The site's internal linking and structured-data syntax are both in good shape at the source level — no cleanup needed before Phase 2/3 work begins. This is a good sign that prior remediation passes (referenced in `ACTION-PLAN.md`, `HOMEPAGE-REMEDIATION-SPEC.md`) already caught the obvious breakage; what's left is genuinely about strategy/access (T-04, T-05) and the hosting-redirect mystery (T-01), not basic hygiene.

---

## 2026-08-18 — Live pass: mobile layout, CLS, forms, nav (closes remaining T-29 scope)

Checked directly against production (`https://handkindconstruction.ca`), not repo source. Redirect chains already closed live in `_progress.md` T-01/T-30; internal link 404 check re-run live in `preflight-inventory.md`'s 2026-08-18 section (0 broken).

**Mobile layout (375×812 viewport, homepage):** no horizontal overflow (`scrollWidth` == `viewportWidth`). Hamburger nav (`#nav-toggle`) present with correct `aria-expanded`/`aria-controls` wiring; clicking it toggles `aria-expanded` false→true and reveals the full nav list (Home, Services, Projects, Process, About, FAQ, Blog, Contact, phone number) — functions correctly.

**CLS risk (image dimensions):** the homepage hero/LCP image (`main_floor_open_concept_kitchen.avif`) has explicit `width`/`height` matching its natural dimensions (1512×2016) — reserves layout space correctly, low CLS risk. The 4 below-fold lazy-loaded images also carry explicit `width="800" height="600"`. **Minor gap:** the header/footer logo (`logo.avif`, 2 instances) has no `width`/`height` attributes — low severity given its small display size (~88×36px), but worth adding next time that template is touched.

**Console errors:** zero console errors on homepage, `/pages/estimate.html`, or `/pages/contact.html`.

**Forms (structure only — not submitted, to avoid generating fake leads in the live JobTread pipeline):** estimate form (`#estimate-form`, JobTread-embedded widget) has all expected required fields intact — `contact.name`, email, phone, `location.address`, and a required consent checkbox. Contact form has required `contact.name`, email, and `job.description` fields intact. `tel:` links resolve to `+12269387108` and `mailto:` links to `hello@handkindconstruction.ca` / `careers@handkindconstruction.ca` — both match the T-06-confirmed NAP.

**Conclusion: T-29 fully closed.** No broken links, no console errors, mobile nav functions, CLS risk is low (one minor missing-dimensions logo, not worth a standalone fix), and both lead-capture forms are structurally intact.

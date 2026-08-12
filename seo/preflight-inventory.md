# T-01 / T-02 / T-03 — Pre-flight Inventory

## T-01 — Platform & architecture

- **Repo:** static HTML, no build step, no templating engine (each page is hand-authored HTML with a repeated `<head>`/nav/footer block copy-pasted per file).
- **Declared CI/CD:** `.github/workflows/static.yml` deploys the repo to **GitHub Pages** on every push to `main`.
- **Live production host (verified via `curl -I https://handkindconstruction.ca/`):** `Server: Apache`, real filesystem-style ETag (`"65a5887-858b-65770736d147c"`), `Last-Modified: Sat, 25 Jul 2026`. This is **not** how GitHub Pages responds (GH Pages fronts through Fastly/GitHub.com headers, not raw Apache inode ETags).
- **⚠️ CRITICAL FINDING — redirect mechanism is not functioning live:**
  - `.htaccess` exists in the repo (committed 2026-07-17, rules for https-force, non-www-force, `/blog/index.html` → `/blog/`, `/index.html` → `/`) and assumes Apache + mod_rewrite.
  - Live test results (all via `curl -I`):
    | URL | Expected | Actual |
    |---|---|---|
    | `http://handkindconstruction.ca/` | 301 → https apex | **200 (no redirect)** |
    | `http://www.handkindconstruction.ca/` | 301 → https apex | **200 (no redirect)** |
    | `https://www.handkindconstruction.ca/` | 301 → https apex | **200 (no redirect)** |
    | `https://handkindconstruction.ca/blog` | 301 → `/blog/` | 301 ✅ (works — but this is likely Apache's default `mod_dir` DirectorySlash behavior, not the `.htaccess` rule) |
    | `https://handkindconstruction.ca/blog/index.html` | 301 → `/blog/` | **200 (no redirect)** |
    | `https://handkindconstruction.ca/index.html` | 301 → `/` | **200 (no redirect)** |
  - `http`, `www`, and `https-www` all return **identical content and ETag** to the canonical apex-https URL — i.e., the site is fully reachable on 4 different host/protocol combinations with zero consolidation. This is exactly the split-signal problem T-06/T-07 are meant to fix, and the fix that's supposed to already be live (per the committed `.htaccess`) is not taking effect.
  - Homepage `Last-Modified: 2026-07-25` matches the last real content commit to `index.html` (`689c0b8`, 2026-07-25) — so the live site **is** in sync with `main` content-wise. The redirect logic specifically is the piece not working.
- **Resolved — the domain is not on GitHub Pages at all.** `handkindconstruction.ca` resolves to `132.148.183.84`, which is not a GitHub Pages IP (those are `185.199.108-111.153`). It's a traditional shared/cPanel-style Apache IP block. `HOMEPAGE-REMEDIATION-SPEC.md` (2026-07-18) asserts the site is "hosted on GitHub Pages" — **that assumption is incorrect**, or was true at some earlier point and the domain was since repointed. Either way: **the GitHub Actions workflow (`static.yml`) that deploys to GitHub Pages is not what's serving production.** Something else — a separate FTP/cPanel/Git-deploy hook the repo doesn't document — pushes content to the real host, and that pipeline is not syncing `.htaccess` changes (or `AllowOverride` is disabled there).
- **This blocks T-06 (canonical host redirects) from safe implementation** until we know: (a) how files actually get from this repo to production, and (b) whether there's panel/FTP access to verify `.htaccess` is present/active on the live host, or whether redirects need to be set at the DNS/host level instead (e.g. cPanel redirect rules, or the registrar's forwarding).

## T-02 — Real URL inventory (indexable content pages)

| URL | File | Notes |
|---|---|---|
| `/` | `index.html` | Homepage |
| `/pages/kitchen-renovation-brantford.html` | ✓ | Kitchen service |
| `/pages/bathroom-renovation-brantford.html` | ✓ | Bathroom service |
| `/pages/basement-finishing-brantford.html` | ✓ | Basement service (confirmed existing per spec) |
| `/pages/home-additions-arus-brantford.html` | ✓ | Additions/ARU service (confirmed existing per spec) |
| `/pages/services.html` | ✓ | Services hub |
| `/pages/process.html` | ✓ | |
| `/pages/about.html` | ✓ | |
| `/pages/contact.html` | ✓ | |
| `/pages/estimate.html` | ✓ | |
| `/pages/faq.html` | ✓ | |
| `/pages/careers.html` | ✓ | |
| `/pages/reviews.html` | ✓ | |
| `/pages/projects.html` | ✓ | Projects hub |
| `/pages/project-*.html` (10 files) | ✓ | condo-main-level, covered-porch-paris, detached-garage-paris, full-basement-finish-brantford, garage-overhaul-brantford, he-shed-paris, his-her-bathrooms-paris, kathleen-garage-paris, pharmacy-fitout-brantford, screened-cat-porch-paris |
| `/pages/locations/brantford.html` | ✓ | Location page |
| `/pages/locations/paris.html` | ✓ | Location page |
| `/pages/locations/brant-county.html` | ✓ | Location page |
| `/pages/locations/cambridge.html` | ✓ | **Not in spec's 3 named location pages** — prior commit history shows "Cambridge deindex" work (2e55952, 2026-07-17); verify current indexability intent before touching |
| `/blog/` (`blog/index.html`) | ✓ | Blog index |
| `/blog/*.html` (14 posts) | ✓ | See list below |
| `/privacy.html` | ✓ | |
| `/404.html` | ✓ | Not indexable (error page) |
| `/thank-you.html` | ✓ | Likely `noindex` — verify |

Blog posts (16): `5-kitchen-renovation-mistakes-brantford`, `aru-secondary-suite-brantford-guide`, `basement-finishing-cost-brantford`, `bathroom-renovation-cost-brantford`, `bathroom-renovation-timeline-brant-county`, `egress-windows-brantford-basement`, `home-addition-cost-paris-ontario`, `how-much-does-a-kitchen-renovation-cost-brantford`, `how-to-choose-a-renovation-contractor-brantford`, `hst-rebate-substantial-renovation-brantford`, `in-floor-heating-brantford-bathrooms`, `kitchen-renovation-permit-brantford`, `kitchen-vs-basement-renovation-value-brantford`, `main-floor-renovation-cost-brantford`, `open-concept-kitchen-brantford`, `whole-home-renovation-cost-brantford`.

**Total real indexable pages: 45** (not ~1,000, confirming the spec's correction) — corrected count after cross-checking against `sitemap.xml` for T-10/T-11 (see below); earlier estimate of "~44" undercounted blog posts by 2. `blog/_TEMPLATE.html` and `blog/posts.json` are non-indexable build artifacts, not pages.

Non-content repo files that are NOT pages: `ACTION-PLAN.md`, `AUDIT_REPORT.md`, `FULL-AUDIT-REPORT.md`, `HOMEPAGE-REMEDIATION-SPEC.md`, `README.md`, `scripts/*.py`, `5779d4d7204d4d2ab263d856d4a3fcbc.txt` (likely a search-console or Bing verification file — confirm before deleting).

**Prior SEO work already exists in-repo:** `ACTION-PLAN.md`, `AUDIT_REPORT.md`, `FULL-AUDIT-REPORT.md`, `HOMEPAGE-REMEDIATION-SPEC.md` — these look like outputs of earlier SEO passes (commit history shows dated "Phase D", "Site audit remediation", "Homepage: schema upgrades" work already landed 2026-07-17 → 2026-07-25). **Read these before assuming any T-0x baseline is unknown** — some pre-flight ground may already be covered.

## T-03 — Metadata snapshot (2026-08-12, from repo source — see T-01 host caveat)

| Page | Title | Canonical |
|---|---|---|
| `/` | Home Renovations in Brantford & Brant County \| HandKind Construction | self, apex-https ✅ |
| `/pages/kitchen-renovation-brantford.html` | Kitchen Renovations \| Brantford, Paris & Brant County \| HandKind | self ✅ |
| `/pages/bathroom-renovation-brantford.html` | Bathroom Renovations \| Brantford, Paris & Brant County \| HandKind | self ✅ |
| `/pages/basement-finishing-brantford.html` | Basement Finishing \| Brantford, Paris & Brant County \| HandKind | self ✅ |
| `/pages/home-additions-arus-brantford.html` | Home Additions & ARUs \| Brantford, Paris & Brant County \| HandKind | self ✅ |
| `/pages/services.html` | Renovation Services in Brantford \| HandKind Construction | self ✅ |
| `/pages/projects.html` | Renovation Projects in Brantford \| HandKind Construction | self ✅ |
| `/pages/contact.html` | Contact HandKind Construction \| Brantford & Paris | self ✅ |
| `/pages/estimate.html` | Start Your Project — HandKind Construction Brantford | self ✅ |
| `/pages/faq.html` | Home Renovation FAQs \| Brantford & Brant County | self ✅ |
| `/pages/about.html` | About HandKind Construction \| Brantford & Brant County | self ✅ |
| `/pages/locations/brantford.html` | Home Renovations in Brantford, Ontario \| HandKind Construction | self ✅ |
| `/pages/locations/paris.html` | Home Renovations in Paris, Ontario \| HandKind Construction | self ✅ |
| `/pages/locations/brant-county.html` | Home Renovations in Brant County \| HandKind Construction | self ✅ |
| `/blog/` | Renovation Blog \| HandKind Construction Brantford | self, `/blog/` ✅ |

**Finding:** every priority page already has a unique title, a written (non-boilerplate) meta description, and a correct self-referential apex-https canonical. This matches the spec's own note in §6 that titles are "already reasonable" — **T-12/T-13 should be a light audit against T-04 query data, not a rewrite pass.** T-08 (self-referential canonicals) already appears satisfied at the source level; what's unverified is whether the *live* host serves the same `<head>` given the T-01 deploy-pipeline uncertainty.

H1s and JSON-LD not yet captured — next pass if needed once T-01's deploy question is resolved (no point auditing live-vs-source drift twice).

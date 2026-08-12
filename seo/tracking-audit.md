# T-36a — Conversion Tracking Audit (read-only, source-level)

**Analytics:** GA4 installed sitewide via gtag.js, property `G-2Q3G09W17B` ([js snippet in every page head], confirmed on `index.html` and `thank-you.html`).

## What's tracked (all via `js/main.js` delegated click handler + `thank-you.html`)

| Event | Trigger | Params | Where |
|---|---|---|---|
| `phone_click` | any `tel:` link click | `cta_location` (nav/footer/hero/cta_section/page_body) | `js/main.js:201-206` |
| `email_click` | any `mailto:` link click | `cta_location` | `js/main.js:208-212` |
| `generate_lead` | arrival on `/thank-you.html` after estimate-form submit | `form_id: 'estimate'` | `thank-you.html:49-59`, deduped once per session via `sessionStorage` |
| `cta_click` / `location_page_cta_click` | button/nav CTA clicks | `cta_label`, `cta_location` | `js/main.js:233-239` |
| `service_card_click`, `project_card_click`, `blog_article_click` | engagement events | varies | `js/main.js` |

Both lead forms (`pages/estimate.html`, `pages/contact.html`) are JobTread embedded web forms (`data-jobtread-web-form`, same `data-key`) that redirect to `data-success-url="/thank-you.html"` on success — so `generate_lead` fires for **both** the estimate form and the general-inquiry contact form (not distinguished from each other; `form_id` is hardcoded to `'estimate'` even when the contact form was the source).

## Gaps / findings

1. **Contact-form submissions are conflated with estimate-form submissions.** Both land on the same `/thank-you.html` and both fire `generate_lead` with `form_id: 'estimate'`. If lead-quality reporting needs to separate "wants a full project estimate" from "general question," this can't currently be split. Low-effort fix if wanted: pass a query param or referrer check into `thank-you.html` to set `form_id` correctly — **not done here, this is Phase 2+ implementation, flagging only.**
2. **No `phoneHref` distinction between location pages** — `phone_click` captures `cta_location` context but not which page/service the click came from beyond that. Acceptable for current measurement needs.
3. Tracking is entirely **client-side gtag** — no server-side/GTM server container, no Google Ads conversion linkage confirmed (out of scope to verify without Ads account access).

## Conclusion

**T-36a is effectively already satisfied** — form submissions (via thank-you.html arrival), tel: clicks, and mailto: clicks are all tracked with GA4 events. The spec's premise ("without T-36a, results are measurable in clicks/rankings only, not leads") does not hold for this site — lead tracking already exists. The one real gap (estimate vs. contact-form conflation) is minor and optional to fix.

**Status: done, not blocked.** No implementation needed unless Adam wants form-type separation.

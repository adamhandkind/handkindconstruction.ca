/* ─────────────────────────────────────────────
   HandKind Construction — Main JS
   ───────────────────────────────────────────── */

const NAV_HTML = `
<nav class="nav" id="site-nav">
  <a href="/index.html" class="nav-logo">
    <img src="/assets/logo.avif" alt="HandKind Construction">
  </a>
  <ul class="nav-links">
    <li><a href="/index.html">Home</a></li>
    <li><a href="/pages/services.html">Services</a></li>
    <li><a href="/pages/projects.html">Projects</a></li>
    <li><a href="/pages/faq.html">FAQ</a></li>
    <li><a href="/blog/index.html">Blog</a></li>
    <li><a href="/pages/careers.html">Careers</a></li>
    <li><a href="/pages/contact.html">Contact</a></li>
  </ul>
  <a href="/pages/estimate.html" class="nav-cta">Get a Free Estimate</a>
</nav>`;

const MARQUEE_HTML = `
<div class="marquee-strip" aria-hidden="true">
  <div class="marquee-inner">
    <span class="marquee-item">Kitchen Renovations Brantford<span class="marquee-dot"></span></span>
    <span class="marquee-item">Bathroom Renovations Brant County<span class="marquee-dot"></span></span>
    <span class="marquee-item">Basement Finishing Brantford<span class="marquee-dot"></span></span>
    <span class="marquee-item">Home Additions Paris Ontario<span class="marquee-dot"></span></span>
    <span class="marquee-item">ARU Construction Brant County<span class="marquee-dot"></span></span>
    <span class="marquee-item">Built by Hand, Defined by Kind<span class="marquee-dot"></span></span>
    <span class="marquee-item">Kitchen Renovations Brantford<span class="marquee-dot"></span></span>
    <span class="marquee-item">Bathroom Renovations Brant County<span class="marquee-dot"></span></span>
    <span class="marquee-item">Basement Finishing Brantford<span class="marquee-dot"></span></span>
    <span class="marquee-item">Home Additions Paris Ontario<span class="marquee-dot"></span></span>
    <span class="marquee-item">ARU Construction Brant County<span class="marquee-dot"></span></span>
    <span class="marquee-item">Built by Hand, Defined by Kind<span class="marquee-dot"></span></span>
  </div>
</div>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="footer-logo">
    <img src="/assets/logo.avif" alt="HandKind Construction">
  </div>
  <ul class="footer-links">
    <li><a href="/index.html">Home</a></li>
    <li><a href="/pages/services.html">Services</a></li>
    <li><a href="/pages/projects.html">Projects</a></li>
    <li><a href="/pages/careers.html">Careers</a></li>
    <li><a href="/pages/faq.html">FAQ</a></li>
    <li><a href="/pages/contact.html">Contact</a></li>
    <li><a href="/blog/index.html">Blog</a></li>
    <li><a href="/pages/estimate.html">Free Estimate</a></li>
  </ul>
  <div class="footer-right">
    &copy; 2026 HandKind Construction Co.<br>
    20 Balmoral St, Paris, ON &middot; <a href="tel:+12269387108" style="color:inherit;text-decoration:none;">+1 226-938-7108</a> &middot; Licensed &amp; Insured
  </div>
</footer>`;

const CTA_HTML = `
<div class="cta-section">
  <p class="cta-eyebrow">Paris, Ontario &middot; Serving Brantford &amp; Brant County</p>
  <h2 class="cta-title">Start your renovation<br><em>today</em></h2>
  <p class="cta-slogan">Built by hand, defined by kind.</p>
  <p class="cta-sub">Free on-site estimate. Transparent quote. A crew that shows up.</p>
  <a href="/pages/estimate.html" class="btn btn--white">Get Your Free Estimate</a>
  <p class="cta-address">20 Balmoral St, Paris, ON &middot; handkindconstruction.ca &middot; Licensed &amp; Insured</p>
</div>`;

document.addEventListener('DOMContentLoaded', () => {

  // Inject nav
  const navEl = document.getElementById('nav-placeholder');
  if (navEl) navEl.outerHTML = NAV_HTML;

  // Inject marquee
  document.querySelectorAll('.marquee-placeholder').forEach(el => {
    el.outerHTML = MARQUEE_HTML;
  });

  // Inject CTA
  document.querySelectorAll('.cta-placeholder').forEach(el => {
    el.outerHTML = CTA_HTML;
  });

  // Inject footer
  const footerEl = document.getElementById('footer-placeholder');
  if (footerEl) footerEl.outerHTML = FOOTER_HTML;

  // Active nav link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') && path.endsWith(link.getAttribute('href').replace(/^\//, ''))) {
      link.classList.add('active');
    }
  });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Nav shadow on scroll
  const nav = document.getElementById('site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

});

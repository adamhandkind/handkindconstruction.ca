/* ─────────────────────────────────────────────
   HandKind Construction — Main JS
   ───────────────────────────────────────────── */

/* Central business info — single source, referenced by nav/footer/CTA below.
   TODO_VERIFY: hours and social links are not yet confirmed; omitted rather than invented. */
const BUSINESS = {
  phoneDisplay: '+1 226-938-7108',
  phoneHref: 'tel:+12269387108',
  email: 'hello@handkindconstruction.ca',
  addressDisplay: '20 Balmoral St, Paris, ON',
};

const NAV_HTML = `
<nav class="nav" id="site-nav">
  <a href="/index.html" class="nav-logo">
    <img src="/assets/logo.avif" alt="HandKind Construction">
  </a>
  <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links-list" aria-label="Open menu">
    <span class="nav-toggle-bar"></span>
    <span class="nav-toggle-bar"></span>
    <span class="nav-toggle-bar"></span>
  </button>
  <ul class="nav-links" id="nav-links-list">
    <li><a href="/index.html">Home</a></li>
    <li><a href="/pages/services.html">Services</a></li>
    <li><a href="/pages/projects.html">Projects</a></li>
    <li><a href="/pages/faq.html">FAQ</a></li>
    <li><a href="/blog/index.html">Blog</a></li>
    <li><a href="/pages/careers.html">Careers</a></li>
    <li><a href="/pages/contact.html">Contact</a></li>
    <li class="nav-links-phone"><a href="${BUSINESS.phoneHref}">${BUSINESS.phoneDisplay}</a></li>
  </ul>
  <div class="nav-actions">
    <a href="${BUSINESS.phoneHref}" class="nav-phone" aria-label="Call HandKind Construction">${BUSINESS.phoneDisplay}</a>
    <a href="/pages/estimate.html" class="nav-cta">Start Your Project</a>
  </div>
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
  <div class="footer-brand">
    <div class="footer-logo">
      <img src="/assets/logo.avif" alt="HandKind Construction">
    </div>
    <p class="footer-slogan">Built by hand, defined by kind.</p>
    <p class="footer-areas">Serving <a href="/pages/locations/brantford.html">Brantford</a>, <a href="/pages/locations/paris.html">Paris</a> &amp; <a href="/pages/locations/brant-county.html">Brant County</a></p>
  </div>
  <ul class="footer-links">
    <li><a href="/index.html">Home</a></li>
    <li><a href="/pages/services.html">Services</a></li>
    <li><a href="/pages/projects.html">Projects</a></li>
    <li><a href="/pages/careers.html">Careers</a></li>
    <li><a href="/pages/faq.html">FAQ</a></li>
    <li><a href="/pages/contact.html">Contact</a></li>
    <li><a href="/blog/index.html">Blog</a></li>
    <li><a href="/pages/estimate.html">Start Your Project</a></li>
  </ul>
  <div class="footer-right">
    &copy; 2026 HandKind Construction Co.<br>
    ${BUSINESS.addressDisplay} &middot; <a href="${BUSINESS.phoneHref}" style="color:inherit;text-decoration:none;">${BUSINESS.phoneDisplay}</a><br>
    <a href="mailto:${BUSINESS.email}" style="color:inherit;text-decoration:none;">${BUSINESS.email}</a>
  </div>
</footer>`;

const CTA_HTML = `
<div class="cta-section">
  <p class="cta-eyebrow">Paris, Ontario &middot; Serving Brantford &amp; Brant County</p>
  <h2 class="cta-title">Start your renovation<br><em>today</em></h2>
  <p class="cta-slogan">Built by hand, defined by kind.</p>
  <p class="cta-sub">Free on-site estimate. Transparent quote. A crew that shows up.</p>
  <a href="/pages/estimate.html" class="btn btn--white">Start Your Project</a>
  <p class="cta-address">${BUSINESS.addressDisplay} &middot; handkindconstruction.ca</p>
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
      link.setAttribute('aria-current', 'page');
    }
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinksList = document.getElementById('nav-links-list');
  if (navToggle && navLinksList) {
    const closeMenu = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
      navLinksList.classList.remove('open');
    };
    const openMenu = () => {
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Close menu');
      navLinksList.classList.add('open');
    };
    navToggle.addEventListener('click', () => {
      const isOpen = navLinksList.classList.contains('open');
      if (isOpen) closeMenu(); else openMenu();
    });
    navLinksList.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') closeMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinksList.classList.contains('open')) {
        closeMenu();
        navToggle.focus();
      }
    });
  }

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

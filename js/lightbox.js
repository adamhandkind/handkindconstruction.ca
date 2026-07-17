/* ─────────────────────────────────────────────
   HandKind Lightbox — project gallery viewer
   Keyboard-operable, focus-trapped, returns focus
   to the trigger element on close (HK-018).
   ───────────────────────────────────────────── */

(function () {
  const CSS = `
    #hk-lightbox {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(10, 10, 10, 0.93);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }
    #hk-lightbox.is-open {
      opacity: 1;
      pointer-events: all;
    }
    @media (prefers-reduced-motion: reduce) {
      #hk-lightbox, #hk-lightbox-img { transition: none; }
    }
    #hk-lightbox-img {
      max-width: min(92vw, 1400px);
      max-height: 88vh;
      object-fit: contain;
      display: block;
      border-radius: 2px;
      box-shadow: 0 8px 48px rgba(0,0,0,0.6);
      transition: opacity 0.2s ease;
      user-select: none;
      -webkit-user-drag: none;
    }
    #hk-lightbox-img.fading {
      opacity: 0;
    }
    .hk-lb-btn {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: rgba(255,255,255,0.75);
      font-size: 2rem;
      line-height: 1;
      padding: 1rem;
      cursor: pointer;
      transition: color 0.15s;
      z-index: 10000;
      user-select: none;
    }
    .hk-lb-btn:hover, .hk-lb-btn:focus-visible { color: #fff; }
    .hk-lb-btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    #hk-lb-prev { left: 0.5rem; }
    #hk-lb-next { right: 0.5rem; }
    #hk-lb-close {
      position: fixed;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      color: rgba(255,255,255,0.75);
      font-size: 1.75rem;
      line-height: 1;
      padding: 0.5rem;
      cursor: pointer;
      transition: color 0.15s;
      z-index: 10000;
    }
    #hk-lb-close:hover, #hk-lb-close:focus-visible { color: #fff; }
    #hk-lb-close:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    #hk-lb-counter {
      position: fixed;
      bottom: 1.25rem;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255,255,255,0.5);
      font-family: 'DM Sans', sans-serif;
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      pointer-events: none;
    }
    .proj-gallery img, .hk-lb-trigger {
      cursor: zoom-in;
      transition: opacity 0.2s;
    }
    .proj-gallery img:hover, .hk-lb-trigger:hover { opacity: 0.88; }
    .hk-lb-trigger:focus-visible {
      outline: 2px solid #fff;
      outline-offset: -4px;
    }
  `;

  function inject() {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    const lb = document.createElement('div');
    lb.id = 'hk-lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image viewer');
    lb.hidden = true;
    lb.innerHTML = `
      <img id="hk-lightbox-img" alt="">
      <button id="hk-lb-prev" class="hk-lb-btn" aria-label="Previous image">&#8592;</button>
      <button id="hk-lb-next" class="hk-lb-btn" aria-label="Next image">&#8594;</button>
      <button id="hk-lb-close" aria-label="Close image viewer">&#10005;</button>
      <div id="hk-lb-counter" aria-live="polite"></div>
    `;
    document.body.appendChild(lb);
  }

  let images = [];
  let current = 0;
  let triggerEl = null;

  function focusableEls() {
    const lb = document.getElementById('hk-lightbox');
    return Array.from(lb.querySelectorAll('button')).filter(el => el.style.visibility !== 'hidden');
  }

  function open(index, trigger) {
    current = index;
    triggerEl = trigger || document.activeElement;
    const lb = document.getElementById('hk-lightbox');
    lb.hidden = false;
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    render(false);
    document.getElementById('hk-lb-close').focus();
  }

  function close() {
    const lb = document.getElementById('hk-lightbox');
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    lb.hidden = true;
    if (triggerEl && typeof triggerEl.focus === 'function') {
      triggerEl.focus();
    }
    triggerEl = null;
  }

  function render(animate) {
    const img = document.getElementById('hk-lightbox-img');
    const counter = document.getElementById('hk-lb-counter');
    const prev = document.getElementById('hk-lb-prev');
    const next = document.getElementById('hk-lb-next');

    function apply() {
      img.src = images[current].src;
      img.alt = images[current].alt;
    }

    if (animate) {
      img.classList.add('fading');
      setTimeout(() => {
        apply();
        img.classList.remove('fading');
      }, 180);
    } else {
      apply();
    }

    counter.textContent = images.length > 1 ? `Image ${current + 1} of ${images.length}` : '';
    prev.style.visibility = images.length > 1 ? 'visible' : 'hidden';
    next.style.visibility = images.length > 1 ? 'visible' : 'hidden';
  }

  function prev() {
    current = (current - 1 + images.length) % images.length;
    render(true);
  }

  function next() {
    current = (current + 1) % images.length;
    render(true);
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const els = focusableEls();
    if (!els.length) return;
    const first = els[0];
    const last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function makeTriggerable(el) {
    el.classList.add('hk-lb-trigger');
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
    if (!el.hasAttribute('aria-label')) {
      const label = el.alt ? `View larger image: ${el.alt}` : 'View larger image';
      el.setAttribute('aria-label', label);
    }
  }

  function wireGroup(imgs) {
    imgs.forEach((img, i) => {
      makeTriggerable(img);
      const activate = () => {
        images = imgs.map(el => ({ src: el.src, alt: el.alt }));
        open(i, img);
      };
      img.addEventListener('click', activate);
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });
  }

  function init() {
    inject();

    // Multi-image case-study galleries
    document.querySelectorAll('.proj-gallery').forEach(gallery => {
      wireGroup(Array.from(gallery.querySelectorAll('img')));
    });

    // Standalone project-index cards (single-image "galleries")
    document.querySelectorAll('.proj-card:not(.proj-card--linked) > .proj-photo').forEach(img => {
      wireGroup([img]);
    });

    document.getElementById('hk-lb-close').addEventListener('click', close);
    document.getElementById('hk-lb-prev').addEventListener('click', (e) => { e.stopPropagation(); prev(); });
    document.getElementById('hk-lb-next').addEventListener('click', (e) => { e.stopPropagation(); next(); });

    document.getElementById('hk-lightbox').addEventListener('click', (e) => {
      if (e.target.id === 'hk-lightbox') close();
    });

    document.addEventListener('keydown', (e) => {
      const lb = document.getElementById('hk-lightbox');
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      trapFocus(e);
    });

    // Touch swipe support
    let touchStartX = 0;
    document.getElementById('hk-lightbox').addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    document.getElementById('hk-lightbox').addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

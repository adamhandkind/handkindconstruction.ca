/* ─────────────────────────────────────────────
   HandKind Lightbox — project gallery viewer
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
    .hk-lb-btn:hover { color: #fff; }
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
    #hk-lb-close:hover { color: #fff; }
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
    .proj-gallery img {
      cursor: zoom-in;
      transition: opacity 0.2s;
    }
    .proj-gallery img:hover { opacity: 0.88; }
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
    lb.innerHTML = `
      <img id="hk-lightbox-img" alt="">
      <button id="hk-lb-prev" class="hk-lb-btn" aria-label="Previous image">&#8592;</button>
      <button id="hk-lb-next" class="hk-lb-btn" aria-label="Next image">&#8594;</button>
      <button id="hk-lb-close" aria-label="Close">&#10005;</button>
      <div id="hk-lb-counter"></div>
    `;
    document.body.appendChild(lb);
  }

  let images = [];
  let current = 0;

  function open(index) {
    current = index;
    const lb = document.getElementById('hk-lightbox');
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    render(false);
    document.getElementById('hk-lightbox-img').focus();
  }

  function close() {
    const lb = document.getElementById('hk-lightbox');
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function render(animate) {
    const img = document.getElementById('hk-lightbox-img');
    const counter = document.getElementById('hk-lb-counter');
    const prev = document.getElementById('hk-lb-prev');
    const next = document.getElementById('hk-lb-next');

    if (animate) {
      img.classList.add('fading');
      setTimeout(() => {
        img.src = images[current].src;
        img.alt = images[current].alt;
        img.classList.remove('fading');
      }, 180);
    } else {
      img.src = images[current].src;
      img.alt = images[current].alt;
    }

    counter.textContent = images.length > 1 ? `${current + 1} / ${images.length}` : '';
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

  function init() {
    inject();

    const galleries = document.querySelectorAll('.proj-gallery');
    galleries.forEach(gallery => {
      const imgs = Array.from(gallery.querySelectorAll('img'));
      imgs.forEach((img, i) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
          images = imgs.map(el => ({ src: el.src, alt: el.alt }));
          open(i);
        });
      });
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

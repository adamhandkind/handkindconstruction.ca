/* ─────────────────────────────────────────────
   HandKind Construction — Blog Post JS
   Loads related posts from posts.json
   ───────────────────────────────────────────── */

(async function() {
  const relatedGrid = document.getElementById('related-grid');
  const relatedSection = document.getElementById('related-section');
  if (!relatedGrid) return;

  const currentSlug = window.location.pathname.split('/').pop().replace('.html', '');

  let posts;
  try {
    const res = await fetch('/blog/posts.json');
    posts = await res.json();
  } catch(e) { return; }

  const others = posts.filter(p => p.slug !== currentSlug).slice(0, 3);
  if (!others.length) return;

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  relatedGrid.innerHTML = others.map(p => {
    const [y, m, d] = p.date.split('-');
    const dateStr = `${MONTHS[parseInt(m)-1]} ${parseInt(d)}, ${y}`;
    return `
      <a href="/blog/${p.slug}.html" style="background:var(--white);border:1px solid var(--border);display:flex;flex-direction:column;text-decoration:none;color:inherit;transition:border-color 0.2s;" onmouseover="this.style.borderColor='rgba(13,31,45,0.3)'" onmouseout="this.style.borderColor='var(--border)'">
        <div style="padding:1.5rem;">
          <div style="display:flex;gap:0.6rem;align-items:center;margin-bottom:0.75rem;">
            <span style="font-size:0.62rem;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:#fff;background:var(--navy);padding:0.2rem 0.55rem;">${p.category}</span>
            <span style="font-size:0.68rem;color:var(--stone);">${p.location}</span>
          </div>
          <p style="font-family:var(--font-display);font-size:1.2rem;font-weight:400;color:var(--ink);line-height:1.25;margin-bottom:0.6rem;">${p.title}</p>
          <p style="font-size:0.82rem;font-weight:300;color:var(--stone);line-height:1.7;margin-bottom:1rem;">${p.excerpt}</p>
          <span style="font-size:0.7rem;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--navy);">Read →</span>
        </div>
        <div style="margin-top:auto;padding:0.75rem 1.5rem;border-top:1px solid var(--border);font-size:0.72rem;color:var(--stone);">${p.author} · ${dateStr}</div>
      </a>`;
  }).join('');

  relatedSection.style.display = 'block';
})();

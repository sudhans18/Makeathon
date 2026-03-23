/* ═══════════════════════════════════════════════════════════
   js/track.js — Domain Track Detail Page
   Reads ?t=hardware or ?t=software from the URL,
   renders a left thumbnail list + right domain detail panel.
═══════════════════════════════════════════════════════════ */
import { UNIVERSES } from './data/universes.js';

/* ── URL param ──────────────────────────────────────────── */
const params = new URLSearchParams(location.search);
const trackFamily = (params.get('t') || 'hardware').toLowerCase();
const domains = UNIVERSES.filter(u => u.family === trackFamily);

/* ── Stat definitions (same order for all domains) ────── */
const STAT_LABELS = [
  { key: 'tech',   label: 'Technical Depth',       icon: '⚙' },
  { key: 'innov',  label: 'Innovation Potential',   icon: '◈' },
  { key: 'impact', label: 'Impact Factor',           icon: '◎' },
  { key: 'scope',  label: 'Implementation Scope',   icon: '▦' },
];

/* Stat values per domain — indexed by domain id */
const DOMAIN_STATS = {
  1:  { tech:88, innov:76, impact:82, scope:70 },
  2:  { tech:80, innov:88, impact:92, scope:74 },
  3:  { tech:74, innov:82, impact:88, scope:78 },
  4:  { tech:72, innov:70, impact:95, scope:66 },
  5:  { tech:92, innov:84, impact:80, scope:72 },
  6:  { tech:78, innov:86, impact:90, scope:76 },
  7:  { tech:94, innov:92, impact:88, scope:80 },
  8:  { tech:82, innov:88, impact:92, scope:84 },
  9:  { tech:70, innov:80, impact:94, scope:88 },
  10: { tech:90, innov:82, impact:86, scope:78 },
  11: { tech:86, innov:96, impact:80, scope:72 },
  12: { tech:82, innov:86, impact:90, scope:80 },
};

/* ── State ──────────────────────────────────────────────── */
let activeIndex = 0;

/* ── DOM refs ───────────────────────────────────────────── */
const leftHeader = document.getElementById('track-left-header');
const leftList   = document.getElementById('track-left-list');
const rightPanel = document.getElementById('track-right');

/* ══════════════════════════════════════════
   BUILD LEFT PANEL
   ══════════════════════════════════════════ */
function buildLeft() {
  const isHW = trackFamily === 'hardware';
  const label = isHW ? 'Hardware' : 'Software';
  const accent = isHW ? '#ff0040' : '#00f0ff';

  /* Header */
  leftHeader.innerHTML = `
    <div class="track-left__track-name">
      <span>${label} Track</span>${label.toUpperCase()}
    </div>
    <div class="track-left__accent-bar" style="background:${accent}"></div>
  `;

  /* Thumbnails */
  leftList.innerHTML = domains.map((d, i) => `
    <div class="track-thumb ${i === activeIndex ? 'is-active' : ''}"
         data-index="${i}"
         role="button"
         tabindex="0"
         aria-label="${d.title}">
      <div class="track-thumb__img-wrap">
        <img class="track-thumb__img"
             src="${d.image}"
             alt="${d.variantName}"
             loading="lazy"
             onerror="this.style.opacity='0'" />
        <span class="track-thumb__index">${d.code}</span>
      </div>
      <div class="track-thumb__text">
        <span class="track-thumb__code">${d.code}</span>
        <span class="track-thumb__title">${d.title}</span>
      </div>
    </div>
  `).join('');

  /* Attach events */
  leftList.querySelectorAll('.track-thumb').forEach(card => {
    const select = () => selectDomain(+card.dataset.index);
    card.addEventListener('click', select);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') select(); });
  });
}

/* ══════════════════════════════════════════
   SELECT / RENDER RIGHT PANEL
   ══════════════════════════════════════════ */
function selectDomain(idx) {
  activeIndex = idx;

  /* Update left highlights */
  leftList.querySelectorAll('.track-thumb').forEach((c, i) => {
    c.classList.toggle('is-active', i === idx);
  });

  const d = domains[idx];
  const stats = DOMAIN_STATS[d.id] || { tech: 80, innov: 80, impact: 80, scope: 80 };

  rightPanel.innerHTML = `
    <!-- ── Hero ── -->
    <div class="detail-hero">
      <div class="detail-hero__bg"
           style="background-image:url('${d.background}')"></div>
      <div class="detail-hero__overlay"></div>
      <div class="detail-hero__dots"></div>
      <img class="detail-hero__art"
           src="${d.image}"
           alt="${d.variantName}"
           loading="eager"
           onerror="this.style.display='none'" />
      <div class="detail-hero__text">
        <span class="detail-hero__code">${d.code} — ${d.track} Track</span>
        <h1 class="detail-hero__name">${d.title}</h1>
        <p class="detail-hero__tagline">${d.tagline}</p>
      </div>
    </div>

    <!-- ── Body ── -->
    <div class="detail-body">

      <!-- STATS -->
      <div class="detail-stats">
        <p class="detail-stats__heading">Domain Features</p>
        ${STAT_LABELS.map(s => `
          <div class="stat-row">
            <div class="stat-row__icon">${s.icon}</div>
            <span class="stat-row__label">${s.label}</span>
            <span class="stat-row__val">${stats[s.key]}</span>
            <div class="stat-row__bar-wrap">
              <div class="stat-row__bar" style="width:0%"
                   data-target="${stats[s.key]}"></div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- PROBLEM SKILLS -->
      <div class="detail-problems">
        <p class="detail-problems__heading">Problem Statements</p>
        ${d.problems.map((p, pi) => `
          <div class="problem-skill">
            <div class="problem-skill__icon">P${pi + 1}</div>
            <div class="problem-skill__text">
              <span class="problem-skill__name">${p.title}</span>
              <span class="problem-skill__desc">${p.desc}</span>
            </div>
            <span class="problem-skill__tag">${p.tag}</span>
          </div>
        `).join('')}
      </div>

    </div><!-- /detail-body -->
  `;

  /* Animate stat bars */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      rightPanel.querySelectorAll('.stat-row__bar').forEach(bar => {
        bar.style.width = bar.dataset.target + '%';
      });
    });
  });
}

/* ── Init ───────────────────────────────────────────────── */
buildLeft();
selectDomain(0);

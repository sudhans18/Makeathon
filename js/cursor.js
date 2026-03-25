/**
 * RED CURSOR SYSTEM
 * Drop-in cursor animation — no dependencies, no build step.
 * Just add <script src="cursor.js"></script> before </body>
 *
 * Features:
 *  1. Split cursor — inner dot + lagging outer ring
 *  2. Magnetic snap to buttons/links
 *  3. Velocity stretch — squash along direction of travel
 *  4. Morph on hover — text expands ring, images shrink to dot
 *  5. Particle burst on click
 *  6. Chromatic aberration ghost trail on fast move
 *  7. Section glyph — cursor label changes per section
 *  8. Touch detection — disables all effects on touch devices
 */

(function () {
  /* ── Touch guard ─────────────────────────────────────────── */
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  /* ── Click sound ─────────────────────────────────────────── */
  let clickAudio = null;
  let audioUnlocked = false;

  function initAudio() {
    if (clickAudio) return;
    clickAudio = new Audio('assets/sound.mp3');
    clickAudio.preload = 'auto';
    clickAudio.volume = 0.55;
  }

  /* Unlock audio context on first user interaction (browser autoplay policy) */
  function unlockAudio() {
    if (audioUnlocked) return;
    initAudio();
    /* Play & immediately pause — primes the audio buffer */
    clickAudio.play().then(() => {
      clickAudio.pause();
      clickAudio.currentTime = 0;
      audioUnlocked = true;
    }).catch(() => {
      /* Silently fail if browser still blocks — cursor works fine without sound */
    });
    document.removeEventListener('mousemove', unlockAudio);
  }

  document.addEventListener('mousemove', unlockAudio, { once: true });

  function playClickSound() {
    if (!clickAudio) return;
    /* Rewind and replay — allows rapid successive clicks */
    clickAudio.currentTime = 0;
    clickAudio.play().catch(() => { });
  }

  /* ── Inject styles ───────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    * { cursor: none !important; }

    #rc-spider, #rc-aberr-l, #rc-aberr-r, #rc-glyph {
      position: fixed;
      top: 0; left: 0;
      pointer-events: none;
      z-index: 999999;
      will-change: transform;
    }

    #rc-spider {
      width: 24px; height: 24px;
      transform: translate(-50%, -50%);
      transition: opacity 0.2s ease;
    }

    #rc-spider svg {
      width: 100%; height: 100%;
      overflow: visible;
      transition: transform 0.18s cubic-bezier(0.23,1,0.32,1);
    }

    /* Leg wiggle when moving */
    #rc-spider.walking .leg-fl { animation: legFL 0.18s ease-in-out infinite alternate; }
    #rc-spider.walking .leg-fr { animation: legFR 0.18s ease-in-out infinite alternate 0.09s; }
    #rc-spider.walking .leg-ml { animation: legFL 0.18s ease-in-out infinite alternate 0.06s; }
    #rc-spider.walking .leg-mr { animation: legFR 0.18s ease-in-out infinite alternate 0.15s; }
    #rc-spider.walking .leg-bl { animation: legFL 0.18s ease-in-out infinite alternate 0.12s; }
    #rc-spider.walking .leg-br { animation: legFR 0.18s ease-in-out infinite alternate 0.03s; }
    #rc-spider.walking .leg-rl { animation: legFL 0.18s ease-in-out infinite alternate 0.09s; }
    #rc-spider.walking .leg-rr { animation: legFR 0.18s ease-in-out infinite alternate 0.00s; }

    @keyframes legFL {
      from { transform: rotate(-10deg); }
      to   { transform: rotate(10deg); }
    }
    @keyframes legFR {
      from { transform: rotate(10deg); }
      to   { transform: rotate(-10deg); }
    }

    /* Idle breathe on abdomen */
    #rc-spider .abdomen {
      animation: abdomenBreathe 2.2s ease-in-out infinite;
      transform-origin: 19px 26px;
    }
    @keyframes abdomenBreathe {
      0%,100% { transform: scale(1); }
      50%      { transform: scale(1.08); }
    }

    /* Hover — spider crouches and grows */
    #rc-spider.hover svg { transform: scale(1.5); }

    /* Media hover — tiny */
    #rc-spider.media svg { transform: scale(0.65) rotate(20deg); }

    #rc-aberr-l, #rc-aberr-r {
      width: 24px; height: 24px;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.12s ease;
    }

    #rc-glyph {
      border-radius: 0;
      background: transparent;
      color: #E74C3C;
      font-size: 11px;
      font-family: 'Courier New', monospace;
      letter-spacing: 0.08em;
      white-space: nowrap;
      transform: translate(22px, -18px);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .rc-particle {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999998;
      background: #E74C3C;
      will-change: transform, opacity;
    }

    .rc-web-strand {
      position: fixed;
      pointer-events: none;
      z-index: 999997;
      background: rgba(200, 60, 60, 0.45);
      height: 1px;
      transform-origin: 0 50%;
      border-radius: 1px;
    }
  `;
  document.head.appendChild(style);

  /* ── Create DOM elements ─────────────────────────────────── */
  const spider = document.createElement('div');
  spider.id = 'rc-spider';
  spider.innerHTML = `
  <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
    <!-- Legs: front-left -->
    <g class="leg-fl" style="transform-origin:14px 17px">
      <line x1="14" y1="17" x2="2"  y2="10" stroke="#C0392B" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="2"  y1="10" x2="0"  y2="4"  stroke="#C0392B" stroke-width="1.1" stroke-linecap="round"/>
    </g>
    <!-- Legs: front-right -->
    <g class="leg-fr" style="transform-origin:24px 17px">
      <line x1="24" y1="17" x2="36" y2="10" stroke="#C0392B" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="36" y1="10" x2="38" y2="4"  stroke="#C0392B" stroke-width="1.1" stroke-linecap="round"/>
    </g>
    <!-- Legs: mid-left -->
    <g class="leg-ml" style="transform-origin:13px 19px">
      <line x1="13" y1="19" x2="2"  y2="16" stroke="#C0392B" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="2"  y1="16" x2="0"  y2="11" stroke="#C0392B" stroke-width="1.1" stroke-linecap="round"/>
    </g>
    <!-- Legs: mid-right -->
    <g class="leg-mr" style="transform-origin:25px 19px">
      <line x1="25" y1="19" x2="36" y2="16" stroke="#C0392B" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="36" y1="16" x2="38" y2="11" stroke="#C0392B" stroke-width="1.1" stroke-linecap="round"/>
    </g>
    <!-- Legs: back-left -->
    <g class="leg-bl" style="transform-origin:13px 21px">
      <line x1="13" y1="21" x2="3"  y2="22" stroke="#C0392B" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="3"  y1="22" x2="0"  y2="27" stroke="#C0392B" stroke-width="1.1" stroke-linecap="round"/>
    </g>
    <!-- Legs: back-right -->
    <g class="leg-br" style="transform-origin:25px 21px">
      <line x1="25" y1="21" x2="35" y2="22" stroke="#C0392B" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="35" y1="22" x2="38" y2="27" stroke="#C0392B" stroke-width="1.1" stroke-linecap="round"/>
    </g>
    <!-- Legs: rear-left -->
    <g class="leg-rl" style="transform-origin:14px 23px">
      <line x1="14" y1="23" x2="4"  y2="27" stroke="#C0392B" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="4"  y1="27" x2="2"  y2="33" stroke="#C0392B" stroke-width="1.1" stroke-linecap="round"/>
    </g>
    <!-- Legs: rear-right -->
    <g class="leg-rr" style="transform-origin:24px 23px">
      <line x1="24" y1="23" x2="34" y2="27" stroke="#C0392B" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="34" y1="27" x2="36" y2="33" stroke="#C0392B" stroke-width="1.1" stroke-linecap="round"/>
    </g>

    <!-- Abdomen (larger, round back body) -->
    <ellipse class="abdomen" cx="19" cy="26" rx="6.5" ry="7.5" fill="#A93226" stroke="#7B241C" stroke-width="0.8"/>
    <!-- Abdomen sheen -->
    <ellipse cx="17.5" cy="23.5" rx="2.2" ry="1.4" fill="rgba(255,120,100,0.22)"/>
    <!-- Hourglass mark on abdomen (spider-man / widow style) -->
    <path d="M17.5 25.5 L19 27.5 L20.5 25.5 L19 24.5 Z" fill="#FF4444" opacity="0.85"/>

    <!-- Cephalothorax (head+thorax, smaller front body) -->
    <ellipse cx="19" cy="17.5" rx="5" ry="5.5" fill="#C0392B" stroke="#7B241C" stroke-width="0.8"/>
    <!-- Thorax sheen -->
    <ellipse cx="18" cy="15.5" rx="1.8" ry="1.1" fill="rgba(255,140,120,0.25)"/>

    <!-- Eyes (4 tiny ones) -->
    <circle cx="17" cy="15" r="1.1" fill="#111"/>
    <circle cx="21" cy="15" r="1.1" fill="#111"/>
    <circle cx="16" cy="16.8" r="0.7" fill="#222"/>
    <circle cx="22" cy="16.8" r="0.7" fill="#222"/>
    <!-- Eye shine -->
    <circle cx="17.4" cy="14.6" r="0.35" fill="rgba(255,255,255,0.7)"/>
    <circle cx="21.4" cy="14.6" r="0.35" fill="rgba(255,255,255,0.7)"/>

    <!-- Fangs / chelicerae -->
    <line x1="17.5" y1="13" x2="16.5" y2="11.5" stroke="#7B241C" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="20.5" y1="13" x2="21.5" y2="11.5" stroke="#7B241C" stroke-width="1.2" stroke-linecap="round"/>
    <circle cx="16.3" cy="11.2" r="1" fill="#3D0000"/>
    <circle cx="21.7" cy="11.2" r="1" fill="#3D0000"/>

    <!-- Web thread hanging down from abdomen -->
    <line x1="19" y1="33.5" x2="19" y2="38" stroke="rgba(200,60,60,0.5)" stroke-width="0.8" stroke-linecap="round"/>
  </svg>`;

  const aberrL = document.createElement('div');
  aberrL.id = 'rc-aberr-l';
  aberrL.innerHTML = `<svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;opacity:0.35">
    <ellipse cx="19" cy="26" rx="6.5" ry="7.5" fill="none" stroke="rgba(220,30,30,0.5)" stroke-width="1"/>
    <ellipse cx="19" cy="17.5" rx="5" ry="5.5" fill="none" stroke="rgba(220,30,30,0.5)" stroke-width="1"/>
  </svg>`;

  const aberrR = document.createElement('div');
  aberrR.id = 'rc-aberr-r';
  aberrR.innerHTML = `<svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;opacity:0.25">
    <ellipse cx="19" cy="26" rx="6.5" ry="7.5" fill="none" stroke="rgba(20,20,160,0.5)" stroke-width="1"/>
    <ellipse cx="19" cy="17.5" rx="5" ry="5.5" fill="none" stroke="rgba(20,20,160,0.5)" stroke-width="1"/>
  </svg>`;

  const glyph = createElement('rc-glyph');

  [aberrL, aberrR, spider, glyph].forEach(el => document.body.appendChild(el));

  function createElement(id) {
    const el = document.createElement('div');
    el.id = id;
    return el;
  }

  /* ── State ───────────────────────────────────────────────── */
  let mouseX = -200, mouseY = -200;
  let spiderX = -200, spiderY = -200;
  let prevMouseX = -200, prevMouseY = -200;
  let prevTime = performance.now();
  let velocity = 0;
  let isHoveringText = false;
  let isHoveringImage = false;
  let isHoveringMagnetic = false;
  let magnetTarget = null;
  let aberrTimeout = null;
  let walkTimeout = null;
  let currentSection = '';
  let currentAngle = 0;
  let spiderRotation = 0;
  let targetRotation = 0;

  /* Web strand trail */
  let lastStrandX = -200, lastStrandY = -200;
  const STRAND_INTERVAL = 80; // ms between strands
  let lastStrandTime = 0;

  /* ── Mouse move ──────────────────────────────────────────── */
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const now = performance.now();
    const dt = now - prevTime || 1;
    const dx = mouseX - prevMouseX;
    const dy = mouseY - prevMouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    velocity = dist / dt * 1000;
    currentAngle = Math.atan2(dy, dx);

    /* Rotate spider to face direction of travel */
    if (dist > 1.5) {
      targetRotation = currentAngle * (180 / Math.PI) + 90;
    }

    prevMouseX = mouseX;
    prevMouseY = mouseY;
    prevTime = now;

    /* Walking leg animation */
    if (dist > 2) {
      spider.classList.add('walking');
      clearTimeout(walkTimeout);
      walkTimeout = setTimeout(() => spider.classList.remove('walking'), 120);
    }

    /* Web strand trail */
    if (velocity > 80 && now - lastStrandTime > STRAND_INTERVAL) {
      spawnStrand(e.clientX, e.clientY);
      lastStrandTime = now;
    }

    /* Chromatic aberration at speed > 600 px/s */
    if (velocity > 600) {
      aberrL.style.opacity = '1';
      aberrR.style.opacity = '1';
      clearTimeout(aberrTimeout);
      aberrTimeout = setTimeout(() => {
        aberrL.style.opacity = '0';
        aberrR.style.opacity = '0';
      }, 120);
    }

    updateSectionGlyph(e.clientX, e.clientY);
  });

  /* ── Hover detection ─────────────────────────────────────── */
  const MAGNETIC_SELECTORS = 'a, button, [data-cursor="magnetic"]';
  const TEXT_SELECTORS = 'p, h1, h2, h3, h4, h5, h6, span, li, label, [data-cursor="text"]';
  const IMAGE_SELECTORS = 'img, video, canvas, [data-cursor="media"]';

  document.addEventListener('mouseover', e => {
    const target = e.target;

    if (target.matches(IMAGE_SELECTORS)) {
      isHoveringImage = true;
      isHoveringText = false;
      spider.classList.add('media');
      spider.classList.remove('hover');
    } else if (target.matches(TEXT_SELECTORS)) {
      isHoveringText = true;
      isHoveringImage = false;
      spider.classList.remove('media');
    } else {
      isHoveringText = false;
      isHoveringImage = false;
      spider.classList.remove('media');
    }

    if (target.closest(MAGNETIC_SELECTORS)) {
      isHoveringMagnetic = true;
      magnetTarget = target.closest(MAGNETIC_SELECTORS);
      spider.classList.add('hover');
    }

    applyHoverStyle();
  });

  document.addEventListener('mouseout', e => {
    const relatedTarget = e.relatedTarget;
    if (!relatedTarget || !relatedTarget.closest(MAGNETIC_SELECTORS)) {
      isHoveringMagnetic = false;
      magnetTarget = null;
      spider.classList.remove('hover');
    }
    isHoveringText = false;
    isHoveringImage = false;
    spider.classList.remove('media');
    applyHoverStyle();
  });

  function applyHoverStyle() {
    // Visual state handled via CSS classes on #rc-spider
  }

  /* ── Click particle burst ────────────────────────────────── */
  document.addEventListener('mousedown', e => {
    playClickSound();
    spawnParticles(e.clientX, e.clientY);
    spider.style.transform = 'translate(-50%, -50%) scale(0.75)';
  });
  document.addEventListener('mouseup', () => {
    spider.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  function spawnParticles(cx, cy) {
    const COUNT = 10;
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('div');
      p.className = 'rc-particle';
      const size = 3 + Math.random() * 4;
      const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.4;
      const speed = 40 + Math.random() * 60;
      const tx = Math.cos(angle) * speed;
      const ty = Math.sin(angle) * speed;

      p.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${cx}px; top: ${cy}px;
        transform: translate(-50%,-50%);
        opacity: 1;
      `;
      document.body.appendChild(p);

      const start = performance.now();
      const duration = 380 + Math.random() * 120;

      (function animateParticle() {
        const elapsed = performance.now() - start;
        const progress = elapsed / duration;
        if (progress >= 1) {
          p.remove();
          return;
        }
        const ease = 1 - Math.pow(progress, 2);
        p.style.transform = `translate(calc(-50% + ${tx * progress}px), calc(-50% + ${ty * progress}px))`;
        p.style.opacity = (1 - progress).toFixed(3);
        requestAnimationFrame(animateParticle);
      })();
    }
  }

  /* ── Web strand trail ────────────────────────────────────── */
  function spawnStrand(cx, cy) {
    if (lastStrandX === -200) { lastStrandX = cx; lastStrandY = cy; return; }
    const dx = cx - lastStrandX;
    const dy = cy - lastStrandY;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 8) return;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const strand = document.createElement('div');
    strand.className = 'rc-web-strand';
    strand.style.cssText = `
      left: ${lastStrandX}px;
      top:  ${lastStrandY}px;
      width: ${len}px;
      transform: rotate(${angle}deg);
      opacity: 0.6;
    `;
    document.body.appendChild(strand);

    lastStrandX = cx;
    lastStrandY = cy;

    const start = performance.now();
    (function fadeStrand() {
      const p = (performance.now() - start) / 600;
      if (p >= 1) { strand.remove(); return; }
      strand.style.opacity = (0.6 * (1 - p)).toFixed(3);
      requestAnimationFrame(fadeStrand);
    })();
  }

  /* ── Section glyph ───────────────────────────────────────── */
  const glyphMap = {
    'hero': '✦',
    'about': '◈',
    'work': '→',
    'portfolio': '↗',
    'contact': '✉',
    'services': '◎',
    'skills': '⬡',
    'projects': '⊞',
    'blog': '✍',
    'footer': '↓',
  };

  function updateSectionGlyph(x, y) {
    const el = document.elementFromPoint(x, y);
    if (!el) return;
    const section = el.closest('section, [id], [data-section]');
    if (!section) {
      glyph.style.opacity = '0';
      return;
    }
    const id = (section.id || section.dataset.section || '').toLowerCase();
    let matched = '';
    for (const key of Object.keys(glyphMap)) {
      if (id.includes(key)) { matched = key; break; }
    }
    if (matched && matched !== currentSection) {
      currentSection = matched;
      glyph.textContent = glyphMap[matched];
      glyph.style.opacity = '1';
    } else if (!matched) {
      glyph.style.opacity = '0';
      currentSection = '';
    }
  }

  /* ── RAF loop ────────────────────────────────────────────── */
  const SPIDER_EASE = 0.14;
  const MAGNET_RANGE = 80;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function lerpAngle(a, b, t) {
    let diff = b - a;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    return a + diff * t;
  }

  function loop() {
    /* Magnetic snap */
    let targetX = mouseX;
    let targetY = mouseY;

    if (isHoveringMagnetic && magnetTarget) {
      const rect = magnetTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt((mouseX - cx) ** 2 + (mouseY - cy) ** 2);
      if (dist < MAGNET_RANGE) {
        const pull = 1 - dist / MAGNET_RANGE;
        targetX = lerp(mouseX, cx, pull * 0.45);
        targetY = lerp(mouseY, cy, pull * 0.45);
      }
    }

    /* Smooth spider follow */
    spiderX = lerp(spiderX, targetX, SPIDER_EASE);
    spiderY = lerp(spiderY, targetY, SPIDER_EASE);

    /* Smooth rotation */
    spiderRotation = lerpAngle(spiderRotation, targetRotation, 0.1);

    /* Apply spider transform */
    spider.style.transform = `translate(calc(${spiderX}px - 50%), calc(${spiderY}px - 50%)) rotate(${spiderRotation.toFixed(1)}deg)`;

    /* Chromatic aberration offset */
    const offsetPx = Math.min(velocity / 120, 8);
    const ox = Math.cos(currentAngle) * offsetPx;
    const oy = Math.sin(currentAngle) * offsetPx;
    aberrL.style.transform = `translate(calc(${spiderX - ox}px - 50%), calc(${spiderY - oy}px - 50%))`;
    aberrR.style.transform = `translate(calc(${spiderX + ox}px - 50%), calc(${spiderY + oy}px - 50%))`;

    /* Glyph follows mouse */
    glyph.style.transform = `translate(${mouseX + 22}px, ${mouseY - 20}px)`;

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  /* ── Hide on leave, show on enter ───────────────────────── */
  document.addEventListener('mouseleave', () => { spider.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { spider.style.opacity = '1'; });

})();
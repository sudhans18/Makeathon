import { UNIVERSES } from '../data/universes.js';


function generateWeb(w, h, originX, originY) {
    const cx = originX === 0 ? 0 : w;
    const cy = originY === 0 ? 0 : h;
    const rays = 8;
    const rings = 6;
    const maxR = Math.max(w, h) * 0.95;
    let svg = '';

    const angleStart = originX === 0 && originY === 0 ? 0 :
        originX > 0 && originY === 0 ? 90 :
            originX === 0 && originY > 0 ? 270 : 180;

    for (let i = 0; i < rays; i++) {
        const angle = (angleStart + (i / rays) * 90) * (Math.PI / 180);
        const x2 = cx + Math.cos(angle) * maxR;
        const y2 = cy + Math.sin(angle) * maxR;
        svg += `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}"
                      stroke="rgba(123,47,190,0.4)" stroke-width="0.8"/>`;
    }

    for (let r = 1; r <= rings; r++) {
        const radius = (r / rings) * maxR;
        const startAngle = angleStart * (Math.PI / 180);
        const endAngle = (angleStart + 90) * (Math.PI / 180);
        const x1 = cx + Math.cos(startAngle) * radius;
        const y1 = cy + Math.sin(startAngle) * radius;
        const x2 = cx + Math.cos(endAngle) * radius;
        const y2 = cy + Math.sin(endAngle) * radius;
        svg += `<path d="M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}"
                      fill="none" stroke="rgba(123,47,190,0.3)" stroke-width="0.7"/>`;
    }

    return svg;
}

function injectStyles() {
    if (document.getElementById('problems-injected-styles')) return;

    // Inject Rajdhani font from Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.id = 'problems-injected-styles';
    style.textContent = `
        /* ── Cobweb corners ── */
        .cobweb-overlay {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 0;
        }
        .cobweb {
            position: absolute;
            width: 300px;
            height: 300px;
            opacity: 0.8;
            animation: cobweb-pulse 4s ease-in-out infinite alternate;
        }
        .cobweb--tl { top: 0; left: 0; }
        .cobweb--tr { top: 0; right: 0; transform: scaleX(-1); }
        .cobweb--bl { bottom: 0; left: 0; transform: scaleY(-1); }
        .cobweb--br { bottom: 0; right: 0; transform: scale(-1); }

        @keyframes cobweb-pulse {
            from { opacity: 0.4; filter: drop-shadow(0 0 4px rgba(123,47,190,0.5)); }
            to   { opacity: 0.9; filter: drop-shadow(0 0 14px rgba(123,47,190,1)); }
        }

        /* ── Hide bridge wire lines ── */
        .track-selector__bridge { display: none !important; }

        /* ══ CHOOSE YOUR TRACK heading — white comic style ══ */
        .track-selector__heading {
            font-family: 'Anton', sans-serif !important;
            font-size: clamp(2.5rem, 6vw, 4.5rem) !important;
            font-weight: 400 !important;
            letter-spacing: 0.05em !important;
            text-transform: uppercase !important;
            color: #ffffff !important;
            text-shadow: 4px 4px 0 #ff0040, 8px 8px 0 #000000 !important;
            /* Reset pill styles */
            background: transparent !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 0 !important;
            border: none !important;
        }

        /* ══ HARDWARE / SOFTWARE labels — white comic style ══ */
        .track-selector__label {
            font-family: 'Anton', sans-serif !important;
            font-size: clamp(1.6rem, 3.5vw, 2.6rem) !important;
            font-weight: 400 !important;
            letter-spacing: 0.05em !important;
            text-transform: uppercase !important;
            color: #ffffff !important;
            text-shadow: 3px 3px 0 #ff0040, 6px 6px 0 #000000 !important;
            /* Reset pill styles */
            background: transparent !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 0 !important;
            border: none !important;
            min-width: unset !important;
        }

        /* ── Board transparent ── */
        .track-selector__board {
            background: transparent !important;
            position: relative;
            z-index: 1;
        }

        /* ── Spider link base ── */
        .track-selector__spider-link {
            transition: transform 0.25s cubic-bezier(0.22,1,0.36,1),
                        filter 0.25s ease;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            border-radius: 0 !important;
            gap: 10px;
        }

        .track-selector__spider-link:hover {
            transform: scale(1.12) translateY(-4px);
            filter: drop-shadow(0 0 10px #E8115B)
                    drop-shadow(0 0 24px rgba(232,17,91,0.7))
                    drop-shadow(0 0 40px rgba(232,17,91,0.35));
        }

        .track-selector__spider-tile {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            overflow: hidden;
            transition: box-shadow 0.25s ease;
        }

        .track-selector__spider-link:hover .track-selector__spider-tile {
            box-shadow: 0 0 0 3px #E8115B,
                        0 0 20px rgba(232,17,91,0.8),
                        0 0 40px rgba(232,17,91,0.4);
        }

        .track-selector__spider-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            display: block;
        }

        /* ── Hide universe label completely ── */
        .track-selector__spider-name {
            display: none !important;
        }

        /* ── Subdomain label ── */
        .track-selector__spider-subdomain {
            display: block;
            font-family: 'Anton', sans-serif !important;
            font-size: 0.85rem;
            font-weight: 400;
            letter-spacing: 0.04em;
            text-align: center;
            color: #ffffff;
            line-height: 1.3;
            max-width: 130px;
            text-transform: uppercase;
            text-shadow:
                0 0 10px rgba(0, 0, 0, 1),
                0 0 6px rgba(0, 0, 0, 0.9),
                0 2px 4px rgba(0, 0, 0, 0.8);
            transition: color 0.25s ease, text-shadow 0.25s ease;
        }

        .track-selector__spider-link:hover .track-selector__spider-subdomain {
            color: #E8115B;
            text-shadow:
                0 0 12px rgba(232,17,91,0.9),
                0 0 24px rgba(232,17,91,0.5),
                0 2px 4px rgba(0,0,0,0.8);
        }

        /* ── Grid row spacing ── */
        .track-selector__grid {
            row-gap: 2.6rem !important;
        }

        /* ── Labels row layout — no bridge, just space-evenly ── */
        .track-selector__labels {
            margin-top: clamp(1.5rem, 3vw, 2.5rem) !important;
        }

        /* ══ 2-Track choice buttons ══ */
        .track-choose-btns {
            display: flex;
            flex-direction: row;
            gap: 28px;
            justify-content: center;
            align-items: stretch;
            flex-wrap: wrap;
            margin-top: 36px;
            padding-bottom: 12px;
        }

        .track-choose-btn {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            width: 300px;
            max-width: 100%;
            padding: 28px 30px;
            text-decoration: none;
            position: relative;
            /* Comic-button border gimmick */
            border: 3px solid #000;
            background: rgba(255,255,255,0.04);
            transition: transform 0.25s, box-shadow 0.25s;
            cursor: pointer;
        }

        .track-choose-btn--hw {
            box-shadow: 6px 6px 0 #ff0040;
        }
        .track-choose-btn--sw {
            box-shadow: 6px 6px 0 #00f0ff;
        }

        .track-choose-btn:hover {
            transform: translate(-3px, -3px);
        }
        .track-choose-btn--hw:hover {
            box-shadow: 9px 9px 0 #ff0040;
        }
        .track-choose-btn--sw:hover {
            box-shadow: 9px 9px 0 #00f0ff;
        }

        .track-choose-btn__icon {
            font-size: 2rem;
            line-height: 1;
            color: rgba(255,255,255,0.4);
        }

        .track-choose-btn__label {
            font-family: 'Anton', sans-serif !important;
            font-size: clamp(1.4rem, 3vw, 2rem) !important;
            font-weight: 400 !important;
            letter-spacing: 0.08em !important;
            text-transform: uppercase !important;
            color: #ffffff !important;
        }

        .track-choose-btn--hw .track-choose-btn__label {
            text-shadow: 3px 3px 0 #ff0040 !important;
        }
        .track-choose-btn--sw .track-choose-btn__label {
            text-shadow: 3px 3px 0 #00f0ff !important;
        }

        .track-choose-btn__sub {
            font-family: var(--ff-body, sans-serif) !important;
            font-size: 0.72rem !important;
            font-weight: 600 !important;
            letter-spacing: 0.08em !important;
            text-transform: uppercase !important;
            color: rgba(255,255,255,0.38) !important;
            line-height: 1.5 !important;
        }
    `;
    document.head.appendChild(style);
}

export function initProblems() {
    const container = document.getElementById('track-selector');
    const ui = document.getElementById('track-selector-ui');

    if (!container || !ui) return;

    let el = container;
    while (el && el !== document.body) {
        el.style.background = 'transparent';
        el.style.backgroundColor = 'transparent';
        el = el.parentElement;
    }

    const section = container.closest('section') || container.parentElement;
    if (section) {
        section.style.cssText = `
            background-image: url('assets/problembg.jpeg') !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            position: relative !important;
            overflow: hidden !important;
        `;
    }

    container.style.cssText = `
        background: transparent !important;
        position: relative;
        z-index: 1;
    `;

    if (section && !section.querySelector('.cobweb-overlay')) {
        const cobweb = document.createElement('div');
        cobweb.className = 'cobweb-overlay';
        cobweb.setAttribute('aria-hidden', 'true');
        cobweb.innerHTML = `
            <svg class="cobweb cobweb--tl" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                ${generateWeb(300, 300, 0, 0)}
            </svg>
            <svg class="cobweb cobweb--tr" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                ${generateWeb(300, 300, 300, 0)}
            </svg>
            <svg class="cobweb cobweb--bl" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                ${generateWeb(300, 300, 0, 300)}
            </svg>
            <svg class="cobweb cobweb--br" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                ${generateWeb(300, 300, 300, 300)}
            </svg>
        `;
        section.insertBefore(cobweb, section.firstChild);
    }

    injectStyles();

    const hardware = UNIVERSES.filter((universe) => universe.family === 'hardware');
    const software = UNIVERSES.filter((universe) => universe.family === 'software');

    ui.innerHTML = `
        <div class="track-selector__board" style="background:transparent;">
            <div class="track-selector__copy">
                <h2 class="track-selector__heading">CHOOSE YOUR TRACK</h2>
            </div>

            <div class="track-choose-btns">
                <a href="track.html?t=hardware" class="track-choose-btn track-choose-btn--hw">
                    <span class="track-choose-btn__icon">⚙</span>
                    <span class="track-choose-btn__label">HARDWARE</span>
                    <span class="track-choose-btn__sub">IoT · Robotics · Energy · Healthcare · Agriculture · Disaster</span>
                </a>
                <a href="track.html?t=software" class="track-choose-btn track-choose-btn--sw">
                    <span class="track-choose-btn__icon">◈</span>
                    <span class="track-choose-btn__label">SOFTWARE</span>
                    <span class="track-choose-btn__sub">AI · Smart Cities · Blockchain · AR/VR · FinTech · Governance</span>
                </a>
            </div>
        </div>
    `;
}


function renderUniverseButton(universe) {
    const spiderLogo = `assets/spiderlogos/s${universe.id}.png`;
    const subdomain = universe.title || '';

    return `
        <a class="track-selector__spider-link track-selector__spider-link--${universe.family}"
           href="${universe.href}"
           aria-label="${subdomain}">
            <span class="track-selector__spider-tile">
                <img
                    class="track-selector__spider-img"
                    src="${spiderLogo}"
                    alt="${subdomain}"
                    loading="lazy"
                    onerror="this.style.display='none'"
                />
            </span>
            <span class="track-selector__spider-name">${universe.label}</span>
            <span class="track-selector__spider-subdomain">${subdomain}</span>
        </a>
    `;
}
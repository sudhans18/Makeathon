/* ═══════════════════════════════════════════════════════════
   js/sections/loading.js — Full-screen Loading Overlay
   
   Preloads 89 Spider-Man animation frames and tracks overall
   page load progress. The frame displayed syncs with load %,
   so the animation plays out as the site initializes.
   
   Exports initLoading() → Promise<void>
   Resolved once loading is complete and the overlay has faded.
═══════════════════════════════════════════════════════════ */

const TOTAL_FRAMES = 89;
const FRAME_PATH = 'assets/page_loading/';
const MIN_DISPLAY_MS = 2000; // minimum time the loading screen is shown

// Spider-Verse quotes to cycle through during loading
const QUOTES = [
    '"Anyone can wear the mask." — Miles Morales',
    '"What makes you different is what makes you Spider-Man."',
    '"The only way to really be Spider-Man is to be yourself."',
    '"That person who helps others simply because it should be done."',
    '"I see this spark in you. It\'s amazing."',
    '"With great power comes great responsibility."',
    '"It\'s a leap of faith. That\'s all it is."',
];

/**
 * Build the list of frame file names.
 * Files are named: frame_00_delay-0.033s.webp … frame_88_delay-0.033s.webp
 */
function getFrameNames() {
    const names = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
        const padded = String(i).padStart(2, '0');
        names.push(`${FRAME_PATH}frame_${padded}_delay-0.033s.webp`);
    }
    return names;
}

/**
 * Preload a single image and return it.
 */
function loadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img); // don't block on error
        img.src = src;
    });
}

/**
 * Initialize and run the loading screen.
 * Returns a Promise that resolves when loading is fully complete
 * and the overlay has been removed.
 */
export function initLoading() {
    return new Promise((resolve) => {
        const screen = document.getElementById('loading-screen');
        if (!screen) { resolve(); return; }

        // ── Skip loading when navigating back from a sub-page ─────────────
        // The inline <script> in index.html runs synchronously and stamps
        // data-skip-loading on <html> when ?nl=1 is in the URL. We check
        // both the attribute (belt) and the URL param (suspenders).
        const shouldSkip =
            document.documentElement.dataset.skipLoading === '1' ||
            new URLSearchParams(window.location.search).get('nl') === '1' ||
            sessionStorage.getItem('makeathon_loaded');

        if (shouldSkip) {
            history.replaceState(null, '', window.location.pathname + window.location.hash);
            screen.remove();
            resolve();
            return;
        }
        // ─────────────────────────────────────────────────────────────────

        const frameImg = document.getElementById('loading-frame');
        const barEl = document.getElementById('loading-bar');
        const percentEl = document.getElementById('loading-percent');
        const quoteEl = screen.querySelector('.loading__quote');

        const frameNames = getFrameNames();
        const loadedImages = new Array(TOTAL_FRAMES);

        // ── Quote rotation ──
        let quoteIndex = 0;
        if (quoteEl) {
            quoteEl.textContent = QUOTES[0];
        }
        const quoteInterval = setInterval(() => {
            quoteIndex = (quoteIndex + 1) % QUOTES.length;
            if (quoteEl) {
                quoteEl.style.opacity = '0';
                setTimeout(() => {
                    quoteEl.textContent = QUOTES[quoteIndex];
                    quoteEl.style.opacity = '0.85';
                }, 300);
            }
        }, 3000);

        // ── Dots animation for "INITIALIZING..." ──
        const dotsEl = screen.querySelector('.loading__dots');
        let dotCount = 0;
        const dotsInterval = setInterval(() => {
            dotCount = (dotCount + 1) % 4;
            if (dotsEl) dotsEl.textContent = '.'.repeat(dotCount);
        }, 400);

        // ── Progress state ──
        let frameProgress = 0;   // 0–100  (weight: 70%)
        let pageProgress = 0;    // 0–100  (weight: 30%)
        let framesLoaded = 0;
        let windowLoaded = false;
        let finished = false;
        const startTime = performance.now();

        function getOverallProgress() {
            return Math.min(100, Math.round(frameProgress * 0.7 + pageProgress * 0.3));
        }

        function updateUI() {
            const pct = getOverallProgress();
            const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor((pct / 100) * (TOTAL_FRAMES - 1)));

            // Update frame
            if (loadedImages[frameIndex] && frameImg) {
                frameImg.src = loadedImages[frameIndex].src;
            }

            // Update progress bar & text
            if (barEl) barEl.style.width = pct + '%';
            if (percentEl) percentEl.textContent = pct + '%';

            // Check completion — only finish after minimum display time
            if (pct >= 100 && !finished) {
                const elapsed = performance.now() - startTime;
                const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
                finished = true;
                setTimeout(() => completeLoading(), remaining);
            }
        }

        function completeLoading() {
            clearInterval(quoteInterval);
            clearInterval(dotsInterval);

            // Play remaining frames at ~30fps (33ms per frame) for a smooth flourish
            let currentFrame = Math.floor((getOverallProgress() / 100) * (TOTAL_FRAMES - 1));
            const playRemaining = () => {
                if (currentFrame < TOTAL_FRAMES - 1) {
                    currentFrame++;
                    if (loadedImages[currentFrame] && frameImg) {
                        frameImg.src = loadedImages[currentFrame].src;
                    }
                    setTimeout(playRemaining, 33);
                } else {
                    // Fade out after a brief pause
                    setTimeout(() => {
                        screen.classList.add('fade-out');
                        setTimeout(() => {
                            screen.remove();
                            resolve();
                        }, 650);
                    }, 300);
                }
            };
            playRemaining();
        }

        // ── Preload frames ──
        frameNames.forEach((src, i) => {
            loadImage(src).then((img) => {
                loadedImages[i] = img;
                framesLoaded++;
                frameProgress = (framesLoaded / TOTAL_FRAMES) * 100;
                updateUI();
            });
        });

        // ── Track window load for other assets ──
        if (document.readyState === 'complete') {
            pageProgress = 100;
            windowLoaded = true;
            updateUI();
        } else {
            // Gradually tick page progress to feel responsive
            let fakeTick = 0;
            const tickInterval = setInterval(() => {
                if (!windowLoaded && fakeTick < 80) {
                    fakeTick += Math.random() * 3;
                    pageProgress = Math.min(80, fakeTick);
                    updateUI();
                }
                if (windowLoaded) {
                    clearInterval(tickInterval);
                }
            }, 200);

            window.addEventListener('load', () => {
                windowLoaded = true;
                pageProgress = 100;
                clearInterval(tickInterval);
                updateUI();
            });
        }
    });
}

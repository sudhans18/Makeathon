/* ═══════════════════════════════════════════════════════════
   js/sections/hero.js
   SPIDER-VERSE Hero
   Countdown timer and CTA interactions only
═══════════════════════════════════════════════════════════ */

export function initHero() {
    setupCountdownTimer();
    setupCTA();
}

/**
 * Handles the countdown logic to April 27
 */
function setupCountdownTimer() {
    const domDays = document.getElementById('t-days');
    const domHours = document.getElementById('t-hours');
    const domMins = document.getElementById('t-mins');
    const domSecs = document.getElementById('t-secs');

    if (!domDays || !domHours || !domMins || !domSecs) return;

    // Use explicitly defined Date constructor (Year, Month[0-indexed], Day, Hour, Min, Sec)
    let targetDate = new Date(2026, 3, 27, 9, 0, 0).getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            domDays.innerText = '00';
            domHours.innerText = '00';
            domMins.innerText = '00';
            domSecs.innerText = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        domDays.innerText = days.toString().padStart(2, '0');
        domHours.innerText = hours.toString().padStart(2, '0');
        domMins.innerText = minutes.toString().padStart(2, '0');
        domSecs.innerText = seconds.toString().padStart(2, '0');
    }

    updateTimer(); // Initial call
    setInterval(updateTimer, 1000);
}

function setupCTA() {
    const btn = document.getElementById('cta-launch');
    const flash = document.getElementById('portal-flash');
    if (!btn || !flash) return;

    btn.addEventListener('click', () => {
        flash.classList.add('active');
        setTimeout(() => {
            const about = document.getElementById('about');
            if (about) about.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => flash.classList.remove('active'), 800);
        }, 400); // 400ms is halfway through the animation
    });
}

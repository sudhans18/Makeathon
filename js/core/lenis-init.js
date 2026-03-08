/* ═══════════════════════════════════════════════════════════
   js/core/lenis-init.js
   Initialize Lenis smooth scrolling & connect to GSAP ticker
   
   Usage: import { lenis } from './lenis-init.js'
   Extend: adjust lerp/duration for different scroll feel
═══════════════════════════════════════════════════════════ */

/** @type {Lenis} */
let lenis;

/**
 * Initialize Lenis smooth scroll
 * Connects Lenis to GSAP's ticker for frame-perfect sync
 */
export function initLenis() {
  lenis = new Lenis({
    lerp: 0.08,
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    infinite: false,
  });

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
}

/**
 * Scroll to a specific section by ID
 * @param {string} targetId - Section element ID (without #)
 */
export function scrollToSection(targetId) {
  const el = document.getElementById(targetId);
  if (el && lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.5 });
  }
}

export { lenis };

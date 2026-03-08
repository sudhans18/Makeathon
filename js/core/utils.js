/* ═══════════════════════════════════════════════════════════
   js/core/utils.js
   Shared utility functions
   
   Includes: throttle, lerp, isMobile, prefersReducedMotion,
   random range, clamp
═══════════════════════════════════════════════════════════ */

/**
 * Throttle a function to run at most once per `limit` ms
 * @param {function} fn
 * @param {number} limit - milliseconds
 * @returns {function}
 */
export function throttle(fn, limit = 100) {
    let inThrottle = false;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Linear interpolation
 * @param {number} a - Start
 * @param {number} b - End
 * @param {number} t - 0–1 progress
 * @returns {number}
 */
export function lerp(a, b, t) {
    return a + (b - a) * t;
}

/**
 * Clamp value between min and max
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

/**
 * Random float in range [min, max]
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Detect mobile viewport (< 768px)
 * @returns {boolean}
 */
export function isMobile() {
    return window.innerWidth < 768;
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

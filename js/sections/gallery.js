/* ═══════════════════════════════════════════════════════════
   js/sections/gallery.js
   SPIDER-VERSE Gallery — Glitching Monitors
═══════════════════════════════════════════════════════════ */

import { createScrollReveal } from '../core/gsap-init.js';

const GALLERY_IMAGES = [
  'assets/Gallery images/IMG-20260323-WA0019.jpg',
  'assets/Gallery images/IMG-20260323-WA0020.jpg',
  'assets/Gallery images/IMG-20260323-WA0021.jpg',
  'assets/Gallery images/IMG-20260323-WA0022.jpg',
  'assets/Gallery images/IMG-20260323-WA0023.jpg',
  'assets/Gallery images/IMG-20260323-WA0024.jpg',
  'assets/Gallery images/IMG-20260323-WA0025.jpg',
  'assets/Gallery images/IMG-20260323-WA0026.jpg',
  'assets/Gallery images/IMG-20260323-WA0027.jpg',
  'assets/Gallery images/IMG-20260323-WA0028.jpg',
  'assets/Gallery images/IMG-20260323-WA0029.jpg',
  'assets/Gallery images/IMG-20260323-WA0030.jpg',
  'assets/Gallery images/IMG-20260323-WA0031.jpg',
  'assets/Gallery images/IMG-20260323-WA0032.jpg',
  'assets/Gallery images/IMG-20260323-WA0033.jpg',
  'assets/Gallery images/IMG-20260323-WA0034.jpg',
  'assets/Gallery images/IMG-20260323-WA0035.jpg',
  'assets/Gallery images/IMG-20260323-WA0036.jpg',
  'assets/Gallery images/IMG-20260323-WA0037.jpg',
  'assets/Gallery images/IMG-20260323-WA0038.jpg',
  'assets/Gallery images/IMG-20260323-WA0039.jpg',
  'assets/Gallery images/IMG-20260323-WA0040.jpg',
  'assets/Gallery images/IMG-20260323-WA0042.jpg',
  'assets/Gallery images/IMG-20260323-WA0043.jpg',
  'assets/Gallery images/IMG-20260323-WA0044.jpg',
  'assets/Gallery images/IMG-20260323-WA0045.jpg',
  'assets/Gallery images/IMG-20260323-WA0046.jpg',
  'assets/Gallery images/IMG-20260323-WA0047.jpg',
  'assets/Gallery images/IMG-20260323-WA0048.jpg',
  'assets/Gallery images/IMG-20260323-WA0049.jpg',
  'assets/Gallery images/IMG-20260323-WA0050.jpg',
  'assets/Gallery images/IMG-20260323-WA0051.jpg',
  'assets/Gallery images/IMG-20260323-WA0052.jpg',
  'assets/Gallery images/IMG-20260323-WA0053.jpg',
  'assets/Gallery images/IMG-20260323-WA0054.jpg',
];

export function initGallery() {
  const displays = document.querySelectorAll('.gallery-display');
  if (!displays || displays.length === 0) return;
  
  let currentIndex = 0;

  // Initialize first 5 images
  displays.forEach((display, i) => {
    const imgElement = display.querySelector('.gallery-img');
    if (imgElement && GALLERY_IMAGES[i]) {
      imgElement.src = GALLERY_IMAGES[i];
    }
  });

  // Cycle images every 4 seconds
  setInterval(() => {
    // 1. Trigger glitch animation
    displays.forEach(display => display.classList.add('is-glitching'));

    // 2. Wait halfway through animation to swap image
    setTimeout(() => {
      currentIndex = (currentIndex + 5) % GALLERY_IMAGES.length;
      
      displays.forEach((display, i) => {
        const imgElement = display.querySelector('.gallery-img');
        const imgIndex = (currentIndex + i) % GALLERY_IMAGES.length;
        if (imgElement && GALLERY_IMAGES[imgIndex]) {
          imgElement.src = GALLERY_IMAGES[imgIndex];
        }
      });
    }, 400); // Wait 400ms before changing image to hide the swap within the glitch

    // 3. Remove glitch class
    setTimeout(() => {
      displays.forEach(display => display.classList.remove('is-glitching'));
    }, 800);

  }, 4000);

  // Intro animation using GSAP ScrollTrigger
  if (typeof gsap !== 'undefined') {
      displays.forEach((display, i) => {
        gsap.fromTo(display,
          { opacity: 0, scale: 0.5, rotationY: 90 },
          {
            opacity: 1, scale: 1, rotationY: i % 2 !== 0 ? 5 : -5,
            duration: 1,
            ease: 'elastic.out(1, 0.5)',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: '#gallery',
              start: 'top 70%',
            }
          }
        );
      });
  }
}

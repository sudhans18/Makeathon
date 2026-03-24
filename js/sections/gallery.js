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
  const wrapperTop = document.getElementById('gallery-wrapper-top');
  const wrapperBottom = document.getElementById('gallery-wrapper-bottom');
  if (!wrapperTop || !wrapperBottom) return;

  // Split images: first half in top, second half in bottom
  const half = Math.ceil(GALLERY_IMAGES.length / 2);
  const imagesTop = GALLERY_IMAGES.slice(0, half);
  const imagesBottom = GALLERY_IMAGES.slice(half);

  // 1. Inject slides into top row
  imagesTop.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide gallery-display';
    slide.innerHTML = `<div class="gallery-img-wrapper">
      <img src="${src}" class="gallery-img gallery-img-main" alt="Gallery Image Top ${i + 1}" loading="lazy" />
      <img src="${src}" class="gallery-img gallery-img-cyan" alt="" aria-hidden="true" loading="lazy" />
      <img src="${src}" class="gallery-img gallery-img-red" alt="" aria-hidden="true" loading="lazy" />
      <div class="comic-flash"></div>
    </div>`;
    wrapperTop.appendChild(slide);
  });

  // 1b. Inject slides into bottom row
  imagesBottom.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide gallery-display';
    slide.innerHTML = `<div class="gallery-img-wrapper">
      <img src="${src}" class="gallery-img gallery-img-main" alt="Gallery Image Bottom ${i + 1}" loading="lazy" />
      <img src="${src}" class="gallery-img gallery-img-cyan" alt="" aria-hidden="true" loading="lazy" />
      <img src="${src}" class="gallery-img gallery-img-red" alt="" aria-hidden="true" loading="lazy" />
      <div class="comic-flash"></div>
    </div>`;
    wrapperBottom.appendChild(slide);
  });

  // Base Swiper settings (Larger boxes -> slidesPerView: 4 on desktop instead of 6)
  const swiperOptions = {
    slidesPerView: 3, // Defaults to 3 on desktop for larger images
    spaceBetween: 30,
    loop: true,
    allowTouchMove: false,
    speed: 5000,
    breakpoints: {
      320: { slidesPerView: 1.2, spaceBetween: 15 },
      768: { slidesPerView: 2.2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 30 }
    }
  };

  // 2. Initialize Swipers (Top = Forward, Bottom = Reverse)
  const swiperTop = new Swiper('.gallery-swiper-top', {
    ...swiperOptions,
    autoplay: { delay: 0, disableOnInteraction: false }
  });

  const swiperBottom = new Swiper('.gallery-swiper-bottom', {
    ...swiperOptions,
    autoplay: { delay: 0, disableOnInteraction: false, reverseDirection: true }
  });

  // 3. Intro animation using GSAP ScrollTrigger
  if (typeof gsap !== 'undefined') {
    gsap.fromTo('.gallery-swiper',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 1.5,
        stagger: 0.2, // slight delay for the second row
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#gallery',
          start: 'top 70%',
        }
      }
    );
  }
}


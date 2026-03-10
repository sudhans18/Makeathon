/* ═══════════════════════════════════════════════════════════
   js/sections/team.js
   SPIDER-VERSE Team
   Populate ECEA, IETE, and RACE members from assets
═══════════════════════════════════════════════════════════ */

import { createScrollReveal } from '../core/gsap-init.js';

// Derived from local directory listings
const ECEA_MEMBERS = [
  "ABHIMANYU SINGH BHATI ECE.jpg", "ANUSHRI V ECE.jpg", "BALAJI S ECE.jpg",
  "HARINEE V T ECE.jpg", "LAVANYA P ECE.jpg", "MOHAMMED RAEEF ECE.jpeg",
  "N YAAZHINII ECE.jpg", "PRATHIBA S.png", "PREETHIKA R ECE.jpg",
  "SUDESH SHRIKANT PILLAI ECE.jpg", "SURYA K ECE.jpg"
];

const IETE_MEMBERS = [
  "A AADHITHYA NARAYANAN ECE.jpg", "BAWADHARANI.jpg", "HARINI C ECE.jpeg",
  "KARUNYA D ECE.jpg", "MAHALAKSHMI L ECE.jpg", "ROHITH KANNA S ECE.jpg",
  "Rohith.jpeg", "Roobuck ganeshwara rao C.jpg", "SANJANA PRAVEEN KUMAR ECE.jpg",
  "TEJASWI S ECE.jpeg", "VISWANATHAN L ECE.jpg", "YAAMINY S K ECE.jpg"
];

const RACE_MEMBERS = [
  "ADARSH S.jpg", "ASWIN KUMAR K.jpg", "B S AARTI ECE.jpg",
  "BALASARASWATHY B ECE.jpg", "LAKSHANA ECE.jpg", "LOHITH ASHWA S ECE.jpg",
  "LOHITH ASHWA S ECE.png", "MUHILAN S ECE.jpg", "PREETHIKA R ECE.jpg",
  "RITHVIK R ECE.jpg", "ROSHAN.JPG", "SANJAI P ECE.jpg",
  "SHRIRAM KUMAR V ECE.jpg", "SRIVATSAN S P ECE.jpg", "SUDHAN S ECE.png",
  "VINAYAGAMURTHI E ECE.jpg", "vikash Krishnakumar.jpg"
];

export function initTeam() {
  injectCards('team-grid-ecea', ECEA_MEMBERS, 'ECEA-MEMBERS');
  injectCards('team-grid-iete', IETE_MEMBERS, 'IETE-MEMBERS');
  injectCards('team-grid-race', RACE_MEMBERS, 'RACE-MEMBERS');

  // Custom reveal for team cards — spin in
  const cards = document.querySelectorAll('.team-card');
  if (!cards.length) return;

  cards.forEach((card, i) => {
    const rot = (Math.random() * 8) - 4;
    card.style.transform = `rotate(${rot}deg)`;

    gsap.fromTo(card,
      { opacity: 0, scale: 0.5, rotation: rot - 45 },
      {
        opacity: 1, scale: 1, rotation: rot,
        duration: 0.6,
        ease: 'back.out(2)',
        delay: (i % 4) * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        }
      }
    );
  });
}

function formatName(filename) {
  // Remove extension and common suffix ' ECE'
  let name = filename.replace(/\.[^/.]+$/, "");
  name = name.replace(/ ECE$/i, "");
  return name.trim();
}

function injectCards(containerId, memberFiles, folderName) {
  const grid = document.getElementById(containerId);
  if (!grid) return;

  grid.innerHTML = memberFiles.map((filename) => `
    <article class="team-card">
      <div class="team-card__avatar">
        <img
          src="assets/${folderName}/${filename}"
          alt="${formatName(filename)}"
          loading="lazy"
        />
        <div class="spider-sense" aria-hidden="true"></div>
      </div>
      <div class="team-card__info">
        <h3 class="team-card__name">${formatName(filename)}</h3>
        <p class="team-card__role">Core Member</p>
      </div>
    </article>
  `).join('');
}

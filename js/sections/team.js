/* ═══════════════════════════════════════════════════════════
   js/sections/team.js
   Spider-Verse Team — Clean & Modern
   Tab switching + IntersectionObserver scroll reveal
═══════════════════════════════════════════════════════════ */

// Member file lists (from asset directories)
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

/**
 * Extract a clean display name from a filename.
 */
function formatName(filename) {
  let name = filename.replace(/\.[^/.]+$/, '');   // strip extension
  name = name.replace(/\s*ECE$/i, '');             // strip " ECE" suffix
  return name.trim();
}

/**
 * Build card HTML for a single member.
 */
function cardHTML(filename, folder) {
  const name = formatName(filename);
  return `
    <article class="team-card">
      <div class="team-card__avatar">
        <div class="team-card__avatar-inner">
          <img
            src="assets/${folder}/${filename}"
            alt="${name}"
            loading="lazy"
          />
        </div>
      </div>
      <div class="team-card__info">
        <h3 class="team-card__name">${name}</h3>
        <p class="team-card__role">Core Member</p>
      </div>
    </article>`;
}

/**
 * Inject cards into a grid container.
 */
function injectCards(containerId, members, folder) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = members.map(f => cardHTML(f, folder)).join('');
}

/**
 * Animate cards within a panel into view with stagger.
 */
function revealCards(panel) {
  const cards = panel.querySelectorAll('.team-card');
  // Reset all cards first
  cards.forEach(card => {
    card.classList.remove('in-view');
    card.style.transitionDelay = '0ms';
  });

  // Force reflow so the reset takes effect
  void panel.offsetHeight;

  // Stagger entry
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
    // Small rAF delay so the browser processes the reset
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.classList.add('in-view');
      });
    });
  });
}

/**
 * Set up tab switching.
 */
function initTabs() {
  const tabs = document.querySelectorAll('.team__tab');
  const panels = document.querySelectorAll('.team__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.team;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show target panel, hide others
      panels.forEach(p => {
        if (p.dataset.team === target) {
          p.classList.add('active');
          revealCards(p);
        } else {
          p.classList.remove('active');
        }
      });
    });
  });
}

/**
 * IntersectionObserver: reveal cards when section scrolls into view.
 */
function initScrollReveal() {
  const section = document.getElementById('team');
  if (!section) return;

  let hasRevealed = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRevealed) {
        hasRevealed = true;
        const activePanel = section.querySelector('.team__panel.active');
        if (activePanel) {
          revealCards(activePanel);
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  observer.observe(section);
}

/**
 * Main init — called from main.js.
 */
export function initTeam() {
  // 1. Inject cards into each grid
  injectCards('team-grid-ecea', ECEA_MEMBERS, 'ECEA-MEMBERS');
  injectCards('team-grid-iete', IETE_MEMBERS, 'IETE-MEMBERS');
  injectCards('team-grid-race', RACE_MEMBERS, 'RACE-MEMBERS');

  // 2. Set up tab switching
  initTabs();

  // 3. Set up scroll reveal
  initScrollReveal();
}

/* ═══════════════════════════════════════════════════════════
   js/sections/team.js  —  Spider-Verse 3-D Carousel
   ─────────────────────────────────────────────────────────
   ★ EASY CONFIG — change either value below to your liking:
   ═══════════════════════════════════════════════════════════ */
const CAROUSEL_AUTO_INTERVAL_MS = 1000; // auto-slide speed (milliseconds)
const CAROUSEL_VISIBLE_SIDES = 2;    // how many cards visible on each side

/* ── SVG icons ───────────────────────────────────────────── */
const ICON_LINKEDIN = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
const ICON_GITHUB = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`;
const ICON_EMAIL = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`;

/* ── Member Data ─────────────────────────────────────────── */
const eceaMembers = [
  { name: "Mohammed Raeef", role: "President", img: "MOHAMMED RAEEF ECE.jpeg", linkedin: "https://www.linkedin.com/in/raeef-ibrahim-3b721125a/", email: "2022ec0449@svce.ac.in" },
  { name: "Harinee V T", role: "Vice President", img: "HARINEE V T ECE.jpg", linkedin: "https://www.linkedin.com/in/harineevt", github: "https://github.com/Harinee827", email: "harineevt27@gmail.com" },
  { name: "Balaji S", role: "Secretary", img: "BALAJI S ECE.jpg", linkedin: "https://www.linkedin.com/in/balaji-santhanam008/", github: "https://github.com/Balajisanthanam205", email: "balajisanthanam205@gmail.com" },
  { name: "Surya K", role: "Treasurer", img: "SURYA K ECE.jpg", linkedin: "https://www.linkedin.com/in/suryak23", github: "https://github.com/suryak26", email: "2023ec0546@svce.ac.in" },
  { name: "Anushri V", role: "Executive Member", img: "ANUSHRI V ECE.jpg", linkedin: "https://www.linkedin.com/in/anu-shri", email: "anushri0705@gmail.com" },
  { name: "Preethika R", role: "Executive Member", img: "PREETHIKA R ECE.jpg", linkedin: "https://www.linkedin.com/in/preethika-radhakrishnan-269958336", email: "preethiradha13@gmail.com" },
  { name: "Sudesh Pillai", role: "Executive Member", img: "SUDESH SHRIKANT PILLAI ECE.jpg", linkedin: "https://www.linkedin.com/in/sudesh-pillai-9bbb16292/", email: "sudesh120305@gmail.com" },
  { name: "Lavanya P", role: "Executive Member", img: "LAVANYA P ECE.jpg", linkedin: "https://www.linkedin.com/in/lavanya-p-6745ab322/", github: "https://github.com/LavanyaGKP", email: "2023ec0234@svce.ac.in" },
  { name: "N. Yaazhinii", role: "Joint Secretary", img: "N YAAZHINII ECE.jpg", linkedin: "https://www.linkedin.com/in/yaazhinii-narayanan-89b954326", github: "https://github.com/yaazhinii", email: "n.yaazhinii@gmail.com" },
  { name: "Abhimanyu Singh Bhati", role: "Joint Secretary", img: "ABHIMANYU SINGH BHATI ECE.jpg", linkedin: "https://www.linkedin.com/in/abhimanyu-singh-bhati-7255a0328", email: "abhimanyubhati22@gmail.com" },
  { name: "Prathiba MSK", role: "Joint Secretary", img: "PRATHIBA S.png", linkedin: "https://www.linkedin.com/in/m-s-k-prathiba-608588329", email: "2024ec0664@svce.ac.in" }
].map(m => ({ ...m, path: `assets/ECEA-MEMBERS/${m.img}` }));

const ieteMembers = [
  { name: "Yaaminy S K", role: "Chair Person", img: "YAAMINY S K ECE.jpg", linkedin: "https://www.linkedin.com/in/yaaminy-karthikeyan", email: "yaaminykarthik@gmail.com" },
  { name: "Roobuck Ganeshwara Rao C", role: "Vice Chair Person", img: "Roobuck ganeshwara rao C.jpg", linkedin: "https://www.linkedin.com/in/roobuck/", github: "https://github.com/ROOBUCK22", email: "roobuckrao2205@gmail.com" },
  { name: "Harini Chinnasamy", role: "Honorary Secretary", img: "HARINI C ECE.jpeg", linkedin: "https://www.linkedin.com/in/harini-chinnasamy-577209291/", github: "https://github.com/harini1208", email: "harinichinnasamy@gmail.com" },
  { name: "Bawadharani Sree R", role: "Honorary Treasurer", img: "BAWADHARANI.jpg", linkedin: "https://www.linkedin.com/in/bawadharani-sree-ramakrishnan-97a638218", github: "https://github.com/BawadharaniSree", email: "bawadharanisree@gmail.com" },
  { name: "Tejaswi S", role: "Executive Member", img: "TEJASWI S ECE.jpeg", linkedin: "https://www.linkedin.com/in/tejaswi-s-361876293/", email: "2023ec0576@svce.ac.in" },
  { name: "Rohith Kanna S", role: "Executive Member", img: "Rohith.jpeg", linkedin: "https://www.linkedin.com/in/rohith4510/", github: "https://github.com/Rohithkannas", email: "2023ec0574@svce.ac.in" },
  { name: "Karunya D", role: "Executive Member", img: "KARUNYA D ECE.jpg", linkedin: "https://www.linkedin.com/in/karunya-d-a96bb5357", email: "2023ec0240@svce.ac.in" },
  { name: "Sanjana Praveen Kumar", role: "Executive Member", img: "SANJANA PRAVEEN KUMAR ECE.jpg", linkedin: "https://www.linkedin.com/in/sanjana-praveen-kumar-588b7a354", email: "2023ec0531@svce.ac.in" },
  { name: "A Aadhithya Narayanan", role: "Joint Secretary", img: "A AADHITHYA NARAYANAN ECE.jpg", linkedin: "https://www.linkedin.com/in/aadhithyanarayanan/", github: "https://github.com/Axdhi.07", email: "aadhithya0106@gmail.com" },
  { name: "Mahalakshmi L", role: "Joint Secretary", img: "MAHALAKSHMI L ECE.jpg", linkedin: "https://www.linkedin.com/in/maha-lakshmi-l-756594329/", github: "https://github.com/Maha03-03", email: "2024ec0167@svce.ac.in" },
  { name: "Viswanathan L", role: "Joint Secretary", img: "VISWANATHAN L ECE.jpg", linkedin: "https://www.linkedin.com/in/viswanathan-l-159423384", github: "https://github.com/viswa-007", email: "viswanathan.26217@gmail.com" }
].map(m => ({ ...m, path: `assets/IETE-MEMBERS/${m.img}` }));

const raceMembers = [
  { name: "Roshan M", role: "President", img: "ROSHAN.JPG", linkedin: "https://www.linkedin.com/in/roshan-m-711a95292", github: "https://github.com/roshanongithub", email: "2022ec0448@svce.ac.in" },
  { name: "Adarsh S", role: "Vice President", img: "ADARSH S.jpg", linkedin: "https://www.linkedin.com/in/adarsh-s-400909255/", email: "adarshsreeram2004@gmail.com" },
  { name: "Lakshanaa A M", role: "Secretary", img: "LAKSHANA ECE.jpg", linkedin: "https://www.linkedin.com/in/lakshanaa-a-m-499057330" },
  { name: "Balasaraswathy B", role: "Lead Mentor", img: "BALASARASWATHY B ECE.jpg", linkedin: "https://www.linkedin.com/in/balasaraswathy-balagurusamy-a53a58265", github: "https://github.com/Balasaraswathy27", email: "bbalasaraswathy00@gmail.com" },
  { name: "Aswin Kumar K", role: "Lead Mentor", img: "ASWIN KUMAR K.jpg", linkedin: "https://www.linkedin.com/in/aswin-kumar5824", email: "aswinkumark1975@gmail.com" },
  { name: "Vikash S K", role: "Lead Mentor", img: "vikash Krishnakumar.jpg", linkedin: "https://www.linkedin.com/in/vikash07/", github: "https://github.com/vikash-prog", email: "yeskvikash@gmail.com" },
  { name: "Lohith Ashwa S", role: "Mentor", img: "LOHITH ASHWA FORMAL PHOTO - PASSPORT.png", linkedin: "https://www.linkedin.com/in/lohith-ashwa-s-480842277", github: "https://lohithashwa.me", email: "lohithashwa51@gmail.com" },
  { name: "Muhilan S", role: "Mentor", img: "MUHILAN S ECE.jpg", linkedin: "https://www.linkedin.com/in/muhilan-selvakumar-a294a2353", github: "https://github.com/Muhilan30", email: "www.muhilan30@gmail.com" },
  { name: "Srivatsan S P", role: "Mentor", img: "SRIVATSAN S P ECE.jpg", linkedin: "https://www.linkedin.com/in/srivatsan-sp-849a592a5", email: "2023ec0033@svce.ac.in" },
  { name: "Shriram Kumar V", role: "Mentor", img: "SHRIRAM KUMAR V ECE.jpg", linkedin: "https://www.linkedin.com/in/shriram-kumar-v-383b0228b/", email: "2023ec0881@svce.ac.in" },
  { name: "Vinayagamurthi E", role: "Mentor", img: "VINAYAGAMURTHI E ECE.jpg", linkedin: "https://www.linkedin.com/in/vinayagamurthi1212", email: "vinayagamurthire@gmail.com" },
  { name: "Sudhan S", role: "Mentor", img: "SUDHAN S ECE.png", linkedin: "https://www.linkedin.com/in/sudhan18/", github: "https://github.com/sudhans18", email: "sudhan4843@gmail.com" },
  { name: "Rithvik R", role: "Mentor", img: "RITHVIK R ECE.jpg", linkedin: "https://www.linkedin.com/in/rithvik-r-008663292/", github: "https://github.com/WhiteDevil1716", email: "rithvikr86@gmail.com" },
  { name: "B S Aarti", role: "Joint Secretary", img: "B S AARTI ECE.jpg", linkedin: "https://www.linkedin.com/in/aarti-swaminathan-a55327375", github: "https://github.com/aartiswami06", email: "2024ec0223@svce.ac.in" },
  { name: "Preethika R", role: "Joint Secretary", img: "PREETHIKA R ECE.jpg", linkedin: "https://www.linkedin.com/in/preethika-r-158285329", email: "rpreethika0608@gmail.com" },
  { name: "Sanjai P", role: "Joint Secretary", img: "SANJAI P ECE.jpg", linkedin: "https://www.linkedin.com/in/sanjai-parthiban-57015337b", email: "Indsanjai@gmail.com" }
].map(m => ({ ...m, path: `assets/RACE-MEMBERS/${m.img}` }));

/* ── Helpers ─────────────────────────────────────────────── */
function ensureProtocol(url) {
  if (!url) return url;
  if (url.startsWith('http') || url.startsWith('mailto:')) return url;
  return 'https://' + url;
}

function socialsHTML(m) {
  let h = '';
  if (m.linkedin) h += `<a href="${ensureProtocol(m.linkedin)}" target="_blank" rel="noopener" class="crew-social crew-social--li" aria-label="${m.name} LinkedIn">${ICON_LINKEDIN}</a>`;
  if (m.github) h += `<a href="${ensureProtocol(m.github)}"   target="_blank" rel="noopener" class="crew-social crew-social--gh" aria-label="${m.name} GitHub">${ICON_GITHUB}</a>`;
  if (m.email) h += `<a href="mailto:${m.email}" class="crew-social crew-social--em" aria-label="${m.name} Email">${ICON_EMAIL}</a>`;
  return h;
}

/**
 * Build card HTML for a single member.
 */
function cardHTML(member) {
  return `
    <article class="swiper-slide team-card">
      <div class="team-card__avatar">
        <div class="team-card__avatar-inner">
          <img
            src="${member.path}"
            alt="${member.name}"
            loading="lazy"
          />
        </div>
      </div>
      <div class="team-card__info">
        <h3 class="team-card__name">${member.name}</h3>
        <p class="team-card__role">${member.role}</p>
        <div class="team-card__socials">
          ${socialsHTML(member)}
        </div>
      </div>
    </article>`;
}

/**
 * Inject cards into a grid container.
 */
function injectCards(containerId, members) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  const cardsHtml = members.map(m => cardHTML(m)).join('');
  grid.innerHTML = `
    <div class="swiper team-swiper" id="swiper-${containerId}">
      <div class="swiper-wrapper">
        ${cardsHtml}
      </div>
    </div>
  `;
}

const teamSwipers = {};

function initTeamSwipers() {
  const containers = ['team-panel-ecea', 'team-panel-iete', 'team-panel-race'];
  containers.forEach(id => {
    const swiperContainerId = `swiper-${id}`;
    const containerEl = document.getElementById(swiperContainerId);
    if (!containerEl) return;
    
    teamSwipers[id] = new Swiper(`#${swiperContainerId}`, {
      effect: 'slide',
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      speed: 800, /* Smooth sliding speed */
      spaceBetween: 40,
      autoplay: {
        delay: CAROUSEL_AUTO_INTERVAL_MS,
        disableOnInteraction: false, /* Keeps autoplay running after user swipes */
        pauseOnMouseEnter: false     /* Custom logic below */
      },
      slidesPerView: 1.5,
      slideToClickedSlide: true,
      observer: true,
      observeParents: true,
      breakpoints: {
        768: { slidesPerView: 2.5 },
        1100: { slidesPerView: 3 }
      }
    });

    // Pause autoplay only when hovering the specifically active (centered) card
    containerEl.addEventListener('mouseover', (e) => {
      // Check if hovered element is within the active slide
      if (e.target.closest('.swiper-slide-active')) {
        teamSwipers[id].autoplay.stop();
      } else {
        teamSwipers[id].autoplay.start();
      }
    });
    
    containerEl.addEventListener('mouseout', () => {
      teamSwipers[id].autoplay.start();
    });
  });
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

function initTabs() {
  const tabs = document.querySelectorAll('.team__tab');
  const panels = document.querySelectorAll('.team__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.team;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(p => {
        if (p.dataset.team === target) {
          p.classList.add('active');
          revealCards(p);
          // Optional: Resync swiper if needed
          const swiperId = `team-panel-${target}`;
          if (teamSwipers[swiperId]) {
            setTimeout(() => {
              teamSwipers[swiperId].update();
            }, 50);
          }
        } else {
          p.classList.remove('active');
        }
      });
    });
  });
}

/**
 * Scroll reveal for the team section
 */
function initScrollReveal() {
  const section = document.getElementById('team');
  if (!section) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find the currently active panel and reveal its cards
        const activePanel = section.querySelector('.team__panel.active');
        if (activePanel) {
          revealCards(activePanel);
        }
        observer.unobserve(section);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(section);
}

/* ── Main export ─────────────────────────────────────────── */
export function initTeam() {
  // Set panel IDs so we can track carousels
  document.querySelectorAll('.team__panel').forEach(p => {
    if (!p.id) p.id = `team-panel-${p.dataset.team}`;
  });

  // 1. Inject skeleton grids directly into panels
  injectCards('team-panel-ecea', eceaMembers);
  injectCards('team-panel-iete', ieteMembers);
  injectCards('team-panel-race', raceMembers);

  // 2. Init Swipers
  initTeamSwipers();

  // 3. Set up tab switching
  initTabs();

  // 4. Set up scroll reveal
  initScrollReveal();
}

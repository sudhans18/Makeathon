/* ═══════════════════════════════════════════════════════════
   js/sections/team.js  —  Spider-Verse 3-D Carousel
   ─────────────────────────────────────────────────────────
   ★ EASY CONFIG — change either value below to your liking:
   ═══════════════════════════════════════════════════════════ */
const CAROUSEL_AUTO_INTERVAL_MS = 1500; // auto-slide speed (milliseconds)
const CAROUSEL_VISIBLE_SIDES    = 2;    // how many cards visible on each side

/* ── SVG icons ───────────────────────────────────────────── */
const ICON_LINKEDIN = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
const ICON_GITHUB   = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`;
const ICON_EMAIL    = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`;

/* ── Member Data ─────────────────────────────────────────── */
const eceaMembers = [
  { name:"Mohammed Raeef",      role:"President",        img:"MOHAMMED RAEEF ECE.jpeg", linkedin:"https://www.linkedin.com/in/raeef-ibrahim-3b721125a/",                                            email:"2022ec0449@svce.ac.in" },
  { name:"Harinee V T",         role:"Vice President",   img:"HARINEE V T ECE.jpg",     linkedin:"https://www.linkedin.com/in/harineevt",                   github:"https://github.com/Harinee827", email:"harineevt27@gmail.com" },
  { name:"Balaji S",            role:"Secretary",        img:"BALAJI S ECE.jpg",         linkedin:"https://www.linkedin.com/in/balaji-santhanam008/",        github:"https://github.com/Balajisanthanam205", email:"balajisanthanam205@gmail.com" },
  { name:"Surya K",             role:"Treasurer",        img:"SURYA K ECE.jpg",          linkedin:"https://www.linkedin.com/in/suryak23",                    github:"https://github.com/suryak26",  email:"2023ec0546@svce.ac.in" },
  { name:"Anushri V",           role:"Executive Member", img:"ANUSHRI V ECE.jpg",        linkedin:"https://www.linkedin.com/in/anu-shri",                                                           email:"anushri0705@gmail.com" },
  { name:"Preethika R",         role:"Executive Member", img:"PREETHIKA R ECE.jpg",      linkedin:"https://www.linkedin.com/in/preethika-radhakrishnan-269958336",                                   email:"preethiradha13@gmail.com" },
  { name:"Sudesh Pillai",       role:"Executive Member", img:"SUDESH SHRIKANT PILLAI ECE.jpg", linkedin:"https://www.linkedin.com/in/sudesh-pillai-9bbb16292/",                                     email:"sudesh120305@gmail.com" },
  { name:"Lavanya P",           role:"Executive Member", img:"LAVANYA P ECE.jpg",        linkedin:"https://www.linkedin.com/in/lavanya-p-6745ab322/",        github:"https://github.com/LavanyaGKP", email:"2023ec0234@svce.ac.in" },
  { name:"N. Yaazhinii",        role:"Joint Secretary",  img:"N YAAZHINII ECE.jpg",      linkedin:"https://www.linkedin.com/in/yaazhinii-narayanan-89b954326", email:"n.yaazhinii@gmail.com" },
  { name:"Abhimanyu Singh Bhati",role:"Joint Secretary", img:"ABHIMANYU SINGH BHATI ECE.jpg", linkedin:"https://www.linkedin.com/in/abhimanyu-singh-bhati-7255a0328", email:"abhimanyubhati22@gmail.com" },
  { name:"Prathiba MSK",        role:"Joint Secretary",  img:"PRATHIBA S.png",           linkedin:"https://www.linkedin.com/in/m-s-k-prathiba-608588329",                                           email:"2024ec0664@svce.ac.in" }
].map(m => ({ ...m, path:`assets/ECEA-MEMBERS/${m.img}` }));

const ieteMembers = [
  { name:"Yaaminy S K",              role:"Chair Person",       img:"YAAMINY S K ECE.JPG",      linkedin:"https://www.linkedin.com/in/yaaminy-karthikeyan",                                                    email:"yaaminykarthik@gmail.com" },
  { name:"Roobuck Ganeshwara Rao C", role:"Vice Chair Person",  img:"Roobuck ganeshwara rao C.jpg", linkedin:"https://www.linkedin.com/in/roobuck/",           github:"https://github.com/ROOBUCK22",   email:"roobuckrao2205@gmail.com" },
  { name:"Harini Chinnasamy",        role:"Honorary Secretary", img:"HARINI C ECE.jpeg",         linkedin:"https://www.linkedin.com/in/harini-chinnasamy-577209291/", github:"https://github.com/harini1208", email:"harinichinnasamy@gmail.com" },
  { name:"Bawadharani Sree R",       role:"Honorary Treasurer", img:"BAWADHARANI.jpg",            linkedin:"https://www.linkedin.com/in/bawadharani-sree-ramakrishnan-97a638218", github:"https://github.com/BawadharaniSree", email:"bawadharanisree@gmail.com" },
  { name:"Tejaswi S",                role:"Executive Member",   img:"TEJASWI S ECE.jpeg",         linkedin:"https://www.linkedin.com/in/tejaswi-s-361876293/",                                                  email:"2023ec0576@svce.ac.in" },
  { name:"Rohith Kanna S",           role:"Executive Member",   img:"Rohith.jpeg",                linkedin:"https://www.linkedin.com/in/rohith4510/",              github:"https://github.com/Rohithkannas", email:"2023ec0574@svce.ac.in" },
  { name:"Karunya D",                role:"Executive Member",   img:"KARUNYA D ECE.jpg",          linkedin:"https://www.linkedin.com/in/karunya-d-a96bb5357",                                                   email:"2023ec0240@svce.ac.in" },
  { name:"Sanjana Praveen Kumar",    role:"Executive Member",   img:"SANJANA PRAVEEN KUMAR ECE.jpg", linkedin:"https://www.linkedin.com/in/sanjana-praveen-kumar-588b7a354",                                     email:"2023ec0531@svce.ac.in" },
  { name:"A Aadhithya Narayanan",    role:"Joint Secretary",    img:"A AADHITHYA NARAYANAN ECE.jpg", linkedin:"https://www.linkedin.com/in/aadhithyanarayanan/",  github:"https://github.com/Axdhi.07",    email:"aadhithya0106@gmail.com" },
  { name:"Mahalakshmi L",            role:"Joint Secretary",    img:"MAHALAKSHMI L ECE.jpg",      linkedin:"https://www.linkedin.com/in/maha-lakshmi-l-756594329/", github:"https://github.com/Maha03-03", email:"2024ec0167@svce.ac.in" },
  { name:"Viswanathan L",            role:"Joint Secretary",    img:"VISWANATHAN L ECE.jpg",      linkedin:"https://www.linkedin.com/in/viswanathan-l-159423384", github:"https://github.com/viswa-007", email:"viswanathan.26217@gmail.com" }
].map(m => ({ ...m, path:`assets/IETE-MEMBERS/${m.img}` }));

const raceMembers = [
  { name:"Roshan M",        role:"President",    img:"ROSHAN.JPG",              linkedin:"https://www.linkedin.com/in/roshan-m-711a95292",        github:"https://github.com/roshanongithub",   email:"2022ec0448@svce.ac.in" },
  { name:"Adarsh S",        role:"Vice President",img:"ADARSH S.jpg",           linkedin:"https://www.linkedin.com/in/adarsh-s-400909255/",                                                      email:"adarshsreeram2004@gmail.com" },
  { name:"Lakshanaa A M",   role:"Secretary",    img:"LAKSHANA ECE.jpg",        linkedin:"https://www.linkedin.com/in/lakshanaa-a-m-499057330" },
  { name:"Balasaraswathy B",role:"Lead Mentor",  img:"BALASARASWATHY B ECE.jpg",linkedin:"https://www.linkedin.com/in/balasaraswathy-balagurusamy-a53a58265", github:"https://github.com/Balasaraswathy27", email:"bbalasaraswathy00@gmail.com" },
  { name:"Aswin Kumar K",   role:"Lead Mentor",  img:"ASWIN KUMAR K.jpg",       linkedin:"https://www.linkedin.com/in/aswin-kumar5824",                                                           email:"aswinkumark1975@gmail.com" },
  { name:"Vikash S K",      role:"Lead Mentor",  img:"vikash Krishnakumar.jpg", linkedin:"https://www.linkedin.com/in/vikash07/",                 github:"https://github.com/vikash-prog",      email:"yeskvikash@gmail.com" },
  { name:"Lohith Ashwa S",  role:"Mentor",       img:"LOHITH ASHWA S ECE.png",  linkedin:"https://www.linkedin.com/in/lohith-ashwa-s-480842277",  github:"https://lohithashwa.me",              email:"lohithashwa51@gmail.com" },
  { name:"Muhilan S",       role:"Mentor",       img:"MUHILAN S ECE.jpg",       linkedin:"https://www.linkedin.com/in/muhilan-selvakumar-a294a2353", github:"https://github.com/Muhilan30",      email:"www.muhilan30@gmail.com" },
  { name:"Srivatsan S P",   role:"Mentor",       img:"SRIVATSAN S P ECE.jpg",   linkedin:"https://www.linkedin.com/in/srivatsan-sp-849a592a5",                                                   email:"2023ec0033@svce.ac.in" },
  { name:"Shriram Kumar V", role:"Mentor",       img:"SHRIRAM KUMAR V ECE.jpg", linkedin:"https://www.linkedin.com/in/shriram-kumar-v-383b0228b/",                                               email:"2023ec0881@svce.ac.in" },
  { name:"Vinayagamurthi E",role:"Mentor",       img:"VINAYAGAMURTHI E ECE.jpg",linkedin:"https://www.linkedin.com/in/vinayagamurthi1212",                                                       email:"vinayagamurthire@gmail.com" },
  { name:"Sudhan S",        role:"Mentor",       img:"SUDHAN S ECE.png",        linkedin:"https://www.linkedin.com/in/sudhan18/",                 github:"https://github.com/sudhans18",        email:"sudhan4843@gmail.com" },
  { name:"Rithvik R",       role:"Mentor",       img:"RITHVIK R ECE.jpg",       linkedin:"https://www.linkedin.com/in/rithvik-r-008663292/",       github:"https://github.com/WhiteDevil1716",   email:"rithvikr86@gmail.com" },
  { name:"B S Aarti",       role:"Joint Secretary",img:"B S AARTI ECE.jpg",     linkedin:"https://www.linkedin.com/in/aarti-swaminathan-a55327375",                                              email:"2024ec0223@svce.ac.in" },
  { name:"Preethika R",     role:"Joint Secretary",img:"PREETHIKA R ECE.jpg",   linkedin:"https://www.linkedin.com/in/preethika-r-158285329",                                                    email:"rpreethika0608@gmail.com" },
  { name:"Sanjai P",        role:"Joint Secretary",img:"SANJAI P ECE.jpg",      linkedin:"https://www.linkedin.com/in/sanjai-parthiban-57015337b",                                               email:"Indsanjai@gmail.com" }
].map(m => ({ ...m, path:`assets/RACE-MEMBERS/${m.img}` }));

/* ── Helpers ─────────────────────────────────────────────── */
function ensureProtocol(url) {
  if (!url) return url;
  if (url.startsWith('http') || url.startsWith('mailto:')) return url;
  return 'https://' + url;
}

function socialsHTML(m) {
  let h = '';
  if (m.linkedin) h += `<a href="${ensureProtocol(m.linkedin)}" target="_blank" rel="noopener" class="crew-social crew-social--li" aria-label="${m.name} LinkedIn">${ICON_LINKEDIN}</a>`;
  if (m.github)   h += `<a href="${ensureProtocol(m.github)}"   target="_blank" rel="noopener" class="crew-social crew-social--gh" aria-label="${m.name} GitHub">${ICON_GITHUB}</a>`;
  if (m.email)    h += `<a href="mailto:${m.email}" class="crew-social crew-social--em" aria-label="${m.name} Email">${ICON_EMAIL}</a>`;
  return h;
}

/* ── Carousel Class ──────────────────────────────────────── */
class CrewCarousel {
  /**
   * @param {HTMLElement} wrapper  - the .crew-carousel element
   * @param {Array}       members  - array of member objects
   */
  constructor(wrapper, members) {
    this.wrapper = wrapper;
    this.members = members;
    this.total   = members.length;
    this.current = 0;
    this.timer   = null;
    this.isDragging = false;
    this.dragStartX = 0;

    this._build();
    this._attachEvents();
    this._update();
    this.start();
  }

  /* Build slide nodes */
  _build() {
    this.slides = this.members.map((m, i) => {
      const el = document.createElement('div');
      el.className = 'crew-slide';
      el.dataset.index = i;
      el.innerHTML = `
        <div class="crew-slide__photo-wrap">
          <img src="${m.path}" alt="${m.name}" loading="lazy" />
        </div>
        <div class="crew-slide__info">
          <p class="crew-slide__name">${m.name.toUpperCase()}</p>
          <p class="crew-slide__role">${m.role}</p>
          <div class="crew-slide__socials">${socialsHTML(m)}</div>
        </div>`;
      this.wrapper.appendChild(el);
      return el;
    });
  }

  /* Attach drag + click events */
  _attachEvents() {
    const onStart = (x) => { this.isDragging = true; this.dragStartX = x; this.pause(); };
    const onEnd   = (x) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      const diff = this.dragStartX - x;
      if (Math.abs(diff) > 40) diff > 0 ? this.next() : this.prev();
      this.start();
    };

    this.wrapper.addEventListener('mousedown',  e => onStart(e.clientX));
    this.wrapper.addEventListener('mouseup',    e => onEnd(e.clientX));
    this.wrapper.addEventListener('mouseleave', e => { if (this.isDragging) onEnd(e.clientX); });
    this.wrapper.addEventListener('touchstart', e => onStart(e.touches[0].clientX), { passive: true });
    this.wrapper.addEventListener('touchend',   e => onEnd(e.changedTouches[0].clientX));

    /* Click on a side card to jump to it */
    this.wrapper.addEventListener('click', e => {
      const slide = e.target.closest('.crew-slide');
      if (!slide || slide.classList.contains('is-center')) return;
      if (e.target.closest('a')) return; // don't intercept social links
      this.current = parseInt(slide.dataset.index, 10);
      this._update();
    });
  }

  /* Compute offset from current (mod total) */
  _offset(i) {
    const half = Math.floor(this.total / 2);
    let d = ((i - this.current) % this.total + this.total) % this.total;
    if (d > half) d -= this.total;
    return d; // negative = left, positive = right
  }

  /* Update CSS classes on every slide */
  _update() {
    this.slides.forEach((slide, i) => {
      const d = this._offset(i);
      slide.className = 'crew-slide';
      if (d === 0) {
        slide.classList.add('is-center');
      } else if (d === 1 || d === -1) {
        slide.classList.add(d === 1 ? 'is-right-1' : 'is-left-1');
      } else if (Math.abs(d) === 2) {
        slide.classList.add(d === 2 ? 'is-right-2' : 'is-left-2');
      } else {
        slide.classList.add('is-hidden');
      }
      // z-index via inline style for precision
      slide.style.zIndex = String(10 - Math.abs(d));
    });
  }

  next() { this.current = (this.current + 1) % this.total; this._update(); }
  prev() { this.current = (this.current - 1 + this.total) % this.total; this._update(); }

  start() {
    this.pause();
    this.timer = setInterval(() => this.next(), CAROUSEL_AUTO_INTERVAL_MS);
  }
  pause() { clearInterval(this.timer); this.timer = null; }
  destroy() { this.pause(); }
}

/* ── Active carousels registry (for tab switching) ── */
const carousels = {};

/* ── Per-panel init ──────────────────────────────────────── */
function buildCarouselForPanel(panelId, members) {
  const panel = document.getElementById(panelId);
  if (!panel) return;

  // Destroy old carousel if exists
  if (carousels[panelId]) { carousels[panelId].destroy(); delete carousels[panelId]; }

  // Build wrapper
  let wrapper = panel.querySelector('.crew-carousel');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.className = 'crew-carousel';
    panel.appendChild(wrapper);
  } else {
    wrapper.innerHTML = '';
  }

  carousels[panelId] = new CrewCarousel(wrapper, members);
}

/* ── Tab switching ───────────────────────────────────────── */
const PANEL_MEMBERS = {
  ecea: eceaMembers,
  iete: ieteMembers,
  race: raceMembers,
};

function initTabs() {
  const tabs   = document.querySelectorAll('.team__tab');
  const panels = document.querySelectorAll('.team__panel');

  // Pause non-active carousels when tab switches
  const pauseAll = () => Object.values(carousels).forEach(c => c.pause());

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.team;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(p => {
        if (p.dataset.team === target) {
          p.classList.add('active');
          // Re-init or resume carousel
          const panelId = `team-panel-${target}`;
          if (!carousels[panelId]) {
            buildCarouselForPanel(panelId, PANEL_MEMBERS[target]);
          } else {
            carousels[panelId].start();
          }
        } else {
          p.classList.remove('active');
          const panelId = `team-panel-${p.dataset.team}`;
          if (carousels[panelId]) carousels[panelId].pause();
        }
      });
    });
  });
}

/* ── Main export ─────────────────────────────────────────── */
export function initTeam() {
  // Set panel IDs so we can track carousels
  document.querySelectorAll('.team__panel').forEach(p => {
    if (!p.id) p.id = `team-panel-${p.dataset.team}`;
  });

  // Build all carousels up front (pause non-active ones after)
  buildCarouselForPanel('team-panel-ecea', eceaMembers);
  buildCarouselForPanel('team-panel-iete', ieteMembers);
  buildCarouselForPanel('team-panel-race', raceMembers);

  // Pause the non-active ones
  carousels['team-panel-iete']?.pause();
  carousels['team-panel-race']?.pause();

  initTabs();
}

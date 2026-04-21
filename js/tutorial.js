/* ═══════════════════════════════════════════════════════════
   js/tutorial.js — Spider-Man Game-Style Tutorial Guide
   (Standalone IIFE — loaded on track.html & industrial.html)

   Detects which page it's on and builds the correct steps.
   Spider-Man drops from the top, hangs upside-down,
   and guides the user step-by-step. He NEVER moves
   between steps — only the speech bubble text changes.

   NEW: On mobile, Step 1 auto-scrolls the top category bar
   so users can see all available domains/companies.
═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Helpers ── */
  var isMobile = function () { return window.innerWidth <= 768; };

  /* ── Page detection ── */
  var isIndustrial = location.pathname.indexOf('industrial') !== -1;
  var isResults = location.pathname.indexOf('results') !== -1;
  var params = new URLSearchParams(location.search);
  var trackType = (params.get('t') || '').toLowerCase();   // "hardware" | "software" | ""

  /* ── Auto-scroll state ── */
  var autoScrollInterval = null;
  var autoScrollPhase = 'forward'; // 'forward' | 'backward'

  /* ══════════════════════════════════════════════════════════
     autoScrollCategories() — smoothly scrolls the horizontal
     category bar on mobile to show all items, then back.
  ══════════════════════════════════════════════════════════ */
  function autoScrollCategories() {
    if (!isMobile()) return;

    var list = document.getElementById('track-left-list');
    if (!list) return;

    var scrollMax = list.scrollWidth - list.clientWidth;
    if (scrollMax <= 0) return; // nothing to scroll

    var speed = 1.2; // px per frame
    autoScrollPhase = 'forward';

    autoScrollInterval = setInterval(function () {
      if (autoScrollPhase === 'forward') {
        list.scrollLeft += speed;
        if (list.scrollLeft >= scrollMax) {
          autoScrollPhase = 'pause-end';
          // Pause at the end for 600ms
          clearInterval(autoScrollInterval);
          autoScrollInterval = setTimeout(function () {
            autoScrollPhase = 'backward';
            autoScrollInterval = setInterval(function () {
              list.scrollLeft -= speed;
              if (list.scrollLeft <= 0) {
                stopAutoScroll();
              }
            }, 16);
          }, 600);
        }
      }
    }, 16);
  }

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      clearTimeout(autoScrollInterval);
      autoScrollInterval = null;
    }
  }

  /* ══════════════════════════════════════════════════════════
     Build step definitions based on the current page
  ══════════════════════════════════════════════════════════ */
  function buildSteps() {
    if (isResults) {
      return [
        {
          getText: function () {
            return 'Hey there creators! The anomalies have been detected and the final dimensions are set!';
          },
          scrollTo: '.header-title',
          nextLabel: 'Next →'
        },
        {
          getText: function () {
            return 'Congratulations to all the shortlisted teams. Scroll down to check if your team made it to the ultimate showdown!';
          },
          scrollTo: '.celebrate-btn-wrap, .notification-bell',
          nextLabel: 'Let\'s go! 🕷️'
        }
      ];
    }

    if (isIndustrial) {
      return [
        {
          getText: function () {
            return isMobile()
              ? 'Welcome! There are 10 industry partners above. Scroll horizontally to see them all, and tap one to view its problem statements.'
              : 'Welcome! There are 10 industry partners on the left. Click any company to explore its problem statements.';
          },
          scrollTo: '#track-left',
          onEnter: function () { autoScrollCategories(); },
          onLeave: function () { stopAutoScroll(); },
          nextLabel: 'Next →'
        },
        {
          getText: function () {
            return 'Be sure to check out the Rules section below before you start hacking!';
          },
          scrollTo: '#rules',
          nextLabel: 'Got it! 🕷️'
        }
      ];
    }

    /* track.html — hardware / software */
    return [
      {
        getText: function () {
          return isMobile()
            ? 'There are 6 domains above. Scroll horizontally to see them all, then tap one to explore its problem statements.'
            : 'There are 6 domains to your left. Click one to explore its problem statements.';
        },
        scrollTo: '#track-left',
        onEnter: function () { autoScrollCategories(); },
        onLeave: function () { stopAutoScroll(); },
        nextLabel: 'Next →'
      },
      {
        getText: function () {
          return 'Be sure to check out the Rules section below before you start hacking!';
        },
        scrollTo: '#rules',
        nextLabel: 'Got it! 🕷️'
      }
    ];
  }

  var tutorialSteps = buildSteps();

  /* ── State ── */
  var currentStep = 0;
  var tutorialActive = false;

  /* ── DOM references (populated in buildDOM) ── */
  var overlay, guide, webLine, spider;
  var bubble, bubbleText, btnNext, btnSkip, dots;

  /* ══════════════════════════════════════════════════════════
     startTutorial()
  ══════════════════════════════════════════════════════════ */
  function startTutorial() {
    if (tutorialActive) return;
    tutorialActive = true;
    currentStep = 0;

    overlay.classList.add('active');
    guide.classList.add('entering');

    if (isResults && window.startContinuousConfetti) {
      window.startContinuousConfetti();
    }

    /* After drop completes → idle swing + show first bubble */
    setTimeout(function () {
      guide.classList.add('idle');
      showStep(currentStep);
    }, 1300);
  }

  /* ══════════════════════════════════════════════════════════
     nextStep()
  ══════════════════════════════════════════════════════════ */
  function nextStep() {
    if (!tutorialActive) return;

    /* Fire onLeave for the current step */
    var prevStep = tutorialSteps[currentStep];
    if (prevStep && prevStep.onLeave) prevStep.onLeave();

    currentStep++;
    if (currentStep >= tutorialSteps.length) { skipTutorial(); return; }
    showStep(currentStep);
  }

  /* ══════════════════════════════════════════════════════════
     skipTutorial()
  ══════════════════════════════════════════════════════════ */
  function skipTutorial() {
    if (!tutorialActive) return;
    tutorialActive = false;

    if (isResults && window.stopContinuousConfetti) {
      window.stopContinuousConfetti();
    }

    /* Fire onLeave for any active step */
    var activeStep = tutorialSteps[currentStep];
    if (activeStep && activeStep.onLeave) activeStep.onLeave();

    bubble.classList.remove('visible');
    clearHighlight();

    setTimeout(function () {
      guide.classList.remove('idle', 'entering');
      guide.classList.add('exiting');
      overlay.classList.remove('active');

      setTimeout(function () { guide.classList.remove('exiting'); }, 900);
    }, 250);
  }

  /* ══════════════════════════════════════════════════════════
     showStep(index)
  ══════════════════════════════════════════════════════════ */
  function showStep(index) {
    var step = tutorialSteps[index];

    /* Brief hide for text swap transition */
    bubble.classList.remove('visible');

    /* Scroll & highlight the target element IMMEDIATELY */
    if (step.scrollTo) {
      var target = document.querySelector(step.scrollTo);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        highlightSection(target);
      }
    } else {
      clearHighlight();
    }

    /* Fire onEnter callback */
    if (step.onEnter) {
      setTimeout(function () { step.onEnter(); }, 400);
    }

    setTimeout(function () {
      bubbleText.textContent = step.getText();

      /* Button label + color */
      var isLast = (index === tutorialSteps.length - 1);
      btnNext.textContent = step.nextLabel;
      if (isLast) btnNext.classList.add('last-step');
      else btnNext.classList.remove('last-step');

      /* Dots */
      updateDots(index);

      bubble.classList.add('visible');
    }, 300);
  }

  /* ── Dots ── */
  function updateDots(active) {
    dots.forEach(function (d, i) {
      d.classList.remove('active', 'done');
      if (i < active) d.classList.add('done');
      else if (i === active) d.classList.add('active');
    });
  }

  /* ── Section highlight ── */
  var highlightedEl = null;

  function highlightSection(el) {
    clearHighlight();
    highlightedEl = el;
    el.style.outline = '2px solid #00f0ff';
    el.style.outlineOffset = '-2px';
    el.style.boxShadow = '0 0 28px rgba(0,240,255,0.15)';
    el.style.transition = 'outline .3s, box-shadow .3s';
  }

  function clearHighlight() {
    if (!highlightedEl) return;
    highlightedEl.style.outline = '';
    highlightedEl.style.outlineOffset = '';
    highlightedEl.style.boxShadow = '';
    highlightedEl.style.transition = '';
    highlightedEl = null;
  }

  /* ══════════════════════════════════════════════════════════
     buildDOM() — inject all tutorial elements into <body>
  ══════════════════════════════════════════════════════════ */
  function buildDOM() {
    /* Overlay */
    overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'tutorial-overlay';

    /* Guide wrapper */
    guide = document.createElement('div');
    guide.className = 'tutorial-guide';
    guide.id = 'tutorial-guide';
    guide.setAttribute('aria-label', 'Tutorial guide');

    /* Web line */
    webLine = document.createElement('div');
    webLine.className = 'tutorial-guide__web-line';
    webLine.setAttribute('aria-hidden', 'true');

    /* Spider-Man */
    spider = document.createElement('div');
    spider.className = 'tutorial-guide__spider';
    spider.setAttribute('aria-hidden', 'true');

    var img = document.createElement('img');
    img.src = 'assets/spider.svg';
    img.alt = 'Spider-Man hanging from web';
    img.draggable = false;
    spider.appendChild(img);

    /* Speech bubble */
    bubble = document.createElement('div');
    bubble.className = 'tutorial-bubble';
    bubble.id = 'tutorial-bubble';
    bubble.setAttribute('role', 'dialog');
    bubble.setAttribute('aria-live', 'polite');
    bubble.setAttribute('aria-label', 'Tutorial step');

    var dotsHTML = '';
    for (var i = 0; i < tutorialSteps.length; i++) {
      dotsHTML += '<span class="tutorial-bubble__dot" aria-label="Step ' + (i + 1) + '"></span>';
    }

    bubble.innerHTML =
      '<div class="tutorial-bubble__dots">' + dotsHTML + '</div>' +
      '<p class="tutorial-bubble__tag">SPIDER-MAN GUIDE</p>' +
      '<p class="tutorial-bubble__text" id="tutorial-text"></p>' +
      '<div class="tutorial-bubble__actions">' +
      '  <button class="tutorial-bubble__btn-next" id="tutorial-btn-next">Next →</button>' +
      '  <button class="tutorial-bubble__btn-skip" id="tutorial-btn-skip">Skip</button>' +
      '</div>';

    dots = Array.prototype.slice.call(bubble.querySelectorAll('.tutorial-bubble__dot'));
    bubbleText = bubble.querySelector('#tutorial-text');
    btnNext = bubble.querySelector('#tutorial-btn-next');
    btnSkip = bubble.querySelector('#tutorial-btn-skip');

    var pendulum = document.createElement('div');
    pendulum.className = 'tutorial-guide__pendulum';
    pendulum.appendChild(webLine);
    pendulum.appendChild(spider);

    /* Assemble tree */
    guide.appendChild(pendulum);
    guide.appendChild(bubble);

    document.body.appendChild(overlay);
    document.body.appendChild(guide);
  }

  /* ══════════════════════════════════════════════════════════
     wireEvents()
  ══════════════════════════════════════════════════════════ */
  function wireEvents() {
    btnNext.addEventListener('click', nextStep);
    btnSkip.addEventListener('click', skipTutorial);
    // overlay.addEventListener('click', skipTutorial);

    /* Keyboard: → / Enter = next */
    document.addEventListener('keydown', function (e) {
      if (!tutorialActive) return;
      // if (e.key === 'Escape') skipTutorial();
      if (e.key === 'ArrowRight' || e.key === 'Enter') nextStep();
    });

    /* Re-evaluate responsive text on resize */
    window.addEventListener('resize', function () {
      if (!tutorialActive) return;
      bubbleText.textContent = tutorialSteps[currentStep].getText();
    });
  }

  /* ══════════════════════════════════════════════════════════
     init() — called on DOMContentLoaded
  ══════════════════════════════════════════════════════════ */
  function init() {
    /* Show the tutorial only once per session */
    var storageKey = 'tutorialShown_' + (isResults ? 'results' : (isIndustrial ? 'industrial' : trackType || 'track'));
    if (sessionStorage.getItem(storageKey)) return;

    buildDOM();
    wireEvents();

    /* Mark as shown so it won't appear again this session */
    sessionStorage.setItem(storageKey, '1');

    /* Auto-start 1.5 s after DOM is ready
       (gives time to render panels) */
    setTimeout(startTutorial, 1500);
  }

  /* ── Boot ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

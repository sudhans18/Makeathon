/* ═══════════════════════════════════════════════════════════
   hamburger.js — Mobile nav drawer toggle
   Works on any page that uses the shared nav markup.
═══════════════════════════════════════════════════════════ */

(function () {
  const btn     = document.getElementById('nav-hamburger');
  const drawer  = document.getElementById('nav-drawer');
  const overlay = document.getElementById('nav-overlay');

  if (!btn || !drawer || !overlay) return;

  function openMenu() {
    btn.classList.add('is-open');
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent scroll behind drawer
  }

  function closeMenu() {
    btn.classList.remove('is-open');
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    btn.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  // Close on overlay click
  overlay.addEventListener('click', closeMenu);

  // Close when any drawer link is tapped
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

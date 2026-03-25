/*
 * SETUP (one-time, ~10 minutes)
 * ──────────────────────────────────────────────────────────
 * 1. Create a new Google Sheet.
 *    - Add a tab named exactly: Feedback
 *    - Copy the Sheet ID from the URL:
 *      https://docs.google.com/spreadsheets/d/ ►SHEET_ID◄ /edit
 *    - Paste it into Code.gs → SHEET_ID
 *
 * 2. Open Extensions → Apps Script in that sheet.
 *    - Paste the entire Code.gs content.
 *    - Save (Ctrl+S).
 *
 * 3. Deploy → New Deployment:
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click Deploy → Authorize → Copy the Web App URL
 *
 * 4. Paste the Web App URL into this file:
 *    const APPS_SCRIPT_URL = 'YOUR_URL_HERE';
 *
 * 5. Push the updated feedback.js to your server. Done.
 *    Responses appear live in the Google Sheet.
 * ──────────────────────────────────────────────────────────
 */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwy79XZ6orV3t79e7Ssqb2B-GJid1Ir24ytvFP88bN-5a8gDNSOMShGG1RwRpr5z45x/exec';

const RATING_LABELS = {
  1: '1 / 5 — NEEDS WORK',
  2: '2 / 5 — GETTING THERE',
  3: '3 / 5 — NOT BAD',
  4: '4 / 5 — GREAT',
  5: '5 / 5 — LEGENDARY',
};

document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('feedback');
  if (!section) return;

  const starsContainer = section.querySelector('.feedback-stars');
  const ratingLabel = section.querySelector('.feedback-rating-label');
  const textarea = document.getElementById('feedback-text');
  const charsCounter = document.getElementById('feedback-chars');
  const submitBtn = document.getElementById('feedback-submit-btn');
  const resultDiv = document.getElementById('feedback-result');
  const aggregateDiv = document.getElementById('feedback-aggregate');

  let selectedRating = 0;

  // Render stars
  if (starsContainer) {
    for (let i = 1; i <= 5; i++) {
      const btn = document.createElement('button');
      btn.className = 'feedback-star-btn';
      btn.setAttribute('aria-label', `Rate ${i} star${i > 1 ? 's' : ''}`);
      btn.dataset.value = i;
      btn.textContent = '★';
      starsContainer.appendChild(btn);
    }
  }

  const starBtns = Array.from(section.querySelectorAll('.feedback-star-btn'));

  function updateStarsVisuals() {
    starBtns.forEach(btn => {
      const val = parseInt(btn.dataset.value, 10);
      if (val <= selectedRating) {
        btn.classList.add('filled');
      } else {
        btn.classList.remove('filled');
      }
      btn.classList.remove('preview');
    });
  }

  // Star Interactions
  starBtns.forEach(btn => {
    btn.addEventListener('mouseover', () => {
      const hoveredVal = parseInt(btn.dataset.value, 10);
      starBtns.forEach(b => {
        const val = parseInt(b.dataset.value, 10);
        if (val <= hoveredVal) {
          b.classList.add('preview');
        } else {
          b.classList.remove('preview', 'filled');
        }
      });
    });

    btn.addEventListener('click', () => {
      const val = parseInt(btn.dataset.value, 10);
      selectedRating = val;

      // Force reflow to restay slam animation
      starBtns.forEach(b => b.classList.remove('slam'));
      void btn.offsetWidth; // trigger reflow
      btn.classList.add('slam');

      updateStarsVisuals();
      if (ratingLabel) {
        ratingLabel.textContent = RATING_LABELS[selectedRating] || '';
      }
      if (submitBtn) {
        submitBtn.disabled = selectedRating === 0;
      }
    });
  });

  if (starsContainer) {
    starsContainer.addEventListener('mouseout', () => {
      updateStarsVisuals();
    });
  }

  // Textarea char counter
  if (textarea && charsCounter) {
    textarea.addEventListener('input', () => {
      charsCounter.textContent = textarea.value.length;
    });
  }

  // Check layout session for duplicate submissions
  const hasSubmitted = sessionStorage.getItem('feedback_submitted') === '1';
  if (hasSubmitted) {
    showThankYouState();
  }

  function showThankYouState() {
    const card = section.querySelector('.feedback-card');
    if (!card) return;
    card.innerHTML = `
      <div class="feedback-thankyou">
        <p class="feedback-thankyou__icon">🕷</p>
        <p class="feedback-thankyou__heading">
          WITH GREAT POWER COMES GREAT FEEDBACK
        </p>
        <p class="feedback-thankyou__sub">
          Your rating has been logged in our multiverse database.
        </p>
      </div>
    `;
  }

  // Submission
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (selectedRating === 0) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'TRANSMITTING...';
      if (resultDiv) {
        resultDiv.textContent = '';
        resultDiv.className = 'feedback-result';
      }

      const payload = {
        rating: selectedRating,
        suggestion: textarea ? textarea.value.trim() : '',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        page: window.location.href,
      };

      fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then((data) => {
          if (data && data.status === 'error') {
            throw new Error(data.message || 'Server error');
          }
          sessionStorage.setItem('feedback_submitted', '1');

          if (resultDiv) {
            resultDiv.textContent = '✓ FEEDBACK RECEIVED — ACROSS ALL DIMENSIONS';
            resultDiv.classList.add('success');
          }

          setTimeout(() => {
            showThankYouState();
          }, 1200);
        })
        .catch((err) => {
          console.error('Feedback submission error:', err);
          submitBtn.disabled = false;
          submitBtn.textContent = 'SUBMIT FEEDBACK';
          if (resultDiv) {
            resultDiv.textContent = '✕ TRANSMISSION FAILED — CHECK YOUR CONNECTION';
            resultDiv.classList.add('error');
          }
        });
    });
  }

  // Scroll Reveal
  const revealElements = section.querySelectorAll('.reveal');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.12}s`;
      observer.observe(el);
    });
  }

  // Fetch Aggregate
  if (APPS_SCRIPT_URL !== 'YOUR_URL_HERE') {
    fetch(APPS_SCRIPT_URL + '?action=stats', {
      method: 'GET',
      mode: 'cors' // for GET we usually need cors or it fails to parse JSON, but let's see. The prompt doesn't forbid cors on GET. No wait, the prompt says "If it fails (CORS / network), silently hide the aggregate div."
    })
      .then(r => r.json())
      .then(data => {
        if (!data) return;
        const avg = data.avgRating || 0;
        const count = data.count || 0;

        if (count > 0 && aggregateDiv) {
          const aggStars = document.getElementById('agg-stars');
          const aggScore = document.getElementById('agg-score');
          const aggCount = document.getElementById('agg-count');

          if (aggStars) {
            const fullStars = Math.floor(avg);
            const hasHalf = (avg % 1) >= 0.5;
            const starsText = '★'.repeat(fullStars) + (hasHalf ? '☆' : '') + '☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0));
            // Depending on styling, we might just use '★' vs empty strings or other chars.
            // Fallback to simple stars
            aggStars.textContent = '★'.repeat(fullStars) + (hasHalf ? '☆' : '') + ' '.repeat(5 - fullStars - (hasHalf ? 1 : 0));
            // Better yet, just use ★ and regular empty stars.
            aggStars.textContent = '★'.repeat(fullStars) + (hasHalf ? '☆' : '') + '★'.repeat(5 - fullStars - (hasHalf ? 1 : 0)).replace(/★/g, '☆');
          }
          if (aggScore) {
            aggScore.textContent = avg.toFixed(1) + ' / 5';
          }
          if (aggCount) {
            aggCount.textContent = '(' + count + ' RATINGS)';
          }

          aggregateDiv.classList.add('visible');
        }
      })
      .catch(err => {
        // Intentionally silent
        console.warn('Could not load feedback stats:', err);
      });
  }

});

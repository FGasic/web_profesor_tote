/* ═══════════════════════════════════════════════
   FRANCO GASIC MERINO — main.js
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     LANGUAGE TOGGLE
  ───────────────────────────────────────── */
  const langBtn = document.getElementById('lang-toggle');
  let currentLang = localStorage.getItem('lang') || 'es';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    document.querySelectorAll('[data-es][data-en]').forEach(el => {
      const text = el.dataset[lang];
      if (!text) return;
      // Preserve inner HTML for elements that use it (e.g. emoji + text in bio)
      if (el.tagName === 'P' && (text.includes('&') || text.includes('<'))) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    langBtn.textContent = lang === 'es' ? 'EN' : 'ES';
    document.documentElement.lang = lang;
    // Update carousel side label if carousel is active
    const ocSideEl = document.getElementById('oc-side');
    if (ocSideEl && ocSideEl.textContent) {
      const op = window._ocCurrentOpening;
      if (op) ocSideEl.textContent = lang === 'en' ? op.sideEn : op.sideEs;
    }
  }

  langBtn.addEventListener('click', () => {
    setLanguage(currentLang === 'es' ? 'en' : 'es');
  });

  // Init on load
  setLanguage(currentLang);


  /* ─────────────────────────────────────────
     NAV SCROLL STATE
  ───────────────────────────────────────── */
  const nav = document.getElementById('main-nav');

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  /* ─────────────────────────────────────────
     HAMBURGER MENU
  ───────────────────────────────────────── */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    mobileMenu.setAttribute('aria-hidden', String(!menuOpen));
    menuToggle.textContent = menuOpen ? '✕' : '☰';
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      menuToggle.textContent = '☰';
    });
  });


  /* ─────────────────────────────────────────
     SMOOTH SCROLL (with nav offset)
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ─────────────────────────────────────────
     HERO PHOTO TICKER (infinite horizontal scroll)
  ───────────────────────────────────────── */
  const tickerTrack = document.getElementById('ticker-track');
  if (tickerTrack) {
    const tickerPhotos = [
      'images/photo-6.jpg',
      'images/photo-0.png',
      'images/photo-7.jpg',
      'images/photo-3.png',
      'images/photo-8.jpg',
      'images/photo-2.png',
      'images/photo-5.png',
      'images/photo-9.jpg',
      'images/photo-4.png',
    ];

    function buildTickerSet() {
      const frag = document.createDocumentFragment();
      tickerPhotos.forEach(src => {
        const div = document.createElement('div');
        div.className = 'ticker-photo';
        const img = document.createElement('img');
        img.src = src;
        img.alt = '';
        img.loading = 'lazy';
        div.appendChild(img);
        frag.appendChild(div);
      });
      return frag;
    }

    // Two sets → seamless -50% loop
    tickerTrack.appendChild(buildTickerSet());
    tickerTrack.appendChild(buildTickerSet());

    // Pause on touch (mobile)
    tickerTrack.addEventListener('touchstart', () => {
      tickerTrack.style.animationPlayState = 'paused';
    }, { passive: true });
    tickerTrack.addEventListener('touchend', () => {
      tickerTrack.style.animationPlayState = 'running';
    }, { passive: true });
  }


  /* ─────────────────────────────────────────
     SCROLL REVEAL (IntersectionObserver)
  ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
          const idx = siblings.indexOf(entry.target);
          const delay = idx * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach(el => el.classList.add('visible'));
  }


  /* ─────────────────────────────────────────
     OPENING IMAGE CAROUSEL (Repertorio)
  ───────────────────────────────────────── */
  const openings = [
    // Gasic first
    { file: 'The_Gasic_System.png',       title: 'The Gasic System',       sideEs: 'Blancas', sideEn: 'White' },
    { file: 'Super_Defensa_Gasic.png',    title: 'Super Defensa Gasic',    sideEs: 'Negras',  sideEn: 'Black' },
    { file: 'Benko_Gasic.png',            title: 'Gambito Benko · Gasic',  sideEs: 'Negras',  sideEn: 'Black' },
    // Others
    { file: 'Defensa_Alekhine.png',       title: 'Defensa Alekhine',       sideEs: 'Negras',  sideEn: 'Black' },
    { file: 'India_de_Rey_Total.png',     title: 'India de Rey',           sideEs: 'Negras',  sideEn: 'Black' },
    { file: 'Keymer_System.png',          title: 'Sistema Keymer',         sideEs: 'Blancas', sideEn: 'White' },
    { file: 'Rock_Grunfeld.png',          title: 'Grünfeld',               sideEs: 'Negras',  sideEn: 'Black' },
    { file: 'Siciliana_Kalshnikov.png',   title: 'Siciliana Kalashnikov',  sideEs: 'Negras',  sideEn: 'Black' },
    { file: 'Siciliana_Najdorf.png',      title: 'Siciliana Najdorf',      sideEs: 'Negras',  sideEn: 'Black' },
    { file: 'Tromposky_Attack.png',       title: 'Trompowsky',             sideEs: 'Blancas', sideEn: 'White' },
  ];

  const ocTrack  = document.getElementById('oc-track');
  const ocDots   = document.getElementById('oc-dots');
  const ocTitle  = document.getElementById('oc-title');
  const ocSide   = document.getElementById('oc-side');
  const ocPrev   = document.getElementById('oc-prev');
  const ocNext   = document.getElementById('oc-next');

  if (ocTrack) {
    let ocCurrent = 0;
    let ocTimer;

    // Build slides
    openings.forEach((op, i) => {
      const slide = document.createElement('div');
      slide.className = 'oc-slide';
      const img = document.createElement('img');
      img.src = `images/${op.file}`;
      img.alt = op.title;
      img.loading = i === 0 ? 'eager' : 'lazy';
      slide.appendChild(img);
      ocTrack.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'oc-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', op.title);
      dot.addEventListener('click', () => ocGoTo(i));
      ocDots.appendChild(dot);
    });

    function ocGoTo(idx) {
      ocCurrent = (idx + openings.length) % openings.length;
      ocTrack.style.transform = `translateX(-${ocCurrent * 100}%)`;
      const op = openings[ocCurrent];
      ocTitle.textContent = op.title;
      ocSide.textContent  = currentLang === 'en' ? op.sideEn : op.sideEs;
      window._ocCurrentOpening = op;
      ocDots.querySelectorAll('.oc-dot').forEach((d, i) => {
        d.classList.toggle('active', i === ocCurrent);
      });
      clearInterval(ocTimer);
      ocTimer = setInterval(() => ocGoTo(ocCurrent + 1), 5000);
    }

    ocPrev.addEventListener('click', () => ocGoTo(ocCurrent - 1));
    ocNext.addEventListener('click', () => ocGoTo(ocCurrent + 1));

    // Keyboard support
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  ocGoTo(ocCurrent - 1);
      if (e.key === 'ArrowRight') ocGoTo(ocCurrent + 1);
    });

    // Touch/swipe support
    let touchStartX = 0;
    ocTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    ocTrack.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) ocGoTo(ocCurrent + (dx < 0 ? 1 : -1));
    }, { passive: true });

    // Init
    ocGoTo(0);
  }

  /* ─────────────────────────────────────────
     EMAIL CLIPBOARD COPY
  ───────────────────────────────────────── */
  const copyBtn = document.querySelector('.btn-copy-email');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'francogasic2026@gmail.com';

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
          showCopied();
        }).catch(() => {
          fallbackCopy(email);
        });
      } else {
        fallbackCopy(email);
      }
    });

    function showCopied() {
      const lang = currentLang;
      copyBtn.textContent = '✓ ' + (lang === 'es' ? 'Copiado' : 'Copied');
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = lang === 'es' ? 'Copiar' : 'Copy';
        copyBtn.classList.remove('copied');
      }, 2000);
    }

    function fallbackCopy(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); showCopied(); } catch(e) {}
      document.body.removeChild(ta);
    }
  }

});

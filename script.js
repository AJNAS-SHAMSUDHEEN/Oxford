/**
 * Oxford Adventure Tourism - Fully Animated Interactive Experience
 * Features:
 * - Dynamic Natural Typewriter Writing Animation with SVG Handwriting Flourish Underline
 * - Top Scroll Progress Bar & Floating Circular Progress Meter
 * - Butter-Smooth Parallax Motion on Scroll (Hero, Giant Text, Cards)
 * - Scroll-Spy Dynamic Navbar Active Link Tracker
 * - Staggered Scroll-Reveal System with IntersectionObserver
 * - 3D Perspective Card Tilt on Mouse Move
 * - Live Currency Converter (USD / QAR)
 * - Smooth Anchor Navigation with Easing
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. DYNAMIC TYPEWRITER / WRITING ANIMATION ON HERO
  // =========================================================================
  const typewriterEl = document.getElementById('typewriterText');
  const underlineSvg = document.getElementById('writingUnderline');

  const wordsToType = [
    'Bedouin Odyssey',
    'Desert Adventures',
    'Skydiving Dreams',
    "Qatar's Wild Side",
    'Khor Al Adaid',
    'Purple Island'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function runTypewriter() {
    if (!typewriterEl) return;

    const currentWord = wordsToType[wordIndex];

    if (isDeleting) {
      charIndex--;
      typingSpeed = 45;
      // Reset underline while deleting
      if (underlineSvg && underlineSvg.classList.contains('drawn')) {
        underlineSvg.classList.remove('drawn');
      }
    } else {
      charIndex++;
      // Human-like typing variation
      typingSpeed = 95 + Math.random() * 55;
    }

    typewriterEl.textContent = currentWord.substring(0, charIndex);

    if (!isDeleting && charIndex === currentWord.length) {
      // Completed word: draw the handwriting flourish underline!
      if (underlineSvg) {
        underlineSvg.classList.add('drawn');
      }
      // Hold completed word
      typingSpeed = 2400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, switch to next word
      isDeleting = false;
      wordIndex = (wordIndex + 1) % wordsToType.length;
      typingSpeed = 400;
    }

    setTimeout(runTypewriter, typingSpeed);
  }

  // Initialize writing animation
  runTypewriter();

  // =========================================================================
  // 2. SCROLL PROGRESS BAR, CIRCULAR RING & PARALLAX MOTION ENGINE
  // =========================================================================
  const progressBar = document.getElementById('scrollProgressBar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const progressRingCircle = document.getElementById('progressRingCircle');
  const header = document.querySelector('.site-header');
  const heroSkydiveImg = document.querySelector('.hero-skydive-img');
  const hugeAdventureText = document.querySelector('.huge-adventure-text');
  const featuredCards = document.querySelectorAll('.featured-adventure-card img');

  // SVG circle radius is 23, circumference = 2 * PI * 23 ~= 144.51
  const ringCircumference = 2 * Math.PI * 23;
  if (progressRingCircle) {
    progressRingCircle.style.strokeDasharray = `${ringCircumference}`;
    progressRingCircle.style.strokeDashoffset = `${ringCircumference}`;
  }

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progressFraction = totalHeight > 0 ? Math.min(1, Math.max(0, scrollY / totalHeight)) : 0;

        // 1. Top Scroll Progress Bar
        if (progressBar) {
          progressBar.style.width = `${progressFraction * 100}%`;
        }

        // 2. Circular Progress Meter & Floating Button Visibility
        if (scrollTopBtn) {
          if (scrollY > 350) {
            scrollTopBtn.classList.add('visible');
          } else {
            scrollTopBtn.classList.remove('visible');
          }
        }

        if (progressRingCircle) {
          const dashOffset = ringCircumference - (progressFraction * ringCircumference);
          progressRingCircle.style.strokeDashoffset = `${dashOffset}`;
        }

        // 3. Sticky Glass Header Transition
        if (header) {
          if (scrollY > 40) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }

        // 4. Hero Visual Parallax Depth
        if (heroSkydiveImg && scrollY < 950) {
          heroSkydiveImg.style.transform = `translateY(${scrollY * 0.12}px) scale(1.04)`;
        }

        // 5. Giant Background "ADVENTURE" Horizontal Shift
        if (hugeAdventureText && scrollY < 950) {
          hugeAdventureText.style.transform = `translateX(${scrollY * -0.07}px)`;
        }

        // 6. Featured Cards Subtle Image Parallax on Scroll
        featuredCards.forEach(img => {
          const rect = img.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * 0.04;
            img.style.transform = `scale(1.05) translateY(${offset - 8}px)`;
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  });

  // Scroll to Top action
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 3. STAGGERED SCROLL-REVEAL SYSTEM (INTERSECTION OBSERVER)
  // =========================================================================
  const revealElements = document.querySelectorAll(
    '.adventure-category-row, .skydiving-card, .destination-image-card, .destination-center-card, .section-qatar-showcase, .section-choose-adventure .section-header-split, .skydiving-header'
  );

  revealElements.forEach(el => el.classList.add('reveal-item'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.10,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =========================================================================
  // 4. SCROLL-SPY ACTIVE NAV HIGHLIGHT
  // =========================================================================
  const navLinks = document.querySelectorAll('.header-nav .nav-link');
  const observedSections = [
    { id: 'hero', linkHref: '#adventures' },
    { id: 'adventures', linkHref: '#adventures' },
    { id: 'destinations', linkHref: '#destinations' },
    { id: 'skydiving', linkHref: '#skydiving' },
    { id: 'qatar-specials', linkHref: '#qatar-specials' },
    { id: 'about', linkHref: '#about' }
  ];

  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset + 150;

    for (let i = observedSections.length - 1; i >= 0; i--) {
      const section = document.getElementById(observedSections[i].id);
      if (section && section.offsetTop <= scrollPosition) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === observedSections[i].linkHref) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
        break;
      }
    }
  });

  // 5. 3D PERSPECTIVE TILT EFFECT ON CARDS
  const tiltCards = document.querySelectorAll('.skydiving-card, .destination-image-card');

  if (window.innerWidth > 900) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // =========================================================================
  // 6. LIVE CURRENCY TOGGLE (USD <-> QAR)
  // =========================================================================
  const currencyBtns = document.querySelectorAll('.currency-btn');
  const priceElements = document.querySelectorAll('[data-usd]');

  const currencyRates = {
    USD: { symbol: '$', rate: 1 },
    QAR: { symbol: 'QAR ', rate: 3.64 }
  };

  let currentCurrency = 'USD';

  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCurrency = btn.dataset.currency;
      updatePrices();
    });
  });

  function updatePrices() {
    priceElements.forEach(el => {
      const minUsd = parseFloat(el.dataset.usdMin);
      const maxUsd = parseFloat(el.dataset.usdMax);
      const info = currencyRates[currentCurrency];

      el.style.opacity = '0';
      el.style.transform = 'translateY(-4px)';

      setTimeout(() => {
        if (currentCurrency === 'USD') {
          el.textContent = `${info.symbol}${minUsd} – ${info.symbol}${maxUsd}`;
        } else {
          const minQar = Math.round(minUsd * info.rate);
          const maxQar = Math.round(maxUsd * info.rate);
          el.textContent = `${info.symbol}${minQar.toLocaleString()} – ${maxQar.toLocaleString()}`;
        }
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 150);
    });
  }

  // =========================================================================
  // 7. ACTIVITY LIST ITEMS & QATAR PILLS INTERACTION
  // =========================================================================
  const activityButtons = document.querySelectorAll('.activity-item-btn');
  activityButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.style.color = 'var(--oxford-gold)';
      btn.style.transform = 'translateX(10px) scale(1.03)';
      setTimeout(() => {
        btn.style.color = '';
        btn.style.transform = '';
      }, 650);
    });
  });

  const qatarPills = document.querySelectorAll('.qatar-pill');
  qatarPills.forEach(pill => {
    pill.addEventListener('click', () => {
      qatarPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // =========================================================================
  // 8. BUTTER-SMOOTH ANCHOR SCROLLING NAVIGATION
  // =========================================================================
  const scrollBtns = document.querySelectorAll('.smooth-scroll-btn, .nav-link');
  scrollBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (href && href.startsWith('#') && href !== '#') {
        e.preventDefault();
        const targetEl = document.querySelector(href);
        if (targetEl) {
          const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 85;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // =========================================================================
  // 9. MOBILE MENU TOGGLE
  // =========================================================================
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const headerNav = document.getElementById('headerNav');

  if (mobileMenuToggle && headerNav) {
    mobileMenuToggle.addEventListener('click', () => {
      const isVisible = headerNav.style.display === 'flex';
      headerNav.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        headerNav.style.flexDirection = 'column';
        headerNav.style.position = 'absolute';
        headerNav.style.top = '78px';
        headerNav.style.left = '20px';
        headerNav.style.right = '20px';
        headerNav.style.background = '#FFFFFF';
        headerNav.style.boxShadow = '0 14px 36px rgba(0,0,0,0.18)';
        headerNav.style.borderRadius = '24px';
        headerNav.style.padding = '18px';
        headerNav.style.zIndex = '999';
      }
    });
  }
});

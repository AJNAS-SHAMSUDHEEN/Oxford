/**
 * Oxford Adventure Tourism - Fully Animated Interactive Script
 * Features:
 * - Scroll Reveal System (IntersectionObserver)
 * - Sticky Header with Backdrop Blur on Scroll
 * - 3D Card Parallax Mouse Tilt
 * - Live Currency Converter (USD / QAR)
 * - Smooth Scrolling Anchors
 * - Interactive Activity Highlights & Mobile Menu
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Transformation on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll(
    '.adventure-category-row, .skydiving-card, .destination-image-card, .destination-center-card, .section-qatar-showcase'
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
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. 3D Tilt Effect on Hero Skydiver Visual Card
  const heroCard = document.querySelector('.hero-visual-card');
  if (heroCard && window.innerWidth > 900) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
      const rotateY = ((x - centerX) / centerX) * 6;  // max 6deg

      heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // 4. Live Currency Toggle (USD <-> QAR)
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

  // 5. Activity List Items Highlight on Click
  const activityButtons = document.querySelectorAll('.activity-item-btn');
  activityButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.style.color = 'var(--primary)';
      btn.style.transform = 'translateX(10px) scale(1.05)';
      setTimeout(() => {
        btn.style.color = '';
        btn.style.transform = '';
      }, 700);
    });
  });

  // 6. Qatar Special Pills Selection
  const qatarPills = document.querySelectorAll('.qatar-pill');
  qatarPills.forEach(pill => {
    pill.addEventListener('click', () => {
      qatarPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // 7. Smooth Scroll for Anchor Links
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

  // 8. Mobile Menu Toggle
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

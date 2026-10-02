/**
 * Oxford Adventure Tourism - Premium White Glassmorphism Landing Page Engine
 * Features:
 * 1. Interactive Liquid Water Ripple Canvas Engine (Dynamic Wave Propagation)
 * 2. IntersectionObserver Staggered Scroll-to-Reveal System
 * 3. Horizontal Sliding Cards Carousel with Drag & Inertia Navigation
 * 4. Dynamic Typewriter Typography Engine
 * 5. 3D Perspective Card Tilt on Mouse Move
 * 6. Interactive Category Filters & Smooth Anchor Navigation
 * 7. Mobile Navigation & Scroll Progress Indicator
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. LIQUID WATER RIPPLE ENGINE (Canvas Fluid Simulation)
  // =========================================================================
  const canvas = document.getElementById('waterCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = Math.min(window.innerWidth, document.documentElement.clientWidth || window.innerWidth);
    let height = canvas.height = canvas.parentElement.offsetHeight || 650;

    window.addEventListener('resize', () => {
      width = canvas.width = Math.min(window.innerWidth, document.documentElement.clientWidth || window.innerWidth);
      height = canvas.height = canvas.parentElement.offsetHeight || 650;
    });

    const ripples = [];

    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.maxRadius = Math.random() * 85 + 75;
        this.speed = 2.4;
        this.alpha = 0.55;
      }
      update() {
        this.radius += this.speed;
        this.alpha -= 0.009;
      }
      draw(context) {
        if (this.alpha <= 0) return;
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.strokeStyle = `rgba(14, 165, 233, ${this.alpha * 0.4})`;
        context.lineWidth = 2.5;
        context.stroke();

        // Inner specular caustic reflection
        context.beginPath();
        context.arc(this.x, this.y, Math.max(0, this.radius - 8), 0, Math.PI * 2, false);
        context.strokeStyle = `rgba(255, 255, 255, ${this.alpha * 0.6})`;
        context.lineWidth = 1.2;
        context.stroke();
        context.restore();
      }
    }

    let lastTime = 0;
    function addRipple(x, y) {
      if (ripples.length < 25) {
        ripples.push(new Ripple(x, y));
      }
    }

    // Trigger ripples on mouse movement over the hero area
    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const now = Date.now();
      if (now - lastTime > 60) {
        addRipple(e.clientX - rect.left, e.clientY - rect.top);
        lastTime = now;
      }
    });

    // Trigger a wave ripple burst on click
    canvas.parentElement.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      for (let i = 0; i < 3; i++) {
        setTimeout(() => addRipple(x, y), i * 90);
      }
    });

    // Ambient water droplet ripples
    setInterval(() => {
      if (document.visibilityState === 'visible' && ripples.length < 8) {
        addRipple(Math.random() * width, Math.random() * height);
      }
    }, 1800);

    function animateWater() {
      ctx.clearRect(0, 0, width, height);
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].update();
        ripples[i].draw(ctx);
        if (ripples[i].alpha <= 0) {
          ripples.splice(i, 1);
        }
      }
      requestAnimationFrame(animateWater);
    }
    animateWater();
  }

  // =========================================================================
  // 2. SCROLL TO REVEAL SYSTEM (Intersection Observer)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // =========================================================================
  // 3. SLIDING CARDS TRACKS (Smooth Scroll & Navigation Arrows)
  // =========================================================================
  const sliderTracks = document.querySelectorAll('.sliding-track-wrapper');

  sliderTracks.forEach(wrapper => {
    let isDown = false;
    let startX;
    let scrollLeft;

    wrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', () => { isDown = false; });
    wrapper.addEventListener('mouseup', () => { isDown = false; });

    wrapper.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - startX) * 1.8;
      wrapper.scrollLeft = scrollLeft - walk;
    });
  });

  // Next / Previous buttons for sliders
  document.querySelectorAll('[data-slider-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-slider-target');
      const direction = btn.getAttribute('data-direction');
      const targetTrack = document.getElementById(targetId);
      if (!targetTrack) return;

      const cardWidth = 384; // Card width + gap
      if (direction === 'next') {
        targetTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
      } else {
        targetTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // 4. DYNAMIC TYPEWRITER ON HERO
  // =========================================================================
  const typewriterText = document.getElementById('typewriterText');
  if (typewriterText) {
    const phrases = [
      'Inland Sea Safaris',
      '15,000 Ft Skydiving',
      'Purple Island Kayaking',
      'Arabian Gulf Yachting',
      'Bedouin Night Odysseys'
    ];
    let phraseIdx = 0;
    let letterIdx = 0;
    let isDeleting = false;

    function typeLoop() {
      const current = phrases[phraseIdx];
      if (isDeleting) {
        letterIdx--;
        typewriterText.textContent = current.substring(0, letterIdx);
      } else {
        letterIdx++;
        typewriterText.textContent = current.substring(0, letterIdx);
      }

      let speed = isDeleting ? 40 : 90;

      if (!isDeleting && letterIdx === current.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && letterIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        speed = 400;
      }

      setTimeout(typeLoop, speed);
    }
    typeLoop();
  }

  // =========================================================================
  // 5. ENHANCED 3D CARD PERSPECTIVE TILT WITH SMOOTH INERTIA
  // =========================================================================
  const tiltCards = document.querySelectorAll('.slide-card, .glass-card, .signature-card-wide, .feature-glass-box');
  tiltCards.forEach(card => {
    function rotateToMouse(e) {
      const bounds = card.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      };

      const rotateX = (center.y / bounds.height) * -10;
      const rotateY = (center.x / bounds.width) * 10;

      card.style.transform = `
        perspective(1200px)
        scale3d(1.02, 1.02, 1.02)
        rotateX(${rotateX.toFixed(2)}deg)
        rotateY(${rotateY.toFixed(2)}deg)
        translateY(-6px)
      `;
    }

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.12s ease-out, box-shadow 0.2s ease-out';
    });

    card.addEventListener('mousemove', rotateToMouse);

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
      card.style.transform = '';
    });
  });

  // =========================================================================
  // 6. CATEGORY FILTER TABS
  // =========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');
      const cards = document.querySelectorAll('#featuredTrack .slide-card');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 7. HEADER SCROLL & PROGRESS BAR
  // =========================================================================
  const header = document.querySelector('.main-glass-header');
  const scrollProgress = document.getElementById('scrollProgressLine');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (scrollProgress && docHeight > 0) {
      const progress = (scrollY / docHeight) * 100;
      scrollProgress.style.width = `${progress}%`;
    }

    if (scrollTopBtn) {
      if (scrollY > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // 8. MOBILE NAVIGATION DRAWER
  // =========================================================================
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('headerNavLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('mobile-open');
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
      }
    });

    // Close when clicking any nav item
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // =========================================================================
  // 9. ALTITUDE DISPLAY SELECTOR ON SKYDIVING SECTION
  // =========================================================================
  const altButtons = document.querySelectorAll('.altitude-btn');
  const altHeightDisplay = document.getElementById('skydiveHeightDisplay');
  const altFreefallDisplay = document.getElementById('skydiveFreefallDisplay');

  if (altButtons.length > 0) {
    altButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        altButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const height = btn.getAttribute('data-height');
        const freefall = btn.getAttribute('data-freefall');

        if (altHeightDisplay) altHeightDisplay.textContent = height;
        if (altFreefallDisplay) altFreefallDisplay.textContent = freefall;
      });
    });
  }

  // =========================================================================
  // 10. SINGLE GLIDING WATER BUBBLE NAV CONTROLLER
  // =========================================================================
  const navContainer = document.getElementById('headerNavLinks');
  if (navContainer) {
    let bubble = document.getElementById('navWaterBubble');
    if (!bubble) {
      bubble = document.createElement('div');
      bubble.id = 'navWaterBubble';
      bubble.className = 'nav-water-bubble';
      navContainer.prepend(bubble);
    }

    const navItems = navContainer.querySelectorAll('.nav-item-link');
    const activeItem = navContainer.querySelector('.nav-item-link.active') || navItems[0];

    function glideBubbleTo(targetEl, isImmediate = false) {
      if (!bubble || !targetEl || !navContainer) return;
      
      const containerRect = navContainer.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      const left = targetRect.left - containerRect.left;
      const top = targetRect.top - containerRect.top;
      const width = targetRect.width;
      const height = targetRect.height;

      if (isImmediate) {
        bubble.style.transition = 'none';
      } else {
        bubble.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.35, 0.64, 1), width 0.35s cubic-bezier(0.34, 1.25, 0.64, 1), height 0.3s ease, opacity 0.25s ease';
      }

      bubble.style.width = `${width}px`;
      bubble.style.height = `${height}px`;
      bubble.style.transform = `translate(${left}px, ${top}px)`;
      bubble.style.opacity = '1';
    }

    // Initialize bubble on active item once DOM measurements are ready
    setTimeout(() => {
      if (activeItem) {
        glideBubbleTo(activeItem, true);
      }
    }, 60);

    // Hover moves the single bubble smoothly to the hovered link
    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        glideBubbleTo(item);
      });
    });

    // When mouse leaves the entire navigation bar, return bubble smoothly to active item
    navContainer.addEventListener('mouseleave', () => {
      if (activeItem) {
        glideBubbleTo(activeItem);
      }
    });

    // Recalculate on resize
    window.addEventListener('resize', () => {
      const currentActive = navContainer.querySelector('.nav-item-link.active') || navItems[0];
      if (currentActive) {
        glideBubbleTo(currentActive, true);
      }
    });
  }

});

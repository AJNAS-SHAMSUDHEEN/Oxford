/**
 * Oxford Adventure Tourism - Pro-Level Luxury Travel Engine
 * Features:
 * 1. Fullscreen Cinematic Opening Video Animation (with skip, mute, progress, and replay)
 * 2. Sticky Glassmorphism Header with Scroll States
 * 3. IntersectionObserver Scroll-to-Reveal Engine
 * 4. Interactive Altitude Selector for Skydiving
 * 5. Category Filtering for Curated Adventure Catalog
 * 6. Mobile Navigation Drawer
 * 7. Quick Concierge Booking WhatsApp Dispatcher
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. CINEMATIC OPENING VIDEO ANIMATION (Pure Video with Sound)
  // =========================================================================
  const introOverlay = document.getElementById('openingVideoIntro');
  const introVideo = document.getElementById('introVideoElement');
  const replayBtn = document.getElementById('replayIntroBtn');
  const heroOceanVideo = document.getElementById('heroOceanVideo');

  let introAudioActive = false;
  let introDismissed = false;

  function closeIntro() {
    if (!introOverlay || introDismissed) return;
    introDismissed = true;
    introOverlay.classList.add('fade-out');
    document.body.classList.remove('intro-active');
    if (heroOceanVideo) {
      heroOceanVideo.play().catch(() => {});
    }
    if (introVideo) {
      setTimeout(() => {
        try {
          introVideo.pause();
          introVideo.currentTime = 0;
        } catch (e) {}
      }, 750);
    }
  }

  function activateSoundAndPlay() {
    if (!introVideo || introDismissed) return;
    try {
      introVideo.muted = false;
      introVideo.volume = 1.0;
      // If the video already played in silence, rewind to second 0 so user hears opening music
      if (introVideo.currentTime > 0.8) {
        introVideo.currentTime = 0;
      }
      const p = introVideo.play();
      if (p !== undefined) {
        p.then(() => {
          introAudioActive = true;
        }).catch(() => {});
      }
    } catch (e) {}
  }

  function startIntro() {
    if (!introOverlay || !introVideo) return;
    introDismissed = false;
    introAudioActive = false;
    introOverlay.classList.remove('fade-out');
    document.body.classList.add('intro-active');
    introVideo.currentTime = 0;
    introVideo.muted = false;
    introVideo.volume = 1.0;

    const playPromise = introVideo.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        introAudioActive = true;
      }).catch(() => {
        // If initial unmuted autoplay blocked by browser, play muted cleanly
        introVideo.muted = true;
        introVideo.play().catch(() => {});
      });
    }
  }

  if (introOverlay && introVideo) {
    // Only show intro when refreshing the page or on first open of the site
    const navEntries = (window.performance && performance.getEntriesByType) ? performance.getEntriesByType('navigation') : [];
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';
    const isFirstOpen = !sessionStorage.getItem('oxford_intro_shown');

    if (isReload || isFirstOpen) {
      sessionStorage.setItem('oxford_intro_shown', 'true');
      document.body.classList.add('intro-active');
      startIntro();
    } else {
      // Normal navigation (e.g. clicked Home from menu) -> skip intro
      introOverlay.classList.add('fade-out');
      introOverlay.style.display = 'none';
      document.body.classList.remove('intro-active');
      introDismissed = true;
      if (heroOceanVideo) {
        heroOceanVideo.play().catch(() => {});
      }
    }

    // Auto dismiss as soon as the video animation ends
    introVideo.addEventListener('ended', () => {
      closeIntro();
    });

    // Clicking anywhere on the overlay/video:
    // If not unmuted yet, unmute and play with sound!
    // If already unmuted, clicking acts as skip.
    introOverlay.addEventListener('click', (e) => {
      if (!introAudioActive) {
        activateSoundAndPlay();
      } else {
        closeIntro();
      }
    });

    // Any keydown or touch on the window un-mutes audio immediately
    const globalUnmuteGesture = () => {
      if (introOverlay && !introOverlay.classList.contains('fade-out') && !introAudioActive) {
        activateSoundAndPlay();
      }
    };
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeIntro();
      } else {
        globalUnmuteGesture();
      }
    });
    window.addEventListener('touchstart', globalUnmuteGesture, { passive: true });

    // Fallback timer: dismiss if finished or stuck after 9s (video is 7.04s)
    setTimeout(() => {
      if (introOverlay && !introOverlay.classList.contains('fade-out')) {
        closeIntro();
      }
    }, 9000);
  }

  // Replay intro trigger in footer
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      startIntro();
    });
  }

  // =========================================================================
  // 2. STICKY GLASS NAVBAR & SCROLL PROGRESS
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
      if (scrollY > 400) {
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
  // 3. MOBILE NAVIGATION DRAWER
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

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // =========================================================================
  // 4. SCROLL REVEAL OBSERVER
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // =========================================================================
  // 5. INTERACTIVE ALTITUDE SELECTOR (Skydiving Showcase)
  // =========================================================================
  const altitudeBtns = document.querySelectorAll('.altitude-pill-btn');
  const statAltitude = document.getElementById('skydiveStatAltitude');
  const statFreefall = document.getElementById('skydiveStatFreefall');
  const statSpeed = document.getElementById('skydiveStatSpeed');
  const statDropzone = document.getElementById('skydiveStatDropzone');

  if (altitudeBtns.length > 0) {
    altitudeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        altitudeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const height = btn.getAttribute('data-height') || '15,000 Ft';
        const freefall = btn.getAttribute('data-freefall') || '60+ Sec';
        const speed = btn.getAttribute('data-speed') || '220 km/h';
        const dropzone = btn.getAttribute('data-dropzone') || 'Khor Al Adaid';

        if (statAltitude) statAltitude.textContent = height;
        if (statFreefall) statFreefall.textContent = freefall;
        if (statSpeed) statSpeed.textContent = speed;
        if (statDropzone) statDropzone.textContent = dropzone;
      });
    });
  }

  // =========================================================================
  // 6. CATEGORY FILTER TABS & REALM SECTIONS (Adventures & Offerings)
  // =========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab-pill');
  const adventureCards = document.querySelectorAll('.luxury-card');
  const realmSections = document.querySelectorAll('.realm-section');

  if (filterTabs.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter') || 'all';

        // Filter realm sections if present
        if (realmSections.length > 0) {
          realmSections.forEach(section => {
            const realm = section.getAttribute('data-realm');
            if (filter === 'all' || realm === filter) {
              section.style.display = '';
              setTimeout(() => {
                section.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
              }, 50);
            } else {
              section.style.display = 'none';
            }
          });
        }

        // Filter cards in flat grids if no realm sections exist
        if (realmSections.length === 0 && adventureCards.length > 0) {
          adventureCards.forEach(card => {
            const cat = card.getAttribute('data-category');
            if (filter === 'all' || cat === filter) {
              card.style.display = '';
              setTimeout(() => card.classList.add('active'), 50);
            } else {
              card.style.display = 'none';
            }
          });
        }
      });
    });
  }

  // Hero Realm Nav Smooth Scrolling & Unhiding
  const realmNavPills = document.querySelectorAll('.hero-realm-nav .realm-nav-pill');
  if (realmNavPills.length > 0) {
    realmNavPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        const targetId = pill.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            e.preventDefault();
            // Ensure target section is visible by activating 'all' or that realm
            const realm = targetSection.getAttribute('data-realm');
            const matchingTab = document.querySelector(`.filter-tab-pill[data-filter="${realm}"]`) || document.querySelector('.filter-tab-pill[data-filter="all"]');
            if (matchingTab) {
              matchingTab.click();
            }
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  // =========================================================================
  // 7. CONCIERGE BOOKING QUICK FORM
  // =========================================================================
  const bookingForm = document.getElementById('conciergeBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookingName')?.value || 'Guest';
      const adventure = document.getElementById('bookingAdventure')?.value || 'Inland Sea Safari';
      const guests = document.getElementById('bookingGuests')?.value || '2';
      const date = document.getElementById('bookingDate')?.value || 'Soon';

      const message = `Hello Oxford Adventure Tourism! I would like to reserve a bespoke expedition.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Experience:* ${encodeURIComponent(adventure)}%0A*Party Size:* ${encodeURIComponent(guests)} Guests%0A*Preferred Date:* ${encodeURIComponent(date)}%0A%0APlease share availability and private VIP rates.`;

      window.open(`https://wa.me/97472001133?text=${message}`, '_blank');
    });
  }

  // =========================================================================
  // 8. 3D COVERFLOW VISUAL DIARY ENGINE (Reference Image 1)
  // =========================================================================
  const coverflowWrapper = document.querySelector('.coverflow-carousel-wrapper');
  const coverflowTrack = document.getElementById('coverflowTrack');
  const coverflowPrevBtn = document.getElementById('coverflowPrevBtn');
  const coverflowNextBtn = document.getElementById('coverflowNextBtn');
  const coverflowDots = document.querySelectorAll('.coverflow-dot');
  const coverflowFilters = document.querySelectorAll('[data-coverflow-filter]');

  if (coverflowTrack && coverflowWrapper) {
    const originalCards = Array.from(coverflowTrack.querySelectorAll('.coverflow-card'));
    const N = originalCards.length;

    if (N > 0) {
      // Create seamless infinite clones before and after
      originalCards.forEach(card => {
        const cloneBefore = card.cloneNode(true);
        cloneBefore.classList.remove('active');
        cloneBefore.setAttribute('data-clone', 'true');
        coverflowTrack.insertBefore(cloneBefore, originalCards[0]);
      });

      originalCards.forEach(card => {
        const cloneAfter = card.cloneNode(true);
        cloneAfter.classList.remove('active');
        cloneAfter.setAttribute('data-clone', 'true');
        coverflowTrack.appendChild(cloneAfter);
      });

      // Complete array of cards: Set 0 (0..N-1), Set 1 (N..2N-1), Set 2 (2N..3N-1)
      const allCards = Array.from(coverflowTrack.querySelectorAll('.coverflow-card'));
      let currentCoverflowIndex = N + 2; // Start on middle card (Card 2) in Set 1
      let autoScrollTimer = null;
      let isAnimating = false;
      let safetyUnlockTimer = null;
      const AUTO_SCROLL_DELAY = 3000; // 3 seconds auto-scroll

      function updateCoverflow(animate = true) {
        const activeCard = allCards[currentCoverflowIndex];
        if (!activeCard) return;

        allCards.forEach((card, idx) => {
          card.classList.remove('active', 'flank-prev', 'flank-next', 'flank-outer', 'flank-outer-next');
          const diff = idx - currentCoverflowIndex;
          if (diff === 0) {
            card.classList.add('active');
          } else if (diff === -1) {
            card.classList.add('flank-prev');
          } else if (diff === 1) {
            card.classList.add('flank-next');
          } else if (diff < -1) {
            card.classList.add('flank-outer');
          } else {
            card.classList.add('flank-outer-next');
          }
        });

        // Sync pagination dots
        if (coverflowDots.length > 0) {
          const realIndex = ((currentCoverflowIndex % N) + N) % N;
          coverflowDots.forEach((dot, dotIdx) => {
            dot.classList.toggle('active', dotIdx === realIndex);
          });
        }

        // Set transition speed or jump immediately
        if (!animate) {
          coverflowTrack.style.transition = 'none';
        } else {
          coverflowTrack.style.transition = 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)';
        }

        // Center activeCard in coverflowWrapper
        const cardCenter = activeCard.offsetLeft + (activeCard.offsetWidth / 2);
        const wrapperCenter = coverflowWrapper.offsetWidth / 2;
        const shiftX = wrapperCenter - cardCenter;

        coverflowTrack.style.transform = `translateX(${shiftX}px)`;
      }

      function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;
        currentCoverflowIndex++;
        updateCoverflow(true);

        clearTimeout(safetyUnlockTimer);
        safetyUnlockTimer = setTimeout(() => { isAnimating = false; }, 700);
      }

      function prevSlide() {
        if (isAnimating) return;
        isAnimating = true;
        currentCoverflowIndex--;
        updateCoverflow(true);

        clearTimeout(safetyUnlockTimer);
        safetyUnlockTimer = setTimeout(() => { isAnimating = false; }, 700);
      }

      // Seamless wrap-around after transition completes
      coverflowTrack.addEventListener('transitionend', (e) => {
        if (e.target !== coverflowTrack || e.propertyName !== 'transform') return;

        // If we crossed into Set 2 (third set), jump back silently into Set 1 (middle set)
        if (currentCoverflowIndex >= 2 * N) {
          currentCoverflowIndex = currentCoverflowIndex - N;
          updateCoverflow(false);
          void coverflowTrack.offsetHeight; // force reflow
        } 
        // If we crossed into Set 0 (first set), jump forward silently into Set 1 (middle set)
        else if (currentCoverflowIndex < N) {
          currentCoverflowIndex = currentCoverflowIndex + N;
          updateCoverflow(false);
          void coverflowTrack.offsetHeight; // force reflow
        }
        isAnimating = false;
      });

      function startAutoScroll() {
        stopAutoScroll();
        autoScrollTimer = setInterval(nextSlide, AUTO_SCROLL_DELAY);
      }

      function stopAutoScroll() {
        if (autoScrollTimer) {
          clearInterval(autoScrollTimer);
          autoScrollTimer = null;
        }
      }

      // Direct card click interaction on all slides
      allCards.forEach((card, idx) => {
        card.addEventListener('click', () => {
          if (isAnimating) return;
          if (idx === currentCoverflowIndex) return;
          isAnimating = true;
          currentCoverflowIndex = idx;
          updateCoverflow(true);
          startAutoScroll();

          clearTimeout(safetyUnlockTimer);
          safetyUnlockTimer = setTimeout(() => { isAnimating = false; }, 700);
        });
      });

      // Controls
      if (coverflowPrevBtn) {
        coverflowPrevBtn.addEventListener('click', () => {
          prevSlide();
          startAutoScroll();
        });
      }

      if (coverflowNextBtn) {
        coverflowNextBtn.addEventListener('click', () => {
          nextSlide();
          startAutoScroll();
        });
      }

      // Pagination dots click handler
      if (coverflowDots.length > 0) {
        coverflowDots.forEach(dot => {
          dot.addEventListener('click', () => {
            if (isAnimating) return;
            const dotIdx = parseInt(dot.getAttribute('data-dot-index'), 10);
            if (isNaN(dotIdx)) return;
            const targetIndex = N + dotIdx;
            if (targetIndex === currentCoverflowIndex) return;

            isAnimating = true;
            currentCoverflowIndex = targetIndex;
            updateCoverflow(true);
            startAutoScroll();

            clearTimeout(safetyUnlockTimer);
            safetyUnlockTimer = setTimeout(() => { isAnimating = false; }, 700);
          });
        });
      }

      // Pause on hover & touch
      coverflowWrapper.addEventListener('mouseenter', stopAutoScroll);
      coverflowWrapper.addEventListener('mouseleave', startAutoScroll);
      coverflowWrapper.addEventListener('touchstart', stopAutoScroll, { passive: true });
      coverflowWrapper.addEventListener('touchend', startAutoScroll, { passive: true });

      // Category filters
      if (coverflowFilters.length > 0) {
        coverflowFilters.forEach(pill => {
          pill.addEventListener('click', () => {
            coverflowFilters.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const target = pill.getAttribute('data-coverflow-filter');
            if (target === 'all') {
              currentCoverflowIndex = N + 2;
            } else {
              for (let i = N; i < 2 * N; i++) {
                if (allCards[i].getAttribute('data-category') === target) {
                  currentCoverflowIndex = i;
                  break;
                }
              }
            }
            isAnimating = true;
            updateCoverflow(true);
            startAutoScroll();

            clearTimeout(safetyUnlockTimer);
            safetyUnlockTimer = setTimeout(() => { isAnimating = false; }, 700);
          });
        });
      }

      // Responsive window resize recalculation
      window.addEventListener('resize', () => {
        updateCoverflow(false);
      });

      // Initialize 3D positions and kick off 3-second auto-scroll
      setTimeout(() => {
        updateCoverflow(false);
        startAutoScroll();
      }, 100);
    }
  }

});

/* ============================
   NO COMPROMISE FILMS
   Main JavaScript
   ============================ */

(function () {
    'use strict';

    // ──────────────────────────────────────
    // DOM ELEMENT REFERENCES
    // ──────────────────────────────────────
    const preloader = document.getElementById('preloader');
    const header = document.getElementById('header');
    const navList = document.getElementById('navList');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.nav__link');
    const portfolioGrid = document.getElementById('portfolioGrid');
    const filterButtons = document.querySelectorAll('.portfolio__filter');
    const portfolioItems = document.querySelectorAll('.portfolio__item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxBackdrop = document.querySelector('.lightbox__backdrop');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const cursorEl = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    const revealElements = document.querySelectorAll('.reveal');
    const revealTextElements = document.querySelectorAll('.reveal-text');
    const aboutStats = document.querySelectorAll('.about__stat-number');

    // ──────────────────────────────────────
    // STATE
    // ──────────────────────────────────────
    let currentLightboxIndex = 0;
    let visiblePortfolioItems = [];
    let currentFilter = 'all';

    // ──────────────────────────────────────
    // PORTFOLIO DATA (for lightbox)
    // ──────────────────────────────────────
    const portfolioData = [
        {
            src: 'img/20260425161251_IMG_4413.jpg',
            category: 'Sports',
            title: 'Kenya Cup Semis',
            caption: 'KCB RFC vs Nondies RFC — 2026',
            alt: 'Intense action from the Kenya Cup semifinals, with players battling for possession in a muddy scrum',
        },
        {
            src: 'https://picsum.photos/seed/wildlife-elephants/1500/1000',
            category: 'Wildlife',
            title: 'Dust & Dawn',
            caption: 'Amboseli, Kenya — 2023',
            alt: 'A herd of elephants crossing the golden savannah at dawn',
        },
        {
            src: 'https://picsum.photos/seed/lifestyle-market/1200/1400',
            category: 'Lifestyle',
            title: 'Market Rhythms',
            caption: 'Marrakech medina — 2024',
            alt: 'A vendor at a bustling street market arranging fresh produce',
        },
        {
            src: 'https://picsum.photos/seed/sports-runner/1000/1500',
            category: 'Sports',
            title: 'Endurance',
            caption: 'Boston Marathon — 2024',
            alt: 'Marathon runner pushing through exhaustion',
        },
        {
            src: 'https://picsum.photos/seed/wildlife-bird/1200/1200',
            category: 'Wildlife',
            title: 'The Hunt',
            caption: 'Patagonia — 2023',
            alt: 'A raptor diving mid-flight against a stormy sky',
        },
        {
            src: 'https://picsum.photos/seed/lifestyle-family/1500/950',
            category: 'Lifestyle',
            title: 'Breaking Bread',
            caption: 'Tuscany, Italy — 2024',
            alt: 'A multi-generational family sharing a meal outdoors',
        },
        {
            src: 'https://picsum.photos/seed/sports-surf/1200/1100',
            category: 'Sports',
            title: 'Barrel Rider',
            caption: 'Pipeline, Hawaii — 2024',
            alt: 'Surfer carving through a massive wave',
        },
        {
            src: 'https://picsum.photos/seed/wildlife-lion/1000/1500',
            category: 'Wildlife',
            title: 'The Stare',
            caption: 'Serengeti, Tanzania — 2023',
            alt: 'A lioness staring directly into the lens',
        },
        {
            src: 'https://picsum.photos/seed/lifestyle-studio/1200/1300',
            category: 'Lifestyle',
            title: 'Hands of Craft',
            caption: 'Kyoto, Japan — 2024',
            alt: 'An artisan at work in a sun-drenched pottery studio',
        },
    ];

    // ──────────────────────────────────────
    // PRELOADER
    // ──────────────────────────────────────
    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('preloader--hidden');
            document.body.classList.remove('preloading');
            // Remove preloader from DOM after transition
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 800);
        }
    }

    // Hide preloader after page load
    window.addEventListener('load', () => {
        // Small delay to ensure the animation completes
        setTimeout(hidePreloader, 1800);
    });

    // Fallback: hide preloader after 3 seconds even if load event hasn't fired
    setTimeout(hidePreloader, 3500);

    // ──────────────────────────────────────
    // CUSTOM CURSOR
    // ──────────────────────────────────────
    function initCustomCursor() {
        if (!cursorEl || !cursorFollower) return;

        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update small cursor immediately
            cursorEl.style.left = mouseX + 'px';
            cursorEl.style.top = mouseY + 'px';
        });

        // Smooth follower animation
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll(
            'a, button, .portfolio__item, .showreel__placeholder, input, textarea, .btn'
        );

        hoverTargets.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.classList.add('cursor--hover');
                cursorEl.style.opacity = '0.3';
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('cursor--hover');
                cursorEl.style.opacity = '1';
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorEl.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorEl.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        });
    }

    // ──────────────────────────────────────
    // HEADER SCROLL EFFECT
    // ──────────────────────────────────────
    function initHeaderScroll() {
        const scrollThreshold = 60;

        function updateHeader() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        }

        window.addEventListener('scroll', updateHeader, { passive: true });
        updateHeader(); // Initial check
    }

    // ──────────────────────────────────────
    // MOBILE NAVIGATION
    // ──────────────────────────────────────
    function initMobileNav() {
        if (!navToggle || !navList) return;

        navToggle.addEventListener('click', () => {
            const isOpen = navList.classList.contains('nav__list--open');
            if (isOpen) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        // Close nav when a link is clicked
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('nav__list--open')) {
                    closeMobileNav();
                }
            });
        });

        // Close nav when clicking outside
        document.addEventListener('click', (e) => {
            if (
                navList.classList.contains('nav__list--open') &&
                !navList.contains(e.target) &&
                !navToggle.contains(e.target)
            ) {
                closeMobileNav();
            }
        });
    }

    function openMobileNav() {
        navList.classList.add('nav__list--open');
        navToggle.classList.add('nav__toggle--active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        navList.classList.remove('nav__list--open');
        navToggle.classList.remove('nav__toggle--active');
        document.body.style.overflow = '';
    }

    // ──────────────────────────────────────
    // ACTIVE NAV LINK ON SCROLL
    // ──────────────────────────────────────
    function initActiveNavTracking() {
        const sections = document.querySelectorAll('section[id]');
        const navLinkMap = new Map();

        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                navLinkMap.set(href, link);
            }
        });

        function updateActiveLink() {
            let currentSectionId = '';
            const scrollPos = window.scrollY + 150;

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    currentSectionId = '#' + section.id;
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove('nav__link--active');
            });

            const activeLink = navLinkMap.get(currentSectionId);
            if (activeLink) {
                activeLink.classList.add('nav__link--active');
            }
        }

        window.addEventListener('scroll', updateActiveLink, { passive: true });
        updateActiveLink();
    }

    // ──────────────────────────────────────
    // PORTFOLIO FILTERING
    // ──────────────────────────────────────
    function initPortfolioFilters() {
        if (!filterButtons.length || !portfolioItems.length) return;

        filterButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const filterValue = btn.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach((b) => b.classList.remove('portfolio__filter--active'));
                btn.classList.add('portfolio__filter--active');

                // Filter items
                currentFilter = filterValue;
                filterPortfolioItems(filterValue);
            });
        });
    }

    function filterPortfolioItems(filter) {
        portfolioItems.forEach((item) => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.classList.remove('portfolio__item--hidden');
            } else {
                item.classList.add('portfolio__item--hidden');
            }
        });

        // Update visible items reference for lightbox
        updateVisiblePortfolioItems();

        // Re-trigger reveal animations for newly visible items
        setTimeout(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('reveal--visible');
                        }
                    });
                },
                { threshold: 0.15 }
            );

            document.querySelectorAll('.portfolio__item:not(.portfolio__item--hidden).reveal').forEach(
                (item) => {
                    if (!item.classList.contains('reveal--visible')) {
                        observer.observe(item);
                    }
                }
            );
        }, 100);
    }

    function updateVisiblePortfolioItems() {
        visiblePortfolioItems = [];
        document
            .querySelectorAll('.portfolio__item:not(.portfolio__item--hidden)')
            .forEach((item) => {
                const index = parseInt(item.getAttribute('data-index'), 10);
                if (!isNaN(index) && index >= 0 && index < portfolioData.length) {
                    visiblePortfolioItems.push(index);
                }
            });
    }

    // ──────────────────────────────────────
    // LIGHTBOX
    // ──────────────────────────────────────
    function initLightbox() {
        if (!lightbox || !lightboxImage) return;

        // Click handler on portfolio items
        portfolioGrid.addEventListener('click', (e) => {
            const item = e.target.closest('.portfolio__item');
            if (!item || item.classList.contains('portfolio__item--hidden')) return;

            const index = parseInt(item.getAttribute('data-index'), 10);
            if (!isNaN(index) && index >= 0 && index < portfolioData.length) {
                openLightbox(index);
            }
        });

        // Close button
        lightboxClose.addEventListener('click', closeLightbox);

        // Backdrop click
        lightboxBackdrop.addEventListener('click', closeLightbox);

        // Navigation
        lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
        lightboxNext.addEventListener('click', () => navigateLightbox(1));

        // Keyboard navigation
        document.addEventListener('keydown', handleLightboxKeyboard);

        // Update visible items initially
        updateVisiblePortfolioItems();
    }

    function openLightbox(index) {
        currentLightboxIndex = index;
        updateLightboxContent();
        lightbox.classList.add('lightbox--open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-open');
    }

    function closeLightbox() {
        lightbox.classList.remove('lightbox--open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');
        currentLightboxIndex = 0;
    }

    function navigateLightbox(direction) {
        if (visiblePortfolioItems.length === 0) return;

        // Find current position in visible items
        const currentPos = visiblePortfolioItems.indexOf(currentLightboxIndex);
        let newPos;

        if (currentPos === -1) {
            // Current item not in visible list, start from beginning
            newPos = 0;
        } else {
            newPos = currentPos + direction;
            if (newPos < 0) newPos = visiblePortfolioItems.length - 1;
            if (newPos >= visiblePortfolioItems.length) newPos = 0;
        }

        currentLightboxIndex = visiblePortfolioItems[newPos];
        updateLightboxContent();
    }

    function updateLightboxContent() {
        const data = portfolioData[currentLightboxIndex];
        if (!data) return;

        lightboxImage.src = data.src;
        lightboxImage.alt = data.alt;
        lightboxCaption.innerHTML = `
                    <span class="lightbox__caption-title">${data.title}</span>
                    <span class="lightbox__caption-desc">${data.caption} — ${data.category}</span>
                `;
    }

    function handleLightboxKeyboard(e) {
        if (!lightbox.classList.contains('lightbox--open')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
            default:
                break;
        }
    }

    // ──────────────────────────────────────
    // SCROLL REVEAL (Intersection Observer)
    // ──────────────────────────────────────
    function initScrollReveal() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px',
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach((el) => {
            revealObserver.observe(el);
        });

        // Separate observer for hero text elements (with different threshold)
        const textObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-text--visible');
                        textObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        revealTextElements.forEach((el) => {
            textObserver.observe(el);
        });
    }

    // ──────────────────────────────────────
    // COUNTER ANIMATION (About Stats)
    // ──────────────────────────────────────
    function initCounterAnimation() {
        if (!aboutStats.length) return;

        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const targetCount = parseInt(el.getAttribute('data-count'), 10);
                        if (isNaN(targetCount)) return;

                        animateCounter(el, targetCount);
                        counterObserver.unobserve(el);
                    }
                });
            },
            { threshold: 0.6 }
        );

        aboutStats.forEach((stat) => {
            counterObserver.observe(stat);
        });
    }

    function animateCounter(element, target) {
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(startValue + (target - startValue) * eased);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // ──────────────────────────────────────
    // CONTACT FORM HANDLING
    // ──────────────────────────────────────
    function initContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('.contact__submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                showFormMessage(
                    'Thank you for your message. I will get back to you shortly.',
                    'success'
                );
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function showFormMessage(msg, type) {
        if (!formMessage) return;
        formMessage.textContent = msg;
        formMessage.className = 'contact__form-message';
        formMessage.classList.add(`contact__form-message--${type}`);

        // Auto-clear success message
        if (type === 'success') {
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'contact__form-message';
            }, 6000);
        }
    }

    // ──────────────────────────────────────
    // SMOOTH SCROLL FOR ALL ANCHOR LINKS
    // ──────────────────────────────────────
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = header ? header.offsetHeight : 70;
                    const targetPosition =
                        targetElement.getBoundingClientRect().top +
                        window.pageYOffset -
                        headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth',
                    });
                }
            });
        });
    }

    // ──────────────────────────────────────
    // PARALLAX ON HERO BACKGROUND
    // ──────────────────────────────────────
    function initHeroParallax() {
        const heroBgImage = document.querySelector('.hero__bg-image');
        if (!heroBgImage) return;

        window.addEventListener(
            'scroll',
            () => {
                const scrollY = window.scrollY;
                const parallaxValue = scrollY * 0.15;
                heroBgImage.style.transform = `scale(1.05) translateY(${parallaxValue}px)`;
            },
            { passive: true }
        );
    }

    // ──────────────────────────────────────
    // INITIALIZATION
    // ──────────────────────────────────────
    function init() {
        document.body.classList.add('preloading');
        initCustomCursor();
        initHeaderScroll();
        initMobileNav();
        initActiveNavTracking();
        initPortfolioFilters();
        initLightbox();
        initScrollReveal();
        initCounterAnimation();
        initContactForm();
        initSmoothScroll();
        initHeroParallax();

        // Initialize visible portfolio items
        updateVisiblePortfolioItems();

        // Mark hero text as visible if already in view (fallback)
        setTimeout(() => {
            revealTextElements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.classList.add('reveal-text--visible');
                }
            });
        }, 500);

        console.log('%c No Compromise Films %c Portfolio Ready ',
            'background:#c8a05a;color:#0a0a0b;padding:4px 8px;font-weight:bold;font-size:14px;',
            'color:#8a8a92;');
    }

    // ──────────────────────────────────────
    // START
    // ──────────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
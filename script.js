document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const navOverlay = document.querySelector('.nav-overlay');

    function closeMenu() {
        if (nav && mobileMenuBtn) {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        }
    }

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            const isActive = nav.classList.contains('active');
            nav.classList.toggle('active');
            this.textContent = isActive ? '☰' : '✕';

            if (!isActive) {
                navLinks.forEach(link => {
                    link.addEventListener('click', closeMenu, { once: true });
                });
            }
        });
    }

    // Close Menu on Outside Click
    document.addEventListener('click', function(e) {
        if (nav && mobileMenuBtn && !e.target.closest('.header')) {
            closeMenu();
        }
    });

    // Close Mobile Menu on Escape Key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
            closeMenu();
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Background on Scroll
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(10, 10, 10, 0.7)';
                header.style.backgroundFilter = 'blur(10px)'
            } else {
                header.style.backgroundColor = 'rgba(10, 10, 10, 0.7)';
                header.style.backgroundFilter = 'blur(10px)'
            }
        });
    }

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY + 100;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Add animation class to cards
    const cards = document.querySelectorAll('.skill-card, .project-card, .review-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

});

// Console Info
console.log('%cPortfolio Website Loaded', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%c/ᐠ｡ꞈ｡ᐟ\\', 'color: #888; font-size: 12px;');
console.log('%cwith ❤️', 'color: #888; font-size: 12px;');

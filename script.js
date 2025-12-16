// ===========================
// CONFIGURATION
// ===========================
const CONFIG = {
    scrollThreshold: 300,
    navScrollClass: 'scrolled',
    animationDelay: 100
};

// ===========================
// NAVIGATION MOBILE
// ===========================
class MobileNav {
    constructor() {
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        if (!this.menuToggle || !this.navMenu) return;
        
        // Toggle menu
        this.menuToggle.addEventListener('click', () => this.toggleMenu());
        
        // Fermer le menu lors du clic sur un lien
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Fermer le menu lors du clic en dehors
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        const isActive = this.menuToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        this.menuToggle.setAttribute('aria-expanded', isActive);
    }
    
    closeMenu() {
        this.menuToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.menuToggle.setAttribute('aria-expanded', 'false');
    }
}

// ===========================
// HEADER SCROLL EFFECT
// ===========================
class HeaderScroll {
    constructor() {
        this.header = document.getElementById('header');
        this.lastScroll = 0;
        
        this.init();
    }
    
    init() {
        if (!this.header) return;
        
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }
    
    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            this.header.classList.add(CONFIG.navScrollClass);
        } else {
            this.header.classList.remove(CONFIG.navScrollClass);
        }
        
        this.lastScroll = currentScroll;
    }
}

// ===========================
// SCROLL TO TOP BUTTON
// ===========================
class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scrollToTop');
        
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        // Afficher/masquer le bouton
        window.addEventListener('scroll', () => this.toggleButton(), { passive: true });
        
        // Action du bouton
        this.button.addEventListener('click', () => this.scrollToTop());
    }
    
    toggleButton() {
        if (window.pageYOffset > CONFIG.scrollThreshold) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }
    
    handleClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        // Ignorer les liens vides
        if (href === '#' || !href) return;
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// ===========================
// INTERSECTION OBSERVER - ANIMATIONS
// ===========================
class AnimateOnScroll {
    constructor() {
        this.elements = document.querySelectorAll('.project-card, .skill-card, .about-content, .hero-content');
        
        this.init();
    }
    
    init() {
        if (!('IntersectionObserver' in window)) {
            // Fallback pour les navigateurs anciens
            this.elements.forEach(el => el.style.opacity = '1');
            return;
        }
        
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, options);
        
        this.elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// ===========================
// FORMULAIRE DE CONTACT
// ===========================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validation basique
        if (!this.validateForm(data)) {
            this.showMessage('Veuillez remplir tous les champs correctement.', 'error');
            return;
        }
        
        // Simuler l'envoi (à remplacer par votre logique d'envoi réelle)
        try {
            await this.sendForm(data);
            this.showMessage('Message envoyé avec succès ! Nous vous répondrons bientôt.', 'success');
            this.form.reset();
        } catch (error) {
            this.showMessage('Une erreur est survenue. Veuillez réessayer.', 'error');
        }
    }
    
    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return data.name && 
               data.email && 
               emailRegex.test(data.email) && 
               data.subject && 
               data.message;
    }
    
    async sendForm(data) {
        // Simuler un délai d'envoi
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Données du formulaire:', data);
                resolve();
            }, 1000);
        });
    }
    
    showMessage(message, type) {
        // Créer un élément de notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Supprimer après 5 secondes
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// ===========================
// PERFORMANCE MONITORING
// ===========================
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => this.logPerformance(), 0);
            });
        }
    }
    
    logPerformance() {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        console.group('📊 Performance Metrics');
        console.log(`⏱️ Page Load Time: ${pageLoadTime}ms`);
        console.log(`🔌 Connection Time: ${connectTime}ms`);
        console.log(`🎨 Render Time: ${renderTime}ms`);
        console.groupEnd();
        
        // Web Vitals (si disponible)
        this.logWebVitals();
    }
    
    logWebVitals() {
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint (LCP)
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log(`🖼️ LCP: ${lastEntry.renderTime || lastEntry.loadTime}ms`);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                // Silencieusement ignorer si non supporté
            }
            
            // First Input Delay (FID)
            try {
                const fidObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        console.log(`⚡ FID: ${entry.processingStart - entry.startTime}ms`);
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                // Silencieusement ignorer si non supporté
            }
        }
    }
}

// ===========================
// LAZY LOADING IMAGES
// ===========================
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        
        this.init();
    }
    
    init() {
        // Les navigateurs modernes supportent le lazy loading natif
        // Ce code est un fallback pour les navigateurs plus anciens
        if ('loading' in HTMLImageElement.prototype) {
            return; // Le navigateur gère le lazy loading
        }
        
        // Fallback avec IntersectionObserver
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            this.images.forEach(img => imageObserver.observe(img));
        }
    }
}

// ===========================
// ACTIVE NAV LINK
// ===========================
class ActiveNavLink {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        if (!this.sections.length || !this.navLinks.length) return;
        
        window.addEventListener('scroll', () => this.updateActiveLink(), { passive: true });
        this.updateActiveLink(); // Initialiser
    }
    
    updateActiveLink() {
        const scrollPosition = window.pageYOffset + 100;
        
        let currentSection = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// ===========================
// THEME TOGGLE (Dark Mode)
// ===========================
class ThemeToggle {
    constructor() {
        this.init();
    }
    
    init() {
        // Vérifier la préférence système
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
        }
        
        // Écouter les changements de préférence
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        });
    }
}

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initialisation de l\'application...');
    
    // Initialiser tous les modules
    new MobileNav();
    new HeaderScroll();
    new ScrollToTop();
    new SmoothScroll();
    new AnimateOnScroll();
    new ContactForm();
    new PerformanceMonitor();
    new LazyLoader();
    new ActiveNavLink();
    new ThemeToggle();
    
    console.log('✅ Application initialisée avec succès !');
});

// ===========================
// SERVICE WORKER (PWA - Optionnel)
// ===========================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Décommenter pour activer le Service Worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// ===========================
// UTILITIES
// ===========================

// Debounce function pour optimiser les événements
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Exporter pour utilisation externe si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { debounce, throttle };
}

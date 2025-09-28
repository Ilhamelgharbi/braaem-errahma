// Language Toggle Functionality
let currentLang = 'fr';

function toggleLanguage() {
    const newLang = currentLang === 'fr' ? 'ar' : 'fr';
    switchLanguage(newLang);
}

function switchLanguage(lang) {
    currentLang = lang;
    const elements = document.querySelectorAll('.lang-content');
    const toggleBtn = document.querySelector('.lang-toggle');
    const body = document.body;

    elements.forEach(element => {
        const content = element.getAttribute(`data-${lang}`);
        if (content) {
            element.textContent = content;
        }
    });

    // Update toggle button
    toggleBtn.textContent = lang === 'fr' ? 'العربية' : 'Français';

    // Update body class for RTL/LTR
    if (lang === 'ar') {
        body.classList.add('lang-ar');
        document.documentElement.setAttribute('lang', 'ar');
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        body.classList.remove('lang-ar');
        document.documentElement.setAttribute('lang', 'fr');
        document.documentElement.setAttribute('dir', 'ltr');
    }

    // Save preference
    localStorage.setItem('preferred-language', lang);
}

// Load saved language preference
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferred-language') || 'fr';
    if (savedLang !== 'fr') {
        switchLanguage(savedLang);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe service cards and other elements
    const elementsToAnimate = document.querySelectorAll('.service-card, .stat-item, .about-text, .contact-info');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// Mobile menu functionality (if needed)
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Form validation and WhatsApp integration
function openWhatsApp(message = '') {
    const phoneNumber = '+212XXXXXXXXX'; // Replace with actual WhatsApp number
    const defaultMessage = currentLang === 'ar' ? 
        'مرحبا، أود الحصول على معلومات حول دروس التقوية' : 
        'Bonjour, je souhaite des informations sur vos cours de soutien';
    
    const finalMessage = message || defaultMessage;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
    window.open(whatsappURL, '_blank');
}

// Enhanced CTA tracking
document.querySelectorAll('.btn, .whatsapp-btn, .floating-whatsapp').forEach(button => {
    button.addEventListener('click', function(e) {
        // Track button clicks (you can integrate with Google Analytics here)
        console.log('CTA clicked:', this.textContent.trim());
    });
});

// Lazy loading for better performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
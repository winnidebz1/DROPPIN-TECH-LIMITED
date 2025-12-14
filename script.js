// DropPin Ghana - Main JavaScript

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Simple AOS (Animate On Scroll) Implementation
function initAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        // Add delay if specified
        const delay = el.getAttribute('data-aos-delay');
        if (delay) {
            el.style.transitionDelay = `${delay}ms`;
        }
        observer.observe(el);
    });
}

// Initialize AOS on page load
document.addEventListener('DOMContentLoaded', initAOS);

// Active Navigation Link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form Validation and Submission
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitBtn.textContent = 'Sent! ✓';
            submitBtn.style.background = 'var(--signal-green)';

            // Reset form
            form.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    });
});

// Phone Mockup Parallax Effect
const phoneMockups = document.querySelectorAll('.phone-mockup');
if (phoneMockups.length > 0) {
    // Parallax effect disabled for cleaner UX
    /*
    window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    phoneMockups.forEach((phone, index) => {
        const speed = (index + 1) * 5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
    
        phone.style.transform += ` translate(${x}px, ${y}px)`;
        });
        });
        */
}

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(start);
        }
    }, 16);
}

// Initialize counters when they come into view
const counters = document.querySelectorAll('[data-counter]');
if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-counter'));
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// Image Lazy Loading
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Vehicle Filter (for Car Rentals page)
function filterVehicles(category) {
    const vehicles = document.querySelectorAll('.vehicle-card');
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    vehicles.forEach(vehicle => {
        if (category === 'all' || vehicle.dataset.category === category) {
            vehicle.style.display = 'block';
            setTimeout(() => {
                vehicle.style.opacity = '1';
                vehicle.style.transform = 'scale(1)';
            }, 10);
        } else {
            vehicle.style.opacity = '0';
            vehicle.style.transform = 'scale(0.8)';
            setTimeout(() => {
                vehicle.style.display = 'none';
            }, 300);
        }
    });
}

// Make filterVehicles available globally
window.filterVehicles = filterVehicles;

// Price Calculator (for Car Rentals)
function calculatePrice() {
    const vehicleType = document.getElementById('vehicleType')?.value;
    const rentalDays = document.getElementById('rentalDays')?.value;
    const priceDisplay = document.getElementById('priceDisplay');

    if (!vehicleType || !rentalDays || !priceDisplay) return;

    const prices = {
        'economy': 150,
        'standard': 250,
        'premium': 400,
        'suv': 500
    };

    const basePrice = prices[vehicleType] || 0;
    const totalPrice = basePrice * parseInt(rentalDays);

    priceDisplay.textContent = `GH₵ ${totalPrice.toLocaleString()}`;
    priceDisplay.style.color = 'var(--signal-green)';
}

// Make calculatePrice available globally
window.calculatePrice = calculatePrice;

// Initialize tooltips
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;

        element._tooltip = tooltip;
    });

    element.addEventListener('mouseleave', () => {
        if (element._tooltip) {
            element._tooltip.remove();
            delete element._tooltip;
        }
    });
});

// Performance: Preload critical images
function preloadImages() {
    const criticalImages = [
        'images/hero-bg.jpg',
        'images/app-screen-1.jpg',
        'images/app-screen-2.jpg',
        'images/app-screen-3.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// Set phone mockup backgrounds
const phoneMockup1 = document.getElementById('phoneMockup1');
const phoneMockup2 = document.getElementById('phoneMockup2');
const phoneMockup3 = document.getElementById('phoneMockup3');

if (phoneMockup1) phoneMockup1.style.backgroundImage = 'url(images/app-screen-1.jpg)';
if (phoneMockup2) phoneMockup2.style.backgroundImage = 'url(images/app-screen-2.jpg)';
if (phoneMockup3) phoneMockup3.style.backgroundImage = 'url(images/app-screen-3.jpg)';

console.log('🚕 DropPin Ghana - Ready to Move!');

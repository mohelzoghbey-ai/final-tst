// ===================================
// TST Landing Page - JavaScript
// ===================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('mainNav');
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

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== 3D CAROUSEL =====
class Carousel3D {
    constructor(element) {
        this.carousel = element;
        this.items = this.carousel.querySelectorAll('.carousel-item-3d');
        this.totalItems = this.items.length;
        this.currentIndex = 0;
        this.theta = 360 / this.totalItems;
        this.radius = 400;
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.items.forEach((item, index) => {
            const angle = this.theta * index;
            item.style.transform = `rotateY(${angle}deg) translateZ(${this.radius}px)`;
        });

        // Auto rotate
        this.autoRotate();
    }

    rotate(direction) {
        if (this.isAnimating) return;

        this.isAnimating = true;

        if (direction === 'next') {
            this.currentIndex++;
        } else {
            this.currentIndex--;
        }

        const angle = this.theta * this.currentIndex * -1;
        this.carousel.style.transform = `rotateY(${angle}deg)`;

        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
    }

    autoRotate() {
        setInterval(() => {
            this.rotate('next');
        }, 3000);
    }
}

// Initialize 3D Carousel
const carousel3d = document.getElementById('carousel3d');
if (carousel3d) {
    const carouselInstance = new Carousel3D(carousel3d);

    // Carousel controls
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            carouselInstance.rotate('prev');
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            carouselInstance.rotate('next');
        });
    }
}

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);

        // Show success message (you can replace this with actual form submission)
        showNotification('Thank you for your message! We will get back to you soon.', 'success');

        // Reset form
        contactForm.reset();
    });
}

// ===== NEWSLETTER FORM =====
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Successfully subscribed to our newsletter!', 'success');
        form.reset();
    });
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #457B9D, #1D3557)' : 'linear-gradient(135deg, #E63946, #457B9D)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.5s ease-out;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }
    
    .notification-content i {
        font-size: 1.5rem;
    }
`;
document.head.appendChild(style);

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-robot');

    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== GLOWING ICONS INTERACTION =====
const glowingIcons = document.querySelectorAll('.glowing-icon');
glowingIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1)';
    });

    icon.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// ===== LEARNING CARDS TILT EFFECT =====
const learningCards = document.querySelectorAll('.learning-card');
learningCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== CURSOR TRAIL EFFECT =====
// const createCursorTrail = () => {
//     const trail = document.createElement('div');
//     trail.className = 'cursor-trail';
//     trail.style.cssText = `
//         position: fixed;
//         width: 10px;
//         height: 10px;
//         background: radial-gradient(circle, rgba(230, 57, 70, 0.8), transparent);
//         border-radius: 50%;
//         pointer-events: none;
//         z-index: 9999;
//         transition: transform 0.1s ease-out;
//     `;
//     document.body.appendChild(trail);

//     return trail;
// };

const trails = [];
for (let i = 0; i < 5; i++) {
    trails.push(createCursorTrail());
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const animateTrails = () => {
    let x = mouseX;
    let y = mouseY;

    trails.forEach((trail, index) => {
        const nextTrail = trails[index + 1] || trails[0];

        trail.style.left = x + 'px';
        trail.style.top = y + 'px';

        const rect = trail.getBoundingClientRect();
        x = rect.left;
        y = rect.top;
    });

    requestAnimationFrame(animateTrails);
};

animateTrails();

// ===== COUNTER ANIMATION FOR TEAM MEMBERS =====
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
};

// Observe team section for counter animation
const teamSection = document.getElementById('team');
if (teamSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterElement = document.querySelector('.team-count .gradient-text');
                if (counterElement && !counterElement.classList.contains('animated')) {
                    counterElement.classList.add('animated');
                    animateCounter(counterElement, 35);
                }
            }
        });
    }, { threshold: 0.5 });

    observer.observe(teamSection);
}

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== CONSOLE MESSAGE =====
console.log('%c TST - Technology Society Team ', 'background: linear-gradient(135deg, #E63946, #457B9D); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Shaping the Future of Technology 🚀 ', 'color: #457B9D; font-size: 14px; font-weight: bold;');
console.log('%c Interested in joining our team? Contact us! ', 'color: #E63946; font-size: 12px;');

// ===== PREVENT CONTEXT MENU ON IMAGES (OPTIONAL) =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    }

    // Arrow keys for carousel navigation
    if (carousel3d) {
        if (e.key === 'ArrowLeft') {
            document.getElementById('prevBtn').click();
        } else if (e.key === 'ArrowRight') {
            document.getElementById('nextBtn').click();
        }
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== SCROLL TO TOP BUTTON =====
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #E63946, #457B9D);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s ease;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(230, 57, 70, 0.3);
    `;

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 8px 30px rgba(230, 57, 70, 0.5)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 5px 20px rgba(230, 57, 70, 0.3)';
    });
};

createScrollToTopButton();

// ===== EASTER EGG: KONAMI CODE =====
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        showNotification('🎉 You found the secret! Welcome to TST!', 'success');
        document.body.style.animation = 'rainbow 2s linear infinite';
    }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

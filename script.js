// Configuration EmailJS
(function() {
    // Remplacez par votre Public Key EmailJS
    emailjs.init("GxjGRnIYOX29X0_Ra");
})();

// Theme functionality
function toggleTheme() {
    const html = document.documentElement;
    const theme = html.classList.contains('dark') ? 'light' : 'dark';
    html.classList.toggle('dark');
    localStorage.setItem('theme', theme);
}

// Apply saved theme
function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

// Mobile menu functionality
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const burger = document.querySelector('.burger');
    menu.classList.toggle('translate-x-full');
    burger.classList.toggle('active');
    
    // Animate burger lines
    const lines = burger.querySelectorAll('div');
    lines[0].classList.toggle('rotate-45');
    lines[0].classList.toggle('translate-y-2');
    lines[1].classList.toggle('opacity-0');
    lines[2].classList.toggle('-rotate-45');
    lines[2].classList.toggle('-translate-y-2');
}

// Custom cursor
function initCursor() {
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, button, .skill-bar, .project-card, .stat-item, .theme-toggle');
    hoverElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursor.classList.add('cursor-grow');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-grow');
        });
    });
}

// Smooth scrolling
function initSmoothScroll() {
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
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            count += increment;
            counter.textContent = Math.floor(count);
            
            if (count >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    });
}

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'about') {
                    animateCounters();
                }
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { threshold: 0.1 });

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });
}

// EmailJS Form submission
function initEmailJSForm() {
    const form = document.getElementById('contact-form');
    const statusElement = document.getElementById('form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Désactiver le bouton et montrer le loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        statusElement.textContent = '';
        statusElement.className = 'mt-4 text-center';

        try {
            // Envoyer l'email via EmailJS
            const response = await emailjs.sendForm(
                'eddy_006',     // Remplacez par votre Service ID
                'template_rxcamkk',    // Remplacez par votre Template ID
                form
            );

            // Succès
            statusElement.textContent = 'Message sent successfully! ✅';
            statusElement.classList.add('text-green-600');
            form.reset();
            
            // Cacher le message après 5 secondes
            setTimeout(() => {
                statusElement.textContent = '';
            }, 5000);

        } catch (error) {
            // Erreur
            console.error('EmailJS Error:', error);
            statusElement.textContent = 'Failed to send message. Please try again. ❌';
            statusElement.classList.add('text-red-600');
        } finally {
            // Réactiver le bouton
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    initCursor();
    initSmoothScroll();
    initIntersectionObserver();
    initHeaderScroll();
    initEmailJSForm();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('mobileMenu');
        const burger = document.querySelector('.burger');
        if (!menu.contains(e.target) && !burger.contains(e.target) && !menu.classList.contains('translate-x-full')) {
            toggleMenu();
        }
    });
});

// Close mobile menu when resizing to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        const menu = document.getElementById('mobileMenu');
        const burger = document.querySelector('.burger');
        if (!menu.classList.contains('translate-x-full')) {
            menu.classList.add('translate-x-full');
            burger.classList.remove('active');
        }
    }
});

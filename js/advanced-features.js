// ZERO GRAUS - Advanced Features - Ultra Modern

// ============================================
// 1. DARK/LIGHT THEME TOGGLE
// ============================================
const themeManager = {
    init() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
        
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });
    },
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
        }
        
        // Animate theme change
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }
};

// ============================================
// 2. SCROLL PROGRESS BAR
// ============================================
const scrollProgress = {
    init() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scrollProgress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), #00cc66);
            width: 0%;
            z-index: 9999;
            transition: width 0.1s ease;
            box-shadow: 0 2px 10px rgba(10, 132, 255, 0.5);
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
};

// ============================================
// 3. BACK TO TOP BUTTON
// ============================================
const backToTop = {
    init() {
        const button = document.createElement('button');
        button.id = 'backToTop';
        button.innerHTML = '<i class="ri-arrow-up-line"></i>';
        button.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 24px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: linear-gradient(135deg, var(--primary), #0066cc);
            color: #fff;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transform: scale(0);
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            z-index: 1000;
            box-shadow: 0 8px 24px rgba(10, 132, 255, 0.4);
        `;
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1) rotate(360deg)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1) rotate(0deg)';
        });
        
        document.body.appendChild(button);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
                button.style.transform = 'scale(1)';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
                button.style.transform = 'scale(0)';
            }
        });
    }
};

// ============================================
// 4. ADVANCED TOAST NOTIFICATIONS
// ============================================
const toast = {
    container: null,
    
    init() {
        this.container = document.createElement('div');
        this.container.id = 'toastContainer';
        this.container.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-width: 400px;
        `;
        document.body.appendChild(this.container);
    },
    
    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: 'ri-check-line',
            error: 'ri-error-warning-line',
            warning: 'ri-alert-line',
            info: 'ri-information-line'
        };
        
        const colors = {
            success: '#00cc66',
            error: '#ff4444',
            warning: '#ffaa00',
            info: 'var(--primary)'
        };
        
        toast.innerHTML = `
            <i class="${icons[type]}"></i>
            <span>${message}</span>
            <button class="toast-close"><i class="ri-close-line"></i></button>
        `;
        
        toast.style.cssText = `
            background: ${colors[type]};
            color: #fff;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 600;
            font-size: 14px;
            animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            position: relative;
            overflow: hidden;
        `;
        
        // Progress bar
        const progress = document.createElement('div');
        progress.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: rgba(255, 255, 255, 0.5);
            width: 100%;
            animation: progressBar ${duration}ms linear;
        `;
        toast.appendChild(progress);
        
        // Close button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.style.cssText = `
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: #fff;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        `;
        
        closeBtn.addEventListener('click', () => this.remove(toast));
        
        this.container.appendChild(toast);
        
        setTimeout(() => this.remove(toast), duration);
    },
    
    remove(toast) {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }
};

// ============================================
// 5. LOADING OVERLAY
// ============================================
const loadingOverlay = {
    overlay: null,
    
    init() {
        this.overlay = document.createElement('div');
        this.overlay.id = 'loadingOverlay';
        this.overlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <img src="./public/zero-graus-logo-modern-minimalist-clothing-brand.jpg" alt="Logo" class="spinner-logo">
            </div>
            <p class="loading-text">Carregando...</p>
        `;
        
        this.overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: var(--bg);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 24px;
            z-index: 99999;
            opacity: 1;
            transition: opacity 0.5s ease;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .loading-spinner {
                position: relative;
                width: 120px;
                height: 120px;
            }
            
            .spinner-ring {
                position: absolute;
                inset: 0;
                border: 3px solid transparent;
                border-top-color: var(--primary);
                border-radius: 50%;
                animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
            }
            
            .spinner-ring:nth-child(2) {
                border-top-color: #00cc66;
                animation-delay: 0.3s;
            }
            
            .spinner-ring:nth-child(3) {
                border-top-color: #ffaa00;
                animation-delay: 0.6s;
            }
            
            .spinner-logo {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 60px;
                height: 60px;
                border-radius: 50%;
                object-fit: cover;
            }
            
            .loading-text {
                font-size: 18px;
                font-weight: 600;
                color: var(--text);
                animation: pulse 1.5s ease-in-out infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(this.overlay);
    },
    
    hide() {
        setTimeout(() => {
            this.overlay.style.opacity = '0';
            setTimeout(() => {
                this.overlay.remove();
            }, 500);
        }, 1000);
    }
};

// ============================================
// 6. SMOOTH REVEAL ANIMATIONS
// ============================================
const revealAnimations = {
    init() {
        const style = document.createElement('style');
        style.textContent = `
            .reveal {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .reveal.active {
                opacity: 1;
                transform: translateY(0);
            }
            
            .reveal-left {
                opacity: 0;
                transform: translateX(-50px);
                transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .reveal-left.active {
                opacity: 1;
                transform: translateX(0);
            }
            
            .reveal-right {
                opacity: 0;
                transform: translateX(50px);
                transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .reveal-right.active {
                opacity: 1;
                transform: translateX(0);
            }
            
            .reveal-scale {
                opacity: 0;
                transform: scale(0.8);
                transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .reveal-scale.active {
                opacity: 1;
                transform: scale(1);
            }
        `;
        document.head.appendChild(style);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            observer.observe(el);
        });
    }
};

// ============================================
// 7. CURSOR EFFECTS (Desktop only)
// ============================================
const cursorEffects = {
    init() {
        if (window.innerWidth < 1024) return; // Only on desktop
        
        const cursor = document.createElement('div');
        cursor.id = 'customCursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--primary);
            pointer-events: none;
            z-index: 99999;
            opacity: 0.5;
            transition: transform 0.2s ease, opacity 0.2s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.8)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });
        
        // Hover effects on interactive elements
        document.querySelectorAll('a, button, .product-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.opacity = '0.8';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.opacity = '0.5';
            });
        });
    }
};

// ============================================
// 8. PARALLAX EFFECTS
// ============================================
const parallaxEffects = {
    init() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(el => {
                const speed = el.dataset.parallax || 0.5;
                const yPos = -(window.scrollY * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
};

// ============================================
// 9. TYPING EFFECT
// ============================================
const typingEffect = {
    init(element, texts, speed = 100) {
        if (!element) return;
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = speed;
            
            if (isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        };
        
        type();
    }
};

// ============================================
// 10. KEYBOARD SHORTCUTS
// ============================================
const keyboardShortcuts = {
    init() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K: Focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('searchInput')?.focus();
                toast.show('Pesquisa ativada', 'info', 2000);
            }
            
            // Ctrl/Cmd + B: Toggle theme
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                document.getElementById('themeToggle')?.click();
            }
            
            // Escape: Close modals/sidebars
            if (e.key === 'Escape') {
                document.getElementById('cartClose')?.click();
                document.getElementById('chatClose')?.click();
            }
        });
    }
};

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Show loading overlay
    loadingOverlay.init();
    
    // Initialize all features
    themeManager.init();
    scrollProgress.init();
    backToTop.init();
    toast.init();
    revealAnimations.init();
    cursorEffects.init();
    parallaxEffects.init();
    keyboardShortcuts.init();
    
    // Hide loading overlay after page loads
    window.addEventListener('load', () => {
        loadingOverlay.hide();
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @keyframes progressBar {
            from {
                width: 100%;
            }
            to {
                width: 0%;
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
        }
        
        /* Light Theme Variables */
        [data-theme="light"] {
            --bg: #ffffff;
            --bg-soft: #f5f7fa;
            --text: #1a1d29;
            --muted: #6b7280;
            --primary: #0a84ff;
            --primary-600: #0066cc;
            --card: #ffffff;
            --border: #e5e7eb;
        }
        
        /* Smooth transitions for theme change */
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    console.log('✨ ZERO GRAUS - Advanced Features loaded');
});

// Export for use in other scripts
window.ZeroGraus = {
    toast,
    themeManager,
    typingEffect
};

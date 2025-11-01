// ZERO GRAUS - Contato - JavaScript

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
    setupCharCounter();
    animateContactCards();
});

// Form Validation
function setupFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    form.addEventListener('submit', handleSubmit);
}

function validateField(field) {
    const errorSpan = document.getElementById(field.id + 'Error');
    if (!errorSpan) return true;
    
    field.classList.remove('error', 'success');
    errorSpan.textContent = '';
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        field.classList.add('error');
        errorSpan.textContent = 'Este campo é obrigatório';
        return false;
    }
    
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            field.classList.add('error');
            errorSpan.textContent = 'Email inválido';
            return false;
        }
    }
    
    if (field.hasAttribute('pattern') && field.value) {
        const pattern = new RegExp(field.getAttribute('pattern'));
        if (!pattern.test(field.value)) {
            field.classList.add('error');
            errorSpan.textContent = 'Formato inválido';
            return false;
        }
    }
    
    if (field.hasAttribute('minlength') && field.value.length < field.getAttribute('minlength')) {
        field.classList.add('error');
        errorSpan.textContent = `Mínimo ${field.getAttribute('minlength')} caracteres`;
        return false;
    }
    
    if (field.value.trim()) {
        field.classList.add('success');
    }
    return true;
}

// Character Counter
function setupCharCounter() {
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (messageField && charCount) {
        messageField.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 500) {
                this.value = this.value.substring(0, 500);
                charCount.textContent = 500;
            }
            
            // Change color based on length
            if (count > 450) {
                charCount.style.color = '#ff4444';
            } else if (count > 400) {
                charCount.style.color = '#ffaa00';
            } else {
                charCount.style.color = 'var(--muted)';
            }
        });
    }
}

// Form Submission
function handleSubmit(e) {
    e.preventDefault();
    
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Validate all fields
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Por favor, corrija os erros no formulário', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-flex';
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value || 'Não informado',
        subject: document.getElementById('subject').selectedOptions[0].text,
        message: document.getElementById('message').value
    };
    
    // Build WhatsApp message
    let whatsappMessage = `*📧 NOVA MENSAGEM DE CONTATO*\n\n`;
    whatsappMessage += `*👤 Nome:* ${formData.name}\n`;
    whatsappMessage += `*📧 Email:* ${formData.email}\n`;
    whatsappMessage += `*📱 Telefone:* ${formData.phone}\n`;
    whatsappMessage += `*📋 Assunto:* ${formData.subject}\n\n`;
    whatsappMessage += `*💬 Mensagem:*\n${formData.message}\n\n`;
    whatsappMessage += `_Enviado via formulário de contato ZERO GRAUS_`;
    
    const whatsappURL = `https://wa.me/258848304000?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Simulate sending
    setTimeout(() => {
        submitBtn.disabled = false;
        btnText.style.display = 'inline-flex';
        btnLoader.style.display = 'none';
        
        // Show success animation
        form.style.display = 'none';
        document.getElementById('successAnimation').classList.add('show');
        
        // Open WhatsApp
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
        }, 500);
        
        showNotification('Mensagem enviada com sucesso!', 'success');
    }, 1500);
}

// Reset Form
function resetContactForm() {
    const form = document.getElementById('contactForm');
    const successAnimation = document.getElementById('successAnimation');
    
    form.reset();
    form.style.display = 'block';
    successAnimation.classList.remove('show');
    
    // Clear validation states
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.classList.remove('error', 'success');
    });
    
    document.getElementById('charCount').textContent = '0';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// FAQ Toggle
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Animate Contact Cards on Scroll
function animateContactCards() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.contact-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="ri-${type === 'success' ? 'check' : type === 'error' ? 'error-warning' : 'information'}-line"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: ${type === 'success' ? '#00cc66' : type === 'error' ? '#ff4444' : 'var(--primary)'};
        color: #fff;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

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
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

console.log('✅ ZERO GRAUS - Contato JS loaded');

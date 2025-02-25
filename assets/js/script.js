document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && !e.target.closest('.main-nav')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
                
                // Scroll to target with offset for fixed header
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = this.querySelector('#name');
            const emailField = this.querySelector('#email');
            const messageField = this.querySelector('#message');
            
            // Basic validation
            let isValid = true;
            
            if (!nameField.value.trim()) {
                showError(nameField, 'Name is required');
                isValid = false;
            } else {
                removeError(nameField);
            }
            
            if (!emailField.value.trim()) {
                showError(emailField, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailField.value.trim())) {
                showError(emailField, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailField);
            }
            
            if (!messageField.value.trim()) {
                showError(messageField, 'Message is required');
                isValid = false;
            } else {
                removeError(messageField);
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            }
        });
    }
    
    // Helper functions for form validation
    function showError(field, message) {
        // Remove existing error message if any
        removeError(field);
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#f42a41';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = message;
        
        // Add red border to field
        field.style.borderColor = '#f42a41';
        
        // Insert error message after the field
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    function removeError(field) {
        // Reset field border
        field.style.borderColor = '';
        
        // Remove error message if exists
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function isValidEmail(email) {
        // Basic email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.issue-card, .stat-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const cards = document.querySelectorAll('.issue-card, .stat-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});

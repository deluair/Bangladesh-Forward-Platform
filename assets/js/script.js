document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Testimonial slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    if (testimonialTrack && testimonials.length > 0) {
        let currentIndex = 0;
        const testimonialCount = testimonials.length;
        
        testimonialTrack.style.width = `${testimonialCount * 100}%`;
        
        function updateSlider() {
            testimonialTrack.style.transform = `translateX(-${currentIndex * (100 / testimonialCount)}%)`;
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                currentIndex = (currentIndex === 0) ? testimonialCount - 1 : currentIndex - 1;
                updateSlider();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                currentIndex = (currentIndex === testimonialCount - 1) ? 0 : currentIndex + 1;
                updateSlider();
            });
        }
        
        // Auto-advance testimonials
        setInterval(function() {
            currentIndex = (currentIndex === testimonialCount - 1) ? 0 : currentIndex + 1;
            updateSlider();
        }, 8000);
    }
    
    // Modals
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside content
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Escape key closes modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        }
    });
    
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate-fade-in');
            }
        });
    }
    
    // Run on initial load
    checkInView();
    
    // Run on scroll
    window.addEventListener('scroll', checkInView);
    
    // Validate form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Simple validation
            if (!nameInput.value.trim()) {
                isValid = false;
                showError(nameInput, 'Please enter your name');
            } else {
                clearError(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                isValid = false;
                showError(emailInput, 'Please enter your email');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email address');
            } else {
                clearError(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                isValid = false;
                showError(messageInput, 'Please enter your message');
            } else {
                clearError(messageInput);
            }
            
            if (isValid) {
                // In a real implementation, you would send the form data to a server
                contactForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                
                contactForm.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    function showError(input, message) {
        // Clear any existing error
        clearError(input);
        
        const formGroup = input.closest('.form-group');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = 'var(--secondary-color)';
        errorMessage.style.fontSize = '0.8rem';
        errorMessage.style.marginTop = '0.3rem';
        
        formGroup.appendChild(errorMessage);
        input.style.borderColor = 'var(--secondary-color)';
    }
    
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }
        
        input.style.borderColor = '';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Progress bars animation
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 500);
    });
});

/**
 * Oubaitori Japanese Language School - Main JS script
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initScrollAnimations();
  initTestimonialSlider();
  initFaqAccordion();
  initContactForm();
  initSmoothScroll();
});

/* --- STICKY HEADER --- */
function initStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run on load in case page is already scrolled
  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

/* --- MOBILE NAVIGATION --- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    toggleBtn.classList.add('open');
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('open');
    drawer.classList.remove('open');
    backdrop.classList.add('removing'); // animation hook
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener('click', closeDrawer);

  // Close when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* --- SCROLL REVEAL ANIMATIONS --- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.section-header, .hero-content, .hero-visual, .about-visual, .about-content, .why-card, .course-card, .study-japan-content, .study-japan-visual, .job-card, .culture-card, .career-content, .career-visual, .testimonials-carousel-wrapper, .faq-wrapper, .contact-info-panel, .contact-form-panel'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Triggers when 15% of the element is visible
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target); // Animates only once
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    animationObserver.observe(el);
  });
}

/* --- TESTIMONIAL SLIDER --- */
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonials-slider');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const dotsContainer = document.querySelector('.slider-dots');

  if (!slider || slides.length === 0) return;

  let currentIndex = 0;
  let autoPlayTimer = null;
  const slideCount = slides.length;
  const autoPlayInterval = 5000; // 5 seconds

  // Generate dots
  dotsContainer.innerHTML = '';
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoPlay();
    });
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll('.slider-dot');

  const updateSliderPosition = () => {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  const goToSlide = (index) => {
    currentIndex = index;
    updateSliderPosition();
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSliderPosition();
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSliderPosition();
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  // AutoPlay
  const startAutoPlay = () => {
    autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  };

  const resetAutoPlay = () => {
    stopAutoPlay();
    startAutoPlay();
  };

  // Pause on hover
  const carouselWrapper = document.querySelector('.testimonials-carousel-wrapper');
  if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
    carouselWrapper.addEventListener('mouseleave', startAutoPlay);
  }

  startAutoPlay();
}

/* --- FAQ ACCORDION --- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items first
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          otherContent.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* --- CONTACT FORM VALIDATION --- */
function initContactForm() {
  const form = document.getElementById('consultationForm');
  const successFeedback = document.querySelector('.form-success-feedback');

  if (!form) return;

  const validateInput = (input) => {
    const group = input.closest('.form-group');
    const value = input.value.trim();
    let isValid = true;

    if (input.required && value === '') {
      isValid = false;
    } else if (input.type === 'email' && value !== '') {
      // Basic email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    } else if (input.id === 'phone' && value !== '') {
      // Bangladeshi Phone Regex: supports digits, spaces, dashes
      // Standard: 11 digits starting with 01 (e.g. 01357226445, 01357-226445, 013 5722 6445)
      // Standard digit-only extraction length check
      const digitsOnly = value.replace(/\D/g, '');
      isValid = digitsOnly.length === 11 && digitsOnly.startsWith('01');
    }

    if (!isValid) {
      group.classList.add('has-error');
    } else {
      group.classList.remove('has-error');
    }

    return isValid;
  };

  // Live validation on blur
  const inputs = form.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateInput(input);
    });
    // Remove error class on typing
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      group.classList.remove('has-error');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    inputs.forEach(input => {
      const isValid = validateInput(input);
      if (!isValid) isFormValid = false;
    });

    if (isFormValid) {
      // Submit via AJAX to PHP endpoint
      fetch('contact.php', {
        method: 'POST',
        body: new FormData(form)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            if (successFeedback) {
              successFeedback.textContent = data.message || 'Thank you! Your message has been sent.';
              successFeedback.style.display = 'block';
              form.reset();
              successFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
              setTimeout(() => {
                successFeedback.style.display = 'none';
              }, 5000);
            }
          } else {
            // Show server-side validation errors if any
            alert(data.message || 'There was an error submitting the form. Please try again later.');
          }
        })
        .catch(() => {
          alert('Failed to submit the form. Please check your internet connection and try again.');
        });
    }
  });
}

/* --- SMOOTH SCROLL OFFSET --- */
function initSmoothScroll() {
  const header = document.querySelector('.main-header');
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const headerHeight = header ? header.offsetHeight : 80;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = targetPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}

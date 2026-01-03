/**
 * GF PriceChecker - Carousel Component
 * Horizontal scrolling carousel with touch, mouse, and keyboard support
 */

(function() {
  'use strict';

  class Carousel {
    constructor(element) {
      this.carousel = element;
      this.viewport = element.querySelector('.carousel-viewport');
      this.track = element.querySelector('.carousel-track');
      this.slides = Array.from(element.querySelectorAll('.carousel-slide'));
      this.prevButton = element.querySelector('[data-carousel-prev]');
      this.nextButton = element.querySelector('[data-carousel-next]');
      this.progressDots = element.querySelectorAll('.carousel-progress-dot');

      this.currentIndex = 0;
      this.isDragging = false;
      this.startX = 0;
      this.scrollLeft = 0;

      if (this.slides.length === 0) return;

      this.init();
    }

    init() {
      this.setupEventListeners();
      this.updateControls();
      this.lazyLoadImages();
    }

    setupEventListeners() {
      // Navigation buttons
      if (this.prevButton) {
        this.prevButton.addEventListener('click', () => this.prev());
      }
      if (this.nextButton) {
        this.nextButton.addEventListener('click', () => this.next());
      }

      // Progress dots
      this.progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goToSlide(index));
        dot.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.goToSlide(index);
          }
        });
      });

      // Mouse drag
      this.viewport.addEventListener('mousedown', (e) => this.handleDragStart(e));
      this.viewport.addEventListener('mousemove', (e) => this.handleDragMove(e));
      this.viewport.addEventListener('mouseup', () => this.handleDragEnd());
      this.viewport.addEventListener('mouseleave', () => this.handleDragEnd());

      // Touch events
      this.viewport.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
      this.viewport.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
      this.viewport.addEventListener('touchend', () => this.handleTouchEnd());

      // Keyboard navigation
      this.carousel.addEventListener('keydown', (e) => this.handleKeyboard(e));

      // Scroll detection for updating current slide
      this.viewport.addEventListener('scroll', () => this.handleScroll());

      // Update on resize
      window.addEventListener('resize', () => this.updateControls());
    }

    handleDragStart(e) {
      this.isDragging = true;
      this.startX = e.pageX - this.viewport.offsetLeft;
      this.scrollLeft = this.viewport.scrollLeft;
      this.viewport.style.scrollBehavior = 'auto';
    }

    handleDragMove(e) {
      if (!this.isDragging) return;
      e.preventDefault();
      const x = e.pageX - this.viewport.offsetLeft;
      const walk = (x - this.startX) * 2; // Scroll speed multiplier
      this.viewport.scrollLeft = this.scrollLeft - walk;
    }

    handleDragEnd() {
      this.isDragging = false;
      this.viewport.style.scrollBehavior = 'smooth';
      this.snapToNearestSlide();
    }

    handleTouchStart(e) {
      this.startX = e.touches[0].pageX;
      this.scrollLeft = this.viewport.scrollLeft;
    }

    handleTouchMove(e) {
      const x = e.touches[0].pageX;
      const walk = (this.startX - x);
      this.viewport.scrollLeft = this.scrollLeft + walk;
    }

    handleTouchEnd() {
      this.snapToNearestSlide();
    }

    handleKeyboard(e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.next();
      } else if (e.key === 'Home') {
        e.preventDefault();
        this.goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        this.goToSlide(this.slides.length - 1);
      }
    }

    handleScroll() {
      // Debounce scroll updates
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      this.scrollTimeout = setTimeout(() => {
        this.updateCurrentIndex();
        this.updateControls();
        this.lazyLoadImages();
      }, 100);
    }

    snapToNearestSlide() {
      const slideWidth = this.slides[0].offsetWidth;
      const gap = parseInt(getComputedStyle(this.track).gap) || 0;
      const scrollPosition = this.viewport.scrollLeft;
      const index = Math.round(scrollPosition / (slideWidth + gap));
      this.goToSlide(index);
    }

    updateCurrentIndex() {
      const slideWidth = this.slides[0].offsetWidth;
      const gap = parseInt(getComputedStyle(this.track).gap) || 0;
      const scrollPosition = this.viewport.scrollLeft;
      this.currentIndex = Math.round(scrollPosition / (slideWidth + gap));
      this.currentIndex = Math.max(0, Math.min(this.currentIndex, this.slides.length - 1));
    }

    prev() {
      this.goToSlide(this.currentIndex - 1);
    }

    next() {
      this.goToSlide(this.currentIndex + 1);
    }

    goToSlide(index) {
      // Clamp index
      index = Math.max(0, Math.min(index, this.slides.length - 1));
      this.currentIndex = index;

      // Scroll to slide
      const slideWidth = this.slides[0].offsetWidth;
      const gap = parseInt(getComputedStyle(this.track).gap) || 0;
      const scrollPosition = index * (slideWidth + gap);

      this.viewport.style.scrollBehavior = 'smooth';
      this.viewport.scrollLeft = scrollPosition;

      this.updateControls();
      this.lazyLoadImages();
    }

    updateControls() {
      // Update navigation buttons
      if (this.prevButton) {
        this.prevButton.disabled = this.currentIndex === 0;
      }
      if (this.nextButton) {
        this.nextButton.disabled = this.currentIndex === this.slides.length - 1;
      }

      // Update progress dots
      this.progressDots.forEach((dot, index) => {
        if (index === this.currentIndex) {
          dot.classList.add('is-active');
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.classList.remove('is-active');
          dot.removeAttribute('aria-current');
        }
      });

      // Update ARIA live region for screen readers
      const announcement = `Slide ${this.currentIndex + 1} of ${this.slides.length}`;
      if (!this.liveRegion) {
        this.liveRegion = document.createElement('div');
        this.liveRegion.setAttribute('aria-live', 'polite');
        this.liveRegion.setAttribute('aria-atomic', 'true');
        this.liveRegion.className = 'sr-only';
        this.carousel.appendChild(this.liveRegion);
      }
      this.liveRegion.textContent = announcement;
    }

    lazyLoadImages() {
      // Load current slide and adjacent slides
      const indicesToLoad = [
        this.currentIndex - 1,
        this.currentIndex,
        this.currentIndex + 1,
        this.currentIndex + 2
      ];

      indicesToLoad.forEach(index => {
        if (index >= 0 && index < this.slides.length) {
          const slide = this.slides[index];
          const img = slide.querySelector('img[data-src]');
          if (img) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
        }
      });
    }
  }

  /**
   * Initialize all carousels on the page
   */
  function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => new Carousel(carousel));
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousels);
  } else {
    initCarousels();
  }

  // Expose to global scope for dynamic content
  window.initCarousels = initCarousels;

})();

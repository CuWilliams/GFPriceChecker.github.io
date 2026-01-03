/**
 * GF PriceChecker - Main JavaScript
 * Component initialization and mobile navigation
 */

(function() {
  'use strict';

  /**
   * Initialize all components when DOM is ready
   */
  function init() {
    initMobileNav();
    initAccordions();
  }

  /**
   * Mobile Navigation Toggle
   */
  function initMobileNav() {
    const toggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      // Toggle aria-expanded
      toggle.setAttribute('aria-expanded', !isExpanded);

      // Toggle menu visibility
      menu.classList.toggle('is-active');
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('is-active')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-active');
        toggle.focus();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        if (menu.classList.contains('is-active')) {
          toggle.setAttribute('aria-expanded', 'false');
          menu.classList.remove('is-active');
        }
      }
    });
  }

  /**
   * Accordion Component
   */
  function initAccordions() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
      button.addEventListener('click', function() {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        const content = button.nextElementSibling;

        // Toggle aria-expanded
        button.setAttribute('aria-expanded', !isExpanded);

        // Toggle content visibility
        if (content && content.classList.contains('accordion-content')) {
          content.classList.toggle('is-active');
        }
      });
    });
  }

  /**
   * Set active navigation link based on current page
   */
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-link');

    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      init();
      setActiveNavLink();
    });
  } else {
    init();
    setActiveNavLink();
  }

})();

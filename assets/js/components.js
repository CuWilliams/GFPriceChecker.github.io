/**
 * GF PriceChecker - Component Loader
 * Dynamically loads reusable HTML components (navbar, footer)
 */

(function() {
  'use strict';

  /**
   * Fetch component HTML with error handling
   * @param {string} url - URL of the component file
   * @returns {Promise<string|null>} Component HTML or null on error
   */
  async function fetchComponent(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`Failed to fetch component ${url}: ${response.status}`);
        return null;
      }
      return await response.text();
    } catch (error) {
      console.warn(`Error fetching component ${url}:`, error);
      return null;
    }
  }

  /**
   * Load and inject navbar component
   */
  async function loadNavbar() {
    const container = document.getElementById('navbar-placeholder');
    if (!container) return;

    const html = await fetchComponent('/components/navbar.html');
    if (html) {
      container.innerHTML = html;

      // Re-initialize mobile navigation after injection
      if (window.initMobileNav) {
        window.initMobileNav();
      }

      // Set active navigation link based on current page
      if (window.setActiveNavLink) {
        window.setActiveNavLink();
      }
    }
  }

  /**
   * Load and inject footer component
   */
  async function loadFooter() {
    const container = document.getElementById('footer-placeholder');
    if (!container) return;

    const html = await fetchComponent('/components/footer.html');
    if (html) {
      container.innerHTML = html;
    }
  }

  /**
   * Initialize all components
   */
  async function init() {
    // Load navbar and footer in parallel for better performance
    await Promise.all([
      loadNavbar(),
      loadFooter()
    ]);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

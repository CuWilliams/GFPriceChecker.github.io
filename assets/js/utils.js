/**
 * GF PriceChecker - Shared Utilities
 * Common utility functions used across multiple JavaScript modules
 */

(function() {
  'use strict';

  /**
   * Fetch JSON data with error handling
   * @param {string} url - URL of the JSON file
   * @returns {Promise<Object|null>} Parsed JSON data or null on error
   */
  async function fetchJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`Failed to fetch ${url}: ${response.status}`);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.warn(`Error fetching ${url}:`, error);
      return null;
    }
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} str - String to escape
   * @returns {string} Escaped string
   */
  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Format date as "Month Day, Year"
   * @param {string} dateString - ISO date string (YYYY-MM-DD)
   * @returns {string} Formatted date
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Expose utilities globally
  window.GFUtils = {
    fetchJSON: fetchJSON,
    escapeHtml: escapeHtml,
    formatDate: formatDate
  };

})();

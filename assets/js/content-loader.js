/**
 * GF PriceChecker - Content Loader
 * Fetches and renders dynamic content from JSON data files
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
   * Load and render status banner
   */
  async function loadStatusBanner() {
    const container = document.getElementById('status-banner');
    if (!container) return;

    const data = await fetchJSON('/data/status.json');

    if (!data || !data.state || !data.message) {
      // Hide banner if no valid data
      container.style.display = 'none';
      return;
    }

    // Map state to CSS class
    const stateClass = `status-banner-${data.state}`;

    // Update banner classes
    container.className = `status-banner ${stateClass}`;
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');

    // Render content
    if (data.link) {
      container.innerHTML = `<strong><a href="${escapeHtml(data.link)}" style="color: inherit; text-decoration: underline;">${escapeHtml(data.message)}</a></strong>`;
    } else {
      container.innerHTML = `<strong>${escapeHtml(data.message)}</strong>`;
    }
  }

  /**
   * Load and render latest announcement on home page
   */
  async function loadLatestAnnouncement() {
    const container = document.getElementById('latest-announcement');
    if (!container) return;

    const data = await fetchJSON('/data/announcements.json');

    if (!data || !Array.isArray(data) || data.length === 0) {
      // Show empty state
      container.innerHTML = `
        <div class="card text-center">
          <h3 class="card-title">No Announcements Yet</h3>
          <p class="card-text">Check back soon for news and updates about GF PriceChecker.</p>
        </div>
      `;
      return;
    }

    // Get the most recent announcement (first in array)
    const latest = data[0];

    // Format date
    const date = new Date(latest.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Render announcement card
    container.innerHTML = `
      <article class="card">
        <div class="card-title">${escapeHtml(latest.title)}</div>
        <div class="badge badge-primary mb-md">${formattedDate}</div>
        <p class="card-text">${escapeHtml(latest.content)}</p>
        <div class="card-footer">
          <a href="/announcements.html" class="button button-secondary">View All Announcements</a>
        </div>
      </article>
    `;
  }

  /**
   * Load and render full announcements list
   */
  async function loadAnnouncementsList() {
    const container = document.getElementById('announcements-list');
    if (!container) return;

    const data = await fetchJSON('/data/announcements.json');

    if (!data || !Array.isArray(data) || data.length === 0) {
      // Show empty state
      container.innerHTML = `
        <div class="empty-state">
          <svg class="empty-state-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h2 class="empty-state-title">No Announcements Yet</h2>
          <p class="empty-state-description">
            Check back soon for news and updates about GF PriceChecker.
          </p>
        </div>
      `;
      return;
    }

    // Render all announcements
    const html = data.map(announcement => {
      const date = new Date(announcement.date);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      return `
        <article class="card mb-lg">
          <div class="card-title">${escapeHtml(announcement.title)}</div>
          <div class="badge badge-primary mb-md">${formattedDate}</div>
          <p class="card-text">${escapeHtml(announcement.content)}</p>
        </article>
      `;
    }).join('');

    container.innerHTML = html;
  }

  /**
   * Load and render FAQ accordion
   */
  async function loadFAQ() {
    const container = document.getElementById('faq-list');
    if (!container) return;

    const data = await fetchJSON('/data/faq.json');

    if (!data || !Array.isArray(data) || data.length === 0) {
      // Show empty state
      container.innerHTML = `
        <div class="empty-state">
          <svg class="empty-state-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 class="empty-state-title">No FAQs Yet</h2>
          <p class="empty-state-description">
            Frequently asked questions will appear here soon.
          </p>
        </div>
      `;
      return;
    }

    // Render FAQ accordion
    const html = `
      <div class="accordion">
        ${data.map((faq, index) => `
          <div class="accordion-item">
            <h3 class="accordion-header">
              <button class="accordion-button"
                      type="button"
                      aria-expanded="false"
                      aria-controls="faq-content-${faq.id}">
                ${escapeHtml(faq.question)}
                <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </h3>
            <div id="faq-content-${faq.id}" class="accordion-content">
              ${escapeHtml(faq.answer)}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.innerHTML = html;

    // Re-initialize accordion functionality after DOM update
    if (window.initAccordions) {
      window.initAccordions();
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
   * Initialize content loading based on page
   */
  function init() {
    // Load status banner on all pages
    loadStatusBanner();

    // Load page-specific content
    const path = window.location.pathname;

    if (path === '/' || path === '/index.html') {
      loadLatestAnnouncement();
    } else if (path === '/announcements.html') {
      loadAnnouncementsList();
    } else if (path === '/faq.html') {
      loadFAQ();
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

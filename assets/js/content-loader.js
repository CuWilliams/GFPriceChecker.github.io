/**
 * GF PriceChecker - Content Loader
 * Fetches and renders dynamic content from JSON data files
 * Requires: utils.js (must be loaded first)
 */

(function() {
  'use strict';

  // Shorthand references to utility functions
  const { fetchJSON, escapeHtml, formatDate, renderEmptyState, renderCard } = window.GFUtils;

  /**
   * Load and render status banner
   */
  async function loadStatusBanner() {
    const container = document.getElementById('status-banner');
    if (!container) return;

    const data = await fetchJSON('/data/status.json');

    if (!data || !data.state || !data.message) {
      container.style.display = 'none';
      return;
    }

    const stateClass = `status-banner-${data.state}`;
    container.className = `status-banner ${stateClass}`;
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');

    let html = `<strong>${escapeHtml(data.message)}</strong>`;

    if (data.contacts && Array.isArray(data.contacts) && data.contacts.length > 0) {
      const contactLinks = data.contacts.map(contact =>
        `<a href="${escapeHtml(contact.url)}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">${escapeHtml(contact.label)}</a>`
      ).join(' | ');
      html += `<br><strong>${contactLinks}</strong>`;
    } else if (data.link && data.linkText) {
      // Separate linked text from main message
      html = `<strong>${escapeHtml(data.message)} <a href="${escapeHtml(data.link)}" style="color: inherit; text-decoration: underline;">${escapeHtml(data.linkText)}</a></strong>`;
    } else if (data.link) {
      html = `<strong><a href="${escapeHtml(data.link)}" style="color: inherit; text-decoration: underline;">${escapeHtml(data.message)}</a></strong>`;
    }

    container.innerHTML = html;
  }

  /**
   * Load and render latest blog post on home page
   */
  async function loadLatestBlogPost() {
    const container = document.getElementById('latest-blog-post');
    if (!container) return;

    const data = await fetchJSON('/data/blog.json');

    if (!data || !Array.isArray(data) || data.length === 0) {
      container.innerHTML = renderEmptyState({
        title: 'No Blog Posts Yet',
        description: 'Check back soon for development updates and insights.',
        isCard: true
      });
      return;
    }

    const sortedPosts = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latest = sortedPosts[0];
    const preview = latest.content.substring(0, 150);
    const needsEllipsis = latest.content.length > 150;

    container.innerHTML = renderCard({
      title: latest.title,
      date: latest.date,
      content: preview + (needsEllipsis ? '...' : ''),
      footer: { text: 'Read More', url: `/blog.html#post-${latest.id}` }
    });
  }

  /**
   * Load and render latest announcement on home page
   */
  async function loadLatestAnnouncement() {
    const container = document.getElementById('latest-announcement');
    if (!container) return;

    const data = await fetchJSON('/data/announcements.json');

    if (!data || !Array.isArray(data) || data.length === 0) {
      container.innerHTML = renderEmptyState({
        title: 'No Announcements Yet',
        description: 'Check back soon for news and updates about GF PriceChecker.',
        isCard: true
      });
      return;
    }

    const sortedAnnouncements = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latest = sortedAnnouncements[0];
    container.innerHTML = renderCard({
      title: latest.title,
      date: latest.date,
      content: latest.content,
      footer: { text: 'View All Announcements', url: '/announcements.html' }
    });
  }

  /**
   * Load and render full announcements list
   */
  async function loadAnnouncementsList() {
    const container = document.getElementById('announcements-list');
    if (!container) return;

    const data = await fetchJSON('/data/announcements.json');

    if (!data || !Array.isArray(data) || data.length === 0) {
      container.innerHTML = renderEmptyState({
        title: 'No Announcements Yet',
        description: 'Check back soon for news and updates about GF PriceChecker.',
        icon: 'inbox'
      });
      return;
    }

    const sortedAnnouncements = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = sortedAnnouncements.map(announcement => renderCard({
      title: announcement.title,
      date: announcement.date,
      content: announcement.content,
      className: 'mb-lg',
      titleTag: 'div'
    })).join('');
  }

  /**
   * Load and render FAQ accordion
   */
  async function loadFAQ() {
    const container = document.getElementById('faq-list');
    if (!container) return;

    const data = await fetchJSON('/data/faq.json');

    if (!data || !Array.isArray(data) || data.length === 0) {
      container.innerHTML = renderEmptyState({
        title: 'No FAQs Yet',
        description: 'Frequently asked questions will appear here soon.',
        icon: 'question'
      });
      return;
    }

    container.innerHTML = `
      <div class="accordion">
        ${data.map(faq => `
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

    if (window.initAccordions) {
      window.initAccordions();
    }
  }

  /**
   * Initialize content loading based on page
   */
  function init() {
    loadStatusBanner();

    const path = window.location.pathname;

    if (path === '/' || path === '/index.html') {
      loadLatestBlogPost();
      loadLatestAnnouncement();
    } else if (path === '/announcements.html') {
      loadAnnouncementsList();
    } else if (path === '/faq.html') {
      loadFAQ();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

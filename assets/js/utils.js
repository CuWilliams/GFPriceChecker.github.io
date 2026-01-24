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

  /**
   * SVG icon paths for empty states
   */
  const ICONS = {
    inbox: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4',
    document: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
    question: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  };

  /**
   * Render an empty state component
   * @param {Object} options - Empty state options
   * @param {string} options.title - Title text
   * @param {string} options.description - Description text
   * @param {string} [options.icon='inbox'] - Icon name (inbox, document, question)
   * @param {boolean} [options.isCard=false] - Render as card style (simpler, no icon)
   * @returns {string} HTML string
   */
  function renderEmptyState(options) {
    const { title, description, icon = 'inbox', isCard = false } = options;

    if (isCard) {
      return `
        <div class="card text-center">
          <h3 class="card-title">${escapeHtml(title)}</h3>
          <p class="card-text">${escapeHtml(description)}</p>
        </div>
      `;
    }

    const iconPath = ICONS[icon] || ICONS.inbox;
    return `
      <div class="empty-state">
        <svg class="empty-state-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}" />
        </svg>
        <h2 class="empty-state-title">${escapeHtml(title)}</h2>
        <p class="empty-state-description">${escapeHtml(description)}</p>
      </div>
    `;
  }

  /**
   * Render a card component
   * @param {Object} options - Card options
   * @param {string} options.title - Card title
   * @param {string} [options.date] - Date string (will be formatted)
   * @param {string} [options.content] - Card content/description
   * @param {string} [options.contentHtml] - Pre-rendered HTML content (use instead of content)
   * @param {Object} [options.footer] - Footer options
   * @param {string} [options.footer.text] - Footer link text
   * @param {string} [options.footer.url] - Footer link URL
   * @param {string} [options.id] - Optional ID for the card
   * @param {string} [options.className] - Additional CSS classes
   * @param {string} [options.tag='article'] - HTML tag to use
   * @param {string} [options.titleTag='h3'] - HTML tag for title
   * @returns {string} HTML string
   */
  function renderCard(options) {
    const {
      title,
      date,
      content,
      contentHtml,
      footer,
      id,
      className = '',
      tag = 'article',
      titleTag = 'h3'
    } = options;

    const idAttr = id ? ` id="${escapeHtml(id)}"` : '';
    const classes = ['card', className].filter(Boolean).join(' ');
    const dateHtml = date ? `<div class="badge badge-primary mb-md">${formatDate(date)}</div>` : '';
    const bodyContent = contentHtml || (content ? `<p class="card-text">${escapeHtml(content)}</p>` : '');
    const footerHtml = footer ? `
        <div class="card-footer">
          <a href="${escapeHtml(footer.url)}" class="button button-secondary">${escapeHtml(footer.text)}</a>
        </div>` : '';

    return `
      <${tag}${idAttr} class="${classes}">
        <${titleTag} class="card-title">${escapeHtml(title)}</${titleTag}>
        ${dateHtml}
        ${bodyContent}${footerHtml}
      </${tag}>
    `;
  }

  // Expose utilities globally
  window.GFUtils = {
    fetchJSON: fetchJSON,
    escapeHtml: escapeHtml,
    formatDate: formatDate,
    renderEmptyState: renderEmptyState,
    renderCard: renderCard,
    ICONS: ICONS
  };

})();

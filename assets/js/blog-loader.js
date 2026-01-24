/**
 * GF PriceChecker - Blog Loader
 * Fetches and renders blog posts from JSON data
 * Requires: utils.js (must be loaded first)
 */

(function() {
  'use strict';

  // Shorthand references to utility functions
  const { fetchJSON, escapeHtml, formatDate } = window.GFUtils;

  /**
   * Preserve line breaks in content
   * @param {string} content - Content with line breaks
   * @returns {string} HTML with preserved line breaks
   */
  function preserveLineBreaks(content) {
    if (!content) return '';
    // Split by newlines and wrap each paragraph in <p> tags
    const paragraphs = content.split('\n\n');
    return paragraphs
      .map(para => {
        const trimmed = para.trim();
        if (trimmed) {
          // Replace single newlines with <br> within paragraphs
          const withBreaks = trimmed.replace(/\n/g, '<br>');
          return `<p class="card-text">${escapeHtml(withBreaks).replace(/&lt;br&gt;/g, '<br>')}</p>`;
        }
        return '';
      })
      .filter(p => p)
      .join('');
  }

  /**
   * Load and render full blog posts list
   */
  async function loadBlogList() {
    const container = document.getElementById('blog-list');
    if (!container) return;

    const data = await fetchJSON('/data/blog.json');

    if (!data || !Array.isArray(data) || data.length === 0) {
      // Show empty state
      container.innerHTML = `
        <div class="empty-state">
          <svg class="empty-state-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h2 class="empty-state-title">No Blog Posts Yet</h2>
          <p class="empty-state-description">
            Check back soon for development updates and insights from the GF PriceChecker team.
          </p>
        </div>
      `;
      return;
    }

    // Sort posts by date (newest first)
    const sortedPosts = [...data].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    // Render all blog posts
    const html = sortedPosts.map(post => {
      const contentHtml = preserveLineBreaks(post.content);

      return `
        <article class="card mb-lg" id="post-${escapeHtml(post.id)}">
          <h2 class="card-title">${escapeHtml(post.title)}</h2>
          <div class="badge badge-primary mb-md">${formatDate(post.date)}</div>
          ${contentHtml}
        </article>
      `;
    }).join('');

    container.innerHTML = html;
  }

  /**
   * Initialize blog loading
   */
  function init() {
    // Only load blog list if on blog page
    const path = window.location.pathname;
    if (path === '/blog.html') {
      loadBlogList();
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

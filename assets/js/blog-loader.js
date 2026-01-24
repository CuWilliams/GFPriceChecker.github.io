/**
 * GF PriceChecker - Blog Loader
 * Fetches and renders blog posts from JSON data
 * Requires: utils.js (must be loaded first)
 */

(function() {
  'use strict';

  // Shorthand references to utility functions
  const { fetchJSON, escapeHtml, renderEmptyState, renderCard } = window.GFUtils;

  /**
   * Preserve line breaks in content
   * @param {string} content - Content with line breaks
   * @returns {string} HTML with preserved line breaks
   */
  function preserveLineBreaks(content) {
    if (!content) return '';
    const paragraphs = content.split('\n\n');
    return paragraphs
      .map(para => {
        const trimmed = para.trim();
        if (trimmed) {
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
      container.innerHTML = renderEmptyState({
        title: 'No Blog Posts Yet',
        description: 'Check back soon for development updates and insights from the GF PriceChecker team.',
        icon: 'document'
      });
      return;
    }

    const sortedPosts = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = sortedPosts.map(post => renderCard({
      title: post.title,
      date: post.date,
      contentHtml: preserveLineBreaks(post.content),
      id: `post-${post.id}`,
      className: 'mb-lg',
      titleTag: 'h2'
    })).join('');
  }

  /**
   * Initialize blog loading
   */
  function init() {
    const path = window.location.pathname;
    if (path === '/blog.html') {
      loadBlogList();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

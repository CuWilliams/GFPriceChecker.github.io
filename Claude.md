# GF PriceChecker Website - Project Documentation

**Project**: GF PriceChecker Official Website
**Platform**: Static website hosted on GitHub Pages
**Purpose**: Marketing and information site for GF PriceChecker iOS app
**Initialized**: January 2, 2026
**Status**: Phase 1 Complete - Project Foundation

---

## Project Overview

GF PriceChecker is an iOS app designed to help Canadians track gluten-free product price differentials for tax deduction purposes. This static website serves as the official web presence for the app, providing information, features, announcements, and support.

---

## Architecture

### Technology Stack
- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Custom properties (CSS variables) for design tokens
- **Vanilla JavaScript**: No frameworks, lightweight and performant
- **Hosting**: GitHub Pages (static site)
- **DNS/CDN**: Cloudflare
- **Analytics**: Cloudflare Web Analytics (cookie-free)

### Design System
This project follows **DESIGN-SYSTEM.md** guidelines:
- **NO gradients** (anti-AI aesthetic)
- **Solid colors only**: Primary blue #0000FF, black, white, grays
- **8px spacing base**: Consistent spacing scale
- **2-3 colors per screen**: Minimal color usage
- **Generous whitespace**: Clean, uncluttered layouts
- **System fonts**: -apple-system, BlinkMacSystemFont, Segoe UI, etc.
- **WCAG 2.1 AA compliant**: Accessibility is a priority

---

## Folder Structure

```
/
├── index.html                  # Home page
├── features.html               # (Phase 3 - to be created)
├── announcements.html          # (Phase 3 - to be created)
├── faq.html                    # (Phase 3 - to be created)
├── privacy.html                # (Phase 3 - to be created)
├── terms.html                  # (Phase 3 - to be created)
├── sitemap.xml                 # (Phase 3 - to be created)
├── robots.txt                  # (Phase 3 - to be created)
├── CNAME                       # GitHub Pages custom domain
├── README.md                   # GitHub repository description
├── Claude.md                   # This file - project documentation
├── DESIGN-SYSTEM.md            # Design guidelines and tokens
├── Documents/
│   ├── EXECUTION_PLAN.md       # Phased implementation plan
│   └── TECHNICAL_REQUIREMENTS.md # Technical specifications
├── assets/
│   ├── css/
│   │   ├── base.css            # Design tokens, reset, utilities
│   │   └── components.css      # Component library styles
│   ├── js/
│   │   └── main.js             # Mobile nav, component initialization
│   ├── images/
│   │   ├── logos/              # Brand assets
│   │   └── screenshots/        # App screenshots
│   └── video/                  # Instructional videos
├── data/                       # (Phase 2 - JSON data files)
│   ├── status.json             # Status banner configuration
│   ├── announcements.json      # News and updates
│   └── faq.json                # Frequently asked questions
└── components/                 # (Future - reusable HTML partials)
```

---

## Design Tokens

All design tokens are defined in `/assets/css/base.css` using CSS custom properties:

### Colors
```css
--primary-blue: #0000FF;
--black: #000000;
--white: #FFFFFF;
--light-gray: #F5F5F5;
--medium-gray: #808080;
--dark-gray: #333333;
```

### Spacing (8px base)
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
```

### Typography
```css
--font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ...;
--text-xs: 0.75rem;   (12px)
--text-sm: 0.875rem;  (14px)
--text-md: 1rem;      (16px - body text)
--text-lg: 1.25rem;   (20px)
--text-xl: 1.5rem;    (24px)
--text-2xl: 2rem;     (32px)
--text-3xl: 2.5rem;   (40px - main heading)
```

---

## Component Library

All components are defined in `/assets/css/components.css`:

| Component | Description | Accessibility |
|-----------|-------------|---------------|
| `.button-primary` | Solid blue CTA button | Focus indicators, keyboard support |
| `.button-secondary` | Outlined button | Focus indicators, keyboard support |
| `.navbar` | Sticky responsive navigation | ARIA labels, keyboard navigation |
| `.footer` | Site footer with links | Semantic HTML, skip links |
| `.status-banner` | Configurable status messages | ARIA live regions |
| `.card` | Content containers | Semantic HTML |
| `.accordion` | Expandable FAQ sections | ARIA expanded, keyboard support |
| `.empty-state` | Placeholder messaging | Clear visual hierarchy |
| `.badge` | Status indicators | Color and text labels |

---

## JavaScript Modules

### `/assets/js/main.js`

**Functions:**
- `initMobileNav()`: Hamburger menu toggle with keyboard support
- `initAccordions()`: FAQ accordion expand/collapse
- `setActiveNavLink()`: Highlights current page in navigation

**Event Listeners:**
- Click handlers for mobile menu toggle
- Escape key to close mobile menu
- Click outside to close mobile menu
- Accordion button clicks

---

## Responsive Breakpoints

Mobile-first approach with the following breakpoints:

| Breakpoint | Range | Layout Changes |
|------------|-------|----------------|
| Mobile | < 768px | Single column, hamburger menu, touch interactions |
| Tablet | 768px - 1023px | 2-column grids, visible navigation |
| Desktop | 1024px+ | Multi-column grids, full horizontal navigation |

---

## Accessibility Features

### WCAG 2.1 AA Compliance
- ✅ Color contrast ratios: 4.5:1 for text, 3:1 for UI elements
- ✅ Keyboard navigation for all interactive elements
- ✅ Visible focus indicators (2px blue outline)
- ✅ Skip navigation link for screen readers
- ✅ Semantic HTML5 landmarks (nav, main, footer)
- ✅ ARIA labels where semantic HTML is insufficient
- ✅ Alt text on all images (to be added with actual assets)

### Keyboard Shortcuts
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close mobile menu
- **Arrow Keys**: (Future) Navigate carousel

---

## SEO Implementation

### Current Implementation
- ✅ Semantic HTML5 structure
- ✅ Proper heading hierarchy (h1-h6)
- ✅ Unique title and meta description
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Canonical URLs

### To Be Implemented (Phase 5)
- ⏳ JSON-LD structured data (Organization, WebApplication schemas)
- ⏳ sitemap.xml
- ⏳ robots.txt
- ⏳ Alt text on all images

---

## Content Management (Phase 2)

Dynamic content will be managed via JSON files in `/data/`:

### `status.json`
```json
{
  "state": "coming-soon" | "testflight" | "available" | "maintenance",
  "message": "Display text",
  "link": "Optional URL"
}
```

### `announcements.json`
```json
[
  {
    "id": "1",
    "date": "2026-01-15",
    "title": "Announcement Title",
    "content": "Announcement details..."
  }
]
```

### `faq.json`
```json
[
  {
    "id": "1",
    "question": "Question text?",
    "answer": "Answer text..."
  }
]
```

---

## Placeholders and Future Work

### Current Placeholders
- ❌ Logo files (need SVG and PNG)
- ❌ App screenshots (12+ images for carousel)
- ❌ Instructional videos (MP4, <50MB, 720p)
- ❌ Cloudflare Analytics token (in index.html)
- ❌ Open Graph image
- ❌ Favicon

### Future Pages (Phase 3)
- features.html
- announcements.html
- faq.html
- privacy.html
- terms.html

### Future Features (Phase 4)
- Horizontal screenshot carousel with stacked effect
- HTML5 video player for instructional content
- Lazy loading for images

---

## Development Workflow

### Local Development
1. Use VS Code Live Server extension
2. Open `index.html` in browser
3. Test at mobile (375px), tablet (768px), desktop (1024px+) widths
4. Verify keyboard navigation
5. Check browser console for errors

### Git Workflow
- Branch: `claude/init-gf-pricechecker-site-BWDSz`
- Commit messages: Clear, descriptive
- Push to branch when phase complete

### Testing Checklist
- [ ] Responsive at all breakpoints
- [ ] Mobile navigation functional
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] Focus indicators visible
- [ ] Links functional
- [ ] Images load (when added)

---

## Technical Constraints

| Constraint | Limit | Impact |
|------------|-------|--------|
| GitHub Pages | Static only | No server-side processing |
| File size | 100MB per file | Videos must be compressed |
| Repository | 1GB soft limit | Monitor total asset size |
| Analytics | No cookies | Use Cloudflare Web Analytics only |

---

## Phase 1 Completion Status

### ✅ Completed
- Project folder structure
- Base CSS with design tokens (DESIGN-SYSTEM.md compliant)
- Component library CSS (all 8 required components)
- Base JavaScript (mobile nav, component initialization)
- index.html with semantic HTML5, meta tags, placeholders
- This documentation file (Claude.md)

### ⏳ Next Steps (Phase 2)
- Create JSON data files (status, announcements, FAQ)
- Create content-loader.js to fetch and render JSON data
- Update index.html to use content loader
- Handle empty states gracefully

---

## Design System Compliance

This project strictly follows DESIGN-SYSTEM.md:

### ✅ Compliant
- NO gradients anywhere
- Solid colors only (#0000FF, black, white, grays)
- 8px spacing base
- 2-3 colors per screen maximum
- Generous whitespace
- Clean typography hierarchy
- System font stack
- Works in black and white
- Subtle shadows only (2-4px blur, 5-8% opacity)

### 🚫 Avoided (Anti-AI Aesthetics)
- Gradients
- Floating geometric decorations
- Neon colors
- Heavy drop shadows
- Unnecessary animations
- Template-based layouts
- Over-designed elements

---

## Browser Support

- Chrome (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari (latest 2 versions)
- Chrome Android (latest 2 versions)

---

## Notes for Future Development

### When Adding Assets
1. Logo files go in `/assets/images/logos/`
2. Screenshots go in `/assets/images/screenshots/`
3. Videos go in `/assets/video/`
4. Optimize all images before committing
5. Keep videos under 50MB each

### When Adding New Pages
1. Copy index.html structure
2. Update title and meta tags (unique for each page)
3. Update Open Graph and Twitter Card tags
4. Add canonical URL
5. Update navigation active state
6. Test responsive layout

### When Updating Styles
1. Check DESIGN-SYSTEM.md first
2. Use existing CSS custom properties
3. Maintain 8px spacing increments
4. Avoid adding new colors
5. Test color contrast (4.5:1 minimum)
6. Verify keyboard accessibility

---

## Contact & Support

**Repository**: https://github.com/CuWilliams/GFPriceChecker.github.io
**Documentation**: See `Documents/` folder for detailed requirements and execution plan
**Design Guidelines**: See `DESIGN-SYSTEM.md` for design tokens and patterns

---

*Last Updated: January 2, 2026 - Phase 1 Complete*

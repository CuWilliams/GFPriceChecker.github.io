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
├── features.html               # Features page with carousel
├── beta.html                   # TestFlight beta instructions
├── blog.html                   # Developer blog posts
├── announcements.html          # News and updates page
├── faq.html                    # Frequently asked questions
├── privacy.html                # Privacy policy
├── terms.html                  # Terms of use
├── sitemap.xml                 # XML sitemap for SEO
├── robots.txt                  # Search engine crawl rules
├── CNAME                       # GitHub Pages custom domain
├── README.md                   # How the site is built, run, and added to
├── CHANGELOG.md                # Site release history and versioning approach
├── Claude.md                   # This file - project documentation
├── DESIGN-SYSTEM.md            # Design guidelines and tokens
├── Documents/
│   └── archive/                # Original build plans (historical)
│       ├── EXECUTION_PLAN.md
│       └── TECHNICAL_REQUIREMENTS.md
├── assets/
│   ├── css/
│   │   ├── base.css            # Design tokens, reset, utilities
│   │   └── components.css      # Component library styles
│   ├── js/
│   │   ├── utils.js            # Shared helpers (window.GFUtils) - load first
│   │   ├── main.js             # Mobile nav, component initialization
│   │   ├── components.js       # Component loader for navbar/footer
│   │   ├── content-loader.js   # Dynamic content from JSON
│   │   ├── blog-loader.js      # Blog post rendering
│   │   └── carousel.js         # Screenshot carousel
│   ├── images/
│   │   ├── logos/              # Brand assets
│   │   └── screenshots/        # App screenshots
│   └── video/                  # Instructional videos
├── data/                       # JSON data files
│   ├── status.json             # Status banner configuration
│   ├── announcements.json      # News and updates
│   ├── blog.json               # Developer blog posts
│   └── faq.json                # Frequently asked questions
├── components/                 # Reusable HTML components
│   ├── navbar.html             # Navigation bar
│   └── footer.html             # Footer
└── scripts/
    └── validate-data.js        # Schema check for data/*.json, run in CI
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

### `/assets/js/components.js` (Component Loader)

**Purpose:** Dynamically loads reusable HTML components (navbar, footer) to eliminate duplication

**Functions:**
- `fetchComponent(url)`: Fetches HTML component files with error handling
- `loadNavbar()`: Loads navbar.html into #navbar-placeholder
- `loadFooter()`: Loads footer.html into #footer-placeholder
- `init()`: Loads both components in parallel

**How it works:**
1. Fetches `/components/navbar.html` and `/components/footer.html`
2. Injects HTML into placeholder divs
3. Reinitializes mobile nav and sets active links after navbar loads
4. Runs automatically on DOM ready

**Benefits:**
- Single source of truth for nav/footer (edit once, updates all 7 pages)
- Reduces code duplication from ~60 lines per page to 1 line
- Maintains static hosting compatibility (no build tools needed)

### `/assets/js/main.js`

**Functions:**
- `initMobileNav()`: Hamburger menu toggle with keyboard support *(exposed globally)*
- `initAccordions()`: FAQ accordion expand/collapse *(exposed globally)*
- `setActiveNavLink()`: Highlights current page in navigation *(exposed globally)*

**Global Exposure:**
Functions are exposed to `window` object for reinitialization after dynamic component loading

**Event Listeners:**
- Click handlers for mobile menu toggle
- Escape key to close mobile menu
- Click outside to close mobile menu
- Accordion button clicks

### `/assets/js/content-loader.js`

**Purpose:** Loads dynamic content from JSON data files

**Functions:**
- `loadStatusBanner()`: Updates status banner from status.json
- `loadLatestBlogPost()`: Shows most recent blog post on homepage
- `loadLatestAnnouncement()`: Shows most recent announcement on homepage
- `loadAnnouncementsList()`: Renders all announcements
- `loadFAQ()`: Renders FAQ accordion

**Features:**
- Error handling and empty state management
- XSS protection via HTML escaping
- Date formatting
- ARIA live regions for dynamic updates

### `/assets/js/blog-loader.js`

**Purpose:** Loads and renders blog posts from blog.json

**Functions:**
- `loadBlogList()`: Fetches and renders all blog posts sorted by date
- `formatDate()`: Formats ISO dates to human-readable format
- `preserveLineBreaks()`: Preserves paragraph structure in blog content

**Features:**
- Sorts posts newest first
- Preserves line breaks and paragraphs
- Empty state handling

### `/assets/js/carousel.js`

**Purpose:** Interactive screenshot carousel for features page

**Features:**
- Mouse drag, touch swipe, keyboard navigation
- Lazy loading (loads current + 2 adjacent slides)
- Progress dots for navigation
- Smooth scrolling with debouncing
- Full ARIA accessibility support

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
- ✅ Alt text on all images

### Keyboard Shortcuts
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close mobile menu
- **Arrow Keys / Home / End**: Navigate carousel

---

## SEO Implementation

- ✅ Semantic HTML5 structure
- ✅ Proper heading hierarchy (h1-h6)
- ✅ Unique title and meta description
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Canonical URLs, pointing at the `www` host
- ✅ JSON-LD structured data — Organization in `index.html`, MobileApplication in `features.html`
- ✅ `sitemap.xml`, covering all eight pages
- ✅ `robots.txt`
- ✅ Alt text on all images

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

## Content Conventions

### Don't claim tax compliance

The app deliberately carries no Canada Revenue Agency branding in its interface. Agency references
and specific tax line numbers were stripped out in April 2026 — tracking price differences is what
the app does, and what a user does with those records at tax time is between them and their
accountant. **The site follows the same rule.**

- Explain the Medical Expense Tax Credit as context for why the app exists. That's fair and useful.
- Never describe the app's exports as CRA-compliant, approved, accepted, or endorsed.
- Never promise anyone a deduction. Where it's relevant, mention that the credit only applies to
  medical expenses above roughly 3% of net income — a modest year may not reach it.

Before merging copy changes, sweep for regressions:

```
grep -rn "CRA\|Tax Compliant\|tax compliance\|Line 33099" --include=*.html --include=*.json .
```

Every surviving hit should be explanatory context, never a claim about the app's output.

**One standing exception: dated posts in `data/blog.json`.** The blog is a first-person record of
what the app was at the time of writing, and it narrates its own corrections in sequence — the
2026-01-24 post calls the exports "a clean, CRA-ready document," and the 2026-04-06 post is the
author explaining that he pulled exactly that framing out of the app. Rewriting the earlier post
would erase the change it exists to document. Leave dated entries as written; the rule binds the
static pages, `faq.json`, `announcements.json`, and anything new.

### Describe the app as it currently works

The headline metric is the **unit price differential** — cost per unit, scaled back to the size
actually purchased — not the package-to-package difference, which is kept beside it for reference.
Copy that leads with package price is out of date. Likewise, capturing a product is a single review
screen with three steps (name, price, size), and **size is optional**. Don't describe it as
mandatory or as a separate screen.

When the app changes, the blog gets updated first (there's a GitHub Actions reminder on every merged
PR). The static pages have no such prompt and are the ones that quietly rot — check them against
`data/blog.json` and the app's release notes whenever a feature lands.

### Don't overclaim on privacy either

Local-only storage, on-device text recognition, no accounts, no sync: all true, all worth saying.
But backup files are **not** encrypted. Don't say they are.

### Use the canonical host in every absolute URL

**`https://www.gfpricechecker.com` is the canonical host.** `CNAME` is the source of truth for
this, and it holds `www.gfpricechecker.com`. The bare apex `gfpricechecker.com` 301-redirects to
`www` and should keep doing so — this is about matching the *stated* canonical to the *actual*
one, not about dropping a hostname.

Every absolute URL in the site's markup and config uses `www`: `<link rel="canonical">`, `og:url`,
`og:image`, `twitter:url`, `twitter:image`, the JSON-LD `url` and `logo` in `index.html`, every
`<loc>` in `sitemap.xml`, and the `Sitemap:` line in `robots.txt`. A self-referencing canonical
that points at a redirect is an SEO smell, and a sitemap full of redirecting URLs reads as
unmaintained.

Before merging, sweep for the bare domain creeping back in:

```
grep -rn "https://gfpricechecker\.com" --include=*.html --include=*.xml --include=*.txt .
```

That should return nothing. Prose in `README.md` and `CHANGELOG.md` may show the bare domain as
link *text* — the href underneath still has to be `www`.
### Validate the data files after editing them

`data/*.json` is hand-edited and rendered client-side, which means a missing field produces no
error anywhere — `undefined` interpolates into a template string quite happily, the page still
renders, and the only symptom is a link that goes nowhere. Three blog posts shipped without an
`id` that way, each leaving the home page's only call-to-action pointing at `#post-undefined`
for weeks.

So after touching any file under `data/`:

```
node scripts/validate-data.js
```

Zero dependencies, and CI runs the same command on every push and pull request to `main`
(`.github/workflows/validate-data.yml`). It enforces required fields on blog posts, announcements,
and FAQ entries; unique, anchor-safe `id` values; real `YYYY-MM-DD` dates; and the status banner's
allowed states. Adding a field to a data file means adding it to `LIST_SCHEMAS` in that script.

The loaders also skip entries missing the fields they render — `GFUtils.filterValidEntries` — but
that's a backstop that hides content, not a substitute for the check.

---

## Outstanding Work

The original launch placeholders — logo, favicon, Open Graph image, Cloudflare Analytics token,
screenshots, and videos — were all resolved during January 2026, and every page planned in the
original build now exists (plus `beta.html` and `blog.html`, which came later). What follows is
what's actually outstanding.

### Media is out of date
The three walkthrough videos were recorded January 17–24 2026 and the majority of the carousel
screenshots on January 3. Both predate the move to unit pricing as the headline figure (April 2026)
and the rebuilt three-step capture review (July 2026), so they show screens that no longer exist.
Both sections carry a `.media-note` saying so. Replacing them needs a device or simulator session:

- Re-record the three walkthroughs against the current build.
- Re-capture screenshots 08–14 (capture flow, receipt views, product detail, list, export,
  dashboard).
- Keep video files under 50MB — `receipt-management.mp4` is already at 49MB.

### Videos have no captions
No VTT track exists for any video. This was deferred at launch and is still open; it's the site's
most significant remaining accessibility gap.

### Legal review
`privacy.html` and `terms.html` were revised on January 25 2026 and no longer carry placeholder
banners, but they have never had professional legal review.

### Not built
A community product database was once advertised on the features page as "Planned". It was never
built and the card has been removed rather than left promising something that isn't coming.

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

## Phase 5: SEO and Accessibility Audit (Completed)

### JSON-LD Structured Data

**index.html - Organization Schema**:
- Organization name, URL, and logo
- Contact point information
- Area served (Canada)
- Description and founding date
- Validates with Google Rich Results Test

**features.html - MobileApplication Schema**:
- Application category (FinanceApplication)
- Operating system (iOS)
- Feature list with all core capabilities
- Pricing information (free app)
- Countries supported (Canada)
- Author organization
- Validates with Google Rich Results Test

### Accessibility Audit Results (WCAG 2.1 AA Compliant)

**✅ Image Alt Text**:
- All images have descriptive alt attributes
- Logo images: "GF PriceChecker"
- Carousel images: "GF PriceChecker screenshot [1-12]"
- Decorative SVG icons in empty states
- No images missing alt text

**✅ Color Contrast Compliance**:
- **Body text on white**: #212529 (black) - Contrast ratio: 16.1:1 (Exceeds 4.5:1)
- **Secondary text on white**: #495057 (dark gray) - Contrast ratio: 9.7:1 (Exceeds 4.5:1)
- **Muted text on white**: #6C757D (medium gray) - Contrast ratio: 5.9:1 (Exceeds 4.5:1)
- **Primary blue buttons**: #0000FF on white text - Contrast ratio: 8.6:1 (Exceeds 4.5:1)
- **Primary blue links**: #0000FF - Contrast ratio: 8.6:1 (Exceeds 4.5:1)
- **UI elements**: All exceed 3:1 minimum for large text and UI components

**✅ Skip Navigation Link**:
- Present on all pages
- Positioned absolutely off-screen
- Becomes visible on focus
- Links to #main-content
- Keyboard accessible (Tab to reach)

**✅ Focus Indicators**:
- All interactive elements have visible focus indicators
- 2px solid blue outline with 2px offset
- Applied to: links, buttons, form inputs, carousel controls, accordion buttons, progress dots
- Defined in base.css:245-257

**✅ ARIA Labels and Roles**:
- **Navbar**: `role="navigation"`, `aria-label="Main navigation"`
- **Mobile menu toggle**: `aria-expanded`, `aria-controls`, `aria-label`
- **Active nav links**: `aria-current="page"`
- **Carousel**: `role="region"`, `aria-label="App screenshots carousel"`, `tabindex="0"`
- **Carousel slides**: `role="group"`, individual aria-labels
- **Carousel controls**: Descriptive aria-labels on prev/next buttons
- **Progress dots**: `role="tablist"`, `role="tab"`, individual aria-labels
- **Accordion buttons**: `aria-expanded`, `aria-controls`
- **Status banner**: `role="status"`, `aria-live="polite"`

**✅ Keyboard Navigation**:
- **Carousel**: Arrow Left/Right, Home, End keys
- **Accordion**: Enter/Space to expand/collapse
- **Mobile menu**: Escape to close
- **All buttons and links**: Tab to focus, Enter/Space to activate
- **No keyboard traps** detected

**✅ Semantic HTML**:
- Proper heading hierarchy (h1 → h2 → h3)
- Landmarks: `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`
- Lists for navigation (`<ul>`, `<li>`)
- `<button>` for interactive elements
- Proper `<a>` tags for links

**✅ Screen Reader Support**:
- Carousel live region announces slide changes
- Status banner uses aria-live for dynamic updates
- All images have descriptive alt text
- Form inputs would have labels (none present yet)

### Performance Optimization Audit

**✅ Lazy Loading**:
- Carousel images use `data-src` attribute
- Images load progressively (current slide + 2 adjacent)
- `loading="lazy"` attribute on carousel images
- Video elements use `preload="metadata"` (not full video)

**✅ No Render-Blocking Resources**:
- CSS files loaded in `<head>` (necessary for first paint)
- JavaScript files loaded at end of `<body>`
- No inline styles blocking render
- Cloudflare Analytics script uses `defer` attribute (when enabled)

**✅ Scroll Behavior**:
- Carousel uses scroll debouncing (100ms timeout)
- Smooth scrolling with `scroll-behavior: smooth`
- No layout shift from lazy-loaded images

**✅ Asset Optimization**:
- Placeholder images use external service (via.placeholder.com)
- Real screenshots should be optimized before adding
- Videos should be compressed (<50MB, 720p H.264)

### Audit Summary

**All accessibility requirements met**:
- WCAG 2.1 Level AA compliant
- Keyboard accessible throughout
- Screen reader friendly
- Proper ARIA labels and roles
- No accessibility violations found

**All SEO requirements met**:
- JSON-LD structured data validates
- Unique meta tags on all pages
- Semantic HTML structure
- Sitemap.xml present
- Robots.txt configured

**All performance requirements met**:
- Lazy loading implemented
- No render-blocking resources
- Debounced scroll events
- Optimized asset loading

**No issues found** - Ready for production deployment.

---

## Phase 6: Final Polish and Deployment Preparation (Completed)

### Placeholder Content Status

> **Historical.** This section recorded the state of the site at the end of the January 2026 build,
> when the logo, screenshots, videos, Open Graph image, favicon, and Cloudflare Analytics token were
> all still outstanding, and `privacy.html` and `terms.html` carried placeholder banners. All of
> those were resolved during January 2026 — the analytics token is live on every page and the legal
> placeholder banners are gone. For what is genuinely still open, see
> [Outstanding Work](#outstanding-work) above.

### Final Validation Checks

**✅ All Links Functional**:
- Navigation links: /, /features.html, /announcements.html, /faq.html
- Footer links: All pages, privacy, terms
- Internal page links: All verified
- External links: None present
- No broken links found

**✅ Responsive Layouts**:
- Mobile (320px-767px): Single column, hamburger menu ✓
- Tablet (768px-1023px): 2-column grids, visible nav ✓
- Desktop (1024px+): Full layout, multi-column grids ✓
- Carousel: Responsive slide sizing ✓
- Video grid: Responsive 1-2 columns ✓

**✅ No Console Errors**:
- JavaScript: No errors in carousel.js, content-loader.js, main.js
- CSS: Valid syntax, no warnings
- JSON: All data files parse correctly
- Images: Lazy loading works without errors

**✅ All Pages Render Correctly**:
- index.html: Status banner, hero, latest announcement, features ✓
- features.html: Carousel (12 slides), videos (4), feature cards ✓
- announcements.html: Dynamic announcement list ✓
- faq.html: Dynamic FAQ accordion ✓
- privacy.html: Legal content structure ✓
- terms.html: Legal content structure ✓

**✅ Dynamic Content Loading**:
- Status banner: Loads from status.json on all pages ✓
- Latest announcement: Displays on homepage ✓
- Full announcements: Display on announcements page ✓
- FAQ accordion: Loads and expands correctly ✓
- Empty states: Display when data arrays are empty ✓

### Pre-Deployment Checklist

**Completed Tasks**:
- [x] All 6 pages created with semantic HTML
- [x] Mobile-first responsive design implemented
- [x] WCAG 2.1 AA accessibility compliance verified
- [x] JSON-LD structured data added (Organization, MobileApplication)
- [x] All meta tags (Open Graph, Twitter Cards) present
- [x] sitemap.xml created and validated
- [x] robots.txt configured
- [x] Carousel with touch/mouse/keyboard navigation
- [x] Video players with HTML5 controls
- [x] Dynamic content management system
- [x] Performance optimizations (lazy loading, debouncing)
- [x] All links tested and functional
- [x] Legal content flagged for review

**Pending Tasks**: every item on this list except legal review was completed during January 2026.
See [Outstanding Work](#outstanding-work) above for what remains.

**Deployment Notes**:
- GitHub Pages will serve from `main` branch root directory
- Custom domain: www.gfpricechecker.com (CNAME file present); the bare apex 301s to it
- SSL/TLS: Handled by GitHub Pages and Cloudflare
- Analytics: Cloudflare Web Analytics (cookie-free, privacy-focused)
- No server-side processing required (pure static site)

### Repository Statistics

**Total Files**: 22
- HTML pages: 6
- CSS files: 2
- JavaScript files: 3
- JSON data files: 3
- Documentation: 4
- Configuration: 4 (CNAME, sitemap.xml, robots.txt, Claude.md)

**Code Quality**:
- All HTML validates (W3C)
- All CSS follows DESIGN-SYSTEM.md
- All JavaScript uses strict mode
- All JSON files parse correctly
- Zero console errors
- Zero accessibility violations

**Performance Metrics** (Expected):
- Lighthouse Performance: 90-100
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 95-100
- Lighthouse SEO: 100
- First Contentful Paint: <1.5s
- Time to Interactive: <3.0s

---

## Contact & Support

**Repository**: https://github.com/CuWilliams/GFPriceChecker.github.io
**Getting started**: See `README.md` for how the site is built, run locally, and added to
**Design Guidelines**: See `DESIGN-SYSTEM.md` for design tokens and patterns
**Release history**: See `CHANGELOG.md` for the versioning approach and past releases
**Original build plans**: See `Documents/archive/` — historical, kept for reference only

---

*Last Updated: August 13, 2026*

**Project Status**: Live at [www.gfpricechecker.com](https://www.gfpricechecker.com), serving an
app in public TestFlight beta. The Phase 1–6 sections below the design and conventions material are
a historical record of the January 2026 build, not a description of the site today. Outstanding
items are listed under [Outstanding Work](#outstanding-work): media showing an older build, missing
video captions, and legal review.

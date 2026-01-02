# GF PriceChecker Website - Technical Requirements Document

**Version:** 1.0  
**Date:** January 2, 2026

---

## 1. Infrastructure

| Component | Specification |
|-----------|---------------|
| Hosting | GitHub Pages (static site) |
| DNS/CDN | Cloudflare |
| Source Control | GitHub |
| Development | VS Code |
| Analytics | Cloudflare Web Analytics |

---

## 2. Site Architecture

```
/
├── index.html (Home)
├── features.html
├── announcements.html
├── faq.html
├── privacy.html
├── terms.html
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── videos/
├── data/
│   ├── announcements.json
│   ├── faq.json
│   └── status.json
├── components/
│   └── (reusable HTML partials)
├── sitemap.xml
└── robots.txt
```

---

## 3. Page Specifications

**Home**
- Status banner (configurable via status.json)
- Latest announcement (pulled from announcements.json)
- Hero section with logo and tagline
- Navigation to all pages
- App Store badge placeholder (empty state)

**Features**
- App description content
- Horizontal carousel (12+ screenshots, stacked visual effect)
- Instructional videos (self-hosted)
- Feature highlights

**Announcements**
- Chronological list from announcements.json
- Empty state messaging when no announcements

**FAQ**
- Structured Q&A from faq.json
- Expandable/collapsible sections

**Privacy Policy / Terms of Use**
- Static legal content
- Last updated date

---

## 4. Content Management

| File | Purpose | Format |
|------|---------|--------|
| status.json | Banner state and message | `{ "state": "coming-soon", "message": "Coming Soon!" }` |
| announcements.json | News/updates list | Array of `{ "date", "title", "content" }` |
| faq.json | Questions and answers | Array of `{ "question", "answer" }` |

---

## 5. Component Library

| Component | Usage |
|-----------|-------|
| Button (primary) | CTAs, navigation actions |
| Button (secondary) | Alternative actions |
| Status banner | Home page, configurable states |
| Navigation bar | All pages, responsive |
| Footer | All pages, consistent |
| Card | Announcement items, feature highlights |
| Carousel | Features page, screenshot gallery |
| Accordion | FAQ expandable sections |
| Video player | Features page, instructional content |
| Empty state | Placeholder messaging |
| Badge | Status indicators, categories |

---

## 6. Carousel Specification

- Horizontal scroll with stacked visual effect
- Minimum capacity: 12 images (no upper limit)
- Touch swipe support (mobile)
- Click/drag support (desktop)
- Keyboard navigation (arrow keys)
- Indicator dots or progress display
- Lazy loading for performance

---

## 7. Video Specification

- Format: MP4 (H.264 codec)
- Resolution: 720p maximum
- File size: Under 50MB per video
- Native HTML5 video player
- Controls: play/pause, progress, fullscreen
- Poster image (thumbnail before play)

**Limitation:** GitHub Pages 100MB file limit, 1GB repository soft limit

---

## 8. Responsive Design

| Breakpoint | Range | Layout |
|------------|-------|--------|
| Mobile | 320px - 767px | Single column, hamburger menu, touch carousel |
| Tablet | 768px - 1023px | Flexible grid, visible navigation |
| Desktop | 1024px+ | Full layout, horizontal navigation |

Mobile-first development approach.

---

## 9. Accessibility (WCAG 2.1 AA)

- Color contrast ratio minimum 4.5:1 (text), 3:1 (large text/UI)
- Keyboard navigation for all interactive elements
- Focus indicators visible
- Alt text on all images
- ARIA labels where semantic HTML insufficient
- Skip navigation link
- Video captions (future consideration)

---

## 10. SEO Implementation

| Element | Implementation |
|---------|----------------|
| Semantic HTML5 | Proper heading hierarchy (h1-h6), landmarks (nav, main, article, footer) |
| Meta tags | Unique title and description per page |
| Open Graph | og:title, og:description, og:image, og:url per page |
| Twitter Cards | twitter:card, twitter:title, twitter:description, twitter:image |
| Canonical URLs | Self-referencing canonical on each page |
| sitemap.xml | All pages listed, updated on content changes |
| robots.txt | Allow all crawlers, reference sitemap |
| JSON-LD | Organization schema (Home), WebApplication schema (Features) |

---

## 11. Design Tokens

| Token | Value |
|-------|-------|
| Primary color | Blue (exact hex to be finalized from logo) |
| Background | Light neutral (no gradient) |
| Text primary | Dark gray/black (AA compliant against background) |
| Text secondary | Medium gray (AA compliant) |
| Font family | To be finalized (distinctive, non-generic) |
| Border radius | Consistent value across components |
| Spacing scale | 4px base unit (4, 8, 16, 24, 32, 48) |

---

## 12. Future Placeholders

| Feature | Placeholder Approach |
|---------|---------------------|
| Contact email | "Contact coming soon" with empty state styling |
| Contact form | Hidden/disabled form section |
| Community | Navigation item disabled or hidden |
| App Store link | Badge with "Coming Soon" overlay |

---

## 13. Technical Constraints

| Constraint | Impact |
|------------|--------|
| GitHub Pages static only | No server-side processing, forms require third-party service |
| 100MB file limit | Videos must be compressed |
| 1GB repo soft limit | Monitor total asset size |
| No cookies (analytics) | Cloudflare Web Analytics only |

---

## 14. Browser Support

- Chrome (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari (latest 2 versions)
- Chrome Android (latest 2 versions)

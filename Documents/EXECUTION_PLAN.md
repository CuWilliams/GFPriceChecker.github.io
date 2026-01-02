# GF PriceChecker Website - Execution Plan

**Version:** 1.0  
**Date:** January 2, 2026  
**Reference:** Technical Requirements Document v1.0

---

## How to Use This Document

Each **Phase** is designed for focused work sessions with Claude Code.

**Work Pattern:**
1. Complete pre-execution setup tasks
2. Read phase objective
3. Open Claude Code
4. Provide prompt from phase
5. Test thoroughly using VS Code Live Server
6. Commit if successful
7. Move to next phase

---

## Pre-Execution Setup

Complete the following before starting Phase 1.

| Task | Status |
|------|--------|
| Create GitHub repository | ☐ |
| Enable GitHub Pages | ☐ |
| Configure Cloudflare DNS to GitHub Pages | ☐ |
| Enable Cloudflare Web Analytics, obtain site tag | ☐ |
| Prepare logo files (SVG, PNG) | ☐ |
| Prepare app screenshots (12+) | ☐ |
| Prepare video files (MP4, <50MB each, 720p) | ☐ |
| Install VS Code Live Server extension | ☐ |

---

## Phase 1: Project Foundation

**Objective:** Initialize project structure, claude.md, component library foundation, and base styling.

**Claude Code Prompt:**
```
I am building a static website for GF PriceChecker, an iOS app for tracking gluten-free product price differentials for Canadian tax deductions.

Read /mnt/skills/public/frontend-design/SKILL.md before proceeding.

Initialize the project with:

1. Create claude.md for project documentation

2. Create folder structure:
   /assets/css/
   /assets/js/
   /assets/images/
   /assets/videos/
   /data/
   /components/

3. Create base CSS with:
   - CSS custom properties for design tokens
   - Primary color: #0000FF (blue, refine as needed from brand)
   - Light neutral background
   - System font stack
   - Spacing scale (4px base)
   - WCAG 2.1 AA compliant color contrast

4. Create component library CSS for:
   - Buttons (primary, secondary)
   - Navigation bar (responsive)
   - Footer
   - Status banner
   - Cards
   - Accordion
   - Empty state
   - Badge

5. Create base JavaScript for:
   - Mobile navigation toggle
   - Component initialization pattern

6. Create index.html skeleton with:
   - Semantic HTML5 structure
   - Meta tags, Open Graph, Twitter Cards
   - Navigation placeholder
   - Footer placeholder
   - Cloudflare Analytics script (placeholder for site tag)

Target: Mobile-first, responsive at 768px and 1024px breakpoints.
Accessibility: Keyboard navigation, focus indicators, ARIA labels where needed.
```

**Acceptance Criteria:**
- [ ] Project structure created
- [ ] Base styles render correctly in browser
- [ ] Components visually consistent
- [ ] Mobile navigation functional
- [ ] Local server displays index.html

**Testing:**
- Open with VS Code Live Server
- Test at mobile, tablet, desktop widths
- Verify keyboard navigation on interactive elements

---

## Phase 2: Content Data Structure

**Objective:** Create JSON data files and JavaScript to load/render dynamic content.

**Claude Code Prompt:**
```
Continuing GF PriceChecker website development.

Create content management system:

1. Create /data/status.json:
   - state: "coming-soon" | "testflight" | "available" | "maintenance"
   - message: Display text
   - link: Optional URL

2. Create /data/announcements.json:
   - Array of { id, date, title, content }
   - Include 1 sample announcement

3. Create /data/faq.json:
   - Array of { id, question, answer }
   - Include 3 sample FAQ items

4. Create /assets/js/content-loader.js:
   - Fetch and parse JSON files
   - Render status banner from status.json
   - Render latest announcement on home page
   - Render full announcement list on announcements page
   - Render FAQ accordion from faq.json
   - Handle empty states with appropriate messaging

5. Update index.html to use content loader for status banner and latest announcement

Ensure graceful error handling if JSON fails to load.
```

**Acceptance Criteria:**
- [ ] JSON files valid and parseable
- [ ] Status banner displays from data
- [ ] Content loader handles missing/empty data
- [ ] Empty state messages display correctly

**Testing:**
- Modify JSON values, verify UI updates
- Delete JSON content, verify empty states appear
- Check browser console for errors

---

## Phase 3: Core Pages

**Objective:** Build all page templates with full structure and SEO.

**Claude Code Prompt:**
```
Continuing GF PriceChecker website development.

Create all page templates:

1. Complete index.html (Home):
   - Hero section with logo and tagline "Compare, Save, Claim"
   - Status banner (from data)
   - Latest announcement section (from data)
   - App Store badge placeholder with "Coming Soon" empty state
   - Full navigation
   - Footer with placeholder contact link

2. Create features.html:
   - App description content section
   - Placeholder for carousel (Phase 4)
   - Placeholder for videos (Phase 4)
   - Feature highlights using card components

3. Create announcements.html:
   - Full announcement list from data
   - Empty state if no announcements

4. Create faq.html:
   - Accordion component with FAQ data
   - Empty state if no FAQ items

5. Create privacy.html:
   - Static content structure
   - "Last updated" date
   - Placeholder legal text

6. Create terms.html:
   - Static content structure
   - "Last updated" date
   - Placeholder legal text

Each page must include:
- Unique title and meta description
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags
- Canonical URL
- Consistent navigation and footer

Create sitemap.xml listing all pages.
Create robots.txt allowing all crawlers, referencing sitemap.
```

**Acceptance Criteria:**
- [ ] All 6 pages render correctly
- [ ] Navigation works between all pages
- [ ] SEO meta tags present on each page
- [ ] sitemap.xml and robots.txt valid

**Testing:**
- Navigate all pages via links
- Validate HTML (W3C validator)
- Check meta tags in page source
- Test responsive layouts at all breakpoints

---

## Phase 4: Interactive Features

**Objective:** Implement carousel and video player on Features page.

**Claude Code Prompt:**
```
Continuing GF PriceChecker website development.

Implement interactive features:

1. Create screenshot carousel for features.html:
   - Horizontal scroll with stacked visual effect
   - Support for 12+ images
   - Touch swipe on mobile
   - Click/drag on desktop
   - Keyboard navigation (arrow keys)
   - Progress indicator (dots or bar)
   - Lazy loading for images
   - Placeholder images until real screenshots provided

2. Create video section for features.html:
   - HTML5 video player
   - Controls: play/pause, progress, fullscreen
   - Poster image support
   - Placeholder video or message until real videos provided

3. Ensure both components are:
   - Accessible (keyboard, screen reader)
   - Responsive at all breakpoints
   - Performant (lazy loading, no layout shift)

Place carousel and video JavaScript in appropriate modules.
```

**Acceptance Criteria:**
- [ ] Carousel navigates via touch, mouse, and keyboard
- [ ] Carousel handles 12+ images without performance issues
- [ ] Video player controls functional
- [ ] Both components responsive
- [ ] Placeholders display correctly

**Testing:**
- Test carousel on mobile device or emulator
- Test keyboard navigation (Tab, Arrow keys)
- Test video playback
- Verify no console errors

---

## Phase 5: SEO and Accessibility Audit

**Objective:** Implement structured data and verify compliance.

**Claude Code Prompt:**
```
Continuing GF PriceChecker website development.

Complete SEO and accessibility:

1. Add JSON-LD structured data:
   - Organization schema on index.html
   - WebApplication schema on features.html

2. Accessibility audit and fixes:
   - Verify all images have alt text
   - Verify color contrast meets WCAG 2.1 AA (4.5:1 text, 3:1 UI)
   - Add skip navigation link
   - Verify focus indicators on all interactive elements
   - Verify ARIA labels on components without semantic HTML equivalents
   - Test carousel and accordion with keyboard only

3. Performance check:
   - Verify lazy loading on carousel images
   - Verify no render-blocking resources where avoidable

Document any issues found and fixes applied in claude.md.
```

**Acceptance Criteria:**
- [ ] JSON-LD validates (Google Rich Results Test)
- [ ] All accessibility checks pass
- [ ] Keyboard-only navigation functional throughout site
- [ ] No critical performance issues

**Testing:**
- Run Lighthouse audit (Accessibility, SEO, Performance)
- Test with keyboard only (no mouse)
- Validate structured data with Google's testing tool

---

## Phase 6: Final Polish and Deployment Preparation

**Objective:** Replace placeholders, add analytics, final review.

**Claude Code Prompt:**
```
Continuing GF PriceChecker website development.

Final preparation:

1. Replace placeholder content:
   - Add actual logo files to /assets/images/
   - Update all logo references
   - Add actual app screenshots to carousel (or confirm placeholders acceptable for launch)
   - Add actual videos (or confirm placeholders acceptable for launch)

2. Add Cloudflare Web Analytics:
   - Insert site tag script in all pages
   - Verify placement per Cloudflare documentation

3. Review and update:
   - status.json set to initial launch state ("Coming Soon!")
   - announcements.json with launch announcement
   - Privacy policy and Terms of use placeholder text flagged for legal review

4. Final checks:
   - All links functional
   - All images load
   - No console errors
   - Responsive at all breakpoints

5. Update claude.md with final project state and any notes for future development.

Prepare for commit and push to GitHub for Pages deployment.
```

**Acceptance Criteria:**
- [ ] All assets in place (or documented as pending)
- [ ] Analytics script present
- [ ] No broken links or missing images
- [ ] Site ready for GitHub Pages deployment

**Testing:**
- Full site walkthrough at all breakpoints
- Verify analytics script in page source
- Final Lighthouse audit

---

## Post-Deployment

After GitHub Pages deployment:

| Task | Action |
|------|--------|
| Verify live site | Check all pages at production URL |
| Verify Cloudflare Analytics | Confirm data appearing in dashboard |
| Test on real mobile device | Verify touch interactions, video playback |
| Submit sitemap to Google Search Console | Optional, accelerates indexing |

---

## Technical Constraints Reference

| Constraint | Limit |
|------------|-------|
| Video file size | <50MB per file (720p, H.264) |
| GitHub Pages file limit | 100MB per file |
| Repository size | 1GB soft limit |
| Analytics | Cloudflare Web Analytics (no cookies) |

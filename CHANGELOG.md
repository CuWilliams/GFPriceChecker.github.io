# Changelog

Release history for the **GF PriceChecker website** ([gfpricechecker.com](https://www.gfpricechecker.com)).

Changes to the iOS app are tracked separately in the [app repository](https://github.com/CuWilliams/GFPriceChecker).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Versioning

The site is a continuously deployed static site: every merge to `main` is live within a minute or two. Tags mark meaningful states rather than deployments.

- **Minor** (`1.1.0` → `1.2.0`) — a content release: new pages, a substantive rewrite, or a new site feature.
- **Patch** (`1.2.0` → `1.2.1`) — corrections, copy fixes, dependency-free housekeeping.
- **Major** — a redesign or a change in what the site is for.

Routine blog posts and announcements are content edits, not releases, and don't get tags.

To cut a release: move the `[Unreleased]` entries below into a new version heading, then tag `main` and publish a matching GitHub Release so the two don't drift apart.

```
git tag -a v1.3.0 -m "Short description of the release"
git push origin v1.3.0
gh release create v1.3.0 --title "v1.3.0 - Short description" --notes-file <notes>
```

---

## [Unreleased]

### Fixed
- Pointed every absolute URL at the canonical host, `https://www.gfpricechecker.com`
  ([#14](https://github.com/CuWilliams/GFPriceChecker.github.io/issues/14)). `CNAME` has held `www`
  since June, but all 51 URLs in the markup and config used the bare apex, which 301-redirects — so
  every self-referencing canonical, Open Graph and Twitter URL, JSON-LD entry, `sitemap.xml`
  `<loc>`, and the `Sitemap:` line in `robots.txt` pointed at a redirect. The apex still redirects
  to `www` as before; only the stated canonical changed.

---

## [1.2.0] - 2026-08-12

Content overhaul aligning the site with the app as it works today ([#11](https://github.com/CuWilliams/GFPriceChecker.github.io/issues/11), [#13](https://github.com/CuWilliams/GFPriceChecker.github.io/pull/13)).

### Changed
- Rewrote site copy to describe the app as it works today: unit price differential adjusted for
  package size as the headline metric, the three-step capture review (name, price, size), optional
  size entry, and the receipt verification flow.
- Removed claims that the app's reports are CRA-compliant or accepted by the Canada Revenue Agency.
  The Medical Expense Tax Credit is now presented as context for why the app exists, with the
  ~3%-of-net-income threshold stated plainly. This matches the app, which removed agency branding
  from its own interface in April 2026.
- Updated the advocacy section on the home page: petition e-6853 was declined by the government in
  March 2026.
- Replaced the "Coming Soon" / waitlist calls to action with links to the TestFlight beta, live
  since January 2026.
- Corrected the privacy claim on the features page — backup files are not encrypted.
- Rewrote `README.md` to document this website repository rather than the iOS app.
- Repurposed this changelog for the website; it previously tracked app development.
- Archived the original build plans to `Documents/archive/`.

### Added
- Announcement covering build 8 and the move to unit pricing.
- FAQ entries on unit pricing, optional size capture, receipt verification, and data storage.
- Notes above the screenshot carousel and walkthrough videos flagging that they show an earlier
  build.

### Fixed
- The pre-JavaScript status banner fallback still read "Coming Soon! GF PriceChecker is currently in
  development" on five of six pages, contradicting the beta call to action alongside it whenever
  JavaScript was slow, blocked, or disabled.
- Announcements rendered as a single unbroken block with Markdown links shown as literal text.
  Paragraph handling now uses the same `preserveLineBreaks` helper as the blog, promoted from
  `blog-loader.js` into the shared `utils.js`.
- The home page printed the entire text of the latest announcement instead of a preview.
- Every blog post and announcement date displayed one day early for readers west of UTC — including
  everyone in Canada. `YYYY-MM-DD` strings were parsed as UTC midnight and then rendered in local
  time; they're now built as local dates.
- Stale `lastmod` dates in `sitemap.xml`; `blog.html` claimed January while carrying posts through
  August.

---

## [1.1.0] - 2026-08-12

Pre-overhaul snapshot: the site as it stood before the content rewrite above.

### Added
- Beta page with TestFlight instructions, testing focus areas, and the public join link.
- Developer blog rendered from `data/blog.json`, with a GitHub Actions workflow that emails a
  reminder to write one whenever a pull request merges.
- Three walkthrough videos with poster images, and a fourteen-slide screenshot carousel.
- "Why GF PriceChecker Exists" section on the home page covering the Medical Expense Tax Credit and
  Celiac Canada's advocacy.
- Cloudflare Web Analytics across all pages.
- Custom domain via `CNAME`.

### Changed
- Extracted the navigation and footer into runtime-injected components under `components/`.
- Extracted shared helpers into `assets/js/utils.js` (`fetchJSON`, `escapeHtml`, `formatDate`,
  `renderEmptyState`, `renderCard`).
- Site-wide status moved from "coming soon" to public beta.

## [1.0.0] - 2026-01-03

Initial public site.

### Added
- Home, features, announcements, FAQ, privacy, and terms pages.
- JSON-driven content system for announcements, FAQ entries, and the status banner.
- Design system with shared tokens (`DESIGN-SYSTEM.md`), base and component stylesheets.
- SEO metadata, Open Graph tags, JSON-LD structured data, `sitemap.xml`, and `robots.txt`.
- Accessibility pass: skip links, ARIA labelling, keyboard-navigable carousel.
- MIT license.

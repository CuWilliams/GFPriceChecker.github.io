# GFPriceChecker.github.io

The marketing and documentation website for **GF PriceChecker**, an iOS app that helps Canadians measure and document the price premium on gluten-free groceries.

Live at [gfpricechecker.com](https://www.gfpricechecker.com). The app itself lives in a separate repository: [CuWilliams/GFPriceChecker](https://github.com/CuWilliams/GFPriceChecker).

## How the site is built

A static site served directly by GitHub Pages from the root of `main`. There is **no build step, no bundler, and no dependencies** — hand-authored HTML, CSS, and vanilla JavaScript. Push to `main` and it deploys.

Two ideas do most of the work:

**Shared components are fetched at runtime.** Every page contains `<div id="navbar-placeholder"></div>` and `<div id="footer-placeholder"></div>`. On load, `assets/js/components.js` fetches `components/navbar.html` and `components/footer.html` and injects them, then re-runs the nav initializers from `main.js` against the newly inserted DOM. Edit the nav or footer once, in `components/`, and every page picks it up.

**Content that changes often lives in JSON.** Blog posts, announcements, FAQ entries, and the status banner are data files under `data/`, rendered client-side by `content-loader.js` and `blog-loader.js`. Adding a post means editing JSON, not HTML.

## Layout

```
├── index.html                 # Home
├── features.html              # What the app does, screenshots, walkthrough videos
├── beta.html                  # TestFlight instructions and testing focus areas
├── blog.html                  # Developer blog (rendered from data/blog.json)
├── announcements.html         # Release announcements
├── faq.html                   # Frequently asked questions
├── privacy.html, terms.html   # Legal
│
├── components/                # navbar.html, footer.html — injected at runtime
├── data/                      # blog.json, announcements.json, faq.json, status.json
├── assets/
│   ├── css/                   # base.css (tokens, reset, utilities), components.css
│   ├── js/                    # utils.js, components.js, content-loader.js,
│   │                          #   blog-loader.js, main.js
│   ├── images/                # logos, favicon, OG image, screenshots/, video posters
│   └── video/                 # walkthrough videos (keep under 50MB each)
│
├── scripts/                   # validate-data.js — schema check for data/, run in CI
│
├── Documents/archive/         # Historical build plans from the site's construction
├── CHANGELOG.md               # Site release history
├── DESIGN-SYSTEM.md           # Design tokens and component reference
└── Claude.md                  # Working notes and conventions for this repo
```

Script load order matters: `utils.js` defines `window.GFUtils` and must come before `content-loader.js` and `blog-loader.js`, which consume it.

## Running locally

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`. A server is required rather than opening the files directly — the component includes and JSON loading both use `fetch()`, which browsers block on `file://` URLs.

## Adding content

**A blog post** — prepend an object to `data/blog.json`:

```json
{
  "id": "2026-08-12-post-slug",
  "date": "2026-08-12",
  "title": "Post Title",
  "content": "First paragraph.\n\nSecond paragraph."
}
```

Separate paragraphs with `\n\n`. Content is escaped before rendering, so write plain prose — Markdown is not parsed, and any HTML you include will be shown as literal text. Posts are sorted by date, newest first, so file order doesn't matter. The `id` becomes the anchor (`/blog.html#post-<id>`), so keep it stable once published.

**An announcement** — the same shape, in `data/announcements.json`. The home page shows a preview of the most recent one.

**An FAQ entry** — `data/faq.json`, with `id`, `question`, and `answer`. These render as an accordion in file order.

**The status banner** — `data/status.json` drives the banner on every page. Each page also hardcodes a matching fallback so the banner still reads correctly before JavaScript runs; if you change the state here, update those fallbacks too.

After editing any data file, validate it:

```
node scripts/validate-data.js
```

That checks every file parses, that each entry has its required fields as non-empty strings, that `id` values are unique and safe to use as URL anchors, and that dates are real `YYYY-MM-DD` calendar dates. It runs in CI on every push and pull request to `main` (`.github/workflows/validate-data.yml`) and needs no dependencies beyond Node.

The check exists because these failures are otherwise invisible: a malformed file renders an empty state in the browser with no error, and a missing `id` renders a post that looks fine while the home page's "Read More" link points at `#post-undefined`. The loaders now skip entries missing the fields they need, and say so in the console — but that is a backstop, not the check.

## Writing conventions

The app deliberately carries no Canada Revenue Agency branding in its interface — tracking price differences is the app's job, and what a user does with those records at tax time is between them and their accountant. **The site follows the same rule.** Explain the Medical Expense Tax Credit as context for why the app exists, but don't describe the app's output as CRA-compliant, approved, or endorsed, and don't promise anyone a deduction.

Beyond that, see [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) for design tokens and component patterns, and [Claude.md](Claude.md) for the fuller set of working notes.

## Releases

Site releases are annotated git tags on `main`, with history in [CHANGELOG.md](CHANGELOG.md). See the top of that file for the versioning approach.

## Contact

- **X (Twitter):** [@CurtisWill3z](https://x.com/CurtisWill3z)
- **LinkedIn:** [Curtis Williams](https://www.linkedin.com/in/curtis-williams-154382b3)
- **Email:** gfpricechecker@gmail.com

## License

MIT License — see [LICENSE](LICENSE).

Copyright (c) 2025 Curtis Williams

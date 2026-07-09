# Current Focus — Gadi Bitton Website Rebuild

**Status: Live, deployed, no open work.**

## What this is
Modern static-site rebuild of the legacy [gadibitton.co.il](http://www.gadibitton.co.il/) — Gadi Bitton, Israeli folk dance choreographer/session leader/event producer. Original site ran on an old (2004-era) Daronet table-based CMS.

## Live links
- **Live site:** https://michael1305.github.io/gadi-bitton-dance/
- **Repo:** https://github.com/michael1305/gadi-bitton-dance (public, deploys via GitHub Pages from `main` branch root on every push)
- **Local project dir:** `D:\CLAUDE\BITNUA`

## Scope shipped
Static HTML/CSS/JS, no build step, RTL Hebrew, Heebo font.

- `index.html` — home
- `about.html` — full bio (Hebrew + English), scraped from original site
- `production.html` — event/production history
- `dances.html` — searchable/sortable catalog of 340 dances Gadi choreographed (`data/dances.json` + `js/dances.js`). Clicking a row opens a modal with the dance's full detail: performer photo, YouTube dance-video embed, YouTube song-clip embed, and lyrics — scraped from all 340 individual detail pages on the legacy site. Fields degrade gracefully when a dance is missing some of them (many are).
- `classes.html` — 3 weekly class listings
- `gallery.html` — 24 real photos with lightbox
- `media.html` — press/TV appearances, tabbed
- `contact.html` — real contact info (phone/fax/email/social) + form

All content/images scraped from the live legacy site (not placeholders). Real brand assets sourced from user-provided local files (not recreated):
- `images/site/logo.png` — full "gadibitton" wordmark lockup, used in the desktop header
- `images/site/icon.png` / `favicon.png` — standalone circular leaping-dancer mark (from user's `LOGO C.jpg`, circle-masked to transparent PNG), used as favicon, mobile-compact header logo, footer brand mark, and the dance-modal no-photo fallback
- `images/dances/{id}.jpg` — 332 performer photos (incl. 4 legacy BMP files converted via `bmp-js`)

## English (LTR) version
Full English translation of all 8 pages lives under `/en/` (e.g. `en/about.html`), sharing `css/style.css`, `js/main.js`, `js/dances.js`, `data/dances.json`, and all `images/` with the Hebrew site via `../` relative paths. Each Hebrew page has an "English" nav link to its `/en/` counterpart, and vice versa ("עברית" link back). `js/dances.js` is now i18n-aware: it reads `document.documentElement.lang` for UI strings (counts, meta labels, video tab labels, dance-style names) and `window.SITE_BASE` (set inline to `'../'` only on English pages) to resolve the JSON fetch and photo paths correctly from the subfolder. `css/style.css` has an `html[dir="ltr"]` override block at the bottom for the handful of hardcoded RTL-physical properties (bullet position, hero badge corner, logo-tagline border, table header alignment) — everything else (grids/flex) mirrors automatically via the `direction` property.

## Name translations (English dances page)
`data/dances.json` now also carries `performerEn` / `choreographerEn` / `lyricistEn` / `composerEn` fields — transliterated English versions of all 417 unique Hebrew person-name strings across those four fields, applied via a one-off script (not kept in the repo). `js/dances.js`'s `loc(dance, field)` helper picks the `*En` field on English pages, falling back to the Hebrew original if missing. The English dances table dropped the redundant "Hebrew Name" column entirely (4 columns instead of 5); the modal still shows the Hebrew dance name as a small secondary caption under the English title. **Song lyrics are deliberately NOT translated** — user asked, then explicitly declined once the copyright risk of publishing translated lyrics at scale (~307 songs) was explained. Lyrics stay Hebrew-only on both language versions; left as-is per user's "נשאיר בנתיים כך."

## Deliberately out of scope
Hundreds of historical event-archive pages (1996–2016, per venue/year) from the original site were **excluded by explicit user choice** — not an oversight. If asked to add "the old events" or similar, that's this archive.

## Open decision: pointing the real domain here
User asked about pointing gadibitton.co.il (the real domain, currently the old Daronet site) at this new site, and preserving access to the old archive. I explained the options (keep old site on a subdomain like old.gadibitton.co.il, vs. link out to Wayback Machine, vs. drop it) but the **user dismissed the choice — not decided yet**. Domain DNS changes need to happen on the user's end (registrar access I don't have); I can prep a CNAME file + GitHub Pages custom-domain setting whenever they're ready to move forward.

## Fixed bugs worth knowing about
- **Mobile hamburger menu was invisible** — `backdrop-filter` on `.site-header` made it the CSS containing block for the fixed-position `.main-nav` drawer, collapsing its visible height to ~40px instead of the full viewport. Fixed by dropping the blur and using a solid header background. See memory: `feedback_backdrop_filter_fixed_position_bug`.
- **Mobile menu looked broken (huge empty space)** — after the above fix, the drawer correctly spanned the full viewport height but left a large empty block below the (short) link list. Redesigned as a content-sized dropdown (`max-height` capped, slides down with a shadow) instead of a fixed full-height panel.

## Open items / possible next steps (none currently requested)
- No CMS/editing workflow — content is static HTML, edits require a code change + git push.
- Contact form submits via `mailto:` (client-side only, no backend) — fine for low volume, would need a form backend (e.g. Formspree) for anything heavier.
- No analytics wired up.
- Media page press/TV images are icon placeholders (real old thumbnails weren't migrated) — could add real ones later if wanted.
- Custom domain (gadibitton.co.il) not yet pointed at the new site — see "Open decision" above.

_Last updated: 2026-07-09_

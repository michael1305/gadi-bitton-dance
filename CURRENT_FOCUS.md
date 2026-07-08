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

## Deliberately out of scope
Hundreds of historical event-archive pages (1996–2016, per venue/year) from the original site were **excluded by explicit user choice** — not an oversight. If asked to add "the old events" or similar, that's this archive.

## Fixed bugs worth knowing about
- **Mobile hamburger menu was invisible** — `backdrop-filter` on `.site-header` made it the CSS containing block for the fixed-position `.main-nav` drawer, collapsing its visible height to ~40px instead of the full viewport. Fixed by dropping the blur and using a solid header background. See memory: `feedback_backdrop_filter_fixed_position_bug`.

## Open items / possible next steps (none currently requested)
- No CMS/editing workflow — content is static HTML, edits require a code change + git push.
- Contact form submits via `mailto:` (client-side only, no backend) — fine for low volume, would need a form backend (e.g. Formspree) for anything heavier.
- No analytics wired up.
- Media page press/TV images are icon placeholders (real old thumbnails weren't migrated) — could add real ones later if wanted.

_Last updated: 2026-07-08_

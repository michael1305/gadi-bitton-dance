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
- `dances.html` — searchable/sortable catalog of 340 dances Gadi choreographed (`data/dances.json` + `js/dances.js`)
- `classes.html` — 3 weekly class listings
- `gallery.html` — 24 real photos with lightbox
- `media.html` — press/TV appearances, tabbed
- `contact.html` — real contact info (phone/fax/email/social) + form

All content/images scraped from the live legacy site (not placeholders). Real brand logo (`images/site/logo.png`, `favicon.png`) sourced from user's local file, not recreated.

## Deliberately out of scope
Hundreds of historical event-archive pages (1996–2016, per venue/year) from the original site were **excluded by explicit user choice** — not an oversight. If asked to add "the old events" or similar, that's this archive.

## Open items / possible next steps (none currently requested)
- No CMS/editing workflow — content is static HTML, edits require a code change + git push.
- Contact form submits via `mailto:` (client-side only, no backend) — fine for low volume, would need a form backend (e.g. Formspree) for anything heavier.
- No analytics wired up.
- Media page press/TV images are icon placeholders (real old thumbnails weren't migrated) — could add real ones later if wanted.

_Last updated: 2026-07-08_

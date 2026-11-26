// Renders a landing page (beginners / harkadot) from its content object.
// Content = the copy saved from the back office in Firestore (sitePages/<id>), falling back to
// LANDING_DEFAULTS when nothing is saved yet or Firestore is unreachable. Firestore is read through
// its public REST endpoint (rules allow anyone to read these two collections), so no SDK is loaded.
(function () {
  const PAGE_ID = document.body.dataset.page;
  const FS = 'https://firestore.googleapis.com/v1/projects/club-app-8f954/databases/(default)/documents/';
  const KEY = 'AIzaSyCOBQNSRju9Fgxy3_DZAWapzuyv0DoUUCo';
  const BYDAY = { 'ראשון': 'SU', 'שני': 'MO', 'שלישי': 'TU', 'רביעי': 'WE', 'חמישי': 'TH', 'שישי': 'FR', 'שבת': 'SA' };
  const WEEKDAY = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };
  const SLUG = { SU: 'sun', MO: 'mon', TU: 'tue', WE: 'wed', TH: 'thu', FR: 'fri', SA: 'sat' };

  const $ = id => document.getElementById(id);
  const pad = n => String(n).padStart(2, '0');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // Language: Hebrew (default) or English (?lang=en / the toggle in the header; remembered on this device).
  const EN = window.LANDING_EN;
  let LANG = (() => {
    const q = new URLSearchParams(location.search).get('lang');
    if (q) return q === 'en' && EN ? 'en' : 'he';
    try { return localStorage.getItem('landingLang') === 'en' && EN ? 'en' : 'he'; } catch (e) { return 'he'; }
  })();
  const T = s => LANG === 'en' ? EN.tr(s) : (s ?? '');
  const dayName = g => LANG === 'en' ? EN.UI.day(g.day) : g.day;
  const fill = (tpl, g) => String(T(tpl) || '').replace(/\{day\}/g, dayName(g)).replace(/\{time\}/g, LANG === 'en' ? g.time : '⁦' + g.time + '⁩').replace(/\{place\}/g, T(g.place));
  function setUrl(gSlug) {
    const p = new URLSearchParams(location.search);
    if (gSlug !== undefined) p.set('g', gSlug);
    if (LANG === 'en') p.set('lang', 'en'); else p.delete('lang');
    history.replaceState(null, '', location.pathname + (String(p) ? '?' + p : '') + location.hash);
  }
  let heTitle = '';
  function applyLang() {
    const en = LANG === 'en';
    document.documentElement.lang = en ? 'en' : 'he';
    document.documentElement.dir = en ? 'ltr' : 'rtl';
    document.querySelectorAll('[data-en]').forEach(el => {
      if (el.dataset.he === undefined) el.dataset.he = el.textContent;
      el.textContent = en ? el.dataset.en : el.dataset.he;
    });
    if (!heTitle) heTitle = document.title;
    document.title = en ? (EN.UI.title[PAGE_ID] || heTitle) : heTitle;
    const b = $('b-lang');
    if (b) { b.hidden = !EN; b.textContent = en ? 'עברית' : 'English'; b.lang = en ? 'he' : 'en'; }
  }

  function fsGet(path, ms) {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), ms);
    return fetch(FS + path + '?key=' + KEY, { signal: ctl.signal, cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .catch(() => null)
      .finally(() => clearTimeout(t));
  }

  // Image fields hold either a site path (images/...) or "img:<id>" = an upload stored in siteImages/<id>.
  const imgCache = {};
  function resolveImg(v) {
    if (!v || !String(v).startsWith('img:')) return Promise.resolve(v || '');
    const id = String(v).slice(4);
    if (!imgCache[id]) {
      imgCache[id] = fsGet('siteImages/' + encodeURIComponent(id), 8000)
        .then(doc => doc?.fields?.src?.stringValue || '');
    }
    return imgCache[id];
  }

  function nextSession(g) {
    const [hh, mm] = String(g.time || '20:00').split(':').map(Number);
    const dur = (+g.durationMin || 120) * 60000;
    const now = new Date();
    let s;
    if (g.start) {
      const [y, m, d] = g.start.split('-').map(Number);
      s = new Date(y, m - 1, d, hh, mm);
    } else {
      s = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm);
      const want = WEEKDAY[BYDAY[g.day]] ?? s.getDay();
      s.setDate(s.getDate() - ((s.getDay() - want + 7) % 7));
    }
    while (s.getTime() + dur < now.getTime()) s.setDate(s.getDate() + 7);
    return s;
  }

  const stamp = dt => `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;
  const fmtDate = iso => { const [, m, d] = iso.split('-'); return `${+d}.${+m}`; };

  // Optional per-day colour (#rrggbb): replaces the purple of the header, the selected tab and the
  // schedule headings. Light colours are darkened until white text on them stays readable.
  const BASE = { main: '#2d1b4e', deep: '#1a0f30' };
  function shade(hex, f) {
    const n = parseInt(hex.slice(1), 16);
    const c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.max(0, Math.min(255, Math.round(v * f))));
    return '#' + c.map(v => v.toString(16).padStart(2, '0')).join('');
  }
  function lum(hex) {
    const n = parseInt(hex.slice(1), 16);
    const l = [n >> 16, (n >> 8) & 255, n & 255].map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); });
    return .2126 * l[0] + .7152 * l[1] + .0722 * l[2];
  }
  // Light colours (e.g. yellow) keep their real shade and switch the text on them to black;
  // dark colours keep white text.
  function dayColor(g) {
    if (!/^#[0-9a-f]{6}$/i.test(g.color || '')) return null;
    const main = g.color.toLowerCase();
    const light = lum(main) > .3;
    return light
      ? { main, deep: shade(main, .82), ink: '#141414', accent: '#5c2a00', logo: 'images/site/logo-dark.png' }
      : { main, deep: shade(main, .55), ink: '#fff', accent: '', logo: '' };
  }
  function applyColor(c) {
    const s = document.documentElement.style;
    const v = c || BASE;
    s.setProperty('--plum', v.main);
    s.setProperty('--plum-deep', v.deep);
    if (c && c.accent) { s.setProperty('--on-day', c.ink); s.setProperty('--on-day-accent', c.accent); }
    else { s.removeProperty('--on-day'); s.removeProperty('--on-day-accent'); }
    document.documentElement.classList.toggle('light-day', !!(c && c.accent));
    const logo = document.querySelector('.brand-logo');
    if (logo) logo.src = (c && c.logo) || 'images/site/logo-white.png';
    const meta = document.querySelector('meta[name=theme-color]');
    if (meta) meta.content = v.main;
  }
  let C, current = 0;

  function renderStatic() {
    const h = C.hero || {}, t = C.texts || {};
    $('brand-text').textContent = T(h.brand);
    $('h-l1').textContent = T(h.l1);
    $('h-l2').textContent = T(h.l2);
    $('h-l1').parentElement.hidden = !h.l1 && !h.l2;
    $('h-tag').textContent = T(h.tag);
    $('h-tag').hidden = !h.tag;
    $('h-lead').textContent = T(h.lead);

    $('details-h').textContent = T(t.detailsTitle);
    $('price-k').textContent = T(t.priceLabel);
    $('price-note').textContent = T(t.priceNote);
    $('join-text').textContent = T(t.joinText);
    $('sched-btn-text').textContent = T(String(t.scheduleTitle || '').trim() || 'לוח זמנים');

    const groups = C.groups || [];
    const picker = $('picker');
    picker.style.gridTemplateColumns = `repeat(${Math.max(groups.length, 1)}, 1fr)`;
    picker.hidden = groups.length < 2;
    picker.innerHTML = groups.map((g, i) =>
      `<button role="tab" data-i="${i}" aria-selected="false" style="${dayColor(g) ? '--day:' + dayColor(g).main : ''}"><strong>${LANG === 'en' ? esc(EN.UI.day(g.day)) : 'יום ' + esc(g.day)}</strong><small>${esc(T(g.place))}</small></button>`).join('');
    picker.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      renderGroup(+b.dataset.i);
      setUrl(SLUG[BYDAY[groups[+b.dataset.i].day]] || b.dataset.i);
    }));

    const a = C.about || {};
    const paras = (a.paragraphs || []).filter(p => String(p).trim());
    $('about').hidden = !paras.length;
    $('about-h').textContent = T(a.title);
    $('about-body').innerHTML = paras.map(p => `<p>${esc(T(p))}</p>`).join('');

    const ins = C.instructor || {};
    $('instructor').hidden = !ins.name && !ins.bio;
    $('gadi-h').textContent = T(ins.name);
    $('gadi-bio').textContent = T(ins.bio);
    $('gadi-img').alt = ins.name || '';
    resolveImg(ins.photo).then(src => { $('gadi-img').src = src; $('gadi-img').hidden = !src; });

    const pk = C.perks || {};
    const items = (pk.items || []).filter(x => x && String(x.text || '').trim());
    $('perks').hidden = !items.length;
    $('perks-h').textContent = T(pk.title);
    $('perks-list').innerHTML = items.map(x => `<li><span>${esc(x.icon)}</span><span>${esc(T(x.text))}</span></li>`).join('');

    $('ask-text').textContent = T((C.ask || {}).text);
    $('a-ask').hidden = !(C.ask || {}).phone;
    $('foot-1').textContent = T((C.footer || {}).line1);
    $('foot-2').textContent = T((C.footer || {}).line2);
  }

  function renderGroup(i) {
    const groups = C.groups || [];
    if (!groups.length) return;
    current = Math.min(Math.max(i, 0), groups.length - 1);
    const g = groups[current], t = C.texts || {};
    document.querySelectorAll('#picker button').forEach(b => b.setAttribute('aria-selected', String(+b.dataset.i === current)));
    applyColor(dayColor(g));
    resolveImg(g.image).then(src => {
      if (current === groups.indexOf(g)) $('hero').style.setProperty('--hero-img', src ? `url('${new URL(src, location.href).href}')` : 'none');
    });

    $('f-when').textContent = fill(t.whenTemplate, g);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    $('f-start').textContent = g.start && new Date(g.start + 'T00:00') >= today ? (LANG === 'en' ? EN.UI.from(fmtDate(g.start)) : `החל מ-${fmtDate(g.start)}`) : T(t.activeNote);
    $('f-where').textContent = T(g.where);
    $('f-parking').textContent = g.parking ? `🅿️ ${T(g.parking)}` : '';
    $('f-price').textContent = T(g.price);
    $('a-wa').hidden = !g.whatsapp;
    $('a-wa').href = g.whatsapp || '#';
    $('a-waze').hidden = !g.waze;
    $('a-waze').href = g.waze || '#';
    // Find a dance partner (Facebook group) — full-width button under the actions
    const pl = String(g.partnerLink || '').trim();
    if ($('a-partner')) { $('a-partner').hidden = !pl; $('a-partner').href = pl || '#';
      $('partner-text').textContent = T(String(t.partnerText || '').trim() || 'מציאת בן / בת זוג להרקדה'); }
    // Google Maps button — English view only; the Hebrew view keeps Waze alone
    const gm = LANG === 'en' ? String(g.gmaps || '').trim() : '';
    if ($('a-gmaps')) { $('a-gmaps').hidden = !gm; $('a-gmaps').href = gm || '#'; $('row-nav').classList.toggle('maps', !!gm); }
    // "Dances we've learned" — YouTube playlists per group (hidden until a group has them)
    const yc = String(g.ytCircles || '').trim(), yz = String(g.ytCouples || '').trim();
    $('videos').hidden = !yc && !yz;
    $('videos-h').textContent = '🎬 ' + T(String(t.videosTitle || '').trim() || 'צפייה בריקודים שנלמדו');
    $('a-yt-circles').hidden = !yc; $('a-yt-circles').href = yc || '#';
    $('a-yt-couples').hidden = !yz; $('a-yt-couples').href = yz || '#';
    $('videos-row').classList.toggle('solo', !yc || !yz);
    const ask = C.ask || {};
    $('a-ask').href = 'https://wa.me/' + String(ask.phone || '').replace(/\D/g, '') + '?text=' + encodeURIComponent(fill(ask.message, g));

    const halls = (g.halls || []).filter(h => h && (h.name || (h.slots || []).length));
    $('b-sched').hidden = !halls.length;
    $('row-top').classList.toggle('solo', !halls.length);
    $('sched-h').textContent = `${T(String(t.scheduleTitle || '').trim() || 'לוח זמנים')} · ${LANG === 'en' ? '' : 'יום '}${dayName(g)}`;
    if (!halls.length) showSchedule(false);
    $('f-team').textContent = g.team ? (LANG === 'en' ? EN.UI.team : 'מרקידים: ') + T(g.team) : '';
    $('f-team').hidden = !g.team;
    $('halls').innerHTML = halls.map(h => `
      <div class="hall">
        <div class="hall-head"><h3>${esc(T(h.name))}</h3>${h.who ? `<p>${esc(T(h.who))}</p>` : ''}</div>
        <ul class="slots">${(h.slots || []).map(s =>
          `<li><time>${esc(s.time)}</time><span class="${s.what ? '' : 'empty'}">${s.what ? esc(T(s.what)) : '—'}</span></li>`).join('')}</ul>
      </div>`).join('');

    const byday = BYDAY[g.day] || 'SU';
    const s = nextSession(g);
    const e = new Date(s.getTime() + (+g.durationMin || 120) * 60000);
    const title = fill(t.calendarTitle, g);
    const details = [T(g.price), g.whatsapp ? (LANG === 'en' ? EN.UI.waGroup : 'קבוצת ווטסאפ: ') + g.whatsapp : ''].filter(Boolean).join(' · ');
    $('a-gcal').href = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
      + '&text=' + encodeURIComponent(title)
      + '&dates=' + stamp(s) + '/' + stamp(e)
      + '&ctz=Asia/Jerusalem'
      + '&recur=' + encodeURIComponent('RRULE:FREQ=WEEKLY;BYDAY=' + byday)
      + '&location=' + encodeURIComponent(T(g.where))
      + '&details=' + encodeURIComponent(details);
    $('b-ics').onclick = () => {
      const icsEsc = v => String(v || '').replace(/[,;\\]/g, m => '\\' + m);
      const ics = [
        'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Gadi Bitton//Landing//HE', 'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        'UID:' + PAGE_ID + '-' + byday + '@gadibitton',
        'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
        'DTSTART;TZID=Asia/Jerusalem:' + stamp(s),
        'DTEND;TZID=Asia/Jerusalem:' + stamp(e),
        'RRULE:FREQ=WEEKLY;BYDAY=' + byday,
        'SUMMARY:' + icsEsc(title),
        'LOCATION:' + icsEsc(T(g.where)),
        'DESCRIPTION:' + icsEsc(details),
        'BEGIN:VALARM', 'TRIGGER:-PT2H', 'ACTION:DISPLAY', 'DESCRIPTION:' + icsEsc(title), 'END:VALARM',
        'END:VEVENT', 'END:VCALENDAR'
      ].join('\r\n');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
      a.download = `${PAGE_ID}-${byday.toLowerCase()}.ics`;
      document.body.appendChild(a); a.click(); a.remove();
    };
  }

  // The schedule is its own page: #schedule in the address, so the phone's Back button returns too.
  function showSchedule(on) {
    $('sched').hidden = !on;
    document.body.classList.toggle('sched-open', on);
    window.scrollTo(0, 0);
  }
  let pushedSchedule = false;
  $('b-sched').addEventListener('click', () => { pushedSchedule = true; location.hash = 'schedule'; });
  const closeSchedule = () => { if (pushedSchedule) history.back(); else { history.replaceState(null, '', location.pathname + location.search); showSchedule(false); } };
  $('b-back').addEventListener('click', closeSchedule);
  $('b-back2').addEventListener('click', closeSchedule);
  window.addEventListener('hashchange', () => { const on = location.hash === '#schedule' && !$('b-sched').hidden; if (!on) pushedSchedule = false; showSchedule(on); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('sched').hidden) closeSchedule(); });

  $('b-cal').addEventListener('click', () => {
    const open = $('cal-choices').classList.toggle('open');
    $('b-cal').setAttribute('aria-expanded', String(open));
  });

  const langBtn = $('b-lang');
  if (langBtn) langBtn.addEventListener('click', () => {
    LANG = LANG === 'en' ? 'he' : 'en';
    try { localStorage.setItem('landingLang', LANG); } catch (e) { /* private mode */ }
    setUrl();
    applyLang();
    if (C) { renderStatic(); renderGroup(current); }
  });

  function start(content) {
    C = content;
    applyLang();
    renderStatic();
    const param = (new URLSearchParams(location.search).get('g') || '').toUpperCase();
    const groups = C.groups || [];
    let idx = groups.findIndex(g => BYDAY[g.day] === param.slice(0, 2));
    if (idx < 0 && /^\d+$/.test(param)) idx = +param;
    // No day in the link: open on the nearest upcoming day, today included
    // (e.g. Fri–Sun → Sunday, Mon–Tue → Tuesday, Wed–Thu → Thursday).
    if (idx < 0 && groups.length) {
      const today = new Date().getDay();
      let best = Infinity;
      groups.forEach((g, i) => {
        const wd = WEEKDAY[BYDAY[g.day]];
        if (wd === undefined) return;
        const ahead = (wd - today + 7) % 7;
        if (ahead < best) { best = ahead; idx = i; }
      });
    }
    renderGroup(idx < 0 ? 0 : idx);
    document.body.classList.remove('loading');
    if (location.hash === '#schedule' && !$('b-sched').hidden) showSchedule(true);
  }

  const defaults = (window.LANDING_DEFAULTS || {})[PAGE_ID];
  fsGet('sitePages/' + PAGE_ID, 3500).then(doc => {
    let saved = null;
    try { saved = JSON.parse(doc?.fields?.data?.stringValue || 'null'); } catch (e) { saved = null; }
    if (saved && saved.groups && defaults) {
      // Fields added after the page was saved: take them from the defaults (same day) until edited.
      saved.texts = Object.assign({}, defaults.texts, saved.texts);
      saved.groups.forEach(g => {
        const d = (defaults.groups || []).find(x => x.day === g.day) || {};
        Object.keys(d).forEach(k => { if (g[k] === undefined) g[k] = d[k]; });
      });
    }
    if (EN && saved && saved.en) EN.setAuto(saved.en);
    start(saved && saved.groups ? saved : defaults);
  });
})();

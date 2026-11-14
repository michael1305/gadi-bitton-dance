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
  const fill = (tpl, g) => String(tpl || '').replace(/\{day\}/g, g.day).replace(/\{time\}/g, g.time).replace(/\{place\}/g, g.place);

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

  let C, current = 0;

  function renderStatic() {
    const h = C.hero || {}, t = C.texts || {};
    $('brand-text').textContent = h.brand || '';
    $('h-l1').textContent = h.l1 || '';
    $('h-l2').textContent = h.l2 || '';
    $('h-l1').parentElement.hidden = !h.l1 && !h.l2;
    $('h-tag').textContent = h.tag || '';
    $('h-tag').hidden = !h.tag;
    $('h-lead').textContent = h.lead || '';

    $('details-h').textContent = t.detailsTitle || '';
    $('price-k').textContent = t.priceLabel || '';
    $('price-note').textContent = t.priceNote || '';
    $('join-text').textContent = t.joinText || '';
    $('sched-h').textContent = t.scheduleTitle || '';

    const groups = C.groups || [];
    const picker = $('picker');
    picker.style.gridTemplateColumns = `repeat(${Math.max(groups.length, 1)}, 1fr)`;
    picker.hidden = groups.length < 2;
    picker.innerHTML = groups.map((g, i) =>
      `<button role="tab" data-i="${i}" aria-selected="false"><strong>יום ${esc(g.day)}</strong><small>${esc(g.place)}</small></button>`).join('');
    picker.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      renderGroup(+b.dataset.i);
      history.replaceState(null, '', '?g=' + (SLUG[BYDAY[groups[+b.dataset.i].day]] || b.dataset.i));
    }));

    const a = C.about || {};
    const paras = (a.paragraphs || []).filter(p => String(p).trim());
    $('about').hidden = !paras.length;
    $('about-h').textContent = a.title || '';
    $('about-body').innerHTML = paras.map(p => `<p>${esc(p)}</p>`).join('');

    const ins = C.instructor || {};
    $('instructor').hidden = !ins.name && !ins.bio;
    $('gadi-h').textContent = ins.name || '';
    $('gadi-bio').textContent = ins.bio || '';
    $('gadi-img').alt = ins.name || '';
    resolveImg(ins.photo).then(src => { $('gadi-img').src = src; $('gadi-img').hidden = !src; });

    const pk = C.perks || {};
    const items = (pk.items || []).filter(x => x && String(x.text || '').trim());
    $('perks').hidden = !items.length;
    $('perks-h').textContent = pk.title || '';
    $('perks-list').innerHTML = items.map(x => `<li><span>${esc(x.icon)}</span><span>${esc(x.text)}</span></li>`).join('');

    $('ask-text').textContent = (C.ask || {}).text || '';
    $('a-ask').hidden = !(C.ask || {}).phone;
    $('foot-1').textContent = (C.footer || {}).line1 || '';
    $('foot-2').textContent = (C.footer || {}).line2 || '';
  }

  function renderGroup(i) {
    const groups = C.groups || [];
    if (!groups.length) return;
    current = Math.min(Math.max(i, 0), groups.length - 1);
    const g = groups[current], t = C.texts || {};
    document.querySelectorAll('#picker button').forEach(b => b.setAttribute('aria-selected', String(+b.dataset.i === current)));
    resolveImg(g.image).then(src => {
      if (current === groups.indexOf(g)) $('hero').style.setProperty('--hero-img', src ? `url('${src}')` : 'none');
    });

    $('f-when').textContent = fill(t.whenTemplate, g);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    $('f-start').textContent = g.start && new Date(g.start + 'T00:00') >= today ? `החל מ-${fmtDate(g.start)}` : (t.activeNote || '');
    $('f-where').textContent = g.where || '';
    $('f-parking').textContent = g.parking ? `🅿️ ${g.parking}` : '';
    $('f-price').textContent = g.price || '';
    $('a-wa').hidden = !g.whatsapp;
    $('a-wa').href = g.whatsapp || '#';
    $('a-waze').hidden = !g.waze;
    $('a-waze').href = g.waze || '#';
    const ask = C.ask || {};
    $('a-ask').href = 'https://wa.me/' + String(ask.phone || '').replace(/\D/g, '') + '?text=' + encodeURIComponent(fill(ask.message, g));

    const halls = (g.halls || []).filter(h => h && (h.name || (h.slots || []).length));
    $('sched').hidden = !halls.length;
    $('f-team').textContent = g.team ? `מרקידים: ${g.team}` : '';
    $('f-team').hidden = !g.team;
    $('halls').innerHTML = halls.map(h => `
      <div class="hall">
        <div class="hall-head"><h3>${esc(h.name)}</h3>${h.who ? `<p>${esc(h.who)}</p>` : ''}</div>
        <ul class="slots">${(h.slots || []).map(s =>
          `<li><time>${esc(s.time)}</time><span class="${s.what ? '' : 'empty'}">${s.what ? esc(s.what) : '—'}</span></li>`).join('')}</ul>
      </div>`).join('');

    const byday = BYDAY[g.day] || 'SU';
    const s = nextSession(g);
    const e = new Date(s.getTime() + (+g.durationMin || 120) * 60000);
    const title = fill(t.calendarTitle, g);
    const details = [g.price, g.whatsapp ? 'קבוצת ווטסאפ: ' + g.whatsapp : ''].filter(Boolean).join(' · ');
    $('a-gcal').href = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
      + '&text=' + encodeURIComponent(title)
      + '&dates=' + stamp(s) + '/' + stamp(e)
      + '&ctz=Asia/Jerusalem'
      + '&recur=' + encodeURIComponent('RRULE:FREQ=WEEKLY;BYDAY=' + byday)
      + '&location=' + encodeURIComponent(g.where || '')
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
        'LOCATION:' + icsEsc(g.where),
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

  $('b-cal').addEventListener('click', () => {
    const open = $('cal-choices').classList.toggle('open');
    $('b-cal').setAttribute('aria-expanded', String(open));
  });

  function start(content) {
    C = content;
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
  }

  const defaults = (window.LANDING_DEFAULTS || {})[PAGE_ID];
  fsGet('sitePages/' + PAGE_ID, 3500).then(doc => {
    let saved = null;
    try { saved = JSON.parse(doc?.fields?.data?.stringValue || 'null'); } catch (e) { saved = null; }
    start(saved && saved.groups ? saved : defaults);
  });
})();

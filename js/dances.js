(function () {
  var BASE = window.SITE_BASE || '';
  var LANG = document.documentElement.lang === 'en' ? 'en' : 'he';

  var STRINGS = {
    he: {
      countText: function (shown, total) { return shown + ' ריקודים מתוך ' + total; },
      loadError: 'שגיאה בטעינת הנתונים',
      metaLabels: { choreographer: 'כוריאוגרף', form: 'צורת הריקוד', year: 'שנת חיבור', performer: 'מבצע השיר', lyricist: 'משורר', composer: 'לחן' },
      videoLabel: 'וידאו ריקוד',
      clipLabel: 'קליפ השיר',
      formNames: {}
    },
    en: {
      countText: function (shown, total) { return shown + ' of ' + total + ' dances'; },
      loadError: 'Error loading data',
      metaLabels: { choreographer: 'Choreographer', form: 'Dance Type', year: 'Year Composed', performer: 'Performer', lyricist: 'Lyricist', composer: 'Composer' },
      videoLabel: 'Dance Video',
      clipLabel: 'Song Clip',
      formNames: { 'זוגות': 'Couples', 'מעגלים': 'Circles' }
    }
  };
  var S = STRINGS[LANG];

  var state = { data: [], sortKey: LANG === 'en' ? 'nameEn' : 'nameHe', sortDir: 1, query: '', form: '' };
  var tbody, countEl, searchInput, formSelect, noResults, table;
  var byId = {};

  function formTag(form) {
    var label = S.formNames[form] || form;
    if (form.indexOf('זוג') > -1) return '<span class="tag couples">' + escapeHtml(label) + '</span>';
    if (form.indexOf('מעגל') > -1) return '<span class="tag circles">' + escapeHtml(label) + '</span>';
    return '<span class="tag other">' + escapeHtml(label) + '</span>';
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : str;
    return div.innerHTML;
  }

  function render() {
    var q = state.query.trim();
    var rows = state.data.filter(function (d) {
      if (state.form && d.form !== state.form) return false;
      if (!q) return true;
      return (d.nameHe + ' ' + d.nameEn + ' ' + d.performer + ' ' + d.year).indexOf(q) > -1;
    });

    rows.sort(function (a, b) {
      var av = a[state.sortKey], bv = b[state.sortKey];
      if (state.sortKey === 'year') { av = parseInt(av) || 0; bv = parseInt(bv) || 0; }
      if (av < bv) return -1 * state.sortDir;
      if (av > bv) return 1 * state.sortDir;
      return 0;
    });

    countEl.textContent = S.countText(rows.length, state.data.length);

    if (!rows.length) {
      tbody.innerHTML = '';
      noResults.style.display = 'block';
      table.style.display = 'none';
      return;
    }
    noResults.style.display = 'none';
    table.style.display = 'table';

    var firstKey = LANG === 'en' ? 'nameEn' : 'nameHe';
    var secondKey = LANG === 'en' ? 'nameHe' : 'nameEn';

    var html = rows.map(function (d) {
      return '<tr data-id="' + d.id + '">' +
        '<td class="name">' + escapeHtml(d[firstKey]) + '</td>' +
        '<td>' + escapeHtml(d[secondKey]) + '</td>' +
        '<td>' + formTag(d.form) + '</td>' +
        '<td>' + escapeHtml(d.year) + '</td>' +
        '<td>' + escapeHtml(d.performer) + '</td>' +
        '</tr>';
    }).join('');
    tbody.innerHTML = html;
  }

  function metaItem(label, value) {
    if (!value) return '';
    return '<div class="item"><span class="k">' + escapeHtml(label) + '</span><span class="v">' + escapeHtml(value) + '</span></div>';
  }

  function openModal(dance) {
    var overlay = document.querySelector('.dance-modal-overlay');
    var photo = overlay.querySelector('.dm-photo');
    var noPhoto = overlay.querySelector('.no-photo');
    if (dance.photo) {
      photo.src = BASE + dance.photo;
      photo.alt = dance.nameHe;
      photo.style.display = 'block';
      noPhoto.style.display = 'none';
    } else {
      photo.style.display = 'none';
      noPhoto.style.display = 'flex';
    }

    var primaryName = LANG === 'en' ? dance.nameEn : dance.nameHe;
    var secondaryName = LANG === 'en' ? dance.nameHe : dance.nameEn;
    overlay.querySelector('.dm-name-he').textContent = primaryName;
    overlay.querySelector('.dm-name-en').textContent = secondaryName;

    overlay.querySelector('.dm-meta').innerHTML =
      metaItem(S.metaLabels.choreographer, dance.choreographer) +
      metaItem(S.metaLabels.form, S.formNames[dance.form] || dance.form) +
      metaItem(S.metaLabels.year, dance.year) +
      metaItem(S.metaLabels.performer, dance.performer) +
      metaItem(S.metaLabels.lyricist, dance.lyricist) +
      metaItem(S.metaLabels.composer, dance.composer);

    var videosSection = overlay.querySelector('.dm-videos-section');
    var videosWrap = overlay.querySelector('.dm-videos');
    var videosHtml = '';
    if (dance.videoYoutube) {
      videosHtml += '<div><div class="video-embed"><iframe src="https://www.youtube.com/embed/' + dance.videoYoutube + '" title="' + escapeHtml(S.videoLabel) + '" allowfullscreen></iframe></div><div class="video-embed-label">' + escapeHtml(S.videoLabel) + '</div></div>';
    }
    if (dance.clipYoutube) {
      videosHtml += '<div><div class="video-embed"><iframe src="https://www.youtube.com/embed/' + dance.clipYoutube + '" title="' + escapeHtml(S.clipLabel) + '" allowfullscreen></iframe></div><div class="video-embed-label">' + escapeHtml(S.clipLabel) + '</div></div>';
    }
    if (videosHtml) {
      videosWrap.innerHTML = videosHtml;
      videosSection.style.display = 'block';
    } else {
      videosWrap.innerHTML = '';
      videosSection.style.display = 'none';
    }

    var lyricsSection = overlay.querySelector('.dm-lyrics-section');
    if (dance.lyrics) {
      overlay.querySelector('.dm-lyrics').textContent = dance.lyrics;
      lyricsSection.style.display = 'block';
    } else {
      overlay.querySelector('.dm-lyrics').textContent = '';
      lyricsSection.style.display = 'none';
    }

    overlay.classList.add('open');
  }

  function closeModal() {
    var overlay = document.querySelector('.dance-modal-overlay');
    overlay.classList.remove('open');
    // stop any playing video by clearing iframes
    overlay.querySelector('.dm-videos').innerHTML = '';
  }

  function init(data) {
    state.data = data;
    data.forEach(function (d) { byId[d.id] = d; });

    tbody = document.querySelector('table.dances tbody');
    countEl = document.querySelector('.dances-count');
    searchInput = document.querySelector('#danceSearch');
    formSelect = document.querySelector('#formFilter');
    noResults = document.querySelector('.no-results');
    table = document.querySelector('table.dances');

    searchInput.addEventListener('input', function () {
      state.query = searchInput.value;
      render();
    });
    formSelect.addEventListener('change', function () {
      state.form = formSelect.value;
      render();
    });
    document.querySelectorAll('table.dances th[data-key]').forEach(function (th) {
      th.addEventListener('click', function () {
        var key = th.getAttribute('data-key');
        if (state.sortKey === key) { state.sortDir *= -1; } else { state.sortKey = key; state.sortDir = 1; }
        document.querySelectorAll('table.dances th .arrow').forEach(function (a) { a.textContent = ''; });
        th.querySelector('.arrow').textContent = state.sortDir === 1 ? '▲' : '▼';
        render();
      });
    });

    tbody.addEventListener('click', function (e) {
      var tr = e.target.closest('tr[data-id]');
      if (!tr) return;
      var dance = byId[tr.getAttribute('data-id')];
      if (dance) openModal(dance);
    });

    var overlay = document.querySelector('.dance-modal-overlay');
    overlay.querySelector('.close').addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
    });

    render();
  }

  fetch(BASE + 'data/dances.json')
    .then(function (r) { return r.json(); })
    .then(init)
    .catch(function (err) {
      document.querySelector('.dances-count').textContent = S.loadError;
      console.error(err);
    });
})();

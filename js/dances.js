(function () {
  var state = { data: [], sortKey: 'nameHe', sortDir: 1, query: '', form: '' };
  var tbody, countEl, searchInput, formSelect, noResults, table;

  function formTag(form) {
    if (form.indexOf('זוג') > -1) return '<span class="tag couples">' + form + '</span>';
    if (form.indexOf('מעגל') > -1) return '<span class="tag circles">' + form + '</span>';
    return '<span class="tag other">' + form + '</span>';
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

    countEl.textContent = rows.length + ' ריקודים מתוך ' + state.data.length;

    if (!rows.length) {
      tbody.innerHTML = '';
      noResults.style.display = 'block';
      table.style.display = 'none';
      return;
    }
    noResults.style.display = 'none';
    table.style.display = 'table';

    var html = rows.map(function (d) {
      return '<tr>' +
        '<td class="name">' + d.nameHe + '</td>' +
        '<td>' + d.nameEn + '</td>' +
        '<td>' + formTag(d.form) + '</td>' +
        '<td>' + d.year + '</td>' +
        '<td>' + d.performer + '</td>' +
        '</tr>';
    }).join('');
    tbody.innerHTML = html;
  }

  function init(data) {
    state.data = data;
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

    render();
  }

  fetch('data/dances.json')
    .then(function (r) { return r.json(); })
    .then(init)
    .catch(function (err) {
      document.querySelector('.dances-count').textContent = 'שגיאה בטעינת הנתונים';
      console.error(err);
    });
})();

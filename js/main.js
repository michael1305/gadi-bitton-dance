document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Lightbox for gallery pages
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    document.querySelectorAll('[data-lightbox]').forEach(function (fig) {
      fig.addEventListener('click', function () {
        lightboxImg.src = fig.getAttribute('data-lightbox');
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', function () {
      lightbox.classList.remove('open');
      lightboxImg.src = '';
    });
  }

  // Media tabs (press / tv)
  var tabs = document.querySelectorAll('.media-tabs button');
  if (tabs.length) {
    tabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabs.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var target = btn.getAttribute('data-target');
        document.querySelectorAll('.media-panel').forEach(function (panel) {
          panel.style.display = (panel.id === target) ? 'flex' : 'none';
        });
      });
    });
  }
});

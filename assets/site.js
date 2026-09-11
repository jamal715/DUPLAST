/* DuPlast — mobile nav, product filter, enquiry form. No dependencies. */
(function () {
  'use strict';

  /* mobile nav */
  var toggle = document.querySelector('[data-nav-toggle]');
  var links = document.querySelector('[data-nav-links]');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* product filter + search */
  var grid = document.querySelector('[data-grid]');
  if (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.prod'));
    var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
    var search = document.getElementById('prod-search');
    var countEl = document.querySelector('[data-count]');
    var emptyEl = document.querySelector('[data-empty]');
    var cat = 'All';

    function apply() {
      var q = (search && search.value || '').trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var okCat = cat === 'All' || card.getAttribute('data-cat') === cat;
        var okQ = !q || card.getAttribute('data-text').indexOf(q) !== -1;
        var show = okCat && okQ;
        card.hidden = !show;
        if (show) shown++;
      });
      if (countEl) {
        countEl.textContent = shown + (shown === 1 ? ' product' : ' products') +
          (cat === 'All' ? '' : ' in ' + cat) + (q ? ' matching "' + q + '"' : '');
      }
      if (emptyEl) emptyEl.hidden = shown !== 0;
      grid.hidden = shown === 0;
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        cat = chip.getAttribute('data-cat');
        chips.forEach(function (c) {
          var on = c === chip;
          c.classList.toggle('tag-accent', on);
          c.classList.toggle('tag-outline', !on);
        });
        apply();
      });
    });
    if (search) search.addEventListener('input', apply);
    apply();
  }

  /* enquiry form */
  var form = document.querySelector('[data-rfq]');
  if (form) {
    var done = document.querySelector('[data-done]');
    var errEl = form.querySelector('[data-error]');
    var nameEl = document.querySelector('[data-done-name]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      var email = f.email.value.trim();
      if (!f.name.value.trim() || !f.company.value.trim() || !f.product.value.trim()) {
        errEl.textContent = 'Name, company and product are required.';
        return;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        errEl.textContent = 'Please enter a valid email address.';
        return;
      }
      errEl.textContent = '';
      if (nameEl) nameEl.textContent = ' ' + f.name.value.trim().split(' ')[0];
      form.hidden = true;
      if (done) done.hidden = false;
    });

    var reset = document.querySelector('[data-reset]');
    if (reset) {
      reset.addEventListener('click', function () {
        form.reset();
        errEl.textContent = '';
        if (done) done.hidden = true;
        form.hidden = false;
      });
    }
  }
})();

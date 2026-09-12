(function () {
  'use strict';

  var toggle = document.querySelector('[data-nav-toggle]');
  var links = document.querySelector('[data-nav-links]');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var footerGrid = document.querySelector('.footer-grid');
  if (footerGrid) {
    var footerCols = footerGrid.children;
    if (footerCols.length) {
      var contactCol = footerCols[footerCols.length - 1];
      var head = contactCol.querySelector('.footer-head');
      var list = contactCol.querySelector('.footer-list');
      if (head) head.textContent = 'Contact';
      if (list) {
        list.innerHTML = '<span>Muhammad Yousaf · Director & Owner</span>' +
          '<a href="mailto:myousuf47@hotmail.com">myousuf47@hotmail.com</a>' +
          '<a href="tel:3088747482">3088747482</a>' +
          '<span>Lahore, Pakistan</span>';
      }
    }
  }

  var form = document.querySelector('[data-rfq]');
  if (form) {
    var done = document.querySelector('[data-done]');
    var errEl = form.querySelector('[data-error]');
    var nameEl = document.querySelector('[data-done-name]');
    var reset = document.querySelector('[data-reset]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      var name = (f.name.value || '').trim();
      var company = (f.company.value || '').trim();
      var product = (f.product.value || '').trim();
      var email = (f.email.value || '').trim();

      if (!name || !company || !product) {
        errEl.textContent = 'Name, company and material are required.';
        return;
      }
      if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        errEl.textContent = 'Please enter a valid email address.';
        return;
      }
      errEl.textContent = '';
      if (nameEl) nameEl.textContent = ' ' + name.split(' ')[0];
      form.hidden = true;
      if (done) done.hidden = false;
    });

    if (reset) {
      reset.addEventListener('click', function () {
        form.reset();
        form.hidden = false;
        if (done) done.hidden = true;
        errEl.textContent = '';
      });
    }
  }
})();

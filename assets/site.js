(() => {
  'use strict';
  const qs = (s, scope = document) => scope.querySelector(s);
  const qsa = (s, scope = document) => [...scope.querySelectorAll(s)];

  // Use the final CEO portrait directly from the repository. Keeping one canonical
  // asset avoids the previous base64-chunk loading path and guarantees consistent
  // rendering on the home and company pages across desktop and mobile.
  qsa('[data-ceo-photo]').forEach(img => {
    img.src = 'assets/ceo-muhammad-yousaf.jpg';
  });

  const toggle = qs('[data-nav-toggle]');
  const mobileNav = qs('[data-mobile-nav]');
  const closeNav = () => {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  };
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      mobileNav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    });
    qsa('a', mobileNav).forEach(a => a.addEventListener('click', closeNav));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  }

  const filters = qsa('[data-filter]');
  const products = qsa('[data-product]');
  const applyFilter = value => {
    filters.forEach(b => b.classList.toggle('is-active', b.dataset.filter === value));
    products.forEach(card => { card.hidden = value !== 'all' && card.dataset.product !== value; });
  };
  if (filters.length && products.length) {
    filters.forEach(btn => btn.addEventListener('click', () => {
      const value = btn.dataset.filter || 'all';
      applyFilter(value);
      history.replaceState(null, '', value === 'all' ? location.pathname : `#${value}`);
    }));
    const initial = location.hash.replace('#', '');
    if (initial && filters.some(b => b.dataset.filter === initial)) applyFilter(initial);
  }

  const form = qs('[data-rfq-form]');
  if (form) {
    const status = qs('[data-form-status]', form);
    const getData = () => Object.fromEntries(new FormData(form).entries());
    const validate = data => {
      if (!String(data.name || '').trim() || !String(data.company || '').trim() || !String(data.product || '').trim()) {
        if (status) status.textContent = 'Please add your name, company and material requirement.';
        return false;
      }
      if (status) status.textContent = '';
      return true;
    };
    const message = data => [
      'DuPlast RFQ','',
      `Name: ${data.name || '-'}`,
      `Company: ${data.company || '-'}`,
      `Email: ${data.email || '-'}`,
      `Phone: ${data.phone || '-'}`,
      `Material / Grade: ${data.product || '-'}`,
      `Monthly volume: ${data.volume || '-'}`,
      `Application: ${data.application || '-'}`,
      `Notes: ${data.notes || '-'}`
    ].join('\n');
    qs('[data-send-email]', form)?.addEventListener('click', () => {
      const data = getData(); if (!validate(data)) return;
      const subject = encodeURIComponent(`RFQ — ${data.product || 'Material enquiry'} — ${data.company || ''}`);
      window.location.href = `mailto:myousuf47@hotmail.com?subject=${subject}&body=${encodeURIComponent(message(data))}`;
    });
    qs('[data-send-wa]', form)?.addEventListener('click', () => {
      const data = getData(); if (!validate(data)) return;
      window.open(`https://wa.me/923088747482?text=${encodeURIComponent(message(data))}`, '_blank', 'noopener');
    });
  }

  const reveals = qsa('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }
})();

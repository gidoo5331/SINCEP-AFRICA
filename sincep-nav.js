/*
 * SINCEP-Africa site header, in the simple style of the EU Funding & Tenders portal:
 * white logo strip (project logo left, funder logos right) + white menu bar with blue links.
 *
 * Usage: put <div data-sincep-nav></div> where the header should appear, then load this file:
 *   <script src="sincep-nav.js"></script>
 * If no placeholder is found, the header is added to the top of the page.
 *
 * Edit the links in NAV below. Everything is scoped under .sincep-nav so it can't affect the theme.
 */
(function () {
  if (document.querySelector('.sincep-nav')) return;   // never insert twice

  var SITE = 'https://sincep-africa.org';

  var NAV = [
    { label: 'Home', href: SITE + '/' },
    { label: 'About', children: [
      { label: 'Project Overview', href: SITE + '/project-overview/' },
      { label: 'Governance', href: SITE + '/governance/' },
      { label: 'Funding', href: SITE + '/funding/' }
    ] },
    { label: 'Partners', href: SITE + '/consortium-partners/' },
    { label: 'Work Packages', href: SITE + '/work-packages/' },
    { label: 'News & Events', href: SITE + '/news-events/' },
    { label: 'Resources', href: SITE + '/tools-documents/' }
  ];
  var CTA = { label: 'View Partners', href: SITE + '/consortium-partners/' };

  // Preview sites (e.g. GitHub Pages) can set window.SINCEP_PREVIEW_LINKS = { 'https://…/page/': 'page.html' }
  // before loading this file, so links to redesigned pages stay inside the preview.
  var PREVIEW_LINKS = window.SINCEP_PREVIEW_LINKS || {};
  function swap(item) {
    if (item.href && PREVIEW_LINKS[item.href]) item.href = PREVIEW_LINKS[item.href];
    if (item.children) item.children.forEach(swap);
  }
  NAV.forEach(swap);
  swap(CTA);

  // Optional: window.SINCEP_NAV_ENABLED = ['index.html', …] lists the pages that are ready.
  // With window.SINCEP_NAV_FALLBACK = 'index.html', links to other pages go there instead (and look normal);
  // without it, they show greyed out and can't be clicked.
  var ENABLED = window.SINCEP_NAV_ENABLED || null;
  var FALLBACK = window.SINCEP_NAV_FALLBACK || null;
  function enabled(href) { return !ENABLED || ENABLED.indexOf(href.split('?')[0]) > -1; }
  function redirect(item) {
    if (item.href && !enabled(item.href)) item.href = FALLBACK + '?soon=' + encodeURIComponent(item.label);
    if (item.children) item.children.forEach(redirect);
  }
  if (ENABLED && FALLBACK) { NAV.forEach(redirect); redirect(CTA); }
  function disabledItem(cls, label, extra) {
    return '<span class="' + cls + ' is-disabled" aria-disabled="true" title="Coming soon">' + label + (extra || '') + '</span>';
  }

  // Project logo (a trimmed copy of the SINCEP-Africa logo). In WordPress, point this at the uploaded file.
  var BRAND_LOGO = 'logos/sincep-africa-logo.png';

  var LOGOS = {
    funders: [
      { src: SITE + '/wp-content/uploads/2026/11/eu-flag.png', alt: 'European Union', h: 30 },
      { src: SITE + '/wp-content/uploads/2026/11/global-health-edctp3.png', alt: 'Global Health EDCTP3', h: 50 }
    ],
    lead: { src: SITE + '/wp-content/uploads/2026/03/Logo-removebg-preview-1.png', alt: 'INDEPTH Network', h: 30 }
  };

  var css = '' +
    '.sincep-nav{--blue:#004494;--blue-dark:#003776;--blue-soft:#E6EEF7;--yellow:#FFD617;--ink:#1A1A1A;--soft:#515560;--line:#D9DCE1;' +
      'font-family:Inter,Arial,Helvetica,sans-serif;position:relative;z-index:100;background:#fff;}' +
    '.sincep-nav *,.sincep-nav *::before,.sincep-nav *::after{box-sizing:border-box;}' +
    '.sincep-nav a{text-decoration:none;}' +
    '.sincep-nav .sn-wrap{max-width:1280px;margin:0 auto;padding:0 28px;display:flex;align-items:center;}' +
    '.sincep-nav .sr-only{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}' +
    '.sincep-nav a:focus-visible,.sincep-nav button:focus-visible{outline:3px solid var(--yellow);outline-offset:2px;}' +

    /* Top strip: project logo on the left, funder / scientific-lead logos on the right */
    '.sincep-nav .sn-top .sn-wrap{min-height:96px;gap:24px;justify-content:space-between;padding-top:12px;padding-bottom:12px;}' +
    '.sincep-nav .sn-brand{display:block;flex-shrink:0;}' +
    '.sincep-nav .sn-brand img{display:block;height:64px;width:auto;max-width:none;}' +
    '.sincep-nav .sn-partners{display:flex;align-items:center;gap:18px;}' +
    '.sincep-nav .sn-lbl{font:600 11.5px/1.2 Inter,Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:var(--soft);}' +
    '.sincep-nav .sn-partners img{display:block;width:auto;max-width:none;}' +
    '.sincep-nav .sn-sep{width:1px;height:32px;background:var(--line);}' +

    /* Menu bar: white, blue links, blue bar under the current page */
    '.sincep-nav .sn-bar{border-top:1px solid var(--line);border-bottom:1px solid var(--line);box-shadow:0 2px 4px rgba(0,0,0,.04);}' +
    '.sincep-nav .sn-bar .sn-wrap{height:56px;gap:24px;}' +
    '.sincep-nav .sn-links{display:flex;align-items:stretch;gap:4px;height:100%;margin:0 auto 0 -14px;padding:0;list-style:none;}' +
    '.sincep-nav .sn-links>li{position:relative;margin:0;display:flex;}' +
    '.sincep-nav .sn-link,.sincep-nav .sn-link:visited{display:inline-flex;align-items:center;gap:6px;position:relative;' +
      'padding:0 14px;color:var(--blue);font:600 15px/1.2 Inter,Arial,sans-serif;background:none;border:0;border-radius:0;cursor:pointer;transition:background .15s ease;}' +
    '.sincep-nav .sn-link:hover{background:var(--blue-soft);color:var(--blue-dark);}' +
    '.sincep-nav .sn-link[aria-current="page"],.sincep-nav .sn-link.is-current{color:var(--ink);}' +
    '.sincep-nav .sn-link[aria-current="page"]::after,.sincep-nav .sn-link.is-current::after{content:"";position:absolute;left:14px;right:14px;bottom:-1px;height:4px;background:var(--blue);}' +
    '.sincep-nav .sn-caret{transition:transform .2s ease;}' +
    '.sincep-nav .sn-dd.open .sn-caret{transform:rotate(180deg);}' +
    '.sincep-nav .sn-dd.open>.sn-link{background:var(--blue-soft);}' +
    '.sincep-nav .sn-menu{position:absolute;top:100%;left:0;min-width:230px;margin:0;padding:6px 0;list-style:none;' +
      'background:#fff;border:1px solid var(--line);box-shadow:0 8px 20px rgba(0,0,0,.10);' +
      'opacity:0;visibility:hidden;transform:translateY(4px);transition:opacity .15s ease,transform .15s ease,visibility .15s;}' +
    '.sincep-nav .sn-dd.open .sn-menu{opacity:1;visibility:visible;transform:none;}' +
    '.sincep-nav .sn-menu a,.sincep-nav .sn-menu a:visited{display:block;padding:10px 16px;color:var(--blue);font:500 15px/1.3 Inter,Arial,sans-serif;}' +
    '.sincep-nav .sn-menu a:hover{background:var(--blue-soft);text-decoration:underline;}' +
    '.sincep-nav .sn-menu a[aria-current="page"]{color:var(--ink);font-weight:700;box-shadow:inset 4px 0 0 var(--blue);}' +
    '.sincep-nav .sn-search,.sincep-nav .sn-search:visited{color:var(--blue);display:inline-flex;align-items:center;gap:6px;padding:8px;font:600 15px Inter,Arial,sans-serif;}' +
    '.sincep-nav .sn-search:hover{text-decoration:underline;}' +
    '.sincep-nav .sn-cta,.sincep-nav .sn-cta:visited{background:var(--blue);color:#fff;font:600 15px/1 Inter,Arial,sans-serif;padding:12px 18px;border-radius:0;white-space:nowrap;transition:background .15s ease;}' +
    '.sincep-nav .sn-cta:hover{background:var(--blue-dark);color:#fff;}' +
    '.sincep-nav .sn-toggle{display:none;background:var(--blue);border:0;border-radius:0;' +
      'width:44px;height:44px;color:#fff;cursor:pointer;align-items:center;justify-content:center;padding:0;flex-shrink:0;}' +

    /* Tablet and phone: logo + menu button on top, partner logos on a second line, menu in a panel */
    '@media (max-width:1000px){' +
      '.sincep-nav .sn-top .sn-wrap{flex-wrap:wrap;min-height:0;gap:12px;}' +
      '.sincep-nav .sn-brand img{height:52px;}' +
      '.sincep-nav .sn-toggle{display:inline-flex;}' +
      '.sincep-nav .sn-partners{order:3;width:100%;justify-content:center;gap:16px;padding-top:12px;border-top:1px solid var(--line);}' +
      '.sincep-nav .sn-lbl{display:none;}' +
      '.sincep-nav .sn-bar{display:none;}' +
      '.sincep-nav.menu-open .sn-panel{display:block;}' +
    '}' +
    '@media (max-width:480px){' +
      '.sincep-nav .sn-wrap{padding:0 18px;}' +
      '.sincep-nav .sn-brand img{height:44px;}' +
      '.sincep-nav .sn-partners img{transform:scale(.85);}' +
    '}' +
    '.sincep-nav .sn-panel{display:none;background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:4px 18px 20px;}' +
    '.sincep-nav .sn-panel ul{list-style:none;margin:0;padding:0;}' +
    '.sincep-nav .sn-panel a,.sincep-nav .sn-panel a:visited{display:block;padding:13px 4px;color:var(--blue);font:600 16px/1.3 Inter,Arial,sans-serif;border-bottom:1px solid var(--line);}' +
    '.sincep-nav .sn-panel a[aria-current="page"]{color:var(--ink);box-shadow:inset 4px 0 0 var(--blue);padding-left:14px;}' +
    '.sincep-nav .sn-panel .sn-sub a{padding-left:20px;font-weight:500;font-size:15px;}' +
    '.sincep-nav .sn-panel .sn-group{display:block;padding:14px 4px 4px;color:var(--soft);font:600 12px/1 Inter,Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;}' +
    '.sincep-nav .sn-panel .sn-cta,.sincep-nav .sn-panel .sn-cta:visited{display:block;text-align:center;margin-top:16px;border:0;color:#fff;}' +
    '@media (min-width:1001px){.sincep-nav .sn-panel{display:none!important;}}' +
    /* Pages that aren't ready yet (see SINCEP_NAV_ENABLED without a fallback) */
    '.sincep-nav .is-disabled{opacity:.45;cursor:not-allowed;}' +
    '.sincep-nav .sn-link.is-disabled:hover{background:none;}' +
    '.sincep-nav .sn-panel .sn-panel-link{display:block;padding:13px 4px;color:var(--soft);font:600 16px/1.3 Inter,Arial,sans-serif;border-bottom:1px solid var(--line);}' +
    '.sincep-nav .sn-panel .sn-sub .sn-panel-link{padding-left:20px;font-size:15px;}' +
    '.sincep-nav .sn-panel .sn-cta.is-disabled{display:block;text-align:center;margin-top:16px;}' +
    '@media (prefers-reduced-motion:reduce){.sincep-nav *{transition:none!important;}}';

  // Font used by the header (skipped if the page already loads Inter)
  if (!document.querySelector('link[href*="family=Inter"]')) {
    var fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(fonts);
  }
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Current page: compare paths, ignoring a trailing slash
  function norm(p) { return (p || '/').replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/'; }
  var here = norm(location.pathname);
  function isCurrent(href) {
    if (/[?&]soon=/.test(href)) return false;   // placeholder link to the fallback page, not the page itself
    try {
      var u = new URL(href, location.href);
      return u.host === location.host && norm(u.pathname) === here;
    } catch (e) { return false; }
  }
  function current(href) { return isCurrent(href) ? ' aria-current="page"' : ''; }

  function img(l, extra) {
    return '<img src="' + esc(l.src) + '" alt="' + esc(l.alt) + '" style="height:' + l.h + 'px"' + (extra || '') + '>';
  }

  var caret = '<svg class="sn-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';

  var desktopLinks = NAV.map(function (item, i) {
    if (!item.children) {
      if (!enabled(item.href)) return '<li>' + disabledItem('sn-link', esc(item.label)) + '</li>';
      return '<li><a class="sn-link" href="' + esc(item.href) + '"' + current(item.href) + '>' + esc(item.label) + '</a></li>';
    }
    if (!item.children.some(function (c) { return enabled(c.href); })) return '<li>' + disabledItem('sn-link', esc(item.label), caret) + '</li>';
    var childCurrent = item.children.some(function (c) { return isCurrent(c.href); });
    return '<li class="sn-dd">' +
      '<button type="button" class="sn-link' + (childCurrent ? ' is-current' : '') + '" aria-expanded="false" aria-controls="sn-menu-' + i + '">' + esc(item.label) + caret + '</button>' +
      '<ul class="sn-menu" id="sn-menu-' + i + '">' + item.children.map(function (c) {
        if (!enabled(c.href)) return '<li>' + disabledItem('sn-menu-item', esc(c.label)) + '</li>';
        return '<li><a href="' + esc(c.href) + '"' + current(c.href) + '>' + esc(c.label) + '</a></li>';
      }).join('') + '</ul></li>';
  }).join('');

  function mobileLink(item) {
    if (!enabled(item.href)) return '<li>' + disabledItem('sn-panel-link', esc(item.label)) + '</li>';
    return '<li><a href="' + esc(item.href) + '"' + current(item.href) + '>' + esc(item.label) + '</a></li>';
  }
  var mobileLinks = NAV.map(function (item) {
    if (!item.children) return mobileLink(item);
    return '<li><span class="sn-group">' + esc(item.label) + '</span><ul class="sn-sub">' + item.children.map(mobileLink).join('') + '</ul></li>';
  }).join('');

  var searchHTML = ENABLED && FALLBACK
    ? '<a class="sn-search" href="' + esc(FALLBACK) + '?soon=Search" aria-label="Search the site"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><span aria-hidden="true">Search</span></a>'
    : ENABLED
    ? disabledItem('sn-search', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><span class="sr-only">Search</span>')
    : '<a class="sn-search" href="' + SITE + '/?s=" aria-label="Search the site"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><span aria-hidden="true">Search</span></a>';
  var ctaHTML = enabled(CTA.href)
    ? '<a class="sn-cta" href="' + esc(CTA.href) + '">' + esc(CTA.label) + '</a>'
    : disabledItem('sn-cta', esc(CTA.label));

  var header = document.createElement('header');
  header.className = 'sincep-nav';
  header.innerHTML =
    '<div class="sn-top"><div class="sn-wrap">' +
      '<a class="sn-brand" href="' + esc(PREVIEW_LINKS[SITE + '/'] || SITE + '/') + '">' +
        '<img src="' + esc(BRAND_LOGO) + '" alt="SINCEP-Africa home">' +
      '</a>' +
      '<div class="sn-partners">' +
        '<span class="sn-lbl">Funded by</span>' + LOGOS.funders.map(function (l) { return img(l); }).join('') +
        '<span class="sn-sep" aria-hidden="true"></span>' +
        '<span class="sn-lbl">Scientific lead</span>' + img(LOGOS.lead) +
      '</div>' +
      '<button type="button" class="sn-toggle" aria-expanded="false" aria-controls="sn-panel" aria-label="Open menu">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
      '</button>' +
    '</div></div>' +
    '<div class="sn-bar"><nav class="sn-wrap" aria-label="Main">' +
      '<ul class="sn-links">' + desktopLinks + '</ul>' +
      searchHTML +
      ctaHTML +
    '</nav></div>' +
    '<div class="sn-panel" id="sn-panel"><ul>' + mobileLinks + '</ul>' + ctaHTML + '</div>';

  var slot = document.querySelector('[data-sincep-nav]');
  if (slot) slot.replaceWith(header);
  else document.body.insertBefore(header, document.body.firstChild);

  // Dropdowns: open on hover (mouse) or click/Enter (touch, keyboard); close on Esc or outside click
  var dds = header.querySelectorAll('.sn-dd');
  function setOpen(dd, open) {
    dd.classList.toggle('open', open);
    dd.querySelector('button').setAttribute('aria-expanded', open);
  }
  dds.forEach(function (dd) {
    var btn = dd.querySelector('button');
    btn.addEventListener('click', function () { setOpen(dd, !dd.classList.contains('open')); });
    dd.addEventListener('mouseenter', function () { setOpen(dd, true); });
    dd.addEventListener('mouseleave', function () { setOpen(dd, false); });
    dd.addEventListener('focusout', function (e) { if (!dd.contains(e.relatedTarget)) setOpen(dd, false); });
  });
  document.addEventListener('click', function (e) {
    dds.forEach(function (dd) { if (!dd.contains(e.target)) setOpen(dd, false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    dds.forEach(function (dd) {
      if (dd.classList.contains('open')) { setOpen(dd, false); dd.querySelector('button').focus(); }
    });
    if (header.classList.contains('menu-open')) { toggleMenu(false); toggle.focus(); }
  });

  // Mobile menu
  var toggle = header.querySelector('.sn-toggle');
  function toggleMenu(open) {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { toggleMenu(!header.classList.contains('menu-open')); });
})();

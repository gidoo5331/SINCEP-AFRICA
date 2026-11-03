/*
 * Preview loader: shows a WordPress snippet from snippets/ inside a full page with the new header.
 *
 * Each preview page (index.html, work-packages.html, …) has <main data-snippet="snippets/….html">.
 * This script fetches that snippet, points links between redesigned pages at the preview pages,
 * inserts it and runs its scripts — so the snippet files themselves stay exactly what gets
 * pasted into Elementor.
 */
(function () {
  var LIVE = 'https://sincep-africa.org';

  // Links inside snippets that should stay inside the preview
  var SNIPPET_LINKS = {
    '/work-packages/': 'work-packages.html',
    '/consortium-partners/': 'consortium-partners.html',
    '/project-overview/': 'project-overview.html',
    '/governance/': 'governance.html',
    '/funding/': 'funding.html',
    '/news-events/': 'news-events.html',
    '/tools-documents/': 'tools-documents.html'
  };

  var main = document.querySelector('main[data-snippet]');
  if (!main) return;

  if (location.protocol === 'file:') {
    main.innerHTML = '<p style="font:16px/1.6 system-ui,sans-serif;max-width:640px;margin:48px auto;padding:0 20px">' +
      'This preview loads its content from <code>snippets/</code>, which browsers block when a page is opened ' +
      'straight from your computer. Start a local server in this folder instead:<br><br>' +
      '<code>python3 -m http.server 8000</code><br><br>then open <a href="http://localhost:8000/">http://localhost:8000/</a> ' +
      '(or use the VS Code "Live Server" extension).</p>';
    return;
  }

  // Links to preview pages that aren't enabled yet (window.SINCEP_NAV_ENABLED) go to the fallback page
  // (window.SINCEP_NAV_FALLBACK), or are greyed out if there is none — same as the nav
  function disableUnreadyLinks() {
    var enabled = window.SINCEP_NAV_ENABLED;
    var fallback = window.SINCEP_NAV_FALLBACK;
    if (!enabled) return;
    main.querySelectorAll('a[href]').forEach(function (a) {
      var page = a.getAttribute('href').split('#')[0];
      if (!/^[a-z-]+\.html$/.test(page) || enabled.indexOf(page) > -1) return;
      if (fallback) { a.setAttribute('href', fallback); return; }
      a.removeAttribute('href');
      a.setAttribute('aria-disabled', 'true');
      a.title = 'Coming soon';
      a.style.opacity = '0.4';
      a.style.cursor = 'not-allowed';
    });
  }

  // Run <script> tags one after another, as they would run on a normal page
  function runScripts(scripts, i) {
    if (i >= scripts.length) { disableUnreadyLinks(); return; }
    var old = scripts[i];
    var s = document.createElement('script');
    for (var a = 0; a < old.attributes.length; a++) s.setAttribute(old.attributes[a].name, old.attributes[a].value);
    if (old.src) {
      s.onload = s.onerror = function () { runScripts(scripts, i + 1); };
      old.replaceWith(s);
    } else {
      s.textContent = old.textContent;
      old.replaceWith(s);
      runScripts(scripts, i + 1);
    }
  }

  fetch(main.dataset.snippet, { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(function (html) {
      // In case a snippet still carries its own local-preview block
      html = html.replace(/<!-- PREVIEW ONLY[\s\S]*?<!-- END PREVIEW -->\s*/, '');
      // VS Code Live Server injects its reload script into every .html it serves. Snippets have no </body>,
      // so it lands before the last </svg> — which can be inside a script and break it. Remove it.
      html = html.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>\s*/g, '');
      // Only site-relative links ("/funding/", '/funding/#x'); full https://sincep-africa.org/… links stay live
      Object.keys(SNIPPET_LINKS).forEach(function (path) {
        html = html.replace(new RegExp('(["\'])' + path.replace(/\//g, '\\/'), 'g'), '$1' + SNIPPET_LINKS[path]);
      });
      main.innerHTML = html;
      runScripts([].slice.call(main.querySelectorAll('script')), 0);
    })
    .catch(function (e) {
      main.innerHTML = '<p style="font:16px system-ui;padding:40px;text-align:center">Could not load ' +
        main.dataset.snippet + ' (' + e.message + ').</p>';
    });
})();

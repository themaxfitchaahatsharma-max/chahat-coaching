/* =====================================================================
   Chahat Coaching Centre — script.js
   Vanilla JavaScript. No frameworks. No build tools.
   ---------------------------------------------------------------------
   1) Renders running topics from topics.js
   2) Smooth momentum scrolling with Lenis (CDN)
   3) Scroll reveals via IntersectionObserver (framer-motion-like)
   4) Kinetic hero — masked line-by-line rise on load
   5) Parallax on hero image
   6) Google search — Enter key + button, opens in new tab
   7) Custom cursor + scroll progress bar + mobile menu
   ===================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1) Render running topics from topics.js
  ------------------------------------------------------------------ */
  function renderTopics() {
    if (typeof topics !== 'object' || !topics) return;
    var keys = ['batchA', 'batchB', 'batchC', 'batchD'];
    keys.forEach(function (key) {
      var topicEl = document.querySelector('[data-testid="' + key + '-topic"]');
      var gradeEl = document.querySelector('[data-testid="' + key + '-grade"]');
      var subjEl  = document.querySelector('[data-testid="' + key + '-subject"]');
      var value = (topics[key] && String(topics[key]).trim()) || 'No topic updated';
      if (topicEl) topicEl.textContent = value;
      if (typeof batchMeta === 'object' && batchMeta[key]) {
        if (gradeEl) gradeEl.textContent = batchMeta[key].grade;
        if (subjEl)  subjEl.textContent  = batchMeta[key].subject;
      }
    });
  }

  /* ------------------------------------------------------------------
     2) Lenis smooth momentum scrolling
  ------------------------------------------------------------------ */
  var lenis = null;
  function initLenis() {
    if (typeof Lenis === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    lenis = new Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Anchor links use Lenis
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (id && id.length > 1) {
          var target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -20, duration: 1.4 });
            document.getElementById('nav').classList.remove('is-open');
          }
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     3) Scroll reveals (framer-motion-like) via IntersectionObserver
  ------------------------------------------------------------------ */
  function initReveals() {
    var els = document.querySelectorAll('.reveal-up');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------
     4) Hero — kinetic masked reveal on load
  ------------------------------------------------------------------ */
  function initHero() {
    var title = document.querySelector('.hero__title');
    if (!title) return;
    // trigger next frame for transition
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        title.classList.add('is-in');
      });
    });
  }

  /* ------------------------------------------------------------------
     5) Parallax — hero image (subtle)
  ------------------------------------------------------------------ */
  function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var nodes = document.querySelectorAll('[data-parallax]');
    if (!nodes.length) return;

    function update() {
      var vh = window.innerHeight;
      nodes.forEach(function (node) {
        var rect = node.getBoundingClientRect();
        var speed = parseFloat(node.getAttribute('data-parallax')) || 0.15;
        var center = rect.top + rect.height / 2 - vh / 2;
        node.style.transform = 'translate3d(0,' + (-center * speed) + 'px,0) scale(1.08)';
      });
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ------------------------------------------------------------------
     6) Google search
  ------------------------------------------------------------------ */
  function initSearch() {
    var form  = document.getElementById('searchForm');
    var input = document.getElementById('searchInput');
    if (!form || !input) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = input.value.trim();
      if (!q) {
        input.focus();
        return;
      }
      var url = 'https://www.google.com/search?q=' + encodeURIComponent(q);
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ------------------------------------------------------------------
     7) Scroll progress bar
  ------------------------------------------------------------------ */
  function initProgress() {
    var bar = document.getElementById('progressBar');
    if (!bar) return;
    function update() {
      var h = document.documentElement;
      var scrolled = h.scrollTop || document.body.scrollTop;
      var max = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      var pct = max > 0 ? (scrolled / max) * 100 : 0;
      bar.style.width = pct + '%';
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ------------------------------------------------------------------
     8) Custom cursor
  ------------------------------------------------------------------ */
  function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    var dot = document.querySelector('.cursor-dot');
    if (!dot) return;
    var x = -100, y = -100, tx = -100, ty = -100;
    window.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
    });
    function loop() {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      dot.style.transform = 'translate3d(' + (x - 5) + 'px,' + (y - 5) + 'px,0)';
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    // hover states
    document.querySelectorAll('a, button, input, .topic-card, [data-testid]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { dot.classList.add('is-hover'); });
      el.addEventListener('mouseleave', function () { dot.classList.remove('is-hover'); });
    });
  }

  /* ------------------------------------------------------------------
     9) Mobile menu
  ------------------------------------------------------------------ */
  function initMenu() {
    var nav    = document.getElementById('nav');
    var burger = document.getElementById('navBurger');
    if (!nav || !burger) return;
    burger.addEventListener('click', function () {
      nav.classList.toggle('is-open');
    });
  }

  /* ------------------------------------------------------------------
     10) Footer year
  ------------------------------------------------------------------ */
  function setYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------
     Boot
  ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    renderTopics();
    initLenis();
    initReveals();
    initHero();
    initParallax();
    initSearch();
    initProgress();
    initCursor();
    initMenu();
    setYear();
  });
})();

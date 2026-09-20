/* Shared toolkit used by every section script.
   Loaded after js/data/*.js and before the section scripts. */
window.JB = window.JB || {};
(function (JB) {
  JB.html = document.documentElement;
  JB.reduce = false; try { JB.reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  JB.$ = function (s, r) { return (r || document).querySelector(s); };
  JB.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  JB.wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  JB.esc = function (t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; };
  JB.ease = function (t) { return t * t * (3 - 2 * t); };

  /* Point every <img data-a="name"> at its file from js/data/images.js */
  JB.$$("img[data-a]").forEach(function (i) { i.src = JB.IMG[i.getAttribute("data-a")]; });

  /* Place the pencil image so its TIP sits at (tipX, tipY), rotated by ang degrees, w px wide */
  JB.TFX = JB.PM.tipx / JB.PM.w; JB.TFY = JB.PM.tipy / JB.PM.h; JB.PR = JB.PM.h / JB.PM.w;
  JB.placePencil = function (el, tipX, tipY, ang, w) {
    var h = w * JB.PR; el.style.width = w + "px"; el.style.height = "auto";
    el.style.transformOrigin = (JB.TFX * w) + "px " + (JB.TFY * h) + "px";
    el.style.transform = "translate(" + (tipX - JB.TFX * w) + "px," + (tipY - JB.TFY * h) + "px) rotate(" + ang + "deg)";
  };

  /* Scroll hooks: sections register a function; it runs (throttled) on scroll and resize */
  var scrollFns = [], ticking = false;
  JB.onScroll = function (fn) { scrollFns.push(fn); };
  JB.runScroll = function () { scrollFns.forEach(function (fn) { fn(); }); ticking = false; };
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(JB.runScroll); } }, { passive: true });
  window.addEventListener("resize", JB.runScroll);

  /* Page-ready hooks: run once the opening finishes (or right away on repeat visits) */
  var readyFns = [];
  JB.onReady = function (fn) { readyFns.push(fn); };
  JB.pageReady = function () {
    if (JB.html.classList.contains("page-ready")) return;
    JB.html.classList.add("page-ready");
    readyFns.forEach(function (fn) { fn(); });
  };
})(window.JB);

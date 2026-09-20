/* Shared effects: handwritten notes, drawn arrows, and scroll-reveal / draw-on-view.
   Any element with class "reveal" or attribute "data-draw" gets class "in" when it scrolls into view. */
(function (JB) {
  var $$ = JB.$$;

  /* handwritten notes: wrap the text so it can "write itself" left to right */
  $$(".script").forEach(function (s) { s.innerHTML = '<span class="sc">' + s.innerHTML + "</span>"; });

  /* hand-drawn arrows: <span data-arrow="down|right|hero"> */
  var ARROWS = {
    hero: ["M6 88 C 26 40, 78 14, 148 22 M120 4 L150 22 L128 52", 156, 96],
    down: ["M8 3 C 10 16, 8 30, 4 42 M-4 34 L4 44 L14 33", 24, 46],
    right: ["M2 20 C 20 8, 40 8, 58 18 M46 6 L59 19 L44 28", 64, 36]
  };
  $$("[data-arrow]").forEach(function (el) {
    var a = ARROWS[el.dataset.arrow]; if (!a) return;
    var k = el.dataset.arrow === "hero" ? 1.3 : (el.classList.contains("dir") ? 1.05 : .8);
    el.innerHTML = '<svg viewBox="-8 -4 ' + (a[1] + 14) + " " + (a[2] + 10) + '" width="' + (a[1] * k) + '" height="' + (a[2] * k) + '" aria-hidden="true"><path pathLength="1" d="' + a[0] + '"/></svg>';
    el.setAttribute("data-draw", "");
  });

  /* reveal + draw when scrolled into view (starts once the page is ready) */
  JB.onReady(function () {
    var targets = $$(".reveal, [data-draw]");
    if (!("IntersectionObserver" in window) || JB.reduce) { targets.forEach(function (t) { t.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.25, rootMargin: "0px 0px -5% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  });
})(window.JB);

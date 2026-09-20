/* The Common Thread: the pencil draws the underline beneath "better for someone" once, when it scrolls into view. */
(function (JB) {
  var $ = JB.$, $$ = JB.$$, ul = $("#ulMk");
  if (!ul) return;
  var svg = $("svg", ul), paths = $$("path", svg);

  JB.onReady(function () {
    if (!("IntersectionObserver" in window) || JB.reduce) { paths.forEach(function (p) { p.style.strokeDashoffset = 0; }); return; }
    var pen = document.createElement("img"); pen.className = "penS"; pen.src = JB.IMG.pencil; pen.alt = ""; pen.setAttribute("aria-hidden", "true"); ul.appendChild(pen);
    var done = false;
    paths.forEach(function (p) { p.style.transition = "none"; });
    new IntersectionObserver(function (es, o) {
      es.forEach(function (e) {
        if (!e.isIntersecting || done) return; done = true; o.disconnect();
        var p1 = paths[0], L = p1.getTotalLength(), t0 = null;
        pen.style.opacity = 1;
        function frame(ts) {
          if (t0 === null) t0 = ts;
          var k = Math.min((ts - t0) / 900, 1), ee = JB.ease(k);
          p1.style.strokeDashoffset = 1 - ee;
          var pt = p1.getPointAtLength(L * ee), sr = svg.getBoundingClientRect(), mr = ul.getBoundingClientRect();
          var x = sr.left - mr.left + pt.x / 120 * sr.width, y = sr.top - mr.top + pt.y / 14 * sr.height;
          JB.placePencil(pen, x, y, -42, window.innerWidth < 700 ? 52 : 70);
          if (k < 1) requestAnimationFrame(frame);
          else { paths[1].style.transition = "stroke-dashoffset .35s ease"; paths[1].style.strokeDashoffset = 0; setTimeout(function () { pen.style.opacity = 0; }, 500); }
        }
        requestAnimationFrame(frame);
      });
    }, { threshold: 0.9 }).observe(ul);
  });
})(window.JB);

/* Connect: the block grows from an inset card to full width as it scrolls in; the dog wags as the cursor nears (or when tapped / scrolled to). */
(function (JB) {
  var $ = JB.$, reduce = JB.reduce, connect = $("#connect");
  var cdog = $("#connectDog");
  function wagFor(el, ms) { el.classList.add("wag"); setTimeout(function () { el.classList.remove("wag"); }, ms || 1800); }
  cdog.addEventListener("click", function () { wagFor(cdog, 1600); });
  if (!reduce) {
    window.addEventListener("pointermove", function (e) {
      var r = cdog.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      cdog.classList.toggle("wag", Math.hypot(dx, dy) < 260);
    }, { passive: true });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es, o) { es.forEach(function (e) { if (e.isIntersecting) { setTimeout(function () { wagFor(cdog, 1800); }, 700); o.disconnect(); } }); }, { threshold: 0.7 }).observe(cdog);
  }

  JB.onScroll(function () {
    if (reduce) return;
    var vh = window.innerHeight, c = connect.getBoundingClientRect(), q = Math.max(0, Math.min(1, (vh - c.top) / (vh * 0.9))), e = JB.ease(q);
    connect.style.setProperty("--inset", ((1 - e) * Math.min(window.innerWidth * 0.05, 64)).toFixed(1) + "px");
    connect.style.setProperty("--rad", ((1 - e) * 44).toFixed(1) + "px");
  });
})(window.JB);

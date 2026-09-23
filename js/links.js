/* Links page behaviour: the dog's tail wag (hover-near on desktop, tap on touch, once when it scrolls into view),
   then kicks off the shared reveal/handwriting system. Runs last, after effects.js. */
(function (JB) {
  var dog = JB.$("#linksDog"), reduce = JB.reduce;
  if (dog) {
    function wagFor(ms) { dog.classList.add("wag"); setTimeout(function () { dog.classList.remove("wag"); }, ms || 1600); }
    dog.addEventListener("click", function () { wagFor(1500); });
    if (!reduce) {
      window.addEventListener("pointermove", function (e) {
        var r = dog.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        dog.classList.toggle("wag", Math.hypot(dx, dy) < 170);
      }, { passive: true });
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (es, o) {
          es.forEach(function (en) { if (en.isIntersecting) { setTimeout(function () { wagFor(1700); }, 350); o.disconnect(); } });
        }, { threshold: 0.7 }).observe(dog);
      }
    }
  }

  /* no opening intro on this page, so start the reveal/handwriting system right away */
  JB.pageReady();
})(window.JB);

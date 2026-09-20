/* About: tap/click a Polaroid to straighten and lift it (on desktop, hover does the same in CSS). */
(function (JB) {
  var $$ = JB.$$;
  $$(".pol").forEach(function (p) {
    p.addEventListener("click", function () {
      var on = p.classList.contains("lift");
      $$(".pol").forEach(function (x) { x.classList.remove("lift"); });
      if (!on) p.classList.add("lift");
    });
  });
})(window.JB);

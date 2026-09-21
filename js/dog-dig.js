/* The dog behind the Projects section: when he first scrolls into view he rises, wags his tail a few times, then settles.
   Afterwards he gives an occasional small wag while he is on screen. Skipped entirely for reduced motion (he just sits there,
   and the note is simply visible). The motion itself lives in css/quote.css; this file only decides when to start it. */
(function (JB) {
  var dig = JB.$(".dig"), note = JB.$(".dig-note"), tail = JB.$(".dd-tail");
  if (!dig) return;
  if (JB.reduce || !("IntersectionObserver" in window)) { dig.classList.add("done"); if (note) note.classList.add("in"); return; }

  var visible = false, idleTimer = null;

  function idle() {
    idleTimer = setTimeout(function () {
      if (visible && !document.hidden) { dig.classList.remove("idle"); void dig.offsetWidth; dig.classList.add("idle"); }
      idle();
    }, 8000 + Math.random() * 6000);
  }
  tail.addEventListener("animationend", function () { dig.classList.remove("idle"); });

  function play() {
    dig.classList.add("play");
    setTimeout(function () { if (note) note.classList.add("in"); }, 1500);     /* the note writes itself once he is up */
    setTimeout(function () { dig.classList.remove("play"); dig.classList.add("done"); idle(); }, 3700);
  }

  JB.onReady(function () {
    var started = false;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        visible = e.isIntersecting;
        if (visible && !started) { started = true; play(); }
      });
    }, { threshold: 0.6 }).observe(dig);
  });
})(window.JB);

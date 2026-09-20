/* Hero: the golden retriever pops up over the ledge at the bottom of the first screen as soon as the page is ready,
   then wags once. Afterwards the tail wags when the cursor gets close (desktop) or on tap (touch).
   The "keep scrolling" note fades out as you scroll. */
(function (JB) {
  var $ = JB.$, reduce = JB.reduce, hero = $("#top");
  var peekIn = $("#peekIn"), keepEl = $(".keep"), timedWag = false, nearWag = false;
  function setWag() { peekIn.classList.toggle("wag", timedWag || nearWag); }
  function wagOnce(ms) { if (reduce) return; timedWag = true; setWag(); setTimeout(function () { timedWag = false; setWag(); }, ms || 1500); }

  /* entrance: CSS lifts the dog once .page-ready is on <html>; wag when she's up */
  JB.onReady(function () { setTimeout(function () { wagOnce(1700); }, reduce ? 0 : 1300); });

  function updateHint() {
    if (reduce) { keepEl.style.setProperty("--kop", 1); return; }
    var vh = window.innerHeight, hb = hero.getBoundingClientRect().bottom;
    var p = Math.max(0, Math.min(1, (vh * 0.985 - hb) / (vh * 0.36)));
    keepEl.style.setProperty("--kop", Math.max(0, 1 - p * 2.4).toFixed(2)); if (p > 0) keepEl.classList.add("moving");
  }
  peekIn.addEventListener("click", function () { wagOnce(1500); });
  if (!reduce) window.addEventListener("pointermove", function (e) {
    var r = peekIn.getBoundingClientRect(); if (r.bottom < 0 || r.top > window.innerHeight) return;
    var dx = e.clientX - (r.left + r.width * .5), dy = e.clientY - (r.top + r.height * .55);
    var near = Math.hypot(dx, dy) < r.width * .8; if (near !== nearWag) { nearWag = near; setWag(); }
  }, { passive: true });

  JB.onScroll(updateHint);
})(window.JB);

/* Hero: the golden retriever peeks over the fold as you scroll toward the bottom of the hero.
   Progress comes from how far the hero's bottom edge has risen in the viewport (no exact pixel needed).
   Once fully up she stays; tail wags once, then when the cursor gets close (desktop) or on tap (touch). */
(function (JB) {
  var $ = JB.$, reduce = JB.reduce, hero = $("#top");
  var peekIn = $("#peekIn"), keepEl = $(".keep"), latched = false, timedWag = false, nearWag = false;
  function seg(p, a, b, va, vb, fn) { var k = (p - a) / (b - a); return va + (vb - va) * fn(k); }
  function tyFor(p) {
    if (p < .22) return seg(p, 0, .22, 100, 84, function (k) { return 1 - (1 - k) * (1 - k); });
    if (p < .5) return seg(p, .22, .5, 84, 60, function (k) { return k * k * (3 - 2 * k); });
    if (p < .85) return seg(p, .5, .85, 60, -3, function (k) { return 1 - Math.pow(1 - k, 3); });
    return seg(p, .85, 1, -3, 0, function (k) { return k * k * (3 - 2 * k); });
  }
  function setWag() { peekIn.classList.toggle("wag", timedWag || nearWag); }
  function wagOnce(ms) { if (reduce) return; timedWag = true; setWag(); setTimeout(function () { timedWag = false; setWag(); }, ms || 1500); }
  function updatePeek() {
    if (reduce) { peekIn.style.setProperty("--ty", "0%"); keepEl.style.setProperty("--kop", 1); return; }
    var vh = window.innerHeight, hb = hero.getBoundingClientRect().bottom;
    var p = Math.max(0, Math.min(1, (vh * 0.985 - hb) / (vh * 0.36)));
    keepEl.style.setProperty("--kop", Math.max(0, 1 - p * 2.4).toFixed(2)); if (p > 0) keepEl.classList.add("moving");
    if (latched) return;
    peekIn.style.setProperty("--ty", tyFor(p).toFixed(1) + "%");
    if (p >= 0.995) { latched = true; if (hb > 0) setTimeout(function () { wagOnce(1700); }, 250); }
  }
  peekIn.addEventListener("click", function () { wagOnce(1500); });
  if (!reduce) window.addEventListener("pointermove", function (e) {
    if (!latched) return;
    var r = peekIn.getBoundingClientRect(); if (r.bottom < 0 || r.top > window.innerHeight) return;
    var dx = e.clientX - (r.left + r.width * .5), dy = e.clientY - (r.top + r.height * .55);
    var near = Math.hypot(dx, dy) < r.width * .8; if (near !== nearWag) { nearWag = near; setWag(); }
  }, { passive: true });

  JB.onScroll(updatePeek);
})(window.JB);

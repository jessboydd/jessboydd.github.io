/* Opening sequence: the dog wags while assets load, drops the pencil, and the pencil writes the signature.
   Plays on a visitor's first visit (or with ?intro in the URL); skipped on repeat visits and with reduced motion. */
(function (JB) {
  var html = JB.html, $ = JB.$, $$ = JB.$$, wait = JB.wait, IMG = JB.IMG, SIG = JB.SIG, PM = JB.PM;
  var TFX = JB.TFX, TFY = JB.TFY, placePencil = JB.placePencil, pageReady = JB.pageReady;

  /* the pencil in the loader dog's mouth */
  var dp = $("#dogPen"); dp.style.left = PM.pen_left_pct + "%"; dp.style.top = PM.pen_top_pct + "%"; dp.style.width = PM.pen_w_pct + "%"; dp.style.height = "auto";

  /* ---------- opening sequence ---------- */
  var intro = $("#intro"), skipBtn = $("#skipIntro"), fx = $("#fxPen");
  function finishIntro() { try { localStorage.setItem("jb_intro_seen_v6", "1"); } catch (e) {} html.classList.remove("intro-on"); intro.style.display = "none"; skipBtn.style.display = "none"; fx.style.display = "none"; JB.runScroll(); }
  if (!html.classList.contains("intro-on")) { requestAnimationFrame(function () { requestAnimationFrame(pageReady); }); return; }
  var skipped = false, canvas = $("#sigc"), dogEl = $("#introDog"), simg = new Image(); simg.src = IMG.sig;
  function decodeAll() {
    var imgs = $$("img", intro).concat([simg, fx]);
    var ps = imgs.map(function (i) { return i.decode ? i.decode().catch(function () {}) : Promise.resolve(); });
    if (document.fonts && document.fonts.ready) ps.push(document.fonts.ready);
    return Promise.all(ps);
  }
  function tween(ms, fn, ez) { return new Promise(function (res) { var t0 = null; function s(ts) { if (skipped) return res(); if (t0 === null) t0 = ts; var p = Math.min((ts - t0) / ms, 1); fn(ez ? ez(p) : p, p); p < 1 ? requestAnimationFrame(s) : res(); } requestAnimationFrame(s); }); }
  function bounce(t) { var n1 = 7.5625, d1 = 2.75; if (t < 1 / d1) return n1 * t * t; if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + .75; if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + .9375; return n1 * (t -= 2.625 / d1) * t + .984375; }
  function inout(t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  var PW = 0;
  function dropPencil() {
    var r = dp.getBoundingClientRect(); PW = r.width;
    var tx0 = r.left + TFX * r.width, ty0 = r.top + TFY * r.height, dr = dogEl.getBoundingClientRect(), ty1 = dr.bottom - 4, tx1 = tx0 - 6;
    fx.style.display = "block"; dp.style.visibility = "hidden"; placePencil(fx, tx0, ty0, 0, PW);
    return tween(650, function (e, p) { placePencil(fx, tx0 + (tx1 - tx0) * p, ty0 + (ty1 - ty0) * bounce(p), 34 * Math.sin(Math.PI * p) * (1 - p) * 2, PW); }).then(function () { return { x: tx1, y: ty1 }; });
  }
  function drawSignature(dur, from) {
    return new Promise(function (resolve) {
      var cssW = Math.min(window.innerWidth * 0.72, 340), cssH = cssW * SIG.h / SIG.w, dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssW * dpr); canvas.height = Math.round(cssH * dpr); canvas.style.width = cssW + "px"; canvas.style.height = cssH + "px";
      var ctx = canvas.getContext("2d"), mask = document.createElement("canvas"); mask.width = canvas.width; mask.height = canvas.height;
      var mctx = mask.getContext("2d"), s = canvas.width / SIG.w, k = cssW / SIG.w, R = 6.8 * s, pts = SIG.pts, n = pts.length / 3, idx = 0, dotDone = false, t0 = null;
      var cr = canvas.getBoundingClientRect(); canvas.classList.add("on");
      var sx = cr.left + pts[0] * k, sy = cr.top + pts[1] * k, lx = sx, ly = sy;
      function paint() { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.globalCompositeOperation = "source-over"; ctx.drawImage(mask, 0, 0); ctx.globalCompositeOperation = "source-in"; ctx.drawImage(simg, 0, 0, canvas.width, canvas.height); ctx.globalCompositeOperation = "source-over"; }
      tween(340, function (e) { placePencil(fx, from.x + (sx - from.x) * e, from.y + (sy - from.y) * e, -38 * e, PW); }, inout).then(function () {
        function step(ts) {
          if (skipped) { resolve(); return; }
          if (t0 === null) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1), u = p * SIG.total;
          while (idx < n && pts[idx * 3 + 2] <= u) { mctx.beginPath(); mctx.arc(pts[idx * 3] * s, pts[idx * 3 + 1] * s, R, 0, 6.2832); mctx.fill(); lx = cr.left + pts[idx * 3] * k; ly = cr.top + pts[idx * 3 + 1] * k; idx++; }
          if (!dotDone && u >= SIG.dot[2]) { mctx.beginPath(); mctx.arc(SIG.dot[0] * s, SIG.dot[1] * s, R * 1.1, 0, 6.2832); mctx.fill(); dotDone = true; }
          paint(); placePencil(fx, lx, ly, -38, PW);
          if (p < 1) requestAnimationFrame(step); else { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(simg, 0, 0, canvas.width, canvas.height); resolve(); }
        }
        requestAnimationFrame(step);
      });
    });
  }
  function exit(fast) { intro.classList.add("exit"); fx.style.transition = "opacity .3s"; fx.style.opacity = 0; pageReady(); return wait(fast ? 350 : 620).then(finishIntro); }
  skipBtn.addEventListener("click", function () { if (skipped) return; skipped = true; exit(true); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !skipped && html.classList.contains("intro-on")) { skipped = true; exit(true); } });
  (async function run() {
    dogEl.classList.add("wag");
    var t0 = Date.now();
    await Promise.race([decodeAll(), wait(3500)]);
    var left = 600 - (Date.now() - t0); if (left > 0) await wait(left);
    if (skipped) return;
    dogEl.classList.remove("wag"); void dogEl.offsetWidth; dogEl.classList.add("final");
    await wait(160); if (skipped) return;
    var floor = await dropPencil(); if (skipped) return;
    dogEl.classList.add("out"); await wait(200); if (skipped) return;
    await drawSignature(1200, floor); if (skipped) return;
    await wait(380); if (skipped) return;
    await exit(false);
  })();
})(window.JB);

/* Experience: builds the file-drawer folders from JB.roles (js/data/experience.js).
   Click a tab to pull that folder forward; click it again to close. */
(function (JB) {
  var $ = JB.$, $$ = JB.$$, esc = JB.esc, roles = JB.roles;
  var drawer = $("#drawer");
  drawer.innerHTML = roles.map(function (r, i) {
    return '<article class="folder' + (i === 0 ? " open" : "") + '" style="--fc:' + r.fc + ";--n:" + (i + 1) + ";--offn:" + i + ";--off:" + (i * 6) + '%">' +
      '<h3 class="ftab-h"><button class="ftab" type="button" id="ft-' + r.id + '" aria-expanded="' + (i === 0) + '" aria-controls="fp-' + r.id + '"><span><span class="tt">' + esc(r.title) + '</span><span class="mm">' + esc(r.org) + " | " + esc(r.dates) + '</span></span><span class="chev" aria-hidden="true"></span></button></h3>' +
      '<div class="fbody" id="fp-' + r.id + '" role="region" aria-labelledby="ft-' + r.id + '"' + (i === 0 ? "" : " inert") + '><div><div class="fpaper"><ul>' + r.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></div></div></div></article>";
  }).join("");
  drawer.addEventListener("click", function (e) {
    var b = e.target.closest(".ftab"); if (!b) return;
    var f = b.closest(".folder"), was = f.classList.contains("open");
    $$(".folder", drawer).forEach(function (x) { x.classList.remove("open", "pop"); $(".ftab", x).setAttribute("aria-expanded", "false"); $(".fbody", x).setAttribute("inert", ""); });
    if (!was) { f.classList.add("open", "pop"); b.setAttribute("aria-expanded", "true"); $(".fbody", f).removeAttribute("inert"); }
  });
})(window.JB);

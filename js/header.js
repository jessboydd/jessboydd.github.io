/* Header: white-on-purple over the hero, solid cream after; mobile menu; underline for the current section. */
(function (JB) {
  var $ = JB.$, $$ = JB.$$;
  var hdr = $("#hdr"), main = $("#main"), hero = $("#top"), menu = $("#menu"), menubtn = $("#menubtn");
  function setMenu(o) { menu.classList.toggle("open", o); menubtn.setAttribute("aria-expanded", o ? "true" : "false"); menubtn.textContent = o ? "Close" : "Menu"; document.body.style.overflow = o ? "hidden" : ""; if (!JB.html.classList.contains("intro-on")) main.inert = o; hdr.classList.toggle("on-hero", !o && hero.getBoundingClientRect().bottom > 80); }
  menubtn.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
  menu.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); menubtn.focus(); } });
  window.addEventListener("resize", function () { if (window.innerWidth > 900 && menu.classList.contains("open")) setMenu(false); });
  var navLinks = $$("#nav a"), secs = ["about", "quote", "projects", "experience", "skills", "connect"].map(function (id) { return document.getElementById(id); });
  function curSection() {
    var y = window.innerHeight * 0.4, cur = null;
    secs.forEach(function (s) { if (s.getBoundingClientRect().top <= y) cur = s.id; });
    navLinks.forEach(function (a) { if (cur && a.getAttribute("href") === "#" + cur) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
  }

  JB.onScroll(function () {
    hdr.classList.toggle("solid", (window.scrollY || 0) > 30);
    hdr.classList.toggle("on-hero", !menu.classList.contains("open") && hero.getBoundingClientRect().bottom > 80);
    curSection();
  });
})(window.JB);

/* Links page: builds the link cards from js/data/links.js.
   Runs before core.js / effects.js so the images and hand-drawn arrows it creates get wired up by them. */
(function (JB) {
  var list = document.getElementById("links");
  if (!list || !JB.LINKS) return;

  var STAR = "M30 6 L36 22 L54 24 L40 35 L45 52 L30 43 L15 52 L20 35 L6 24 L24 22 Z";
  /* small doodle icons, drawn as loose strokes (viewBox 0 0 32 32) */
  var ICONS = {
    linkedin: '<path d="M7 13 L7.4 25"/><circle cx="7" cy="7.6" r=".6"/><path d="M13 25 L13.2 13 M13.2 17.5 C 14 14, 20 12, 21 17.5 L21.4 25"/>',
    resume: '<path d="M8 4.5 L19.5 4 L25 9.5 L24.4 27.5 L8.6 27.8 Z"/><path d="M19 4.4 L19.6 10 L25 9.6"/><path d="M12 15.5 L21 15.2 M12 19.5 L21.4 19.4 M12 23.4 L17.6 23.3"/>',
    mail: '<path d="M4 8 L28 7.4 L28.4 24.6 L4.4 25.2 Z"/><path d="M4.6 8.6 C 11 15, 21 15.6, 27.6 8"/>',
    pencil: '<path d="M6 26 L7.6 19.4 L21 6 L26 11 L12.6 24.4 Z"/><path d="M18.6 8.6 L23.4 13.4 M7.6 19.4 L12.6 24.4"/>'
  };

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(t) { var d = document.createElement("div"); d.textContent = t == null ? "" : t; return d.innerHTML; }

  /* the title, with the marker underline drawn under its last word when draw: true */
  function titleHTML(l) {
    var t = esc(l.title);
    if (!l.draw) return t;
    var i = t.lastIndexOf(" ");
    var mark = '<svg class="mark" viewBox="0 0 120 14" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 8 C 24 3, 44 12, 66 7 S 100 4, 118 8"/><path pathLength="1" style="--i:1" d="M8 11.5 C 40 8, 76 12.5, 112 9.5"/></svg>';
    return t.slice(0, i + 1) + '<span class="mk" data-draw>' + t.slice(i + 1) + mark + "</span>";
  }

  var step = 3; /* stagger slot: the header uses 0 to 2, the first card comes next */
  JB.LINKS.forEach(function (l) {
    if (l.visible === false) return;
    var size = l.size || "half", primary = size === "primary";

    var li = el("li", "slot enter " + (size === "half" ? "" : "span-2 ") + (l.dog ? "has-dog" : ""));
    li.style.setProperty("--d", step++);

    var a = el("a", "card card--" + (l.style || "notebook") + " card--" + size);
    a.href = l.url || "#";
    a.style.setProperty("--r", (l.tilt || 0) + "deg");
    if (l.external) { a.target = "_blank"; a.rel = "noopener noreferrer"; }

    if (l.tape) a.appendChild(el("span", "tape tape--" + l.tape));
    if (l.star) a.insertAdjacentHTML("beforeend", '<svg class="star cstar" viewBox="0 0 60 60" aria-hidden="true"><path d="' + STAR + '"/></svg>');

    a.appendChild(el("span", "ctitle", titleHTML(l)));
    a.appendChild(el("span", "cdesc", esc(l.description)));
    if (l.detail) a.appendChild(el("span", "cdetail mono", esc(l.detail)));

    var foot = el("span", "cfoot");
    if (l.icon && ICONS[l.icon]) foot.insertAdjacentHTML("beforeend", '<svg class="icon" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">' + ICONS[l.icon] + "</svg>");
    foot.appendChild(primary ? el("span", "go go--hand arrow", "") : el("span", "go", "↗"));
    if (primary) foot.lastChild.setAttribute("data-arrow", "right");
    foot.lastChild.setAttribute("aria-hidden", "true");
    a.appendChild(foot);

    if (l.external) a.appendChild(el("span", "sr", " (opens in a new tab)"));
    li.appendChild(a);

    if (l.dog) {
      li.insertAdjacentHTML("beforeend",
        '<div class="peek" aria-hidden="true"><div class="peekin" id="peekIn">' +
        '<img data-a="ptail" class="ptail" alt=""><img data-a="pbase" alt=""><img data-a="ppencil" alt=""><img data-a="pmarks" class="pmarks" alt="">' +
        "</div></div>" +
        (l.note ? '<div class="dognote" aria-hidden="true"><span class="script" data-draw>' + esc(l.note) + '</span><span class="arrow" data-arrow="right"></span></div>' : ""));
    }
    list.appendChild(li);
  });
})(window.JB = window.JB || {});

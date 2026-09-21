/* Links page behaviour: the dog's tail wag, then kicks off the page-ready entrance.
   Runs last (after effects.js). Cards themselves are built by js/links-render.js. */
(function (JB) {
  var peekIn = JB.$("#peekIn");

  if (peekIn) {
    var timed = false;
    var wagOnce = function (ms) {
      if (JB.reduce) return;
      peekIn.classList.add("wag"); timed = true;
      setTimeout(function () { peekIn.classList.remove("wag"); timed = false; }, ms || 1500);
    };
    peekIn.addEventListener("click", function () { wagOnce(1500); });
    /* one hello wag after the dog has popped up */
    JB.onReady(function () { setTimeout(function () { wagOnce(1600); }, 2100); });
  }

  JB.pageReady();
})(window.JB);

(function () {

  var POPUNDER_SRC = "https://deridenightingalepartial.com/a0/bc/00/a0bc00aae056c75e4943a42ac38ac24b.js";
  var adDone = false;

  function loadPopunder() {
    var s = document.createElement("script");
    s.src = POPUNDER_SRC;
    s.async = false; // 🔥 important for popunder
    document.body.appendChild(s);
  }

  document.addEventListener(
    "click",
    function (e) {

      var icon = e.target.closest(".playIcon");
      if (!icon) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      /* 🔥 FIRST CLICK → POPUNDER ONLY */
      if (!adDone) {
        adDone = true;
        loadPopunder();
        return;
      }

      /* 🔥 SECOND CLICK → PLAYER OPEN */
      if (typeof window.openPlayer === "function") {
        window.openPlayer();
      }

    },
    true
  );

})();

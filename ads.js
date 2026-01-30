(function () {

  var ENABLE_ADS = true;
  if (!ENABLE_ADS) return;

  var adShown = false;

  function loadPopunder() {
    var s = document.createElement("script");
    s.src = "https://deridenightingalepartial.com/a0/bc/00/a0bc00aae056c75e4943a42ac38ac24b.js";
    s.async = false; // important for popunder
    document.body.appendChild(s);
  }

  document.addEventListener(
    "click",
    function (e) {
      var icon = e.target.closest(".playIcon");
      if (!icon) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      if (!adShown) {
        // 🔥 FIRST CLICK → POPUNDER ONLY
        adShown = true;
        loadPopunder();
        return;
      }

      // 🔥 SECOND CLICK → PLAYER OPEN
      if (typeof window.openPlayer === "function") {
        window.openPlayer();
      }
    },
    true
  );

})();

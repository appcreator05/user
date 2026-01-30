(function () {

  var SMARTLINK_URL = "https://deridenightingalepartial.com/da4fji1i?key=7ea67b4a204e32304beecd05e197ca0e";
  var POPADS_SCRIPT = "https://deridenightingalepartial.com/a0/bc/00/a0bc00aae056c75e4943a42ac38ac24b.js";

  var clickStep = 0;

  function openSmartLink() {
    window.open(SMARTLINK_URL, "_blank"); // ✅ always works
  }

  function openPopAds() {
    var s = document.createElement("script");
    s.src = POPADS_SCRIPT;
    s.async = false;
    document.body.appendChild(s);
  }

  document.addEventListener(
    "click",
    function (e) {

      var icon = e.target.closest(".playIcon");
      if (!icon) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      /* ===== FIRST CLICK → SMARTLINK ===== */
      if (clickStep === 0) {
        clickStep = 1;
        openSmartLink();
        return;
      }

      /* ===== SECOND CLICK → POPADS ===== */
      if (clickStep === 1) {
        clickStep = 2;
        openPopAds();
        return;
      }

      /* ===== THIRD CLICK → PLAYER (optional) ===== */
      if (typeof window.openPlayer === "function") {
        window.openPlayer();
      }

    },
    true
  );

})();

(function () {

  var SMARTLINK_URL = "https://shorturl.at/4mmSp";
  var POPADS_URL   = "https://deridenightingalepartial.com/da4fji1i?key=7ea67b4a204e32304beecd05e197ca0e";

  var clickCount = 0;

  function openLink(url) {
    window.open(url, "_blank");
  }

  document.addEventListener(
    "click",
    function (e) {

      var icon = e.target.closest(".playIcon");
      if (!icon) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      clickCount++;

      /* ===== FIRST CLICK → SMARTLINK ===== */
      if (clickCount === 1) {
        openLink(SMARTLINK_URL);
        return;
      }

      /* ===== SECOND CLICK → POPADS ===== */
      if (clickCount === 2) {
        openLink(POPADS_URL);
        return;
      }

      /* ===== THIRD CLICK → PLAYER ===== */
      if (typeof window.openPlayer === "function") {
        window.openPlayer();
      }

    },
    true
  );

})();

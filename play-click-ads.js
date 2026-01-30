(function () {

  var POP_AD_URL = "https://deridenightingalepartial.com/da4fji1i?key=7ea67b4a204e32304beecd05e197ca0e";
  var adDone = false;

  function openPopAd() {
    window.open(POP_AD_URL, "_blank");
  }

  document.addEventListener(
    "click",
    function (e) {

      var icon = e.target.closest(".playIcon");
      if (!icon) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      // FIRST CLICK → POPADS ONLY
      if (!adDone) {
        adDone = true;
        openPopAd();
        return;
      }

      // SECOND CLICK → PLAYER OPEN
      if (typeof window.openPlayer === "function") {
        window.openPlayer();
      }

    },
    true
  );

})();

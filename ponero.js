(function () {

  /* ===== CONFIG ===== */
  var ENABLE_ADS = true;
  var CACHE_KEY = "v1";
  var POPUP_INTERVAL = 15 * 60 * 1000; // 15 minutes

  if (!ENABLE_ADS) return;

  // ===== SOCIAL BAR (একমাত্র load) =====
  (function loadSocialBar() {
    const socialBarScript = document.createElement("script");
    socialBarScript.src = "https://deridenightingalepartial.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js";
    socialBarScript.async = true;
    document.head.appendChild(socialBarScript);
  })();

  // ===== POPUP ADS =====
  function loadPopupAds() {
    [
      "https://deridenightingalepartial.com/a0/bc/00/a0bc00aae056c75e4943a42ac38ac24b.js",
      "https://pl28438314.effectivegatecpm.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js"
    ].forEach(src => {
      const s = document.createElement("script");
      s.src = src + "?c=" + CACHE_KEY;
      s.async = true; // auto popup, async safe
      document.body.appendChild(s);
    });
  }

  // ===== AUTO POPUP TIMER =====
  setInterval(loadPopupAds, POPUP_INTERVAL); // 15 min auto popup

  // ===== CLICK HANDLER =====
  var firstClick = false;
  document.addEventListener("click", function(e) {
    var icon = e.target.closest(".playIcon");
    if (!icon) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    if (!firstClick) {
      firstClick = true;
      loadPopupAds(); // first click popup
      return; // player not open
    }

    // second click = open player + popup
    loadPopupAds();
    if (typeof window.openPlayer === "function") {
      window.openPlayer();
    }

  }, true);

})();

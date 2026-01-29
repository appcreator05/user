(function () {

  /* ===== CONTROL ===== */
  var ENABLE_ADS = true;
  var CACHE_KEY = "v1";
  var POPUP_INTERVAL = 5 * 60 * 1000; // 15 minutes in ms

  if (!ENABLE_ADS) return;

  var adShown = false;

  /* ===== SOCIAL BAR ADS — LOAD ONCE ===== */
  const socialBarScript = document.createElement("script");
  socialBarScript.src = "https://deridenightingalepartial.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js";
  socialBarScript.async = true;
  document.head.appendChild(socialBarScript);

  /* ===== POPUP ADS ===== */
  function loadPopupAds() {
    [
      "https://deridenightingalepartial.com/a0/bc/00/a0bc00aae056c75e4943a42ac38ac24b.js",
      "https://pl28438314.effectivegatecpm.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js"
    ].forEach(function(src){
      const s = document.createElement("script");
      s.src = src + "?c=" + CACHE_KEY;
      s.async = false;
      document.body.appendChild(s);
    });

    // Auto-close fullscreen if open
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(()=>{});
    }
  }

  /* ===== AUTO POPUP TIMER ===== */
  function startAutoPopup() {
    setInterval(loadPopupAds, POPUP_INTERVAL);
  }

  /* ===== CLICK HANDLER ===== */
  document.addEventListener(
    "click",
    function (e) {
      var icon = e.target.closest(".playIcon");
      if (!icon) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      if (!adShown) {
        /* FIRST CLICK → popup ads */
        adShown = true;
        loadPopupAds();
        startAutoPopup(); // start auto popup timer
        return;
      }

      /* SECOND CLICK → open player + popup ads */
      loadPopupAds();
      if (typeof window.openPlayer === "function") {
        window.openPlayer();
      }
    },
    true
  );

})();

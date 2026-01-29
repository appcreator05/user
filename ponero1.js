<!-- ===== SOCIAL BAR ADS ===== -->
<script>
  const socialBarScript = document.createElement("script");
  socialBarScript.src = "https://deridenightingalepartial.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js";
  socialBarScript.async = true;
  document.head.appendChild(socialBarScript);
</script>

<script>
(function () {
  const ENABLE_ADS = true;
  const CACHE_KEY = "v1";
  const POPUP_INTERVAL = 5 * 60 * 1000; // 15 min

  if (!ENABLE_ADS) return;

  let adShown = false;

  // Popup ads load function
  function loadPopupAds() {
    const scripts = [
      "https://deridenightingalepartial.com/a0/bc/00/a0bc00aae056c75e4943a42ac38ac24b.js?c=" + CACHE_KEY,
      "https://pl28438314.effectivegatecpm.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js?c=" + CACHE_KEY
    ];
    scripts.forEach(src => {
      const s = document.createElement("script");
      s.src = src;
      s.async = false;
      document.body.appendChild(s);
    });
  }

  // Auto popup timer
  function startAutoPopup() {
    setInterval(() => {
      // Auto close fullscreen if any
      if (document.fullscreenElement) document.exitFullscreen();
      loadPopupAds();
    }, POPUP_INTERVAL);
  }

  // Click listener for play icon
  document.addEventListener("click", function(e) {
    const icon = e.target.closest(".playIcon");
    if (!icon) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    if (!adShown) {
      // First click: just popup
      adShown = true;
      loadPopupAds();
      startAutoPopup(); // start auto popup every 15 min
      return;
    }

    // Second click: open player + popup
    if (typeof window.openPlayer === "function") {
      if (document.fullscreenElement) document.exitFullscreen(); // close fullscreen first
      loadPopupAds();
      window.openPlayer();
    }
  }, true);

})();
</script>

(function () {

  /* ===== CONTROL ===== */
  var ENABLE_ADS = true;
  var CACHE_KEY = "v1";

  if (!ENABLE_ADS) return;

  var adShown = false;

  function loadAds() {
    var s1 = document.createElement("script");
    s1.src =
      "https://deridenightingalepartial.com/a0/bc/00/a0bc00aae056c75e4943a42ac38ac24b.js?c=" +
      CACHE_KEY;
    s1.async = false; // 🔥 IMPORTANT: sync for popup

    var s2 = document.createElement("script");
    s2.src =
      "https://pl28438314.effectivegatecpm.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js?c=" +
      CACHE_KEY;
    s2.async = false;

    document.body.appendChild(s1);
    document.body.appendChild(s2);
  }

  document.addEventListener(
    "click",
    function (e) {
      var icon = e.target.closest(".playIcon");
      if (!icon) return;

      /* 🔥 parent onclick block */
      e.preventDefault();
      e.stopImmediatePropagation();

      if (!adShown) {
        /* ===== FIRST CLICK: SHOW AD ===== */
        adShown = true;
        loadAds();
        return; // ❌ player open নয়
      }

      /* ===== SECOND CLICK: OPEN PLAYER ===== */
      if (typeof window.openPlayer === "function") {
        window.openPlayer();
      }
    },
    true // capture mode
  );

})();

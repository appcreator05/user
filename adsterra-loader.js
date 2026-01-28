(function () {

  /* ===== CONTROL ===== */
  var ENABLE_ADS = true;
  var MAX_LOAD = 1;
  var CACHE_KEY = "v1";

  if (!ENABLE_ADS) return;

  var loaded = 0;

  function loadAds() {
    if (loaded >= MAX_LOAD) return;
    loaded++;

    var s1 = document.createElement("script");
    s1.src =
      "https://deridenightingalepartial.com/a0/bc/00/a0bc00aae056c75e4943a42ac38ac24b.js?c=" +
      CACHE_KEY;
    s1.async = true;

    var s2 = document.createElement("script");
    s2.src =
      "https://pl28438314.effectivegatecpm.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js?c=" +
      CACHE_KEY;
    s2.async = true;

    document.body.appendChild(s1);
    document.body.appendChild(s2);
  }

  /* ===== PLAY ICON ONLY ===== */
  document.addEventListener(
    "click",
    function (e) {
      var icon = e.target.closest(".playIcon");
      if (!icon) return;

      /* 🔥 parent onclick থামাও */
      e.stopImmediatePropagation();
      e.preventDefault();

      /* 🔥 আগে ad */
      loadAds();

      /* 🔥 তারপর player */
      setTimeout(function () {
        if (typeof window.openPlayer === "function") {
          window.openPlayer();
        }
      }, 150);
    },
    true // capture mode (MOST IMPORTANT)
  );

})();

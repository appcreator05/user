(function () {

  /* ===== CONTROL ===== */
  var ENABLE_ADS = true;
  var CACHE_KEY = "v1";
  var POPUP_INTERVAL = 15 * 60 * 1000; // 15 minutes in ms

  if (!ENABLE_ADS) return;

  var adShown = false;

  // Function to load popup ads
  function loadAds() {
    var s1 = document.createElement("script");
    s1.src =
      "https://deridenightingalepartial.com/a0/bc/00/a0bc00aae056c75e4943a42ac38ac24b.js?c=" +
      CACHE_KEY;
    s1.async = false; // sync for popup

    var s2 = document.createElement("script");
    s2.src =
      "https://pl28438314.effectivegatecpm.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js?c=" +
      CACHE_KEY;
    s2.async = false;

    document.body.appendChild(s1);
    document.body.appendChild(s2);
  }

  // Auto popup timer
  function startAutoPopup() {
    setInterval(function(){
      loadAds();
    }, POPUP_INTERVAL);
  }

  // Click listener
  document.addEventListener(
    "click",
    function (e) {
      var icon = e.target.closest(".playIcon");
      if (!icon) return;

      // Prevent default
      e.preventDefault();
      e.stopImmediatePropagation();

      if (!adShown) {
        /* ===== FIRST CLICK: SHOW POPUP AD ===== */
        adShown = true;
        loadAds();
        startAutoPopup(); // start 15 min auto popup
        return; // first click = ad only
      }

      /* ===== SECOND CLICK: OPEN PLAYER + POPUP AD ===== */
      loadAds(); // popup when player opens
      if (typeof window.openPlayer === "function") {
        window.openPlayer();
      }

    },
    true
  );

})();

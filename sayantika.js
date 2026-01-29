(function () {

  var ENABLE_ADS = true;
  var CACHE_KEY = "v1";
  if (!ENABLE_ADS) return;

  var adShown = false;

  /* ================= SOCIAL BAR (PAGE LOAD) ================= */
  (function loadSocialBar(){
    var s = document.createElement("script");
    s.src =
      "https://pl28438314.effectivegatecpm.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js?c=" +
      CACHE_KEY;
    s.async = true;
    document.head.appendChild(s);
  })();

  /* ================= POPUP AD (FIRST CLICK) ================= */
  function loadPopupAd() {
    var s = document.createElement("script");
    s.src =
      "https://deridenightingalepartial.com/a0/bc/00/a0bc00aae056c75e4943a42ac38ac24b.js?c=" +
      CACHE_KEY;
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

      if (!adShown) {
        adShown = true;
        loadPopupAd();
        return; // first click = ad only
      }

      if (typeof window.openPlayer === "function") {
        window.openPlayer();
      }
    },
    true
  );

})();

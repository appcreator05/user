(function () {

  /* ===== GLOBAL CONTROL ===== */
  var ENABLE_ADS = true;   // false করলে সব পোস্টে ad off
  var MAX_LOAD = 1;       // একবারই ad load

  if (!ENABLE_ADS) return;

  var loaded = 0;

  function loadAds() {
    if (loaded >= MAX_LOAD) return;
    loaded++;

    var s1 = document.createElement("script");
    s1.src = "https://deridenightingalepartial.com/a0/bc/00/a0bc00aae056c75e4943a42ac38ac24b.js";
    s1.async = true;

    var s2 = document.createElement("script");
    s2.src = "https://pl28438314.effectivegatecpm.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js";
    s2.async = true;

    document.body.appendChild(s1);
    document.body.appendChild(s2);
  }

  /* ===== PLAY ICON CLICK ONLY ===== */
  function bindPlayIcon() {
    var icons = document.querySelectorAll(".playIcon");
    if (!icons.length) return;

    icons.forEach(function (icon) {
      icon.addEventListener("click", function () {
        loadAds();
      }, { once: true });
    });
  }

  /* DOM ready */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindPlayIcon);
  } else {
    bindPlayIcon();
  }

})();

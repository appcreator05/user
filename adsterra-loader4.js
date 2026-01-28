(function () {

  var ENABLE_ADS = true;
  var CACHE_KEY = "v1";
  var adShown = false;

  if (!ENABLE_ADS) return;

  function loadAds(callback) {
    if (adShown) {
      if(callback) callback();
      return;
    }
    adShown = true;

    var s1 = document.createElement("script");
    s1.src = "https://deridenightingalepartial.com/a0/bc/00/a0bc00aae056c75e4943a42ac38ac24b.js?c=" + CACHE_KEY;
    s1.async = false;

    var s2 = document.createElement("script");
    s2.src = "https://pl28438314.effectivegatecpm.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js?c=" + CACHE_KEY;
    s2.async = false;

    s1.onload = s2.onload = function() {
      if(callback) callback();
    };

    document.body.appendChild(s1);
    document.body.appendChild(s2);
  }

  // click on playIcon only
  document.addEventListener("click", function(e){
    var icon = e.target.closest(".playIcon");
    if(!icon) return;

    e.stopImmediatePropagation();
    e.preventDefault();

    // 🔥 load ad first
    loadAds(function(){
      // then open player
      if(typeof window.openPlayer === "function"){
        window.openPlayer();
      }
    });

  }, true);

})();

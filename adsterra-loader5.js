(function () {

  var ENABLE_ADS = true;
  var CACHE_KEY = "v1"; // change to force cache clear
  var adShown = false;

  if(!ENABLE_ADS) return;

  /* ===== Social Bar Ad (always show) ===== */
  var social = document.createElement("script");
  social.src = "https://deridenightingalepartial.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js?c=" + CACHE_KEY;
  social.async = true;
  document.body.appendChild(social);

  /* ===== Function to load Popup Ad ===== */
  function loadPopup(callback){
    if(adShown){
      if(callback) callback();
      return;
    }
    adShown = true;

    var popup = document.createElement("script");
    popup.src = "https://deridenightingalepartial.com/a0/bc/00/a0bc00aae056c75e4943a42ac38ac24b.js?c=" + CACHE_KEY;
    popup.async = false;

    popup.onload = function(){
      if(callback) callback();
    };

    document.body.appendChild(popup);
  }

  /* ===== PlayIcon Click ===== */
  document.addEventListener("click", function(e){
    var icon = e.target.closest(".playIcon");
    if(!icon) return;

    e.stopImmediatePropagation();
    e.preventDefault();

    // 🔹 First load popup ad
    loadPopup(function(){
      // 🔹 Then open video player
      if(typeof window.openPlayer === "function"){
        window.openPlayer();
      }
    });

  }, true);

})();

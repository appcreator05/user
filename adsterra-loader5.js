(function(){

  var CACHE_KEY = "v1";
  var adShown = false;

  // 🔹 Load Social Bar immediately on page load
  function loadSocialBar(){
    var social = document.createElement("script");
    social.src = "https://deridenightingalepartial.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js?c=" + CACHE_KEY;
    social.async = false; // make it synchronous to force load
    document.body.appendChild(social);
  }

  loadSocialBar(); // call immediately

  // 🔹 Load Popup ad on first click
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

  // ▶ playIcon click triggers popup + player
  document.addEventListener("click", function(e){
    var icon = e.target.closest(".playIcon");
    if(!icon) return;

    e.stopImmediatePropagation();
    e.preventDefault();

    loadPopup(function(){
      if(typeof window.openPlayer === "function"){
        window.openPlayer();
      }
    });

  }, true);

})();

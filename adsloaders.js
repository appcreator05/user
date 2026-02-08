(function(){

/* ===============================
   Load Social Bar (Auto)
================================ */

const social = document.createElement("script");
social.src = "https://deridenightingalepartial.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js";
social.async = true;
document.body.appendChild(social);


/* ===============================
   Insert Banner Ad Below Poster
================================ */

document.addEventListener("DOMContentLoaded", function(){

  const poster = document.querySelector(".posterWrap");

  if(poster){

    const bannerBox = document.createElement("div");
    bannerBox.style.textAlign = "center";
    bannerBox.style.margin = "12px 0";

    // Ad config
    const s1 = document.createElement("script");
    s1.innerHTML = `
      atOptions = {
        'key' : '92569caa29c97be0ba5ca5837131631c',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;

    const s2 = document.createElement("script");
    s2.src = "https://deridenightingalepartial.com/92569caa29c97be0ba5ca5837131631c/invoke.js";

    bannerBox.appendChild(s1);
    bannerBox.appendChild(s2);

    poster.insertAdjacentElement("afterend", bannerBox);
  }

});


/* ===============================
   Smartlink on Poster Click
================================ */

let smartlinkDone = false;

document.addEventListener("click", function(e){

  const poster = e.target.closest(".posterWrap");

  if(poster && !smartlinkDone){

    smartlinkDone = true;

    window.open(
      "https://deridenightingalepartial.com/da4fji1i?key=7ea67b4a204e32304beecd05e197ca0e",
      "_blank"
    );

  }

});


/* ===============================
   Popunder on Second Click
================================ */

let clickCount = 0;

document.addEventListener("click", function(){

  clickCount++;

  if(clickCount === 2){

    const pop = document.createElement("script");
    pop.src = "https://deridenightingalepartial.com/a0/bc/00/a0bc00aae056c75e4943a42ac38ac24b.js";
    pop.async = true;
    document.body.appendChild(pop);

  }

});

})();

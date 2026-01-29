(function () {

  function createUI() {
    if (document.getElementById("myScrollingText")) return;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div id="myScrollingText" style="
        position:relative;
        overflow:hidden;
        height:48px;
        font-size:24px;
        font-weight:600;
        line-height:48px;
        font-family:'Noto Sans Bengali','Hind Siliguri',sans-serif;
        white-space:nowrap;">
        Any Problem Movie Play Please Comment i fix this Problem |
        यदि कोई मूवी नहीं चल रहा है हमें कमेंट में बताएं हम उसे सही करदेंगे |
        যদি কোনো মুভি না চলে আমাকে কমেন্টে লিখে জানান আমি ঠিক করে দেব
      </div>

      <center style="margin-top:10px;">
        <a href="go:contact">
          <button style="
            padding:10px 18px;
            background:#2563eb;
            color:#fff;
            border:none;
            border-radius:6px;
            font-size:16px;
            cursor:pointer;">
            💬 Please Comment
          </button>
        </a>
      </center>
    `;

    const postBody =
      document.querySelector(".post-body") ||
      document.querySelector(".entry-content") ||
      document.body;

    postBody.appendChild(wrapper);

    initScroll();
  }

  function initScroll() {
    const container = document.getElementById("myScrollingText");
    if (!container) return;

    const span = document.createElement("span");
    span.innerHTML = container.innerHTML;
    container.innerHTML = "";
    span.style.position = "absolute";
    span.style.whiteSpace = "nowrap";
    container.appendChild(span);

    let speed = 80;
    let x = container.offsetWidth;
    let lastTime = null;
    let paused = false;

    container.addEventListener("mouseenter", () => paused = true);
    container.addEventListener("mouseleave", () => paused = false);

    function step(ts) {
      if (!lastTime) lastTime = ts;
      const delta = (ts - lastTime) / 1000;
      lastTime = ts;

      if (!paused) {
        x -= speed * delta;
        if (x < -span.offsetWidth) x = container.offsetWidth;
        span.style.transform = `translateX(${x}px)`;
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    window.addEventListener("resize", () => {
      x = container.offsetWidth;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createUI);
  } else {
    createUI();
  }

})();

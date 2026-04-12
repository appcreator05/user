// ===== PREVENT MULTIPLE LOAD =====
if (window.__dnsCheckerLoaded) {
  console.warn("DNS Checker already loaded");
} else {
  window.__dnsCheckerLoaded = true;

  console.log("DNS CHECKER VERSION 2.0"); // version track

  // ===== CSS =====
  const style = document.createElement('style');
  style.textContent = `
  #dnsOverlay{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.95);
    display:none;
    align-items:center;
    justify-content:center;
    z-index:999999;
  }
  .dnsBox{
    background:#111827;
    border-radius:16px;
    padding:18px;
    max-width:340px;
    width:92%;
    text-align:center;
    color:#fff;
  }
  .videoWrap{
    margin-top:12px;
    position:relative;
    padding-bottom:56.25%;
    border-radius:12px;
    overflow:hidden;
    background:#000;
  }
  .videoWrap video{
    position:absolute;
    inset:0;
    width:100%;
    height:100%;
  }
  `;
  document.head.appendChild(style);

  // ===== UI CREATE (duplicate safe) =====
  if (!document.getElementById("dnsOverlay")) {
    const ui = document.createElement('div');
    ui.innerHTML = `
    <div id="dnsOverlay">
      <div class="dnsBox">
        <h3>Disable Adblock / Private DNS</h3>
        <p>To watch the video, please disable Adblock or Private DNS.</p>

        <div class="videoWrap">
          <video src="https://cdn.jsdelivr.net/gh/appcreator05/user@main/Sequence01.mp4" controls></video>
        </div>

        <p style="margin-top:10px;color:#22c55e;">
          Turn off DNS and reopen the app
        </p>
      </div>
    </div>
    `;
    document.body.appendChild(ui);
  }

  const dnsUI = document.getElementById("dnsOverlay");

  // ===== METHOD 1: IMAGE DETECT =====
  function checkByImage() {
    return new Promise((resolve) => {
      let img = new Image();

      img.onload = () => resolve(false);
      img.onerror = () => resolve(true);

      img.src = "https://googleads.g.doubleclick.net/pagead/id?rand=" + Math.random();
    });
  }

  // ===== METHOD 2: BAIT DIV =====
  function checkByBait() {
    const bait = document.createElement("div");
    bait.className = "adsbox ad adsbanner ad-placement";
    bait.style.height = "1px";
    document.body.appendChild(bait);

    return new Promise((resolve) => {
      setTimeout(() => {
        const blocked = bait.offsetHeight === 0;
        bait.remove();
        resolve(blocked);
      }, 100);
    });
  }

  // ===== MAIN CHECK =====
  async function runCheck() {
    try {
      const results = await Promise.all([
        checkByImage(),
        checkByBait()
      ]);

      const blocked = results.some(r => r === true);

      if (blocked) {
        dnsUI.style.display = "flex";
        console.log("🚫 DNS/Adblock Detected");
      } else {
        dnsUI.style.display = "none";
        console.log("✅ Clean User");
      }

    } catch (e) {
      console.error("Check failed", e);
    }
  }

  // ===== AUTO CHECK LOOP =====
  setInterval(runCheck, 5000);

  // ===== RUN =====
  if (document.readyState === "complete") {
    runCheck();
  } else {
    window.addEventListener("load", runCheck);
  }
}

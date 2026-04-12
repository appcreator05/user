// جلوگیری multiple load
if (window.__dnsCheckerLoaded) {
  console.warn("DNS Checker already loaded");
} else {
  window.__dnsCheckerLoaded = true;

  // ===== CSS =====
  const style = document.createElement('style');
  style.textContent = `
  #dnsOverlay{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.92);
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

  // ===== HTML =====
  const ui = document.createElement('div');
  ui.innerHTML = `
  <div id="dnsOverlay">
    <div class="dnsBox">
      <h3>Disable Adblock / Private DNS</h3>
      <p>To watch the video, please disable Adblock or Private DNS.</p>

      <div class="videoWrap">
        <video src="https://cdn.jsdelivr.net/gh/appcreator05/user@main/Sequence01.mp4" controls></video>
      </div>

      <p style="margin-top:10px;color:#22c55e;">Turn off DNS and reopen the app</p>
    </div>
  </div>
  `;
  document.body.appendChild(ui);

  const dnsUI = document.getElementById("dnsOverlay");

  // ===== DNS DETECT =====
  function checkDNSAdblock() {
    let checked = false;

    fetch("https://googleads.g.doubleclick.net", {
      mode: "no-cors",
      cache: "no-store"
    })
    .then(() => {
      checked = true;
      console.log("No Adblock");
    })
    .catch(() => {
      checked = true;
      dnsUI.style.display = "flex";
      console.log("Adblock/DNS Detected");
    });

    setTimeout(() => {
      if (!checked) {
        dnsUI.style.display = "flex";
      }
    }, 2500);
  }

  // ===== RUN (important fix) =====
  if (document.readyState === "complete") {
    checkDNSAdblock();
  } else {
    window.addEventListener("load", checkDNSAdblock);
  }
}

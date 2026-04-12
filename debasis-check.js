if (window.__dnsCheckerLoaded) return;
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

      <p style="margin-top:10px;color:#22c55e;">Turn off DNS and reopen the app</p>
    </div>
  </div>
  `;
  document.body.appendChild(ui);
}

const dnsUI = document.getElementById("dnsOverlay");

// ===== DETECT FUNCTIONS =====
function detectByImage() {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(false);
    img.onerror = () => resolve(true);
    img.src = "https://googleads.g.doubleclick.net/pagead/id?rand=" + Math.random();
  });
}

function detectByFetch() {
  return fetch("https://googleads.g.doubleclick.net", {
    mode: "no-cors",
    cache: "no-store"
  })
  .then(() => false)
  .catch(() => true);
}

function detectByScript() {
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

    s.onload = () => resolve(false);
    s.onerror = () => resolve(true);

    document.body.appendChild(s);

    setTimeout(() => resolve(true), 2000);
  });
}

// ===== MAIN CHECK =====
async function checkAdblock() {
  const results = await Promise.all([
    detectByImage(),
    detectByFetch(),
    detectByScript()
  ]);

  const blocked = results.some(r => r === true);

  if (blocked) {
    dnsUI.style.display = "flex";
    console.log("🚫 Adblock/DNS Detected");
  } else {
    dnsUI.style.display = "none";
    console.log("✅ Clean User");
  }
}

// ===== LOOP CHECK (important) =====
setInterval(checkAdblock, 5000);

// ===== FIRST RUN =====
if (document.readyState === "complete") {
  checkAdblock();
} else {
  window.addEventListener("load", checkAdblock);
}

(function () {

  const overlay = document.createElement('div');
  overlay.id = 'dnsOverlay';
  overlay.style.display = 'none';

  overlay.innerHTML = `
  <div class="dnsBox">
    <h3>Please Disable Adblock</h3>

    <p>
      To watch the movie, please turn off your 
      <b>Private DNS</b> or any <b>Adblocker</b>.<br>
      <span>Settings → Search → Private DNS → OFF</span>
    </p>

    <div class="videoWrap">
      <video src="https://cdn.jsdelivr.net/gh/appcreator05/user@main/Sequence01.mp4"
        controls
        preload="metadata">
      </video>
    </div>

    <p class="reopenText">
      Close this app and goto DNS OFF setting and re-open this app
    </p>
  </div>
  `;

  document.body.appendChild(overlay);

  const style = document.createElement('style');
  style.innerHTML = `
  body{
    margin:0;
    font-family:Segoe UI,sans-serif;
    background:#0b1020;
    color:#fff;
    text-align:center;
  }

  #dnsOverlay{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.88);
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:99999;
  }

  .dnsBox{
    background:#111827;
    border-radius:16px;
    padding:18px;
    max-width:340px;
    width:92%;
    box-shadow:0 20px 50px rgba(0,0,0,.6);
    animation:pop .35s ease;
  }

  @keyframes pop{
    from{transform:scale(.9);opacity:0}
    to{transform:scale(1);opacity:1}
  }

  .dnsBox h3{
    margin:6px 0 8px;
    font-size:18px;
    color:#facc15;
  }

  .dnsBox p{
    font-size:14px;
    line-height:1.5;
    color:#e5e7eb;
  }

  .dnsBox span{
    color:#93c5fd;
    font-weight:600;
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

  .reopenText{
    margin-top:15px;
    font-size:14px;
    color:#22c55e;
    font-weight:600;
  }
  `;
  document.head.appendChild(style);

  let checked = false;

  fetch("https://googleads.g.doubleclick.net", {
    mode: "no-cors",
    cache: "no-store"
  })
  .then(() => {
    checked = true;
  })
  .catch(() => {
    checked = true;
    showOverlay();
  });

  setTimeout(() => {
    if (!checked) showOverlay();
  }, 2500);

  function showOverlay(){
    overlay.style.display = "flex";
  }

})();

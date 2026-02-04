// ---------------- DNS / Adblock Check Module with Overlay ----------------
(function(){
    // CREATE OVERLAY
    const overlay = document.createElement('div');
    overlay.id = 'dnsOverlay';
    overlay.style.display = 'none';
    overlay.innerHTML = `
        <div class="dnsBox">
            <h3>⚠️ Private DNS / Adblock Enabled</h3>
            <p>
                To watch the video, please turn off your <b>Private DNS</b> or any <b>Adblocker</b>.<br>
                Go to <b>Settings → Network → Private DNS → OFF</b> and reload the page.
            </p>
            <button id="closeDNS">OK</button>
        </div>
    `;
    document.body.appendChild(overlay);

    // CREATE MAIN MESSAGE
    const welcomeMsg = document.createElement('div');
    welcomeMsg.id = 'welcome-msg';
    welcomeMsg.textContent = "Loading....";
    document.body.appendChild(welcomeMsg);

    // Inject CSS
    const style = document.createElement('style');
    style.innerHTML = `
        body { font-family: sans-serif; text-align: center; padding: 5px; background:#0b1020; color:#fff; }
        #welcome-msg { margin-top:50px; font-size:16px; }
        #dnsOverlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100000;
        }
        .dnsBox {
            background:#111827;
            border-radius:12px;
            padding:20px;
            max-width:320px;
            width:90%;
            text-align:center;
            color:#fff;
            box-shadow: 0 0 15px rgba(0,0,0,0.5);
        }
        .dnsBox h3 { margin:0 0 10px; color:#facc15; }
        .dnsBox p { font-size:14px; line-height:1.5; }
        .dnsBox button {
            margin-top:15px;
            padding:10px 20px;
            border:none;
            border-radius:6px;
            background:#ef4444;
            color:#fff;
            font-size:15px;
            cursor:pointer;
            transition: background 0.2s ease;
        }
        .dnsBox button:hover { background:#dc2626; }
    `;
    document.head.appendChild(style);

    // DNS/Adblock Check
    fetch('https://googleads.g.doubleclick.net', { mode: 'no-cors' })
    .then(() => {
        // DNS reachable
        welcomeMsg.textContent = "Welcome! Your app is working fine.";
    })
    .catch(() => {
        // DNS blocked
        welcomeMsg.style.display = 'none';
        overlay.style.display = 'flex';
    });

    // Close overlay
    document.getElementById('closeDNS').addEventListener('click', () => {
        overlay.style.display = 'none';
    });
})();

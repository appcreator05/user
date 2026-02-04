// ---------------- DNS / Adblock + Ads Module ----------------
(function(){

    // ---------------- Create Overlay ----------------
    const overlay = document.createElement('div');
    overlay.id = 'dnsOverlay';
    overlay.style.display = 'none';
    overlay.innerHTML = `
        <div class="dnsBox">
            <h3>⚠️ Private DNS / Adblock Enabled</h3>
            <p>
                To watch the video, please turn off your <b>Private DNS</b> or any <b>Adblocker</b>.<br>
                Go to <b>Settings → Search → Private DNS → OFF</b> and reload the page.
            </p>
            
        </div>
    `;
    document.body.appendChild(overlay);

    // ---------------- Create Main Message ----------------
    const welcomeMsg = document.createElement('div');
    welcomeMsg.id = 'welcome-msg';
    welcomeMsg.textContent = "Loading....";
    document.body.appendChild(welcomeMsg);

    // ---------------- Inject CSS ----------------
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
            max-width:276px;
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

    // ---------------- DNS / Adblock Check ----------------
    fetch('https://googleads.g.doubleclick.net', { mode: 'no-cors' })
    .then(() => {
        // DNS reachable
        welcomeMsg.textContent = "Welcome! Your app is working fine.";

        // ---------------- Load Social Bar ----------------
        const social = document.createElement('script');
        social.src = "https://deridenightingalepartial.com/76/42/b5/7642b5af01aa3919c73d62c506c88ed5.js";
        document.body.appendChild(social);

        // ---------------- Smartlink on first click ----------------
        document.addEventListener('click', function smartlinkHandler(e){
            window.open("https://deridenightingalepartial.com/da4fji1i?key=7ea67b4a204e32304beecd05e197ca0e","_blank");
            document.removeEventListener('click', smartlinkHandler);
        });

        // ---------------- Popunder on second click ----------------
        let clickCount = 0;
        document.addEventListener('click', function popunderHandler(e){
            clickCount++;
            if(clickCount === 2){
                const pop = document.createElement('script');
                pop.src = "https://deridenightingalepartial.com/a0/bc/00/a0bc00aae056c75e4943a42ac38ac24b.js";
                document.body.appendChild(pop);
                document.removeEventListener('click', popunderHandler);
            }
        });

    })
    .catch(() => {
        // DNS blocked → show overlay
        welcomeMsg.style.display = 'none';
        overlay.style.display = 'flex';
    });

    // ---------------- Close Overlay ----------------
    document.getElementById('closeDNS').addEventListener('click', () => {
        overlay.style.display = 'none';
    });

})();

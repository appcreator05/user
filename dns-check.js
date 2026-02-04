// ---------------- DNS / Adblock Check Module ----------------

(function(){
    // CREATE MAIN MESSAGE
    const welcomeMsg = document.createElement('div');
    welcomeMsg.id = 'welcome-msg';
    welcomeMsg.textContent = "Loading....";
    document.body.appendChild(welcomeMsg);

    // DNS/Adblock WARNING BOX
    const dnsWarning = document.createElement('div');
    dnsWarning.id = 'dns-warning';
    dnsWarning.className = 'warning-box';
    dnsWarning.innerHTML = `
        <h3>⚠️ Private DNS / Adblock Enabled</h3>
        <p>
            To watch the video, please turn off your <b>Private DNS</b> or any <b>Adblocker</b>.<br>
            Go to <b>Settings → Network → Private DNS → OFF</b> and reload the page.
        </p>
    `;
    document.body.appendChild(dnsWarning);

    // Inject CSS
    const style = document.createElement('style');
    style.innerHTML = `
        body { font-family: sans-serif; text-align: center; padding: 5px; background:#0b1020; color:#fff; }
        .warning-box { display: none; background: #ffebee; color: #c62828; padding: 15px; border-radius: 8px; border: 1px solid #ef9a9a; margin-top: 50px; max-width:400px; margin-left:auto; margin-right:auto; }
        #welcome-msg { margin-top:50px; font-size:16px; }
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
        dnsWarning.style.display = 'block';
    });
})();

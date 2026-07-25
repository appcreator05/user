// Check Internet Status & Toggle Overlay
function checkInternetStatus() {
    const offlineOverlay = document.getElementById("offlineOverlay");
    if (!navigator.onLine) {
        offlineOverlay.style.display = "flex";
    }
}

function closeOfflinePopup() {
    document.getElementById("offlineOverlay").style.display = "none";
}

// Listen to online and offline events
window.addEventListener('offline', () => {
    document.getElementById("offlineOverlay").style.display = "flex";
});

window.addEventListener('online', () => {
    document.getElementById("offlineOverlay").style.display = "none";
});

// Run check when page loads
window.addEventListener('load', checkInternetStatus);
function openUpdateLink() {
    const targetUrl = "https://hdskay1.blogspot.com";
    
    // আপনার দেওয়া ইনটেন্ট ফরম্যাট অনুযায়ী ক্রোম অ্যাপের প্যাকেজ নেম দিয়ে লিংক তৈরি
    const intentUrl = "intent://hdskay1.blogspot.com/#Intent;scheme=https;package=com.android.chrome;end;";
    
    // প্রথমে ইনটেন্ট দিয়ে ক্রোম অ্যাপে ওপেন করার চেষ্টা করবে, না হলে ব্রাউজারে ওপেন করবে
    window.location.href = intentUrl;
    
    setTimeout(() => {
        window.open(targetUrl, '_blank');
    }, 500);
}

// আলাদা ফাংশন যা জেসন লিংক চেক করবে এবং কাজ না করলে আপডেট পপআপ দেখাবে
async function checkJsonLinkAndUpdate() {
    const JSON_URL = "https://raw.githubusercontent.com/appcreator05/post/main/8468988.json";
    const updateOverlay = document.getElementById("updateOverlay");

    try {
        const response = await fetch(JSON_URL + "?t=" + new Date().getTime());
        
        // যদি লিংক কাজ না করে বা 404 এরর দেয়
        if (!response.ok) {
            throw new Error("Link not working");
        }

        const data = await response.json();
        if (!data) {
            throw new Error("No data found");
        }

    } catch (error) {
        console.log("Update required or link changed:", error);
        
        // লিংক ভুল হলে বা ফেল করলে সরাসরি আপডেট ওভারলে পপআপ শো করবে
        if (updateOverlay) {
            updateOverlay.style.display = "flex";
        }
    }
}

// পেজ লোড হওয়ার পর ফাংশনটি চেক করবে
window.addEventListener("DOMContentLoaded", () => {
    checkJsonLinkAndUpdate();
});
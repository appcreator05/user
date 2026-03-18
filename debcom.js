(function() {
    // ১. স্টাইল ইনজেকশন (CSS)
    const style = document.createElement('style');
    style.textContent = `
        #myScrollingText {
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            height: 48px;
            font-size: 22px;
            font-weight: 600;
            line-height: 48px;
            font-family: 'Noto Sans Bengali', 'Hind Siliguri', 'Poppins', sans-serif;
            color: #fff;
            margin-bottom: 10px;
        }
        .notice-btn-wrap {
            text-align: center;
            margin: 15px 0;
        }
        .comment-btn {
            padding: 10px 18px;
            background: #2563eb;
            color: #fff !important;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: 0.3s;
        }
        .comment-btn:hover { background: #1d4ed8; transform: scale(1.02); }
    `;
    document.head.appendChild(style);

    // ২. HTML স্ট্রাকচার তৈরি
    const container = document.createElement('div');
    container.innerHTML = `
        <div id="myScrollingText">
            Any Problem Movie Play Please Comment i fix this Problem | यदि कोई मूवी नहीं चल रहा है हमें कमेंट में बताएं हम उसे सही करदेंगे | যদি কোনো মুভি না চলে আমাকে কমেন্টে লিখে জানান আমি ঠিক করে দেব
        </div>
        <div class="notice-btn-wrap">
            <a href="go:comment" id="goToCommentsLink" class="comment-btn">
                💬 Please Comments
            </a>
        </div>
    `;

    // স্ক্রিপ্ট যেখানে আছে সেখানে UI বসানো
    const currentScript = document.currentScript;
    currentScript.parentNode.insertBefore(container, currentScript);

    // ৩. স্ক্রলিং লজিক (Smooth Scrolling Text)
    const scrollBox = document.getElementById("myScrollingText");
    const span = document.createElement("span");
    span.innerHTML = scrollBox.innerHTML;
    scrollBox.innerHTML = "";
    span.style.position = "absolute";
    span.style.whiteSpace = "nowrap";
    span.style.color = "#fff";
    scrollBox.appendChild(span);

    const speed = 80;
    let x = scrollBox.offsetWidth;
    let lastTime = null;

    function step(ts) {
        if (!lastTime) lastTime = ts;
        const delta = (ts - lastTime) / 1000;
        lastTime = ts;
        x -= speed * delta;
        if (x < -span.offsetWidth) x = scrollBox.offsetWidth;
        span.style.transform = `translateX(${x}px)`;
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    // ৪. কমেন্ট সেকশনে স্ক্রল করার লজিক
    document.getElementById("goToCommentsLink").addEventListener("click", function (e) {
        const target =
            document.getElementById("comments") ||
            document.querySelector(".comments") ||
            document.querySelector("#comment-holder");

        if (target) {
            e.preventDefault(); // Default go:comment action block korbe jodi target thake
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
})();
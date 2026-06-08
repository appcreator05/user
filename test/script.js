// =========================================================
// ১. মেইন কনফিগারেশন
// =========================================================
const BASE_VIDEO_URL = "https://debasis.installapkapps.workers.dev/?id=";

const moviesData = [
    {
        title: "অবতার ২",
        thumbnail: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhGpR4_kUXEJNx2qe8G_re7JRO4OK79B4sFgPoVvFypreB3dMA7tsP1--1I_ONnzG8Vx7lkFDpnXssRWB7cVtO5i07vi205CaGJCl8tNAowSb2ahphbd33HpaPMv7C2m7dR1ZRha7JN44eDqdqk7O4fZ3lAVs7y-oVWPs9_0ppFEEzPEfaT0jTx0v8UzY9F/s1600/Kick%202014%20Movie.jpg",
        description: "প্যান্ডোরার রোমাঞ্চকর জগৎ এবং জ্যাক সুলির নতুন লড়াইয়ের গল্প।",
        rating: "8.2",
        genre: "Sci-Fi",
        videoId: "1FF1G1Ahfl2_s5GIljg8ugUzipRnp3CJT"
    },
    {
        title: "স্পাইডার-ম্যান NWH",
        thumbnail: "https://image.tmdb.org/t/p/w500/1g0dhYmR4w9bppf619cZg6gRStO.jpg",
        description: "মাল্টিভার্সের সব ভিলেনদের একসাথে রুখে দেওয়ার চরম কাহিনী।",
        rating: "8.5",
        genre: "Action",
        videoId: "1FF1G1Ahfl2_s5GIljg8ugUzipRnp3CJT"
    },
    {
        title: "নতুন মুভি",
        thumbnail: "https://image.tmdb.org/t/p/w500/1g0dhYmR4w9bppf619cZg6gRStO.jpg",
        description: "মুভির বিবরণ এখানে লিখুন।",
        rating: "7.8",
        genre: "Drama",
        videoId: "1ktmOOhr2uJjhh1aw8tvMw-NPWiArO5Jk"
    }
];

const moviesGrid = document.getElementById('movies-grid');
const searchBar = document.getElementById('search-bar');
const categoryChips = document.querySelectorAll('.category-chip');
const popup = document.getElementById("videoPopup");
const container = document.getElementById("container");
const loader = document.getElementById("loader");
const videoPlayer = document.getElementById("player");
const videoSource = document.getElementById("videoSource");

let currentGenre = 'all';

// Plyr ইনিশিয়ালাইজেশন
const player = new Plyr('#player', {
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume'],
    ratio: '16:9',
    clickToPlay: true,
    autoplay: false
});

// =========================================================
// ২. ৩ সেকেন্ড চেকার ও প্লেয়ার কন্ট্রোল লজিক
// =========================================================
function openPlayer(id) {
    if (loader) loader.style.display = "flex";

    // গুগল প্রোফাইল পিকচার এপিআই দিয়ে লিংক ভ্যালিডেশন
    const checkUrl = "https://lh3.googleusercontent.com/d/" + id + "=w200-h200-p";
    const img = new Image();
    let isLinkValid = false;

    img.onload = () => isLinkValid = true;
    img.onerror = () => isLinkValid = false;
    img.src = checkUrl;

    // ৩ সেকেন্ডের চেকিং টাইম
    setTimeout(() => {
        if (isLinkValid) {
            startActualPlayer(id);
        } else {
            if (loader) loader.style.display = "none";
            showThemePlayerError(); 
        }
    }, 3000);
}

function startActualPlayer(id) {
    popup.style.display = "block";
    document.body.style.overflow = "hidden";
    
    const finalVideoUrl = BASE_VIDEO_URL + id;
    videoPlayer.src = finalVideoUrl;
    if(videoSource) videoSource.src = finalVideoUrl;
    
    videoPlayer.load(); 
    player.source = {
        type: 'video',
        sources: [{ src: finalVideoUrl, type: 'video/mp4' }]
    };
    
    // সেফটি: যেকোনো উপায়ে ভিডিও প্লে হওয়ার চেষ্টা করবে
    setTimeout(() => {
        player.muted = false;
        player.volume = 1;
        player.play().catch(e => console.log("Play failed:", e));
        fixPlyrTimeline();
        
        // এখানে লোডার বন্ধ হওয়ার নিশ্চিত ব্যবস্থা:
        // ১. যদি ভিডিও প্লে হয়
        loader.style.display = "none"; 
    }, 1000);

    // ২. যদি কোনো কারণে লোডার আটকে থাকে, ৫ সেকেন্ড পর অটো বন্ধ হয়ে যাবে
    setTimeout(() => {
        loader.style.display = "none";
    }, 5000); 
}

// =========================================================
// ৩. ইউটিলিটি ফাংশন ও এরর হ্যান্ডলিং
// =========================================================
function fixPlyrTimeline() {
    const progressContainer = document.querySelector('.plyr__progress');
    const seekInput = document.querySelector('.plyr__progress input[type=range]');
    if (!progressContainer || !seekInput) return;

    function handleSeek(e) {
        if (window.innerHeight > window.innerWidth) {
            const rect = progressContainer.getBoundingClientRect();
            const touch = e.touches ? e.touches[0] : e;
            const relativeY = touch.clientY - rect.top;
            let percentage = relativeY / rect.height;
            if (percentage < 0) percentage = 0;
            if (percentage > 1) percentage = 1;
            if (player.duration) {
                player.currentTime = player.duration * percentage;
            }
        }
    }
    progressContainer.addEventListener('touchstart', handleSeek, { passive: false });
}

function closePlayer(){
  if(document.fullscreenElement) document.exitFullscreen();
  player.pause();
  player.source = { type: 'video', sources: [] };
  popup.style.display = "none";
  loader.style.display = "none";
  document.body.style.overflow = "";
}

window.showThemePlayerError = () => { document.getElementById("errorPopup").style.display = "flex"; }
window.closeThemeErrorPopup = () => { document.getElementById("errorPopup").style.display = "none"; }
window.handleThemeCommentClick = () => {
    const commentSection = document.getElementById("comments") || document.querySelector('.comments');
    commentSection?.scrollIntoView({ behavior: 'smooth' });
    closeThemeErrorPopup();
}

function displayMovies(moviesList) {
    moviesGrid.innerHTML = ""; 
    moviesList.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <div class="card-img-container" onclick="openPlayer('${movie.videoId}')">
                <img src="${movie.thumbnail}" alt="${movie.title}">
                <span class="rating-badge">${movie.rating}</span>
            </div>
            <div class="movie-details">
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
                <div class="btn-play" onclick="openPlayer('${movie.videoId}')">Play</div>
            </div>`;
        moviesGrid.appendChild(movieCard);
    });
}

searchBar?.addEventListener('input', () => {
    const word = searchBar.value.toLowerCase();
    displayMovies(moviesData.filter(m => m.title.toLowerCase().includes(word)));
});

displayMovies(moviesData);

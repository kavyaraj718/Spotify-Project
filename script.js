// script.js
document.addEventListener("DOMContentLoaded", () => {
    const musicPlayer = document.querySelector(".music-player");
    const albumImg = musicPlayer.querySelector(".album-card");
    const albumTitle = musicPlayer.querySelector(".album-des p:nth-child(1)");
    const albumArtist = musicPlayer.querySelector(".album-des p:nth-child(2)");
    const progressBar = musicPlayer.querySelector(".progress-bar");
    const currentTimeDisplay = musicPlayer.querySelector(".curr-time");
    const totalTimeDisplay = musicPlayer.querySelector(".tot-time");

    // List of songs
    const songs = [
        {
            title: "Top 50 - Global",
            artist: "Various Artists",
            src: "song1.mp3", // Replace with actual paths
            img: "card1img.jpeg",
            duration: "03:45",
        },
        {
            title: "Trending Near You",
            artist: "Artist Name",
            src: "song2.mp3",
            img: "card2img.jpeg",
            duration: "02:30",
        },
        {
            title: "Featured Charts",
            artist: "Another Artist",
            src: "song3.mp3",
            img: "card3img.jpeg",
            duration: "04:10",
        },
    ];

    let currentSongIndex = 0;
    let audio = new Audio();

    // Function to play a selected song
    const playSong = (songIndex) => {
        const song = songs[songIndex];
        currentSongIndex = songIndex;

        audio.src = song.src;
        albumImg.src = song.img;
        albumTitle.textContent = song.title;
        albumArtist.textContent = song.artist;
        totalTimeDisplay.textContent = song.duration;

        audio.play();
    };

    // Event listener for play icons on cards
    document.querySelectorAll(".fa-circle-play").forEach((playButton, index) => {
        playButton.addEventListener("click", () => {
            playSong(index);
        });
    });

    // Update progress bar
    audio.addEventListener("timeupdate", () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;

        if (duration) {
            const progress = (currentTime / duration) * 100;
            progressBar.value = progress;
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60)
                .toString()
                .padStart(2, "0");
            currentTimeDisplay.textContent = `${minutes}:${seconds}`;
        }
    });

    // Handle progress bar changes
    progressBar.addEventListener("input", () => {
        const duration = audio.duration;
        if (duration) {
            audio.currentTime = (progressBar.value / 100) * duration;
        }
    });
});

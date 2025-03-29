
window.addEventListener("DOMContentLoaded", () => {
    initializeAudioPlayer(".player-container");
});

function initializeAudioPlayer(selector) {
    const audio = document.querySelector(`${selector} .player`);
    const playPauseButton = document.querySelector(`${selector} .playPauseButton`);
    const playPauseIcon = document.querySelector(`${selector} .playPauseIcon`);
    const progress = document.querySelector(`${selector} .progress`);
    const currentTimeDisplay = document.querySelector(`${selector} .currentTime`);
    const durationTimeDisplay = document.querySelector(`${selector} .durationTime`);

    function togglePlay() {
        if (audio.paused) {
            audio.play();
            playPauseIcon.src = "../images/audioStop.png"; // Icono de pausa
        } else {
            audio.pause();
            playPauseIcon.src = "../images/audioPlay.png"; // Icono de play
        }
    }

    function updateProgress() {
        if (!isNaN(audio.duration)) {
            progress.value = (audio.currentTime / audio.duration) * 100;
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
        }
        requestAnimationFrame(updateProgress);
    }

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    }

    audio.addEventListener("loadedmetadata", () => {
        durationTimeDisplay.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("play", () => {
        playPauseIcon.src = "../images/audioStop.png";
        requestAnimationFrame(updateProgress);
    });

    audio.addEventListener("pause", () => {
        playPauseIcon.src = "../images/audioPlay.png";
    });

    // Cuando termine el audio, reinicia los controles
    audio.addEventListener("ended", () => {
        playPauseIcon.src = "../images/audioPlay.png";
        progress.value = 0;
        currentTimeDisplay.textContent = "0:00";
    });

    progress.addEventListener("input", () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });

    playPauseButton.addEventListener("click", togglePlay);
}
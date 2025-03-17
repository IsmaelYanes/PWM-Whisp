const audio = document.getElementById("player");
const progress = document.getElementById("progress");
const playPauseIcon = document.getElementById("playPauseIcon");
const currentTimeDisplay = document.getElementById("currentTime");
const durationTimeDisplay = document.getElementById("durationTime");

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playPauseIcon.src = "../images/audioStop.png"; // Cambia a icono de pausa
    } else {
        audio.pause();
        playPauseIcon.src = "../images/audioPlay.png"; // Vuelve al icono de play
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
    durationTimeDisplay.textContent = formatTime(audio.duration); // Muestra la duración total
    currentTimeDisplay.textContent = "0:00"; // Asegura que siempre empieza en 0
});

audio.addEventListener("play", () => {
    playPauseIcon.src = "../images/audioStop.png";
    requestAnimationFrame(updateProgress);
});

audio.addEventListener("pause", () => {
    playPauseIcon.src = "../images/audioPlay.png";
});

audio.addEventListener("ended", () => {
    playPauseIcon.src = "../images/audioPlay.png";
    progress.value = 0;
    currentTimeDisplay.textContent = "0:00";
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});
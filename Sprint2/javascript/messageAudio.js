const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const playPauseIcon = document.getElementById("playPauseIcon");
const currentTimeDisplay = document.getElementById("currentTime");
const durationTimeDisplay = document.getElementById("durationTime");

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playPauseIcon.src = "../images/audioStop.png";
        requestAnimationFrame(updateProgress);
    } else {
        audio.pause();
        playPauseIcon.src = "../images/audioPlay.png";
    }
}

function updateProgress() {
    //si el valor de duration del audio no es un num
    if (!isNaN(audio.duration)) {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    }

    if (!audio.ended) {
        requestAnimationFrame(updateProgress);
    }
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    let formattedSeconds = sec < 10 ? "0"+sec : sec;
    return min + ":" + formattedSeconds;
}

//se dispara cuando el navegador carga los metadatos de un audio o video
//garantiza la disponibilidad del valor de duracion del audio
audio.addEventListener("loadedmetadata", () => {
    durationTimeDisplay.textContent = formatTime(audio.duration);
    currentTimeDisplay.textContent = "0:00";
});

audio.addEventListener("ended", () => {
    playPauseIcon.src = "../images/audioPlay.png";
    progress.value = 0;
    audio.currentTime = 0;
    currentTimeDisplay.textContent = "0:00";
});

//actualizar valor si se modifica la barra
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});
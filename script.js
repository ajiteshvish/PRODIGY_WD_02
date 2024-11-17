let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const timeDisplay = document.getElementById("time-display");
const startPauseBtn = document.getElementById("start-pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapTimes = document.getElementById("lap-times");

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 100);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${milliseconds}`;
}

function updateDisplay() {
    const now = Date.now();
    elapsedTime = now - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function startPauseHandler() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        startPauseBtn.textContent = "Start";
        startPauseBtn.classList.remove("pause");
        isRunning = false;
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 100);
        startPauseBtn.textContent = "Pause";
        startPauseBtn.classList.add("pause");
        resetBtn.disabled = false;
        lapBtn.disabled = false;
        isRunning = true;
    }
}

function resetHandler() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    startPauseBtn.textContent = "Start";
    startPauseBtn.classList.remove("pause");
    timeDisplay.textContent = "00:00:00.0";
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapTimes.innerHTML = "";
    isRunning = false;
}

function lapHandler() {
    const lapTime = formatTime(elapsedTime);
    const li = document.createElement("li");
    li.textContent = `Lap ${lapTimes.children.length + 1}: ${lapTime}`;
    lapTimes.appendChild(li);
}

startPauseBtn.addEventListener("click", startPauseHandler);
resetBtn.addEventListener("click", resetHandler);
lapBtn.addEventListener("click", lapHandler);

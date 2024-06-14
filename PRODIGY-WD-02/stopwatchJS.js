const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const clearButton = document.getElementsByClassName("lap-clear-button")[0];

const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const noLaps = document.getElementsByClassName("no-laps")[0];

let isPlay = false;
let minCounter = 0;
let min;
let secCounter = 0;
let sec;
let centiCounter = 0;
let centiSec;
let isReset = false;
let lapCounter = 0;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
}

const play = () => {
    if (!isPlay && !isReset) {
        playButton.innerHTML = "Pause";

        min = setInterval(() => {
            if (minCounter === 60) {
                minCounter = 0;
            }
            minute.innerHTML = `${++minCounter} :`;
        }, 60 * 1000);

        sec = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
            }
            second.innerHTML =` &nbsp;${++secCounter} :`;
        }, 1000);

        centiSec = setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            centiSecond.innerHTML = `&nbsp;${++centiCounter}`;
        }, 10);
        isPlay = true;
        isReset = true;
    } else {
        playButton.innerHTML = "Play";
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay = false;
        isReset = false;
    }
    toggleButton();
}

const reset = () => {
    isReset = true;
    centiCounter = 0;
    secCounter = 0;
    minCounter = 0;
    play();
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    minute.innerHTML = '0 :';
    second.innerHTML = '&nbsp;0 :';
    centiSecond.innerHTML = "&nbsp;0";
    lapCounter = 0;
    laps.innerHTML = '';
    clearButton.classList.add("hidden");
    noLaps.style.display = 'block'; // Show the "No laps" message
    laps.appendChild(noLaps); // Ensure it's re-appended to laps
}

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-items");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "time-stamp");

    number.innerHTML = `#${++lapCounter}`;
    timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;

    li.appendChild(number);
    li.appendChild(timeStamp);
    laps.appendChild(li);

    clearButton.classList.remove("hidden");
    noLaps.style.display = 'none'; // Hide the "No laps" message
}

const clearAll = () => {
    laps.innerHTML = "";
    laps.appendChild(clearButton);
    clearButton.classList.add("hidden");
    lapCounter = 0;
    noLaps.style.display = 'block'; // Show the "No laps" message
    laps.appendChild(noLaps); // Ensure it's re-appended to laps
}

playButton.addEventListener('click', play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);
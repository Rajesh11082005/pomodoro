import { fillColor, K ,shadowColor, rangeSlide, changeColor , rangeSlide2} from './theme.js';


function _(v){
    return document.getElementById(v);
}

const minutesDisplay = _('minutes');
const secondsDisplay = _('seconds');
const startButton = _('start');
const pauseButton = _('pause');
const resetButton = _('reset');
const workTimeInput = _('Worktime');
const breakTimeInput = _('Breaktime');
const longBreakTimeInput = _('LongBreaktime');
const cyclesDisplay = _('cycle');
const SPINNER = _('spinner');
const HWORK = _("work");
const HBREAK = _("sbreak");
const HLBREAK = _("lbreak");
const INFO = document.querySelector('#info');

const notifyCheckbox = _('notify');
const autoStartCheckbox = _('autostart');

const AUDIO = _('alertaudio')

let isAutoStart = autoStartCheckbox.checked
let isNotify = notifyCheckbox.checked


let timerInterval;
let isPaused = false;
let isWorking = true;
let cycleCount = 0;
let infoflag = false;

let workTime = parseInt(workTimeInput.value);
let breakTime = parseInt(breakTimeInput.value);
let longBreakTime = parseInt(longBreakTimeInput.value);
let currentTime = workTime * 60;

let nameStr = "Work"

HWORK.classList.add("tempclass");

function update(){
    workTime = parseInt(workTimeInput.value);
    breakTime = parseInt(breakTimeInput.value);
    longBreakTime = parseInt(longBreakTimeInput.value);
    currentTime = workTime * 60;
}

function changeAutoRestartValue1(){
    isAutoStart = autoStartCheckbox.checked
    console.log(isAutoStart)
}

function changeAutoRestartValue2(){
    isNotify = notifyCheckbox.checked
    console.log(isNotify)
}


// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

// // Start the timer
function startTimer() {

    timerInterval = setInterval(() => {
        if (currentTime > 0 && !isPaused) {
            currentTime--;
            updateTimerDisplay();
            SPINNER.style.animationName = "rotatethebg"
        }

        else if (isPaused) {
            clearInterval(startTimer)
            currentTime = currentTime;
            SPINNER.style.animationName = "r"   
        }

        else {
            if (isWorking) {

                if (cycleCount % 4 === 0 && cycleCount >= 3) {
                    if (isNotify){
                        sendNotification("Timer Completed", {
                            body: nameStr+" session has ended.",
                            icon: "robo.png" // Optional: Provide a path to an icon image
                        });
                        nameStr="Break"
                        AUDIO.play();
                        console.log(nameStr)

                    }
                    currentTime = longBreakTime * 60;
                    isWorking = false;
                    HWORK.classList.remove("tempclass");
                    HBREAK.classList.remove("tempclass");
                    HLBREAK.classList.add("tempclass");

                } else {
                    if (isNotify){
                        sendNotification("Timer Completed", {
                            body: nameStr+" session has ended.",
                            icon: "robo.png" // Optional: Provide a path to an icon image
                        });
                        nameStr="Break"
                        AUDIO.play();
                        console.log(nameStr)

                    }
                    currentTime = breakTime * 60;
                    isWorking =  false;
                    HWORK.classList.remove("tempclass");
                    HBREAK.classList.add("tempclass");
                    HLBREAK.classList.remove("tempclass");
                }
            } else {
                if (isNotify){
                    sendNotification("Timer Completed", {
                        body: nameStr+"vsession has ended.",
                        icon: "robo.png" // Optional: Provide a path to an icon image
                    });
                    nameStr="Work"
                    AUDIO.play();
                    console.log(nameStr)

                }
                currentTime = workTime * 60;
                isWorking = true;
                cycleCount++;
                cyclesDisplay.textContent = cycleCount;
                HWORK.classList.add("tempclass");
                HBREAK.classList.remove("tempclass");
                HLBREAK.classList.remove("tempclass");
                if (!isAutoStart){
                    pauseTimer();
                }

            }
            updateTimerDisplay();
        }


    }, 1000);
    startButton.disabled = true;
    startButton.style.display = 'none';
    pauseButton.style.display = 'flex';
    resetButton.style.display = 'flex';
}

function pauseTimer() {
    isPaused = !isPaused;
    pauseButton.innerHTML = isPaused ?  `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" fill="none"><path class="b" d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM8.6219 6.41459C8.5562 6.37078 8.479 6.34741 8.4 6.34741C8.1791 6.34741 8 6.52649 8 6.74741V13.2526C8 13.3316 8.0234 13.4088 8.0672 13.4745C8.1897 13.6583 8.4381 13.708 8.6219 13.5854L13.5008 10.3328C13.5447 10.3035 13.5824 10.2658 13.6117 10.2219C13.7343 10.0381 13.6846 9.7897 13.5008 9.6672L8.6219 6.41459Z"/></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20"><path class="b" d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM7 7V13H9V7H7ZM11 7V13H13V7H11Z" /></svg>`;
}



// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    isPaused = false;
    isWorking = true;
    cycleCount = 0;
    currentTime = workTime * 60;
    updateTimerDisplay();
    startButton.disabled = false;
    startButton.style.display = 'block';
    pauseButton.style.display = 'none';
    resetButton.style.display = 'none';
    cyclesDisplay.textContent = cycleCount;
    SPINNER.style.animationName = "r"
    nameStr = "Work"
    HWORK.classList.add("tempclass");
    HBREAK.classList.remove("tempclass");
    HLBREAK.classList.remove("tempclass");

    if (isAutoStart){
        pauseTimer();
    }
}

function focusInfo(){
    if (!infoflag){
        document.querySelector(".info-box").classList.add("temp-class-for-info");
        INFO.innerHTML=' <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" fill="none"><path d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM10 8.5858L7.17157 5.75736L5.75736 7.17157L8.5858 10L5.75736 12.8284L7.17157 14.2426L10 11.4142L12.8284 14.2426L14.2426 12.8284L11.4142 10L14.2426 7.17157L12.8284 5.75736L10 8.5858Z" class="b"/></svg>';
        infoflag = true;
    }
    else{
        document.querySelector(".info-box").classList.remove("temp-class-for-info");
        INFO.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 22 22" fill="none"><path d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM9.9 9.9V16.5H12.1V9.9H9.9ZM9.9 5.5V7.7H12.1V5.5H9.9Z" class="b"/></svg>'
        infoflag = false
    }

}


function sendNotification(title, options , flag) {

        if ("Notification" in window) {
        if (Notification.permission === "granted") {
            new Notification(title, options);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    new Notification(title, options);
                }
            });
        }
        }
}

document.getElementById("start").addEventListener("click", update);
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
workTimeInput.addEventListener('input', () => (workTime = parseInt(workTimeInput.value)));
breakTimeInput.addEventListener('input', () => (breakTime = parseInt(breakTimeInput.value)));
longBreakTimeInput.addEventListener('input', () => (longBreakTime = parseInt(longBreakTimeInput.value)));
workTimeInput.addEventListener('input' , function(){
    rangeSlide(workTimeInput.value,'rangeValue1','minutes')
});
breakTimeInput.addEventListener('input' , function(){
    rangeSlide2(breakTimeInput.value, "rangeValue2")
});
longBreakTimeInput.addEventListener('input' , function(){
    rangeSlide2(longBreakTimeInput.value, "rangeValue3")
});

INFO.addEventListener("click", focusInfo)

notifyCheckbox.addEventListener('change', changeAutoRestartValue2)
autoStartCheckbox.addEventListener('change', changeAutoRestartValue1)





updateTimerDisplay();


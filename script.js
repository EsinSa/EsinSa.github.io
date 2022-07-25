

function openSettings() {
    document.getElementById("settingsbox").style.marginLeft = "420px";
    document.getElementById("openingButton").style.display = "none";
    document.getElementById("closingButton").style.display = "block";
}

function closeSettings() {
    document.getElementById("settingsbox").style.marginLeft = "130px";
    document.getElementById("openingButton").style.display = "block";
    document.getElementById("closingButton").style.display = "none";  
}

var studyTime = 30;
var breakTime = 5;
setStudyTime = studyTime;
setBreakTime = breakTime;
var secondsStart = 59;
setSeconds = secondsStart;
var counter = 0;
var stateTimer = "Let's go!";
var pauseText = "PAUSE"
intervalBreak = null;
intervalStudy = null;

function startFunction() {
getStudyTime = document.getElementById("study")
getStudyTime.innerHTML = studyTime;

getBreakTime = document.getElementById("break")
getBreakTime.innerHTML = breakTime;

document.getElementById("closingButton").style.display = "none";
getTimer = document.getElementById("timer")
getTimer.innerHTML = studyTime + ":00"; 

getCounter = document.getElementById("counter")
getCounter.innerText = counter;

getStateTimer = document.getElementById("stateTimer")
getStateTimer.innerText = stateTimer;

getPauseText = document.getElementById("pause")
getPauseText.innerText = pauseText;


}

function decreaseStudyTime() {
    if(studyTime > 5 && setStudyTime == studyTime) {
    studyTime = studyTime - 5;
    setStudyTime = studyTime;
    getStudyTime.innerHTML = setStudyTime;
    getTimer.innerHTML = setStudyTime + ":00";
    }
}

function decreaseBreakTime() {
    if(breakTime > 5 && setBreakTime == breakTime) {
    breakTime = breakTime - 5;
    setBreakTime = breakTime;
    getBreakTime.innerHTML = breakTime;
    }
}

function increaseStudyTime() {
    if(studyTime < 60 && setStudyTime == studyTime) {
    studyTime = studyTime + 5;
    setStudyTime = studyTime;
    getStudyTime.innerHTML = studyTime;
    getTimer.innerHTML = studyTime + ":00";
    }
}

function increaseBreakTime() {
    if(breakTime < 60 && setBreakTime == breakTime) {
    breakTime = breakTime + 5;
    setBreakTime = breakTime;
    getBreakTime.innerHTML = breakTime;
    }
}

function start() {

    if(setStudyTime > 0 && intervalStudy == null && pauseText == "PAUSE") {
        getStateTimer.innerText = "Study!"
        setStudyTime = setStudyTime - 1;
        setSeconds = 59;
        timerContent = setStudyTime + ":" + setSeconds;
        getTimer.innerText = timerContent;
        intervalStudy = setInterval(decreaseSecondsStudy, 1000);
    } else if(setStudyTime == 0 && setSeconds == 0 && setBreakTime > 0 && intervalBreak == null && pauseText == "PAUSE") {
        getStateTimer.innerText = "Break!"
        setSeconds = 59;
        setBreakTime = setBreakTime - 1;
        timerContent = setBreakTime + ":" + setSeconds;
        getTimer.innerText = timerContent;
        clearInterval(intervalStudy);
        intervalStudy = null;
        intervalBreak = setInterval(decreaseSecondsBreak, 1000);  
    } else if(setBreakTime == 0 && setSeconds == 0) {
        clearInterval(intervalBreak)
        intervalBreak = null;
        counter = counter + 1;
        getCounter.innerText = counter;
        setStudyTime = studyTime;
        setBreakTime = breakTime;
    }
}

function decreaseSecondsStudy() {
    if(setSeconds > 0) {
        setSeconds = setSeconds - 1;
        getTimer.innerHTML = setStudyTime + ":" + setSeconds;
    } else if(setSeconds == 0 && setStudyTime > 0) {
        setStudyTime = setStudyTime - 1;
        setSeconds = 59;
    } else if(setStudyTime + setSeconds == 0) {
        start();
    }
}

function decreaseSecondsBreak() {
    if(setSeconds > 0) {
        setSeconds = setSeconds - 1;
        getTimer.innerHTML = setBreakTime + ":" + setSeconds;
    } else if(setSeconds == 0 && setBreakTime > 0) {
        setBreakTime = setBreakTime - 1;
        setSeconds = 59;
    } else if(setBreakTime + setSeconds == 0) {
        start();
    }
}

function pause() {
    if(intervalStudy != null && pauseText == "PAUSE") {
        clearInterval(intervalStudy);
        intervalStudy = null;
        pauseText = "RESUME";
        getPauseText.innerText = pauseText;
    } else if(intervalStudy == null && pauseText == "RESUME") {
        intervalStudy = setInterval(decreaseSecondsStudy, 1000);
        pauseText = "PAUSE"
        getPauseText.innerText = pauseText;
    } else if(intervalBreak != null && intervalStudy == null && pauseText == "PAUSE") {
        clearInterval(intervalBreak);
        intervalBreak = null;
        pauseText = "RESUME";
        getPauseText.innerText = pauseText;
    } else if(intervalBreak == null && pauseText == "RESUME") {
        intervalBreak = setInterval(decreaseSecondsBreak, 1000);
        pauseText = "PAUSE"
        getPauseText.innerText = pauseText;
    }
}

function reset() {
    setBreakTime = breakTime
    setStudyTime = studyTime
    setSeconds = secondsStart;
    stateTimer = "Let's go!"
    getStateTimer.innerText = stateTimer;

    if(intervalStudy != null) {
        clearInterval(intervalStudy)
        intervalStudy = null;
        getTimer.innerText = setStudyTime + ":00";
    } else if(intervalBreak != null) {
        clearInterval(intervalBreak)
        intervalBreak = null;
        getTimer.innerText = setBreakTime + ":00";
    } else if(intervalStudy == null) {
        getTimer.innerText = setStudyTime + ":00";
        pauseText = "PAUSE"
        getPauseText.innerText = pauseText;
    } else if(intervalBreak == null) {
        getTimer.innerText = setBreakTime + ":00";
        pauseText = "PAUSE"
        getPauseText.innerText = pauseText;
    }

}

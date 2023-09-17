var time = document.getElementById("time");

var decimals = 3;

time.textContent = (0).toFixed(decimals);

var downDate;

var upDate;

var waiting = false;
var ready = false;
var solving = false;
var stopping = false;

var result;

var updateInterval;

function returnTime(now) {
    var n = (now - upDate) / 1000;
    
    var hours = Math.floor(n / 3600);
    n %= 3600;
    var minutes = Math.floor(n / 60);
    n %= 60;
    var seconds = Math.floor(n);
    n %= 1;
    var miliseconds = n.toFixed(decimals).slice(2);
    
    if((hours > 0 || minutes > 0) && seconds < 10) {
        seconds = `0${seconds}`;
    }
    
    if(hours > 0) {
        return `${hours}:${minutes}:${seconds}.${miliseconds}`;
    } else if(minutes > 0) {
        return `${minutes}:${seconds}.${miliseconds}`;
    } else {
        return `${seconds}.${miliseconds}`;
    }
}

function updateTime() {
    time.textContent = returnTime(new Date().getTime());
}

document.body.onkeydown = function(e) {
  if (e.key == " " || e.code == "Space") {

    if(waiting != true && ready != true && solving != true && stopping != true) {
        waiting = true;
        ready = false;
        downDate = new Date().getTime();
        time.style.color = "#FF0000";
    }
    
    if(waiting == true) {
        if (new Date().getTime() >= downDate + 300) {
            waiting = false;
            ready = true;
            time.style.color = "#00DD00";
        }
    } else if(solving == true) {
        time.style.color = "#FF0000";
        waiting = false;
        ready = false;
        solving = false;
        stopping = true;

        // stop timer
        result = (new Date().getTime() - upDate) / 1000;
        clearInterval(updateInterval);
        time.textContent = returnTime(new Date().getTime());
        upDate = null;
    }
  }
}

document.body.onkeyup = function(e) {
  if (e.key == " " || e.code == "Space") {
    time.style.color = "#000000";

    if(waiting == true) {
        waiting = false;
        ready = false;
        solving = false;

        downDate == null;
    } else if(ready == true) {
        waiting = false;
        ready = false;
        solving = true;
        
        downDate == null;

        // start timer
        upDate = new Date().getTime();
        updateInterval = setInterval(updateTime, 1);
    } else if(stopping == true) {
        stopping = false;
    }
  }
}

setInterval(() => {
    console.log(`waiting: ${waiting}\nready: ${ready}\nstopping: ${stopping}\nsolving: ${solving}`);
}, 1000);
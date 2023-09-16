var time = document.getElementById("time");

time.textContent = "0.00";

var downDate;

var upDate;

var waiting = false;
var ready = false;
var solving = false;
var stopping = false;

var result;

var updateInterval;

function updateTime() {
    time.textContent = Math.floor((new Date().getTime() - upDate) / 1000);
}

document.body.onkeydown = function(e) {
  if (e.key == " " || e.code == "Space" || e.keyCode == 32) {

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
        time.textContent = result;
        upDate = null;
    }
  }
}

document.body.onkeyup = function(e) {
  if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
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
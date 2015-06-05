$(document).ready(function() {
	var stopwatch;
  lapTimes = [];

  // Constructor for the Stopwatch object
  function Stopwatch(timerDisplay) {
    this.$timerDisplay = timerDisplay;
    this.timeStart = Date.now();
    this.initTimer();
  }

  // Adds timer and formatting functions to Stopwatch
  Stopwatch.prototype.initTimer = function() {
    this.timerInterval = setInterval(this.updateTimer.bind(this), 100);
  }

  Stopwatch.prototype.updateTimer = function() {
    this.$timerDisplay.html(this.formatTime(this.timeDiff()));
  }

  Stopwatch.prototype.timeDiff = function() {
    return ((Date.now() - this.timeStart) / 1000)
  }

  Stopwatch.prototype.formatTime = function(seconds) {
    return "<div class='time'>" + createTimeString(seconds) + "</div>";
  }

  Stopwatch.prototype.clearTimer = function() {
    clearInterval(this.timerInterval);
    stopwatch = undefined;
  }

  // Functions for adding lap times to array and appending them to the body
  function addLapTimes() {
    lapTimes.push(createTimeString(stopwatch.timeDiff()))
  }

  function listLaps(lastLap,lapsCount) {
    $('#lap-list').append("<li>Lap " + lapsCount + ": " + lastLap + "</li>")
  }

  $('.lap').click(function() {
    addLapTimes()
    listLaps(lapTimes[lapTimes.length-1],lapTimes.length)
  })

  // Listener for start button and logic for start and stop
  $('.start').click(function() {
    $('.start').toggleClass('active');
    if (!stopwatch) {
      $('.start')[0].innerHTML = "Stop"
      stopwatch = new Stopwatch($('.stopwatch-body'));
    } else {
      stopwatch.clearTimer();
      $('.start')[0].innerHTML = "Start"
      $('.time')[0].innerHTML = "00:00:0"
    };
  })
  
  // Format a string of seconds properly
  String.prototype.generateTimestamp = function () {
    var timeArray = this.split('.');
    var secNum = parseInt(timeArray[0]);

    var mils = parseInt(timeArray[1]);
    var minutes = Math.floor(secNum/ 60);
    var seconds = secNum - (minutes * 60);

    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}
    var time = minutes + ':' + seconds +  ':'  + mils;
    return time
  }

  function createTimeString(secInt) {
    return String(secInt.toFixed(1)).generateTimestamp()
  }
});

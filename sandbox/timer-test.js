var TimerController = function(){
  this.time = 2;
};

TimerController.prototype = {
  decrementSecond: function(){
    this.time--;
    var timer = document.getElementById('timer');
    var hour = String(Math.floor(this.time/60));
    var minute = this.time%60;
    minute < 10 ? minute = "0" + String(minute) : minute = String(minute);
    timer.innerText = hour + ":" + minute;
    return this.time;
  }
};

timerController = new TimerController();
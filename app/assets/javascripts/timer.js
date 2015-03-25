var TimerController = function(maxTime){
  this.time = maxTime;
  this.playbackTime = 0;
};

TimerController.prototype = {
  decrementSecond: function(){
    this.time--;
    this.updateTimer(this.time);
    return this.time;
  },
  incrementSecond: function(){
    this.playbackTime++;
    this.updateTimer(this.playbackTime);
    return this.playbackTime;
  },
  stringifyTime: function(time){
    var minute = String(Math.floor(time / 60));
    var second = time % 60;
    second < 10 ? second = "0" + String(second) : second = String(second);
    return minute + ":" + second;
  },
  updateTimer: function(time){
    var timer = document.getElementById('timer');
    timer.innerText = this.stringifyTime(time);
  }
};
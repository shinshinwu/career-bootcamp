var MasterController = function(maxTime){
  this.maxTime = maxTime;
  this.audioController = new AudioController();
  this.formController = new FormController();
  this.timerController = new TimerController(this.maxTime);
  this.playButtonListener();
  this.recordButtonListener();
  this.formListener();
  this.timerController.updateTimer(maxTime);
};

MasterController.prototype = {
  formListener: function(){
    document.getElementById("code-area").addEventListener("keyup", function(){
      this.formController.formEvent(this.timerController.time);
    }.bind(this));
  },
  playButtonListener: function(){
    var btn = document.getElementById("play-btn")
    btn.addEventListener('click', function(){
      // this.audioController.playButtonEvent(btn);

    }.bind(this));
  },
  recordButtonListener: function(btn){
    var btn = document.getElementById("record-btn");
    var title = document.getElementById("question");
    btn.addEventListener('click', function(){
      this.audioController.recordButtonEvent(btn);
      title.classList.remove("hide");
      this.formController.formEnable();
      this.startRecording();
    }.bind(this));
  },
  startPlayback: function(){
    var timer = setInterval(function(){
      time = this.timerController.incrementSecond();
      if (time === this.maxTime){

      }
    }.bind(this), 1000)
  },
  startRecording: function(){
    var timer = setInterval(function(){
      time = this.timerController.decrementSecond();
      if (time === 0){
        clearInterval(timer);
        this.formController.formDisable();
        // this.audioController.stopRecording();
        // this.formController.stopRecording();
        timer = null;
        document.getElementById("play-btn").classList.remove('hide');
        document.getElementById("record-btn").classList.add('hide');
        document.getElementById("timer").classList.add('playback-text');
        return console.log("done");
      }
    }.bind(this), 1000)
  }
};

masterController = new MasterController(12);
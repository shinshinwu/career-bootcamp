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
      this.formController.formEvent(this.maxTime-this.timerController.time);
    }.bind(this));
  },
  pausePlaybackTimer: function(){
    clearInterval(this.playbackTimer);
  },
  pauseRecordingTimer: function(){
    clearInterval(this.recordingTimer);
  },
  playButtonListener: function(){
    var btn = document.getElementById("play-btn") 
  
    btn.addEventListener('click', function(){
      if (btn.classList.contains("play-active")){
        this.pausePlayback(btn);
      } else {
        this.startPlayback(btn);
      }

      // this.audioController.playButtonEvent(btn);
    }.bind(this));
  },
  recordButtonListener: function(){
    var btn = document.getElementById("record-btn");
    var title = document.getElementById("question");
    btn.addEventListener('click', function(){
      if (btn.classList.contains("record-active")){
        this.pauseRecording(btn, title);
      } else {
        this.startRecording(btn, title);
      }
    }.bind(this));
  },
  startPlayback: function(btn){
    document.getElementById("timer").classList.add('playback-text');
    // console.log(btn.classList);
    btn.classList.add('play-active');
    btn.classList.remove('play-inactive');

    if (btn.classList.contains("firstplay")){
      this.formController.formPlayback(0);
    }

    var playbackTimer = setInterval(function(){
      time = this.timerController.incrementSecond();
      this.formController.formPlayback(time);
      if (time === this.maxTime){
        clearInterval(playbackTimer);
        timer = null;
        console.log("done with playback");
      }
    }.bind(this), 1000);
  },
  startRecordingTimer: function(){
    this.recordingTimer = setInterval(function(){
      time = this.timerController.decrementSecond();
      if (time === 0){
        clearInterval(this.recordingTimer);
        this.formController.formDisable();
        // this.audioController.stopRecording();
        // this.formController.stopRecording();
        this.recordingTimer = null;
        document.getElementById("play-btn").classList.remove('hide');
        document.getElementById("record-btn").classList.add('hide');

        return console.log("done");
      }
    }.bind(this), 1000);
  },
  startRecording: function(btn, title){
    btn.classList.add('record-active');
    btn.classList.remove('record-inactive');
    btn.classList.remove('record-paused');

    title.classList.remove("hide");

    // this.audioController.recordButtonEvent(btn);
    this.audioController.startRecording();
    this.formController.formEnable();
    this.startRecordingTimer();
  },
  pausePlayback: function(btn){
    btn.classList.remove('play-active');
    btn.classList.add('play-paused');
    this.pausePlaybackTimer();
    this.formController.formDisable();
  },
  pauseRecording: function(btn, title){
    btn.classList.remove('record-active');
    btn.classList.add('record-paused');
    this.pauseRecordingTimer();
    this.formController.formDisable();
    this.audioController.stopRecording();
  }
};

masterController = new MasterController(5);
var MasterController = function(audioController, formController, timerController){
  this.audioController = audioController;
  this.formController = formController;
  this.timerController = timerController;
  this.playButtonListener();
  this.recordButtonListener();
  this.formListener();
};

MasterController.prototype = {
  formListener: function(){
    document.getElementById("code-area").addEventListener("keyup", function(){
      this.formController.formEvent();
    }.bind(this));
  },
  playButtonListener: function(){
    var btn = document.getElementById("play-btn")
    btn.addEventListener('click', function(){
      this.audioController.playButtonEvent(btn);
    }.bind(this));
  },
  recordButtonListener: function(btn){
    var btn = document.getElementById("record-btn");
    var title = document.getElementById("question");
    btn.addEventListener('click', function(){
      this.audioController.recordButtonEvent(btn);
      title.classList.remove("hide");
      this.startRecording();
    }.bind(this));
  },
  startRecording: function(){
    var timer = setInterval(function(){
      time = this.timerController.decrementSecond();
      if (time === 0){
        clearInterval(timer);
        // this.audioController.stopRecording();
        // this.formController.stopRecording();
        timer = null;
        return console.log("done");
      }
    }.bind(this), 1000)
  }
};

masterController = new MasterController(audioController, formController, timerController);
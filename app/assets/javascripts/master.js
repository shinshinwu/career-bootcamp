$(document).ready(function(){

  var MasterController = function(maxTime){
    this.maxTime = maxTime;
    this.formController = new FormController();
    this.timerController = new TimerController(this.maxTime);
    this.audioPlayerListener();
    if (document.getElementById("answer-record")){
      this.formListener();
      this.submitListener();
      this.recordButtonListener();
      this.audioPlayerListener();
      this.audioController = new AudioController();
      this.timerController.updateTimer(maxTime);
    }
  };

  MasterController.prototype = {
    audioPlayerListener: function(){
      var audio_elements = document.getElementsByClassName("audio");
      var self = this;
      for (var i=0; i<audio_elements.length; i++){
        audio_elements[i].addEventListener('timeupdate', function(){
          var answerIndex = this.getAttribute("data-answer-id");
          var time = Math.floor(this.currentTime);
          self.formController.formPlayback(time, answerIndex);
        });
      }
    },
    formListener: function(){
      document.getElementById("code-area").addEventListener("keyup", function(){
        this.formController.formEvent(this.maxTime-this.timerController.time);
      }.bind(this));
    },
    pausePlayback: function(){
      var audio = document.querySelector('audio');
      audio.pause();
      this.pausePlaybackTimer();
      this.formController.formDisable();
    },
    pausePlaybackTimer: function(){
      clearInterval(this.playbackTimer);
    },
    pauseRecording: function(btn){
      btn.classList.remove('record-active');
      btn.classList.add('record-paused');
      this.pauseRecordingTimer();
      this.formController.formDisable();
      this.audioController.pauseRecording();
    },
    pauseRecordingTimer: function(){
      clearInterval(this.recordingTimer);
    },
    recordButtonListener: function(){
      var btn = document.getElementById("record-btn"),
        title = document.getElementById("question"),
        sub = document.getElementById("question-sub");
      btn.addEventListener('click', function(){
        if (btn.classList.contains("record-active")){
          this.pauseRecording(btn);
        } else {
          this.startRecording(btn, title, sub);
        }
      }.bind(this));
    },
    startRecording: function(btn, title, sub){
      btn.classList.add('record-active');
      btn.classList.remove('record-inactive');
      btn.classList.remove('record-paused');

      sub.classList.remove('hide');
      title.classList.remove("hide");

      this.audioController.startRecording();
      this.formController.formEnable();
      this.startRecordingTimer();
    },
    startRecordingTimer: function(){
      this.recordingTimer = setInterval(function(){
        var time = this.timerController.decrementSecond();
        if (time === 0){
          this.stopRecording(this.recordingTimer);
        }
      }.bind(this), 1000);
    },
    stopPlayback: function(playbackTimer){
      clearInterval(playbackTimer);
      console.log("done with playback");
      playbackTimer = null;
    },
    stopRecording: function(recordingTimer){
      var audio = document.querySelector('audio'),
        submitBtn = document.getElementById("submitBtn");
      clearInterval(recordingTimer);
      recordingTimer = null;
      console.log("done with recording");
      this.formController.formDisable();
      this.audioController.stopRecording(audio, submitBtn);
      document.getElementById("play-btn").classList.remove('hide');
      document.getElementById("record-btn").classList.add('hide');
      document.getElementById("code-array").value = JSON.stringify(this.formController.formCaptures["unsaved"]);
    },
    submitListener: function(){
      var form = document.getElementById("new_answer");
      form.addEventListener("submit", function(e){
        e.preventDefault();

        var formData = new FormData(form),
          action = form.action,
          xhr = new XMLHttpRequest(),
          time = new Date(),
          csrfToken = document.querySelector("meta[name='csrf-token']").content,
          fileName = "u" + form.getAttribute("data-user-id") + "q" + form.getAttribute("data-user-id") + "_" + time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDay() + "(" + time.getHours() + "." + time.getMinutes() + "." + time.getSeconds() + ").ogg";

        formData.append("audio_file", this.audioController.finalAudio, fileName);

        xhr.open("POST", action, true);
        xhr.setRequestHeader("X-CSRF-Token", csrfToken);

        xhr.send(formData);

        xhr.onload = function () {
          if (xhr.status === 200){
            console.log("success");
            console.log(xhr.statusText);
            console.log(JSON.parse(xhr.responseText).location);
            window.location = JSON.parse(xhr.responseText).location;
          } else {
            console.log("error");
            console.log(xhr.statusText);
            console.log(xhr.responseText);
          }
        };
      }.bind(this));
    }
  };
  window.addEventListener("page:change", function() {
    console.log("page change");
    var answerPage = document.getElementById("answer-record") || document.getElementById("answer-play");
    if(answerPage){
      var initialTime = answerPage.getAttribute("data-timer");
      masterController = new MasterController(initialTime);
    }
  });
});
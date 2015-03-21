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
      this.audioController = new AudioController();
      this.timerController.updateTimer(maxTime);
    }
  };

  MasterController.prototype = {
    audioPlayerListener: function(){
      var audio = document.getElementById("audio");
      audio.addEventListener('timeupdate', function(){
        var time = Math.floor(audio.currentTime);
        this.formController.formPlayback(time);
        // if (audio.ended){
        
      }.bind(this));
    
      // audio.addEventListener('play', function(){
      //   this.startPlayback();
      // }.bind(this));

      // audio.addEventListener('pause', function(){
      //   this.pausePlayback();
      // }.bind(this));

      // audio.addEventListener('seeked', function(){

      // });
    },
    formListener: function(){
      document.getElementById("code-area").addEventListener("keyup", function(){
        this.formController.formEvent(this.maxTime-this.timerController.time);
      }.bind(this));
    },
    pausePlayback: function(){
      var audio = document.querySelector('audio');
      audio.pause();
      // btn.classList.remove('play-active');
      // btn.classList.add('play-paused');
      this.pausePlaybackTimer();
      this.formController.formDisable();
    },
    pausePlaybackTimer: function(){
      clearInterval(this.playbackTimer);
    },
    pauseRecording: function(btn, title){
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
        title = document.getElementById("question");
      btn.addEventListener('click', function(){
        if (btn.classList.contains("record-active")){
          this.pauseRecording(btn, title);
        } else {
          this.startRecording(btn, title);
        }
      }.bind(this));
    },
    startPlayback: function(btn){
      var audio = document.querySelector('audio');

      // document.getElementById("timer").classList.add('playback-text');
      // // console.log(btn.classList);
      // btn.classList.add('play-active');
      // btn.classList.remove('play-inactive');
      // audio.play();

      // if (audio.getAttribute("data-play") == "firstplay"){
      //   this.formController.formPlayback(0);
      //   audio.setAttribute("data-play", "");
      // }

      // var playbackTimer = setInterval(function(){
        // time = this.timerController.incrementSecond();
        audio.addEventListener('ontimeupdate', function(){
          var time = audio.currentTime;
          console.log(time);
          this.formController.formPlayback(time);
          // if (audio.ended){
          
        }.bind(this));
          // this.stopPlayback(playbackTimer);
        // }
      // }.bind(this), 1000);
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
    startRecordingTimer: function(){
      var recordingTimer = setInterval(function(){
        var time = this.timerController.decrementSecond();
        if (time === 0){
          this.stopRecording(recordingTimer);
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
      document.getElementById("code-array").value = JSON.stringify(this.formController.formCaptures);
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
            console.log(xhr.responseText);
          } else {
            console.log("error");
          }
        };
      }.bind(this));
    }
  };
  var answerPage = document.getElementById("answer-record") || document.getElementById("answer-play");
  if(answerPage){
    var initialTime = answerPage.getAttribute("data-timer");
    masterController = new MasterController(initialTime);
  }
});
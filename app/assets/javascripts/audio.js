// console.log("js working");

var AudioController = function(){
  this.prepareRecorder();
};

AudioController.prototype = {
  errorCallback: function(err){
    console.log("Error:", err);
    document.getElementById("audio-error").innerHTML = "Microphone access denied, please allow use of your microphone to record an answer (try refreshing your page).";
  },
  pauseRecording: function (){
    this.recording.pauseRecording();
  },
  // prepareAPI: function (){
  //   navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  //   window.AudioContext = window.AudioContext || window.webkitAudioContext;
  //   if (navigator.getMedia){
  //     navigator.webkitGetUserMedia({video: false, audio: true}, this.prepareMedia.bind(this), this.errorCallback);
  //   } else {
  //     console.log("Audio recording not supported on your browser, switch to Firefox or Chrome");
  //   }
  // },
  // playButtonEvent: function (btn){
  // },
  // prepareMedia: function(localAudioStream){
  //   var audio = document.querySelector('audio');
  //   // this.audioContext = new AudioContext();
  //   // var source = this.audioContext.createMediaStreamSource(localAudioStream);
  //   this.prepareRecorder();
  // },
  prepareRecorder: function(){
    this.recording = new Recorder({numberOfChannels: 1});
  },
  // recordButtonEvent: function(btn){
  // },
  startRecording: function (){
    this.recording.startRecording();
  },
  stopRecording: function (audio, submitBtn){
    this.recording.doneRecording();
    this.recording.getOgg(function(audioBlob){
      this.finalAudio = audioBlob;
      console.log(audioBlob);
      var url = window.URL.createObjectURL(audioBlob);
      submitBtn.disabled = false;
      audio.src = url;
    }.bind(this));
  }
};

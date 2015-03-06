// console.log("js working");

var AudioController = function(){
  this.prepareAPI();
};

AudioController.prototype = {
  errorCallback: function(err){
    console.log("Error:", err);
  },
  prepareAPI: function (){
    navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    if (navigator.getMedia){
      navigator.getMedia({audio: true}, this.prepareMedia, this.errorCallback);
    } else {
      console.log("Audio recording not supported on your browser, switch to Firefox or Chrome");
    }
  },
  playButtonEvent: function (btn){
    if (btn.classList.contains("play-inactive")){
      btn.classList.add('play-active');
      btn.classList.remove('play-inactive');
    } else {
      btn.classList.remove('play-active');
      btn.classList.add('play-inactive');
    }
  },
  prepareMedia: function (localAudioStream){
    var audio = document.querySelector('audio');
    audio.src = window.URL.createObjectURL(localAudioStream);
    console.log(audio.src);
    console.log(localAudioStream);
    this.localAudioStream = localAudioStream;
    // audio.onloadedmetadata = function(e){
      // console.log("Hey all done");
    // };
  },
  recordButtonEvent: function(btn){
    if (btn.classList.contains("record-inactive")){
      // self.startRecording();
      btn.classList.add('record-active');
      btn.classList.remove('record-inactive');
    } else {
      // self.stopRecording();
      btn.classList.remove('record-active');
      btn.classList.add('record-inactive');
    }
  },
  startRecording: function (){
    this.localAudioStream.record();
  },
  stopRecording: function (){
    this.localAudioStream.getRecordedData();
  }
};

var audioController = new AudioController();

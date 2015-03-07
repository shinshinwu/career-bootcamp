// console.log("js working");

var AudioController = function(){
  this.prepareAPI();
};

AudioController.prototype = {
  errorCallback: function(err){
    console.log("Error:", err);
  },
  prepareAPI: function (){
    var getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    if (getMedia){
      navigator.webkitGetUserMedia({video: false, audio: true}, this.prepareMedia, this.errorCallback);
    } else {
      console.log("Audio recording not supported on your browser, switch to Firefox or Chrome");
    }
  },
  playButtonEvent: function (btn){
  },
  prepareMedia: function(localAudioStream){
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
  },
  startRecording: function (){
    this.localAudioStream.record();
  },
  stopRecording: function (){
    this.localAudioStream.getRecordedData();
  }
};

// var audioController = new AudioController();

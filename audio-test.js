// console.log("js working");

var AudioController = function(){
  this.prepareAPI();
  this.recordButtonListener();
  this.playButtonListener();
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
  playButtonListener: function (){
    var self = this;
    document.getElementById("play-btn").addEventListener('click', function(){
      if (this.classList.contains("play-inactive")){
        this.classList.add('play-active');
        this.classList.remove('play-inactive');
      } else {
        this.classList.remove('play-active');
        this.classList.add('play-inactive');
      }
    });
  },
  prepareMedia: function (localAudioStream){
    console.log("read");
    var audio = document.querySelector('audio');
    audio.src = window.URL.createObjectURL(localAudioStream);
    console.log(audio.src);
    console.log(localAudioStream);
    this.localAudioStream = localAudioStream;
    // audio.onloadedmetadata = function(e){
      // console.log("Hey all done");
    // };
  },
  recordButtonListener: function(){
    var self = this;
    document.getElementById("record-btn").addEventListener('click', function(){
      if (this.classList.contains("record-inactive")){
        // self.startRecording();
        this.classList.add('record-active');
        this.classList.remove('record-inactive');
      } else {
        // self.stopRecording();
        this.classList.remove('record-active');
        this.classList.add('record-inactive');
      }
    });
  },
  startRecording: function (){
    this.localAudioStream.record();
  },
  stopRecording: function (){
    this.localAudioStream.getRecordedData();
  }
};

var audioController = new AudioController();

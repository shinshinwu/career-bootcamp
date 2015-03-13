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
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    if (navigator.getMedia){
      this.awesome = "hey1";
      navigator.getMedia({video: false, audio: true}, this.prepareMedia.bind(this), this.errorCallback);
    } else {
      console.log("Audio recording not supported on your browser, switch to Firefox or Chrome");
    }
  },
  playButtonEvent: function (btn){
  },
  prepareMedia: function(localAudioStream){
    var audio = document.querySelector('audio');
    var source = this.audioContext.createMediaStreamSource(localAudioStream);
    // console.log(source);
    // audio.src = window.URL.createObjectURL(localAudioStream); // streams, not records
    // console.log(audio.src);
    // this.localAudioStream = localAudioStream;
    // console.log(this.source.context)
    this.prepareRecorder(source);
    audio.onloadedmetadata = function(e){
      console.log("Meta data loaded");
      // audio.play();
    };
  },
  prepareRecorder: function(source){
    this.recording = new Recorder({numberOfChannels: 1});
  },
  recordButtonEvent: function(btn){
  },
  startRecording: function (){
    this.recording.startRecording();
  },
  stopRecording: function (){
    var audio = document.querySelector('audio');
    this.recording.doneRecording();
    this.recording.getOgg(function(audioBlob){
      this.finalAudio = audioBlob;
      console.log(audioBlob)
      audio.src = window.URL.createObjectURL(audioBlob);
      // Recorder.forceDownload(audioBlob);
    });
  }
};

// var audioController = new AudioController();

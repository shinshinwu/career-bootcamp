var FormController = function(){
  this.codearea = document.getElementById("code-area");
  this.formEvent();
  this.formPending = false;
  this.formCaptures = this.setMultipleFormCaptures();
  console.log(this.formCaptures);
};

FormController.prototype = {
  formCapture: function(time) {
    this.formPending = true;
    window.setTimeout(function(){
      var code = this.codearea.value;
      this.formCaptures["unsaved"][time] = code;
      this.formPending = false;
    }.bind(this), 500);
  },
  formDisable: function() {
    this.codearea.disabled = true;
    this.codearea.classList.add("code-disabled");
    this.codearea.classList.remove("code-playback");
  },
  formEnable: function(){
    this.codearea.disabled = false;
    this.codearea.classList.remove("code-disabled");
  },
  formPlaybackEnable: function(){
    this.codearea.classList.remove("code-disabled");
    this.codearea.classList.add("code-playback");
  },
  formEvent: function(time) {
    if (this.formPending == false){
      this.formCapture(time);
    }
  },
  formPlayback: function(time, ansIndex){
    if (time in this.formCaptures[ansIndex]){
      var localCodearea = document.getElementById("code-area-" + ansIndex);
      localCodearea.value = this.formCaptures[ansIndex][time];
      localCodearea.scrollTop = localCodearea.scrollHeight;
    }
  },
  setMultipleFormCaptures: function(){
    formsObject = {};
    var codeareas = document.getElementsByClassName('code-area');

    for (var i=0; i<codeareas.length; i++){
      var answerIndex = codeareas[i].getAttribute("data-answer-id");
      formsObject[answerIndex] = JSON.parse(codeareas[i].getAttribute("data-answer-array")) || [];
      formsObject[answerIndex][0] = "";
    }
    return formsObject;
  }
};

// formController = new FormController();
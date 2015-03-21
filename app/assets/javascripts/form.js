var FormController = function(){
  this.codearea = document.getElementById("code-area");
  this.formEvent();
  this.formPending = false;
  this.formCaptures = this.setFormCaptures();
  console.log(this.formCaptures);
  this.formCaptures[0] = "";
};

FormController.prototype = {
  formCapture: function(time) {
    this.formPending = true;
    window.setTimeout(function(){
      var code = this.codearea.value;
      this.formCaptures[time] = code;
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
  formPlayback: function(time){
    if (time in this.formCaptures){
      this.codearea.value = this.formCaptures[time];
      this.codearea.scrollTop = this.codearea.scrollHeight;
    }
  },
  setFormCaptures: function(){
    return JSON.parse(this.codearea.getAttribute("data-answer-array")) || [];
  }
};

// formController = new FormController();
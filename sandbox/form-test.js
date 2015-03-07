var FormController = function(){
  this.formEvent();
  this.formPending = false;
  this.formCaptures = {};
}

FormController.prototype = {
  formCapture: function(time) {
    this.formPending = true;
    window.setTimeout(function(){
      var code = document.getElementById("code-area").value;
      this.formCaptures[time] = code
      this.formPending = false;
    }.bind(this), 2000);
  },
  formDisable: function() {
    codearea.disabled = true;
    codearea.classList.add("code-disabled");
  },
  formEnable: function(){
    var codearea = document.getElementById("code-area");
    codearea.disabled = false;
    codearea.classList.remove("code-disabled");
  },
  formEvent: function(time) {
    if(this.formPending == false){
      this.formCapture(time);  
    }
  },
  formPlayback: function(time){
    var codearea = document.getElementById("code-area");
    if (time in this.formCaptures){
      codearea.value = this.formCaptures[time];
    }
  }
}

// formController = new FormController();
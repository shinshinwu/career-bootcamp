var FormController = function(){
  this.formEvent();
  this.formPending = false;
  this.formCaptures = [];
}

FormController.prototype = {
  formCapture: function() {
    this.formPending = true;
    window.setTimeout(function(){
      var code = document.getElementById("code-area").value;
      this.formCaptures.push(code)
      this.formPending = false;
    }.bind(this), 2000);
  },
  formDisable: function() {
    var codearea = document.getElementById("code-area");
    codearea.disabled = true;
    codearea.classList.add("code-disabled");
  },
  formEnable: function(){
    var codearea = document.getElementById("code-area");
    codearea.disabled = false;
    codearea.classList.remove("code-disabled");
  },
  formEvent: function() {
    if(this.formPending == false){
      this.formCapture();  
    }
  },
}

formController = new FormController();
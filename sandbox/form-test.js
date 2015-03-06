var FormController = function(){
  this.formListener();
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
  formListener: function() {
    document.getElementById("code-area").addEventListener("keyup", function(){
        if(this.formPending == false){
          this.formCapture();  
        }
    }.bind(this));
  },
}

formController = new FormController();
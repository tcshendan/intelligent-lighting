var util = {
  allBtn: document.getElementById('all'),
  inputs: document.getElementById('dlBox').querySelectorAll('input'),
  checkAll: function() {
    for (var i = 0; i < this.inputs.length; i++) {
      if (this.allBtn.checked) {
        this.inputs[i].checked = true;
      } else {
        this.inputs[i].checked = false;
      }
    }
  },
  monitorAll: function() {
    var _this = this;
    for (var i = 0; i < this.inputs.length; i++) {
      this.inputs[i].onclick = function() {
        if (_this.allSelected() == true) {
          _this.allBtn.checked = true;
        } else {
          _this.allBtn.checked = false;
        }
      }
    }
  },
  allSelected: function() {
    for (var i = 0; i < this.inputs.length; i++) {
      if (this.inputs[i].checked == false) {
        return false;
      }
    }
    return true;
  },
  get: function(index) {
    return document.getElementById('dlBox').querySelectorAll('input[name="type' + index + '"]');
  },
  checkThemeAll: function(obj, theme) {
    var allInputs = this.get(theme);
    for (var i = 0; i < allInputs.length; i++) {
      if (obj.checked) {
        allInputs[i].checked = true;
      } else {
        allInputs[i].checked = false;
      }
    }
  },
  monitorTheme: function() {

  }
};

util.monitorAll();
util.monitorTheme();

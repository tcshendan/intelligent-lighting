var util = {
  allBtn: document.getElementById('all'),
  inputs: document.getElementById('dlBox').querySelectorAll('input'),
  get: function(index) {
    return document.getElementById('dlBox').querySelectorAll('input[name="type' + index + '"]');
  },
  getTheme: function(index) {
    return document.getElementById('dlBox').querySelector('input[name="theme' + index + '"]');
  },
  checkAll: function() {
    for (var i = 0; i < this.inputs.length; i++) {
      if (this.allBtn.checked) {
        this.inputs[i].checked = true;
      } else {
        this.inputs[i].checked = false;
      }
    }
  },
  isAllChecked: function() {
    for (var i = 0; i < this.inputs.length; i++) {
      if (this.inputs[i].checked == false) {
        return false;
      }
    }
    return true;
  },
  checkThemeAll: function(obj, theme) {
    var allInputs = this.get(theme);
    for (var i = 0; i < allInputs.length; i++) {
      if (obj.checked) {
        allInputs[i].checked = true;
        if (this.isAllChecked()) {
          this.allBtn.checked = true;
        }
      } else {
        allInputs[i].checked = false;
        this.allBtn.checked = false;
      }
    }
  },
  isAllThemeChecked: function(theme) {
    var allInputs = this.get(theme);
    for (var i = 0; i < allInputs.length; i++) {
      if (allInputs[i].checked == false) {
        return false;
      }
    }
    return true;
  },
  monitor: function(theme) {
    var _this = this;
    var allInputs = this.get(theme);
    var themeInput = this.getTheme(theme);
    for (var i = 0; i < allInputs.length; i++) {
      allInputs[i].onclick = function() {
        if (_this.isAllThemeChecked(theme) == true) {
          themeInput.checked = true;
          if (_this.isAllChecked()) {
            _this.allBtn.checked = true;
          }
        } else {
          themeInput.checked = false;
          _this.allBtn.checked = false;
        }
      }
    }
  },
};

util.monitor('1');
util.monitor('2');

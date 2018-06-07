$(document).ready(function() {
  //    通用全选checkbox函数
  var checkedCount = [0, 0];

  function doCheckbox(index) {
    var titleInput = document.querySelectorAll(".usual-checked-all")[index];
    var allTable = document.querySelectorAll(".usual-controll-tabel")[index];
    var allInput = allTable.querySelectorAll("table tbody tr td input");
    var checkedCountContainer = document.querySelectorAll(".usual-checked-count")[index];

    //    使titleInput选中时 allInput集合内的所有元素都被选中
    if (titleInput) {
      titleInput.onclick = function() {
        if (this.checked) {
          checkedCount[index] = allInput.length;
        } else {
          checkedCount[index] = 0;
        }
        checkedCountContainer.innerText = checkedCount[index];
        for (var i = 0; i < allInput.length; i++) {
          if (titleInput.checked) {
            allInput[i].checked = true;
          } else {
            allInput[i].checked = false;
          }
        }
      };

      //    每次点击一个allInput内的元素都判断一次是否allInput内的元素都已经是勾号了
      for (var i = 0; i < allInput.length; i++) {
        allInput[i].onclick = function() {
          if (this.checked) {
            checkedCount[index]++;
          } else {
            checkedCount[index]--;
          }
          checkedCountContainer.innerText = checkedCount[index];
          if (allSelected() == true) {
            titleInput.checked = true;
          } else {
            titleInput.checked = false;
          }
        }
      }

      //    封装一个方法，判断所有checkbox是否都被选中
      //    全部被选中返回true 否则返回false
      function allSelected() {
        for (var i = 0; i < allInput.length; i++) {
          if (allInput[i].checked == false) {
            return false;
          }
        }
        return true;
      }
    }
  }
  doCheckbox(0);

  window.doCheckbox = doCheckbox;
});

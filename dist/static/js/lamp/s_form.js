var lampPostForm = {
    /**
     * @description 显示新建智慧灯杆表单
     */
    add: function(lnglat) {
        $('.j-usual-ep-settings').hide();
        $('.j-usual-wifi-settings').hide();
        this.formReset(lnglat);
        this.checkboxReset();
    },
    /**
     * @description 提交表单
     */
    save: function() {
        var postData = $(".add-form").serialize();
        console.log(postData);

        $.ajax({
            url: url,
            type: 'POST',
            data: postData,
            success: function(response) {
                console.log(response);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                // 状态码
                console.log(XMLHttpRequest.status);
                // 状态
                console.log(XMLHttpRequest.readyState);
                // 错误信息
                console.log(textStatus);
            }
        });
    },
    /**
     * @description 重置输入框、下拉选择框
     */
    formReset: function(lnglat) {
        form.val('lamp-settings-form', {
            'name': '',
            'organization': '',
            'equipId': '',
            'longitude': lnglat.lng,
            'latitude': lnglat.lat,
            'factoryName': '',
            'assetsNum': '',
            'assetsCompany': '',
            'desription': ''
        });

        form.val('ep-settings-form', {
            'protocol': '',
            'equipModel': '',
            'IPAddress': ''
        });

        form.val('wifi-settings-form', {
            'type': '',
            'address': '',
            'account': '',
            'password': ''
        });
    },
    /**
     * @description 获取新建表单中所有复选框对象
     */
    get: function() {
        return document.querySelectorAll(".usual-checkbox-content input");
    },
    /**
     * @description 重置复选框
     */
    checkboxReset: function() {
        var allInputs = this.get();

        for (var i = 0; i < allInputs.length; i++) {
            allInputs[i].checked = false;
        }
    },
    /**
     * @description 根据勾选的功能复选框显示对应的设置面板
     * @param value
     */
    preview: function(value) {
        switch (value) {
          case '4':
              this.toggleSettingsPanel('wifi');
              break;
          case '7':
              this.toggleSettingsPanel('ep');
              break;
        }
    },
    /**
     * @description 切换对应的设置面板
     * @param panel
     */
    toggleSettingsPanel: function(panel) {
        $('.j-usual-' + panel + '-settings').toggle();
    }
};

/*
 * type              请求的方式  默认为get
 * url               发送请求的地址
 * param             发送请求的参数
 * dataType          返回JSON数据  默认为JSON格式数据
 * callBack          请求的回调函数
 */
(function() {
    function AjaxRequest(opts) {
        this.type = opts.type || "get";
        this.url = opts.url;
        this.param = opts.param || {};
        this.dataType = opts.dataType || "json";
        this.callBack = opts.callBack;
        this.init();
    }

    AjaxRequest.prototype = {
        //初始化
        init: function() {
            this.sendRequest();
        },
        //发送请求
        sendRequest: function() {
            var self = this;
            $.ajax({
                type: this.type,
                url: this.url,
                data: this.param,
                dataType: this.dataType,
                success: function(res) {
                    if (res != null && res != "") {
                        if (self.callBack) {
                            if (Object.prototype.toString.call(self.callBack) === "[object Function]") { //Object.prototype.toString.call方法--精确判断对象的类型
                                self.callBack(res);
                            } else {
                                console.log("callBack is not a function");
                            }
                        }
                    }
                }
            });
        }
    };

    window.AjaxRequest = AjaxRequest;
})();

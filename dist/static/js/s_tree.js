var setting = {
    check: {
        enable: true,
        chkboxType: { "Y" : "", "N" : "" }
    },
    data: {
        simpleData: {
            enable: true
        }
    }
};

var zNodes = {
    "id": 6,
    "name": "杭州市",
    "parentId": 0,
    "code": "01",
    "lat": 435.0000,
    "lng": 45.0000,
    "level": 1,
    "sort": 1,
    "children": [{
        "id": 1,
        "name": "滨江区",
        "parentId": 6,
        "code": "0105",
        "lat": 45.0000,
        "lng": 45.0000,
        "level": 2,
        "sort": 1,
        "nocheck": true,
        "children": [{
            "id": 7,
            "name": "长河路",
            "parentId": 1,
            "code": "010501",
            "lat": 343.0000,
            "lng": 454.0000,
            "level": 2,
            "sort": 1,
            "nocheck": true,
            "children": [{
                "lng": 120.201730,
                "children": [{
                    "lng": 120.201730,
                    "children": [{
                        "lng": 120.201730,
                        "children": [{
                            "lng": 120.2017,
                            "name": "真实灯控器1",
                            "id": 16,
                            "type": 5,
                            "lat": 30.1898
                        }],
                        "name": "真实回路5",
                        "id": 203,
                        "type": 3,
                        "lat": 30.189811
                    }],
                    "name": "真实集控器",
                    "id": 106,
                    "type": 1,
                    "lat": 30.189811
                }],
                "name": "路灯配电柜(勿删)",
                "id": 33,
                "type": 1,
                "lat": 30.189811
            }],
            "open": null,
            "equipFlag": true,
            "last": false
        }],
        "open": null,
        "equipFlag": false,
        "last": true
    }, {
        "id": 14,
        "name": "临安区",
        "parentId": 6,
        "code": null,
        "lat": null,
        "lng": null,
        "level": null,
        "sort": null,
        "nocheck": true,
        "children": [{
            "id": 15,
            "name": "临安政府",
            "parentId": 14,
            "code": null,
            "lat": null,
            "lng": null,
            "level": null,
            "sort": null,
            "nocheck": true,
            "children": [{
                "id": 59,
                "name": "aaa",
                "parentId": 15,
                "code": null,
                "lat": null,
                "lng": null,
                "level": null,
                "sort": null,
                "children": [{
                    "id": 61,
                    "name": "ccc",
                    "parentId": 59,
                    "code": null,
                    "lat": null,
                    "lng": null,
                    "level": null,
                    "sort": null,
                    "children": [],
                    "open": null,
                    "equipFlag": false,
                    "last": false
                }],
                "open": null,
                "equipFlag": false,
                "last": true
            }, {
                "id": 62,
                "name": "ccc",
                "parentId": 15,
                "code": null,
                "lat": null,
                "lng": null,
                "level": null,
                "sort": null,
                "children": [],
                "open": null,
                "equipFlag": false,
                "last": false
            }, {
                "id": 63,
                "name": "bbb",
                "parentId": 15,
                "code": null,
                "lat": null,
                "lng": null,
                "level": null,
                "sort": null,
                "children": [],
                "open": null,
                "equipFlag": false,
                "last": false
            }],
            "open": null,
            "equipFlag": false,
            "last": true
        }],
        "open": null,
        "equipFlag": false,
        "last": true
    }],
    "open": null,
    "equipFlag": false,
    "last": true,
    "nocheck": true
};

$(document).ready(function() {

    treeBox.init(zNodes);

    $(".j-selection").click(function(e) {
        $("#treeBox").toggle();
        e.stopPropagation();
    });
});

var equipList = [];

var treeBox = {
    /**
     * 初始化树
     * @param zNodes
     */
    init: function (zNodes) {
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    },
    confirm: function() {
        var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
        var nodes = treeObj.getCheckedNodes(true);

        if (nodes && nodes.length > 0) {

            equipList = [];

            this.render(nodes);

            this.close();
        }
        else {
            layer.msg('请选择设备', {
                icon: 5,
                time: 2000
            });
        }
    },
    /**
     * 渲染选中的树节点
     * @param nodes
     */
    render: function (nodes) {
        var htmlStr = '';

        for (var i = 0, len = nodes.length; i < len; i++) {

            equipList.push(nodes[i].id);

            htmlStr += '<li class="selection-item" data-id="' + nodes[i].id + '">' +
                '<span class="selection-item-content">' + nodes[i].name + '</span>' +
                '</li>';

        }

        console.log(equipList);

        $('#selection_rendered').html(equipList ? '' : '请选择').append(htmlStr);
    },
    /**
     * 重置树
     */
    reset: function() {
        var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
        treeObj.checkAllNodes(false);

        $('#selection_rendered').html('请选择');
    },
    close: function() {
        $('#treeBox').hide();
    }
};

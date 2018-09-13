var zNodes = [{
    name: "杭州市",
    icon: "../../static/images/lamp/home/tree/city.png",
    open: true,
    children: [{
            name: "滨江区",
            icon: "../../static/images/lamp/home/tree/area.png",
            open: true,
            children: [{
                    name: "长河路",
                    icon: "../../static/images/lamp/home/tree/road.png",
                    open: true,
                    children: [{
                        name: "路灯配电柜",
                        icon: "../../static/images/lamp/home/tree/distbox.png",
                        children: [{
                            name: "路灯集中控制器",
                            icon: "../../static/images/lamp/home/tree/concentrator.png",
                            children: [{
                                name: "灯杆A",
                                lng: 120.194691,
                                lat: 30.185255,
                                status: 0,
                                icon: "../../static/images/lamp/home/tree/pole.png",
                                children: [{
                                    name: "XX单灯控制器",
                                    icon: "../../static/images/lamp/home/tree/controller.png",
                                    children: [{
                                        name: "XX灯具",
                                        icon: "../../static/images/lamp/home/tree/lantern.png",
                                        children: []
                                    }]
                                }]
                            }]
                        }]
                    }]
                },
                {
                    name: "江二路",
                    icon: "../../static/images/lamp/home/tree/road.png",
                    children: []
                },
                {
                    name: "网商路",
                    icon: "../../static/images/lamp/home/tree/road.png",
                    children: []
                }
            ]
        },
        {
            name: "江干区",
            icon: "../../static/images/lamp/home/tree/area.png",
            children: []
        },
        {
            name: "上城区",
            icon: "../../static/images/lamp/home/tree/area.png",
            children: []
        },
        {
            name: "下城区",
            icon: "../../static/images/lamp/home/tree/area.png",
            children: []
        },
        {
            name: "临安区",
            icon: "../../static/images/lamp/home/tree/area.png",
            children: []
        }
    ]
}];

var setting = {
    data: {
        simpleData: {
            enable: true
        }
    },
    view: {
        // showIcon: showIconForTree
    },
    callback: {
        onClick: zTreeOnClick
    }
};

function showIconForTree(treeId, treeNode) {
    return !treeNode.isParent;
};

/**
 * @description 树节点点击事件
 * @param event
 * @param treeId
 * @param treeNode
 */
function zTreeOnClick(event, treeId, treeNode) {
    if (treeNode.lng && treeNode.lat) {
        Marker.location(treeNode.lng, treeNode.lat, treeNode.status);
    }
}

var tree = {
    /**
     * @description 左侧树形列表高度自适应
     */
    autoHeight: function() {
        var wHeight = $(window).height();
        var distance = 6;

        $('#treeBox').css('height', wHeight - 2 * distance);
    },
    /**
     * @description 初始化左侧树形列表
     */
    init: function() {
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    },
    /**
     * @description 左侧树形列表缩进
     */
    shrink: function() {
        var $wrapper = $('#wrapper');

        if (!$wrapper.hasClass('side-shrink')) {
            $wrapper.addClass('side-shrink');
        } else {
            $wrapper.removeClass('side-shrink');
        }
    }
};

tree.autoHeight();

tree.init();

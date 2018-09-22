var zNodes = [{
        name: "硬盘录像机",
        children: [{
                name: "摄像头1",
                children: []
            },
            {
                name: "摄像头2",
                children: []
            }
        ]
    },
    {
        name: "硬盘录像机",
        children: [{
                name: "摄像头1",
                children: []
            },
            {
                name: "摄像头2",
                children: []
            }
        ]
    },
    {
        name: "硬盘录像机",
        children: [{
                name: "摄像头1",
                children: []
            },
            {
                name: "摄像头2",
                children: []
            }
        ]
    }
];

var setting = {
    data: {
        simpleData: {
            enable: true
        }
    },
    view: {
        showIcon: showIconForTree
    },
    callback: {
        onClick: zTreeOnClick
    }
};

/**
 * @description 不显示树节点图标
 */
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
    console.log(treeId);
    console.log(treeNode);
}

var tree = {
    init: function(zNodes) {
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    }
};

tree.init(zNodes);

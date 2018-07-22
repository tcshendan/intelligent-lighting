var setting = {
  check: {
    enable: true
  },
  data: {
    simpleData: {
      enable: true
    }
  }
};

var zNodes =[
  { id:1, pId:0, name:"杭州市", open:true},
  { id:11, pId:1, name:"江干区"},
  { id:111, pId:11, name:"四季青街道"},
  { id:1111, pId:111, name:"AAA配电柜"},
  { id:11111, pId:1111, name:"路灯集中控制器"},
  { id:111111, pId:11111, name:"灯控器"},
  { id:1111111, pId:111111, name:"灯具"},
  { id:11112, pId:1111, name:"景观灯集中控制器"},
  { id:111121, pId:11112, name:"主控器"},
  { id:1112, pId:111, name:"BBB配电柜"},
  { id:112, pId:11, name:"采荷街道"},
  { id:12, pId:1, name:"滨江区"},
  { id:121, pId:12, name:"长河街道"},
  { id:122, pId:12, name:"西兴街道"}
];

$(document).ready(function() {
  $.fn.zTree.init($("#treeDemo"), setting, zNodes);

  $(".j-selection").click(function(e) {
    $("#treeBox").toggle();
    e.stopPropagation();
  });
});

var treeBox = {
  insertSelectionItem: function(id, name) {
    $("#selection_rendered").append('<li class="selection-item" data-id="' + id + '"><span class="selection-item-content">' + name + '</span></li>');
  },
  showSelectedNodes: function(nodes) {
    var temp = [];
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].isParent) {
        temp = nodes[i].children;
      }
    }
  },
  confirm: function() {
    var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
    var nodes = treeObj.getCheckedNodes(true);
    //console.log(nodes);
    var selectedNodes;
    var htmlStr;
    if (nodes && nodes.length > 0) {
      selectedNodes = [];
      htmlStr = '';
      for (var i = 0, len = nodes.length; i < len; i++) {
        if (nodes[i].getCheckStatus().half != true) {
          selectedNodes.push(nodes[i]);
          htmlStr += '<li class="selection-item" data-id="'+ nodes[i].id +'">' +
                       '<span class="selection-item-content">'+ nodes[i].name +'</span>' +
                     '</li>';
        }
      }
    }
    //console.log(selectedNodes);
    $('#selection_rendered').html(selectedNodes ? '' : '请选择').append(htmlStr);
    $('#treeBox').hide();
  },
  reset: function() {
    var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
    treeObj.checkAllNodes(false);
    $('#selection_rendered').html('请选择');
  }
}

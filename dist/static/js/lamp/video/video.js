// 初始化插件

// 全局保存当前选中窗口
var g_iWndIndex = 0; //可以不用设置这个变量，有窗口参数的接口中，不用传值，开发包会默认使用当前选择窗口
$(function() {
    // 检查插件是否已经安装过
    var iRet = WebVideoCtrl.I_CheckPluginInstall();
    if (-2 == iRet) {
        //alert("您的Chrome浏览器版本过高，不支持NPAPI插件！");
        var innerHTML = '<div class="video-tips" id="videoTips"><p>您的Chrome浏览器版本过高，不支持NPAPI插件</p></div>';
        $('#videoWindow').append(innerHTML);
        return;
    } else if (-1 == iRet) {
        // alert("您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！");
        var innerHTML = '<div class="video-tips" id="videoTips"><a href="/jsp/module/video/newHik/WebComponents.exe">请点击此处下载插件，安装时请关闭浏览器</a></div>';
        $('#videoWindow').append(innerHTML);
        return;
    }

    // 初始化插件参数及插入插件
    var videoWindowWidth = 1660;
    var videoWindowHeight = 813;
    // var videoWindowWidth = 1107;
    // var videoWindowHeight = 475;
    WebVideoCtrl.I_InitPlugin(videoWindowWidth, videoWindowHeight, {
        bWndFull: true, //是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
        iWndowType: 2,
        cbSelWnd: function(xmlDoc) {
            g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
            var szInfo = "当前选择的窗口编号：" + g_iWndIndex;
            showCBInfo(szInfo);
        }
    });
    WebVideoCtrl.I_InsertOBJECTPlugin("videoWindow");

    // 检查插件是否最新
    if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
        alert("检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！");
        return;
    }

});

// 窗口分割数
function changeWndNum(self, iType) {
    $('#screenChange').find('.operate-btn').removeClass('active');
    $(self).addClass('active');
    iType = parseInt(iType, 10);
    WebVideoCtrl.I_ChangeWndNum(iType);
}

/**
 * @description 登录
 * @param szIP 61.184.189.146
 * @param szPort 82
 * @param szUsername admin
 * @param szPassword admin123
 */
function clickLogin(szIP, szPort, szUsername, szPassword) {
    if ("" == szIP || "" == szPort) {
        return;
    }

    var iRet = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
        success: function(xmlDoc) {
            alert(szIP + " 登录成功！");
        },
        error: function() {
            alert(szIP + " 登录失败！");
        }
    });

    if (-1 == iRet) {
        alert(szIP + " 已登录过！");
    }
}

/**
 * @description 开始预览
 * @param szIP 61.184.189.146
 * @param iStreamType 主码流 1
 * @param iChannelID 摄像头
 * @param bZeroChannel bzero false
 */
function clickStartRealPlay(szIP, iStreamType, iChannelID) {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
        szIP = szIP,
        iStreamType = parseInt(iStreamType, 10),
        iChannelID = parseInt(iChannelID, 10),
        bZeroChannel = false,
        szInfo = "";

    if ("" == szIP) {
        return;
    }

    if (oWndInfo != null) { // 已经在播放了，先停止
        WebVideoCtrl.I_Stop();
    }

    var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
        iStreamType: iStreamType,
        iChannelID: iChannelID,
        bZeroChannel: bZeroChannel
    });

    if (0 == iRet) {
        szInfo = "开始预览成功！";
    } else {
        szInfo = "开始预览失败！";
    }

    alert(szIP + " " + szInfo);
}

// 停止预览
function clickStopRealPlay() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
        szInfo = "";

    if (oWndInfo != null) {
        var iRet = WebVideoCtrl.I_Stop();
        if (0 == iRet) {
            szInfo = "停止预览成功！";
        } else {
            szInfo = "停止预览失败！";
        }
        alert(oWndInfo.szIP + " " + szInfo);
    }
}

// PTZ控制 9为自动，1,2,3,4,5,6,7,8为方向PTZ
var g_bPTZAuto = false;

function mouseDownPTZControl(iPTZIndex) {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
        bZeroChannel = false,
        iPTZSpeed = 1;

    if (bZeroChannel) { // 零通道不支持云台
        return;
    }

    if (oWndInfo != null) {
        if (9 == iPTZIndex && g_bPTZAuto) {
            iPTZSpeed = 0; // 自动开启后，速度置为0可以关闭自动
        } else {
            g_bPTZAuto = false; // 点击其他方向，自动肯定会被关闭
        }

        WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
            iPTZSpeed: iPTZSpeed,
            success: function(xmlDoc) {
                if (9 == iPTZIndex) {
                    g_bPTZAuto = !g_bPTZAuto;
                }
                alert(oWndInfo.szIP + " 开启云台成功！");
            },
            error: function() {
                alert(oWndInfo.szIP + " 开启云台失败！");
            }
        });
    }
}

// 方向PTZ停止
function mouseUpPTZControl() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(1, true, {
            success: function(xmlDoc) {
                alert(oWndInfo.szIP + " 停止云台成功！");
            },
            error: function() {
                alert(oWndInfo.szIP + " 停止云台失败！");
            }
        });
    }
}

function PTZZoomIn() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(10, false, {
            iWndIndex: g_iWndIndex,
            success: function(xmlDoc) {
                alert(oWndInfo.szIP + " 调焦+成功！");
            },
            error: function() {
                alert(oWndInfo.szIP + "  调焦+失败！");
            }
        });
    }
}

function PTZZoomout() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(11, false, {
            iWndIndex: g_iWndIndex,
            success: function(xmlDoc) {
                alert(oWndInfo.szIP + " 调焦-成功！");
            },
            error: function() {
                alert(oWndInfo.szIP + "  调焦-失败！");
            }
        });
    }
}

function PTZZoomStop() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(11, true, {
            iWndIndex: g_iWndIndex,
            success: function(xmlDoc) {
                alert(oWndInfo.szIP + " 调焦停止成功！");
            },
            error: function() {
                alert(oWndInfo.szIP + "  调焦停止失败！");
            }
        });
    }
}

function PTZFocusIn() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(12, false, {
            iWndIndex: g_iWndIndex,
            success: function(xmlDoc) {
                alert(oWndInfo.szIP + " 聚焦+成功！");
            },
            error: function() {
                alert(oWndInfo.szIP + "  聚焦+失败！");
            }
        });
    }
}

function PTZFoucusOut() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(13, false, {
            iWndIndex: g_iWndIndex,
            success: function(xmlDoc) {
                alert(oWndInfo.szIP + " 聚焦-成功！");
            },
            error: function() {
                alert(oWndInfo.szIP + "  聚焦-失败！");
            }
        });
    }
}

function PTZFoucusStop() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(12, true, {
            iWndIndex: g_iWndIndex,
            success: function(xmlDoc) {
                alert(oWndInfo.szIP + " 聚焦停止成功！");
            },
            error: function() {
                alert(oWndInfo.szIP + "  聚焦停止失败！");
            }
        });
    }
}

function PTZIrisIn() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(14, false, {
            iWndIndex: g_iWndIndex,
            success: function(xmlDoc) {
                alert(oWndInfo.szIP + " 光圈+成功！");
            },
            error: function() {
                alert(oWndInfo.szIP + "  光圈+失败！");
            }
        });
    }
}

function PTZIrisOut() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(15, false, {
            iWndIndex: g_iWndIndex,
            success: function(xmlDoc) {
                alert(oWndInfo.szIP + " 光圈-成功！");
            },
            error: function() {
                alert(oWndInfo.szIP + "  光圈-失败！");
            }
        });
    }
}

function PTZIrisStop() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(14, true, {
            iWndIndex: g_iWndIndex,
            success: function(xmlDoc) {
                alert(oWndInfo.szIP + " 光圈停止成功！");
            },
            error: function() {
                alert(oWndInfo.szIP + "  光圈停止失败！");
            }
        });
    }
}

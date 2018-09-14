var searchInput = document.getElementById('searchInput');
var searchResult = document.getElementById('searchResult');

var timer = null;

searchInput.onfocus = function() {
    searchResult.style.display = 'block';
};

searchInput.onkeyup = function() {
    var keyword = this.value;

    debounce(function() {

        if ($.trim(keyword).length > 0) {

            $.ajax({
                url: '../../static/data/search.json',
                type: 'GET',
                success: function(response) {
                    //console.log(response);

                    if (response.code == 200) {
                        var equipList = response.data.result;
                        if (equipList.length > 0) {
                            searchResult.innerHTML = '';
                            var htmlStr = '<ul>';
                            for (var i = 0; i < equipList.length; i++) {
                                htmlStr += '<li class="search-result-item" ' +
                                    'data-lng="' + equipList[i].lng + '" ' +
                                    'data-lat="' + equipList[i].lat + '" ' +
                                    'data-state="' + equipList[i].state + '"> ' +
                                    '<i class="equip-icon icon-post"></i>' +
                                    '<span class="equip-text">' + equipList[i].name + '</span>' +
                                    '</li>';
                            }
                            htmlStr += '</ul>';
                            searchResult.innerHTML = htmlStr;
                            searchResult.style.display = 'block';
                        } else {
                            searchResult.innerHTML = '<div class="search-result-notice">抱歉，暂无数据</div>';
                        }
                    }
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
        }

    }, 300);
};

searchResult.onclick = function(ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if (getNode(target).nodeName.toLowerCase() == 'li') {
        searchInput.value = getNode(target).children[1].innerText;
        searchResult.style.display = 'none';

        var lng = getNode(target).dataset.lng;
        var lat = getNode(target).dataset.lat;
        var state = getNode(target).dataset.state;

        Marker.location(lng, lat, state);
    }
};

searchInput.onblur = function() {
    timer = setTimeout(function() {
        searchResult.style.display = 'none';
        if (!searchInput.value) {
            searchInput.value = '';
        }
    }, 120);
};

var tid = null;
/**
 * 延迟执行函数
 * @param fn
 * @param wait
 */
function debounce(fn, wait) {
    //设定默认的延迟时间
    wait = wait || 500;
    //清除定时器
    tid && clearTimeout(tid);
    //定时器执行
    tid = setTimeout(fn, wait);
}

/**
 * 返回li
 * @param node
 * @returns {*}
 */
function getNode(node) {
    if (node.nodeName.toLowerCase() === 'li') {
        return node;
    } else {
        return getNode(node.parentNode);
    }
}

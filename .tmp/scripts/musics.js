'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by Administrator on 2016/10/3.
 */

// todo：将html代码分离为配置项
var Musics = function (window) {
    var page = 1,
        pageSize = 1,
        total = 9999,
        curr_id = 0,
        hasScrolled = false,
        containerSelector = '',
        gridSelector = '';

    function init(options) {

        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
            throw new ReferenceError('Init Musics failed, param isn\'t a object');
            return;
        }

        if (typeof options.container === 'string' && $(options.container).length === 1) {
            containerSelector = options.container;
        } else {
            throw new ReferenceError('Init Musics failed, container selector doesn\'t existed or more than one');
            return;
        }

        if (typeof options.grid === 'string' && $(options.grid).length === 1) {
            gridSelector = options.grid;
        } else {
            throw new ReferenceError('Init Musics failed, grid selector isn\'t existed or more than one');
            return;
        }

        $(gridSelector).masonry({
            itemSelector: '.music_item', // 子元素
            gutter: 10,
            fitWidth: true // 宽度自适应
        });
    }

    function loadData() {

        if (hasScrolled || (page - 1) * pageSize >= total) {
            return;
        }

        if (!Comman.isScrollOver(gridSelector)) {
            return;
        }
        hasScrolled = true;

        var options = {
            type: 'GET',
            url: 'admin/doMusicsAdmin.php?act=get&pageSize=' + pageSize + '&page=' + page++,
            error: function error(request) {
                console.log('页面请求失败...');
            },
            success: function success(response) {
                var res = JSON.parse(response),
                    html = '',
                    $items;

                total = res['total'];
                if (res['error']) {
                    console.log(res['error']);
                }

                html = createHtml(res['musics']);
                $items = $(html);

                // 将新内容添加到页面，并加载到masonry插件
                $(gridSelector).append($items).masonry('appended', $items);
                $(gridSelector).masonry('layout');

                hasScrolled = false;
                loadData();
            }
        };
        $.ajax(options);
    }
    function createHtml(musics) {
        var template = '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling=no' + ' height=86 src="http://music.163.com/outchain/player?type={type}&id={id}&auto=0&height=66"></iframe>',
            html = '',
            iframe = '',
            i,
            len;
        for (i = 0, len = musics.length; i < len; i++) {
            iframe = template.replace('{type}', musics[i]['type']);
            iframe = iframe.replace('{id}', musics[i]['m_id']);
            html += '<div class=\'music_item\'><div>' + iframe + '</div><div class=\'music_comment\'><p>' + musics[i]['comment'] + '</p><p class=\'update_date\'>' + musics[i]['date'] + '</p></div></div>';
        }
        return html;
    }

    return {
        init: init,
        show: function show() {
            console.log('music');
            $(containerSelector).show();
            loadData();
        },
        hide: function hide() {
            $(containerSelector).hide();
        },
        scroll: loadData,
        resize: loadData
    };
}(window);
//# sourceMappingURL=musics.js.map

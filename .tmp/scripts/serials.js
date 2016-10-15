'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by Administrator on 2016/10/3.
 */

var Serials = function (window) {
    var POSTERS_PATH = 'admin/uploads/posters/',
        IMAGES_PATH = 'admin/uploads/images/';

    var page = 1,
        pageSize = 1,
        total = 9999,
        curr_id = 0,
        hasScrolled = false,
        containerSelector = '',
        gridSelector = '';

    function init(o) {
        if ((typeof o === 'undefined' ? 'undefined' : _typeof(o)) !== 'object') {
            throw new ReferenceError('Init Serials failed, param isn\'t a object');
            return;
        }

        if (Comman.testSelector(o.container)) {
            containerSelector = o.container;
        } else {
            throw new ReferenceError('Init Serials failed, container selector doesn\'t existed or more than one');
            return;
        }

        if (Comman.testSelector(o.grid)) {
            gridSelector = o.grid;
        } else {
            throw new ReferenceError('Init Serials failed, grid selector isn\'t existed or more than one');
            return;
        }

        bind();
    }

    function bind() {
        $(gridSelector).on('click', '.grid-item', lightBox);
        $(gridSelector).masonry({
            itemSelector: '.grid-item',
            gutter: 10,
            fitWidth: true
        });
        $('.serialsCard').on('click', '.grid-item', function () {
            $(this).hide();
            $(gridSelector).masonry('layout');
        });
    }

    /**
     * 显示分数为星星
     */
    function createStars(index) {
        return '★★★★★★★★★★☆☆☆☆☆☆☆☆☆☆'.slice(10 - Math.ceil(index), 20 - Math.round(index));
    }

    /**
     * 将状态英文转为中文
     */
    function createStateCN(state) {
        var stateCN = { 'updating': '更新中', 'end': '完结', 'schedule': '预定', 'unknow': '未知' };
        return stateCN[state] ? stateCN[state] : '未知';
    }

    /**
     *将电视剧数据转化为html代码
     * @param data 电视剧数据，约定为数组
     * @returns {string} html代码
     */
    function createHtml(data) {
        var html = '',
            len,
            i;

        for (i = 0, len = data.length; i < len; i++) {
            d = data[i];
            var // 发行日期
            release_date_html = d['release_date'] ? '<span class=\'release_date_item\'>(' + d['release_date'].slice(0, 4) + ')</span>' : '',

            // 中文名
            c_name_html = '<p class=\'c_name_item\'>' + d['c_name'] + release_date_html + '</p>',

            // 外文名
            f_name_html = d['f_name'] ? '<p class=\'f_name_item\'>外文名：' + d['f_name'] + '</p>' : '',

            // 导演
            director_html = d['director'] ? '<p class=\'director_item\'>导演：' + d['director'] + '</p>' : '',

            // 演员
            acots_html = d['actors'] ? '<p class=\'acots_item\'>演员：' + d['actors'].split(',').join('/') + '</p>' : '',

            // 发行公司
            issuer_html = d['issuer'] ? '<p class=\'issuer_item\'>发行公司：' + d['issuer'] + '</p>' : '',

            // 类型
            types_html = '',

            // 地区
            distinct_html = d['distinct'] ? '<p class=\'distinct_item\'>地区：' + d['distinct'] + '</p>' : '',

            // 状态
            state_html = d['state'] ? '<p class=\'state_item\'>状态：' + createStateCN(d['state']) + '</p>' : '',
                tags_html = '',

            // 时长
            duration_html = d['duration'] ? '<p class=\'duration_html_item\'>每集时长：' + d['duration'] + '</p>' : '',

            // 集数
            episode_number_html = d['episode_number'] ? '<p class=\'episode_number_item\'>集数：' + d['episode_number'] + '</p>' : '',

            // 季数
            season_number_html = d['season_number'] ? '<p class=\'season_number\'>季数：' + d['season_number'] + '</p>' : '',
                reco_index = d['reco_index'] ? parseFloat(d['reco_index']).toFixed(1) : 0,
                type_index = d['type_index'] ? parseFloat(d['type_index']).toFixed(1) : 0,
                douban_index = d['douban_index'] ? parseFloat(d['douban_index']).toFixed(1) : 0,


            // 推荐评分
            reco_index_html = reco_index > 0 ? '<p class=\'reco_index_item\'>评分：' + createStars(reco_index) + ' <span>' + reco_index + '</span></p>' : '',

            // 类型评分
            type_index_html = type_index > 0 ? '<p class=\'type_index_item\'>类型分：' + createStars(type_index) + ' <span>' + type_index + '</span></p>' : '',

            // 豆瓣评分
            douban_index_html = douban_index > 0 ? '<p class=\'douban_index_item\'>豆瓣评分：' + createStars(douban_index) + ' <span>' + douban_index + '</span></p>' : '',

            // 简介
            synopsis_html = d['synopsis'] ? '<div class=\'synopsis_item\'><p>' + d['synopsis'] + '</p></div>' : '',

            // 海报
            poster_html = d['posters'] instanceof Array && d['posters'].length > 0 ? '<img src=\'' + POSTERS_PATH + d['posters'][Math.floor(Math.random() * d['posters'].length)] + '\'>' : '',
                date_html = '<p>添加日期：' + d['date'] + '</p>',
                types = d['types'] ? d['types'].split(',') : [],
                tags = d['tags'] ? d['tags'].split(',') : [],
                addDate = new Date(d['date']),
                now = new Date(),
                banner = '',
                j,
                tagsLen;

            for (j = 0, tagsLen = tags.length; j < tagsLen; j++) {
                types_html += '<a href=\'./admin/doSerialsAdmin.php\'>' + tags[j] + '</a>';
            }
            for (j = 0, tagsLen = tags.length; j < tagsLen; j++) {
                tags_html += '<a href=\'./admin/doSerialsAdmin.php\'>' + tags[j] + '</a>';
            }

            types_html = types_html ? '<div class=\'types_item\'>' + types_html + '</div>' : '';
            tags_html = tags_html ? '<div class=\'tags_item\'>' + tags_html + '</div>' : '';

            // 添加 banner标志,评分大等于9分为 recommend banner，一周内添加的为 new banner
            if (d['reco_index'] && d['reco_index'] >= 9.0) {
                banner = 'recommend';
            } else if (now.getTime() - addDate.getTime() < 1000 * 3600 * 24 * 7) {
                banner = 'new_add';
            }

            html += '<div class=\'grid-item ' + banner + '\' data-id=\'' + d['id'] + '\'><div class=\'serials_info\'>' + poster_html + c_name_html + f_name_html + director_html + acots_html + issuer_html + distinct_html + state_html + duration_html + episode_number_html + season_number_html + reco_index_html + type_index_html + douban_index_html + types_html + tags_html + date_html + '</div>' + synopsis_html + '</div>';
        }
        return html;
    }

    /**
     * 加载serials数据
     */
    // todo 将全局变量移出函数
    // todo 将判断滚动底部的逻辑分离到另外的函数
    // todo 将html类名分离出来
    function loadData() {
        // 加载已全部加载，终止程序
        if (hasScrolled || (page - 1) * pageSize >= total) {
            return;
        }

        // 页面滚动到接近底部时，加载更多数据
        if (Comman.isScrollOver(gridSelector)) {
            hasScrolled = true; // 加载过程中，禁止重复触发

            // ajax配置项
            var options = {
                type: 'GET',
                url: './admin/doSerialsAdmin.php?act=get&pageSize=' + pageSize + '&page=' + page++,
                error: function error(request) {
                    console.log('页面请求失败...');
                },
                success: function success(response) {

                    var res = JSON.parse(response),
                        d = res['data'],
                        html,
                        $items;

                    total = res['total'];
                    if (res['error']) {
                        console.log(res['error']);
                        return;
                    };

                    // 将得到的数据生成html
                    html = createHtml(d);
                    $items = $(html);

                    // 将新内容添加到页面，并加载到masonry插件
                    $(gridSelector).append($items).masonry('appended', $items);
                    // $('.serialsCard').masonry('layout');

                    // 加载完后，恢复滚动事件
                    hasScrolled = false;

                    // imagesLoaded插件配置
                    $(gridSelector).imagesLoaded().progress(function (instance, image) {

                        // img图片加载失败，删除这个img元素
                        if (!image.isLoaded) {
                            image.img.outerHTML = '<img>';
                        }

                        // 每个图片加载完后，重新布局
                        $(gridSelector).masonry('layout');
                    }).always(function (instance) {

                        // 全部图片加载完成并重新布局后，如果页面仍有足够空间，继续加载数据
                        loadData();
                    });
                }
            };
            $.ajax(options);

            // 终止递归
            return;
        }
    }

    /* 点击电视剧卡片显示图片灯箱 */
    function lightBox() {

        // 获取图片路径的ajax配置
        var options = {
            type: 'GET',
            url: './admin/doSerialsAdmin.php?act=getImagesById&id=' + $(this).attr('data-id'),
            error: function error(request) {
                //throwError("页面请求失败...");
            },
            success: function success(response) {
                var res = JSON.parse(response),
                    posters = res['posters'] ? res['posters'] : [],
                    images = res['images'] ? res['images'] : [],
                    items = [],
                    i,
                    len;

                if (res['error']) {
                    console.log(res['error']);
                    return;
                }

                // 将海报和剧照图片路径，格式化后合并至一个数组
                for (i = 0, len = posters.length; i < len; i++) {
                    items.push({
                        src: POSTERS_PATH + posters[i]
                    });
                }
                for (i = 0, len = images.length; i < len; i++) {
                    items.push({
                        src: IMAGES_PATH + images[i]
                    });
                }

                // magnificPopup灯箱插件配置
                $.magnificPopup.open({
                    items: items,
                    gallery: {
                        enabled: true // 多图篇配置为画廊
                    },
                    type: 'image'
                });
            }
        };
        $.ajax(options);
    }

    return {
        init: init,
        show: function show() {
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
//# sourceMappingURL=serials.js.map

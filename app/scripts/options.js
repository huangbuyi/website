/**
 * Created by Administrator on 2016/9/29.
 */

/* 导航插件mmenu配置 */
$('nav#menu').mmenu({
    extensions	: [ 'effect-slide-menu',  'shadow-panels' ],
    counters	: true,
    navbar: {
        title: 'Advanced menu'  // 导航菜单头部
    },
    navbars: [
        {
            // 搜索栏
            position: 'top',
            content: [ 'searchfield' ]
        }, {
            // 关闭图标
            position: 'top',
            content: [
                'prev',
                'title',
                'close'
            ]
        }, {
            // 底部自定义
            position: 'bottom',
            content: [
                '<a href="admin/index.html" target="_blank">打开后台</a>'
            ]
        }
    ],
    onClick: {
        close: true,
        setSelected: true
    }
});






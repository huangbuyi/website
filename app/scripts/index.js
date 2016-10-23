/**
 * Created by Administrator on 2016/9/8.
 */

// todo 抽出配置数据
// todo 将写入html的数据抽出成配置数据，或存入数据库
// todo 用插件重新电视剧页面



$(window).ready(function (){

    Serials.init({
        container:'.serials',
        grid:'.serialsCard'
    });

    Musics.init({
        container:'.musics',
        grid:'.music_card'
    });
    Person.init({
        container:'.about_him'
    })
    Projects.init({
        container:'.programs',
        grid:'.grid'
    })

    init();
    // 设置初始页面

})



function init(){
    var Show = Person,
        hash = window.location.hash,
        $target = $('nav#menu').find('a:not(.disabled)[href=\'' + hash + '\']');


    Show.show();

    // 禁用未开放的功能
    $('.disabled').attr('title', '功能未上线').css({'color':'rgba(0,0,0,0.34)','cursor':'default'}).on('click',function(event){
        event.preventDefault();
        event.stopPropagation();
    });


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

    $('nav#menu').data( 'mmenu' ).update();

    // 导航功能
    $('nav#menu').on('click', 'a:not(.disabled)', function(event){
        var nav_id = $(this).attr('id');

        // 默认有效的导航项需设置id，没有id的项为导航插件自动添加的项目或自定义链接。
        if(!nav_id){
            return;
        }

        event.preventDefault();

        if(typeof Show['hide'] === 'function'){
            Show.hide();
        } else {
            $('main > div').hide();
        }

        var nav = {
            'person': Person,
            'p_introduction': Person,
            'p_expr': Person,
            'p_edu_expr': Person,
            'p_work_expr': Person,
            'p_skills': Person,
            'p_hobbies': Person,
            'p_contact': Person,
            's_musics': Musics,
            's_serials': Serials,
            'w_programs': Projects
        }

        if(typeof nav[nav_id] !== 'object'){
            throw new Error('Navigate failed:target object doesn\'t exited');
            return;
        }

        if(typeof Show['show'] !== 'function') {
            throw new Error('Navigate failed:target object haven\'t show function');
            return;
        }


        Show = nav[nav_id];
        Show.show();
        var selector = $(this).attr('href');
        if($(selector).length > 0){
            $('main').animate( {scrollTop: $(selector)[0].offsetTop - 10 }, 600, 'swing');
            window.location.hash = selector;
        } else {
            window.location.hash = '';
        }
    });

    // 根据地址栏的hash跳转页面
    if( $target.length > 0){
        $target.click();
    };

    $(window).on('hashchange', function (event) {
        var hash = window.location.hash,
            $target = $('nav#menu').find('a:not(.disabled)[href=\'' + hash + '\']');
        if( $target.length > 0){
            $target.click();
        }
    })

    $(window).on('resize', function(){

        if(typeof Show['resize'] == 'function' ){
            Show.resize();
        }
    })

    $('main').on('scroll', function(){

        if( typeof Show['scroll'] === 'function' ){
            Show.scroll();
        }
    });

    bindTouch();

}

function bindTouch(){
    // create a manager for that element
    var mc = new Hammer.Manager(window);

    // create a recognizer
    var Swipe = new Hammer.Swipe();

    // add the recognizer
    mc.add(Swipe);

    // subscribe to events
    mc.on('swiperight', function(e) {
        $('nav#menu').data( 'mmenu' ).open();
    });
    mc.on('swipeleft', function(e) {
        $('nav#menu').data( 'mmenu' ).close();
    });
}













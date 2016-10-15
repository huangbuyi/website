'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by Administrator on 2016/9/8.
 */

// todo 抽出配置数据
// todo 将写入html的数据抽出成配置数据，或存入数据库
// todo 用插件重新电视剧页面

Serials.init({
    container: '.serials',
    grid: '.serialsCard'
});

Musics.init({
    container: '.musics',
    grid: '.music_card'
});
Person.init({
    container: '.about_him'
});
Projects.init({
    container: '.programes',
    grid: '.grid'
});

var Show = Person;
$('.disabled').attr('title', '功能未上线').css({ 'color': 'rgba(0,0,0,0.34)', 'cursor': 'default' }).on('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
});

$('nav#menu').on('click', 'a:not(.disabled)', function (event) {
    var nav_id = $(this).attr('id');

    // 默认有效的导航项需设置id，没有id的项为导航插件自动添加的项目或自定义链接。
    if (!nav_id) {
        return;
    }

    event.preventDefault();

    if (typeof Show['hide'] === 'function') {
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
    };

    if (_typeof(nav[nav_id]) !== 'object') {
        throw new Error('Navigate failed:target object doesn\'t exited');
        return;
    }

    if (typeof Show['show'] !== 'function') {
        throw new Error('Navigate failed:target object haven\'t show function');
        return;
    }

    Show = nav[nav_id];
    Show.show();
    var selector = $(this).attr('href');
    if ($(selector).length > 0) {
        $('main').animate({ scrollTop: $(selector)[0].offsetTop - 10 }, 600, 'swing');
        window.location.hash = selector;
    }
});

$('main').on('scroll', function () {

    if (typeof Show['scroll'] === 'function') {
        Show.scroll();
    }
});

$(window).on('resize', function () {

    if (typeof Show['resize'] == 'function') {
        Show.resize();
    }
});

$('main').on('scroll', function () {

    if (typeof Show['scroll'] === 'function') {
        Show.scroll();
    }
});

$(window).on('resize', function () {

    if (typeof Show['resize'] == 'function') {
        Show.resize();
    }
});

// 导航栏无刷新加载
/*$('nav > ul > li > a').on("click", function(event) {
    var navName = $(this).text()
    if(navName != ("后台" || "关于他" || "声明")){
        event.preventDefault();
    }

    $("nav .selected").removeClass('selected');
    $("nav li ul").hide();
    $(this).addClass("selected");
    $(this).siblings("ul").show();

    $("main > div").hide();
    switch( navName ) {
        case "关于他":
            Show = Person;
            //$(".about_him").show();
            break;
        case "他的分享":
            $(".his_sharing").show();
            break;
        case "他的作品":
            $(".his_project").show();
            break;
        case "他的统计":
            $(".his_data").show();
            break;
        case "他的随笔":
            $(".his_writing").show();
            break;
        case "声明":
            $(".copy_right").show();
            break;
        case "后台":
            $(".manager").show();

            break;
    }
    Show.show();
})*/

// 二级导航栏
/*$('nav ul ul a').on("click", function(event) {
    var navName = $(this).text();
    var about_him = ["前言","经历","教育经历","工作经历","技能","兴趣爱好","联系方式"];


    // $('nav ul .checked').removeClass("checked");
    // $(this).addClass("checked");

    // 这几项跳转至锚点，执行默认事件即可
    if(about_him.indexOf(navName) > -1){
        var selector = $(this).attr("href");

        $("main").animate( {scrollTop: $(selector)[0].offsetTop - 10 }, 2000, 'swing');

        return;
    }
    event.preventDefault();
    $("main > div").hide();

    var succFn =null;

    // todo 保存page pageSize到对象

    switch( navName ) {
        case "电影":
            $(".movies").show();
            break;
        case "电视剧":
            Show = Serials;
            break;
        case "动画":
            $(".animations").show();
            break;
        case "图书":
            $(".books").show();
            break;
        case "音乐":
            Show = Musics;
            break;
        case "程序":
            $(".programes").show();
            $('.programes .grid').masonry();
            break;
        case "摄影":
            $(".photography").show();
            break;
        case "观剧":
            $(".watch").show();
            break;
        case "时间":
            $(".time").show();
            break;
        case "时间戳":
            $(".timemap").show();
            break;
        case "笔记本":
            $(".notebook").show();
            break;
        case "乌鸡汤":
            $(".black_soup").show();
            break;
    }
    if( typeof Show.show == "function"){
        Show.show();
    }


})*/
//# sourceMappingURL=index.js.map

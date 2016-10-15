/**
 * Created by Administrator on 2016/8/30.
 */

// alert(dump(Cookies.get())); //输出所有cookie值

/**
 打印对象所有值和属性
 */
AdminAdd.init();
AdminSerials.init();
function dump(myObject) {
    var s = "";
    for (var property in myObject) {
        s = s + "<br> "+property +": " + myObject[property] ;
    }
    return s;
}
$HOST_URL = 'http://localhost:80';


var AdminServer = ( function(window){

    function getServerInfo() {
        var option = {};
        option = {
            type:"get",
            url:"doAdmin.php?act=getServer",
            error:function(){},
            success:function(response){
                var res = JSON.parse(response),
                    data = res['data'];

                $("#server_software").text(data['server_software']);
                $("#server_protocol").text(data['server_protocol']);
                $("#php_os").text( data['php_os'] );
                $("#php_sapi_name").text( data['php_sapi_name'] );
                $("#mysql_version").text( data['mysql_version'] );

            }
        }
        $.ajax(option);
    }
    return {
        show: function(){
            getServerInfo();
            $(".server").show();
        }
    }
} )(window)

var Show = AdminServer;
AdminServer.show();

$(".disabled").attr("title", "功能未上线").css({"color":"rgba(0,0,0,0.34)","cursor":"default"}).on("click",function(event){
    event.preventDefault();
    event.stopPropagation();
});


$('nav').on("click",'a', function(event){

    var nav_id = $(this).attr("id");

    // 默认有效的导航项需设置id，没有id的项为导航插件自动添加的项目或自定义链接。
    if(!nav_id){
        return;
    }

    event.preventDefault();

    if(Show && typeof Show.hide === "function"){
        Show.hide();
    } else {
        $("main > div").hide();
    }


    var nav = {
        "server": AdminServer,
        "list_movies": AdminMovies,
        "list_serials": AdminSerials,
        "list_animations": AdminAnimations,
        "list_musics": AdminMusics,
        "list_books": AdminBooks,
        "update_movies": AdminUpdate,
        "add_item": AdminAdd,
        "update_serials": AdminUpdate
    }



    if(typeof nav[nav_id] !== "object"){
        throw new Error("Navigate failed:target object doesn't exited");
        return;
    }

    if(typeof nav[nav_id].show !== "function") {
        throw new Error("Navigate failed:target object haven't show function");
        return;
    }

    Show = nav[nav_id];
    Show.show();
})


// $('nav').on("click",'a', function(event){
//     var navName = $(this).text();
//
//     if(navName == "返回前台"){
//         return;
//     }
//
//     event.preventDefault();
//
//     $("nav .selected").removeClass('selected');
//     $(this).addClass("selected");
//     $("main > div").hide();
//     switch( navName ){
//         case "服务器":
//             $(".server").show();
//             break;
//         case "电视剧":
//             $(".serials").show();
//             break;
//         case "电影":
//             $(".movies").show();
//             break;
//         case "书":
//             $(".books").show();
//             break;
//         case "动画":
//             $(".animations").show();
//             break;
//         case "添加":
//             $(".serialsAdd").show();
//             break;
//         case "修改":
//             $(".serialsUpdate").show();
//
//     }
//     var options = {
//         type: "GET",
//         url: $(this).attr('href'),
//         error: function(request) {
//             throwError("页面请求失败...");
//         },
//         success: function(response) {
//             var res = JSON.parse(response);
//             var d = res.data;
//             if(res["error"]){
//                 alert(res["error"]);
//                 return;
//             }
//
//             switch( navName ){
//                 case "服务器":
//                     showServer(d);
//                     break;
//
//                 case "电视剧":
//                     showSerialsList(d);
//                     var totalPage = Math.ceil(res["total"] / res["pageSize"]);
//                     showPages(1, totalPage, 4);
//                     break;
//
//                 case "电影":
//
//                     break;
//                 case "书":
//
//                     break;
//                 case "动画":
//
//                     break;
//
//                 case "添加":
//
//                     break;
//
//             }
//
//         }
//     }
//     $.ajax(options);
// });



$(".header").on("click", "a", function(event) {
    event.preventDefault();
    var cls = $(this).attr("class");
    if (cls == "logout") {
        $.ajax({
            url: "doSerialsAdmin.php?act=logout",
            success: function (data) {
                if (JSON.parse(data)["success"] == true) {
                    beLogin();
                }
            }
        })
    }
    if (cls == "login") {
        $.magnificPopup.open({
            items: {
                src: "<div class='white-popup'><form class='loginPanel'>" +
                "<input type='text' name='username'  placeholder='Username'><br>" +
                "<input type='password' name='password' placeholder='Password'><br>" +
                "<input type='radio' id='autoLogin' name='autoLogin'>" +
                "<label for='autoLogin'>Remember me</label><br><button>登录</button></form></div>",
                type: 'inline'
            }
        })
    }
})
// 初始化登录状态
$.ajax({
    url: "doSerialsAdmin.php?act=login",
    success:function(response){
        var res = JSON.parse(response);
        if(res["username"]) {
            beLogout(res["username"]);
        } else {
            beLogin();
        }
    }
})

/**
 * 登录状态变为未登录
 */
function beLogin(){
    $(".logout").attr("class", "login").text("Sign in")
    $(".log_state").text("游客您好！");
}

/**
 * 登录状态变为已登录
 */
function beLogout(username){
    var user = username || Cookies.get("adminName") || "";
    if(user === ""){
        beLogin();
    } else {
        $(".login").attr("class", "logout").text("Sign out");
        $(".log_state").text(user);
    }
}

// 提交登录信息
// todo:表单验证
$("body").on("submit",".loginPanel", function(event){
    event.preventDefault();
    $.ajax({
        url: "doSerialsAdmin.php?act=login",
        data:$(".loginPanel").serialize(),
        type:'post',
        success: function (response) {
            var res = JSON.parse(response);
            if(res["error"]){
                alert(res["error"]);
            }
            if(res["username"]) {
                beLogout(res["username"]);
                alert("二货" + res["username"] + "，开始干活了！")
                $.magnificPopup.close();
            }
        }
    })
})


// $("main").on("click", '.paging a', function(event){
//     event.preventDefault();
//     var options = {
//         type: "GET",
//         url: $(this).attr('href'),
//         error: function (request) {
//             throwError("页面请求失败...");
//         },
//         success: function (response) {
//             var res = JSON.parse(response);
//             var d = res.data;
//             showSerialsList(d);
//             var totalPage = Math.ceil(res["total"] / 8);
//             showPages(res["page"], totalPage, 4);
//         }
//     }
//     $.ajax(options);
// })
// $('main').on("click", ".paging a", function(event) {
//     event.preventDefault();
//
//     //alert('http://localhost:80'+$(this).attr('href'));
//     var options = {
//         type: "GET",
//         url: $HOST_URL + $(this).attr('href'),
//         error: function(request) {
//             alert("分页请求失败...");
//         },
//         success: function(d) {
//             $("main").html(d);
//         }
//     }
//     $.ajax(options);
// })


// $('main').on("click", "a", function(event){
//     if($(this).text() == "修改" || $(this).text() == "取消"){
//         event.preventDefault();
//         // var tr = this.parentNode.parentNode,
//         //     tds = tr.childNodes,
//         //     i, len;
//         // for(i = 1, len = tds.length; i < len; i++){
//         //     $(tds[i]).attr("contentEditable", "true");
//         // }
//
//     }
//
//     if($(this).text() == "删除" ){
//         event.preventDefault();
//         if(confirm("确认要删除这条记录？")){
//             var options = {
//                 type: "GET",
//                 url: $(this).attr("href"),
//                 error: function(request) {
//                     throwError("连接失败");
//                 },
//                 success: function(response) {
//                     var res = JSON.parse(response);
//                     var d = res.data;
//                     showSerialsList(d);
//                 }
//             }
//             $.ajax(options);
//         }
//     }
// })

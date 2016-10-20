"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by Administrator on 2016/8/30.
 */

AdminAdd.init();
AdminSerials.init();

init();

function init() {
    // 初始页面为显示服务器信息
    var Show = AdminServer;
    Show.show();

    // 未开放的功能置为不可用状态
    $(".disabled").attr("title", "功能未上线").css({ "color": "rgba(0,0,0,0.34)", "cursor": "default" }).on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
    });

    // 初始化登录状态
    $.ajax({
        url: "doSerialsAdmin.php?act=login",
        success: function success(response) {
            var res = JSON.parse(response);
            if (res["username"]) {
                beLogout(res["username"]);
            } else {
                beLogin();
            }
        }
    });

    // 监听导航事件
    $('nav').on("click", 'a', function (event) {
        var nav_id = $(this).attr("id");

        // 默认有效的导航项需设置id，没有id的项为导航插件自动添加的项目或自定义链接。
        if (!nav_id) {
            return;
        }
        event.preventDefault();

        // 调用页面对象的隐藏函数
        if (Show && typeof Show.hide === "function") {
            Show.hide();
        } else {
            $("main > div").hide();
        }

        // 导航项对应的页面对象
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
        };

        if (_typeof(nav[nav_id]) !== "object") {
            throw new Error("Navigate failed:target object doesn't exited");
            return;
        }

        if (typeof nav[nav_id].show !== "function") {
            throw new Error("Navigate failed:target object haven't show function");
            return;
        }

        // 调用页面对象的显示函数
        Show = nav[nav_id];
        Show.show();
    });

    // 监听登录、登出事件
    $(".header").on("click", "a", function (event) {
        event.preventDefault();
        var cls = $(this).attr("class");

        // 登出
        if (cls == "logout") {
            $.ajax({
                url: "doSerialsAdmin.php?act=logout",
                success: function success(data) {
                    if (JSON.parse(data)["success"] == true) {
                        beLogin();
                    }
                }
            });
        }

        // 登入
        if (cls == "login") {
            $.magnificPopup.open({
                items: {
                    src: "<div class='white-popup'><form class='loginPanel'>" + "<input type='text' name='username'  placeholder='Username'><br>" + "<input type='password' name='password' placeholder='Password'><br>" + "<input type='checkbox' id='autoLogin' name='autoLogin'>" + "<label for='autoLogin'>一周内免登录</label><br><button>登录</button></form></div>",
                    type: 'inline'
                }
            });
        }
    });

    // 监听登录窗提交事件
    // todo:表单验证
    $("body").on("submit", ".loginPanel", function (event) {
        event.preventDefault();
        $.ajax({
            url: "doSerialsAdmin.php?act=login",
            data: $(".loginPanel").serialize(),
            type: 'post',
            success: function success(response) {
                var res = JSON.parse(response);
                if (res["error"]) {
                    alert(res["error"]);
                }
                if (res["username"]) {
                    beLogout(res["username"]);
                    alert("二货" + res["username"] + "，开始干活了！");
                    $.magnificPopup.close();
                }
            }
        });
    });

    /**
     * 登录状态变为未登录
     */
    function beLogin() {
        $(".logout").attr("class", "login").text("Sign in");
        $(".log_state").text("游客您好！");
    }

    /**
     * 登录状态变为已登录
     */
    function beLogout(username) {
        var user = username || Cookies.get("adminName") || "";
        if (user === "") {
            beLogin();
        } else {
            $(".login").attr("class", "logout").text("Sign out");
            $(".log_state").text(user);
        }
    }
}
//# sourceMappingURL=index.js.map

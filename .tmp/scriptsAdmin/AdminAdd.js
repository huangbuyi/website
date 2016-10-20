"use strict";

/**
 * Created by Administrator on 2016/10/4.
 */

var AdminAdd = function (window) {
    var container = "#insert_items";

    var init = function init() {

        $("#insert_music").on("submit", function (event) {
            event.preventDefault();
            var _this = this;
            $.ajax({
                type: "post",
                url: "doMusicsAdmin.php?act=add",
                data: $(this).serialize(),
                error: function error() {
                    alert("添加失败！");
                },
                success: function success(response) {
                    var res = JSON.parse(response);
                    if (res && res.success) {
                        alert("添加音乐成功！");
                        _this.reset();
                    } else {
                        alert(res['error']);
                    }
                    console.log(response);
                }
            });
        });
    };

    return {
        init: init,
        show: function show() {
            $(container).show();
        },
        hide: function hide() {
            $(container).hide();
        }
    };
}(window);
//# sourceMappingURL=AdminAdd.js.map

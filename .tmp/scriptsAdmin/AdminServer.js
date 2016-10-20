"use strict";

/**
 * Created by Administrator on 2016/10/17.
 */

var AdminServer = function (window) {

    function getServerInfo() {
        var option = {};
        option = {
            type: "get",
            url: "doAdmin.php?act=getServer",
            error: function error() {},
            success: function success(response) {
                var res = JSON.parse(response),
                    data = res['data'];

                $("#server_software").text(data['server_software']);
                $("#server_protocol").text(data['server_protocol']);
                $("#php_os").text(data['php_os']);
                $("#php_sapi_name").text(data['php_sapi_name']);
                $("#mysql_version").text(data['mysql_version']);
            }
        };
        $.ajax(option);
    }
    return {
        show: function show() {
            getServerInfo();
            $(".server").show();
        }
    };
}(window);
//# sourceMappingURL=AdminServer.js.map

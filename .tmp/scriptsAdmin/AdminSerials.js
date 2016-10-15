"use strict";

/**
 * Created by Administrator on 2016/10/4.
 */
var POSTERS_PATH = "uploads/posters/",
    IMAGES_PATH = "uploads/images/";

var AdminSerials = function (window) {
    "use strict";

    var container = ".serials",
        table = null,
        updating_id = 0;

    function init() {
        setOptions();
        bindEvents();
    }

    function show() {
        // 重新加载数据
        table.api().ajax.url("doSerialsAdmin.php?act=get&page=1&pageSize=999").load();
        $(container).show();
    }

    // 配置插件
    function setOptions() {
        table = $("#serials_list").dataTable({
            autoWidth: false,
            ordering: true,
            order: [[0, "desc"]],
            jQueryUI: true,
            pagingType: "full_numbers",
            ajax: {
                url: "doSerialsAdmin.php?act=get&page=1&pageSize=0",
                dataSrc: function dataSrc(json) {
                    var data = json.data,
                        i,
                        j,
                        len,
                        len2;

                    //console.log(json);
                    for (i = 0, len = data.length; i < len; i++) {
                        var posters = data[i]['posters'],
                            images = data[i]['images'],
                            pLink = "",
                            iLink = "";
                        for (j = 0, len2 = posters.length; j < len2; j++) {
                            pLink += "<a target='_blank' href='" + POSTERS_PATH + posters[j] + "'>" + (j + 1) + " </a>";
                        }

                        for (j = 0, len2 = images.length; j < len2; j++) {
                            iLink += "<a target='_blank' href='" + IMAGES_PATH + images[j] + "'>" + (j + 1) + " </a>";
                        }
                        pLink = pLink ? pLink : "无";
                        iLink = iLink ? iLink : "无";
                        data[i]['posters'] = pLink;
                        data[i]['images'] = iLink;

                        var synopsis = data[i]['synopsis'] ? data[i]['synopsis'] : "";
                        data[i]['synopsis'] = synopsis.length > 20 ? synopsis.substring(0, 10) + "..." : synopsis;
                        data[i]['operate'] = "<button data-id=" + data[i]['id'] + " class='update_btn'>修改</button>" + "<button data-id=" + data[i]['id'] + " class='delete_btn'>删除</button>";
                    }
                    return data;
                }
            },
            columns: [{ data: 'id', width: '0%' }, { data: 'c_name', width: '0%' }, { data: 'f_name', width: '0%' }, { data: 'director', width: '0%' }, { data: 'actors', width: '0%' }, { data: 'district', width: '0%' }, { data: 'types', width: '0%' }, { data: 'tags', width: '0%' }, { data: 'issuer', width: '0%' }, { data: 'release_date', width: '0%' }, { data: 'duration', width: '0%' }, { data: 'episode_number', width: '0%' }, { data: 'season_number', width: '0%' }, { data: 'reco_index', width: '0%' }, { data: 'type_index', width: '0%' }, { data: 'douban_index', width: '0%' }, { data: 'state', width: '0%' }, { data: 'synopsis', width: '0%' }, { data: 'posters', width: '0%' }, { data: 'images', width: '0%' }, { data: 'date', width: '0%' }, { data: 'operate', width: '0%' }],
            language: {
                lengthMenu: "每页显示_MENU_条",
                search: "查找",
                info: "共有(_MAX_)条,(_PAGES_)页",
                paginate: {
                    first: '首页',
                    previous: '上一页',
                    next: '下一页',
                    last: '末页'
                }
            }
        });

        $("#serials_list").magnificPopup({
            delegate: 'a',
            type: "image"
        });

        $("#types").tagsInput({
            width: "auto",
            height: "auto",
            "interactive": true,
            "defaultText": "添加类型",
            "delimiter": [",", ";", "/", " "],
            "maxChars": 10
        });
        $("#actors").tagsInput({
            width: "auto",
            height: "auto",
            "interactive": true,
            "defaultText": "添加演员",
            "delimiter": [",", ";", "/"],
            "maxChars": 30
        });
        $("#tags").tagsInput({
            width: "auto",
            height: "auto",
            "interactive": true,
            "defaultText": "添加标签",
            "delimiter": [",", ";", "/", " "],
            "maxChars": 10
        });

        $("#episode_number").spinner({
            min: 0,
            max: 100,
            page: 3
        });
        $("#season_number").spinner({
            min: 0,
            max: 100,
            page: 3
        });
        $(".index").spinner({
            min: 0,
            max: 10,
            page: 10,
            step: 0.1
        });
        $("#duration").spinner({
            min: 0,
            max: 511,
            page: 10,
            step: 1
        });

        $("#state").selectmenu();
        $("#district").selectmenu();

        $("#autoLogin").checkboxradio({
            label: "custom label"
        });
        $(".serials_update_accordion").accordion({
            active: false,
            collapsible: true,
            heightStyle: "content",
            allCollapsible: true
        });

        $("#posters").fineUploader({
            request: {
                paramsInBody: false,
                endpoint: "./doSerialsAdmin.php"
            },
            validation: {
                acceptFiles: ["jpeg", 'jpg', 'png', 'gif'],
                sizeLimit: 1048576 // 1024 * 1024 bytes
            },
            deleteFile: {
                enabled: true,
                params: { "act": "upload_posters" },
                forceConfirm: true,
                endpoint: "./doSerialsAdmin.php"
            }
        }).on("error", function (event, id, name, reason) {
            console.log("error:" + id + " name:" + " reason:" + reason);
        }).on("complete", function (event, id, name, responseJSON) {
            //$("main").html(dump(responseJSON));
            console.log("id: " + id + "\nname: " + name + "\nJSON: " + dump(responseJSON));
        }).on("deleteComplete", function (event, id, xhr, isError) {
            console.log("id: " + id + "\n xhr:" + dump(xhr) + "\n isError:" + isError);
        }).on("submit", function () {
            $("#posters").fineUploader("setParams", { "act": "upload_posters", "id": updating_id });
        });

        $("#images").fineUploader({
            request: {
                paramsInBody: false,
                params: { "act": "upload_images", "id": 0 },
                endpoint: "./doSerialsAdmin.php"
            },
            validation: {
                acceptFiles: ["jpeg", 'jpg', 'png', 'gif'],
                sizeLimit: 1048576 // 1024 * 1024 bytes
            },
            deleteFile: {
                enabled: true,
                params: { "act": "upload_images" },
                forceConfirm: true,
                endpoint: "./doSerialsAdmin.php"
            }
        }).on("error", function (event, id, name, reason) {
            alert("error:" + id + " name:" + " reason:" + reason);
        }).on("complete", function (event, id, name, responseJSON) {
            alert("id: " + id + "\nname: " + name + "\nJSON: " + dump(responseJSON));
        }).on("deleteComplete", function (event, id, xhr, isError) {
            alert("id: " + id + "\n xhr:" + dump(xhr) + "\n isError:" + isError);
        }).on("submit", function () {
            $("#images").fineUploader("setParams", { "act": "upload_images", "id": updating_id });
        });
    }

    // 绑定监听事件
    function bindEvents() {

        // 添加页面，添加按钮
        $("#insert_serials").on("submit", "form", function (event) {
            var option = {};
            event.preventDefault();

            option = {
                url: "doSerialsAdmin.php?act=insert",
                data: $(this).serialize(),
                method: "post",
                success: function success(response) {
                    var res = JSON.parse(response);
                    if (res['error']) {
                        alert(res['error']);
                    } else {
                        alert("添加成功");
                        updating_id = res['id'];
                        $("#submit_all_btn").attr("class", "update_it").text("提 交");

                        // 跳转到修改页面
                        $("#update_serials").click();
                        $("#update_serial_name").val($("#serial_name").val());
                        $("#update_serial_fname").val($("#serial_fname").val());
                    }
                }
            };

            $.ajax(option);
        });

        // 修改表格，底部提交按钮
        $("#submit_all_btn").on("click", function () {
            var data = $("#update_name").serialize() + "&" + $("#add_participant").serialize() + "&" + $("#add_classification").serialize() + "&" + $("#add_episode_time").serialize() + "&" + $("#add_index").serialize() + "&" + $("#add_synopsis").serialize(),
                updateOption = {},
                addOption = {};

            // 当有对应id时发送更新请求，无id时发送插入骑请求
            updateOption = {
                url: "doSerialsAdmin.php?act=update&id=" + updating_id,
                data: data,
                method: "post",
                success: function success(response) {
                    var res = JSON.parse(response);
                    if (res['error']) {
                        alert(res['error']);
                    } else {
                        alert("更新成功！");
                        resetForm();
                    }
                }
            };

            addOption = {
                url: "doSerialsAdmin.php?act=insert",
                data: data,
                method: "post",
                success: function success(response) {
                    var res = JSON.parse(response);
                    if (res['error']) {
                        alert(res['error']);
                    } else {
                        alert("添加成功！");
                        updating_id = res['id'];
                        $("#submit_all_btn").attr("class", "update_it").text("提 交");
                    }
                }
            };

            if ($(this).attr("class") == "update_it") {
                $.ajax(updateOption);
            }
            if ($(this).attr("class") == "add_new") {
                $.ajax(addOption);
            }
        });

        // 修改表格，底部删除按钮
        $("#delete_it_btn").on("click", function () {
            if (!(updating_id > 0)) {
                alert("未选中条目！");
                return;
            }
            if (!confirm("确认要删除这条数据？")) {
                return;
            }
            var option = {
                type: "post",
                url: "doSerialsAdmin.php?act=delete&id=" + updating_id,
                error: function error() {},
                success: function success(response) {
                    var res = JSON.parse(response);
                    if (!res['success']) {
                        alert(res["error"]);
                        return;
                    }
                    resetForm();
                    alert("删除成功");
                }
            };
            $.ajax(option);
        });

        // 修改表格，底部取消按钮
        $("#cancel_it_btn").on("click", function () {
            resetForm();
        });

        // 列表显示，修改按钮
        $("#serials_list").on("click", ".update_btn", function () {
            updating_id = $(this).attr("data-id");
            var option = {
                type: "get",
                url: "doSerialsAdmin.php?act=get&id=" + updating_id,
                error: function error() {
                    alert("获取数据失败");
                },
                success: function success(response) {
                    var res = JSON.parse(response),
                        data = res['data'][0];

                    console.log(response);
                    // 跳转到修改页面
                    $("#update_serial_name").val(data['c_name']);
                    $("#update_serial_fname").val(data['f_name']);
                    $("#director").val(data['director']);
                    $("#actors").importTags(data['actors']);
                    $("#issuer").val(data['issuer']);
                    $("#types").importTags(data['types']);

                    $("#district option").filter("[selected=selected]").removeAttr("selected");
                    $("#district option").filter("[value=" + data['district'] + "]").attr("selected", true);
                    $("#district").selectmenu("refresh");

                    $("#state option").filter("[selected=selected]").removeAttr("selected");
                    $("#state option").filter("[value=" + data['state'] + "]").attr("selected", true);
                    $("#state").selectmenu("refresh");

                    $("#tags").importTags(data['tags']);
                    $("#release_date").val(data['release_date']);
                    $("#duration").val(data['duration']);

                    $("#episode_number").val(data['episode_number']);
                    $("#season_number").val(data['season_number']);
                    $("#update_reco_index").val(data['reco_index']);
                    $("#update_type_index").val(data['type_index']);
                    $("#update_douban_index").val(data['douban_index']);
                    $("#update_synopsis").val(data['synopsis']);

                    $("#submit_all_btn").attr("class", "update_it").text("提 交");
                    $("#update_serials").click();
                }
            };
            $.ajax(option);
        });

        // 列表显示，删除按钮
        $("#serials_list").on("click", ".delete_btn", function () {
            var _this = this;
            if (confirm("确定要删除这条数据？")) {
                var option = {
                    type: "post",
                    url: "doSerialsAdmin.php?act=delete&id=" + $(this).attr("data-id"),
                    error: function error() {},
                    success: function success(response) {
                        var res = JSON.parse(response);
                        if (!res['success']) {
                            alert(res["error"]);
                            return;
                        }

                        table.api().ajax.url("doSerialsAdmin.php?act=get&page=1&pageSize=999").load();
                        alert("删除成功");
                    }
                };
                $.ajax(option);
            }
        });

        // 修改页面，各部分提交按钮
        $(".serials_update_accordion").on("submit", "form", function (event) {
            event.preventDefault();
            if (!(updating_id > 0)) {
                alert("请先添加数据");
                return;
            }

            var update = $(this).attr("id"),
                data = $(this).serialize();

            var option = {
                url: "doSerialsAdmin.php?id=" + updating_id + "&act=update",
                data: data,
                method: "post",
                success: function success(response) {
                    var res = JSON.parse(response);
                    if (res['success']) {
                        alert("添加成功");
                    } else {
                        console.log(response);
                        alert(res['error']);
                    }
                }
            };
            $.ajax(option);
        });
    }

    // 重设修改表格
    function resetForm() {
        // todo:reset fine uploader
        $("#submit_all_btn").attr("class", "add_new").text("添 加");
        updating_id = 0;
        $("#update_name")[0].reset();
        $("#add_participant")[0].reset();
        $("#add_classification")[0].reset();
        $("#add_episode_time")[0].reset();
        $("#add_index")[0].reset();
        $("#add_synopsis")[0].reset();
        $("#posters").fineUploader("reset");
        $("#images").fineUploader("reset");
    }

    return {
        init: init,
        show: show,
        hide: function hide() {
            $(container).hide();
        }
    };
}(window);
//# sourceMappingURL=AdminSerials.js.map

/**
 * Created by Administrator on 2016/10/4.
 */


var AdminAdd = (function(window){
    var container = "#insert_items";

    var init = function() {

        $("#insert_music").on("submit", function(event){
            event.preventDefault();
            var _this = this;
            $.ajax({
                type:"post",
                url:"doMusicsAdmin.php?act=add",
                data:$(this).serialize(),
                error:function(){
                    alert("添加失败！");
                },
                success:function(response){
                    var res = JSON.parse(response);
                    if(res && res.success) {
                        alert("添加音乐成功！");
                        _this.reset();
                    } else {
                        alert( res['error'] );
                    }
                    console.log(response);
                }
            })
        })
    }

    return {
        init:init,
        show: function(){
            $(container).show();
        },
        hide: function(){
            $(container).hide();
        }
    }
})(window)
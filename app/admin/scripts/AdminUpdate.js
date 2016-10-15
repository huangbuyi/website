/**
 * Created by Administrator on 2016/10/4.
 */

var AdminUpdate = (function(window){
    var container = "#serials_update";

    return {
        show: function(){
            $(container).show();
        },
        hide: function(){
            $(container).hide();
        }
    }
})(window)
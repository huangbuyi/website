/**
 * Created by Administrator on 2016/10/4.
 */

var AdminUpdate = (function(window){
    var container = "#serials_update";


    var show = function(){
        $(container).show();
    };

    var hide = function(){
        $(container).hide();
    };

    return {
        show: show,
        hide: hide
    };
})(window)
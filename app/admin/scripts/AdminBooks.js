/**
 * Created by Administrator on 2016/10/4.
 */

var AdminBooks = (function(window){
    var container = ".books";

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

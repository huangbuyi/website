/**
 * Created by Administrator on 2016/10/4.
 */

var AdminMusics = (function(window){
    var container = ".musics";

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
/**
 * Created by Administrator on 2016/10/4.
 */
var AdminMovies = (function(window){
    var container = ".movies";

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
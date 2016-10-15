/**
 * Created by Administrator on 2016/10/4.
 */

var AdminAnimations = (function(window){
    var container = ".animations";

    var show = function(){
        $(container).show();
    }
    var hide = function(){
        $(container).hide();
    }

    return {
        show: show,
        hide: hide
    }
})(window)
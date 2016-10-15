/**
 * Created by Administrator on 2016/10/4.
 */

var AdminBooks = (function(window){
    var container = ".books";

    return {
        show: function(){
            $(container).show();
        },
        hide: function(){
            $(container).hide();
        }
    }
})(window)

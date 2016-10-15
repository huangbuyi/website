/**
 * Created by Administrator on 2016/10/4.
 */
var AdminMovies = (function(window){
    var container = ".movies";

    return {
        show: function(){
            $(container).show();
        },
        hide: function(){
            $(container).hide();
        }
    }
})(window)
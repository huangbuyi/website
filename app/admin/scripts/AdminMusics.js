/**
 * Created by Administrator on 2016/10/4.
 */

var AdminMusics = (function(window){
    var container = ".musics";

    return {
        show: function(){
            $(container).show();
        },
        hide: function(){
            $(container).hide();
        }
    }
})(window)
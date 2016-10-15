"use strict";

/**
 * Created by Administrator on 2016/10/4.
 */
var AdminMovies = function (window) {
    var container = ".movies";

    return {
        show: function show() {
            $(container).show();
        },
        hide: function hide() {
            $(container).hide();
        }
    };
}(window);
//# sourceMappingURL=AdminMovies.js.map

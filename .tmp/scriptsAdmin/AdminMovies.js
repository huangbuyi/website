"use strict";

/**
 * Created by Administrator on 2016/10/4.
 */
var AdminMovies = function (window) {
    var container = ".movies";

    var show = function show() {
        $(container).show();
    };

    var hide = function hide() {
        $(container).hide();
    };

    return {
        show: show,
        hide: hide
    };
}(window);
//# sourceMappingURL=AdminMovies.js.map

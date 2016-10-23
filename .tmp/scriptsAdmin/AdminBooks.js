"use strict";

/**
 * Created by Administrator on 2016/10/4.
 */

var AdminBooks = function (window) {
    var container = ".books";

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
//# sourceMappingURL=AdminBooks.js.map

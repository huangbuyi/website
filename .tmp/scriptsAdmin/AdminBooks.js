"use strict";

/**
 * Created by Administrator on 2016/10/4.
 */

var AdminBooks = function (window) {
    var container = ".books";

    return {
        show: function show() {
            $(container).show();
        },
        hide: function hide() {
            $(container).hide();
        }
    };
}(window);
//# sourceMappingURL=AdminBooks.js.map

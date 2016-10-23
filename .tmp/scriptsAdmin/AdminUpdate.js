"use strict";

/**
 * Created by Administrator on 2016/10/4.
 */

var AdminUpdate = function (window) {
    var container = "#serials_update";

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
//# sourceMappingURL=AdminUpdate.js.map

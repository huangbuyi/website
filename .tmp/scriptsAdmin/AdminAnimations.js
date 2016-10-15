"use strict";

/**
 * Created by Administrator on 2016/10/4.
 */

var AdminAnimations = function (window) {
    var container = ".animations";

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
//# sourceMappingURL=AdminAnimations.js.map

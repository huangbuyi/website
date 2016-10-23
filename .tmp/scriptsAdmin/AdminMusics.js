"use strict";

/**
 * Created by Administrator on 2016/10/4.
 */

var AdminMusics = function (window) {
    var container = ".musics";

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
//# sourceMappingURL=AdminMusics.js.map

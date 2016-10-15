'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by Administrator on 2016/10/14.
 */

var Projects = function (window) {
    var show, init, containerSelector, gridSelector;
    init = function init(o) {
        if ((typeof o === 'undefined' ? 'undefined' : _typeof(o)) !== 'object') {
            throw new ReferenceError('Init Project failed, param isn\'t a object');
            return;
        };

        if (typeof o.container === 'string' && $(o.container).length === 1) {
            containerSelector = o.container;
        } else {
            throw new ReferenceError('Init Project failed, container selector doesn\'t existed or more than one');
            return;
        };

        if (Comman.testSelector(o.grid)) {
            gridSelector = o.grid;
        } else {
            throw new ReferenceError('Init Project failed, grid selector isn\'t existed or more than one');
            return;
        };
    };

    show = function show() {
        $(containerSelector).show();
        $(gridSelector).masonry('layout');
    };
    hide = function hide() {
        $(containerSelector).hide();
    };

    return {
        init: init,
        show: show,
        hide: hide
    };
}(window);
//# sourceMappingURL=projects.js.map

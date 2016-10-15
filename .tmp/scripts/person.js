'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by Administrator on 2016/10/4.
 */

var Person = function (window) {
    var containerSelector = '';

    function init(options) {
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
            throw new ReferenceError('Init Person failed, param isn\'t a object');
        }

        if (typeof options.container === 'string' && $(options.container).length === 1) {
            containerSelector = options.container;
        } else {
            throw new ReferenceError('Init Person failed, container\'s selector doesn\'t existed or more than one');
        }
    }

    function show() {
        $(containerSelector).show();
    }

    function hide() {
        $(containerSelector).hide();
    }
    return {
        init: init,
        show: show,
        hide: hide
    };
}(window);
//# sourceMappingURL=person.js.map

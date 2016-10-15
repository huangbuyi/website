'use strict';

/**
 * Created by Administrator on 2016/10/6.
 */

var Comman = function (window) {

    var isScrollOver = function isScrollOver(selector, bottom) {
        var bottom = bottom || 10;
        scrollTop = $('main').scrollTop(), scrollHeight = $(selector).height() + $('.header').height(), windowHeight = innerHeight, scrollWhole = Math.max(scrollHeight - scrollTop - windowHeight);

        return scrollWhole < bottom || $('main').width() > 2 * $(selector).width();
    };

    var testSelector = function testSelector(selector) {
        return selector && $(selector).length >= 1 ? $(selector).length : false;
    };

    return {
        isScrollOver: isScrollOver,
        testSelector: testSelector
    };
}(window);
//# sourceMappingURL=comman.js.map

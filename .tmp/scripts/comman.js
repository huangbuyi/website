'use strict';

/**
 * Created by Administrator on 2016/10/6.
 */

var Comman = function (window) {

    var isScrollOver = function isScrollOver(grid, bottom) {
        var bottom = bottom || 10;
        scrollTop = $('main').scrollTop(), scrollHeight = $(grid).height() + $('.header').height(), windowHeight = innerHeight, scrollWhole = Math.max(scrollHeight - scrollTop - windowHeight);

        return scrollWhole < bottom;
    };

    var isFilled = function isFilled(grid, item, scale) {
        var scale = scale || 1.5;
        return $('main').width() - $(grid).width() > scale * $(item).width();
    };

    var isLoadData = function isLoadData(grid, item) {
        return isScrollOver(grid) || isFilled(grid, item);
    };

    var testSelector = function testSelector(selector) {
        return selector && $(selector).length >= 1 ? $(selector).length : false;
    };

    return {
        isScrollOver: isScrollOver,
        testSelector: testSelector,
        isFilled: isFilled,
        isLoadData: isLoadData
    };
}(window);
//# sourceMappingURL=comman.js.map

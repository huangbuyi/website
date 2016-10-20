/**
 * Created by Administrator on 2016/10/6.
 */

var Comman = (function(window){

    var isScrollOver = function(grid, bottom){
        var bottom = bottom || 10;
            scrollTop = $('main').scrollTop(),
            scrollHeight = $(grid).height() + $('.header').height(),
            windowHeight = innerHeight,
            scrollWhole = Math.max(scrollHeight - scrollTop - windowHeight);

        return scrollWhole < bottom;
    }

    var isFilled = function(grid, item, scale){
        var scale = scale || 1.5;
        return $('main').width() - $(grid).width() > scale * $(item).width();
    }

    var isLoadData = function(grid, item){
        return isScrollOver(grid) || isFilled(grid, item);
    }


    var testSelector = function(selector) {
        return (selector && $(selector).length >= 1) ? $(selector).length : false;
    }

    return {
        isScrollOver: isScrollOver,
        testSelector: testSelector,
        isFilled: isFilled,
        isLoadData: isLoadData
    }
})(window)


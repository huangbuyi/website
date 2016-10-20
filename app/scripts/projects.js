/**
 * Created by Administrator on 2016/10/14.
 */

var Projects = (function(window){
    var show,hide,init,setOptions,containerSelector,gridSelector;

    init = function(o){
        if(typeof o !== 'object'){
            throw new ReferenceError('Init Project failed, param isn\'t a object');
            return;
        };

        if( typeof o.container === 'string' && $(o.container).length === 1 ){
            containerSelector = o.container;
        } else {
            throw new ReferenceError('Init Project failed, container selector doesn\'t existed or more than one')
            return;
        };

        if( Comman.testSelector(o.grid) ){
            gridSelector = o.grid;
        } else {
            throw new ReferenceError('Init Project failed, grid selector isn\'t existed or more than one');
            return;
        };

        /* 瀑布流插件masory配置 */
        $('.grid').masonry({
            itemSelector: '.grid-item',     // 子元素
            gutter: 10,
            fitWidth: true                    // 宽度自适应
        });
    };




    show = function show(){
        $(containerSelector).show();
        $(gridSelector).masonry('layout');
    };
    hide = function hide(){
        $(containerSelector).hide();
    }

    return {
        init:init,
        show:show,
        hide:hide
    }
})(window)
/**
 * Created by Administrator on 2016/10/4.
 */

var Person = (function(window){
    var containerSelector = '';

    function init(options){
        if(typeof options !== 'object'){
            throw new ReferenceError('Init Person failed, param isn\'t a object');
        }

        if( typeof options.container === 'string' && $(options.container).length === 1 ){
            containerSelector = options.container;
        } else {
            throw new ReferenceError('Init Person failed, container\'s selector doesn\'t existed or more than one')
        }
    }

    function show() {
        $(containerSelector).show();
    }

    function hide(){
        $(containerSelector).hide();
    }
    return {
        init:init,
        show:show,
        hide:hide
    }
}(window))
/**
 * Created by Administrator on 2016/9/21.
 */

$('nav#menu').mmenu({
    extensions	: [ 'effect-slide-menu',  'shadow-panels' ],
    counters	: true,
    navbar: {
        title: 'Advanced menu'
    },
    navbars: [
        {
            position: 'top',
            content: [ 'searchfield' ]
        }, {
            position: 'top',
            content: [
                'prev',
                'title',
                'close'
            ]
        }, {
            position: 'bottom',
            content: [
                '<a href="../index.html" target="_blank">返回前台</a>'
            ]
        }
    ],
    onClick: {
        close: true,
        setSelected: true
    }
});

$('nav#menu').data( 'mmenu' ).update();





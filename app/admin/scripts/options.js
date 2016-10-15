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





// todo:复用
var fineUploaderOptions = {
    request: {
        paramsInBody: false,
        params:{ "act":"upload"},
        endpoint: "./doSerialsAdmin.php"
    },
    validation: {
        acceptFiles:["jpeg", 'jpg', 'png', 'gif'],
        sizeLimit: 1048576  // 1024 * 1024 bytes
    },
    deleteFile: {
        enabled:true,
        params:{ "act":"upload"},
        forceConfirm: true,
        endpoint: "./doSerialsAdmin.php"
    }
}




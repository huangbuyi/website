
<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/10/3
 * Time: 6:58
 */

require('include.php');

echo json_encode( musicsAdmin() );

function musicsAdmin(){
    $act = $_REQUEST['act'];

    if(!$act){
        return array('error'=>'Request error:without act!');
    }

    if($act == 'get'){
        $page = $_REQUEST['page'] ? $_REQUEST['page'] : 1;
        $pageSize = $_REQUEST['pageSize'] ? $_REQUEST['pageSize'] : 10;
        $res = getMusics($page, $pageSize);
        if(!$res){
            return array('error'=>'Get musics error!');
        }

        return array('success'=>true, 'musics'=>$res['musics'], 'total'=>$res['total']);

    }

    if($act == 'add'){
        $id = $_POST['music_id'];
        $type = $_POST['music_type'];
        $comment = $_POST['music_comment'];

        if(strlen($id) > 10){
            return array('error'=>'提交错误：id应小于10位数字！');;
        }

        if(!in_array($type, array(2,3))){
            return array('error'=>'提交错误：类型只能是2或3！');;
        }

        if(mb_strlen($comment) > 200){
            return array('error'=>'提交错误：评论长度要在200字以内！');;
        };
        $res = addMusic($id, $type, $comment);
        if(!$res){
            return array('error'=>'后台错误：插入失败！');;
        }
        return array('success'=>true);
    }
}


function addMusic($id, $type, $comment){
    $con = connectDB();
    $arr = array('m_id'=>$id, 'type'=>$type,'comment'=>$comment,'date'=>date("Y-m-d"));
    $res = insert($con, 'musics',$arr);
    return $res;
}

function getMusics($page = 1, $pageSize = 10){
    $con = connectDB();

    $totalRows = getTotalRows($con, "musics");

    $totalPage = ceil($totalRows / $pageSize);
    $page = $page?$page:1;
    $page = ($page >= $totalPage)? $totalPage: $page;
    $offset = ($page - 1) * $pageSize;

    $sql = "select * from musics order by id desc limit " .$offset.','.$pageSize;
    $res = mysqli_query($con, $sql);

    if(!res){
        return false;
    }

    return array('total'=>$totalRows,'musics'=>fetch_all($res,1));
}

function getTotalRows($con, $table){
    $totalSql = "select count(*) from {$table}";
    $totalRes = mysqli_query($con, $totalSql);
    $totalRow = mysqli_fetch_row($totalRes);
    return $totalRow[0];
}
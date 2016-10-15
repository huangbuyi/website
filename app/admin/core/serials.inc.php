<?php
require_once('include.php');
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/2
 * Time: 22:46
 */

define('SMALL_IMAGE_PATH', './images/small_img/');
define("BIG_IMAGE_PATH", './images/big_img/');


/**
 * 把项目的id，和它的图片保存的路径插入数据库
 * @param $s_id
 * @param $path
 * @param int $type 图片类型
 * @return bool|int|string
 */
function insertImagesTbl($s_id, $path, $type = 0){
    $con = connectDB();
    $arr = array('s_id'=>$s_id, 'path'=>$path, 'type'=>$type);
    $id =  insert($con, 'serials_images', $arr);
    if( $id !== false ){
        return true;
    } else {
        return false;
    };
}

/**
 * 得到条目总数
 */
function getSerialsTotal($a){
    $con = connectDB();

    $sql = 'select s.id, s.c_name,s.f_name,d.name AS director,t.name AS district, i.name AS issuer, '.
        'release_date, duration, episode_number, season_number, reco_index, type_index, douban_index, state, '.
        'synopsis '.
        'from serials_info AS s '.
        'LEFT JOIN directors_name AS d ON s.director_id = d.id '.
        'LEFT JOIN districts_name AS t ON s.district_id = t.id '.
        'LEFT JOIN issuers_name AS i ON s.issuer_id = i.id ';

    $res = mysqli_query($con, $sql);
    $totalRows = mysqli_num_rows($res);
    return $totalRows;
}

/**
 * getSerialsInfo(id)按id获取serials_info表数据， getSerialsInfo(page, pageSize)按page获取serials_info表数据
 * @param int id or page;
 * @param int page size
 * @return
 */
function getSerialsInfo(){

    $con = connectDB();

    if(func_num_args() === 1){
        $whereSql = " where s.id = ".func_get_arg(0);
    } else {
        $page = func_get_arg(0);
        $pageSize = func_get_arg(1);
        $totalRows = getSerialsTotal();
        $totalPage = ceil($totalRows / $pageSize);
        $page = $page?$page:1;
        $page = ($page >= $totalPage)? $totalPage: $page;
        $offset = ($page - 1) * $pageSize;
        $whereSql = " order by id desc LIMIT ".$offset.','.$pageSize;
    }



    $sql = 'select s.id, s.c_name,s.f_name,d.name AS director,t.name AS district, i.name AS issuer, '.
        'release_date, duration, episode_number, season_number, reco_index, type_index, douban_index, state, '.
        'synopsis, date '.
        'from serials_info AS s '.
        'LEFT JOIN directors_name AS d ON s.director_id = d.id '.
        'LEFT JOIN districts_name AS t ON s.district_id = t.id '.
        'LEFT JOIN issuers_name AS i ON s.issuer_id = i.id '.$whereSql;



//    $sql = 'select s.id, s.c_name,s.f_name,d.name AS director,t.name AS district, i.name AS issuer, '.
//        'release_date, duration, episode_number, season_number, reco_index, type_index, douban_index, state, '.
//        'synopsis '.
//        'from serials_info AS s '.
//        'LEFT JOIN directors_name AS d ON s.director_id = d.id '.
//        'LEFT JOIN districts_name AS t ON s.district_id = t.id '.
//        'LEFT JOIN issuers_name AS i ON s.issuer_id = i.id order by id desc '.
//        'LIMIT '.$offset.','.$pageSize;

    //echo $sql;
    $res = mysqli_query($con, $sql);
    if($res){
        return fetch_all($res, 1);
    } else {
        return false;
    }
}

/**
 * 获取电视剧数据
 * @param int $page/$id
 * @param int $pageSize
 * @return array|bool|null|nullarray
 */
function getSerials($page = 1, $pageSize = 8){
    if(func_num_args() === 1){
        $id = func_get_arg(0);
        $serials = getSerialsInfo($id);
    } else {
        $page = func_get_arg(0)? func_get_arg(0): 1;
        $pageSize = func_get_arg(1)? func_get_arg(1): 10;
        $serials = getSerialsInfo($page, $pageSize);
    }


    for($i = 0; $i < sizeof($serials); $i++){
        $tmp_id = $serials[$i]['id'];
        $serials[$i]['actors'] = getManyToMany('actors_name', 'serials_actors', $tmp_id);
        $serials[$i]['types'] = getManyToMany('types_name', 'serials_types', $tmp_id);
        $serials[$i]['tags'] = getManyToMany('tags_name', 'serials_tags', $tmp_id);

        // 剔除无效路径
        $posPaths = getImages($tmp_id, 1);
        for($j = 0, $len = sizeof($posPaths); $j < $len; $j++){
            if(!file_exists("uploads/posters/".$posPaths[$j])){
                array_splice($posPaths,$j,1);
            }
        }
        $serials[$i]['posters'] = $posPaths;

        // 剔除无效路径
        $imgPaths = getImages($tmp_id, 0);
        for($j = 0, $len = sizeof($imgPaths); $j < $len; $j++){
            if(!file_exists("uploads/images/".$imgPaths[$j])){
                unset($imgPaths[$j]);
            }
        }
        $serials[$i]['images'] = $imgPaths;

    }
    return $serials;
}
//print_r(json_encode(getSerials()));

/**
 * 从数据库获取图片路径
 * @param $id
 * @param int $type 0代表一般剧照，1代表海报图片
 * @return array 返回路径数组
 */
function getImages($id, $type = 0){
    $con = connectDB();
    $sql = "select path from serials_images where s_id = {$id} AND type = $type";
    $res = mysqli_query($con, $sql);
    $resArr = fetch_all($res);
    $arr = array();
    for($i = 0; $i < sizeof($resArr); $i++){
        array_push($arr, $resArr[$i][0]);
    }
    return $arr;
}

/**
 * 读取上传数据，插入或更新电视剧
 * @param $uid 未传入id插入数据，传入id刷新数据
 * @return bool|int|string 返回id
 */
function refurbishSerial($uid){
    $con = connectDB();



    // 得到该数据在其它表对应的id
    $directorId = isset($_POST['director']) ? getIdByName($con, 'directors_name', $_POST['director']) : null;
    $issuerId = isset($_POST['issuer']) ? getIdByName($con, 'issuers_name', $_POST['issuer']) : null;
    $districtId = isset($_POST['district']) ? getIdByName($con, 'districts_name', $_POST['district']) : null;

    $serialInfo = array(
        'c_name'=>$_POST['c_name'] ? $_POST['c_name'] : null,
        'f_name'=>$_POST['f_name'] ? $_POST['f_name'] : null,
        'director_id'=>$directorId,
        'issuer_id'=>$issuerId,
        'district_id'=>$districtId,
        'release_date'=>$_POST['release_date'] ? $_POST['release_date'] : null,
        'duration'=>$_POST['duration'] ? $_POST['duration'] : null,
        'episode_number'=>$_POST['episode_number'] ? $_POST['episode_number'] : null,
        'season_number'=>$_POST['season_number'] ? $_POST['season_number'] : null,
        'reco_index'=>$_POST['reco_index'] ? $_POST['reco_index'] : null,
        'type_index'=>$_POST['type_index'] ? $_POST['type_index'] : null,
        'douban_index'=>$_POST['douban_index'] ? $_POST['douban_index'] : null,
        'state'=>$_POST['state'] ? $_POST['state'] : null,
        'synopsis'=>$_POST['synopsis'] ? $_POST['synopsis'] : null
    );


    $valid = array();
    foreach($serialInfo as $key => $value) {
        if( $value ){
            $valid[$key] = $value;
        }
    };
    if(empty($valid)){
        return -1;
    }


    if(empty($uid)){
        $valid['date'] = date("Y-m-d");
        $id = insert($con, 'serials_info', $valid );
    } else {
        $id = update($con, 'serials_info', $valid, "id = {$uid}");

    }


    // 更新多对多表格
    if($_POST['actors']){
        insertManyToMany($_POST['actors'], 'actors_name', 'serials_actors', $uid ? $uid : $id );
    }
    if($_POST['types']){
        insertManyToMany($_POST['actors'], 'types_name', 'serials_types', $uid ? $uid : $id );
    }
    if($_POST['tags']){
        insertManyToMany($_POST['tags'], 'tags_name', 'serials_tags', $uid ? $uid : $id );
    }

    return $id;
};
//$con = connectDB();
//echo update($con,'serials_info',["synopsis"=>"我66666"],'id=138');

/**
 * 插入数据，如果传入id值，则更新数据
 * @param $s
 * @param $uid
 * @return bool|int|string
 */
function refurbishMovie($s, $uid){
    $con = connectDB();

    // 得到该数据在其它表对应的id
    $directorId = getIdByName($con, 'directors_name', $s['director']);
    $issuerId = getIdByName($con, 'issuers_name', $s['issuer']);
    $districtId = getIdByName($con, 'districts_name', $s['district']);

    $serialInfo = array(
        'c_name'=>$s['c_name'],
        'f_name'=>$s['f_name'],
        'director_id'=>$directorId,
        'issuer_id'=>$issuerId,
        'district_id'=>$districtId,
        'release_date'=>$s['date'],
        'duration'=>$s['duration'],
        'reco_index'=>$s['reco_index'],
        'type_index'=>$s['type_index'],
        'douban_index'=>$s['douban_index'],
        'state'=>$s['state'],
        'synopsis'=>$s['synopsis'],
    );


    // 更新多对多表格



    if(empty($uid)){
        $id = insert($con, 'movies_info', $serialInfo );
    } else {
        $id = update($con, 'movies_info', $serialInfo, "id = {$uid}");
    }

    return $id;
};



/**
 * 获取上传的连续剧数据，对上传数据进行验证
 * @return array
 */
function getSerialsPostData(){
    $serials=Array();
    $serials['c_name'] = $_POST['c_name'];
    $serials['f_name'] = $_POST['f_name'];
    $serials['director'] = $_POST['director'];
    $serials['actors'] = $_POST['actors'];
    $serials['issuer'] = $_POST['issuer'];
    $serials['type'] = $_POST['type'];
    $serials['district'] = $_POST['district'];
    $serials['date'] = ($_POST['date'])?$_POST['date']:'2022-2-2';
    $serials['duration'] = $_POST['duration'];
    $serials['episode_number'] = $_POST['episode_number'];
    $serials['season_number'] = $_POST['season_number'];
    $serials['reco_index'] = $_POST['reco_index'];
    $serials['type_index'] = $_POST['type_index'];
    $serials['douban_index'] = $_POST['douban_index'];
    $serials['state'] = $_POST['state'];
    $serials['synopsis'] = $_POST['synopsis'];
    $serials['tags'] = $_POST['tags'];

    if($serials['c_name']){
        return $serials;
    } else {
        return false;
    }

}

function deleteSerials($id){
    $con = connectDB();
    delete($con, 'serials_types', 's_id='.$id);
    delete($con, 'serials_tags', 's_id='.$id);
    delete($con, 'serials_actors', 's_id='.$id);
    delete($con, 'serials_images', 's_id='.$id);
    return delete($con, 'serials_info', 'id='.$id);
}

/**
 * 将数据插入多对多表格
 * @param $str 要插入的数据字符串
 * @param $nameTable
 * @param $idTable
 * @param $sId 作品的id
 * @param string $pattern 分割数据的正则
 * @return bool|int
 */

function insertManyToMany($str, $nameTable, $idTable, $sId, $pattern = "/[,.\s]+/"){
    $con = connectDB();

    if(!str){
        return false;
    }
    $sql = "INSERT {$idTable} VALUES ";

    $types = splitString($pattern, $str);
    for($i = 0; $i < sizeof($types); $i++){
        $type = $types[$i];
        $t_id = getIdByName($con, $nameTable, $type);

        if($i == 0){
            $sql .= "({$sId},{$t_id})";
            continue;
        }
        $sql .= ",({$sId},{$t_id})";
    }

    // 删除已有的数据，填入新数据
    delete($con, $idTable, "s_id={$sId}");
    $res = mysqli_query($con, $sql);
    if($res){
        return mysqli_affected_rows($con);
    }else{
        return false;
    }
}

/**
 * 从多对多表格读取数据
 * @param $con
 * @param $nameTable
 * @param $idTable
 * @param $sId
 * @return array
 */
function getManyToMany($nameTable, $idTable, $sId){
    $con = connectDB();

    $idSql = "SELECT id From {$idTable} Where s_id = {$sId}";
    $idRes = mysqli_query($con, $idSql);
    $id_num_rows = mysqli_num_rows($idRes);

    if($id_num_rows < 1){
        return "";
    }
    $nameSql = "SELECT name FROM ".$nameTable." WHERE ";
    for($i = 0; $i < $id_num_rows; $i++){
        $row = mysqli_fetch_row($idRes);
        $id = $row[0];
        if($i == 0){
            $nameSql .= " id = {$id} ";
        }
        $nameSql .= " OR id = {$id} ";
    }
    $nameRes = mysqli_query($con, $nameSql);

    $names = array();
    $name_num_rows = mysqli_num_rows($nameRes);
    for($i = 0; $i < $name_num_rows; $i++) {
        $row = mysqli_fetch_row($nameRes);
        $names[$i] = $row[0];
    }

    return join(",", $names);
}


<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/27
 * Time: 16:57
 */
/* 部署前修改 */
define("DB_HOST", "localhost");
define("DB_USER", "root");
define("DB_PWD", "huang123");
define("DB_CHARSET", "utf8");

function fetch_all($res, $flag = 0){
    $arr = array();
    $nums = mysqli_num_rows($res);
    if($flag == 1){
        for($i = 0; $i < $nums; $i++){
            $row = mysqli_fetch_assoc($res);
            array_push($arr, $row);
        }
    } else {
        for($i = 0; $i < $nums; $i++){
            $row = mysqli_fetch_row($res);
            array_push($arr, $row);
        }
    }

    return $arr;
}

function connectDB($dbname = 'serials'){
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, $dbname) or die("数据库连接失败Error:".mysqli_errno().":".mysqli_error());
    mysqli_set_charset($con, DB_CHARSET);
    return $con;
}

function insert($con, $table, $array){
    $keys=join(',',array_keys($array));
    $values="'".join("','", array_values($array))."'";
    $sql="INSERT {$table}({$keys}) VALUES ({$values})";
    $res=mysqli_query($con,$sql);
    if($res){
        return mysqli_insert_id($con);
    }else{
        return false;
    }
}

function update($con, $table, $array, $where=null){
    $str =null;
    foreach($array as $key=>$val){
        if($str==null){
            $sep="";
        }else{
            $sep=",";
        }
        $str.=$sep.$key."='".$val."'";
    }
    $sql="update {$table} set {$str} ".($where==null?null:" where ".$where);
    //return $sql;
    $res=mysqli_query($con, $sql);
    //var_dump($result);
    //var_dump(mysql_affected_rows());exit;

    if($res){
        return mysqli_affected_rows($con);
    }else{
        return false;
    }
}
function getVersion($con){
    $sql = "select VERSION()";
    $res = mysqli_query($con,$sql);
    $row = mysqli_fetch_row($res);
    return $row[0];
}

function delete($con, $table, $where=null){
    $where= ($where==null)?null:" where ".$where;
    $sql="delete from {$table} {$where}";
    mysqli_query($con, $sql);
    return mysqli_affected_rows($con);
}

function getIdByName($con, $table, $name){
    $sql = "select id from ".$table." where name = '".$name."'";
    //echo $sql;
    $res = mysqli_query($con, $sql);
    if(mysqli_connect_errno($con)){
        return false;
    }
    $row = mysqli_fetch_assoc($res);
    if(!$row['id']){
        $sql = "insert ".$table." set name='".$name."'";
        mysqli_query($con, $sql);
        return mysqli_insert_id($con);
    }
    mysqli_free_result($res);
    return $row['id'];
}
//function select_by_name($con,$table,$array){
//    $sql = "SELECT * FROM {$table} WHERE ";
//    $i=0;
//    $condition = [];
//    foreach($array as $k=>$v){
//        $condition[$i++].= "{$k}={$v}";
//    }
//    $where = join(' AND ',array_value($condition));
//    $sql .= $where;
//
//    $res = mysqli_query($con,$sql);
//    return $sql;
//}


//function select_primary($con,$table){
//    $primaryQuery = "select COLUMN_KEY,COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where table_name='tdb_goods' AND COLUMN_KEY='PRI'";
//    $primary = mysqli_query($con,$primaryQuery);
//    return $primary;
//}
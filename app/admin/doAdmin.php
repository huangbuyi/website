<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/7
 * Time: 2:56
 */
require('include.php');



function doAdmin(){
    $act = $_REQUEST['act'];
    if($act == 'getServer'){
        return array('success'=>true,'data'=>getServerDetail());
    }
}



echo json_encode(doAdmin());

function getServerDetail(){
    $con = connectDB();

    return array(
        'server_software'=>$_SERVER['SERVER_SOFTWARE'],
        'server_protocol'=>$_SERVER['SERVER_PROTOCOL'],
        'php_os'=>PHP_OS,
        'php_sapi_name'=>php_sapi_name(),
        'mysql_version'=>getVersion($con)
    );
}
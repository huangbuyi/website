<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/26
 * Time: 15:09
 */
function hasLogined(){
    if($_SESSION['adminName'] == "" && $_COOKIE['adminName'] == ""){
        return false;
    }
    return $_SESSION['adminName']? $_SESSION['adminName']: $_COOKIE['adminName'];
}

function logout(){
    $_SESSION = array();
    if(isset($_COOKIE[session_name()])){
        setcookie(session_name(), "", time() - 1);
    }
    if(isset($_COOKIE['adminName'])){
        setcookie('adminName', '', time() - 1);
    }
    session_destroy();
}

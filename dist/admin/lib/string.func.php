<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/3
 * Time: 3:40
 */

/**
 * 生成带有返回信息和返回数据两个字段的对象的json字符串
 * @param $msg
 * @param $data
 * @return string
 */
function formatData($msg, $data=null){
    return json_encode( array('message'=>$msg, 'data'=>$data));
}

/**
 * 从空字符、逗号、点、句号分割字符串
 * @param $str
 * @return array
 */
function splitString($pattern, $str){
    $str = str_replace(array('，','。'), array(',','.'),$str);
    return preg_split($pattern, $str);
}

/**
 * 生成唯一字符串
 * @return string
 */
function getUniName(){
    return md5(uniqid(microtime(true),true));
}

/**
 * 得到文件的扩展名
 * @param string $filename
 * @return string
 */
function getExt($filename){
    return strtolower(end(explode(".",$filename)));
}



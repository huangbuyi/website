<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/2
 * Time: 22:23
 */



function showPage($page, $totalPage, $where=null, $sep="&nbsp;", $offset=5){

    $where=($where==null)?null:"&".$where;
    $url = $_SERVER ['PHP_SELF'];
    $index = ($page == 1) ? "首页" : "<a href='{$url}?page=1{$where}'>首页</a>";
    $last = ($page == $totalPage) ? "尾页" : "<a href='{$url}?page={$totalPage}{$where}'>尾页</a>";
    $prevPage=($page>=1)?$page-1:1;
    $nextPage=($page>=$totalPage)?$totalPage:$page+1;
    $prev = ($page == 1) ? "上一页" : "<a href='{$url}?page={$prevPage}{$where}'>上一页</a>";
    $next = ($page == $totalPage) ? "下一页" : "<a href='{$url}?page={$nextPage}{$where}'>下一页</a>";
    $str = "总共{$totalPage}页/当前是第{$page}页";
    $p='';

    $start = ($page - $offset >= 1 )? $page - $offset: 1;
    $end = ($page + $offset <= $totalPage)? $page + $offset: $totalPage;
    for($i = $start; $i <= $end; $i ++) {
        //当前页无连接
        if ($page == $i) {
            $p .= "[{$i}]";
        } else {
            $p .= "<a href='{$url}?page={$i}{$where}'>[{$i}]</a>";
        }
    }
    $pageStr=$sep . $index .$sep. $prev.$sep . $p.$sep . $next.$sep . $last;
    return $pageStr;
}
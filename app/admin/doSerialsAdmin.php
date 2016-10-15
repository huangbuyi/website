

<?php


/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/2
 * Time: 15:06
 */
require('include.php');

define("USER","root");
define("PASS","123456");
//$res = ['error'=>'', 'data'=>null];

//serialsAdmin($res);
//
//if( $res['error'] ){
//    $res['success'] = false;
//} else {
//    $res['success'] = true;
//}
//$res['data'] = get_http_raw();
//echo $res['error'];
//echo get_http_raw();
echo json_encode(serialsAdmin());


function serialsAdmin(){

    $act = $_REQUEST['act'];
    $acts_need_logined = array('add', 'delete', 'upload', 'insert');
    if(in_array($act, $acts_need_logined)){
        if(!hasLogined()){
            return array('success'=>false, 'error'=>'无操作权限');
        };
    }

    if($act == 'insert'){
        $s_id= refurbishSerial();
        if( (int)$s_id > 0  ){
            return array('success'=>true, 'id'=>$s_id);
        } else {
            return array('success'=>false, 'error'=>'insert failed');
        }
    }

    if($act  == 'update'){
        $s_id = $_REQUEST['id'];
        if( (int)$s_id > 0){
            $res = refurbishSerial($s_id);
            if($res){
                return array('success'=>true, 'data'=>$res);
            } else {
                return array('success'=>false, 'error'=>'update failed');
            }

        } else {
            return array('success'=>false, 'error'=>'id does not existed');
        }
    }

    if($act == 'login'){
        if(hasLogined()){
            $username = hasLogined();
            return array('success'=>false,'error'=>'账号已登录','username'=>$username);
        } else {
            $username = $_POST['username'];
            $password = $_POST['password'];
            $autoLogin = $_POST['autoLogin'];
            if ($username == USER && $password = PASS) {
                if ($autoLogin) {
                    setcookie('adminName', $username, time() + 7 * 24 * 3600);
                }
                session_start();
                $_SESSION['adminName'] = $username;

                return array('success'=>true,'username'=>$username);

            } else {
                return array('success'=>false,'error'=>'账号或密码错误！');
            }
        }
    }

    if($act == 'logout'){
        logout();
        return array('success'=>true);
    }

    if($act == 'upload_posters'){
        $s_id = $_REQUEST['id'];
        if( !$s_id ){
            return array('success'=>false,'error'=>'id does not exist!');
        }
        $upl = handle_upload("uploads".DIRECTORY_SEPARATOR."posters");

        if($upl['success']){
            if($upl['uuid']){
                $path = $upl['uuid'].'/'.$upl['uploadName'];
                $r = insertImagesTbl($s_id, $path, 1);

                if($r){
                    return array('success'=>true);
                } else {
                    return array('success'=>false,'error'=>'insert images error '.$r);
                }
            } else {
                return array('success'=>false,'error'=>'uuid error');

            }
        } else {
            return array('success'=>false,'error'=>$upl['error']);
        }
    }

    if($act == 'upload_images'){
        $s_id = $_REQUEST['id'];
        if( !$s_id ){
            return array('success'=>false,'error'=>'id does not exist!');
        }
        $upl = handle_upload("uploads".DIRECTORY_SEPARATOR."images");
        if($upl['success']){
            if($upl['uuid']){
                $path = $upl['uuid'].'/'.$upl['uploadName'];
                $r = insertImagesTbl($s_id, $path, 0);

                if($r){
                    return array('success'=>true);
                } else {
                    return array('success'=>false,'error'=>'insert images error '.$r);
                }
            } else {
                return array('success'=>false,'error'=>'uuid error');
            }
        } else {
            return array('success'=>false,'error'=>$upl['error']);
        }
    }

    if($act == 'get'){
        $id = $_REQUEST['id'];
        if($id){
            return array('success'=>true,'data'=>getSerials($id));
        } else {
            $page = $_REQUEST['page']?$_REQUEST['page']:1;
            $pageSize = $_REQUEST['pageSize']?$_REQUEST['pageSize']:8;
            return array('success'=>true,'total'=>getSerialsTotal(),'data'=>getSerials($page, $pageSize));
        }
    }

    if($act == 'getImagesById'){
        $id = $_REQUEST['id'];
        return array('success'=>true,'posters'=>getImages($id, 1),'images'=>getImages($id, 0));
    }

    if($act == 'delete'){
        $id = $_REQUEST['id'];
        if(!$id){
            return array('success'=>false,'error'=>'id does not existed');
        }
        $r = deleteSerials($id);

        if(!$r){
            return array('success'=>false,'error'=>'delete data failed');
        }
        return array('success'=>true,'data'=>getSerials());
    }

//    switch ($act){
//        case "insert":
//            $s_id= refurbishSerial();
//            if( (int)$s_id > 0  ){
//                $res['id'] = $s_id;
//            } else {
//                $res['error'] = 'insert error';
//            }
//            break;
//
//        case "update":
//            $s_id = $_REQUEST['id'];
//            if( (int)$s_id > 0){
//                $res['data'] = refurbishSerial($s_id);
//            } else {
//                $res['error'] = "id error";
//            }
//            break;
//
//        case "login":
//            if(hasLogined()){
//                $username = hasLogined();
//                $res['error'] = $username."已登录";
//                $res['username'] = $username;
//            } else {
//                $username = $_POST['username'];
//                $password = $_POST['password'];
//                $autoLogin = $_POST['autoLogin'];
//                if($username == USER && $password = PASS){
//                    if($autoLogin){
//                        setcookie('adminName', $username, time()+7*24*3600);
//                    }
//                    session_start();
//                    $_SESSION['adminName'] = $username;
//                    $res['username'] = $username;
//
//                } else {
//                    $res['error'] = "用户名或密码错误！";
//                    return;
//                }
//            };
//            break;
//
//        case "logout":
//            logout();
//            break;
//
//        // todo:删除不需要传id，找个合适的方案，另外出去或改逻辑
//        // todo:复用
//        case "upload_posters":
//            $s_id = $_REQUEST['id'];
//            if( !$s_id ){
//                $res['error'] = 'id does not exist!';
//                return;
//            }
//            $upl = handle_upload("uploads".DIRECTORY_SEPARATOR."posters");
//
//            if($upl['success']){
//                if($upl['uuid']){
//                    $path = $upl['uuid'].'/'.$upl['uploadName'];
//                    $r = insertImagesTbl($s_id, $path, 1);
//
//                    if($r){
//                        $res['data'] = "success";
//                    } else {
//                        $res['error'] = "insert images error ".$r;
//                    }
//                } else {
//                    $res['error'] = "uuid error";
//                }
//            } else {
//                $res['error'] = $upl['error'];
//
//                return;
//            }
//            break;
//
//        case "upload_images":
//            $s_id = $_REQUEST['id'];
//            if( !$s_id ){
//                $res['error'] = 'id does not exist!';
//                return;
//            }
//            $upl = handle_upload("uploads".DIRECTORY_SEPARATOR."images");
//            if($upl['success']){
//                if($upl['uuid']){
//                    $path = $upl['uuid'].'/'.$upl['uploadName'];
//                    $r = insertImagesTbl($s_id, $path, 0);
//
//                    if($r){
//                        $res['data'] = "success";
//                    } else {
//                        $res['error'] = "insert images error ".$r;
//                    }
//                } else {
//                    $res['error'] = "uuid error";
//                }
//            } else {
//                $res['error'] = $upl['error'];
//
//                return;
//            }
//            break;
//
////        case "add":
////            $serials = getSerialsPostData();
////            if(!$serials){
////
////                $res['error'] = "form data error 获取表单数据失败！";
////                return;
////            }
////
////            $sId = refurbishSerial($serials);
////            if( !$sId ){
////                $res['error'] = 'insert error 插入数据失败，id不存在！';
////                return;
////            };
////
////            if($serials['tags']){
////                insertManyToMany($serials['tags'], 'tags_name', 'serials_tags', $sId);
////            }
////            if($serials['actors']){
////                insertManyToMany($serials['actors'], 'actors_name', 'serials_actors', $sId);
////            }
////            if($serials['types']){
////                insertManyToMany($serials['types'], 'types_name', 'serials_types', $sId);
////            }
////            break;
//
//        // todo 改善page逻辑
//        case "get":
//            $id = $_REQUEST['id'];
//            if($id){
//                $res['data'] = getSerials($id);
//            } else {
//                $res['total'] = getSerialsTotal();
//                $page = $_REQUEST['page']?$_REQUEST['page']:1;
//                $pageSize = $_REQUEST['pageSize']?$_REQUEST['pageSize']:8;
//                $res['data'] = getSerials($page, $pageSize);
//                break;
//            }
//
//        case "getImagesById":
//            $id = $_REQUEST['id'];
//            $res['posters'] = getImages($id, 1);
//            $res['images'] = getImages($id, 0);
//
//            break;
//
//        case 'delete':
//            $id = $_REQUEST['id'];
//            if(!$id){
//                $res['error'] = "未传入id";
//                return;
//            }
//            $r = deleteSerials($id);
//
//            if(!$r){
//                $res['error'] = "删除数据失败";
//                return;
//            }
//            $res['data'] = getSerials();
//            break;
//    }
}


//switch ($act){
//    case "add":
//        $serials = getSerialsData();
//        $sId = refurbishSerial($serials);
//
//        if( $sId ){
//            if($serials['tags']){
//                insertManyToMany($serials['tags'], 'tags_name', 'serials_tags', $sId);
//            }
//            if($serials['actors']){
//                insertManyToMany($serials['actors'], 'actors_name', 'serials_actors', $sId);
//            }
//            if($serials['types']){
//                insertManyToMany($serials['types'], 'types_name', 'serials_types', $sId);
//            }
//            header('location:serialAdd.php');
//        } else {
//            echo 1;
//        };
//        break;
//
//    case "update":
//        $serials = getSerialsData();
//        $res = refurbishSerial($serials, $id);
//
//        if( $res ){
//            if($serials['tags']){
//                insertManyToMany($serials['tags'], 'tags_name', 'serials_tags', $Id);
//            }
//            if($serials['actors']){
//                insertManyToMany($serials['actors'], 'actors_name', 'serials_actors', $Id, "/[,.]+/");
//            }
//            if($serials['types']){
//                insertManyToMany($serials['types'], 'types_name', 'serials_types', $Id);
//            }
//
//            header('location:serialsList.php?page='.$_REQUEST['page']);
//        } else if( $res === 0) {
//            echo 2;
//        } else {
//            echo 3;
//        };
//        break;
//
//    case 'delete':
//        $s =deleteSerials($id);
//        if($s){
//
//            header('location:serialsList.php?page='.$_REQUEST['page']);
//        }
//        break;
//
//
//}


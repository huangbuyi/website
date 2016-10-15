<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/2
 * Time: 23:03
 */

/*function moveUploaded($name, $path){
    if ($_FILES[$name]['error'] > 0){
        $msg = 'Problem:';
        switch ($_FILES[$name]['error']){
            case 1: $msg .= 'File exceeded upload_max_filesize';
                break;
            case 2: $msg .= 'File exceeded max_file_size';
                break;
            case 3: $msg .= 'File only partially upload';
                break;
            case 4: $msg .= 'No file uploaded';
                break;
            case 6: $msg .= 'Cannot upload file: No temp directory specified';
                break;
            case 7: $msg .= 'Upload failed: Connot write to disk';
                break;
        }
        return ['is_success'=>false, 'message'=>$msg];
    }

//    if ($_FILES[$name]['type'] != 'text/plain'){
//        $msg = 'Problem: file is not plain text';
//        return ['is_success'=>false, 'message'=>$msg];
//    }

    $uniName = getUniName().'.'.getExt( $_FILES[$name]['name'] );
    $upfile = $path.$uniName;

    if (is_uploaded_file($_FILES[$name]['tmp_name'])){
        if (!move_uploaded_file($_FILES[$name]['tmp_name'], $upfile)){
            $msg = 'Problem: Could not move file to destination directory';
            return ['is_success'=>false, 'message'=>$msg];
        }
    } else {
        $msg = 'Problem: Possible file upload attack. Filname:'.$_FILES[$name]['name'];
        return ['is_success'=>false, 'message'=>$msg];
    }

    return ['is_success'=>true, 'message'=>'Upload success!','src'=> $uniName];
}*/
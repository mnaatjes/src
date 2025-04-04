<?php
    /**
     * Require Library
     * Enable Errors
     */
    require_once '../../utils/main.php';
    require_once '../../lib/requests/request.php';
    require_once '../../lib/file_manager/file.php';
    /**
     * Enable errors log
     */
    ini_errors_enable();
    /**
     * Perform Request Logic
     */
    $req = new Request('POST');
    //var_dump($req->data);
    $req->processForm(function($data, $errors){
        foreach($data['files'] as $file){
            //$file->upload('uploads/test');
        }
    });
?>
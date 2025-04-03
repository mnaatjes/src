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
    /*
    if($_SERVER['REQUEST_METHOD'] === "POST"){
        var_dump($_FILES);
    }
    */
    $req = new Request('POST');
    //var_dump($req->data);
    $req->processForm(function($data, $errors){
        $file_test = $data['files'][0]->tmp['tmp_name'];
        var_dump($data['files']);
    });
?>
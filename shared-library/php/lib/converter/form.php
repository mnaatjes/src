<?php
    /**
     * Require Library
     * Enable Errors
     */
    require_once '../../utils/utils-main.php';
    require_once '../../lib/requests/request.php';
    require_once '../converter/core/file.php';
    /**
     * Enable errors log
     */
    enableErrors();
    /**
     * Perform Request Logic
     */
    /*
    if($_SERVER['REQUEST_METHOD'] === "POST"){
        var_dump($_FILES);
    }
    */
    $req = new Request('POST', 'file--path');
    $req->processForm(function($data, $errors){
        /**
         * File Error Handling
         * 1) Parse error from $_FILES
         * 2) Manage error int > 0
         */
        $data['file']['error'] = $errors['file']['value'] = is_numeric($data['file']['error']) ? intval($data['file']['error']) : null;
        if($errors['file']['value'] !== UPLOAD_ERR_OK){
            /**
             * Error handling for file upload
             */
            $msg;
            switch($errors['file']['value']){
                case UPLOAD_ERR_INI_SIZE:
                    $msg = "The uploaded file exceeds the upload_max_filesize directive in php.ini.";
                    break;
                case UPLOAD_ERR_FORM_SIZE:
                    $msg = "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.";
                    break;
                case UPLOAD_ERR_PARTIAL:
                    $msg = "The uploaded file was only partially uploaded.";
                    break;
                case UPLOAD_ERR_NO_FILE:
                    $msg = "No file was uploaded.";
                    break;
                case UPLOAD_ERR_NO_TMP_DIR:
                    $msg = "Missing a temporary folder.";
                    break;
                case UPLOAD_ERR_CANT_WRITE:
                    $msg = "Failed to write file to disk.";
                    break;
                case UPLOAD_ERR_EXTENSION:
                    $msg = "File upload stopped by extension.";
                    break;
                default:
                    $msg = "Unknown upload error.";
                    break;
            }
            $errors['file']['message'] = $msg;
        }
        /**
         * Upload Parameters
         */
        $tmpDir         = !ini_get('upload_tmp_dir') ? sys_get_temp_dir() : ini_get('upload_tmp_dir');
        $uploadDir      = 'files/bananas/';
        $dirExists      = !is_dir($uploadDir) ? mkdir($uploadDir, 0775, true): is_dir($uploadDir);
        $tmpExists      = file_exists($data['file']['tmp_name']);
        $validExt       = ['csv', 'json', 'xml', 'txt', 'pdf'];
        /**
         * File Properties
         */
        $file = pathinfo($data['file']['name']);
        /**
         * Validate File
         */
        if(!in_array($file['extension'], $validExt)){
            throw new Error('Invalid File Extensions!');
        }
        /**
         * Move from temporary directory to upload directory
         */
        $isTmpFilePath = is_int(strpos($data['file']['tmp_name'], $tmpDir)) ? true : false;
        $test = new File($data['file']);
        var_dump($test);
    });
?>
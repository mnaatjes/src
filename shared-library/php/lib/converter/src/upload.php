<?php
    /**
     *  Require utils
     */
    require_once '../../../utils/utils-main.php';
    /**
     * enable errors
     */
    enableErrors();
    /**
     * constants
     */
    $refName        = $_POST['refName'];
    $filePath       = '../uploads/';
    $extensions     = ['json', 'csv'];
    $types          = ['application/json', 'text/csv', 'text/plain'];
    $sizeLimit      = 1000000;
    $sizeLimitKB    = $sizeLimit / 1024;
    /**
     * Check server request method
     * Check file is set
     */
    if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])){
        /**
         * file upload properties
         */
        $fileData   = $_FILES['file'];
        $fileName   = basename($fileData['name']);
        //$fileType   = $fileData['type'];
        $tempName   = $fileData['tmp_name'];
        $fileError  = $fileData['error'];
        $fileSize   = $fileData['size'];
        $fileSizeKB = $fileSize / 1024;
        $fileSizeMB = $fileSize / (1024 * 1024);
        /**
         *  validate filetype:
         *      check mime type with file-info-open
         */
        $fileInfo   = finfo_open(FILEINFO_MIME_TYPE);
        $fileType   = finfo_file($fileInfo, $fileData['tmp_name']);
        finfo_close;
        if(!in_array($fileType, $types)){
            throw new TypeError('Invalid File Type!');
        }
        /**
         * validate extension
         */
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        if(!in_array($fileExt, $extensions)){
            throw new TypeError('Invalid file extension!');
        }
        /**
         * validate file size
         */
        console($fileSizeKB);
        console($fileError);
        console($fileName);
        /**
         * attempt to move file
         */
        $unique     = time() . '__' . uniqid();
        $targetPath = $filePath . $unique . '.' . $fileExt;
        if(move_uploaded_file($tempName, $targetPath)){
            /**
             * dump data into json records file
             */
            $records    = 'records.json';
            $json       = json_decode(file_get_contents($records), true);
            if($json === null){
                $json = [];
            }
            $json[] = [
                'refName'   => $refName,
                'fileName'  => $unique,
                'fileExt'   => $fileExt,
                'fileType'  => $fileType
            ];
            file_put_contents($records, json_encode($json));
            /**
             * redirect to converter
             */
            header('Location: convert.php?filepath=' . urlencode($targetPath) . '&filename=' . urlencode($unique) . '&type=' . $fileType . '&ext=' . $fileExt);
            exit;
        } else {
            throw new Error('Failed to upload file!');
        }
    }
?>
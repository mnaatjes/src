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
     * Converter
     * 
     * get data string for filename
     */
    if(!isset($_GET['filename']) && !isset($_GET['type']) && !isset($_GET['ext'])){
        throw new Error('File data not sent!');
    }
    /**
     * file properties
     */
    $filePath   = urldecode($_GET['filepath']);
    $fileName   = urldecode($_GET['filename']);
    $fileExt    = $_GET['ext'];
    $fileType   = $_GET['type'];
    /**
     *  timing
     */
    $time = microtime(true);
    /**
     *  TODO:
     *  sort data by filetype accepted
     *      if csv --> json -->sql
     *      if json --> sql
     */
    /**
     * open input file
     * open | create output json file
     */
    console($fileName);
    if(($inputFile = fopen($filePath, 'r')) === false){
        die('Error opening CSV file');
    }
    if(($outputFile = fopen('../json/' . $fileName . '.json', 'w')) === false){
        die('Failure to open output json file');
    }
    /**
     * grab header data
     * throw error if empty
     */
    $header = fgetcsv($inputFile);
    if($header === false){
        die('Error reading header row');
    }
    /**
     * begin writing to json file
     * start json array
     */
    fwrite($outputFile, '[');
    /**
     * set first row for comma deliniation
     */
    $firstRow = true;
    /**
     * loop csv data and assemble | write to json file
     */
    while(($row = fgetcsv($inputFile)) !== false){
        /**
         * generate assoc array of key, value pairs from header
         * implode row if error to display and continue
         */
        $rowData = array_combine($header, $row);
        if($rowData === false){
            error_log('Mismatched row and header count: ', implode(',', $row));
            continue;
        }
        /**
         * convert to json
         * if failure, stop converter
         */
        $rowJSON = json_encode($rowData);
        if($rowJSON === false){
            die('Could not encode JSON from csv: ' . json_last_error_msg());
        }
        /**
         * inject comma delimiter if not first row
         */
        if(!$firstRow){
            fwrite($outputFile, ',');
        }
        /**
         * write json row to output file
         */
        fwrite($outputFile, $rowJSON);
        /**
         * reset row
         */
        $firstRow = false;

    }
    /**
     * write json array enclosure
     * close files
     */
    fwrite($outputFile, ']');
    fclose($inputFile);
    fclose($outputFile);
    /**
     * grab elasped time
     */
    $elapsed = microtime(true) - $time;
    console($elapsed);
?>
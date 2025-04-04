<?php
    require_once '../constants/error_settings.php';
    require_once '../constants/format_options.php';
    /*----------------------------------------------------------*/
    /**
     * Function to convert .csv files to various formats.
     * Output formats include: JSON, XML, YML
     * 
     * @param object|string $file - File Class object || filepath string
     * @param array $config - An assoc. array of configuration data
     * Required Keys:
     * - 'input' (array): Assoc array of input settings
     *      Required Keys:
     *      - 'encoding' (string): Defines charater encoding; Default 'UTF-8'
     *      - 'delimiter' (string): Delimiter charater for incoming csv file; Default ','
     * - 'output' (array): Assoc array of output settings
     *      Required Keys:
     *      - 'filename' (string|null): Output name for file; default null keeps current filename
     *      - 'type' (string): Output file type
     *      - 'encoding' (string): Defines charater encoding; default 'UTF-8'
     *      - 'indent' (int): For json outputs, Defined intentation level for readability
     *      - 'errors' (int|const): Integer value (0-2) or Constant variable to define how errors are handled
     *      - 'character' (int|const): Determines how escape characters are handled during conversion 
     * @param callable [$callback] - Optional callback function for modifying data processing
     */
    /*----------------------------------------------------------*/
    function convert_csv(object $file, array $config, callable $callback){
        /**
         * Validate that $file is of instance type File
         * Or Validate filepath string and convert to File object
         */
        /**
         * Validate $config values
         */
    }
?>
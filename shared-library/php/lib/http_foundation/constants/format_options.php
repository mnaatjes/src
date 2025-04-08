<?php
    /*----------------------------------------------------------*/
    /**
     * Constant variable declarations for csv file output settings
     */
    /*----------------------------------------------------------*/
    /**
     * Escape characters that are included in the csv document; i.e. backslashes or double-quotes
     * @var int CONVERT_ESCAPE_CHAR - Includes escape characters
     */
    define('CONVERT_ESCAPE_CHAR', 0);
    /**
     * @var int CONVERT_QUOTE_CHAR - Uses double-quotes to preserve data integrity; e.g. "Smith, John" is full-name not differnet columns
     */
    define('CONVERT_QUOTE_CHAR', 1);
    /*----------------------------------------------------------*/
    /**
     * Constant variables for json output formatting
     */
    /*----------------------------------------------------------*/
    /**
     * Defines JSON pretty print output of conversion
     * @var int CONVERT_JSON_PRETTY - Employs value of JSON_PRETTY_PRINT
     */
    define('CONVERT_JSON_PRETTY', JSON_PRETTY_PRINT);
    //define('CONVERT_JSON_ROOT_ELE_NAME', 1); TODO: Figure out how to implement
    /*----------------------------------------------------------*/
    /**
     * Constant declarations for Data Transformation
     */
    /*----------------------------------------------------------*/
    define('CONVERT_COL_MAP', 0); // Allows mapping input/output column names
    define('CONVERT_TYPE_MAP', 1); // Specifies how to convert data-types; e.g. string to number, date formatting
    define('CONVERT_USE_FILTER', 2); // Employs an array of definitions
    define('CONVERT_HEADER_ROW', 3); // First row is header
    define('CONVERT_INCLUDE_COLS', 4); // Allow user to specify which columns they would like included
    define('CONVERT_EXCLUDE COLS', 5); // Allows user ot specify which columns to exclude

?>
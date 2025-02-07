<?php
    /*----------------------------------------------------------*/
    /**
     * utils__strings-str_isURL.php
     * 
     * Checks if supplied string is a valid URL
     * 
     * @author Michael Naatjes <michael.naatjes87@gmail.com>
     * @version 1.0.0
     * @since 02-07-2025
     */
    /*----------------------------------------------------------*/
    /**
     * str_isURL
     * Check if supplied string parameter is a valid URL
     * 
     * @param string $str
     * @return boolean
     */
    function str_isURL(string $str) {
        if(filter_var($str, FILTER_VALIDATE_URL) !== false) {
            return true;
        }
        /**
         * default value
         */
        return false;
    }
?>
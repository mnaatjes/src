<?php
    /*----------------------------------------------------------*/
    /**
     * Checks if supplied string is a URL using filter_var with FILTER_VALIDATE_URL
     * 
     * @param string $str - String to evaluate
     * 
     * @return boolean - True if successful
     */
    /*----------------------------------------------------------*/
    function is_string_url(string $str) {
        /**
         * Evaluate
         */
        if(filter_var($str, FILTER_VALIDATE_URL) !== false) {
            return true;
        }
        /**
         * Return default value
         */
        return false;
    }
?>
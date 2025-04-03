<?php
    /*----------------------------------------------------------*/
    /**
     * Uses in_array() method recursively to search for a value within an array
     * 
     * @param mixed $needle - Value to search for
     * @param array $haystack - Array to search through
     * @param bool $strict - Default(false) loose comparison | True: Use strict mode
     */
    /*----------------------------------------------------------*/
    function in_array_recursive($needle, array $haystack, bool $strict=false){
        /**
         * Validate $haystack
         */
        if(!is_array($haystack)){
            throw new TypeError(sprintf('Haystack argument must be an ARRAY! %s given!', gettype($haystack)));
        }
        /**
         * Try at top level
         */
        if(in_array($needle, $haystack, $strict)){
            return true;
        }
        /**
         * Loop and check if elements are also arrays
         */
        foreach($haystack as $hay){
            /**
             * Check conditions: array recursive
             */
            if(is_array($hay)){
                if(in_array_recursive($needle, $hay, $strict)){
                    return true;
                };
            }
        }
        /**
         * Loop finished without resolving
         * Return false
         */
        return false;
    }

?>
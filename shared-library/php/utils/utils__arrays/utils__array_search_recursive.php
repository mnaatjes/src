<?php
    /*----------------------------------------------------------*/
    /**
     * Uses array_search() method recursively to search for the index of a value in an array
     * 
     * @param mixed $needle - Value to search for
     * @param array $haystack - Array to search through
     * @param bool $strict - Default(false) loose comparison | True: Use strict mode
     * 
     * @return string|int|false - Return found key (int|string) or false
     */
    /*----------------------------------------------------------*/
    function array_search_recursive($needle, array $haystack, bool $strict=false){
        /**
         * Validate $haystack
         */
        if(!is_array($haystack)){
            throw new TypeError(sprintf('Haystack argument must be an ARRAY! %s given!', gettype($haystack)));
        }
        /**
         * Perform initial search
         */
        if(in_array($needle, $haystack, $strict)){
            return array_search($needle, $haystack, $strict);
        }
        /**
         * Search a level down
         */
        foreach($haystack as $hay){
            // Check if array
            if(is_array($hay)){
                if(in_array($needle, $hay, $strict)){
                    return array_search($needle, $hay, $strict);
                } else {
                     $search = array_search_recursive($needle, $hay, $strict);
                     if($search !== false){
                        return $search;
                     }
                }
            }
        }
        /**
         * Could not find
         */
        return false;
    }
?>
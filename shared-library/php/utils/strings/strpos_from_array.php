<?php
    /**
     * Gets the string position of $needles elements within a $haystack(string)
     * 
     * @param array $needles - Character(s) to find the first occurance within the $haystack string
     * @param string $haystack - string characters to search
     * @param int $offset - specify the starting position for the search of $haystack; Default = 0 (start of string)
     * 
     * @return array - key($needle) value(int position | bool false) of each needle within $haystack; Returns First Occurance
     */
    function strpos_from_array(array $needles, string $haystack, int $offset=0){
        /**
         * Validate string
         */
        if(!is_string($haystack)){
            throw new TypeError('Argument $haystack must be a STRING!');
        }
        /**
         * Declare results array
         * Loop array of $needles
         */
        $result = [];
        foreach($needles as $needle){
            $pos = strpos($haystack, $needle, $offset);
            $result[$needle] = $pos;
        }
        /**
         * Return array of positions
         */
        return $result;
    }
?>
<?php
    /*----------------------------------------------------------*/
    /**
     * array_assoc_compare
     * @param array $arr1 - associative array to compare
     * @param array $arr2 - associative array to compare
     * 
     * @return bool|array - true if equal; assoc array of different values if not equal
     */
    /*----------------------------------------------------------*/
    function array_assoc_compare($arr1, $arr2){
        /**
         * @property boolean $equal - boolean to return
         */
        $equal = false;
        if(count($arr1) !== count($arr2)){
            $equal = false;
        }
        /**
         * @property array $diff - array of different values from $arr1 and $arr2
         */
        $diff = array_diff_assoc($arr1, $arr2);
        var_dump($diff);
    }
?>
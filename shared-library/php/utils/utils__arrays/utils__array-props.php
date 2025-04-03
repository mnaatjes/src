<?php
/*----------------------------------------------------------*/
/**
 * arrayGetValueRecursive
 *
 * @param array $arr
 * @param string $key
 * 
 * @return mixed
 */
/*----------------------------------------------------------*/
function arrayGetValueRecursive(array $arr, string $key){
    /**
     * validate arr is array
     * loop arr
     */
    if(is_array($arr)){
        /**
         * check if assoc array
         */
        if(isAssocArray($arr)){
            /**
             * look for key
             */
            foreach($arr as $k=>$v){
                /**
                 * check for match
                 */
                if($k === $key){
                    return $v;
                } else {
                    /**
                     * failed check
                     * if is array, search deeper
                     */
                    if(is_array($v)){
                        $res = arrayGetValueRecursive($v, $key);
                        if($res !== null){
                            return $res;
                        }
                    }
                }
            }
        } else {
            /**
             * indexed array
             */
            foreach($arr as $ele){
                /**
                 * check if array ele is also an array
                 */
                if(is_array($ele)){
                    /**
                     * execute recursive function
                     * validate result
                     */
                    $res = arrayGetValueRecursive($ele, $key);
                    if($res !== null){
                        return $res;
                    }
                }
            }
        }
    }
}
/*----------------------------------------------------------*/
/**
 * arrayHasKeys
 * 
 * @param array $arr associative array
 * @param array $keys indexed array
 * 
 * @return boolean true if all keys are present
 */
/*----------------------------------------------------------*/
function arrayHasKeys(array $arr, array $keys){
    /**
     * validate array & associative array
     */
    if(is_array($arr)){
        /**
         * clean array and remove duplicates
         */
        $keys = array_unique($keys);
        /**
         * declare acc array
         * map array and check if keys exist
         */
        $flag   = true;
        $acc    = array_map(function($key) use ($arr){
            return array_key_exists($key, $arr);
        }, $keys);
        /**
         * validate acc array for all true values
         */
        return arrayEvery($acc, function($ele){
            return $ele === true;
        });
    }
}
/*----------------------------------------------------------*/
/**
 * array_type
 *
 * @param array $arr
 * @return string 'indexed' | 'assoc'
 */
/*----------------------------------------------------------*/
function array_type(array $arr): string{
    $isIndexed = array_every($arr, function($k, $v, $i){return $i === $k;});
    return ($isIndexed === true) ? 'indexed' : 'assoc';
}
/*----------------------------------------------------------*/
/**
 * isAssocArray
 *
 * @param array $arr
 * @return boolean
 */
/*----------------------------------------------------------*/
function isAssocArray($arr){
    /**
     * validate variable supplied is an array
     */
    if(is_array($arr) && !empty($arr)){
        /**
         * try to grab keys
         */
        $keys = array_keys($arr);
        $res = array_keys($keys);
        /**
         * returns true if keys do not match
         * keys will match is a non-assoc array
         */
        return array_keys($keys) !== $keys;
    } else {
        /**
         * supplied param is not an array
         */
        return false;
    }
}
/*----------------------------------------------------------*/
/**
 * is_array_assoc - Checks if supplied array is an associative array; returns boolean value
 *
 * @param array $arr
 * @return boolean - True is associative array; false if indexed or not an array
 */
/*----------------------------------------------------------*/
function is_array_assoc($arr): bool{
    // Validate is array and contains values
    if(!is_array($arr) || count($arr) === 0){
        return false;
    }
    /**
     * Return values
     */
    return array_keys($arr) !== range(0, count($arr) - 1);
}
/*----------------------------------------------------------*/
/**
 * is_array_assoc_recursive - Checks if supplied multidimensional array is an associative array; returns boolean value
 * @param array $arr - Multi-dimensional Array
 * @param int $depth - Depth of array recursion
 * 
 * @property bool $curr - Current result of is_array_assoc
 * 
 * @return bool - True if Associative Array (i.e. any key at any depth is non-indexed) | False: All arrays at all dimensions are indexed
 */
/*----------------------------------------------------------*/
function is_array_assoc_recursive(array $arr, int $depth=0) {
    /**
     * Validate Array
     */
    if(!is_array($arr) || count($arr) === 0){
        return false;
    }
    /**
     * Get current array eval
     */
    $curr = is_array_assoc($arr);
    if(!$curr){
        /**
         * Check array elements:
         * 1) Check if array
         * 2) Run recursive function
         */
        return array_some($arr, function($_, $ele) use($curr, $depth){
            /**
             * Determine if element is array
             * 1) If array, check if assoc array
             * 2) If assoc array -> return true and end
             * 3) If not assoc array -> recursive
             */
            if(is_array($ele)){
                if(is_array_assoc($ele)){
                    return true;
                } else {
                    return is_array_assoc_recursive($ele, $depth += 1);
                }
            } else {
                /**
                 * Element is not an array
                 * Previous Determination of False is returned
                 */
                return false;
            }
        });
    } else {
        /**
         * Current array is assoc array
         */
        return true;
    }
}
/*----------------------------------------------------------*/
/**
 * is_array_2d - checks if supplied array is 2 dimensional
 * @param array $arr - array to check
 * @return bool - True if 2d; false if: 1) not an array, 2) more than 2d i.e. multi-dimensional
 */
/*----------------------------------------------------------*/
function is_array_2d(array $arr): bool {
    /**
     * Validate array
     */
    if(!is_array($arr) || count($arr) === 0){
        return false;
    }
    /**
     * Evalutate elements of $arr === array
     * Check that elements of $item !== array
     * Return value
     */
    return array_every($arr, function($_, $item){
        /**
         * If $item is an array, check that values are NOT array elements
         */
        if(is_array($item)){
            return array_every($item, function($_, $ele){
                // check that element is not an array
                return !is_array($ele);
            });
        }
    });
}
/*----------------------------------------------------------*/
/**
 * is_array_rect - Checks whether an array is rectangular;
 * @param array $arr - Array to check
 * @return boolean - True if rectangular; false if: 1) is not an array, 2) is empty array, 3) is jagged array
 */
/*----------------------------------------------------------*/
function is_array_rect(array $arr):bool {
    /**
     * Validate array
     */
    if(!is_array($arr) || count($arr) === 0){
        return false;
    }
    /**
     * Check if array has at least 2 Dimensions
     */
    if(!array_every($arr, function($_, $ele){return is_array($ele);})){
        return false;
    }

    $length = count($arr[array_key_first($arr)]);
    /**
     * Loop array elements | Validate arrays | Check count against initial length
     */
    foreach($arr as $row){
        // validate is array or is not empty array
        if(!is_array($row) || count($row) !== $length){
            // exit, return boolean
            return false;
        }
    }
    /**
     * Array finished loop; Return true
     */
    return true;
}
?>
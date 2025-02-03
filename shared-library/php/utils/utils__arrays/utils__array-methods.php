<?php
/*----------------------------------------------------------*/
/**
 * arrayFlattem
 *
 * @param 
 * @return array flattened array
 */
/*----------------------------------------------------------*/
function arrayFlatten(array $arr): array {
    /**
     * validate array
     * declare result arr
     */
    if(is_array($arr)){
        $res = [];
        foreach($arr as $ele){
            if(is_array($ele)){
                $res = array_merge($res, $ele);
            } else {
                array_push($res, $ele);
            }
        }
        return $res;
    }

}
/*----------------------------------------------------------*/
/**
 * arraySome
 * 
 * tests whether any element of an array satisfies a given condition
 * 
 * @param array $arr indexed or associative array
 * @param callable $callback
 * 
 * @return boolean  returns true if at least one element satisfies conditions
 *                  returns false if none of the elements satisfy the conditions
 */
/*----------------------------------------------------------*/
function arraySome(array $arr, callable $callback): bool {}
/*----------------------------------------------------------*/
/**
 * arrayJoin
 *
 * @param array $arr
 * @param string $delimiter
 * @param string $prefix
 * @param string $suffix
 * 
 * @property array $flat flattened array
 * @property mixed $ele array element
 * @return string flattened array
 */
/**
 * uses and require
 */
require_once 'utils__array-props.php';
/*----------------------------------------------------------*/
function arrayJoin($arr, string $delimiter='', string $prefix='', string $suffix=''){
    /**
     * declare flat arr
     */
    $flat = [];
    /**
     * validate array
     * check type of array
     */
    if(is_array($arr) && isAssocArray($arr)){
        /**
         * array is associative array!
         * 
         * loop array as key, value pairs
         */
        foreach($arr as $key => $value){
            /**
             * TODO: if value is array; recursively walk
             */
            /**
             * execute callback function
             */
            $flat[] = ltrim($key) . $prefix . $value . $suffix;
        }
    } elseif (is_array($arr) && !isAssocArray($arr)){
        /**
         * array is indexed array!
         * 
         * recursive walk through indexed array:
         * applied user-defined func to every element of arr
         * includes elements of nested array (recursive)
         * &$flat: reference to properties $flat, $prefix, $suffix
         */
        array_walk_recursive($arr, function($ele) use (&$flat, $prefix, $suffix){
            /**
             * enter formatted string into new array
             */
            $flat[] = $prefix . ltrim($ele) . $suffix;
        });
    } else {
        /**
         * parameter not an array
         * throw error
         */
        trigger_error("Parameter supplied is NOT an array!", E_USER_ERROR);
    }
    /**
     * flatten array 
     */
    return implode($delimiter, $flat);
}
/*----------------------------------------------------------*/
/**
 * arrayEvery
 * 
 * @param array $arr
 * @param function $callback
 * 
 * @return boolean true if call array elements match condition
 */
/*----------------------------------------------------------*/
function arrayEvery(array $arr, callable $callback): bool {
    /**
     * validate is array arr
     */
    if(is_array($arr)){
        /**
         * check whether assoc or indexed
         */
        if(isAssocArray($arr)){
            /**
             * loop associative array and apply callback
             */
            foreach($arr as $key => $value){
                if(!$callback($key, $value)){
                    return false;
                }
            }
            /**
             * return true if loop finished
             */
            return true;
        } else {
            /**
             * loop indexed array and apply callback
             */
            foreach($arr as $value){
                if(!$callback($value)){
                    return false;
                }
            }
            /**
             * return true if loop finished
             */
            return true;
        }
    } else {
        throw new Exception('Supplied parameter is not an array!');
        return false;
    }
}
/*----------------------------------------------------------*/
/**
 * array_every
 *
 * @param array $arr
 * @param callable $callback
 * @property array $acc accumulator
 * @return bool
 */
/*----------------------------------------------------------*/
function array_every(array $arr, callable $callback){
    $index  = 0;
    foreach($arr as $key=>$val){
        if(!$callback($key, $val, $index)){
            return false;
        }
        $index++;
    }
    return true;
}
/*----------------------------------------------------------*/
/**
 * arrayTraverse
 * 
 * @param array $arr
 * @param callable $callback
 * @param int $maxDepth default = null
 * @param int $currDepth default = 1
 * 
 * @property array $acc accumulator array
 * @return int|array
 */
/*----------------------------------------------------------*/
function arrayTraverse(array $arr, callable $callback,  int $maxDepth=null, int $currDepth=1){
    /**
     * TODO: FIX!!!
     * check for params
     * check for max-depth
     * check against current-depth
     */
    if(is_null($maxDepth) || $currDepth <= $maxDepth){
        /**
         * loop array elements
         */
        foreach($arr as $key=>$val){
            /**
             * use callback
             * feed properties into callback
             */
            $result = $callback($key, $val);
            /**
             * recursive call
             */
            if(is_array($val)){
                arrayTraverse($val, $callback, $maxDepth, $currDepth + 1);
            }
        }
    }
    return $result;
}
?>
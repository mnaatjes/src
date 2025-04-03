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
 * array_some - Checks if any (at least one) element of an array satisfies supplied condition
 * 
 * @param array $arr - Array of elements on which to perform condition
 * @param callable $callback - Function method to test
 * 
 * @return bool - True if at least one element matches condition of $callback | False no element meets condition
 * @throws TypeError - Argument $arr is not an array
 */
/*----------------------------------------------------------*/
function array_some(array $arr, callable $callback){
    /**
     * Validate Array
     */
    if(!is_array($arr) || count($arr) === 0){
        throw new TypeError('Argument supplied $arr is NOT an array or is empty!');
    }
    /**
     * Perform Loop with callback
     */
    $index  = 0;
    foreach($arr as $key=>$val){
        /**
         * Return 'true' if condition matched
         * Else Continue down array elements
         */
        if($callback($key, $val, $index)){
            return true;
        }
        $index++;
    }
    /**
     * None of the conditions have matched
     * Return false
     */
    return false;
}
/*----------------------------------------------------------*/
/**
 * array_every - 
 *
 * @param array $arr - 
 * @param callable $callback - 
 * 
 * @property int|string $key - Key for callback
 * @property mixed $val - Value of element for callback
 * @property int $index - Index of element for callback
 * 
 * @return bool - True if conditions all met | False if any condition fails
 * @throws TypeError - Argument $arr is not an array
 */
/*----------------------------------------------------------*/
function array_every(array $arr, callable $callback){
    /**
     * Validate Array
     */
    if(!is_array($arr) || count($arr) === 0){
        throw new TypeError('Argument supplied $arr is NOT an array or is empty!');
    }
    /**
     * Perform Loop with callback
     */
    $index  = 0;
    foreach($arr as $key=>$val){
        if(!$callback($key, $val, $index)){
            return false;
        }
        $index++;
    }
    /**
     * All conditions successful
     * Return True
     */
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
/*----------------------------------------------------------*/
/**
 * array_pivot - Pivots array at pivot element
 * 
 * TODO: FINISH
 * 
 * @param array $arr - associative array to pivot
 * @param int $ele - pivot element
 * @return array - pivoted 2d array
 */
/*----------------------------------------------------------*/
function array_pivot(array $arr): array{
    /**
     * Validate Array
     */
    if(!is_array($arr) || count($arr) === 0){
        return [];
    }
    /**
     * Return Array
     */
    return [];
}
/*----------------------------------------------------------*/
/**
 * array_zip - Take elements from the same index positions of different arrays and group them together
 * @param array ...$arrs - Array args to zip
 * @return array - zipped array grouped by index
 * 
 * @example 
 * ```
 *      $arrs = ['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h', 'i', 'j'], ['z', 'x']
 *      $max_len === int(6)
 *      // loop through supplied number of arrays(3) which becomes output size of each array of max_len(6)
 *      // returns 6 arrays of 3 elements
 *      //$inx  = [0]             [1]             [2]              [3]              [4]               [5]
 *      $result = ['a', 'e', 'z'],['b', 'f', 'x'],['c', 'g', null],['d', 'h', null],[null, 'i', null],[null, 'j', null]
 * ```
 */
/*----------------------------------------------------------*/
function array_zip(...$arrs): array {
    /**
     * Validate Array
     */
    if(!is_array($arrs) || count($arrs) === 0){
        throw new TypeError('Supplied argument must be a populated array!');
    }
    /**
     * Declare result array
     * Declare max length; determine max len of array args
     */
    $result  = [];
    $max_len = array_reduce($arrs, function($acc, $arr){
        // determine the highest value of count(current array);
        return max($acc, count($arr));
    }, 0);
    /**
     * Zip arrays
     */
    for($i = 0; $i < $max_len; $i++){
        // declare zipped element container
        $zipped = [];
        // iterate over arrays args
        foreach($arrs as $arr){
            // if array key doesn't exist, return null
            $zipped[] = $arr[$i] ?? null;
        }
        // push $zipped to $result
        $result[] = $zipped;
    }
    /**
     * Return result
     */
    return $result;
}
/*----------------------------------------------------------*/
/**
 * array_transpose - flip array over its diagonal; i.e. exchange rows and columns; e.g. [[m], [n]] --> [[n], [m]]
 * 
 * @param array $arr - Array to transpose (non-associative arrays!); Arrays must be of consistent length(counts)
 * @return array - Transposed array
 * @throws TypeError - Supplied array is associative array or jagged array
 * 
 * @example 
 * ```
 *      // given $matrix = [['A', 'B'],['C', 'D'],['E', 'F'], ['G', 'H']]
 *      // $result === [['A', 'C', 'E', 'G'], ['B', 'D', 'F', 'H']]
 * ```
 */
/*----------------------------------------------------------*/
function array_transpose(array $arr): array {
    /**
     * Validate Array | Ensure not assoc array | Ensure rectangular array
     */
    if(is_array_assoc_recursive($arr)){
        throw new TypeError('Supplied array CANNOT be an Associative Array');
    }
    if(!is_array_rect($arr)){
        throw new TypeError('Supplied Array MUST be rectangular: [[a, b, c], [e, f, g]');
    }
    /**
     * Count rows and columns
     */
    $row_num = count($arr);
    $col_num = count($arr[0]);
    /**
     * Declare results array and loop
     */
    $results = [];
    for($col = 0; $col < $col_num; $col++){
        // Declare row container
        $row_arr =[];
        for($row = 0; $row < $row_num; $row++){
            // Push to row container
            $row_arr[] = $arr[$row][$col];
        }
        // Push row to results
        $results[] = $row_arr;
    }
    /**
     * Return transposed array
     */
    return $results;
}
/*----------------------------------------------------------*/
/**
 * array_transpose_assoc - Flip array over its diagonal; i.e. exchange rows and columns; e.g. [[m], [n]] --> [[n], [m]]
 * 
 * @param array $arr - Array to transpose; Arrays must be of consistent length(counts) i.e. rectangular
 * @return array - Transposed array
 * @throws TypeError - Supplied array is associative array or jagged array
 * 
 * @example 
 * ```
 *      // given $matrix = [['A', 'B'],['C', 'D'],['E', 'F'], ['G', 'H']]
 *      // $result === [['A', 'C', 'E', 'G'], ['B', 'D', 'F', 'H']]
 * ```
 */
/*----------------------------------------------------------*/
function array_transpose_assoc(array $arr){
    throw new Error('Unfinished');
    /**
     * Validate is array and Array is not jagged
     */
    if(!is_array($arr)){
        throw new TypeError('Argument supplied is NOT an array!');
    }
    if(!is_array_rect($arr)){
        throw new TypeError('Supplied Array MUST be rectangular: [[a, b, c], [e, f, g]');
    }
    /**
     * Count rows and columns
     * Grab keys
     */
    $row_num = count($arr);
    $col_num = count(reset($arr));
    $keys    = array_keys($arr);
    /**
     * Declare results collector
     * Transpose
     */
    $results = [];
    for($col = 0; $col < $col_num; $col++){
        // Declare row container
        //$row_arr =[];
        for($row = 0; $row < $row_num; $row++){
            // Push to row container
        }
        // Push row to results
    }
    var_dump($results);
    /**
     * Return results array
     */
    return $results;
}
?>
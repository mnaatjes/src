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
    if(is_array($arr) && isAssocArray($arr)){
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
?>
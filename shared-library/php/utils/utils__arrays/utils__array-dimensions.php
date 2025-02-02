<?php
/*----------------------------------------------------------*/
/**
 * arrayHeight
 * 
 * @param array $arr array
 * 
 * @return int
 */
/*----------------------------------------------------------*/
function arrayHeight(array $arr){return count($arr);}
/*----------------------------------------------------------*/
/**
 * arrayDepth
 * 
 * @param array $arr associative array
 * 
 * @return int
 */
/*----------------------------------------------------------*/
function arrayDepth(array $arr): int{
    $max = 1;
    /**
     * loop elements
     */
    foreach($arr as $val){
        if(is_array($val)){
            $max = max($max, arrayDepth($val) + 1);
        }
    }
    return $max;
}
/*----------------------------------------------------------*/
/**
 * arrayWidth
 * 
 * @param array $arr array
 * 
 * @return int|array
 */
/*----------------------------------------------------------*/
function arrayWidth(array $arr){
    /**
     * check array depth
     */
    if(arrayDepth($arr) > 1){
        /**
         * check that all levels are equal length
         * loop array elements
         */
        $min = null;
        $max = null;
        foreach($arr as $ele){
            /**
             * check if ele is array
             * count sub-array or return 1
             */
            $curr = is_array($ele) ? count($ele) : 1;
            /**
             * set min
             */
            if($min == null || $curr < $min){
                $min = $curr;
            }
            /**
             * set max
             */
            if($max === null || $curr > $max){
                $max = $curr;
            }
        }
        /**
         * check min and max match
         * compose response
         */
        if($min === $max){
            return $max;
        } else {
            return ['min'=>$min, 'max'=>$max];
        }
    } else {
        /**
         * depth == 1
         */
        return count(array_keys($arr));
    }
}
/*----------------------------------------------------------*/
/**
 * objectHeight
 *
 * @param array $arr
 * @return int
 */
/*----------------------------------------------------------*/
function objectHeight(array $arr): int{
    $acc = 0;
    foreach($arr as $val){
        if(is_array($val)){
            $acc++;
        }
    }
    return ($acc === 0) ? 1: $acc;
}
?>
<?php
    /*----------------------------------------------------------*/
    /**
     * time_build - Builds timestamp from parameters
     * 
     * @param int $hours - 2 digit hour; Default to current
     * @param int $minutes - 2 digit minutes; Default to current
     * @param int $seconds - 2 digit seconds; Default to current
     * @param array [$options] - Configuration and output options
     * 
     * @return int - UNIX time format
     */
    /*----------------------------------------------------------*/
    function time_build(int $hours, int $minutes, int $seconds, array $options=[]){
        /**
         * Validate params:
         * 1) Negative
         * 2) Range
         */
        if($hours > 23 || $hours < 0){
            throw Error('Parameters CANNOT be Negative! Hours range: 0-23');
        }
        if($minutes > 59 || $minutes < 0){
            throw Error('Parameters CANNOT be Negative! Minutes range: 0-59');
        }
        if($seconds > 59 || $seconds < 0){
            throw Error('Parameters CANNOT be Negative! Seconds range: 0-59');
        }
        /**
         * Generate time string
         */
        $time_str = sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
        /**
         * Attempt to built time
         * Catch potential errors
         */

        var_dump($time_str);
    }
?>
<?php
    /*----------------------------------------------------------*/
    /**
     * Sanitize Array Data. Recursive
     * 
     * @param array|object $data
     * @return array|bool - Returns sanitized data if successful | returns False
     */
    /*----------------------------------------------------------*/
    function sanitize_data(array $data){
        /**
         * Validate Data
         */
        if(!is_array($data) && !is_object($data)){
            throw new TypeError(sprintf('sanitize_data() expects an Array! or Object! %s supplied', gettype($data)));
        }
        if(count($data) === 0){
            return [];
        }
        /**
         * Declare $results array
         * Filter and sanitize
         */
        $results = [];
        foreach($data as $key => $val){
            /**
             * Sanitize key
             */
            $key = preg_replace('/[^a-zA-Z0-9_]/', '', $key);
            /**
             * Check by datatype
             */
            switch(gettype($val)){
                // Array
                case 'array':
                    $results[$key] = sanitize_array($val);
                    break;
                // Boolean
                case 'boolean':
                    $results[$key] = sanitize_bool($val);
                    break;
                // Numbers
                case 'integer':
                case 'double':
                    $results[$key] = sanitize_number($val);
                    break;
                // string
                case 'string':
                    $results[$key] = sanitize_string($val);
                    break;
                // object
                case 'object':
                    $results[$key] = sanitize_data($val);
                    break;
                // resource
                case 'resource':
                case 'resource (closed)':
                    break;
                // Null
                case 'NULL':
                    break;
                // unknown type
                case 'unknown type':
                    $results[$key] = '';
                    break;
                default:
                    $results[$key] = sanitize_string($val);
                    break;
            }
        }
        /**
         * Return Sanitized Array
         */
        return $results;
    }
    /*----------------------------------------------------------*/
    /**
     * Sanitize String
     * 
     * @param string $str
     * @return string|bool - Returns sanitized string
     */
    /*----------------------------------------------------------*/
    function sanitize_string(string $str){
        /**
         * Validate string | numeric string
         */
        if(!is_string($str)){
            throw new TypeError('Argument must be a string!');
        }
        /**
         * Check if value is numeric
         */
        if(is_numeric($str)){
            return sanitize_number($str);
        }
        /**
         * Check if string is a boolean value
         */
        if(in_array(trim(strtolower($str)), ['true', 'false'], true)){
            return sanitize_bool($str);
        }
        /**
         * Check if "null" string
         */
        if(strtolower($str) === 'null'){
            return null;
        }
        /**
         * Filter, Sanitize and return string
         */
        $filter = filter_var(trim($str), FILTER_SANITIZE_SPECIAL_CHARS);
        if($filter === false){
            return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
        }
        return $filter;
    }
    /*----------------------------------------------------------*/
    /**
     * Sanitize Number
     * 
     * @param int|float|numeric $num - Integer, float, numeric string
     * @return int|float|bool - Returns sanitized int|float | False
     */
    /*----------------------------------------------------------*/
    function sanitize_number($num){
        /**
         * Check if argument is a numeric string
         */
        if(is_string($num) && is_numeric($num)){
            // return sanitize_number()
            $num = (strpos($num, '.') || stripos($num, 'e')) ? floatval($num) : intval($num);
        } else if(is_string($num) && !is_numeric($num)){
            throw new TypeError('sanitize_number() expects argument to be a Numeric String, Int, or Float value!');
        }
        /**
         * Validate $num is an int|float
         */
        if(!is_int($num) && !is_float($num)){
            throw new TypeError('sanitize_number() expects argument to be a Numeric String, Int, or Float value!');
        }
        /**
         * Sanitize and return
         */
        if(is_int($num)){
            return filter_var($num, FILTER_VALIDATE_INT);
        } else {
            return filter_var($num, FILTER_VALIDATE_FLOAT);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Sanitize and Filter Boolean
     * 
     * @param string|bool|int|float $bool - Either a string boolean or a boolean value or boolean number
     * @return bool - filtered boolean value
     */
    /*----------------------------------------------------------*/
    function sanitize_bool($bool){
        if(!is_bool($bool) && !is_string($bool) && !is_numeric($bool)){
            throw new TypeError(sprintf('sanitize_bool expects a boolean value (in boolean, string, or numeric form)! %s provided instead', gettype($bool)));
        }
        /**
         * Return
         */
        return filter_var($bool, FILTER_VALIDATE_BOOLEAN);
    }
?>
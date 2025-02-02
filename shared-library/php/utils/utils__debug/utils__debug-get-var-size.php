<?php
/*----------------------------------------------------------*/
/**
 * getVarSize
 * @param mixed $var
 * @param string $int
 * 
 * @return int - length / count of variable supplied
 */
/*----------------------------------------------------------*/
function getVarSize($var, string $type): int{
    switch($type){
        /**
         * type = array
         */
        case 'array':
            return count($var);
        /**
         * type = object
         */
        case 'object':
            /**
             * check if countable
             */
            if($var instanceof Countable){
                return count($var);
            } else {
                return 0;
            }
        /**
         * type = numbers (int | float | numeric)
         */
        case 'int':
        case 'float':
        case 'numeric':
            /**
             * convert to string then return
             */
            return strlen((string)$var);
        /**
         * type = string
         */
        case 'string':
            return strlen($var);
        /**
         * type = default: (!isset | undefined | null)
         */
        default:
            return 0;
    }
}
?>
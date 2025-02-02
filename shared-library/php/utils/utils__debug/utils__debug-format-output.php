<?php
/*----------------------------------------------------------*/
/**
 * formatOutput
 *
 * @param mixed $var
 * @param integer $indent
 * @param bool $nested default=false
 * @param bool $isObj default=false
 * 
 * @example string(length) "stringName"
 * @example int
 * example array()
 * @return string
 */
/*----------------------------------------------------------*/
function formatOutput($var, int $indent, bool $nested=false, bool $isObj=false): string{
    /**
     * declare props:
     * 
     * @property string $type       - typeof $var
     * @property string $size       - count of $var elements
     * @property string $varName    - name of $var
     * @property string $indent_str - indent spaces
     * @property string $value      - string value of the $var supplied
     * @property string $output     - output string declared
     */
    $space      = '&nbsp;';
    $type       = (gettype($var) == 'double') ? 'float' : gettype($var);
    $size       = getVarSize($var, $type);
    $indent_str = str_repeat($space, 5);
    $value      = '';
    $output     = '';
    /**
     * prepend information to output if NOT nested
     *      file information
     *      data type
     *      data size
     */
    /**
     * sourt by type of value
     */
    if(is_array($var)){
        $output .= sprintf('<b>%s</b>(%s)  ', $type, $size);
        /**
         * variable is an array (indexed | assoc)
         * new line and indent
         */
        foreach($var as $key=>$val){
            /**
             * format array keys
             */
            if(is_numeric($key)){
                $output .= sprintf('<br>%s %s => ', $indent_str, $key);
            } else {
                $output .= sprintf('<br>%s "%s" => ', $indent_str, $key);
            }
            /**
             * grab array values
             */
            $output .= formatOutput($val, 0, true);
        }
    } elseif(is_object($var)){
        /**
         * variable is object
         */
    } elseif(is_numeric($var)){
        /**
         * variable is number (int | float / double | numeric)
         */
        $output .= $var;
    } elseif(is_string($var)){
        if($nested){
            $output .= sprintf('%s (%s)  ', $type, $size);    
        } else {
            $output .= sprintf('<b>%s</b>(%s)  ', $type, $size);
        }
        /**
         * variable is a string
         * string props:
         * @property int $len   - string length value
         */
        $len = strlen($var);
        /**
         * check for empty string
         */
        if(empty($var)){

        } else {
            /**
             * format string if long
             * TODO: add func to click on longer strings and reveal
             */
            $cutoff = 50;
            if($len > $cutoff){
                $output .= '"' . replaceStrOutput(substr($var, 0, $cutoff) . '...', $var) . '"';
            } else {
                $output .= '"'. $var . '"';
            }
        }
        /**
         * append output
         */
        //$output .= sprintf('<b>%s(%s)</b> "%s"', $type, $len, $value);
    } elseif (is_resource($var)){
        /**
         * variable is a resource
         */
    } elseif(is_null($var)){
        /**
         * variable is null
         */
    } elseif(!isset($var)){
        /**
         * variable is NOT set | undefined
         */
    } else {
        /**
         * Unknown | Remain | Debugging
         */
        $output .= sprintf('Variable is of unknown datatype!');
    }
    /**
     * return output string
     */
    return $output;
}
?>
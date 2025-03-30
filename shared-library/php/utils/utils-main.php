<?php 
    /*----------------------------------------------------------*/
    /**
     * Requires:    debug, array-methods, array-property-methods, 
     *              array-dimension-methods
     */
    /*----------------------------------------------------------*/
    /**
     * Error Utilities
     */
    /**
     * Debugging Utilities
     */
    require_once 'utils__debug/utils__debug-main.php';
    /**
     * Logging Utilities
     */
    require_once 'utils__logging/log_dump.php';
    require_once 'utils__logging/log_errors.php';
    /**
     * array methods
     */
    require_once 'utils__arrays/utils__array-methods.php';
    /**
     * array dimension methods
     */
    require_once 'utils__arrays/utils__array-dimensions.php';
    /**
     * array property methods
     */
    require_once 'utils__arrays/utils__array-props.php';
    /**
     * string methods
     */
    require_once 'utils__strings/utils__strings.php';
    /**
     * Encryption Utilities
     */
    require_once 'utils__encrypt.php';
    /*----------------------------------------------------------*/
    /**
     * CONSTANTS
     */
    /*----------------------------------------------------------*/
    /**
     * Constants
     */
    require_once 'utils__constants.php';
    /*----------------------------------------------------------*/
    /**
     * enableErrors
     *
     * @param void
     * @return void
     */
    /*----------------------------------------------------------*/
    function enableErrors(){
        ini_set('display_errors', 1); 
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL); 
    }
    /*----------------------------------------------------------*/
    /**
     * isJsonstr
     * 
     * @param mixed $data
     * @param bool $assoc
     * @return array|bool   true if supplied data is a json string
     *                      json returned is assoc array
     *                      NOT array of objects
     */
    /*----------------------------------------------------------*/
    function isJSONstr($data, bool $assoc=true){
        $res = false;
        /**
         * check if string
         */
        if(!is_string($data)){
            return false;
        }
        /**
         * try parsing
         */
        try {
            /**
             * try decoding
             */
            $res = json_decode($data, $assoc);
        } catch (JsonException $e){
            /**
             * could not decode properly
             */
            return false;
        }
        /**
         * json decode worked
         * return true
         */
        return $res;
    }
    /*----------------------------------------------------------*/
    /**
     * formatVarDump
     *
     * @param mixed $data
     * @return string
     */
    /*----------------------------------------------------------*/
    function formatVarDump($data){
        /**
         * catch type string and bold
         */
        return sprintf('<pre>%s</pre>', htmlspecialchars($data));
    }
    /*----------------------------------------------------------*/
    /**
     * console
     *
     * @param mixed $var
     * @property array $styles style property of div container tag
     * @property string $container container div tag
     * 
     * @return string
     */
    /*----------------------------------------------------------*/
    function console($var){
        /**
         * defined style props
         * format style props
         */
        $containerStyles = arrayJoin(
            [
                'color'             => '#1d301d',
                'background-color'  => '#d3f8d3',
                'font-size'         => '12px',
                'border-bottom'     => '1px solid #666',
                'width'             => '100%',
                'margin-bottom'     => '12px',
                'padding'           => '24px',
                'font-family'       => 'Arial',
                'box-shadow'        => '1px 1px 1px 2px rgba(0,0,0, 0.2)'
            ], '', ':', '; '
        );
        $titleStyles = arrayJoin(
            [
                'display' => 'block',
                'margin-bottom' => '12px'
            ], '', ':', ';'
        );
        /**
         * capture output of var_dump
         */
        ob_start();
        //var_export($var);
        var_dump($var);
        /**
         * format variable data
         */
        $output = ob_get_clean();
        $output = formatVarDump($output);
        /**
         * backtrace file and line
         */
        $trace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1)[0];
        /**
         * grab function name
         * perform match
         * get variable name
         */
        $varName    = '';
        $varLine    = file($trace['file'])[$trace['line'] -1];
        $pattern    = '/' . preg_quote(__FUNCTION__, '/') . '\(\$(\w+)\);/';
        if(preg_match($pattern, $varLine, $matches)){
            $varName = $matches[1];
        }
        /**
         * format titles
         */
        $titles = '';
        foreach(['(file)'=>$trace['file'], '(line)'=>$trace['line'], '(variable)'=>$varName] as $key => $val){
            $titles .= sprintf('<b style="%s">%s: %s </b>', $titleStyles, $key, $val);
        }
        /**
         * build var dump and print to screen
         */
        printf('<div style="%s">%s%s</div>', $containerStyles, $titles, $output);
    }
?>
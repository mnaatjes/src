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
     * isJson
     * 
     * @param mixed data
     * @return boolean true if supplied data is a json string
     */
    /*----------------------------------------------------------*/
    function isJSON($data){
        json_decode($data);
        return json_last_error() === JSON_ERROR_NONE;
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
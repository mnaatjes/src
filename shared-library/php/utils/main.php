<?php 
    /*----------------------------------------------------------*/
    /**
     * Depreciated
     */
    /*----------------------------------------------------------*/
    //require_once 'debugging/';
    /*----------------------------------------------------------*/
    /**
     * Logging Utilities
     */
    /*----------------------------------------------------------*/
    require_once 'logging/log_dump.php';
    require_once 'logging/log_errors.php';
    /*----------------------------------------------------------*/
    /**
     * Array Utilities
     */
    /*----------------------------------------------------------*/
    //  Methods
    //  Properties
    /**
     * array methods
     */
    require_once 'utils__arrays/utils__array-methods.php';
    /**
     * array dimension methods
     */
    require_once 'utils__arrays/utils__array-dimensions.php';
    require_once 'utils__arrays/utils__in_array_recursive.php';
    require_once 'utils__arrays/utils__array_search_recursive.php';
    /**
     * array property methods
     */
    require_once 'utils__arrays/utils__array-props.php';
    /**
     * Array Compare
     */
    require_once 'utils__arrays/utils__array-assoc-compare.php';
    /*----------------------------------------------------------*/
    /**
     * String Methods
     */
    /*----------------------------------------------------------*/
    require_once 'strings/gettype_string.php';
    require_once 'strings/is_string_filepath.php';
    require_once 'strings/is_string_url.php';
    require_once 'strings/strpos_from_array.php';
    /*----------------------------------------------------------*/
    /**
     * PHP.ini utilities
     */
    /*----------------------------------------------------------*/
    require_once 'ini/ini_parse_byte_str.php';
    require_once 'ini/ini_errors_enable.php';
    /*----------------------------------------------------------*/
    /**
     * Date Time Utilities
     */
    /*----------------------------------------------------------*/
    require_once 'date_time/constants.php';
    require_once 'date_time/get_last_day_month.php';
    require_once 'date_time/date_build.php';
    require_once 'date_time/time_build.php';
    require_once 'date_time/random_date.php';
    /*----------------------------------------------------------*/
    /**
     * Encryption Utilities
     */
    /*----------------------------------------------------------*/
    require_once 'utils__encrypt.php';
    /*----------------------------------------------------------*/
    /**
     * Sanitation Utilities
     */
    /*----------------------------------------------------------*/
    require_once 'utils__sanitize.php';
    /*----------------------------------------------------------*/
    /**
     * File Utilities
     */
    /*----------------------------------------------------------*/
    require_once 'files/is_file_csv.php';
    require_once 'files/file_normalize_path.php';
    /*----------------------------------------------------------*/
    /**
     * Misc Utilities
     */
    /*----------------------------------------------------------*/
    require_once 'random_bool.php';
    /*----------------------------------------------------------*/
    /**
     * CONSTANTS
     */
    /*----------------------------------------------------------*/
    require_once 'utils__constants.php';
    /*----------------------------------------------------------*/
    /**
     * Classes and Objects
     */
    /*----------------------------------------------------------*/
    require_once 'config/config_generator.php';
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
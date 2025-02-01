<?php
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
     * formatDebug
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
    /**
     * revealStrOutput
     * 
     * @param string $hidden
     * @param string $visible
     * 
     * @return string 
     */
    function revealStrOutput(string $hidden, string $visible): string{
        return sprintf('<span style="display: none;">%s</span><i style="cursor: pointer" onclick="reveal(this)">%s</i><br><br>', $hidden, $visible);
    }
    /**
     * replaceStrOutput
     * 
     * @param string $replace   - replacement string
     * @param string $original  - original string
     * 
     * @return string
     */
    function replaceStrOutput(string $original, string $replace): string{
        return sprintf('<span style="cursor: pointer" onclick="replace(this)">%s</span><span style="display:none;">%s</span><br><br>', $original, $replace);
    }
    /**
     * getVarSize
     * 
     * @param mixed $var
     * @param string $int
     * 
     * @return int - length / count of variable supplied
     */
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
    /*----------------------------------------------------------*/
    function formatDebug($var, int $indent, bool $nested=false, bool $isObj=false): string{
        /**
         * declare props:
         * 
         * @property array $trace       - returns array of trace elements
         * @property string $type       - typeof $var
         * @property string $varName    - name of $var
         * @property string $filePath   - filepath from trace
         * @property array  $pathInfo   - information on the $var filePath
         * @property string $line       - line from trace
         * @property string $indent_str - indent spaces
         * @property string $value      - string value of the $var supplied
         * @property string $output     - output string declared
         */
        $trace      = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1)[0];
        $type       = (gettype($var) == 'double') ? 'float' : gettype($var);
        $varName    = '';
        $line       = $trace['line'];
        $filePath   = $trace['file'];
        $fileName   = pathinfo($filePath)['basename'];
        $fileInfo   = revealStrOutput(substr($filePath, 0, strpos($filePath, $fileName)), $fileName . ' : ' . $line);
        $indent_str = str_repeat(' ', $indent);
        $size       = getVarSize($var, $type);
        $value      = '';
        $output     = '';
        /**
         * prepend information to output if NOT nested
         *      file information
         *      data type
         *      data size
         */
        if(!$nested){
            $output .= $fileInfo;
            $output .= sprintf('<b>%s</b>(%s)  ', $type, $size);
        }
        /**
         * sourt by type of value
         */
        if(is_array($var)){
            /**
             * variable is an array (indexed | assoc)
             */
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
                    $output .= replaceStrOutput(substr($var, 0, $cutoff) . '...', $var);
                } else {
                    $output .= $var;
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
    /*----------------------------------------------------------*/
    /**
     * debug
     *
     * @param mixed $var
     * @param int $indent
     * 
     * @property string $output
     * @return void
     */
    /*----------------------------------------------------------*/
    function debug($var, int $indent=2){
        /**
         * call formatting function
         */
        $result = '';
        $result .= formatDebug($var, $indent);
        /**
         * create reveal function and append to document
         */
        $jsFunc     = sprintf('
            function reveal(ele){
                let prev = ele.previousElementSibling;
                prev.style.display = "inline-block";
                ele.style.cursor = "default";
            };

            function replace(ele){
                let next = ele.nextElementSibling;
                next.style.display = "inline-block";
                ele.style.display = "none";
                ele.style.cursor = "none";
            };
        ');
        $jsScript   = printf('<script>%s</script>', $jsFunc);
        /**
         * main stylesheet
         */
        $cssContainer = arrayJoin(
            [
                'display'           => 'block',
                'color'             => '#590d22',
                'background-color'  => '#ffc2c2',
                'font-size'         => '12px',
                'border-bottom'     => '1px solid #666',
                'width'             => '100%',
                'margin'            => '0 auto 12px auto',
                'padding'           => '24px',
                'font-family'       => 'Arial',
                'line-height'       => '1.5',
                'box-shadow'        => '1px 1px 1px 2px rgba(0,0,0, 0.2)',
            ], '', ':', '; '
        );
        /**
         * print output
         */
        printf('<div style="%s">%s</div>', $cssContainer, $result);
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
    function arraySome(array $arr, callable $callback): bool {

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
     * arrayDepth
     * 
     * @param array $arr associative array
     * 
     * @return int
     */
    /*----------------------------------------------------------*/
    function arrayDepth(array $arr){
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
?>
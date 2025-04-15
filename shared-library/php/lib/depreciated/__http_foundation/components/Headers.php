<?php
    /*----------------------------------------------------------*/
    /**
     * HTTP Header Object.
     * - Sets and Gets headers
     * - Sends Headers
     * - Checks headers
     */
    /*----------------------------------------------------------*/
    class Headers implements Countable {
        /**
         * 
         */
        private bool $is_response;
        /**
         * @var array $properties All header properties in a protected array
         */
        protected array $properties = [];
        /**
         * @var object $errors Object
         */
        protected object $errors;
        /**
         * @var bool $is_response - Determines if the Headers instance represents a Response or Request header; Default = false;
         */
        /*----------------------------------------------------------*/
        /**
         * Construct.
         * - Sets initial state of headers
         */
        /*----------------------------------------------------------*/
        public function __construct(bool $is_response=false, ?array $server_params=null){
            /**
             * Set $is_response property
             */
            $this->is_response = $is_response;
            /**
             * Create new Errors instance
             */
            $this->errors = new Errors();
            /**
             * Determine $is_response:
             */
            if($this->is_response){
                /**
                 * Response Headers:
                 */
                $this->sanitizeServerParams($server_params);
                $this->status_code = 200;
            } else {
                /**
                 * Request Headers: 
                 */
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Magic Method: Getter
         * - Gets header property from $data
         * @param string $name
         * @return string from $properties array
         * - Implodes array of values with ","
         * - Returns a
         */
        /*----------------------------------------------------------*/
        public function __get(string $name){
            /**
             * Normalize $name
             */
            $name = $this->normalizeHeader($name);
            if(array_key_exists($name, $this->properties)){
                return implode(', ', $this->properties[$name]);
            } else {
                return null;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Magic Method: Setter
         * - Sets header property onto $data
         * @param string $name
         * @param string $value
         */
        /*----------------------------------------------------------*/
        public function __set(string $name, string $value=''){
            /**
             * Normalize $name
             */
            $name = $this->normalizeHeader($name);
            /**
             * Set property value before insertion:
             * - Explode $value string if delimited by "," for multiple values
             * - Do not explode properties in $skip_names array
             * - Cast $value as an array
             */
            $values = [];
            /**
             * @var array $skip_names Header properties not to explode into discrete values
             */
            $skip_names = ['User-Agent'];
            if(!in_array($name, $skip_names)){
                $values = explode(',', $value);
            } else {
                $values[] = $value;
            }
            /**
             * Set to properties array:
             * - Check if Property already exists
             */
            if(array_key_exists($name, $this->properties)){
                /**
                 * Property set:
                 * - Properties[name] is an array
                 * - Merge array with values array
                 */
                $this->properties[$name] = array_merge($this->properties[$name], $values);
            } else {
                /**
                 * Property not initialized / set
                 * - Generate property as an array
                 * - Cast $value string as it's own array
                 */
                $this->properties[$name] = $values;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Magic Method: Checks if a specific header is set in the $properties array
         * @param string $name
         * @return bool True is isset | False if not
         */
        /*----------------------------------------------------------*/
        public function __isset(string $name){
            /**
             * Normalize name
             * Return isset
             */
            $name = $this->normalizeHeader($name);
            /**
             * Return value of isset()
             */
            return isset($this->properties[$name]);
        }
        /*----------------------------------------------------------*/
        /**
         * Magic Method: Removes header property
         * - Removes property from Object{$properties[$name]}
         * - Removes property from headers_list()
         * @param string $name
         */
        /*----------------------------------------------------------*/
        public function __unset(string $name){
            /**
             * Normalize and validate
             */
            if(empty(trim($name))){
                return;
            }
            $name = $this->normalizeHeader($name);
            /**
             * Check if set in properties
             */
            if(isset($name)){
                unset($this->properties[$name]);
            }
            /**
             * Check if set in headers list
             */
            if(array_key_exists($name, $this->getList())){
                // Remove from set headers_list()
                header_remove($name);
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Checks if header exists in $properties array
         * @param string $name
         * @return bool True if exists in $properties array | False if not set
         */
        /*----------------------------------------------------------*/
        public function has(string $name){
            $name = $this->normalizeHeader($name);
            return array_key_exists($name, $this->properties);
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Checks to see if header has been set and exist in headers_list()
         * @param string $name
         * @return bool
         */
        /*----------------------------------------------------------*/
        public function inList(string $name): bool{
            $name = $this->normalizeHeader($name);
            return array_key_exists($name, $this->getList());
        }
        /*----------------------------------------------------------*/
        /**
         * Returns the header array $properties for viewing and debugging
         * @param void
         * @return array
         */
        /*----------------------------------------------------------*/
        public function getProperties(){return $this->properties;}
        /*----------------------------------------------------------*/
        /**
         * Chain Method: Send Headers
         * @return self Writes headers to php document
         */
        /*----------------------------------------------------------*/
        public function send(): self{
            /**
             * Validate method
             */
            if(!$this->is_response){
                trigger_error('Cannot use Object->send() with a Request Header!');
                return $this;
            }
            /**
             * Check if headers already set
             * - If set, deny resending
             */
            if(headers_sent()){
                /**
                 * Cannot send more headers
                 * Headers already sent
                 * Return object
                 */
                return $this;
            } else {
                /**
                 * Check that headers are set
                 */
                if(empty($this->properties)){
                    // Headers Empty; Cannot Sent
                    return $this;
                }
                /**
                 * Define headers() and return true on completion
                 * - Send Status Line
                 * - Send Date line
                 */
                header(sprintf('%s %d %s', $this->protocol, $this->status_code, HTTP_STATUS[intval($this->status_code)]));
                /**
                 * Loop properties and set headers
                 */
                foreach($this->properties as $key => $values){
                    if(is_array($values)){
                        $values = implode(", ", $values);
                    }
                    header(sprintf('%s: %s', $key, $values));
                }
                /**
                 * Return self
                 */
                return $this;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Clears all headers using header_remove(null)
         * @return self
         */
        /*----------------------------------------------------------*/
        public function clear(): self{header_remove(null); return $this;}
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Returns headers_list() parsed by property name
         * @return array Parsed headers_list() array in key, value pairs
         */
        /*----------------------------------------------------------*/
        public function getList(): array{
            /**
             * Validate headers_list()
             */
            if(!is_array(headers_list())){
                return [];
            }
            if(empty(headers_list())){
                return [];
            }
            /**
             * Loop headers and split into key, value pairs
             */
            $pairs = [];
            foreach(headers_list() as $item){
                if(strpos($item, ":") !== false){
                    // Separate key from values
                    list($key, $values) = explode(":", $item, 2);
                    // Normalize key
                    $key = $this->normalizeHeader($key);
                    // Explode values by comma
                    $values = explode(",", trim($values));
                    /**
                     * Push to $pairs array:
                     * - Check if $key already exists
                     * - Append $values or merge $values
                     */
                    if(key_exists($key, $pairs)){
                        // Merge with existing value
                        $pairs[$key] = array_merge($pairs[$key], $values);
                    } else {
                        // Header not previously added to $pairs
                        $pairs[$key] = $values;
                    }
                }
            }
            /**
             * Return parsed headers
             */
            return $pairs;
        }
        /*----------------------------------------------------------*/
        /**
         * Request Method: Sanitize and Validate Server Parameters ($_SERVER)
         * @param array|null $server_params
         * @return bool True if successful; false if not
         */
        /*----------------------------------------------------------*/
        private function sanitizeServerParams(?array $server_params=null){
            /**
             * Validate param:
             * - Check if null
             * - User $_SERVER if null
             * - Check $_SERVER
             */
            if(is_null($server_params)){
                if(isset($_SERVER) && !empty($_SERVER)){
                    $server_params = $_SERVER;
                } else {
                    // Could not find $_SERVER and no params submitted
                    return false;
                }
            }
            /**
             * Declare $results array and loop properties of $_SERVER
             */
            $results = [];
            foreach($server_params as $prop => $val){
                /**
                 * Evaluate by data-type of value:
                 * - String
                 * - Array
                 * - Other: int, float/double, null, objects
                 */
                if(is_string($val)){
                    // Sanitize string values
                    $results[$prop] = filter_var($val, FILTER_DEFAULT);
                    /**
                     * Refine validation and filters per property
                     * - Null values if filter fails
                     * - Populate $errors array if $on_failure === 1
                     */
                    switch(strtoupper($prop)){
                        // Validate IP Address
                        case 'REMOTE_ADDR':
                            if(filter_var($results[$prop], FILTER_VALIDATE_IP) === false){
                                $results[$prop] = null;
                            }
                            break;
                        // Validate Request Method
                        case 'REQUEST_METHOD':
                            if(!in_array(strtoupper($val), VALID_HTTP_METHODS)){
                                $results[$prop] = null;
                            }
                            break;
                        // Referrer - URL page of the referred user
                        case 'HTTP_REFERER':
                            // Validate URL
                            if(filter_var($results[$prop], FILTER_VALIDATE_URL) === false){
                                $results[$prop] = null;
                            }
                            break;
                        // Port Number
                        case 'SERVER_PORT':
                            $config = [
                                'options' => [
                                    'min_range' => 1,
                                    'max_range' => 65535
                                ]
                            ];
                            if(filter_var($results[$prop], FILTER_VALIDATE_INT, $config) === false){
                                $results[$prop] = null;
                            }
                            break;
                        // Validate HTTP Protocols
                        case 'HTTP_PROTOCOL':
                            if(!in_array(strtoupper($results[$prop]), VALID_HTTP_PROTOCOLS)){
                                $results[$prop] = null;
                            }
                            break;
                        }
                } else if(is_array($val)){
                    // Recursively check value
                    $results[$prop] = sanitize_server_data($val);
                }
            }
            /**
             * Call parseServerParams()
             * - Parses values from $_SERVER
             * - Validate parsed array
             * - Normalizes property names
             * - Set headers
             */
            $parsed_parms = $this->parseServerParams($results);
            if(is_null($parsed_parms)){
                return false;
            }
            foreach($parsed_parms as $name => $value){
                /**
                 * Set each property and value
                 * - Normalizes each value
                 */
                $this->$name = $value;
            }
            /**
             * Return True on success
             */
            return true;
        }
        /*----------------------------------------------------------*/
        /**
         * Request Method: Parse Server Parameters ($_SERVER)
         * - Capture serverParameters from $_SERVER
         * - Filter and Validate $_SERVER
         * @param array|null $server_params
         * @return array 
         */
        /*----------------------------------------------------------*/
        private function parseServerParams(?array $server_params=null){
            /**
             * Validate params passed are an array and not null
             */
            if(!is_array($server_params)){
                return null;
            }
            /**
             * Declare Results array
             */
            $results = [];
            // Loop Server Parameters
            foreach ($server_params as $key => $value) {
                /**
                 * TODO: Distinguish between Server and Client parameters
                 */
                /**
                 * Format Header Keys
                 * - Strip HTTP from properties
                 * - Return Lowercase Keys
                 */
                if (strpos($key, 'HTTP_') === 0) {
                    /**
                     * Format HTTP_ properties and push
                     */
                    $key = str_replace('HTTP_', '', $key);
                    $results[strtolower($key)] = $value;
                } else if (str_starts_with($key, 'CONTENT_')) {
                    /**
                     * Check CONTENT_TYPE for boundary
                     */
                    if($key === 'CONTENT_TYPE' && preg_match('/^([^;]+)(?:;\s*boundary=(.+))?$/', $value, $matches)){
                        $results[strtolower($key)]   = $matches[1];
                        $results['content_boundary'] = $matches[2];
                    } else {
                        /**
                         * Grab CONTENT properties
                         * Format and push to array
                         */
                        $results[strtolower($key)] = $value;
                    }
                } else if(str_starts_with($key, 'SERVER_')){
                    $key = substr($key, strlen('SERVER_'));
                    $results[strtolower($key)] = $value;
                }
            }
            /**
             * Validate $results array and return
             */
            if(empty($results) || is_null($results)){
                return null;
            }
            return $results;
        }
        /*----------------------------------------------------------*/
        /**
         * Private Method: Normalizes header property name
         * @param string $name
         * @return string Normalized property name
         */
        /*----------------------------------------------------------*/
        private function normalizeHeader(string $name){
            /**
             * Normalize:
             * - Camelcase or snake_case to hyphen replace
             * - Capitalize each letter beginning word or after hyphen
             * - Replace underscore "_" or CamelCase with hyphen "-"
             * - Trim
             */
            if(str_has_delimiter($name, '_')){
                $name = str_snake_to_kebab($name, CASE_CAPS);
            } else {
                $name = str_camel_to_kebab($name, CASE_CAPS);
            }
            /**
             * Alter Ch_Ua to upper
             */
            $name = str_replace_substr($name, 'Ch-Ua', CASE_UPPER);
            /**
             * Trim and return
             */
            return trim($name);
        }
        /*----------------------------------------------------------*/
        /**
         * Implementation Method: Counts elements of object
         * @return int Count of $this->properties
         */
        /*----------------------------------------------------------*/
        public function count(): int{
            return count($this->properties);
        }
        /*----------------------------------------------------------*/
        /**
         * Implementation Method: Makes object iterable
         * - Automatically Called by php when foreach() used on Object
         * @return ArrayIterator Returns $this->properties
         */
        /*----------------------------------------------------------*/
        public function getIterator() {
            return new ArrayIterator($this->properties);
        }
    }
?>
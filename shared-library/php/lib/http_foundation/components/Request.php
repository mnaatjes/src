<?php
    /*----------------------------------------------------------*/
    /**
     * HTTP Request Object.
     * - Contains the properties and methods of an incoming HTTP Request.
     * - Provides sanitation and validation for incoming data.
     */
    /*----------------------------------------------------------*/
    class Request {
        /**
         * @var array $serverParams A container for the $_SERVER superglobal.
         * - If not passed directly into the object; captured from $_SERVER superglobal.
         * - Default value is null.
         * - Passed as parameter for debugging purposes also.
         */
        public ?array $serverParams = [];
        /**
         * @var array $headers Content of HTTP headers from $_SERVER superglobal
         */
        public array $headers = [];
        /**
         * @var array $errors Errors array for request object
         * - Collects errors from the validation and sanitation precesses
         */
        public ?array $errors = [
            'sanitation' => [],
            'validation' => [],
            'headers' => []
        ];
        /**
         * @var string $document_root
         */
        public ?string $document_root; 
        /**
         * @var string $method
         */
        public ?string $method; 
        /*----------------------------------------------------------*/
        /**
         * Constructor.
         * - Capture $_SERVER parameters
         * - Sanitize, validate, and parse HTTP headers
         */
        /*----------------------------------------------------------*/
        public function __construct($serverParams=null){
            $this->serverParams  = self::sanitizeServerParams($serverParams ?? $_SERVER);
            $this->headers       = $this->parseHeaders($this->serverParams);
            $this->document_root = self::getDocumentRoot($this->serverParams);
            $this->method        = self::getRequestMethod($this->serverParams);
        }
        /*----------------------------------------------------------*/
        /**
         * Sanitize $_SERVER parameters.
         * - Sanitizes all strings
         * - Special considerations for certain properties
         * - Recursively checks array properties
         * - Check REQUEST_METHOD against array of valid methods
         * @param array $params Server parameters from $_SERVER
         * @param null|mixed $default Default value to return if property missing
         * @return array|null - Returns a sanitized array of $_SERVER parameters
         */
        /*----------------------------------------------------------*/
        public static function sanitizeServerParams(?array $params=null, $default=null): ?array{
            // Check that $_SERVER is set 
            if(!isset($params) && !is_array($params)){
                return $default;
            }
            /**
             * Declare $results array and loop properties of $_SERVER
             */
            $results = [];
            foreach($params as $prop => $val){
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
                            $options = [
                                'options' => [
                                    'min_range' => 1,
                                    'max_range' => 65535
                                ]
                            ];
                            if(filter_var($results[$prop], FILTER_VALIDATE_INT, $options) === false){
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
            return $results;
        }
        /*----------------------------------------------------------*/
        /**
         * Parse HTTP Headers from sanitized $serverParams
         * @param array $params Sanitized Server Parameters from $_SERVER
         * @return array HTTP headers from $_SERVER / $serverParams
         */
        /*----------------------------------------------------------*/
        private function parseHeaders(?array $params=null): ?array {
            /**
             * Validate $params
             */
            if(empty($params) || is_null($params)){
                return null;
            }
            // Declare results array
            $results = [];
            // Loop Server Parameters
            foreach ($params as $key => $value) {
                // Strip HTTP_ from $_SERVER properties
                if (strpos($key, 'HTTP_') === 0) {
                    $headerName = str_replace('HTTP_', '', $key);
                    $headerName = str_replace('_', '-', $headerName);
                    // Normalize property names to lower case
                    $headerName = strtolower($headerName);
                    // Push to $results array
                    $results[$headerName] = $value;
                } elseif ($key === 'CONTENT_TYPE') {
                    $results['content-type'] = $value;
                } elseif ($key === 'CONTENT_LENGTH') {
                    $results['content-length'] = $value;
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
         * Utility method: Gets Document Root from $_SERVER and validates
         * @param array $serverParams
         * @param null|mixed $default Default value to return if property missing
         * @return string|null
         */
        /*----------------------------------------------------------*/
        public static function getDocumentRoot(?array $params=null, $default=null){
            // validate $serverParams
            if(is_null($params)){
                return $default;
            }
            // Check if the document root is set in the server variables
            $result = null;
            if (isset($params['HTTP_DOCUMENT_ROOT'])) {
                $result = $params['HTTP_DOCUMENT_ROOT'];
            } elseif (isset($params['DOCUMENT_ROOT'])) {
                $result = $params['DOCUMENT_ROOT'];
            }
            /**
             * Check if result is empty / null
             * - If null | empty; return null
             */
            if(empty($result) || is_null($result)) {
                return $default;
            }
            /**
             * Validate the result
             * - Check if the result is a valid directory
             */
            if(is_dir($result)) {
                return $result;
            }
            /**
             * Failed checks; return null
             */
            return $default;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method to return $headers array.
         * - Gets all parsed HTTP headers from $_SERVER superglobal.
         * - Not using getallheaders due to reliability (only on Apache servers)
         * @param void
         * @return array 
         */
        /*----------------------------------------------------------*/
        public function getHeaders(){
            return $this->headers;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method to return a single property of $headers array.
         * - Not using getallheaders due to reliability (only on Apache servers)
         * - Parses property by string data-type
         * @param string $name Property name of Header
         * @param null|mixed $default Default value to return if property missing
         * @return int|string|null Property value from $headers
         */
        /*----------------------------------------------------------*/
        public function getHeader(string $name, $default=null): ?string {
            // Normalize name
            $name = strtolower($name);
            // Return value or null
            return $this->headers[$name] ?? $default;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method to return REQUEST_METHOD.
         * - Validated in sanitizeServerParams
         * @param array $params Server parameters from $_SERVER
         * @param null|mixed $default Default value to return if property missing
         * @return string|null - Returns a sanitized array of $_SERVER parameters
         */
        /*----------------------------------------------------------*/
        public static function getRequestMethod(?array $params=null, $default=null){
            // Validate params
            if(is_null($params)){
                return $default;
            }
            // Validate property
            if(isset($params['REQUEST_METHOD'])){
                return $params['REQUEST_METHOD'];
            }
            // Return Default
            return $default;
        }
        /*----------------------------------------------------------*/
        /**
         * Validation Method: Sanitize and return $_FILES superglobal
         * - Validates REQUEST_METHOD and enctype
         * - Checks if a $_FILES superglobal should exist
         * - Sanitizes and Validates properties of values of $_FILES superglobal
         * - Groups files by input element property name from $_FILES associated with Request
         */
        /*----------------------------------------------------------*/
        public function parseFiles(?array $fileParams=null, $default=null){

        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Gets all files in $_FILES superglobal and returns them as File Objects
         * - Can distinguish between single and multiple file uploads
         * - Can distinguish between single and multiple file input properties
         * - Validates file size and other properties before returning File() object
         * @param array $params Server parameters from $_SERVER
         * @param null|mixed $default Default value to return if property missing
         * @return string|null - Returns a sanitized, assoc array of $_FILES parameters as Files() objects.
         */
        /*----------------------------------------------------------*/

        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @param array $params Server parameters from $_SERVER
         * @param null|mixed $default Default value to return if property missing
         * @return string|null - Returns a sanitized array of $_SERVER parameters
         */
        /*----------------------------------------------------------*/
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @param array $params Server parameters from $_SERVER
         * @param null|mixed $default Default value to return if property missing
         * @return string|null - Returns a sanitized array of $_SERVER parameters
         */
        /*----------------------------------------------------------*/
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @param array $params Server parameters from $_SERVER
         * @param null|mixed $default Default value to return if property missing
         * @return string|null - Returns a sanitized array of $_SERVER parameters
         */
        /*----------------------------------------------------------*/
        /*----------------------------------------------------------*/
    }
?>
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
        /**
         * @var string|null $URI Unique Resource Identifier in the form: "scheme:[//authority]path[?query][#fragment]"
         */
        public ?string $URI;
        /**
         * @var string|null $scheme 
         */
        public ?string $scheme;
        /**
         * @var string|null $authority
         */
        public ?string $authority;
        /**
         * @var string|null $query_string Optional part of URI appearing after the "?" with "&key=value"
         */
        public ?string $query_string;
        /**
         * @var array|null $query Associative Array of Query string properties and values
         */
        public ?array $query;
        /**
         * @var string|null $path It's a hierarchical string that identifies a specific resource, resembling a file system path
         * @example Given "https://example.com/products... Path: "example.com"
         */
        public ?string $path;
        /**
         * @var string|null $fragment 
         */
        public ?string $fragment;
        /**
         * @var string|null $host
         */
        public ?string $host;
        /**
         * @var string|null $port
         */
        public ?string $port;
        /**
         * @var mixed $body
         */
        public $body;
        /**
         * Superglobals
         */
        public ?array $POST     = null;
        public ?array $GET      = null;
        public ?array $FILES    = null;
        public ?array $COOKIE   = null;
        public ?array $REQUEST  = null;
        /*----------------------------------------------------------*/
        /**
         * Constructor.
         * - Capture $_SERVER parameters
         * - Sanitize, validate, and parse HTTP headers
         */
        /*----------------------------------------------------------*/
        public function __construct($serverParams=null){
            /**
             * Server Environment Variables
             */
            $this->serverParams  = self::sanitizeServerParams($serverParams ?? $_SERVER);
            $this->document_root = $this->getDocumentRoot();
            /**
             * Header Properties
             */
            $this->headers       = $this->parseHeaders();
            $this->method        = $this->getMethod();
            /**
             * URI Properties
             */
            $this->port         = $this->parsePort();
            $this->host         = $this->getHeader('host');
            $this->scheme       = $this->parseScheme();
            /**
             * TODO: Differentiate parseURI and getURI
             */
            $this->URI          = $this->getURI();
            $parsed_uri         = $this->parseURI($this->URI);
            $this->path         = isset($parsed_uri['path']) ? $parsed_uri['path'] : null;
            $this->query_string = isset($parsed_uri['query']) ? $parsed_uri['query'] : null;
            $this->query        = $this->parseQuery($this->query_string);
            /**
             * Body Properties
             */
            $this->body         = $this->parseBody();
            /**
             * Superglobal Properties
             */
            $this->POST         = $this->parsePOST();
            $this->GET          = $this->parseGET();
            $this->REQUEST      = $this->parseREQUEST();
            $this->COOKIE       = $this->parseCOOKIE();
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
        private static function sanitizeServerParams(?array $params=null, $default=null): ?array{
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
            return $results;
        }
        /*----------------------------------------------------------*/
        /**
         * Parse HTTP Headers from sanitized $serverParams
         * @return array HTTP headers from $_SERVER / $serverParams
         */
        /*----------------------------------------------------------*/
        private function parseHeaders(): ?array {
            /**
             * Validate $params
             */
            $params = $this->serverParams;
            if(empty($params) || is_null($params)){
                return null;
            }
            /**
             * Declare Results array
             */
            $results = [];
            // Loop Server Parameters
            foreach ($params as $key => $value) {
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
                        $results[strtolower($key)] = $matches[1];
                        $results['content_boundary'] = $matches[2];
                    } else {
                        /**
                         * Grab CONTENT properties
                         * Format and push to array
                         */
                        $results[strtolower($key)] = $value;
                    }
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
         * @param null|mixed $default Default value to return if property missing
         * @return string|null
         */
        /*----------------------------------------------------------*/
        public function getDocumentRoot($default=null){
            // validate $serverParams
            $params = $this->serverParams;
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
         * Utility Method: Checks $this->headers for a specific header and returns true if exists.
         *
         * @param string $name The name of the header (case-insensitive).
         * @return bool True if the header exists, false otherwise.
         */
        /*----------------------------------------------------------*/
        public function hasHeader(string $name): bool {
            return isset($this->headers[strtolower($name)]);
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
         * @param null|mixed $default Default value to return if property missing
         * @return string|null - Returns a sanitized array of $_SERVER parameters
         */
        /*----------------------------------------------------------*/
        public function getMethod($default=null){
            // Validate params
            $params = $this->serverParams;
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
         * @param null|mixed $default Default value to return if property missing
         * @return void Populates $this->fileParams
         */
        /*----------------------------------------------------------*/
        private function parseFiles($default=null): void{
            /**
             * Validate Content Type for 
             */
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
        public function getFiles(){}
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Get Port
         * - Checks against valid port integers
         * @return int|null - Returns a sanitized array of $_SERVER parameters
         */
        /*----------------------------------------------------------*/
        private function parsePort(): ?int{
            /**
             * Validate serverParams
             */
            $serverParams = $this->serverParams;
            if(is_null($serverParams) || empty($serverParams)){
                return null;
            }
            /**
             * Check params
             */
            if(!isset($serverParams['SERVER_PORT'])){
                // no port number
                return null;
            }
            /**
             * Grab port number and validate
             * - Is a number
             * - Intval
             * - Is between 1 and 65535
             */
            $port = $serverParams['SERVER_PORT'];
            if(!is_numeric($port)){
                // non numeric failure
                return null;
            }
            $port = intval($port);
            if($port > 1 && $port < 65535){
                return $port;
            }
            /**
             * Return default
             */
            return null;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Get the HTTP Request Scheme
         * - e.g. HTTP, HTTPs
         * @param array $params Server parameters from $_SERVER
         * @return string|null - Returns a sanitized array of $_SERVER parameters
         */
        /*----------------------------------------------------------*/
        private function parseScheme(): ?string{
            /**
             * Validate serverParams
             */
            $serverParams = $this->serverParams;
            if(is_null($serverParams) || empty($serverParams)){
                return null;
            }
            /**
             * Check for:
             * - HTTPS & value "on" or 1
             * - HTTP_X_FORWARDED_PROTO
             */
            if(isset($serverParams['HTTPS']) && ($serverParams['HTTPS'] === 'on' || $serverParams['HTTPS'] === 1)){
                // HTTPS is on and the scheme
                return 'https';
            } else if(isset($serverParams['HTTP_X_FORWARDED_PROTO']) && strtolower($serverParams['HTTP_X_FORWARDED_PROTO']) === 'https'){
                // Set to https
                return 'https';
            } else {
                return 'http';
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Get URI
         * @return string|null - Returns a sanitized array of $_SERVER parameters
         */
        /*----------------------------------------------------------*/
        public function getURI(){
            /**
             * Validate serverParams
             */
            $serverParams = $this->serverParams;
            if(is_null($serverParams) || empty($serverParams)){
                return null;
            }
            /**
             * Check for REQUEST_URI
             * - Check isset
             * - Check null 
             * - Check null host
             */
            if(!isset($serverParams['REQUEST_URI'])){
                return null;
            }
            if(is_null($this->host) || is_null($serverParams['REQUEST_URI'])){
                return null;
            }
            /**
             * Return URI
             */
            return $this->scheme . '://' . $this->host . ':' . $this->port . $serverParams['REQUEST_URI'];
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: parseURI
         * - Parses the REQUEST URI and sets the following properties:
         *      - Scheme
         *      - Host
         *      - Port
         *      - Path
         * @param string $URI - URI from $this->getURI
         * @return array|null - Returns a sanitized array of REQUEST_URI properties
         */
        /*----------------------------------------------------------*/
        private function parseURI(?string $URI=null){
            /**
             * Validate $URI
             */
            if(!is_string($URI)){
                // No SERVER data
                return null;
            }
            /**
             * Parse URI
             */
            $parsed = parse_url($URI);
            /**
             * Validate parsed URI
             */
            if(is_array($parsed) && !empty($parsed)){
                return $parsed;
            }
            /**
             * Return default
             */
            return null;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Parses Query string into Associative Array
         * @param string|null Query string
         * @return array|null Associative Array from query string parameters: prop=>value
         */
        /*----------------------------------------------------------*/
        private function parseQuery(?string $query_string=null){
            /**
             * Validate Query String
             */
            if(!is_string($query_string) || empty($query_string)){
                // No query string
                return null;
            }
            /**
             * Explode query string and return Assoc Array
             */
            parse_str($query_string, $params);
            /**
             * Validate $results
             */
            if(is_array($params) && !empty($params)){
                /**
                 * Sanitize and validate
                 */
                $results = sanitize_data($params);
                /**
                 * Parse values by type
                 */
                return is_array($results) ? $results : null;
            }
            /**
             * Return Default
             */
            return null;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Parses the HTTP Request Body
         * @return mixed
         */
        /*----------------------------------------------------------*/
        private function parseBody(){
            /**
             * Obtain and validate file contents
             */
            $raw_body = $this->getRawBody();
            /**
             * Determine format of body data based on content type
             */
            switch($this->getHeader('content_type')){
                /*----------------------------------------------------------*/
                /**
                 * JSON
                 */
                /*----------------------------------------------------------*/
                case 'application/json':
                    // Parse JSON
                    $data = json_decode($raw_body, true);
                    if($data === null && json_last_error() !== JSON_ERROR_NONE){
                        return ['error' => 'Invalid JSON Data!'];
                    } else {
                        return $data;
                    }
                /*----------------------------------------------------------*/
                /**
                 * Linked Data in JSON format
                 * JSON API Specification
                 */
                /*----------------------------------------------------------*/
                case 'application/ld+json':
                case 'application/vnd.api+json':
                    return $raw_body;
                /*----------------------------------------------------------*/
                /**
                 * Default HTML forms via POST without enctype set
                 * Simple Data
                 * Represents data formatted with key-value pairs and URL-encoded
                 */
                /*----------------------------------------------------------*/
                case 'application/x-www-form-urlencoded':
                    parse_str($raw_body, $data);
                    return $data;
                /*----------------------------------------------------------*/
                /**
                 * Plain Text
                 */
                /*----------------------------------------------------------*/
                case 'text/plain':
                    return $raw_body;
                /*----------------------------------------------------------*/
                /**
                 * HTML
                 */
                /*----------------------------------------------------------*/
                case 'text/html':
                    /***
                     * Check for parser and attempt to extract html
                     */
                    if(extension_loaded('dom')){
                        $dom = new DOMDocument();
                        // set errors
                        libxml_use_internal_errors(true);
                        // Load html string
                        $dom->loadHTML($raw_body);
                        // Clear errors
                        libxml_clear_errors();
                        /**
                         * Validate DOM created
                         */
                        if(!$dom){
                            return ['error' => 'Unable to extract HTML document from body string data'];    
                        }
                        /**
                         * Return DOM object for further extraction
                         */
                        return $dom;
                    } else {
                        // Return error
                        return ['error' => 'Unable to load HTML Parser!'];
                    }
                /*----------------------------------------------------------*/
                /**
                 * XML: 
                 * - Application
                 * - Text
                 */
                /*----------------------------------------------------------*/
                case 'application/xml':
                case 'text/xml':
                    /**
                     * Check for parser
                     * Parse string
                     * Validate Data
                     */
                    if(extension_loaded('simplexml')){
                        // Set errors
                        libxml_use_internal_errors(true);
                        // Grab data
                        $data = simplexml_load_string($raw_body);
                        // Validate
                        if($data !== false){
                            // Convert xml to json and return
                            return json_decode(json_encode($data), true);
                        }
                        // Clear XML errors
                        libxml_clear_errors();
                    } else {
                        // return default
                        return $raw_body;
                    }
                /*----------------------------------------------------------*/
                /**
                 * CSV
                 */
                /*----------------------------------------------------------*/
                case 'text/csv':
                    /**
                     * Parse rows from csv string
                     * Declare results array
                     * Loop rows
                     */
                    $csv = str_getcsv($raw_body);
                    if(!is_array($csv)){
                        return ['error' => 'Unable to parse CSV string'];
                    }
                    /**
                     * Return CSV
                     */
                    return $csv;
                /*----------------------------------------------------------*/
                /**
                 * Document Files
                 * - PDF
                 * - ZIP
                 */
                /*----------------------------------------------------------*/
                case 'application/zip':
                case 'application/pdf':
                    return $raw_body;
                /*----------------------------------------------------------*/
                /**
                 * Form Data
                 * File Upload Data
                 */
                /*----------------------------------------------------------*/
                case 'multipart/form-data':
                    parse_str($raw_body, $data);
                    return $data;
                /*----------------------------------------------------------*/
                /**
                 * Default: Returns Raw Body Data
                 */
                /*----------------------------------------------------------*/
                default:
                    return $raw_body;
            }
            /**
             * Return default
             */
            return null;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Gets the raw http body
         * @return string|null - 
         */
        /*----------------------------------------------------------*/
        public function getRawBody(){
            return file_get_contents('php://input');
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Parses, Sanitizes and Validates $_ properties
         * @return array|null - $_ superglobal properties
         */
        /*----------------------------------------------------------*/
        private function parsePOST(): ?array{
            if(isset($_POST) && is_array($_POST)){
                return sanitize_data($_POST);
            }
            /**
             * Return Default
             */
            return null;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Parses, Sanitizes and Validates $_ properties
         * @return array - $_ superglobal properties
         */
        /*----------------------------------------------------------*/
        private function parseGET(): ?array{
            if(isset($_GET) && is_array($_GET)){
                return sanitize_data($_GET);
            }
            /**
             * Return Default
             */
            return null;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Parses, Sanitizes and Validates $_ properties
         * @return array - $_ superglobal properties
         */
        /*----------------------------------------------------------*/
        private function parseREQUEST(): ?array{
            if(isset($_REQUEST) && is_array($_REQUEST)){
                return sanitize_data($_REQUEST);
            }
            /**
             * Return Default
             */
            return null;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Parses, Sanitizes and Validates $_ properties
         * @return array - $_ superglobal properties
         */
        /*----------------------------------------------------------*/
        private function parseCOOKIE(): ?array{
            if(isset($_COOKIE) && is_array($_COOKIE)){
                return sanitize_data($_COOKIE);
            }
            /**
             * Return Default
             */
            return null;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @return - 
         */
        /*----------------------------------------------------------*/
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @return - 
         */
        /*----------------------------------------------------------*/
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @return - 
         */
        /*----------------------------------------------------------*/
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @return - 
         */
        /*----------------------------------------------------------*/
    }
?>
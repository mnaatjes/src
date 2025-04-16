<?php
    /*----------------------------------------------------------*/
    /**
     * URI Interface Object: Represents complete request URI
     * - Scheme
     * - Port
     * - Host
     * - Path
     * - Query
     * - Fragment
     * - QueryParam
     */
    /*----------------------------------------------------------*/
    class UriInterface {
        /**
         * @var string|null
         */
        private ?array $headerParams = null;
        /**
         * @var string|null
         */
        private ?array $serverParams = null;
        /**
         * @var array|null $serverParams Server parameters from which to parse values
         */
        public ?array $uriParams = null;
        /*----------------------------------------------------------*/
        /**
         * Constructor
         * @param ?array{
         *      host: string,
         *      port: int,
         *      scheme: string,
         *      
         * } $header_params
         * @param ?array{
         *      REQUEST_URI: string,
         *      SCRIPT_NAME: string,
         *      DOCUMENT_ROOT: string
         * } $server_params
         */
        /*----------------------------------------------------------*/
        public function __construct(?array $header_params, ?array $server_params){
            /**
             * Validate Header and Server Params
             */
            $this->headerParams = $this->validateHeaderParams($header_params);
            $this->serverParams = $this->validateServerParams($server_params);
            /**
             * Parse URI Parameters
             */
           $this->uriParams = $this->parseUriString($this->getString());
        }
        /*----------------------------------------------------------*/
        /**
         * Private Method: Validate Header Parameters
         * @return array
         */
        /*----------------------------------------------------------*/
        private function validateHeaderParams(?array $header_params): ?array{
            /**
             * Loop and check for properties
             */
            foreach(['host', 'port', 'scheme'] as $required){
                // Validate key, value
                if(!in_array($required, array_keys($header_params))){
                    // Missing Key
                    return null;
                } else if(!isset($header_params[$required])){
                    // Value not set!
                    return null;
                }
            }
            /**
             * Passed check
             * Return array
             */
            return $header_params;
        }
        /*----------------------------------------------------------*/
        /**
         * Private Method: $_SERVER parameters specific to URI
         * @return array|null Null on failure
         */
        /*----------------------------------------------------------*/
        private function validateServerParams(?array $server_params): ?array{
            /**
             * Loop and check for properties
             */
            foreach(['request_uri', 'script_name', 'document_root'] as $required){
                if(!in_array($required, array_keys($server_params))){
                    return null;
                } else if(!isset($server_params[$required])){
                    return null;
                }
            }
            /**
             * Passed check
             * Return array
             */
            return $server_params;
        }
        /*----------------------------------------------------------*/
        /**
         * Private Method: Parse URI string into constituent parameters
         * @return array Parsed URI properties
         */
        /*----------------------------------------------------------*/
        private function parseUriString(string $uri_string){
            /**
             * Parse uri string
             */
            $parsed = parse_url($uri_string);
            /**
             * Validate properties
             */
            foreach(['scheme', 'host', 'port', 'path'] as $required){
                // check if absent
                if(!in_array($required, array_keys($parsed))){
                    throw new Error(sprintf('URI String is missing; %s required property!', $required));
                }
            }
            /**
             * Return array
             */
            return $parsed;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @return string Complete URI string (including port, scheme, etc...)
         */
        /*----------------------------------------------------------*/
        public function getString(){
            /**
             * Define properties
             */
            $scheme = $this->headerParams['scheme'];
            $host   = $this->headerParams['host'];
            $port   = $this->headerParams['port'];
            $uri    = $this->serverParams['request_uri'];
            /**
             * Return URI
             */
            return $scheme . '://' . $host . ':' . $port . $uri;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         */
        /*----------------------------------------------------------*/
        public function getScheme(){
            return isset($this->headerParams['scheme']) ? $this->headerParams['scheme'] : null;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         */
        /*----------------------------------------------------------*/
        public function getPort(){
            return isset($this->headerParams['port']) ? $this->headerParams['port'] : null;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Returns full path from URI
         */
        /*----------------------------------------------------------*/
        public function getPath(){
            return isset($this->uriParams['path']) ? $this->uriParams['path'] : null;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * API Path or Resource Identifier
         * @return string
         */
        /*----------------------------------------------------------*/
        public function getResourcePath(){
            /**
             * Parse resource identifier segment (difference)
             */
            $script_name    = $this->serverParams['script_name'];
            $path           = $this->getPath();
            $difference     = substr($path, strlen($script_name));
            /**
             * Validate and sanitize
             * - check for leading "/"
             * - trim and remove whitespace
             * - explode if multiple "/"
             * - check for control characters
             * 
             */
            if(!str_starts_with($difference, '/')){
                // Failed check
                return null;
            }
            $difference = str_replace(' ', '', trim($difference));
            $pattern    = '/^\/[a-zA-Z0-9_-]+$/';
            $match      = preg_match($pattern, $difference) === 1;
            $count      = substr_count($difference, '/');
            if($count > 1 && $match === false){
                // Check parts for validity
                foreach(explode('/', $difference) as $id){
                    // skip empty
                    $id = trim($id);
                    if(empty($id)){
                        continue;
                    }
                    $id = '/' . $id;
                    $id_match = preg_match($pattern, $id) === 1;
                    // On failure, return
                    if($id_match === false){
                        return null;
                    }
                }
                /**
                 * Loop resolved to true
                 * Return resource identifier path
                 */
                return $difference;
            } else if($match === false){
                return null;
            } else {
                /**
                 * Resolved to true
                 * Return resource identifier path
                 */
                return $difference;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * @return array Query parameters from URI query string
         */
        /*----------------------------------------------------------*/
        public function getQuery(){
            /**
             * Validate Query
             */
            if(!isset($this->uriParams['query'])){
                return null;
            }
            /**
             * TODO: Implement type casting
             * TODO: Implement recursive access
             * TODO: Implement rules validation
             * Parse query string
             * Return
             */
            parse_str($this->uriParams['query'], $params);
            /**
             * Normalize names and validate / sanitize values
             */
            $results = [];
            foreach($params as $key => $value){
                // Normalize
                $results[strtolower($key)] = $value;
            }
            /**
             * Validate Results
             * Return array
             */
            if(empty($results)){
                return null;
            } else {
                return $results;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Gets the value of a Query parameter
         * @return string|array|int|null Value from $propName in Query array
         */
        /*----------------------------------------------------------*/
        public function getQueryParam(string $prop_name){
            // Grab Query
            $query = $this->getQuery();
            if(empty($query) || is_null($query)){
                return null;
            }
            /**
             * Normalize and validate
             */
            $prop_name = strtolower($prop_name);
            if(isset($query[$prop_name])){
                return $query[$prop_name];
            } else {
                return null;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         */
        /*----------------------------------------------------------*/
        public function getFragment(){
            return isset($this->uriParams['fragment']) ? $this->uriParams['fragment'] : null;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @return string|null
         */
        /*----------------------------------------------------------*/
        public function getUser(){
            return isset($this->uriParams['user']) ? $this->uriParams['user'] : null;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @return string|null
         */
        /*----------------------------------------------------------*/
        public function getPass(){
            return isset($this->uriParams['pass']) ? $this->uriParams['pass'] : null;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         */
        /*----------------------------------------------------------*/
        public function getUserInfo(){
            /**
             * Validate User and Pass
             */
            if(is_null($this->getUser())){
                return null;
            }
            /**
             * Build User Info
             */
            return $this->getUser() . (!is_null($this->getPass()) ? ':' . $this->getPass() : '');
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         */
        /*----------------------------------------------------------*/
        public function getAuthority(){}

    }
?>
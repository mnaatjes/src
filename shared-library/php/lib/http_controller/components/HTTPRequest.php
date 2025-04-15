<?php
    /*----------------------------------------------------------*/
    /**
     * HTTP Request Object.
     * - Contains the properties and methods of an incoming HTTP Request.
     * - Provides sanitation and validation for incoming data.
     */
    /*----------------------------------------------------------*/
    class HTTPRequest {
        /**
         * @var array|null Configuration assoc array for $_SERVER params
         */
        public ?array $config = null;
        /**
         * @var array|null Validated Array from $_SERVER data
         */
        public ?array $serverParams = null;
        /**
         * @var object Headers
         */
        public $headers = null;
        /**
         * @var string Method from REQUEST_METHOD
         */
        public ?string $method = null;
        /**
         * @var bool Checks if HTTPS used
         */
        public bool $isSecure = false;
        /**
         * @var bool Checks if AJAX call used
         */
        public bool $isAJAX = false;
        /**
         * @var string PATH_INFO derived from URI
         */
        public ?string $pathInfo = null;
        /**
         * @var array Query string from URI
         */
        public ?string $query_str = null;
        /**
         * @var array Query properties
         */
        public ?array $query = null;
        /**
         * @var string URI
         */
        public ?string $uri = null;
        /**
         * @var string Client IP address
         */
        public ?string $clientIP = null;
        /**
         * @var array Files from $_FILES superglobal
         */
        public ?array $files = null;
        /**
         * @var array Attributes
         */
        public ?array $attributes = null;
        /**
         * @var array GET
         */
        public ?array $get = null;
        /**
         * @var array POST
         */
        public ?array $post = null;
        /**
         * @var array COOKIE
         */
        public ?array $cookie = null;
        /**
         * @var array Raw INPUT string
         */
        public ?string $rawBody = null;
        /**
         * @var array INPUT Body
         */
        public ?array $body = null;
        /**
         * @var array Errors Object
         */
        public ?object $errors = null;

        /*----------------------------------------------------------*/
        /**
         * Constructor.
         * - Capture $_SERVER parameters
         * - Sanitize, validate, and parse HTTP headers
         * 
         * @param array|null $config Configuration assoc array
         */
        /*----------------------------------------------------------*/
        public function __construct(?array $config=null){
            $this->config       = $this->validateConfig($config);
            $this->serverParams = $this->getServerParams($this->config);
            $this->headers      = new HTTPHeaders($this->serverParams, false, $this->config);
            $this->method       = $this->serverParams['REQUEST_METHOD'];
            $this->isSecure     = $this->checkSecure();
            $this->isAJAX       = $this->checkAJAX();
            $this->pathInfo     = $this->serverParams['PATH_INFO'];
            $this->query_str    = $this->serverParams['QUERY_STRING'];
            $this->query        = $this->parseQuery();
            $this->uri          = $this->serverParams['REQUEST_URI'];
            // turn into object
            $this->get          = $this->parseGET();
            // turn into object
            $this->post         = $this->parsePOST();
            $this->rawBody      = $this->getBodyStr();
            $this->body         = $this->parseBody();
            // turn into object
            $this->cookie       = $this->parseCookie();
            $this->clientIP     = $this->getClientIP();
            // turn into object
            $this->files        = $this->getFiles();
            $this->attributes   = [];
            // Errors object
            $this->errors       = new Errors($this->config['errors']);
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Validates structure of $config array
         * TODO: Finish
         * @param array|null $config
         * @return array Validated $config array
         */
        /*----------------------------------------------------------*/
        private function validateConfig(?array $config=null): array{
            return [
                'errors' => [
                    'log'       => true,
                    'display'   => false,
                    'send'      => true
                ],
            ];
        }
        /*----------------------------------------------------------*/
        /**
         * Sanitizes, validates $_SERVER properties
         * @param array|null $config Configuration assoc array
         * @return array Validated array of $_SERVER data
         */
        /*----------------------------------------------------------*/
        private function getServerParams(?array $config=null){
            return sanitize_server_data($config);
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * - Uses $this->serverParams
         * @param void
         * @return bool
         */
        /*----------------------------------------------------------*/
        private function checkAJAX(){
            if(isset($this->serverParams['HTTP_X_REQUESTED_WITH'])){
                return strtolower($this->serverParams['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
            }
            /**
             * Return Default
             */
            return false;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * - Uses $this->serverParams
         * @param void
         * @return bool
         */
        /*----------------------------------------------------------*/
        private function checkSecure(): bool{
            // Check for HTTPS
            if(isset($this->serverParams['HTTPS'])){
                // Check setting
                if(is_numeric($this->serverParams['HTTPS'])){
                    // Check for numeric on
                    return intval($this->serverParams['HTTPS']) === 1;
                } else {
                    // Check for string on
                    return strtolower($this->serverParams['HTTPS']) === 'on';
                }
            }
            /**
             * Return Default
             */
            return false;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @param void
         * @return string Client IP
         */
        /*----------------------------------------------------------*/
        private function getClientIP(){
            // Declare IP Container
            $ip = null;
            // Check possible sources
            if(isset($this->serverParams['HTTP_CLIENT_IP'])){
                $ip = $this->serverParams['HTTP_CLIENT_IP'];
            } else if (isset($this->serverParams['HTTP_X_FORWARDED_FOR'])){
                $ip = $this->serverParams['HTTP_X_FORWARDED_FOR'];
            } else {
                $ip = $this->serverParams['REMOTE_ADDR'];
            }
            /**
             * Return default
             */
            return $ip;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @param 
         * @return 
         */
        /*----------------------------------------------------------*/
        private function getFiles(){}
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * TODO: Validate
         * TODO: Implement Ruleset validation
         * @param 
         * @return array|null
         */
        /*----------------------------------------------------------*/
        private function parseGET(){
            if(isset($_GET)){
                return $_GET;
            } else {
                return null;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @param 
         * @return 
         */
        /*----------------------------------------------------------*/
        private function parsePOST(){
            if(isset($_POST)){
                return $_POST;
            } else {
                return null;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @param 
         * @return 
         */
        /*----------------------------------------------------------*/
        private function parseCOOKIE(){
            if(isset($_COOKIE)){
                return $_COOKIE;
            } else {
                return null;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @param 
         * @return 
         */
        /*----------------------------------------------------------*/
        private function getBodyStr(){
            return file_get_contents('php://input');
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @param 
         * @return 
         */
        /*----------------------------------------------------------*/
        private function parseBody(){

        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @param 
         * @return 
         */
        /*----------------------------------------------------------*/
        private function getAttributes(){}
        /*----------------------------------------------------------*/
        /**
         * Utility Method: 
         * @param 
         * @return 
         */
        /*----------------------------------------------------------*/
        private function parseQuery(){}
    }
?>
<?php
    /*----------------------------------------------------------*/
    /**
     * HTTP Response Object.
     */
    /*----------------------------------------------------------*/
    class Response {
        /**
         * @var array|null Configuration assoc array for $_SERVER params
         */
        public ?array $config = null;
        /**
         * @var array|null Validated Array from $_SERVER data
         */
        public ?array $serverParams = null;
        /**
         * @var object Errors Object
         */
        public ?object $errors;
        /**
         * @var object Headers
         */
        public $headers = null;
        /**
         * @var string|null HTTP response body
         */
        protected ?string $body = null;
        /*----------------------------------------------------------*/
        /**
         * Constructor
         * @param 
         */
        /*----------------------------------------------------------*/
        public function __construct(?array $config=null){
            $this->config       = $this->validateConfig($config);
            $this->serverParams = $this->getServerParams($this->config);
            $this->headers      = new Headers($this->serverParams, true, $this->config);
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
                    'display'   => true,
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
         * Set status
         * @param int $code
         * @return self
         */
        /*----------------------------------------------------------*/
        public function setStatus(int $code=200): self{
            /**
             * Validate code
             */
            if(!in_array($code, array_keys(VALID_HTTP_STATUS))){
                $this->errors->add('type', 'Invalid code for HTTP status setting: ' . $code);
                return $this;
            }
            /**
             * Set in response header
             */
            $this->headers->set('status', $code);
            /**
             * Return self
             */
            return $this;
        }
        /*----------------------------------------------------------*/
        /**
         * Sets Content-Type header
         * @param string $type Content type, e.g. "application/json"
         * @return self
         */
        /*----------------------------------------------------------*/
        public function setContentType(string $type){
            /**
             * Validate content type not already set
             */
            if($this->headers->has('content_type')){
                // Trigger error
                $this->errors->add('type', 'Content Type is already set!');
                // return self
                return $this;
            }
            /**
             * Set content type
             * - Validate set
             */
            $this->headers->set('content_type', $type);
            // Validate
            if(!$this->headers->has('content_type')){
                /**
                 * Failure setting http response header
                 */
                $this->errors->add('type', 'Failure setting Content-Type in HTTP Response Header');
                return $this;
            } else {
                /**
                 * Return self
                 */
                return $this;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Sets http response body
         * @param string Http Response Body text stream
         * @return self
         */
        /*----------------------------------------------------------*/
        public function setBody(string $content_string=''): self{
            /**
             * Validate content type is set
             */
            if(!$this->headers->has('content-type')){
                // Set error
                $this->errors->add('type', 'Content-Type not set! Cannot set Body');
                // Return self
                return $this;
            }
            /**
             * Validate body string
             */
            if(!$this->validateBodyFormat($content_string)){
                // Invalid format for content type
                $this->errors->add('argument', 'Content string of http response body is of invalid format in ' . __FUNCTION__);
                return $this;
            }
            /**
             * Success!
             * - Set body property
             * - Return self
             */
            $this->body = $content_string;
            return $this;
        }
        /*----------------------------------------------------------*/
        /**
         * Set Body from File.
         * - Retrieves file contents
         * - Sets HTTP Body content string from file
         * @param string $filepath
         * @return self
         */
        /*----------------------------------------------------------*/
        public function setBodyFromFile(?string $filepath=null): self{
            /**
             * Validate filepath
             * - Trim
             * - Check for null
             * - Check for empty
             * - Exists
             */
            if(!is_valid_file($filepath)){
                $this->errors->add('Type', sprintf('Provided filepath: %s is NOT a valid file', $filepath));
                return $this;
            } else {
                /**
                 * Validate Content-Type
                 */
                var_dump($this->headers->get('content_type'));
                get_file_mimetype($filepath);
                /**
                 * Return default
                 */
                return $this;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * @return string HTTP body
         */
        /*----------------------------------------------------------*/
        public function getBody(){
            return $this->body;
        }
        /*----------------------------------------------------------*/
        /**
         * Validates the format of the http response body based on the content-type
         * @param string
         * @return string formatted http body
         */
        /*----------------------------------------------------------*/
        private function validateBodyFormat(?string $content_string){
            /**
             * Grab Content-Type
             * Determine format of body data based on content type
             */
            $content_type = $this->headers->get('content-type');
            // Evaluate by Content-Type
            switch($content_type){
                /*----------------------------------------------------------*/
                /**
                 * JSON
                 */
                /*----------------------------------------------------------*/
                case 'application/json':
                    return true;
                /*----------------------------------------------------------*/
                /**
                 * Linked Data in JSON format
                 * JSON API Specification
                 */
                /*----------------------------------------------------------*/
                case 'application/ld+json':
                case 'application/vnd.api+json':
                    return false;
                /*----------------------------------------------------------*/
                /**
                 * Default HTML forms via POST without enctype set
                 * Simple Data
                 * Represents data formatted with key-value pairs and URL-encoded
                 */
                /*----------------------------------------------------------*/
                case 'application/x-www-form-urlencoded':
                    return false;
                /*----------------------------------------------------------*/
                /**
                 * Plain Text
                 */
                /*----------------------------------------------------------*/
                case 'text/plain':
                    return false;
                /*----------------------------------------------------------*/
                /**
                 * HTML
                 */
                /*----------------------------------------------------------*/
                case 'text/html':
                    return false;
                /*----------------------------------------------------------*/
                /**
                 * XML: 
                 * - Application
                 * - Text
                 */
                /*----------------------------------------------------------*/
                case 'application/xml':
                case 'text/xml':
                    return false;
                /*----------------------------------------------------------*/
                /**
                 * CSV
                 */
                /*----------------------------------------------------------*/
                case 'text/csv':
                    return false;
                /*----------------------------------------------------------*/
                /**
                 * Document Files
                 * - PDF
                 * - ZIP
                 */
                /*----------------------------------------------------------*/
                case 'application/zip':
                case 'application/pdf':
                    return false;
                /*----------------------------------------------------------*/
                /**
                 * Form Data
                 * File Upload Data
                 */
                /*----------------------------------------------------------*/
                case 'multipart/form-data':
                    return false;
                /*----------------------------------------------------------*/
                /**
                 * Default: Returns Raw Body Data
                 */
                /*----------------------------------------------------------*/
                default:
                    return false;
            }
            /**
             * Return default
             */
            return false;
        }
        /*----------------------------------------------------------*/
        /**
         * Redirects after response sent
         */
        /*----------------------------------------------------------*/
        public function redirect(?string $url=null){}
        /*----------------------------------------------------------*/
        /**
         * 
         */
        /*----------------------------------------------------------*/
        /*----------------------------------------------------------*/
        /**
         * 
         */
        /*----------------------------------------------------------*/
        /*----------------------------------------------------------*/
        /**
         * Send HTTP Response
         */
        /*----------------------------------------------------------*/
        public function send(){}
    }

?>
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
         * Sets http response body
         */
        /*----------------------------------------------------------*/
        public function setBody(){}
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
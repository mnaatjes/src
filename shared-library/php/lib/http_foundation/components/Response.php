<?php
    /*----------------------------------------------------------*/
    /**
     * HTTP Response Object.
     * - Contains the properties and methods of an outgoing HTTP Response.
     */
    /*----------------------------------------------------------*/
    class Response {
        /**
         * @var array $headers Content of HTTP headers generated from chain methods or params
         */
        public array $headers = [];
        /**
         * Common Headers
         */
        public string $content_type;
        public int $content_length;
        public string $date;
        public string $charset;
        public string $cache_control;
        public string $expires;
        public string $last_modified;
        public string $ETag;
        public string $server;
        public string $connection;
        public string $CSP; // content-security-policy
        public string $HSTS; // Strict-Transport-Security
        public string $x_content_type_options;
        public string $x_frame_options;
        public string $referrer_policy;
        public string $location;
        public string $vary;
        public string $accept_ranges;
        public string $pregma;
        /**
         * @var array $errors Errors array for request object
         * - Collects errors from the validation and sanitation precesses
         */
        public ?array $errors = [];
        /**
         * @var string $protocol
         */
        public string $protocol;
        /**
         * @var array $status_texts HTTP_STATUS constant
         */
        public int $status_code;
        public string $status_text;
        public array $status_texts = HTTP_STATUS;
        /**
         * @var mixed $body
         */
        public $body;
        /*----------------------------------------------------------*/
        /**
         * Constructor.
         * - Capture $_SERVER parameters
         * - Sanitize, validate, and parse HTTP headers
         */
        /*----------------------------------------------------------*/
        public function __construct(string $content="", array $headers=[], int $status=200, ?string $protocol=null){
            /**
             * Set Required Headers:
             * - Sets defaults if not included in object instance creation.
             */
            $this->setProtocol($protocol);
            $this->setStatus($status);
        }
        /*----------------------------------------------------------*/
        /**
         * Set Headers
         */
        /*----------------------------------------------------------*/
        public function setHeaders(){}
        /*----------------------------------------------------------*/
        /**
         * Send Headers
         */
        /*----------------------------------------------------------*/
        public function sendHeaders(){
            /**
             * Check if headers already sent
             * - Prevent resending
             */
            if(headers_sent()){
                return $this;
            }
            /**
             * Send Status line
             */
            header(sprintf('%s %d %s', $this->protocol, $this->getHeader('status-code'), $this->getHeader('status-text')));
            /**
             * Loop $this->headers properties and append to header()
             */
            foreach($this->headers as $name => $value){
                if(is_array($value)){
                    // Loop nested values
                    foreach($value as $val){
                        header(sprintf('%s: %s', $name, $val), false);
                    }
                } else {
                    //  send string headers
                    header(sprintf('%s: %s', $name, $value));
                }
            }
            /**
             * Return to object
             */
            return $this;
        }
        /*----------------------------------------------------------*/
        /**
         * Fetches headers that have been set using headers_list()
         * @return array
         */
        /*----------------------------------------------------------*/
        public function fetchSentHeaders(){ return headers_list();}
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Sets Metadata (i.e. properties that are not part of the header or body)
         * @param string $name
         * @param mixed $value
         * @param bool $replace Default: true
         * @return $this
         */
        /*----------------------------------------------------------*/
        public function setHeader(string $name, $value, bool $replace=true){
            /**
             * Check if empty or to replace
             */
            if($replace || !isset($this->headers[$name])){
                $this->headers[$name] = $value;
            } else {
                /**
                 * Check if the property value is an array
                 * - Cast values as arrays
                 * - Stores key, values as arrays; common practice for http headers which can have multiple values
                 */
                if(is_array($this->headers[$name])){
                    $this->headers[$name] = array_merge((array) $this->headers[$name], (array) $value);
                } else {
                    $this->headers[$name] = [$this->headers[$name], ... (array) $value];
                }
            }
            /**
             * Return to object
             */
            return $this;
        }
        /*----------------------------------------------------------*/
        /**
         * Get header by name
         */
        /*----------------------------------------------------------*/
        public function getHeader($name){
            if(isset($this->headers[$name])){
                return $this->headers[$name];
            }
            return null;
        }
        /*----------------------------------------------------------*/
        /**
         * Sets the Server Protocol. By default, used $_SERVER['SERVER_PROTOCOL'] value.
         * - Uses $this->setHeader()
         * @param string|null $value
         * @param bool $replace Default = true
         * @return string
         */
        /*----------------------------------------------------------*/
        public function setProtocol(?string $value=null, $replace=true){
            /**
             * Check for $value property
             */
            if(is_null($value)){
                $this->setHeader('protocol', $_SERVER['SERVER_PROTOCOL'], $replace);
                $this->protocol = $_SERVER['SERVER_PROTOCOL'];
            } else if(is_string($value)) {
                $this->setHeader('protocol', $value, $replace);
                $this->protocol = $value;
            } else {
                throw new Exception('Could not set HTTP protocol for Response! Value must be a STRING');
            }
            /**
             * Return to object
             */
            return $this;
        }
        /*----------------------------------------------------------*/
        /**
         * Sets Status and Code
         * @param int $code
         * @return $this
         */
        /*----------------------------------------------------------*/
        public function setStatus(int $code=200){
            /**
             * Validate code from array
             */
            if(!isset($this->status_texts[$code])){
                throw new InvalidArgumentException(sprintf('Invalid HTTP Response status code: %d', $code));
            }
            /**
             * Set status-code and status-text
             */
            $this->setHeader("status-code", $code);
            $this->setHeader("status-text", $this->status_texts[$code]);
            /**
             * Return values to object
             */
            return $this;
        }
        /*----------------------------------------------------------*/
        /**
         * Sets Content Type
         * @param string $content_type
         * @param string|null $charset
         * @return $this
         */
        /*----------------------------------------------------------*/
        public function setContentType(string $content_type, ?string $charset=null){
            /**
             * Check for charset
             */
        }

        /*----------------------------------------------------------*/
        /**
         * Sets
         * @return $this
         */
        /*----------------------------------------------------------*/
        /*----------------------------------------------------------*/
        /**
         * Sets
         * @return $this
         */
        /*----------------------------------------------------------*/
        /*----------------------------------------------------------*/
        /**
         * Sets
         * @return $this
         */
        /*----------------------------------------------------------*/
    }
?>
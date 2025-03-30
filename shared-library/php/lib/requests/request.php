<?php
    /**
     * @filesource request.php
     */
    /*----------------------------------------------------------*/
    /**
     * Request Class
     */
    /*----------------------------------------------------------*/
    class Request {
        /**
         * Properties of class
         */
        public $method;
        public $contentType;
        public $data;
        public $errors   = [];
        public $response = [];
        /*----------------------------------------------------------*/
        /**
         * Retrieves data from the Server Request Method
         * 
         * @param string $validMethod - SERVER request method form sender
         */
        /*----------------------------------------------------------*/
        public function __construct($validMethod='POST', $fileIndex=''){
            $this->method       = $_SERVER['REQUEST_METHOD'];
            $this->contentType  = in_array($this->method, ['POST', 'PUT', 'DELETE']) ? $_SERVER['CONTENT_TYPE'] : null;
            /**
             * Validate Request Method
             * Execute Load Data
             */
            $this->data = $this->validateMethod($validMethod) ? $this->loadData($fileIndex) : null;
        }
        /*----------------------------------------------------------*/
        /**
         * Validate Request Method
         *
         * @return void
         */
        /*----------------------------------------------------------*/
        public function validateMethod($validMethod){
            if($validMethod !== $this->method){
                header('HTTP/1.1 405 Method Not Allowed');
                echo json_encode(array("error" => "Method '$this->method' not allowed!"));
                log_dump('Invalid HTTP Method Used!');
                return false;
            }
            return true;
        }
        /*----------------------------------------------------------*/
        /**
         * Load Data
         */
        /*----------------------------------------------------------*/
        public function loadData($fileIndex){
            switch($this->method){
                case 'GET':
                    return $this->handleGET();
                case 'POST':
                    return $this->handlePOST($fileIndex);
                /*
                case 'PUT':
                    break;
            
                case 'DELETE':
                    break;
            
                case 'PATCH':
                    break;
            
                case 'HEAD':
                    break;
            
                case 'OPTIONS':
                    break;
            
                case 'TRACE':
                    break;
            
                case 'CONNECT':
                    break;
                */
                default: 
                    $this->errors['method'] = 'Could not identify REQUEST_METHOD!';
                    break;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Handle GET Request
         */
        /*----------------------------------------------------------*/
        public function handleGET(){}
        /*----------------------------------------------------------*/
        /**
         * Handle POST Request
         * 
         * @return array data
         */
        /*----------------------------------------------------------*/
        public function handlePOST($fileIndex){
            /**
             * Check content type and determine source of POST data
             */
            $data = [];
            if($this->contentType === 'application/json'){
                /**
                 * 1) Grab contents from php://input
                 * 2) Ensure it is a string
                 * 3) Parse JSON to Assoc Array
                 */
                $json = file_get_contents('php://input');
                if(gettype($json) !== 'string'){
                    throw new TypeError("Data sent to Request of invalid type! Data must be a json string!\n $json");
                }
                $data = json_decode($json, JSON_OBJECT_AS_ARRAY);
            } else {
                $data = $_POST;
                /**
                 * Check if file data also sent
                 */
                if($_FILES){
                    // init files array
                    $data['file'] = [];
                   foreach($_FILES[$fileIndex] as $key=>$val){
                        $data['file'][$key] = $val;
                   }
                }
            }
            /**
             * Check data is an array
             * Sanitize Data
             * Return Data
             */
            if(!is_array($data)){
                throw new TypeError('Unable to parse Form Data into an array!');
            }
            return $this->sanitizeData($data);
        }
        /*----------------------------------------------------------*/
        /**
         * Sanitize Data
         * 
         * @param array $data
         * @return array $data
         */
        /*----------------------------------------------------------*/
        public function sanitizeData($data=[]){
            /**
             * Declare Result
             */
            $result = [];
            $errors['unfiltered'] = [];
            /**
             * Loop through data and sanitize by data type
             */
            foreach($data as $key => $value){
                /**
                 * Sanitize by data type
                 */
                if(is_array($value)){
                    // recursive
                    $result[$key] = $this->sanitizeData($value);
                } else if(is_string($value)){
                    /**
                     * Check for email, html, or other string type
                     */
                    if(strpos($key, 'email') !== false){
                        $result[$key] = filter_var($value, FILTER_VALIDATE_EMAIL);
                    } else {
                        /**
                         * Trim
                         * Remove HTML Special Characters
                         */
                        $value = trim($value);
                        $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
                        /**
                         * Check if string value is numeric
                         */
                        if(is_numeric($value)){
                            if(filter_var($value, FILTER_VALIDATE_INT) !== false){
                                $value = intval($value);
                            } else if(filter_var($value, FILTER_VALIDATE_FLOAT) !== false){
                                $value = floatval($value);
                            }
                        }
                        $result[$key] = $value;
                    }
                } else if(is_numeric($value)){
                    /**
                     * Check if int or float
                     */
                    if(is_int($value)){
                        $result[$key] = filter_var($value, FILTER_SANITIZE_NUMBER_INT);
                    } else if(is_float($value)){
                        $result[$key] = filter_var($value, FILTER_SANITIZE_NUMBER_FLOAT);
                    }
                } else if(is_bool($value)){
                    $result[$key] = filter_var($value, FILTER_VALIDATE_BOOLEAN);
                } else {
                    /**
                     * Capture unsanitized data in an error array
                     */
                    $errors['unfiltered'][$key] = $value;
                }
            }
            /**
             * Return Result
             */
            return $result;
        }
        /*----------------------------------------------------------*/
        /**
         * Form Processing Logic
         * 
         * @return array response array
         */
        /*----------------------------------------------------------*/
        public function processForm(callable $callback){
            /**
             * Validate use of method:
             * Method can only be used if data property is populated
             */
            if($this->data === null || !is_array($this->data)){
                throw new Error('Cannot use this method!');
            }
            /**
             * Set header
             */
            header('Content-Type: application/json');
            /**
             * Validate callback
             */
            if(is_callable($callback)){
                $this->response = $callback($this->data, $this->errors);
            }
            /**
             * Process and submit data
             */
            echo json_encode($this->response);
        }
        /*----------------------------------------------------------*/
    }
?>
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
         * @param string $method - SERVER request method form sender
         */
        /*----------------------------------------------------------*/
        public function __construct($method='POST'){
            $this->method       = $_SERVER['REQUEST_METHOD'];
            $this->contentType  = in_array($this->method, ['POST', 'PUT', 'DELETE']) ? $_SERVER['CONTENT_TYPE'] : null;
            /**
             * Validate Request Method
             * Execute Load Data
             * Validate and Load Files into Data array
             */
            $this->data  = $this->validateMethod($method) ? $this->loadData() : null;
            $this->data['files'] = $this->method === 'POST' && isset($_FILES) ? (
                $this->validateFiles() ? $this->loadFiles() : []
            ) : [];
        }
        /*----------------------------------------------------------*/
        /**
         * Validate Request Method
         *
         * @return void
         */
        /*----------------------------------------------------------*/
        public function validateMethod($method){
            if($method !== $this->method){
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
        public function loadData(){
            switch($this->method){
                case 'GET':
                    return $this->handleGET();
                case 'POST':
                    return $this->handlePOST();
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
        public function handlePOST(){
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
            $result = sanitize_data($data);
            if(empty($result)){
                $this->errors['filtered'] = 'Data sanitization returned empty array!';
            }
            /**
             * Return Sanitized Result
             */
            return $result;
        }
        /*----------------------------------------------------------*/
        /**
         * Validate $_FILES data
         * 
         * @property array $_FILES
         * @return bool - $_FILES data is valid (true) | False
         */
        /*----------------------------------------------------------*/
        public function validateFiles(){
            /**
             * Check if $_FILES superglobal is empty
             */
            if(empty($_FILES)){
                return false;
            }
            /**
             * Get and sanitize file input keys
             */
            $input_keys = array_map(function($key){
                return preg_replace('/[^a-zA-Z0-9._-]/', '', $key);
            }, array_keys($_FILES));
            /**
             * Validate that input keys still return arrays
             */
            if(!array_every($input_keys, function($_, $k){
                return is_array($_FILES[$k]);
            })){
                // TODO: Change to add to 'errors' array
                trigger_error('WARNING: $_FILES[...] superglobal contains invalid array keys!');
                return false;
            };
            /**
             * Validate $_FILES input array properties
             */
            $valid_props = ['name', 'type', 'tmp_name', 'error', 'size'];
            $input_props = array_every($_FILES, function($input) use(&$valid_props){
                /**
                 * Declare valid keys and compare
                 */
                
                if(array_key_exists('full_path', $_FILES[$input])){
                    $valid_props[] = 'full_path';
                }
                /**
                 * Check valid keys against $_FILES input props
                 */
                $diff = array_diff($valid_props, array_keys($_FILES[$input]));
                return count($diff) === 0;
            });
            if(!$input_props){
                // TODO: Change to add to 'errors' array
                trigger_error('$_FILES array contains invalid properties!');
                return false;
            }
            /**
             * Evaluate $_FILES errors
             */
            foreach($_FILES as $input => $array){
                // Check for tmp file error
                if(key_exists('error', $array)){
                    $errors = $array['error'];
                    if(is_array($errors)){
                        // Check if errors array has any values other than 0 (OK)
                        if(!in_array(0, $errors)){
                            /**
                             * TODO: Finish
                             * Process Errors
                             */
                            return false;
                        }
                    } else {
                        // Handle single file error
                        if($errors != 0){
                            /**
                             * TODO: Finish
                             * Process Error
                             */
                            return false;
                        }
                    }
                }
            }
            /**
             * $_FILES passed validation
             */
            return true;
        }
        /*----------------------------------------------------------*/
        /**
         * loadFiles
         * 
         * @property array $_FILES - FILES array from file uploads
         * @return bool - Returns a boolean value for success or failure
         */
        /*----------------------------------------------------------*/
        public function loadFiles(){
            /**
             * Loop $_FILES inputs and create File object instances
             */
            $results = [];
            foreach($_FILES as $input => $array){
                // declare files container
                //var_dump($array);
                $props = array_keys($array);
                $count = is_array($array[$props[0]]) ? count($array[$props[0]]) : null;
                if(is_null($count)){
                    $results[] = new File(sanitize_string($array['tmp_name']));
                } else if(is_int($count)){
                    for($i = 0; $i < $count; $i++){
                        $results[] = new File(sanitize_string($array['tmp_name'][$i]));
                    }
                } else {
                    trigger_error('Unable to validate and instantiate new File Object!');
                }
            }
            /**
             * Return results array
             */
            return $results;
        }
        /*----------------------------------------------------------*/
        /**
         * evalFileError
         *
         * @param array $file - File array element from $_FILES
         * @property int $error
         * @return void - Sets $this->errors['files'][$i]
         */
        /*----------------------------------------------------------*/
        public function evalFileError(array $file): void{
            /**
             * Declare $this->errors['files'] as array
             * Declare $result error array
             * Declare File $err prop
             * Declare $msg prop
             */
            $err = is_numeric($file['error']) ? $file['error'] : null;
            $msg = '';
            switch(intval($err)){
                case UPLOAD_ERR_INI_SIZE:
                    $msg = "The uploaded file exceeds the upload_max_filesize directive in php.ini.";
                    break;
                case UPLOAD_ERR_FORM_SIZE:
                    $msg = "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.";
                    break;
                case UPLOAD_ERR_PARTIAL:
                    $msg = "The uploaded file was only partially uploaded.";
                    break;
                case UPLOAD_ERR_NO_FILE:
                    $msg = "No file was uploaded.";
                    break;
                case UPLOAD_ERR_NO_TMP_DIR:
                    $msg = "Missing a temporary folder.";
                    break;
                case UPLOAD_ERR_CANT_WRITE:
                    $msg = "Failed to write file to disk.";
                    break;
                case UPLOAD_ERR_EXTENSION:
                    $msg = "File upload stopped by extension.";
                    break;
                case UPLOAD_ERR_OK:
                    $msg = 'OK';
                    break;
                default:
                    $msg = "Unknown upload error.";
                    break;
            }
            /**
             * Build errors and append to $this->errors['files']
             * Combine $_FILES data with error data
             * Set $this->errors
             */
            if(!is_null($err) || $err == 0){
                $this->errors['files'][] = [
                    'code' => $err,
                    'message' => $msg,
                    'props' => $file
                ];
            }
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
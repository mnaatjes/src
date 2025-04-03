<?php
    /*----------------------------------------------------------*/
    /**
     * FileObject for Convert.php
     * 
     */
    /*----------------------------------------------------------*/
    class File {
        public bool $exists;
        public int $size;
        public string $name;
        public string $path;
        public string $dir;
        public string $ext;
        public string $author;
        public array $timestamp = [
            'accessed' => '',
            'modified' => '',
            'changed' => '',
        ];
        public array $perms = [];
        public array $tmp = [
            'is_tmp' => false,
            'name' => '',
            'dir' => '',
            'user_file' => '',
            'error' => null,
            'exists' => false
        ];
        public array $tags   = [];
        public array $errors = [];
        public string $contents;
        /*----------------------------------------------------------*/
        /**
         * Constructor
         * @param string $filepath - file path string; default '' checks for $_FILES superglobal
         */
        /*----------------------------------------------------------*/
        public function __construct($filepath=''){
            /**
             * TODO: Remove
             */
            $file = $filepath;
            /**
             * 1) Check type of argument passed
             * 2) Check if file exists or not
             * 2) Set properties
             * TODO: Remove 
             */
            $arg = gettype($file);
            /**
             * Temporary File Properties
             */
            $this->tmp = $this->getTmpProps();
            // TODO: Remove
            return;
            /**
             * File Properties
             */
            $this->name = $this->tmp['is_tmp'] ? '' : basename($file);
            $this->dir  = $this->tmp['is_tmp'] ? '' : dirname($file);
            $this->path = $this->tmp['is_tmp'] ? '' : $file;
            $this->ext  = $this->tmp['is_tmp'] && $this->tmp['user_file'] ? pathinfo($this->tmp['user_file'], PATHINFO_EXTENSION) : pathinfo($this->path, PATHINFO_EXTENSION);
            $this->type = $this->tmp['is_tmp'] ? $this->parseType($this->tmp['path']) : $this->parseType($file);
            $this->size = $this->tmp['is_tmp'] ? intval($file['size']) : filesize($file);
            /**
             * File Permissions Properties
             */
            $this->perms = $this->tmp['is_tmp'] ? $this->getPermissions($this->tmp['path']) : $this->getPermissions($this->path);
            /**
             * File Timestamp Information
             */
            $this->timestamp = [
                'accessed' => date('Y-m-d H:i:s', fileatime($this->tmp['is_tmp'] ? $this->tmp['path'] : $file)),
                'modified' => date('Y-m-d H:i:s', filemtime($this->tmp['is_tmp'] ? $this->tmp['path'] : $file)),
                'changed' => date('Y-m-d H:i:s', filectime($this->tmp['is_tmp'] ? $this->tmp['path'] : $file))
            ];
        }
        /*----------------------------------------------------------*/
        /**
         * getTmpError
         *
         * @param int $err - int value of $err condition to evaluate
         * @return array - array of error result
         * @deprecated
         */
        /*----------------------------------------------------------*/
        public function getTmpError($err){

        }
        /*----------------------------------------------------------*/
        /**
         * getFileErrors
         *
         * @param int $val - error value
         * @return array
         * @deprecated
         */
        /*----------------------------------------------------------*/
        public function parseFileError($val){
            if(is_numeric($val) && intval($val) !== UPLOAD_ERR_OK){
                /**
                 * Error handling for file upload
                 */
                $msg;
                switch(intval($val)){
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
                    default:
                        $msg = "Unknown upload error.";
                        break;
                }
                /**
                 * Return array of error data
                 */
                return [
                    'code' => intval($val),
                    'message' => $msg
                ];
            } else {
                return [
                    'code' => 0,
                    'message' => 'OK'
                ];
            }
        }
        /*----------------------------------------------------------*/
        /**
         * getTmpProps
         *
         * @property array $_FILES - files superglobal
         * @return array - return array of tmp properties
         */
        /*----------------------------------------------------------*/
        public function getTmpProps(){
            /**
             * Check $_FILES superglobal and match with $arr argument to check provenance of class input args
             * Validate $_FILES superglobal / $arr data (user supplied from form)
             */
            if(!isset($_FILES)){
                // $_FILES does not exist; cannot fill / is not a temporary file
                return [
                    $this->tmp['is_tmp']    = false,
                    $this->tmp['dir']       = '',
                    $this->tmp['path']      = '',
                    $this->tmp['name']      = '',
                    $this->tmp['user_file'] = '',
                    $this->tmp['error']     = '',
                    $this->tmp['exists']    = ''
                ];
            } else if(isset($_FILES)){
                var_dump($_FILES);
                /**
                 * Sanitize and Validate main key in $_FILES
                 * 1) Get main key and remove escape characters
                 * 2) Validate main key produces an array
                 */
                $main_key = key($_FILES);
                $main_key = preg_replace('/[^a-zA-Z0-9._-]/', '', $main_key); // match any character that is NOT in pattern
                if(!is_array($_FILES[$main_key])){
                    throw new TypeError(sprintf('$_FILES[%1$s] array is not an array OR $_FILES key: %1$s contains invalid characters!', $main_key));
                }
                /**
                 * Validate $_FILES[] keys
                 * 1) Check against known array keys
                 * 2) Check for difference
                 */
                $valid_keys = ['name', 'type', 'tmp_name', 'error', 'size'];
                if(array_key_exists('full_path', $_FILES[$main_key])){
                    $valid_keys[] = 'full_path';
                }
                $diff = array_diff($valid_keys, array_keys($_FILES[$main_key]));
                if(count($diff) !== 0){
                    throw new Error(sprintf('$_FILES[%s] contains invalid array keys!', $main_key));
                }
                /**
                 * Determine single or multiple file uploads
                 * 1) Get type of value for each key; ensure string or int
                 * 2) If single validation resolves, continue, else evaluate for array data-types
                 */
                $types = array_map(function($ele){return gettype($ele);}, $_FILES[$main_key]);
                /**
                 * @property bool $single - true if all gettype of $types array are string or int
                 */
                $single = array_every(
                    // check int or str
                    array_map(function($type){return $type === 'string' || $type === 'integer';}, $types),
                    // eval all true
                    function($k, $v){return $v === true;});
                /**
                 * @property bool $multiple - represents $_FILES[key] contains data on multiple(true) or single(false) file
                 */
                $multiple = $single === true ? false : null;
                var_dump($multiple);
                /**
                 * Sanitize Values
                 */
                /**
                 * Check 'errors' Property and Evaluate
                 */
                /**
                 * Validate File Type
                 */
                /**
                 * Verify File Extension
                 */
                /**
                 * Validate File Size
                 */
                /**
                 * Previous Version
                 * TODO: Fix and Remove
                 */
                /*
                $this->tmp['dir']       = !ini_get('upload_tmp_dir') ? sys_get_temp_dir() : ini_get('upload_tmp_dir');
                $this->tmp['is_tmp']    = $arg == 'array' && is_int(strpos($file['tmp_name'], $this->tmp['dir']));
                $this->tmp['path']      = $file['tmp_name'];
                $this->tmp['name']      = basename($file['tmp_name']);
                $this->tmp['user_file'] = $file['name'];
                $this->tmp['error']     = $this->tmp['is_tmp'] ? $this->parseFileError($file['error']) : null ;
                $this->tmp['exists']    = file_exists($this->tmp['path']);
                */
                /**
                 * Return Assoc Array of TMP values
                 */
                return [];
            } else {
                throw new Error('Unknown Error Case');
            }
        }
        /*----------------------------------------------------------*/
        /**
         * parseType - parse file type
         * @param string $path - file path including file name
         * @return string - mimetype of file
         */
        /*----------------------------------------------------------*/
        private function parseType($path){
            /**
             * TODO: employ mime_content_type()
             */
            /**
             * Check finfo mimetype of file
             */
            $finfo      = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType   = finfo_file($finfo, $path);
            finfo_close($finfo);
            /**
             * Correct for .csv mimetype
             */
            if($mimeType === 'text/plain'){
                /**
                 * Open file
                 * Read contents of first line
                 * Check for comma delimiters
                 */
                $tmpFile = fopen($path, 'r');
                $line    = fgets($tmpFile);
                fclose($tmpFile);
                if(strpos($line, ',') !== false){
                    $mimeType = 'text/csv';
                }
            }
            return $mimeType;
        }
        /*----------------------------------------------------------*/
        /**
         * getPermissions
         * 
         * @param string $path - filepath
         * @property int $owner_id - file path owner
         * @property int $owner_info - file path owner array information
         * @return array - encrypted array of owner data
         */
        /*----------------------------------------------------------*/
        private function getPermissions($path){
            /**
             * Get owner int
             */
            $own_id   = fileowner($path);
            $own_info = [];
            /**
             * Attempt to find owner string from owner_id
             * 1) Check if posix_getpuid for Linux, Unix; part of php library for specific systems
             * 2) TODO: Check if exec exists: use 'escapeshellarg()' !!!
             * 3) Validate $owner_info
             * 4) Return appropriate array
             */
            if(function_exists('posix_getpwuid')){
                $own_info = posix_getpwuid($own_id);
                /**
                 * Could not find id with posix_getpwuid
                 * Encrypt and Return null values
                 */
                if(!$own_info){
                    $owner = null;
                }
            }
            /**
             * Attempt to find group id and group data array
             */
            $grp_id = filegroup($path);
            if(function_exists('posix_getgrgid')){
                $grp_info = posix_getgrgid($grp_id);
            }
            /**
             * Return encrypted perms array
             */
            return encryptData([
                'owner' => [
                    'id' => $own_id,
                    'octal' => substr(sprintf('%o', fileperms($path)), - 4), // get last 4 digits
                    'name' => !$own_info ? '' : $own_info['name'],
                ],
                'group' => [
                    'id' => $grp_id,
                    'name' => !$grp_info ? '' : $grp_info['name'],
                    'members' => !$grp_info ? [] : $grp_info['members']
                ]
            ]);
        }
        /*----------------------------------------------------------*/
        /**
         * upload - upload file to desired directory (from tmp dir)
         * @param string $dir - upload directory
         * @param array $exts - array of valid file extensions (e.g.: .csv, .pdf)
         * @param bool $unique - true means generate unique id for file, otherwise use $this->name;
         * @param string $user_file - if $unique set to false, option to input file name
         * 
         * @property int $max_size - max file size
         * @property bool $dir_exists - true if directory exists or directory created
         * 
         */
        /*----------------------------------------------------------*/
        public function upload($dir, $exts, $unique=true, $user_file=''){
            /**
             * Check for file upload errors
             */
            if($this->tmp['is_tmp'] && $this->tmp['error']['code'] !== 0){
                throw new Error(sprintf('File Upload Error Exists!! Message: %s', $this->tmp['error']['message']));
            }
            /**
             * Validate and clean directory
             * Check if dir exists
             * Otherwise make directory
             */
            if(substr($dir, -1) !== '/'){
                $dir .= '/';
            }
            $dir_exists = !is_dir($dir) ? mkdir($dir, 0775, true): is_dir($dir);
            /**
             * Clean valid extensions array before validating:
             * 1) To lowercase
             * 2) Remove leading periods or other marks
             * 3) Validate against file
             */
            $validExts = [];
            foreach($exts as $ele){
                if(!is_string($ele)){
                    // invalid data type
                    throw new TypeError('Invalid File Extension!');
                }
                // convert to lower
                $str = strtolower($ele);
                // sanitize punctuation and append to array
                $validExts[] = preg_replace('/[[:punct:]]/', '', $str);
            }
            // validate exts
            if(!in_array($this->ext, $validExts)){
                throw new Error('Invalid Extension!');
            }
            /**
             * Get max file size and validate file to upload
             * 1) Convert to bits
             * 2) Compare with one another
             * 3) Check against smallest value
             */
            $php_max_size  = ini_str_to_bytes(ini_get('upload_max_filesize'));
            $post_max_size = ini_str_to_bytes(ini_get('post_max_size'));
            // set smallest
            $max_size = $php_max_size >= $post_max_size ? $post_max_size : $php_max_size;
            // validate
            if($max_size < $this->size){
                throw new Error('File too large to upload! File Exceeds php.ini settings!');
            }
            /**
             * Generate unique_id / filename
             * @property string $filename - result file name
             */
            if($unique){
                $filename = uniqid() . '__' . strtolower(trim($this->tmp['user_file'])) . '__' . date('Y-m-d');
            } else {
                if($filename){
                    // filename input by user
                    $filename = $user_file;
                } else {
                    // get filename from tmp array
                    $filename = strtolower(trim($this->tmp['user_file']));
                }
            }
            /**
             * @property string $destination - final path
             * TODO: add ext to $destination
             */
            $destination = $dir . $filename;
            var_dump($destination);
            /**
             * @property boolean $result - result from upload method
             */
            $result = false;
            /**
             * Move temp file
             */
            /*
            if(move_uploaded_file($this->tmp['path'], $destination)){
                $result = true;
            }
            */
            /**
             * Update object values
             */
            $this->updateProps();
            /**
             * Return boolean
             */
            return $result;
        }
        /*----------------------------------------------------------*/
        /**
         * updateProps
         * @return boolean - true if successful; otherwise false
         */
        /*----------------------------------------------------------*/
        public function updateProps(){
            /**
             * Update tmp props
             */
        }
    }
?>
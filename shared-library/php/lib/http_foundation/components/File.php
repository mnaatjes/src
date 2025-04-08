<?php
    /*----------------------------------------------------------*/
    /**
     * File Class.
     * 
     * Represents a file on the filesystem.
     * Extracts relevant file properties using php methods.
     * Provides methods for validation, file handling, conversion, etc
     */
    /*----------------------------------------------------------*/
    class File {
        /**
         * @var bool $exists - Check if file exists from path using file_exists()
         */
        public bool $exists = false;
        /**
         * @var string $path - Filepath
         */
        public string $path;
        /**
         * @var array $errors - Errors array
         */
        public array $errors = [];
        /**
         * @var array|string $perms - Permissions data array | Encrypted json string
         */
        private $perms;
        /**
         * @var array $time - Timestamp data
         */
        public array $time = [];
        /**
         * @var array $state - State data about file: is_dir, is_file, etc
         */
        public array $state = [];
        /**
         * @var array $tmp - Temporary file properties
         */
        public array $tmp = [];
        /**
         * 
         */
        public string $file_type;
        public string $mime_type;
        public string $os;
        /*----------------------------------------------------------*/
        /**
         * Constructor.
         * 
         * Creates a file object from file-path or $_FILES array data
         * 
         * @param string $filepath - Filepath string of file
         * @throws InvalidArgumentException - If incorrect data-type supplied as argument
         */
        /*----------------------------------------------------------*/
        public function __construct(string $filepath){
            /**
             * Validate $filepath string
             * Throw exception if false
             */
            if(!is_string($filepath) || empty($filepath)){
                throw new InvalidArgumentException('Argument $filepath must be a string and cannot be empty!');
            }
            /**
             * Check if file exists
             * Throw warning if file does not exist
             */
            $this->exists = file_exists($filepath);
            /**
             * Update file properties
             */
            $this->update($filepath);
        }
        /*----------------------------------------------------------*/
        /**
         * Creates File if it does not already exist
         * 
         * @return void - Creates file at designated filepath. Assigns properties to File instance
         */
        /*----------------------------------------------------------*/
        public function create(){}
        /*----------------------------------------------------------*/
        /**
         * Updates File properties
         * 
         * @param string $filepath - Filepath of File instance
         * @return void - Assigns properties to File instance
         */
        /*----------------------------------------------------------*/
        public function update(string $filepath){
            /**
             * Check that file exists before proceeding
             */
            if(!$this->exists){
                trigger_error(sprintf('Warning! File %s does not exist. Must invoke File::create() to proceed!', $filepath));
            } else {
                /**
                 * Assign File Information
                 */
                $file_info = new SplFileObject($filepath);
                /**
                 * Collect remaining file properties
                 */
                $this->name         = basename($filepath);
                $this->path         = $file_info->getPathname();
                $this->dir          = dirname($filepath);
                $this->size         = filesize($filepath);
                $this->state        = $this->getState($filepath);
                $this->perms        = $this->getPermissions($filepath);
                $this->time         = $this->getTimestamp($filepath);
                $this->tmp          = $this->getTemporary($filepath);
                $this->ext          = $this->state['is_tmp'] ? pathinfo($this->tmp['name'], PATHINFO_EXTENSION) : pathinfo($this->path, PATHINFO_EXTENSION);
                $this->file_type    = filetype($filepath);
                $this->mime_type    = $this->getMimeType($this->path);
                $this->os           = $system  = strpos(strtoupper(PHP_OS), 'WIN') ? 'WIN' : PHP_OS;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Gets the mime type of a file
         *
         * @param string $filepath - Filepath of File instance
         * @return string - MIME-type string
         */
        /*----------------------------------------------------------*/
        private function getMimeType($filepath){
            /**
             * Declare containers
             * Check if mime_content_type function exists
             */
            $mime_content   = '';
            $mime_info      = '';
            if(function_exists('mime_content_type')){
                $mime_content = mime_content_type($filepath);
            }
            /**
             * Get mime type from fopen info
             * Grab $mime_info
             * Close finfo()
             */
            $f_info = finfo_open(FILEINFO_MIME_TYPE);
            if($f_info){
                $mime_info = finfo_file($f_info, $filepath);
                finfo_close($f_info);
            }
            /**
             * Check if mime type vars are not false
             */
            if($mime_content === false && $mime_info === false){
                // Unknown mime type
                return 'application/octet-stream';
            }
            /**
             * Check for agreement
             */
            if($mime_content === $mime_info){
                /**
                 * Check for special circumstances
                 * 1) text/plain
                 */
                if($mime_info === 'text/plain'){
                    // Check for csv
                    if(is_file_csv($filepath) && $this->ext === 'csv'){
                        return 'text/csv';
                    }
                    // default
                    return $mime_info;
                }
            }
            /**
             * Return whichever mime var is not false
             */
            return $mime_content === false ? $mime_info : $mime_content;
        }
        /*----------------------------------------------------------*/
        /**
         * Gets File state data
         * @param string $filepath - Filepath of File instance
         * @return array - Returns array of file state properties
         */
        /*----------------------------------------------------------*/
        private function getState(string $filepath): array {
            return [
                'is_tmp' => is_uploaded_file($filepath),
                'is_dir' => is_dir($this->dir),
                'is_file' => is_file($filepath),
                'is_link' => is_link($filepath), // symbolic link ("shortcut", alias)
                'is_readable' => is_readable($filepath),
                'is_writable' => is_writable($filepath),
                'is_executable' => is_executable($filepath)
            ];
        }
        /*----------------------------------------------------------*/
        /**
         * Gets permissions data for file.
         * 
         * @param string $filepath - Filepath of File instance
         * @return array - Returns array of permissions data of file
         */
        /*----------------------------------------------------------*/
        private function getPermissions(string $filepath){
            /**
             * Grab relevant properties
             */
            $system  = strpos(strtoupper(PHP_OS), 'WIN') ? 'WIN' : PHP_OS;
            $decimal = fileperms($filepath);
            $octal   = $system != 'WIN' ? decoct($decimal): null;
            /**
             * Return Encrypted Data
             */
            return encrypt_json([
                'decimal' => $decimal,
                'octal' => $octal,
                'unix' => $system != 'WIN' ? substr($octal, -3) : null,
                'windows' => null, // TODO: get windows file permission data
                'owner' => $system != 'WIN' ? fileowner($filepath) : null,
                'group' => $system != 'WIN' ? filegroup($filepath) : null,
            ]);
        }
        /*----------------------------------------------------------*/
        /**
         * Read permissions array and perform callback before re-encrypting permissions data
         * @param callable $callback - Callback function to perform while decrypted
         * @property string|array $this->perms - Encrypted perms string | Decrypted perms array
         * @return void
         */
        /*----------------------------------------------------------*/
        public function readPermissions(callable $callback){
            /**
             * Validate file exists
             */
            if(!$this->exists){
                throw new Exception('File does not exist! Cannot access file properties with this method!');
            }
            /**
             * Check $this->perms and $this->path set
             * Set perms if not
             */
            if(!isset($this->perms) && !empty($this->path)){
                $this->perms = $this->getPermissions($this->path);
            } else if(!isset($this->perms) && empty($this->path)){
                throw new Exception('Cannot read file properties! File path not defined!');
            }
            /**
             * Declare Permissions properties Class for callback parameters
             * Decrypt perms keys to allow access to callback function
             * Hide perms values
             */
            $obj = new class($this->perms){
                /**
                 * Properties
                 */
                private array $data     = [];
                private array $changed  = [];
                /**
                 * Construct
                 *
                 * @param string $perms
                 */
                public function __construct($perms){
                    $this->data = $this->read($perms);
                }
                /**
                 * Read $perms data
                 *
                 * @param string $perms
                 * @return array - Assigns array to $data array
                 */
                private function read($perms){
                    // extract keys and values from perms
                    $keys = array_keys(decrypt_json($perms));
                    $vals = array_values(array_map(function($val){
                        return encrypt_string($val);
                    }, decrypt_json($perms)));
                    // initialize changed array
                    array_map(function($v, $k){
                        $this->changed[$k] = [
                            'init' => $v,
                            'prev' => $v,
                            'new' => null
                        ];
                    }, $vals, $keys);
                    // return as assoc array
                    return array_combine($keys, $vals);
                }
                /**
                 * getter
                 *
                 * @param string $key
                 * @return mixed
                 */
                private function __get($key){
                    // validate key
                    $key = filter_var($key, FILTER_DEFAULT);
                    // check if key exists
                    if(array_key_exists($key, $this->data)){
                        return $this->data[$key];
                    } else {
                        return null;
                    }
                }
                /**
                 * setter
                 *
                 * @param string $key
                 * @param string $val
                 */
                private function __set($key, $val){
                    // validate key and val
                    $key = htmlspecialchars($key);
                    $val = is_numeric($val) ? filter_var($val, FILTER_SANITIZE_NUMBER_INT) : htmlspecialchars($val);
                    // check if key exists
                    if(array_key_exists($key, $this->data)){
                        // update changed array with old and new values
                        $this->changed[$key]['prev'] = $this->data[$key];
                        $this->changed[$key]['new']  = $val;
                        // update data array with new value
                        $this->data[$key] = $val;
                    } else {
                        trigger_error('Warning: Invalid Operation! Object property NOT set!');
                    }
                }
                /**
                 * Evaluate changes made to the values
                 */
                public function evaluate(){
                    // Compare values that have changed
                    foreach($this->data as $key => $value){
                        $changed = $this->changed[$key];
                        if($changed['init'] !== $value){
                            $this->data[$key] = !is_null($changed['new']) ? $changed['new'] : $changed['prev'];
                        } else {
                            $this->data[$key] = decrypt_string($value);
                        }
                    }
                    // Replace with new values and encrypted
                    return encrypt_json($this->data);
                }
            };
            $callback($obj);
            /**
             * Update permissions properties
             */
            $this->perms = $obj->evaluate();
        }
        /*----------------------------------------------------------*/
        /**
         * Gets timestamp data about file
         *
         * @param string $filepath - Filepath of File instance
         * @return array - Returns array of file timestamp properties
         */
        /*----------------------------------------------------------*/
        private function getTimestamp($filepath){
            return [
                'accessed' => date('Y-m-d H:i:s', fileatime($filepath)),
                'modified' => date('Y-m-d H:i:s', filemtime($filepath)),
                'changed' => date('Y-m-d H:i:s', filectime($filepath)),
            ];
        }
        /*----------------------------------------------------------*/
        /**
         * Get temporary file properties
         *
         * @param string $filepath - Filepath of File instance
         * @return array - Returns array of file temporary properties
         */
        /*----------------------------------------------------------*/
        private function getTemporary($filepath){
            /**
             * Validate is tmp file
             * Check for filepath in $_FILES array
             */
            if(!$this->state['is_tmp']){
                return [];
            }
            /**
             * Find index and data
             * For multiple: save search with key (input element) and index value
             * If int: multiple files
             * If str: one file per input
             */
            $searches = [];
            foreach($_FILES as $input => $_){
                $searches[$input] = array_search_recursive($this->path, $_FILES[$input], true);
            }
            /**
             * Refine search and return $_FILES[input_name] => $index(string|int)
             */
            $search = array_filter($searches, function($val, $key){
                /**
                 * Test conditions for multiple vs single files
                 */
                if(is_int($val) && $val !== false){
                    // multiple index is int
                    return [$key => $val];
                } else if(is_string($val) && $val !== false){
                    // single file
                    return [$key => $val];
                }
            }, ARRAY_FILTER_USE_BOTH);
            // File not found
            if(in_array(false, $search, true)){
                trigger_error('WARNING: Could not find file path index in $_FILES');
                $this->errors['msg'][] = 'Could not find file path!';
                return [];
            }
            /**
             * Declare $input (input name) and $index
             * Grab $record of tmp data from $_FILES
             */
            $input      = key($search);
            $index      = $search[$input];
            $record     = [];
            $prop_count = 0;
            foreach ($_FILES[$input] as $prop => $ele) {
                /**
                 * Check for Multiple / Single Files and get record
                 */
                if(is_array($ele)){
                    // Multiple Files
                    $record[$prop] = $ele[$index];
                } else if (is_string($ele) || is_int($ele)){
                    // Single File
                    $record[$prop] = $ele;
                } else {
                    // File not found
                    $this->errors[$input][$search] = 'Unable to find file in tmp $_FILES array!';
                }
                // gather prop count
                $prop_count++;
            }
            /**
             * Validate and Sanitize Record
             * 1) Check number of props
             * 2) Check value types
             * 3) Sanitize values
             */
            if(count($record) !== $prop_count){
                trigger_error("WARNING: Corrupted file data");
                $this->errors['corrupted'][] = $record;
            }
            /**
             * Return tmp data properties
             */
            return sanitize_data($record);
        }
        /*----------------------------------------------------------*/
        /**
         * Uploads temporary files in $_FILES superglobal to user-supplied destination.
         *  - Checks operating system before uploading file
         *  - If the upload directory does not exist, function creates and validates it
         *  - 
         * @param string $destination - Destination directory
         * @param bool|string $filename - User supplied filename(string) | Default(false) generates unique filename
         * @param array $extensions - Valid extensions allowed for file upload
         * @return bool - Success(true) or Failure(false) uploading and moving file
         */
        /*----------------------------------------------------------*/
        public function upload(string $destination, $filename=false, array $extensions=[]){
            /**
             * Validate arguments:
             */
            if(!is_array($extensions)){
                // Extensions supplied of incorrect type
                trigger_error(sprintf('Argument $extensions must be an array! %s provided', gettype($extensions)));
            }
            /**
             * Ensure extension matches:
             * Empty $extensions array means all allowed
             * Otherwise validate matching extensions
             */
            $ext = count($extensions) !== 0 ? (in_array($this->ext, $extensions) ? $this->ext : null) : $this->ext; 
            if($ext === null){
                trigger_error(sprintf('Failed to upload file! File Extension: %s does not match permitted extensions argument', $this->ext));
                return false;
            }
            /**
             * Get max size from php.ini in bytes
             * Determine size threshold
             * Validate file size and confirm
             */
            $info_max_size  = ini_parse_byte_str(ini_get('upload_max_filesize'));
            $post_max_size  = ini_parse_byte_str(ini_get('post_max_size'));
            $threshold      = min($info_max_size, $post_max_size);
            // Ensure file size does not exceed threshold
            if($this->size > $threshold){
                trigger_error(sprintf('Cannot upload file! Filesize: %d bytes exceeds php.ini settings of: %d bytes', $this->size, $threshold));
                return false;
            }
            /**
             * Normalize destination directory using DIRECTORY_SEPARATOR
             * Ensure ending of path includes correct separator
             */
            $destination = file_normalize_path($destination);
            $sep = DIRECTORY_SEPARATOR;
            if(substr($destination, -1) !== $sep){
                $destination .= $sep;
            }
            if(!is_string($destination)){
                trigger_error('Failed to resolve $destination directory! Could not upload file!');
                return false;
            }
            /**
             * Check if Directory exists
             * Create Directory if not
             * Return bool value if directory created
             */
            $dir_exists = !is_dir($destination) ? mkdir($destination, 0775, true): is_dir($destination);
            /**
             * Validate $directory exists / was created and now exists
             */
            if(!$dir_exists){
                // Could not create directory and directory does not already exist
                trigger_error(sprintf('Failed to find or create destination directory: %s', $destination));
                return false;
            }
            /**
             * Determine Filename:
             * 1) Get filename depending on tmp or extant file
             * 2) Remove extension if present and replace
             * 3) Generate unique name if $filename is false and not a string
             */
            if(!is_string($filename) && is_bool($filename)){
                // select the basename
                $basename = $this->state['is_tmp'] ? $this->tmp['name'] : $this->name;
                // Check for extension
                $pos        = strrpos($basename, '.');
                $suffix     = substr($basename, $pos);
                // validate suffix equals file extension
                if(str_replace('.', '', $suffix) === $this->ext){
                    // remove extension from basename if present
                    $basename = str_replace($suffix, '', $basename);
                }
                // remove excess whitespace
                $original = preg_replace('/\s+/', '', $basename);
                // Generate unique filename
                $filename = uniqid() . '__' . $original . '__' . date('Y-m-d') . '.' . $this->ext;
            } else {
                // Ensure supplied filename includes extension
                $pos = strpos($filename, '.'.$this->ext);
                if(is_int($pos)){
                    $suffix = substr($filename, $pos);
                    // check if suffix len matches ext
                    if($this->ext !== $suffix){
                        // remove suffix and replace with ext
                        $filename = str_replace($suffix, $this->ext, $filename);
                    }
                } else {
                    $filename = $filename . '.' . $this->ext;
                }
            }
            // Validate $filename with extension
            if(pathinfo($filename, PATHINFO_EXTENSION) !== $this->ext){
                trigger_error('Error resolving file extension! Please try again!');
                return false;
            }
            /**
             * Move file for Upload
             * Validate file Move
             * Update file properties
             */
            $filepath = $destination . $filename;
            if(move_uploaded_file($this->path, $filepath)){
                $this->update($filepath);
                return true;
            }
            /**
             * Default to false
             */
            return false;
        }
        /*----------------------------------------------------------*/
        /**
         * Converts file from one document type to another
         * 
         * @param string $output - Output file type
         * @param callable [$callback] - Optional callback for data manipulation during conversion
         * @property array $types - Valid file types with conversion schemas
         */
        /*----------------------------------------------------------*/
        public function convert(string $output){

        }
    }
?>
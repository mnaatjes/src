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
         * @param array|string $file - Filename, path, or object
         * 
         * @param string $arg - input type of parameter: string (filepath) or associative array (file object)
         * @param boolean isPath - checks if the input argument is a filepath
         * 
         */
        /*----------------------------------------------------------*/
        public function __construct($file){
            /**
             * 1) Check type of argument passed
             * 2) Check if file exists or not
             * 2) Set properties
             * 3) 
             */
            $arg    = gettype($file);
            //$isPath = $arg === 'string' ? (preg_match('/\//', '../../apple.pdf') === 1): null;
            /**
             * Temporary File Properties
             */
            $this->tmp['dir']       = !ini_get('upload_tmp_dir') ? sys_get_temp_dir() : ini_get('upload_tmp_dir');
            $this->tmp['is_tmp']    = $arg == 'array' && is_int(strpos($file['tmp_name'], $this->tmp['dir']));
            $this->tmp['path']      = $file['tmp_name'];
            $this->tmp['name']      = basename($file['tmp_name']);
            $this->tmp['user_file'] = $file['name'];
            $this->tmp['error']     = $file['error'];
            $this->tmp['exists']    = file_exists($this->tmp['path']);
            /**
             * TODO: Check for errors in tmp_file
             */
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
            $this->test = decryptData($this->perms);
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
         * Validate file type
         * 
         * @return string - mimetype of file
         */
        /*----------------------------------------------------------*/
        public function parseType($path){
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
         * getOwner
         * 
         * @param string $path - filepath
         * @property int $owner_id - file path owner
         * @property int $owner_info - file path owner array information
         * @return array - encrypted array of owner data
         */
        /*----------------------------------------------------------*/
        public function getPermissions($path){
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
    }
?>
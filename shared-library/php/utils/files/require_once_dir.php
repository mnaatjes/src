<?php
    /**
     * @var int NORMALIZE_PATH_DEFAULT
     * - Normalizes the filepath using realpath()
     * - Paths created using DOCUMENT_ROOT
     */
    define('NORMALIZE_PATH_DEFAULT', 0);
    /**
     * @var int NORMALIZE_PATH_DEFAULT 
     * - Normalizes the filepath using realpath()
     * - Paths created using system directory
     */
    define('NORMALIZE_PATH_ABSOLUTE', 1);
    /**
     * Method to include all files within supplied directory path.
     * - Uses require_once() on all files within a given directory
     * - Grabs all files within directory and validates not empty
     * - Normalizes 
     * - Returns true if successful or false if failed validation
     * @param string $path
     * @param int $normalize Indicated how the path should be normalized. Default(0) NORMALIZE_PATH_DEFAULT (i.e. Document ROOT)
     * @return bool True = success, False on failure
     */
    function require_once_dir(?string $path=null, int $normalize=NORMALIZE_PATH_DEFAULT): bool{
        // Validate $dir_path is populated
        if(empty($path) || is_null($path)){
            return false;
        }
        // Validate path is to a directory and not a file
        if(!is_dir_path($path)){
            // path points to file, NOT directory
            return false;
        }
        /**
         * Normalize file path:
         * - Get normal path
         * - Check that normal path is a directory which exists
         * - Determine Absolute or Relative path normalization
         * - Perform path resolution
         * - Verify that normal path exists
         */
        // Get normal path
        $path = file_normalize_path($path);
        // Determine if path will be based on Absolute or Document Root path
        if($normalize === NORMALIZE_PATH_ABSOLUTE){
            // Resolve Absolute Path
            $normal_path = get_path_absolute($path);
        } else if ($normalize === NORMALIZE_PATH_DEFAULT){
            // Resolve Document Root Path
            $normal_path = get_path_document_root($path);
        }
        /**
         * Grab contents of directory and loop
         * - Ignore '.' and '..'
         * - Check pathinfo() to validate file has .php ext
         * - Generate and test filepaths to each file
         */
        $contents = scandir($normal_path);
        foreach($contents as $item){
            if($item !== '.' && $item !== '..'){
                // Check if directory
                $sub_dir = $normal_path . DIRECTORY_SEPARATOR . $item;
                if(is_dir($sub_dir)){
                    //log_dump('sub directory', $sub_dir);
                    // Recursively implement for nested directories
                    require_once_dir($sub_dir, $normalize);
                }
                // Build filepath for php files
                if(pathinfo($item, PATHINFO_EXTENSION) === 'php'){
                    $filepath = $normal_path . DIRECTORY_SEPARATOR . $item;
                    //log_dump('FILEPATH:', $filepath);
                }
            }
        }
        //log_dump('require_once_dir', $contents);
        // Grab all files from directory path
        // Return default
        return true;
    }
?>
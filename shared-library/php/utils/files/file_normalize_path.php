<?php
    /**
     * Uses DIRECTORY_SEPARATOR to replace a filepath or directory string with the OS compliant character.
     * 
     * @param string $path - Path to evaluate and alter if necessary
     * @return string|null - Altered(if necessary) path to correct separator; i.e. normalized; Null for invalid
     */
    function file_normalize_path(?string $path): ?string{
        /**
         * Trim any leaning or trailing whitespaces
         */
        $path = trim($path);
        /**
         * Check for empty path
         */
        if(empty($path)){
            return null;
        }
        /**
         * @var bool $is_dir Checks for ending Directory separator
         * - True if path ends in directory
         * - False if path ends in file
         */
        $is_valid_dir = is_dir_path($path);
        /**
         * Replace both forward and backward slashes with $sep
         */
        $path = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $path);
        /**
         * Check length of filepath:
         * - Ensure only contains directory separator
         */
        if(strlen($path) === 1 && $path !== DIRECTORY_SEPARATOR){
            // Invalid filepath
            return null;
        }
        /**
         * Remove redundant separators:
         * - Replace occurrences of 2 or more consecutive separator characters
         * - preg_quote() escapes special regex characters
         * - {2,} two or more occurrences
         * Remove excessive periods for relative paths
         */
        $path = preg_replace('/' . preg_quote(DIRECTORY_SEPARATOR, '/') . '{2,}/', DIRECTORY_SEPARATOR, $path);
        $path = preg_replace('/\.{3,}/', '..', $path);
        /**
         * Check for path traversal attack:
         * - Check for relative path traversal characteristics
         * - Ensure relative path traversals ('../') do not exceed Document Root
         */
        $count = substr_count($path, '../');
        /**
         * Check if path contains absolute path characteristics
         * Check for relative paths and root directory
         * - Check first character of path
         * - Check last character of path
         */
        if(strpos($path, DIRECTORY_SEPARATOR) === 0){
            /**
             * Path begins with Separator:
             * - Ensure valid absolute path
             */
        }
        /**
         * Explode segments of filepath:
         * - Remove '.' and empty segments
         * - Remove inner relative path traversals and go up a level
         * - Return relative as $results array
         */
        $results  = [];
        $segments = explode(DIRECTORY_SEPARATOR, $path);
        foreach($segments as $segment){
            // remove . and empty
            if($segment === '.' || $segment === ''){
                continue;
            } else if($segment === '..'){
                // Check if $results array has any segments
                if(!empty($results)){
                    // check previous segment in results
                    if(end($results) === '..'){
                        // append to relative traversal
                        $results[] = '..';
                    } else {
                        // go up a level by removing the previous segment
                        array_pop($results);
                    }
                } else {
                    // place at start of path
                    $results[] = '..';
                }
            } else {
                // append segment
                $results[] = $segment;
            }
        }
        $normal_path = implode(DIRECTORY_SEPARATOR, $results);
        // Append ending Separator if valid directory
        if($is_valid_dir){
            $normal_path = $normal_path . DIRECTORY_SEPARATOR;
        }
        /**
         * Return Normalized Path
         */
        return $normal_path;
    }
?>
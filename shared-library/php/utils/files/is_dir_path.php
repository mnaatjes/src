<?php
    /**
     * Parses the supplied path and returns True if the path points to a directory and does not end in a filename.
     * - Does not resolve the directory or check if it exists.
     * - Does not normalize or validate the path itself
     * @param string $path Path to evaluate
     * @return bool True === is directory; False is not a directory or is a path ending in a filename
     */
    function is_dir_path(?string $path=null): ?bool{
        /**
         * Validate path string
         */
        if(is_null($path)){
            return null;
        }
        $path = trim($path);
        if(empty($path)){
            return null;
        }
        /**
         * Replace '/' or '\' with Directory separator
         * Check if path ends in Directory Separator
         */
        $path = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $path);
        if(substr($path, -strlen(DIRECTORY_SEPARATOR)) ===  DIRECTORY_SEPARATOR){
            return true;
        }
        /**
         * File missing ending separator:
         * - Evaluate end of string before last separator
         * - If no separator present, return full path
         * - Check for '.' indicating file extension
         */
        $position   = strrpos($path, DIRECTORY_SEPARATOR);
        $segment    = is_int($position) ? substr($path, $position) : $path;
        if(!is_int(strpos($segment, '.'))){
            // path does NOT contain an extension
            return true;
        }
        /**
         * Return default
         */
        return false;
    }
?>
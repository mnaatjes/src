<?php
    /**
     * Resolves provided filepath to its absolute path equivalent.
     * - Does not normalize the filepath
     * - Validates that the path is not already an absolute path
     * - Uses DIRECTORY SEPARATOR
     * @param string $path Filepath to resolve
     * @return string|null String if resolved; Null on failure
     */
    function get_path_absolute(?string $path=null): ?string{
        /**
         * Validate string
         * - Null
         * - Empty
         */
        if(is_null($path)){
            return null;
        }
        $path = trim($path);
        if(empty($path)){
            return null;
        }
        $path = realpath(file_normalize_path($path));
        if(!is_dir($path)){
            return null;
        }
        /**
         * Return absolute path
         */
        return realpath($path);
    }
?>
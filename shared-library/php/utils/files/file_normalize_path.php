<?php
    /**
     * Uses DIRECTORY_SEPARATOR to replace a filepath or directory string with the OS compliant character.
     * 
     * @param string $path - Path to evaluate and alter if necessary
     * @property string $sep - DIRECTORY_SEPARATOR PHP Constant Variable of appropriate character for path separation
     * @return string - Altered(if necessary) path to correct separator; i.e. normalized
     */
    function file_normalize_path(string $path){
        $sep = DIRECTORY_SEPARATOR;
        /**
         * Replace both forward and backward slashes with $sep
         */
        $path = str_replace(['/', '\\'], $sep, $path);
        /**
         * Remove redundant separators:
         * - Replace occurances of 2 or more consecutive separator characters
         * - "#" avoids the need to escape '/' character
         * - preg_quote() escapes special regex characters
         * - {2,} two or more occurances
         * Remove excessive periods for relative paths
         */
        $path = preg_replace('#' . preg_quote($sep, '#') . '{2,}#', $sep, $path);
        $path = preg_replace('/\.{3,}/', '..', $path);
        /**
         * Return Normalized Path
         */
        return $path;
    }
?>
<?php
    /**
     * Gets the document root of the server from http request properties or server variables.
     * 
     * @param void
     * @return string The document root of the server. | Null if not found.
     */
    function getDocumentRoot() {
        // Check if the document root is set in the server variables
        $result = null;
        if (isset($_SERVER['HTTP_DOCUMENT_ROOT'])) {
            $result = $_SERVER['HTTP_DOCUMENT_ROOT'];
        } elseif (isset($_SERVER['DOCUMENT_ROOT'])) {
            $result = $_SERVER['DOCUMENT_ROOT'];
        }
        /**
         * Check if result is empty / null
         * - If null | empty; return null
         */
        if(empty($result) || is_null($result)) {
            return null;
        }
        /**
         * Validate the result
         * - Check if the result is a valid directory
         */
        if(is_dir($result)) {
            return $result;
        }
        /**
         * Failed checks; return null
         */
        return null;
    }
?>
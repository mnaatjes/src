<?php
    /**
     * Builds a filepath relative to the $_SERVER['DOCUMENT_ROOT'].
     * 
     * @param string $relative_path - The filepath
     * @return string|null - Built relative path | Null if failed
     */
    function build_doc_root_path(string $relative_path) {
        /**
         * Validate that $_SERVER['DOCUMENT_ROOT'] is set
         */
        $doc_root = get_document_root();
    }
?>
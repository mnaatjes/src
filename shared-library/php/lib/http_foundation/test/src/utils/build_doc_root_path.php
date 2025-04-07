<?php
    /**
     * Builds a filepath relative to the $_SERVER['DOCUMENT_ROOT'].
     * 
     * @param string $filepath - The filepath to resolve
     * @return string|null - Built relative path | Null if failed
     */
    function build_doc_root_path(string $filepath) {
        /**
         * Validate that $_SERVER['DOCUMENT_ROOT'] is set
         * - Check not null or empty
         * - Return null if undefined
         */
        $doc_root = getDocumentRoot();
        // Validate
        if(is_null($doc_root) || empty($doc_root)){
            return null;
        }
        /**
         * Sanitize and validate $filepath:
         * - Replace harmful symbols for path traversal
         * - Normalize path to realpath(Document Root + Filepath supplied)
         * - Validate that realpath()s start with the same directory strings
         * - Peel-off realpath system directories after document root
         * - Prepend document root directories
         * - Return path
         */
        // Sanitize
        $filepath = preg_replace('/[^a-zA-Z0-9._\-\/\\\\]/', '', $filepath);
        // Normalize
        $normal_path = realpath($doc_root . DIRECTORY_SEPARATOR . $filepath);
        // Validate normal and document root begin at same directory
        $position = strpos(realpath($filepath), realpath($doc_root));
        if($position !== 0){
            // Could not resolve paths
            return null;
        }
        /**
         * Replace system directories and prepend DOCUMENT_ROOT
         * Return relative path | null if filepath is not resolved
         */
        return $doc_root . substr(realpath($filepath), strlen(realpath($doc_root)));
    }
?>
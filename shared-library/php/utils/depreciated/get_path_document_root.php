<?php

use PhpParser\Node\Scalar\MagicConst\Dir;

    /**
     * Builds a filepath relative to the $_SERVER['DOCUMENT_ROOT'].
     * 
     * @param string $path - The filepath to resolve
     * @return string|null - Resolved path from DOCUMENT_ROOT | Null if failed
     */
    function get_path_document_root(?string $path): ?string {
        /**
         * Validate
         */
        if(is_null($path)){
            return null;
        }
        $path = trim($path);
        if(empty($path)){
            return null;
        }
        /**
         * Get absolute path
         */
        $absolute_path = get_path_absolute($path);
        /**
         * Validate that $_SERVER['DOCUMENT_ROOT'] is set
         * - Validate server
         * - Check not null or empty
         * - Return null if undefined
         */
        if(!isset($_SERVER) || empty($_SERVER)){
            return null;
        }
        if(!isset($_SERVER['DOCUMENT_ROOT'])){
            return null;
        }
        $document_root = get_document_root($_SERVER);
        /**
         * Return default
         */
        return null;
    }
?>
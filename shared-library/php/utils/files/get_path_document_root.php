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
        // DEBUGGING
        $document_root = $document_root;
        // Validate
        if(is_null($document_root) || empty($document_root)){
            return null;
        }
        //log_dump('abs path', $absolute_path);
        /**
         * Find directory(s) of DOCUMENT_ROOT in absolute path
         * - Check if entire DOCUMENT_ROOT can be found within absolute path
         * If not found:
         * - Explode path
         * - Check for position match
         */
        $position = strpos($absolute_path, $document_root);
        if(!is_int($position)){
            $directories = explode(DIRECTORY_SEPARATOR, $document_root);
            $results = [];
            $segment = '';
            foreach($directories as $dir){
                $pos = strpos($absolute_path, $dir);
                if(is_int($pos)){
                    $results[] = [
                        'pos' => $pos,
                        'dir' => $dir,
                        'len' => strlen($dir)
                    ];
                    $segment .= $dir . DIRECTORY_SEPARATOR;
                }
            }
            // Check that segment doesn't have trailing separator
            if(strlen($segment) > 0 && substr($segment, -1) === DIRECTORY_SEPARATOR){
                $segment = substr($segment, 0, -1);
            }
            /**
             * Parse included directories within the $results array
             */
            if(empty($results)){
                // Document Root Path could NOT be resolved
                return null;
            }
            /**
             * Define positions for start and end of substring within absolute path
             */
            $start_abs  = min(array_map(function($ele){return $ele['pos'];}, $results));
            $position   = strlen($segment) + $start_abs;
        }
        /**
         * Replace system directories and prepend DOCUMENT_ROOT
         * Return relative path | null if filepath is not resolved
         * - Clip absolute path from 0 to end
         * - Replace with DOCUMENT ROOT
         * - Validate path works
         */
        $result_path = $document_root . substr($absolute_path, $position);
        if(is_dir($result_path)){
            return $result_path;
        }
        /**
         * Return default
         */
        return null;
    }
?>
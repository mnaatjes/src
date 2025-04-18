<?php
    /**
     * Determines the mime type (Content-Type) of a file from a given filepath and returns the mime type
     * @param string $filepath
     * @return string File's mime type
     */
    function get_file_mimetype(string $filepath){
        /**
         * Declare results array
         */
        $results = [
            'finfo'         => null,
            'mime_content'  => null,
            'ext'           => null
        ];
        /**
         * Attempt 1:
         * - Use finfo_open() to read mimetype
         */
        if(function_exists('finfo_open')){
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            if($finfo){
                $results['finfo'] = finfo_file($finfo, $filepath);
                finfo_close($finfo);
            }
        }
        /**
         * Attempt 2:
         * - Use mime_content_type()
         */
        if(function_exists('mime_content_type')){
            $results['mime_content'] = mime_content_type($filepath);
        }
        /**
         * Attempt 3:
         * - using get_file_extension() utils function
         */
        $results['ext'] = get_file_extension($filepath);
        var_dump($results);
    }

?>
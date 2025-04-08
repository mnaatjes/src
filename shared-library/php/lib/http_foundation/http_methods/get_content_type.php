<?php
    /**
     * Grabs the content type from the request headers.
     * 
     * @param void
     * @return string|null The content type of the request. | Null is not set.
     */
    function getContentType() {
        // Check $_SERVER super global for content type
        $result = null;
        if (isset($_SERVER['HTTP_CONTENT_TYPE'])) {
            $result = $_SERVER['HTTP_CONTENT_TYPE'];
        } elseif (isset($_SERVER['CONTENT_TYPE'])) {
            $result = $_SERVER['CONTENT_TYPE'];
        }
        // Validate that $result is not empty
        if(empty($result) || is_null($result)) {
            // Use getallheaders() to get the content type
            $headers = getallheaders();
            if (isset($headers['Content-Type'])) {
                $result = $headers['Content-Type'];
            } elseif (isset($headers['content-type'])) {
                $result = $headers['content-type'];
            }
        }
        /**
         * Validate that $result is not empty or null and return value
         * Else return null
         */
        if (empty($result) || is_null($result)) {
            return null;
        } else {
            return $result;
        }
    }
?>
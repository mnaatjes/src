<?php
    /**
     * Extracts and returns the HTTP method from the request.
     * - Uses Request::getRequestMethod static method
     * @param array $params - Server parameters; usually from $_SERVER
     * @return string The HTTP method (GET, POST, PUT, DELETE, etc.) | Null if not set
     */
    function get_request_method($params) {
        return Request::getRequestMethod($params);
    }
?>
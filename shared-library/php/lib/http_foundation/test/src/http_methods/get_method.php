<?php
    /**
     * Extracts and returns the HTTP method from the request.
     * 
     * @param void
     * @return string The HTTP method (GET, POST, PUT, DELETE, etc.) | Null if not set
     */
    function getMethod() {
        // Check if the request method is set in the server variables
        if (isset($_SERVER['REQUEST_METHOD'])) {
            // Return the request method in uppercase
            return strtoupper($_SERVER['REQUEST_METHOD']);
        }
        // Return null if the request method is not set
        return null;
    }
?>
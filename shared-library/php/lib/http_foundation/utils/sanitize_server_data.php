<?php
    /**
     * Sanitizes and Filters $_SERVER superglobal
     * 
     * @param array $params - Server parameters; usually from $_SERVER
     * @return array|null - Assoc Array of $_SERVER superglobal properties | Null if 
     */
    function sanitize_server_data(array $params=[]){
        return Request::sanitizeServerParams($params);
    }
?>
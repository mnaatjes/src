<?php
    /**
     * Gets the document root of the server from http request properties or server variables.
     * 
     * @param array $params - Server parameters; usually from $_SERVER
     * @return string The document root of the server. | Null if not found.
     */
    function get_document_root($params) {
        return Request::getDocumentRoot($params);
    }
?>
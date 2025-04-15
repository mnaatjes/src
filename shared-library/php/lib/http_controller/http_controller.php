<?php
    /**
     * HTTP Controller Primary file to include to use package
     * @package httpController
     * @author Michael Naatjes
     * @license MIT
     * @version 2.1.0
     * @since 04/14/2024
     * @filesource 
     */
    /**
     * Constants
     */
    require_once('constants/valid_http_methods.php');
    require_once('constants/valid_http_protocols.php');
    require_once('constants/valid_http_status.php');
    /**
     * Utils
     */
    require_once('utils/sanitize_server_data.php');
    /**
     * Components
     */
    require_once('components/HTTPHeaders.php');
    require_once('components/HTTPRequest.php');
    /**
     * Other
     */
?>
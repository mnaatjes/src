<?php
    /**
     * @file Includes all necessary properties, constants, methods, objects, classes and utilities necessary.
     * @since 04/08/25
     * @version 2.0.0
     */
    /*----------------------------------------------------------*/
    /**
     * Constants
     */
    /*----------------------------------------------------------*/
    //require_once('./constants/error_settings.php');
    //require_once('./constants/format_options.php');
    require_once('constants/http_content_types.php');
    require_once('constants/http_status.php');
    require_once('constants/valid_http_methods.php');
    require_once('constants/valid_http_protocols.php');
    //require_once('./constants/valid_mime_types.php');
    /*----------------------------------------------------------*/
    /**
     * Utility Methods
     */
    /*----------------------------------------------------------*/
    require_once('utils/sanitize_server_data.php');
    require_once('utils/parse_global_server.php');
    /*----------------------------------------------------------*/
    /**
     * Classes and Objects
     */
    /*----------------------------------------------------------*/
    require_once('components/File.php');
    require_once('components/Headers.php');
    require_once('components/Request.php');
    require_once('components/Response.php');



?>
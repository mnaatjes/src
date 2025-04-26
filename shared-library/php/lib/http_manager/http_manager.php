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
    require_once('utils/validate_resource_path.php');
    require_once('utils/normalize_resource_path.php');
    require_once('utils/parse_query_parameters.php');
    /**
     * http objects
     */
    require_once('http/Headers.php');
    require_once('http/URIInterface.php');
    require_once('http/Request.php');
    require_once('http/Response.php');
    /**
     * Models
     */
    require_once('models/Model.php');
    //require_once('models/SpeechModel.php');
    /**
     * Controllers
     */
    require_once('controllers/InvokeController.php');
    //require_once('controllers/SpeechController.php');
    /**
     * Router object
     */
    require_once('router/Router.php');
?>
<?php
    /**
     * @author Michael Naatjes
     * @since 2025-04-05
     * @version 2.0.0
     * @file test.php
     * @brief Test script for the response library.
     * - Default behavior and debugging for request handling
     * - HTTP request handling
     * - GET/POST request handling
     * - JSON request handling
     * - XML request handling
     * - File upload handling
     * - Error handling
     */
    header('Content-Type: application/json');
    /**
     * Require utils:
     * Require HTTP Methods:
     * - getMethod
     */
    require_once('../../../../utils/main.php');
    require_once('../../constants/http_status.php');
    require_once('../../constants/valid_http_methods.php');
    require_once('../../constants/valid_http_protocols.php');
    require_once('../../http_methods/get_method.php');
    require_once('../../http_methods/get_content_type.php');
    require_once('../../utils/sanitize_server_data.php');
    ini_errors_enable();
    /**
     * Request Object
     * File Object
     */
    require_once('../../components/Request.php');
    require_once('../../components/File.php');
    /**
     * Send Response
     */
    $request = new Request();
    echo trim(json_encode([
        'Request' => $request,
        'props' => [
            'Content-type' => $request->getHeader('content-type'),
            'Document_ROOT' => $request->getDocumentRoot($_SERVER),
            'Request Method' => $request->getRequestMethod($request->serverParams)
        ],
    ], JSON_PRETTY_PRINT));
?>
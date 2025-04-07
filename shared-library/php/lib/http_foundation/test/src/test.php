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
    require_once('constants/http_status.php');
    require_once('constants/valid_http_methods.php');
    require_once('constants/valid_http_protocols.php');
    require_once('http_methods/get_method.php');
    require_once('http_methods/get_content_type.php');
    require_once('http_methods/get_document_root.php');
    require_once('utils/build_doc_root_path.php');
    require_once('utils/sanitize_server_data.php');
    /**
     * Send Response
     */
    echo trim(json_encode([
        'props' => [
            'method' => getMethod(),
            'content_type' => getContentType(),
            'getDocumentRoot' => getDocumentRoot(),
            'http_response_code' => http_response_code()
        ],
        'utils' => [
            'build_doc-root_path' => build_doc_root_path('../test.json'),
            'sanitized $_SERVER data' => sanitize_server_data()
        ],
        'constants' => [
            'HTTP_STATUS' => HTTP_STATUS,
            'response_string' => HTTP_STATUS[http_response_code()]
        ]
    ]));
?>
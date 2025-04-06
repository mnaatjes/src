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
    require_once('http_methods/get_method.php');
    require_once('http_methods/get_content_type.php');
    require_once('http_methods/get_document_root.php');
    echo trim(json_encode([
        'props' => [
            'method' => getMethod(),
            'content_type' => getContentType(),
            'getDocumentRoot' => getDocumentRoot(),
        ],
        'paths' => [
            '__DIR__' => __DIR__,
            '__FILE__' => __FILE__,
            'directory' => dirname(__FILE__),
            'realpath_file' => realpath(__FILE__),
            'realpath_src' => realpath('../../'),
            'PATH_INFO' => $_SERVER['PATH_INFO'],
            'PHP_SELF' => $_SERVER['PHP_SELF'],
            'pathinfo()' => pathinfo($_SERVER['DOCUMENT_ROOT'])
        ],
        'all_headers' => getallheaders(),
        'SERVER' => $_SERVER,
    ]));
?>
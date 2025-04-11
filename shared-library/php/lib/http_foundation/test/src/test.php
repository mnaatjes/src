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
     * Require:
     * - Utils Library
     * - HTTP Framework
     */
    require_once('../../../../utils/main.php');
    require_once('../../http_foundation.php');
    ini_errors_enable();
    $headers = new Headers(true);
    $headers->send();
    //var_dump($headers->getProperties());
    //echo trim(json_encode(new Request($_SERVER), JSON_PRETTY_PRINT));
?>
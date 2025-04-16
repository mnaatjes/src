<?php
    /**
     * @author Michael Naatjes
     * @since 04/15/2025
     * @version 2.5.0
     * @file test.php
     * @brief Test script for the HTTP Controller package.
     * - $_SERVER parameters validation
     */
    header('Content-Type: application/json');
    /**
     * Require:
     * - Utils Library
     * - HTTP Framework
     */
    require_once('../../../utils/main.php');
    require_once('../http_manager.php');
    ini_errors_enable();
    /**
     * Debugging RequestController Object
     */
    $request    = new Request();
    $response   = new Response();
    $test = $request->uri->getResourcePath();
    var_dump($request->uri->getQuery());
    var_dump($request->uri->getQueryParam('size'));
?>
<?php
    /**
     * @author Michael Naatjes
     * @since 04/15/2025
     * @version 2.5.0
     * @file test.php
     * @brief Test script for the HTTP Controller package.
     * - $_SERVER parameters validation
     */
    //header('Content-Type: application/json');
    /**
     * Utils Framework
     */
    require_once('../../../utils/main.php');
    /**
     * HTTP Manager
     */
    require_once('../http_manager.php');
    /**
     * Database Manager
     */
    require_once('../../db_manager/db_manager.php');
    header('Content-Type: application/json');
    ini_errors_enable();
    /**
     * Debugging
     */
    /**
     * Declare Router with Request and Response Objects
     */
    $router = new Router(new Request(), new Response(), []);
    /**
     * Add routes
     */
    $router->addRoute('GET', '/products/{id}/colors/{color}', function($req, $res, $args){});
    /**
     * Test Route: Show
     */
    $router->addRoute('GET', '/speech/{pkey}', new SpeechController(new SpeechModel()));
    /**
     * Testing Route: Index
     * /speech 
     */
    $router->addRoute('GET', '/speech', new SpeechController(new SpeechModel()));
    /**
     * Planets JSON GET
     */
    $router->addRoute('GET', '/planets', function($req, $res){
        $res->setHeader('status', 200);
        $res->setContentType('application/json');
        $res->setBodyFromFile('../test/data/planets.json');
        $res->send();
    });
    $router->dispatch();
?>
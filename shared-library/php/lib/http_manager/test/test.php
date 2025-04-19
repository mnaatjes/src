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
    $router     = new Router($request, $response, []);
    $router->addRoute('GET', '/products/{id}/colors/{color}', new InvokeController());
    /**
     * /users/items 
     */
    $router->addRoute('GET', '/users/items', new InvokeController());
    /**
     * /users/items 
     */
    $router->addRoute('GET', '/users/{id}/items/{balls}', function($req, $res, $args){
        var_dump($args);
    });
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
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
    ini_errors_enable();
    /**
     * Debugging
     */
    //header('Content-Type: application/json');
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
    $router->addRoute('GET', '/speech', function($req, $res, $args){
        /*
        Model::setConfig([
            'host'      => 'localhost',
            'username'  => 'gemini',
            'password'  => 'web234egs',
            'database'  => 'test',
            'driver'    => 'mysql',
        ]);
        */
        $model = new TestModel();
        //$model->test();

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
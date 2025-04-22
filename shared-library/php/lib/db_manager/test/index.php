
<?php
    // set header
    header('Content-type: application/json');
    /**
     * Require utils and enable errors
     */
    require_once('../../../utils/main.php');
    ini_errors_enable();
    /**
     * Require DB Manager
     */
    require_once('../db_manager.php');
    /**
     * Declare connection object
     */
    $config = ([
        'host'      => 'localhost',
        'username'  => 'gemini',
        'password'  => 'web234egs',
        'database'  => 'test',
        'driver'    => 'mysql',
    ]);
    /**
     * Testing DB
     * 
     */
    $db = new Database($config);
    $db->connect();
    $sql = "SELECT * FROM speech WHERE part = 'v'";
    $result = $db->query($sql);
    var_dump($result->rowCount());
    var_dump($result->fetchAll());


?>
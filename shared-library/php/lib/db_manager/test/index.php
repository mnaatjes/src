<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PHP DB Test</title>
    <!--<link rel="stylesheet" href="../../../../styles/css/main.css">-->
    <link rel="stylesheet" href="../../http_manager/test/simple.css">
  </head>
  <body>
    <header>
        <h2>PHP DB Test</h2> 
    </header>
    <main>
        <section>
        <?php
            /**
             * Require utils and enable errors
             */
            require_once('../../../utils/main.php');
            ini_errors_enable();
            /**
             * Require DB Manager
             */
            require_once('../db_manager.php');
            $conn = new DBConnection([
                'host'      => 'localhost',
                'username'  => 'gemini',
                'password'  => 'web234egs',
                'database'  => 'test',
                'driver'    => 'mysql',
                ]);
                $conn->connect();
                $conn->disconnect();
                /*
                $conn->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt   = $conn->pdo->query("SHOW TABLES");
                $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
                var_dump($tables);
                */
        ?>
        </section>
        <section id="display"></section>
    </main>
    <!--<script type="module" src="./main.js"></script>
  </body>
</html>
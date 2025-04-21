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
             * Class Testing
             */
            class Speech{
                public $username;
                public $password;
                public function __construct(){
                    $this->username = 'Gemnini';
                    $this->password = 'Gemini1200123';
                }
                public function __invoke(){$this->speak();}
                public function speak(){echo 'INVOKE<br>';}
            }
            class Controller{
                public function __construct(){}
                public function con(){
                    return new Speech();
                }
                public function inv(){
                    $obj = new Speech();
                    return $obj();
                }
            }
            $test = new Controller();
            var_dump($test->con());
            var_dump($test->inv());
            /**
             * Declare DB object
             */
            /*
            $db = new Database($config);
            $db->connect();
            /**
             * Test Query
             */
            /*
            $records = $db->query("SELECT * FROM speech")->fetchAll();
            //var_dump($db->lastInsertID());
            //var_dump($records);
            $db->disconnect();
            */
        ?>
        </section>
        <section id="display"></section>
    </main>
    <!--<script type="module" src="./main.js"></script>
  </body>
</html>
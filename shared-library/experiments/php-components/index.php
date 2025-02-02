<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CIS193 PHP</title>
    <link rel="stylesheet" href="../../styles/css/main.css">
  </head>
  <body>
    <?php
        /**
         * Require
         */
        require_once '../../php/utils/utils-main.php';
        require_once '../../php/components/components.php';
        require_once './core/constants/globals.php';
        /**
         * enable errors
         */
        enableErrors();
        /**
         * test class
         */
        class Test {
            public $fruit;
            public function __construct($param='banaan'){
                $this->fruit = $param;
            }
            public function salad(){
                return $this->fruit;
            }
        }
        $data       = array_slice(json_decode(file_get_contents('../../../shared-library/data/json/english.json'), true), 0, 25);
        $num        = 0.453543535400;
        $test       = new Test();
        $testString = 'Ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
        $html       = new HTMLComponent('p', [], [], ['textContent'=>$testString]);
        $html->render();
        $html->mount();
        debug($data[0]);
    ?>
    <header>
        <h1>PHP Component Test</h1>
    </header>
    <main id="root">
    </main>
    <footer>
    </footer>
    <?php
        /**
         * check if scripts file exists
         * if scripts file, import using module string
         * echo modules string
         */
        if(file_exists($GLOBALS['FP_SCRIPTS'])){
            /**
             * render scripts tag on string
             */
            printf('<script src="%s"></script>', htmlspecialchars($GLOBALS['FP_SCRIPTS']));
        }
    ?>
    <script src="./test.js"></script>
  </body>
</html>
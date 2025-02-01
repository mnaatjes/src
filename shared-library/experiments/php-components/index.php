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
        include './core/utils/utils__main.php';
        include './core/component-obj.php';
        include './core/component-button.php';
        include './core/component-table.php';
        include './core/component-list.php';
        include './core/constants/globals.php';
        /**
         * debugging
         * 
         * @return errors
         */
        enableErrors();
        /**
         * convert json
         */
        $json = file_get_contents('./components/button.json');
        /**
         * @uses HTMLComponent div
         */
        $div = new HTMLComponent($json);
        $div->render();
        $div->addChild(new HTMLComponent('a', ["style"=>"color:red", "href"=>"http://localhost/src"], [], ["textContent"=>"About"]));
        $div->mount();
        /**
         * @uses HTMLComponent btn
         */
        $btn = new ButtonComponent('ClickMe', [
            'funcType'=>'onclick',
            'funcName'=>'clickMe',
            'funcString'=>'console.log(e.target);'
        ]);
        $btn->render();
        $btn->mount();
        /**
         * list
         */
        $string = 'Gemini is a pretty girl';
        $data = array_slice(json_decode(file_get_contents('../../../shared-library/data/json/english.json'), true), 0, 25);
        //console($string);
        class Test {
            public $fruit;
            public function __construct($param='banaan'){
                $this->fruit = $param;
            }
            public function salad(){
                return $this->fruit;
            }
        }
        $test       = new Test();
        $testString = 'Ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
        //debug($string);
        //$num        = 3.1415928;
        $num        = 0.00;
        debug($testString);
        console($testString);
        debug($num);
        console($num);
        //debug($data);
        /*
        $list = new ListComponent('English Words', file_get_contents('../../../shared-library/data/json/english.json'), 'word');
        $list->render();
        $list->mount();
        */
        /**
         * table
         */
        /*
        $tableData = file_get_contents('../../../shared-library/data/json/surnames.json');
        $table = new TableComponent('Table Title', $tableData);
        $table->render();
        $table->mount();
        */
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
<?php
    /**
     * Utils
     */
    require_once('../utils/main.php');
    echo('<style>
        html {
            background-color: #ebebeb;
        }
    </style>');
    ini_errors_enable();
    /**
     * print_var
     */
    function print_v($var){
        /*
        // backtrace
        $trace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 2);
        ob_start();
        $meta = ob_get_clean();
        */
        // grab var
        ob_start();
        var_dump($var);
        $dump = ob_get_clean();
        // set style
        $style = sprintf('
            padding: 0px 12px;
            margin: 12px 0px;
            font-size: 14px;
            line-height: 1.5;
            font-weight: 500;
            font-family: Arial, Helvetica, sans-serif;
            background-color: #fcfcfc;
            color: #333;
            box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
            border-radius: 4px;
        ');
        // meta-data
        // $metadata = sprintf('<b>Variable: </b>%s (%s)', $meta['']);
        // variable data
        $variable = sprintf('<pre>%s</pre>', $dump);
        // display info
        printf('<div style="%s">%s</div>', $style, $variable);
    }
    /**
     * Parent Abstract Class
     */
    abstract class ParentClass {
        // Static
        public static int $x;
        public static int $y;
        public static string $default = 'Initial Value';
        // Concrete
        public array $coords;
        // Construct
        public function __construct($x, $y){
            $this->coords = [$x, $y];
            self::$x = $x;
            self::$y = $y;
        }
    }
    /**
     * Child Class A
     */
    class ChildClassA extends ParentClass {
        // Properties

        // Construct
        public function __construct($x, $y){
            parent::__construct($x, $y);
            
        }
        public function childTest(){var_dump('This is a child test');}
    }
    /**
     * Child Class B
     */
    class ChildClassB extends ParentClass {
        // Properties

        // Construct
        public function __construct($x, $y){
            parent::__construct($x, $y);
            
        }
        public function childTest(){var_dump('This is a child test');}
    }
    /**
     * Debugging
     */
    header('Content-Type: text/html');
    
    $childA = new ChildClassA(2, 12);
    $childB = new ChildClassB(5, 87);
    /**
     * Static A
     */
    print_v([ChildClassA::$x, ChildClassA::$y]);
    print_v(ChildClassA::$default);
    /**
     * Static B
     */
    /**
     * Instance A
     */
    print_v($childA);
    /**
     * Instance B
     */
    print_v([ChildClassB::$x, ChildClassB::$y]);
    print_v($childB);

?>
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
    function print_v($desc, $var){
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
        printf('<div style="%s"><b>%s</b><br>%s</div>', $style, $desc, $variable);
    }
    /**
     * TestObj
     */
    class TestObj {
        public array $data;
            public function __construct($config){
                $this->data = $config;
            }
            public function printHost(){print_v('Host:', $this->data['host']);}
    }
    /**
     * Parent Abstract Class
     */
    abstract class Model {
        // Static
        public static ?object $db;
        public static function setDB($config){self::$db = new TestObj($config);}
        public static function getDB(){return self::$db;}
    }
    /**
     * Child Class A
     */
    class SpeechModel extends Model {
        public static function showDB(){
            print_v('$db', parent::$db);
        }
    }
    /**
     * Debugging
     */
    header('Content-Type: text/html');
    SpeechModel::setDB([
        'host' => 'localhost',
        'username' => 'phpmyadmin'
    ]);
    SpeechModel::showDB();
    $test = SpeechModel::getDB();
    var_dump($test);
?>
<?php
    /**
     * Test Model Class
     */
    class TestModel extends Model {
        protected static ?array $config;
        protected static string $tableName  = 'speech';
        protected static string $pkeyName   = 'pkey';
        /**
         * Table Properties
         */
        public int $pkey;
        public int $rank;
        public string $word;
        public string $part;
        public int $frequency;
        public string $dispersion;
        /**
         * Constructor
         */
        public function __construct(?array $attributes=[]){
            /**
             * Inherit Parent Constructor
             */
            parent::__construct($attributes);
            /**
             * Set Config
             */
            self::$config = [
                'host'      => 'localhost',
                'username'  => 'gemini',
                'password'  => 'web234egs',
                'database'  => 'test',
                'driver'    => 'mysql',
            ];
            var_dump(self::$config);
            /**
             * Validate DB Instance
             */
            //$result = self::getDatabase();
            //var_dump($result);
            //var_dump(parent::$config);
            //var_dump(self::$db);
        }
        /**
         * DB is set
         */
        public function getDB(){
            return self::getDatabase();
        }
        /**
         * Test
         */
        public function test(){
            $result = $this->getDB();
            var_dump($result);
            var_dump(self::$db);
        }
    }
?>
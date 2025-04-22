<?php
    /*----------------------------------------------------------*/
    /**
     * Parent Model Class
     * 
     */
    /*----------------------------------------------------------*/
    abstract class Model {
        protected static ?array $config;
        protected static ?object $db;
        protected static string $tableName;
        protected static string $pkeyName;
        /*----------------------------------------------------------*/
        /**
         * Constructor
         */
        /*----------------------------------------------------------*/
        public function __construct(?array $attributes){
            /**
             * Assign Property Values
             */
            if(is_array($attributes)){
                foreach($attributes as $key => $value){
                    $this->$key = $value;
                }
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Set Config array
         */
        /*----------------------------------------------------------*/
        public static function setConfig($config){
            self::$config = $config;
        }
        /*----------------------------------------------------------*/
        /**
         * Declares the Database object
         */
        /*----------------------------------------------------------*/
        public static function getDatabase(){
            if (!isset(self::$db)) {
                if (self::$config === null) {
                    return false;
                }
                self::$db = new Database(self::$config);
            }
            return true;
        }
        /*----------------------------------------------------------*/
        /**
         * Retrieves a record by its primary key
         * @param int|string $id Primary Key of Record
         */
        /*----------------------------------------------------------*/
        public function find($id){}
        /*----------------------------------------------------------*/
        /**
         * Retrieve All records
         */
        /*----------------------------------------------------------*/
        public function all(){}
        /*----------------------------------------------------------*/
        /**
         * Insert New Record
         */
        /*----------------------------------------------------------*/
        public function create(array $data){}
        /*----------------------------------------------------------*/
        /**
         * Updates existing record
         * @param int|string $id Primary Key of Record
         */
        /*----------------------------------------------------------*/
        public function update($id, array $data){}
        /*----------------------------------------------------------*/
        /**
         * Deletes existing record
         * @param int|string $id Primary Key of Record
         */
        /*----------------------------------------------------------*/
        public function delete($id){}
    }
?>
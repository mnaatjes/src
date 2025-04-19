<?php
    /*----------------------------------------------------------*/
    /**
     * Database Class
     * @version 1.0.0
     * @since 4/19/2025
     */
    /*----------------------------------------------------------*/
    class Database {
        /**
         * @var object|null $connection
         */
        private ?PDO $connection = null;
        /**
         * @var array $config Configuration settings
         */
        private array $config;
        /*----------------------------------------------------------*/
        /**
         * Constructor
         * 
         * @param array $config Assoc array of configuration properties for DB Connection
         */
        /*----------------------------------------------------------*/
        public function __construct(array $config=[]){
            $this->config = $config;
        }


    }
?>
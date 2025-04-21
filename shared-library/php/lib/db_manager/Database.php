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
         * @var object DB Connection object
         */
        protected ?DBConnection $conn;
        /*----------------------------------------------------------*/
        /**
         * Constructor
         * 
         * @param array $config Assoc array of configuration properties for DB Connection
         */
        /*----------------------------------------------------------*/
        public function __construct(?array $config=[]){
            /**
             * Assign connection:
             * - Connection object
             * - Might not be connected
             */
            $this->conn = new DBConnection($config);
        }
        /*----------------------------------------------------------*/
        /**
         * Query
         * @param string $sql SQL query to execute
         * @param int $mode PDO Mode; Default PDO::FETCH_ASSOC
         * @return object Result set
         */
        /*----------------------------------------------------------*/
        public function query(string $sql, array $params=[], int $mode=PDO::FETCH_ASSOC) {
            /**
             * Validate DB Connected
             */
            if(!$this->conn->isConnected()){
                throw new Error('DB Not Connected!');
            }
            /**
             * Take sql and prepare statement
             * - Validate prepare method
             * - Return new DBQuery instance
             */
            $stmt = $this->conn->pdo->prepare($sql);
            /**
             * Create new Query instance:
             * - Validate Instance
             * - Return Query object
             */
            if($stmt !== false){
                return new DBQuery($stmt, $params, $mode);
            } else {
                return false;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Creates a Transaction object and performs a series of queries on the DB:
         * - Initiates transaction with DB using: beginTransaction()
         * - Takes array of queries and performs them as DBQuery objects
         * - Employs commit() on all queries
         * 
         */
        /*----------------------------------------------------------*/
        public function transact(){}
        /*----------------------------------------------------------*/
        /**
         * Establish Connection
         */
        /*----------------------------------------------------------*/
        public function connect(){$this->conn->connect();}
        /*----------------------------------------------------------*/
        /**
         * Last row that was inserted into the database connection associated with the PDO object
         */
        /*----------------------------------------------------------*/
        public function lastInsertID(){
            /**
             * Validate isConnected
             */
            if($this->conn->isConnected()){
                return $this->conn->pdo->lastInsertID();
            } else {
                return null;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Break connection
         */
        /*----------------------------------------------------------*/
        public function disconnect(){$this->conn->disconnect();}
    }
?>
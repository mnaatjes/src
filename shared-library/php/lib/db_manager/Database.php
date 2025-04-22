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
         * @return PDOStatement
         */
        /*----------------------------------------------------------*/
        public function query(string $sql, array $params=[], int $mode=PDO::FETCH_ASSOC) {
            /**
             * Validate DB Connected
             */
            if(!$this->conn->isConnected()){
                throw new Error('DB Not Connected!');
            }
            // Check for params
            if(empty($params)){
                /**
                 * Simple pdo query
                 */
                return $this->conn->pdo->query($sql);
            } else {
                /**
                 * Prepare pdo statement and parse parameters
                 */
                $stmt = $this->conn->pdo->prepare($sql);
                /**
                 * Parse parameters:
                 * - Determine if assoc array
                 * - Parse parameters accordingly
                 * - Bind Parameters
                 */
                if(is_array_assoc($params)){
                    /**
                     * Bind Params
                     */
                    throw new Error('Unable to accept assoc arrays! Coming soon');
                } else {
                    /**
                     * Capture parameter keys:
                     * - Find all occurrences of :<prop-name>
                     * - Validate with count()
                     */
                    preg_match_all('/:([a-zA-Z0-9_]+)/', $sql, $matches);
                    $keys = array_slice($matches, 1)[0];
                    if(count($keys) !== count($params)){
                        throw new Error('Keys and params unmatched in: ' . __FUNCTION__);
                    }
                    /**
                     * Bind Params:
                     * Order first in first out
                     */
                    for($i = 0; $i < count($keys); $i++){
                        /**
                         * Switch based on data-type of parameter
                         */
                        $key    = ':' . $keys[$i];
                        $param  = $params[$i];
                        $stmt->bindParam($key, $param, $this->getParamType($param));
                    }
                }
                /**
                 * Execute pdo statement and return stmt object
                 */
                $stmt->execute();
                return $stmt;
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
         * Determines PDO::PARAM__ by gettype()
         * @return PDO::PARAM
         */
        /*----------------------------------------------------------*/
        private function getParamType($param){
            switch(gettype($param)){
                case 'boolean':
                    return PDO::PARAM_BOOL;
                case 'string':
                case 'double':
                    return PDO::PARAM_STR;
                case 'NULL':
                    return PDO::PARAM_NULL;
                case 'integer':
                    return PDO::PARAM_INT;
                default:
                    throw new Error('Cannot evaluate parameter data type with gettype()!');
            }
        }
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
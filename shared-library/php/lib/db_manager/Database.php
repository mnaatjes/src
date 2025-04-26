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
         * @var ?PDO Instance
         */
        protected ?PDO $pdo;
        /*----------------------------------------------------------*/
        /**
         * Constructor
         * 
         * @param object Database Connection Object
         */
        /*----------------------------------------------------------*/
        public function __construct(DatabaseConnection $connection){
            /**
             * Establish Connection:
             */
            $this->pdo = $connection->connect();
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
            if(is_null($this->pdo)){
                throw new Error('DB Not Connected!');
            }
            /**
             * Validate and set attributes
             */
            if(is_int($mode)){
                $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, $mode);
            }
            // Check for params
            if(empty($params)){
                /**
                 * Simple pdo query
                 */
                return $this->pdo->query($sql);
            } else {
                /**
                 * Prepare pdo statement and parse parameters
                 */
                $stmt = $this->pdo->prepare($sql);
                /**
                 * Parse Parameters
                 * - Grab columns, placeholders from SQL
                 * - Evaluate param array type
                 */
                preg_match_all('/:([a-zA-Z0-9_]+)/', $sql, $matches);
                $columns = array_slice($matches, 1)[0];
                /**
                 * Evaluate Params array type
                 * - Indexed Array
                 * - Multi-dimensional Indexed array
                 * - Assoc Array
                 */
                if(!is_array_assoc($params)){
                    /**
                     * Indexed Array of Params
                     * - Validate number of elements 
                     * - Evaluate typeof elements: string|int or array
                     * - If multi-dimensional, evaluate
                     */
                    // Validate count
                    if(count($columns) !== count($params)){
                        throw new Error('Mismatched placeholder to value in SQL string! Cannot bind params!');
                    }
                    // Loop params
                    $i = 0;
                    foreach($params as $item){
                        // Check typeof element
                        if(is_array($item)){
                            /**
                             * Sub-array of column => value pair
                             * - Validate column name
                             * - Build 
                             * - bindValue()
                             */
                            foreach($item as $param => $value){
                                // Validate against columns
                                if(in_array($param, $columns)){
                                    // Bind Values
                                    $stmt->bindValue(":{$param}", $value, $this->getParamType($value));
                                }
                            }
                        } else {
                            /**
                             * Regular value
                             * - Grab increment value from $columns
                             * - Build
                             * - bindValue()
                             */
                            $param = $columns[$i];
                            $stmt->bindValue(":{$param}", $item, $this->getParamType($item));
                        }
                        // Increment
                        $i++;
                    }
                } else {
                    /**
                     * Assoc Array of column => value pairs
                     * - Validate $params count === $columns count
                     * - Grab Columns from Keys
                     * - Build placeholders from Columns
                     * - Parse param from value
                     * - Bind Values
                     */
                    if(count($columns) !== count($params)){
                        // Invalid
                        throw new Error('Cannot execute bindValues()! Mismatched placeholders and values!');
                    } else {
                        /**
                         * Loop and bind values
                         * - TODO: Test
                         */
                        foreach($params as $column => $value){
                            $stmt->bindValue(":{$column}", $value, $this->getParamType($value));
                        }
                    }
                }
            }
            /**
             * Execute pdo statement and return stmt object
             */
            if($stmt->execute()){
                return $stmt;
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
         * Determines PDO::PARAM__ by gettype()
         * @return PDO::PARAM
         */
        /*----------------------------------------------------------*/
        private function getParamType($value){
            switch(gettype($value)){
                case 'boolean':
                    return PDO::PARAM_BOOL;
                case 'string':
                case 'double':
                    if(is_numeric($value)){
                        if(!is_double($value)){
                            return PDO::PARAM_INT;
                        } else {
                            return PDO::PARAM_STR;
                        }
                    }
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
         * Last row that was inserted into the database connection associated with the PDO object
         */
        /*----------------------------------------------------------*/
        public function lastInsertID(){
            return $this->pdo->lastInsertID();
        }
    }
?>
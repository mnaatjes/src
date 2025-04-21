<?php
    /*----------------------------------------------------------*/
    /**
     * Database Query Class
     * @version 1.0.0
     * @since 4/19/2025
     */
    /*----------------------------------------------------------*/
    class DBQuery {
        /**
         * @var object $stmt
         */
        protected PDOStatement $stmt;
        /**
         * @var object $mode
         */
        protected int $mode;
        /**
         * @var array $params
         */
        protected array $params = [];
        /**
         * @var array|null $options
         */
        protected ?array $options;
        /*----------------------------------------------------------*/
        /**
         * Constructor.
         * Instantiates new Query object
         * 
         * @param PDOStatement $stmt 
         * @param int $mode PDO Mode; Default PDO::FETCH_ASSOC
         */
        /*----------------------------------------------------------*/
        public function __construct(PDOStatement $stmt, array $params=[], $mode=PDO::FETCH_ASSOC){
            /**
             * Validated by Database Class query() method
             * Assign object stmt
             */
            $this->stmt     = $stmt;
            $this->mode     = $mode;
            $this->params   = $params;
        }
        /*----------------------------------------------------------*/
        /**
         * Execute query
         * - Attempt
         * - Catch error
         */
        /*----------------------------------------------------------*/
        private function execute(){
            /**
             * TODO: 
             * - Bind params
             * - Bind values
             */
            /**
             * Attempt execution of query statement
             */
            try {
                return $this->stmt->execute($this->params);
            } catch (PDOException $e) {
                echo "Execute error: " . $e->getMessage();
                return false;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Fetch Single Record (progressively)
         */
        /*----------------------------------------------------------*/
        public function fetch(){
            /**
             * Attempt execution of query
             * Validate
             * Return fetch
             */
            if($this->execute()){
                return $this->stmt->fetch($this->mode);
            } else {
                return false;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Fetch All Records
         * @param array $params Parameters for statement
         * @return array|false
         */
        /*----------------------------------------------------------*/
        public function fetchAll(){
            /**
             * Attempt execution of query
             * Validate
             * Return fetch
             */
            if($this->execute()){
                return $this->stmt->fetchAll($this->mode);
            } else {
                return false;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Row Count
         * @param array $params Parameters for statement
         */
        /*----------------------------------------------------------*/
        public function rowCount(){
            /**
             * Attempt execution of query
             * Validate
             * Return fetch
             */
            if($this->execute()){
                return $this->stmt->rowCount();
            } else {
                return false;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Binds parameters to statement
         */
        /*----------------------------------------------------------*/
        protected function parseRule(string $rule){

            /**
             * Parse data parameters and rules
             */
        }
    }
?>
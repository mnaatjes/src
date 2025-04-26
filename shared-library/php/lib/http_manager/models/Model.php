<?php
    /*----------------------------------------------------------*/
    /**
     * Parent Model Class
     * 
     */
    /*----------------------------------------------------------*/
    abstract class Model {
        /**
         * Constant Properties
         */
        public const OPERATORS = [
            '_ne'       => '!=',
            '_lt'       => '<',
            '_lte'      => '<=',
            '_gt'       => '>',
            '_gte'      => '>=',
            '_like'     => 'LIKE',
            '_in'       => 'IN',
            '_as'       => 'AS',
            '_before'   => '',
            '_after'    => '',
        ];
        /**
         * Inheritance Properties
         */
        protected ?object $db;
        protected $id;
        protected string $tableName;
        protected array $properties = [];
        /*----------------------------------------------------------*/
        /**
         * Set Database
         */
        /*----------------------------------------------------------*/
        public function __construct(array $config){
            /**
             * Set Database Object
             */
            $this->db = $this->setDatabase($config);
        }
        /*----------------------------------------------------------*/
        /**
         * Set Database
         * @param array $config DB Connection Configuration Array
         * @return object Database Object
         */
        /*----------------------------------------------------------*/
        private function setDatabase(array $config){
            /**
             * Check if Database already Set
             */
            if (!isset($this->db)) {
                if ($config === null) {
                    return null;
                }
                /**
                 * Create Connection and Return Database Object
                 */
                return new Database(
                    new DatabaseConnection($config)
                );
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Methods: Parse Field Array and return sql statement
         * @param array $fields
         * @return string SQL string fragment
         */
        /*----------------------------------------------------------*/
        private function parseFields(array $fields){
            /**
             * Check if empty
             */
            if(empty($fields)){
                // SELECT *
                return '*';
            } else {
                /**
                 * Validate and format:
                 * - Validate all columns exist in properties array
                 * - Assign to $results
                 * - Implode and return
                 */
                $props   = $this->properties;
                if(array_every($fields, function($_, $col) use($props){
                    return in_array($col, $props);
                })){
                    // Valid Properties
                    return implode(", ", $fields);
                } else {
                    /**
                     * Return Default
                     */
                    return '*';
                }
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Parses Filter Conditions
         * @param array $filters
         * @param array $values passed by reference; assoc array of param => value pairs
         * @return string SQL fragment
         */
        /*----------------------------------------------------------*/
        private function parseFilters(array $filters, array &$values){
            /**
             * Check if empty
             */
            if(empty($filters)){
                /**
                 * Return default: empty string
                 */
                return '';
            } else {
                /**
                 * Validate and assign filters
                 * - Declare Container
                 * - Loop $filters and parse
                 */
                $results = [];
                foreach($filters as $param =>$filter){
                    // Grab elements
                    $operator   = $filter['operator'];
                    /**
                     * Format Values:
                     * - Declare collector
                     * - Check if values is array
                     */
                    if(is_array($filter['values'])){
                        /**
                         * Determine operator to format statement
                         * - Equals: IN Statement
                         * - Any other operator: OR
                         */
                        if($operator === '='){
                            /**
                             * Construct IN Statement
                             * - Build placeholders
                             * - Collect values
                             * - Implode placeholders
                             * - Form fragment and push to results
                             */
                            $placeholders = array_map(function($value) use($param, &$values){
                                // Assign to $values array
                                $values[] = [$param => $value];
                                // Return placeholder per $val
                                return ":{$param}";
                            }, $filter['values']);
                            // Append fragment to results
                            $results[] = sprintf('%s IN (%s)', $param, implode(", ", $placeholders));
                        } else {
                            /**
                             * Construct param <operator> placeholder sets
                             * - Declare Sets collector
                             * - Build Placeholders
                             * - Assign value to values array
                             * - Build Sets
                             */
                            $sets = [];
                            foreach($filter['values'] as $val){
                                // declare placeholder
                                $placeholder = ":{$param}";
                                // assign values array
                                $values[] = [$param => $val];
                                // Build Sets
                                $sets[] = "{$param} {$operator} {$placeholder}";
                            }
                            /**
                             * Implode with OR
                             */
                            $results[] = implode(" OR ", $sets);
                            
                        }
                    } else {
                        /**
                         * Single value fragment
                         * - Declare placeholder
                         * - Assign to values array
                         * - Append to results array
                         */
                        $placeholder = ":{$param}";
                        $values[]    = [$param => $filter['values']];
                        $results[]   = "{$param} {$operator} {$placeholder}";
                    }
                }
                /**
                 * Return SQL Fragment
                 * - Combine elements
                 * - Insert delimiters
                 * - Return string
                 */
                return "WHERE " . implode(" AND ", $results);
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Parses SQL Clauses array
         * @param array $clauses ColumnName => Value pairs
         * @param array $values passed by reference; assoc array of param => value pairs
         * @return string SQL fragment
         */
        /*----------------------------------------------------------*/
        private function parseClauses(array $clauses, array &$values){
            /**
             * Check if empty
             */
            if(empty($clauses)){
                // Return empty
                return '';
            } else {
                /**
                 * Parse Clauses by Clause key
                 * - Declare collector string
                 * - Loop
                 */
                $results = ' ';
                foreach($clauses as $clause => $items){
                    switch($clause){
                        /**
                         * ORDER BY
                         */
                        case 'orderBy':
                            // Declare collector array
                            $acc = [];
                            // Loop items and parse
                            foreach($items as $col => $dir){
                                // Validate direction
                                $dir = strtoupper($dir);
                                if($dir === "ASC" || $dir === "DESC"){
                                    // Append to collector array
                                    $acc[] = "{$col} {$dir}";
                                }
                            }
                            /**
                             * Implode acc array and append to results string
                             */
                            $results .= sprintf('ORDER BY %s', implode(", ", $acc));
                            break;
                        /**
                         * Default
                         * - TODO: Determine how to handle different clauses
                         */
                        default: 
                            /**
                             * Return nothing for the moment
                             */
                            break;
                    }
                }
                /**
                 * Return results string
                 */
                return $results;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Retrieves a record by its primary key
         * @param int|string $id Primary Key of Record
         */
        /*----------------------------------------------------------*/
        public function find($id){
            return $this->db->query("SELECT * FROM {$this->tableName} WHERE {$this->id} = :{$this->id}", [$id])->fetch();
        }
        /*----------------------------------------------------------*/
        /**
         * Retrieves record by Conditions
         * @param array $fields Default [*]; e.g. SELECT col1, col2, col3
         * @param array $filters Filter Conditions; e.g. WHERE col > value
         * @param array $clauses Sorting and other clauses; e.g. ORDER BY,
         */
        /*----------------------------------------------------------*/
        public function findBy(array $fields, array $filters, array $clauses){
            /**
             * Begin SQL Statement
             */
            $sql = "SELECT ";
            /**
             * Determine Fields
             */
            $sql .= $this->parseFields($fields);
            /**
             * Append FROM statement
             */
            $sql .= " FROM {$this->tableName} ";
            /**
             * Evaluate Filter Conditions
             * - Declare values array
             * - Pass $values by reference
             */
            $values  = [];
            $sql    .= $this->parseFilters($filters, $values);
            /**
             * Append Clauses
             */
            $sql .= $this->parseClauses($clauses, $values);
            /**
             * Execute Query
             */
            return $this->db->query($sql, $values)->fetchAll();
        }
        /*----------------------------------------------------------*/
        /**
         * Retrieve All records
         */
        /*----------------------------------------------------------*/
        public function getAll(){
            return $this->db->query("SELECT * FROM {$this->tableName}")->fetchAll();
        }
        /*----------------------------------------------------------*/
        /**
         * Retrieve records by column name
         * TODO: May be redundant
         */
        /*----------------------------------------------------------*/
        public function getColumns(){
            /**
             * Perform Query
             */
        }
        /*----------------------------------------------------------*/
        /**
         * Insert New Record
         * @param array $date Assoc array of property_name => value pairs or indexed array of values in order of predefined properties
         * @return bool
         * 
         * @example 
         *  $result = $speech->create([
         *      'word_rank' => 3435,
         *      'word' => 'hamster',
         *      'part' => 'n',
         *      'frequency' => 2343,
         *      'dispersion' => 0.56,
         *  ]);
         */
        /*----------------------------------------------------------*/
        public function create(array $data){
            /**
             * Validate Data:
             * - Check element count
             * - Check if is assoc
             */
            if(count($data) !== count($this->properties)){
                // Invalid data
                return null;
            }
            $values = [];
            if(is_array_assoc($data)){
                if(array_keys($data) === $this->properties){
                    foreach($data as $val){
                        $values[] = $val;
                    }
                } else {
                    return null;
                }
            } else {
                $values = $data;
            }
            /**
             * Declare properties and form sql
             */
            $keys           = implode(', ', $this->properties);
            $count          = 1;
            $placeholders   = implode(' ', array_map(function($ele) use(&$count){
                if(count(($this->properties)) === $count){
                    return ':'.$ele;
                } else {
                    $count++;
                    return ':'.$ele.',';
                }
            }, $this->properties));
            /**
             * Perform Query
             */
            $this->db->query("INSERT INTO {$this->tableName} ({$keys}) VALUES ($placeholders)", $values);
            return $this->db->lastInsertID();
        }
        /*----------------------------------------------------------*/
        /**
         * Updates existing record
         * @param int|string $id Primary Key of Record
         * @param array $data Assoc Array of column => value to set in sql statement
         * @return bool
         * 
         * @example
         *  $speech->update(5041, [
         *      'word_rank' => 34,
         *      'frequency' => 800085,
         *      'dispersion' => 0.96,
         *      'word' => 'marsupial'
         *  ]);
         */
        /*----------------------------------------------------------*/
        function update($id, array $data){
            /**
             * Validate Keys from data
             */
            $keys_arr   = array_keys($data);
            $props      = $this->properties;
            $test_keys = array_every($keys_arr, function($_, $key) use($props){
                return in_array($key, $props);
            });
            if($test_keys === false){
                return false;
            } else {
                /**
                 * Data has valid keys:
                 * - Format SQL statement
                 * - Generate key=:placeholder sets
                 * - Prepare values
                 */
                // Generate key sets
                $sets = [];
                foreach($keys_arr as $key){
                    $sets[] = "$key=:$key";
                }
                // Implode sets for sql statement
                $pairs = implode(', ', $sets);
                // Prep values
                $values = [];
                foreach($data as $val){
                    $values[] = $val;
                }
                // Append ID value to values
                $values[] = $id;
                /**
                 * Generate SQL Statement 
                 * Perform Query
                 */
                $result = $this->db->query("UPDATE {$this->tableName} SET {$pairs} WHERE {$this->id}=:{$this->id}", $values);
                if($result !== false){
                    return true;
                } else {
                    return false;
                }
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Deletes existing record
         * @param int|string $id Primary Key of Record
         */
        /*----------------------------------------------------------*/
        public function delete($id){
            /**
             * Construct and perform query
             */
            $result = $this->db->query("DELETE FROM {$this->tableName} WHERE {$this->id} = :{$id}", [$id]);
            if($result !== false){
                return true;
            } else {
                return false;
            }
        }
    }
?>
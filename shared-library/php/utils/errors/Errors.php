<?php
    /*----------------------------------------------------------*/
    /**
     * Errors Object.
     * - Provides consistent object oriented approach for creating errors to report within other frameworks and classes.
     * - Magic Methods, __get(), __set(), __isset(), __unset()
     * - Iterable
     * - Countable
     */
    /*----------------------------------------------------------*/
    class Errors implements Countable, IteratorAggregate  {
        /**
         * Error Properties
         */
        protected array $container  = [];
        protected array $codes      = [];
        protected array $categories = [];
        /*----------------------------------------------------------*/
        /**
         * Constructor.
         * - Declares $container array
         * - Sets initial $data array properties
         */
        /*----------------------------------------------------------*/
        public function __construct(){
            /**
             * Set Default Parameters (gettable and settable)
             */
            $this->categories = [
                'argument', 
                'assertion', 
                'base',
                'exception',
                'length',
                'logical',
                'overflow',
                'range',
                'runtime',
                'type'
            ];
            /**
             * Codes generated from Category Keys
             */
            $this->codes = array_keys($this->categories);
        }
        /*----------------------------------------------------------*/
        /**
         * Magic Method: Returns property from $container
         * @param string $name Property Name within $container
         * @return void - Gets $container value
         */
        /*----------------------------------------------------------*/
        private function __get(string $name){
            /**
             * Validate
             * - Normalize
             * - Check isset()
             */
            $name = $this->normalizeProperty($name);
            if(isset($this->container[$name])){
                return $this->container[$name];
            } else {
                return null;
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Magic Method: 
         * @param string $name Property Name within $container
         * @param mixed $value Value to set
         * @return bool - True is successful
         */
        /*----------------------------------------------------------*/
        private function __set(string $name, $value): bool{
            /**
             * Validate:
             * - Normalize $name
             * - Check for null
             * - Validate from $categories
             */
            $name = $this->normalizeProperty($name);
            if(is_null($name)){
                return false;
            }
            if(!in_array($name, $this->categories)){
                // Invalid Category
                return false;
            }
            /**
             * Set error:
             * - Check isset()
             * - Check is array
             * - Append to container: each element is an array
             */
            if(isset($this->container[$name]) && is_array($this->container[$name])){
                $this->container[$name] = array_merge((array) $this->container[$name], (array) $value);
            } else {
                $this->container[$name] = [];
                $this->container[$name] = [$this->container[$name], ... (array) $value];
            }
            /**
             * Return Success
             */
            return true;
        }
        /*----------------------------------------------------------*/
        /**
         * Magic Method: Checks if a property is set
         * - Checks for normalized $name value
         * @return bool - True if set
         */
        /*----------------------------------------------------------*/
        private function __isset(string $name): bool{
            /**
             * Validate and normalize $name
             */
            $name = $this->normalizeProperty($name);
            if(is_null($name)){
                return false;
            }
            /**
             * Return isset()
             */
            return isset($this->container[$name]);
        }
        /*----------------------------------------------------------*/
        /**
         * Private Method: Normalizes the property name
         * @param string $name
         * @return string|null Normalized String | Null on failure
         */
        /*----------------------------------------------------------*/
        private function normalizeProperty(string $name): ?string{
            // Trim String
            $name = trim($name);
            // Check for empty string
            if(empty($name)){
                return null;
            }
            // Return Normalized property name
            return strtolower($name);
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Checks if a property exists in $container.
         * - Uses __isset()
         * @return bool
         */
        /*----------------------------------------------------------*/
        public function hasError(string $name): bool{
            // Normalize
            $name = $this->normalizeProperty($name);
            // Check if exists
            return isset($name);
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Adds Error based on Error Category
         * - Appends to existing array
         * @param string $category
         * @param string|null $value
         * @return bool True if successful | False if failure
         */
        /*----------------------------------------------------------*/
        public function addError(string $name, ?string $value): bool{
            /**
             * Validate $name
             */
            if(empty(trim($name))){
                // Name empty and cannot add
                return false;
            }
            /**
             * Use __set()
             */
            return $this->__set($name, $value);
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Purges all values within category sub-array
         * @param string $name Error Category array of $container data array
         * @return bool True on success
         */
        /*----------------------------------------------------------*/
        public function purgeCategory(string $name): bool{
            /**
             * Validate Category
             */
            $name = $this->normalizeProperty($name);
            if(isset($this->container[$name])){
                // Clear contents
                $this->container[$name] = [];
                // Return empty
                return empty($this->container[$name]);
            }
            /**
             * Return default
             */
            return false;
        }
        /*----------------------------------------------------------*/
        /**
         * Utility Method: Get all errors
         * @return array $container contents
         */
        /*----------------------------------------------------------*/
        public function getErrors(){
            return $this->container;
        }
        /*----------------------------------------------------------*/
        /**
         * Countable Method: Counts elements of object
         * @return int Count of $this->properties
         */
        /*----------------------------------------------------------*/
        public function count(): int{
            return count($this->container);    
        }
        /*----------------------------------------------------------*/
        /**
         * Iterator Method: Makes object iterable
         * - Automatically Called by php when foreach() used on Object
         * @return ArrayIterator Returns $this->properties
         */
        /*----------------------------------------------------------*/
        public function getIterator(): Traversable {
            return new ArrayIterator($this->container);
        }
    }
?>
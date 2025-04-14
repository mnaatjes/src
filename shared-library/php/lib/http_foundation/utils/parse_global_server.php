<?php
    /*----------------------------------------------------------*/
    /**
     * Parses the $_SERVER superglobal:
     * - Validates array existence
     * - Parses keys to lowercase and snake_case
     * - Validates and sanitizes values by datatype
     * @param array|null $config Configuration array containing valid parameters; e.g. valid_methods => ['GET', 'POST'...]
     * @return array{
     *      - client: array Contains client specific properties,
     *      - server: array Contains server specific properties
     *      - shared: array Contains properties relevant to both client and server
     * } Array of filtered, sanitized, and parsed values
     * - Lowercase, snake_case keys
     * @return null No value found
     */
    /*----------------------------------------------------------*/
    function parse_global_server(?array $config=null): ?array{
        /**
         * Validate existence of $_SERVER superglobal and length
         */
        if(!isset($_SERVER)){
            return null;
        }
        if(empty($_SERVER)){
            return null;
        }
        if(!is_array($_SERVER)){
            return null;
        }
        /**
         * @var array $results Array to contain parsed $_SERVER properties
         */
        $results = [];
        /**
         * Loop $_SERVER properties
         * - Sanitize and Validate
         * - Format keys and values
         * - Output array of [$key, $val] and push to $results
         */
        foreach($_SERVER as $key => $value){
            /**
             * Sanitize
             */
            $sanitized = sanitize_global_server_property($key, $value);
            /**
             * Merge sanitized and formatted key, value array with $results
             */
            $results = array_merge($results, $sanitized);
        }
        var_dump($results);
        /**
         * Return Default
         */
        return [];
    }
    /*----------------------------------------------------------*/
    /**
     * Sanitize $_SERVER superglobal key and value.
     * - Filters and validates $_SERVER property by property name
     * - Employs sanitize_data methods
     * @param string $prop_name Key name of $_SERVER property
     * @param string $value Value string of $_SERVER property
     * @return array|null [$prop => $value], Null on failure
     */
    /*----------------------------------------------------------*/
    function sanitize_global_server_property(string $prop_name, string $value): ?array{
        /**
         * Validate value is a string:
         * - Array --> recursive data sanitization
         * - Int --> Cast to string
         */
        if(!is_string($value)){
            /**
             * TODO: Logic for parsing non-strings
             */
        }
        /**
         * Validate String
         * Switch property based on $prop name
         */
        switch(strtoupper($prop_name)){
            /**
             * Default:
             * - Call sanitize_string() function
             */
            default: 
                //return [$prop_name => sanitize_string($value)];
                return [$prop_name => $value];
        }
        /**
         * Return default
         */
        return null;
    }
    /*----------------------------------------------------------*/
    /**
     * Formats $_SERVER superglobal key and value
     * @param string $prop_name Key name of $_SERVER property
     * @param string $value Value string of $_SERVER property
     * @return array|null [$prop => $value], Null on failure
     */
    /*----------------------------------------------------------*/
    function format_global_server_property(string $prop_name, string $value): ?array{
        /**
         * Switch property based on $prop name
         */
        /**
         * Return default
         */
        return null;
    }
?>
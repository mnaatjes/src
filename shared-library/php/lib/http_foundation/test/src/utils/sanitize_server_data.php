<?php
    /**
     * Sanitizes and Filters $_SERVER superglobal
     * 
     * @param void
     * @return array|null - Assoc Array of $_SERVER superglobal properties | Null if 
     */
    function sanitize_server_data(){
        // Check that $_SERVER is set 
        if(!isset($_SERVER) && !is_array($_SERVER)){
            return null;
        }
        /**
         * Declare $results array and loop properties of $_SERVER
         */
        $results = [];
        foreach($_SERVER as $prop => $val){
            /**
             * Evaluate by data-type of value:
             * - String
             * - Array
             * - Other: int, float/double, null, objects
             */
            if(is_string($val)){
                // Sanitize string values
                $results[$prop] = filter_var($val, FILTER_DEFAULT);
                /**
                 * Refine validation and filters per property
                 * - Null values if filter fails
                 * - Populate $errors array if $on_failure === 1
                 */
                switch(strtoupper($prop)){
                    // Validate IP Address
                    case 'REMOTE_ADDR':
                        if(filter_var($results[$prop], FILTER_VALIDATE_IP) === false){
                            $results[$prop] = null;
                        }
                        break;
                    // Validate Request Method
                    case 'REQUEST_METHOD':
                        if(!in_array(strtoupper($val), VALID_HTTP_METHODS)){
                            $results[$prop] = null;
                        }
                        break;
                    // Referrer - URL page of the referred user
                    case 'HTTP_REFERER':
                        // Validate URL
                        if(filter_var($results[$prop], FILTER_VALIDATE_URL) === false){
                            $results[$prop] = null;
                        }
                        break;
                    // Port Number
                    case 'SERVER_PORT':
                        $options = [
                            'options' => [
                                'min_range' => 1,
                                'max_range' => 65535
                            ]
                        ];
                        if(filter_var($results[$prop], FILTER_VALIDATE_INT, $options) === false){
                            $results[$prop] = null;
                        }
                        break;
                    // Validate HTTP Protocols
                    case 'HTTP_PROTOCOL':
                        if(!in_array(strtoupper($results[$prop]), VALID_HTTP_PROTOCOLS)){
                            $results[$prop] = null;
                        }
                        break;
                    }
            } else if(is_array($val)){
                // Recursively check value
                $results[$prop] = sanitize_server_data($val);
            }
        }
        return $results;
    }
?>
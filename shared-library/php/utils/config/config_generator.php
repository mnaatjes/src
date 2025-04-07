<?php
    /*----------------------------------------------------------*/
    /**
     * Class containing methods of generating configuration arrays for the following processes:
     * - HTTP Requests
     */
    /*----------------------------------------------------------*/
    class ConfigGenerator {
        /*----------------------------------------------------------*/
        /**
         * DatabaseConfig
         */
        /*----------------------------------------------------------*/
        public function DBConfig(){
            
        }
        /*----------------------------------------------------------*/
        /**
         * HTTPConfig: Generates valid HTTP properties for managing HTTP requests.
         * - These are properties that will be accepted by as valid.
         * - If the client does not supply these values; their request will be denied
         */
        /*----------------------------------------------------------*/
        public function HTTPConfig(){
            return [
                'method' => []
            ];
        }
    }
?>
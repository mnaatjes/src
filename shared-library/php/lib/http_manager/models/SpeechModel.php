<?php
    /*----------------------------------------------------------*/
    /**
     * Speech Model Class
     */
    /*----------------------------------------------------------*/
    class SpeechModel extends Model {
        /*----------------------------------------------------------*/
        /**
         * Construct
         */
        /*----------------------------------------------------------*/
        public function __construct(){
            parent::__construct([
                'host'      => 'localhost',
                'username'  => 'gemini',
                'password'  => 'web234egs',
                'database'  => 'test',
                'driver'    => 'mysql',
            ]);
            /**
             * Set Table Name
             */
            $this->tableName = 'speech';
            /**
             * Set id name
             */
            $this->id = 'pkey';
            /**
             * Set properties
             */
            /*
            $this->properties = [
                'word_rank',
                'word',
                'part',
                'frequency',
                'dispersion'
            ];
            */
            /**
             * DEBUGGING PROPERTIES
             * TODO: Remove!
             */
            $this->properties = [
                'city',
                'population',
                'country',
                'income',
                'demographics',
                'gdp'
            ];
        }
    }
?>
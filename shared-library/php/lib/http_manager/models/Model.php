<?php
    /*----------------------------------------------------------*/
    /**
     * Parent Model Class
     * 
     */
    /*----------------------------------------------------------*/
    class Model {
        protected ?string $tableName;
        protected ?string $pkeyName;
        /*----------------------------------------------------------*/
        /**
         * Constructor
         */
        /*----------------------------------------------------------*/
        public function __construct(?string $table_name=null){
            $this->tableName = $table_name;
        }
        /*----------------------------------------------------------*/
        /**
         * Retrieves a record by its primary key
         * @param int|string $id Primary Key of Record
         */
        /*----------------------------------------------------------*/
        public function find($id){}
        /*----------------------------------------------------------*/
        /**
         * Retrieve All records
         */
        /*----------------------------------------------------------*/
        public function all(){}
        /*----------------------------------------------------------*/
        /**
         * Insert New Record
         */
        /*----------------------------------------------------------*/
        public function create(array $data){}
        /*----------------------------------------------------------*/
        /**
         * Updates existing record
         * @param int|string $id Primary Key of Record
         */
        /*----------------------------------------------------------*/
        public function update($id, array $data){}
        /*----------------------------------------------------------*/
        /**
         * Deletes existing record
         * @param int|string $id Primary Key of Record
         */
        /*----------------------------------------------------------*/
        public function delete($id){}
    }
?>
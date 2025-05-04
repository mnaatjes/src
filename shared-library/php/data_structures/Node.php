<?php
    /*----------------------------------------------------------*/
    /**
     * Node Object to be used with various data structures
     * - Use for Minimax
     */
    /*----------------------------------------------------------*/
    class Node {
        public $state;
        public $children=[];
        public $move;
        public $value = null;
        /*----------------------------------------------------------*/
        /**
         * Construct Function
         */
        /*----------------------------------------------------------*/
        public function __construct($state, $move=null){
            $this->state    = $state;
            $this->move     = $move;
        }
        /*----------------------------------------------------------*/
        /**
         * Add Child
         */
        /*----------------------------------------------------------*/
        public function addChild(Node $child){
            $this->children[] = $child;
        }
        /*----------------------------------------------------------*/
        /**
         * @return array Elements from Children array
         */
        /*----------------------------------------------------------*/
        public function getChildren(){return $this->children;}
        /*----------------------------------------------------------*/
        /**
         * @return mixed State
         */
        /*----------------------------------------------------------*/
        public function getState(){return $this->state;}
        /*----------------------------------------------------------*/
        /**
         * Sets the value of the node
         */
        /*----------------------------------------------------------*/
        public function setValue(int $value): void{$this->value = $value;}
        /*----------------------------------------------------------*/
        /**
         * @return int Node's value
         */
        /*----------------------------------------------------------*/
        public function getValue(){return $this->value;}
        /*----------------------------------------------------------*/
        /**
         * @return mixed Move
         */
        /*----------------------------------------------------------*/
        public function getMove(){return $this->move;}
    }
?>
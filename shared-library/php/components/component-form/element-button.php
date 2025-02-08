<?php
    /*----------------------------------------------------------*/
    /**
     * ButtonElement
     * 
     * @package component
     * @author Michael Naatjes <michael.naatjes87@email.com>
     * 
     */
    /*----------------------------------------------------------*/
    class ButtonElement extends FormElement {
        /*----------------------------------------------------------*/
        /**
         * constructor
         */
        /*----------------------------------------------------------*/
        public function __construct(string $name, string $textContent, string $type='submit', array $options=[]){
            $this->tagName      = 'input';
            $this->isLabel      = false;
            $this->type         = $type;
            $this->attributes   = $this->validateOptions(array_merge($options, ['type'=>$type, 'value'=>$textContent]));
            $this->name         = $name;
            $this->children     = [];
            $this->data         = [];
        }
    }
?>
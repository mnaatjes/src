<?php
    /*----------------------------------------------------------*/
    /**
     * LabelElement
     * 
     * Generates an HTML label element
     * 
     * @package component
     * @author Michael Naatjes <michael.naatjes87@email.com>
     * 
     */
    /*----------------------------------------------------------*/
    class LabelElement extends FormElement {
        protected $for;
        protected $textContent;
        /*----------------------------------------------------------*/
        /**
         *  constructor
         */
        /*----------------------------------------------------------*/
        public function __construct(string $for, string $textContent, array $attributes=[], array $children=[]){
            $this->tagName      = 'label';
            $this->isLabel      = true;
            $this->type         = '';
            $this->attributes   = array_merge($attributes, ['for'=>$for]);
            $this->name         = '';
            $this->children     = $children;
            $this->data         = ['textContent'=>$textContent];
        }
    }
?>
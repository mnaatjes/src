<?php
    /*----------------------------------------------------------*/
    /**
     * FormElement
     * 
     * Generates an HTML form element
     * 
     * @package component
     * @author Michael Naatjes <michael.naatjes87@email.com>
     * 
     * 
     * @example $form = new FormComponent();
     * 
     */
    /*----------------------------------------------------------*/
    class FormElement extends HTMLComponent {
        protected $isLabel      = false;
        protected $type         = '';
        protected $options      = [];
        /*----------------------------------------------------------*/
        /**
         *  constructor
         */
        /*----------------------------------------------------------*/
        public function __construct(string $tagName='input', string $type='', array $options=[]){
            $this->tagName  = $this->validateTagName($tagName);
            $this->isLabel  = ($this->tagName === 'label') ? true : false;
            $this->type     = $this->validateType($type);
        }
        /*----------------------------------------------------------*/
        /**
         *  validateTagName
         *
         *  @property array $validTags
         *  @return string html tag
         */
        /*----------------------------------------------------------*/
        private function validateTagName(string $tagName){
            /**
             * declare valid input tags
             */
            $validTags = [
                'input',
                'textarea',
                'select',
                'option',
                'optgroup',
                'label',
                'fieldset',
                'legend',
                'datalist',
                'output',
                'progress',
                'meter',
                'details',
                'summary'
            ];
            /**
             *  check against array and return if valid
             */
            if(in_array($tagName, $validTags)){
                return $tagName;
            } else {
                throw new TypeError('Invalid tagName entered! ' . $tagName . ' is not a valid tag name.');
            }
        }
        /*----------------------------------------------------------*/
        /**
         * validateType
         * Determine the type (if necessary) for the form element and validate that type
         *
         * @param string $type
         * 
         * @property array $typeUnused
         * @property array $validTypes
         * @property string $tagName
         * @return string tagType
         */
        /*----------------------------------------------------------*/
        private function validateType(string $type=''){
            /**
             * declare elements which do not use "type" attribute
             * declare validTypes array
             */
            $typeUnused = [
                'textarea', 
                'select', 
                'option', 
                'optgroup', 
                'button', 
                'label', 
                'fieldset', 
                'legend', 
                'datalist' 
            ];
            $validTypes = [
                'button',
                'checkbox',
                'color',
                'date',
                'datetime-local',
                'email',
                'file',
                'hidden',
                'image',
                'month',
                'number',
                'password',
                'radio',
                'range',
                'reset',
                'search',
                'submit',
                'tel',
                'text',
                'time',
                'url',
                'week'
            ];
            /**
             * check against elements that use the "type" attribute
             */
            if(!in_array($this->tagName, $typeUnused)){
                /**
                 * set default type for input element:
                 * if type blank and tagName === input; return type = text
                 */
                if($this->tagName === 'input' && empty($type)){
                    return 'text';
                }
                /**
                 * check against valid types
                 */
                if(in_array($type, $validTypes)){
                    return $type;
                } else {
                    throw new TypeError('Invalid type attribute! ' . $type . ' is an invalid value for ' . $this->tagName . ' element!');
                }
            } else {
                /**
                 * return empty if element tagName does not use type attribute
                 */
                return '';
            }
        }
        /*----------------------------------------------------------*/
        /**
         * validateOptions
         * 
         * @return array array of html form element attributes
         */
        /*----------------------------------------------------------*/
        private function validateOptions(array $options=[]){
            $optionsSchema = [];
            $attribsSchema = [
                'style' => false,
                'class' => false
            ];
        }
    }
?>
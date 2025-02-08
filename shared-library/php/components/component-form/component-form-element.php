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
    require_once 'element-constants.php';
    /*----------------------------------------------------------*/
    class FormElement extends HTMLComponent {
        protected $isLabel      = false;
        protected $type         = '';
        protected $options      = [];
        protected $textContent;
        /*----------------------------------------------------------*/
        /**
         *  constructor
         */
        /*----------------------------------------------------------*/
        public function __construct(string $tagName='input', array $options=[], string $textContent='', array $children=[]){
            $this->tagName      = $this->validateTagName($tagName);
            $this->isLabel      = ($this->tagName === 'label') ? true : false;
            $this->type         = ($this->tagName === 'input' || array_key_exists('type', $options)) ? $this->validateType($options['type']) : '';
            $this->attributes   = $this->validateOptions($options);
            $this->name         = (array_key_exists('name', $this->attributes)) ? $this->attributes['name'] : '';
            $this->children     = (empty($children)) ? [] : $this->validateChildren($children);
            $this->data         = (empty($textContent)) ? [] : ['textContent'=>$textContent];
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
         * @param array $optionsSchema
         * @return array array of html form element attributes
         */
        /*----------------------------------------------------------*/
        protected function validateOptions(array $options=[]){
            /**
             * declare schema
             * build options schema
             */
            $optionsSchema = [];
            if($this->tagName === 'input'){
                $default_options    = FORM_ELEMENTS[$this->tagName]['attributes'];
                $type_options       = FORM_ELEMENTS[$this->tagName]['types'][$this->type];
                $optionsSchema      = array_merge($default_options, $type_options);
            } else {
                $optionsSchema = FORM_ELEMENTS[$this->tagName]['attributes'];
            }
            /**
             * declare collector arrays
             * check against schema
             */
            $errors     = [];
            $attributes = [];
            foreach($optionsSchema as $key => $validType){
                /**
                 * check if key exists in options
                 */
                if(array_key_exists($key, $options)){
                    /**
                     * check data type of options value
                     */
                    if(gettype($options[$key]) !== $validType){
                        /**
                         * check string types against valid types
                         */
                        if(is_string($options[$key]) && str_type($options[$key]) !== $validType){
                            /**
                             * add to errors output
                             */
                            array_push($errors, [
                                'attribute' => $key,
                                'validType' => $validType,
                                'value'     => $options[$key]
                            ]);
                        } else {
                            /**
                             * push to attributes array
                             */
                            $attributes[$key] = $options[$key];
                        }
                    } else {
                        /**
                         * push to attributes array
                         */
                        $attributes[$key] = $options[$key];
                    }
                }
            }
            /**
             * validate results and check for errors
             */
            if(!empty($errors)){
                console($errors);
                throw new Error('Invalid Options!');
            }
            if(count($attributes) !== count($options)){
                throw new Error('Invalid Options! User provided attributes which are not valid!');
            }
            /**
             * return attributes if valid
             */
            return $attributes;
        }
        /*----------------------------------------------------------*/
        /**
         * validateChildren
         * 
         * @return array array of html form element attributes
         */
        /*----------------------------------------------------------*/
        private function validateChildren(array $children){
            return [];
        }
    }
?>
<?php
    /*----------------------------------------------------------*/
    /**
     * SelectElement
     * 
     * @package component
     * @author Michael Naatjes <michael.naatjes87@email.com>
     * 
     */
    /*----------------------------------------------------------*/
    class SelectElement extends FormElement {
        protected $listItems = [];
        /*----------------------------------------------------------*/
        /**
         *  constructor
         */
        /*----------------------------------------------------------*/
        public function __construct(string $name, array $listItems, array $options=[]){
            $this->tagName      = 'select';
            $this->isLabel      = false;
            $this->type         = '';
            $this->attributes   = $this->validateOptions(array_merge($options, ['name'=>$name]));
            $this->name         = $name;
            $this->children     = $this->generateSelectOptions($listItems);
            $this->data         = [];
        }
        /*----------------------------------------------------------*/
        /**
         * generateSelectItems
         * 
         * @return array
         */
        /*----------------------------------------------------------*/
        private function generateSelectOptions(array $listItems){
            /**
             * declare accumulator array
             * loop through list items and append as FormElements
             */
            $result = [];
            foreach($listItems as $ele){
                /**
                 * check for textContent and value
                 */
                if(!array_key_exists('textContent', $ele) && !array_key_exists('value', $ele)){
                    throw new Error('List item missing text and value properties!');
                }
                /**
                 * format form element options
                 * create option form elements
                 */
                $options['value'] = $ele['value'];
                if(count($ele) > 2){
                    /**
                     * exclude value and text content
                     */
                    foreach($ele as $key=>$val){
                        if($key !== 'value' || $key !== 'textContent'){
                            $options[$key] = $val;
                        }
                    }
                }
                /**
                 * push new option element to result
                 */
                array_push($result, new FormElement('option', $options, $ele['textContent']));
            }
            /**
             * return list items as children
             */
            return $result;
        }
    }
?>
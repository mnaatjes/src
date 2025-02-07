<?php
    /*----------------------------------------------------------*/
    /**
     * FormComponent
     * 
     * Generates an HTML form
     * 
     * @package component
     * @author Michael Naatjes <michael.naatjes87@email.com>
     * 
     * 
     * @example $form = new FormComponent();
     * 
     */
    /*----------------------------------------------------------*/
    class FormComponent extends HTMLComponent {
        protected $formName;
        protected $formAction;
        protected $formElements = [];
        protected $useLabels    = false;
        protected $formMethod;
        /*----------------------------------------------------------*/
        /**
         * Constructor for HTMLComponent Class
         * 
         * **Overrides parent class __construct
         * 
         * @param string $formName
         * @param string $formMethod
         * 
         * @return void
         */
        /*----------------------------------------------------------*/
        public function __construct(string $formName, string $formAction, array $fromElements, bool $labels=false, string $formMethod='POST'){
            $this->formName     = $formName;
            $this->formAction   = $formAction;
            $this->fromElements = $this->validateElements($fromElements);
            $this->useLabels    = $labels;
            $this->formMethod   = $formMethod;
        }
        /*----------------------------------------------------------*/
        /**
         *  ValidateElements
         *  validates for elements and adds default elements if not included
         * 
         *  @param array $formElements
         */
        /*----------------------------------------------------------*/
        private function validateElements(array $formElements){
            /**
             * schema
             */
            $defaultSchema = [
                'submit' => new ButtonComponent('Submit')
            ];
        }
    }
?>
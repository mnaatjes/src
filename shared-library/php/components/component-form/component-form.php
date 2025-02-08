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
class FormComponent extends HTMLComponent
{
    protected $formName;
    protected $formAction;
    protected $formElements = [];
    protected $useLabels = false;
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
    public function __construct(string $formName, string $formAction, array $formElements, string $formMethod = 'POST', array $attributes = [])
    {
        /**
         * form properties
         */
        $this->tagName      = 'form';
        $this->formName     = $formName;
        $this->formAction   = $formAction;
        $this->formMethod   = $formMethod;
        $this->attributes   = $this->assembleAttributes($attributes);
        $this->children     = $this->validateElements($formElements);
        $this->data         = [];
    }
    /*----------------------------------------------------------*/
    /**
     * assembleAttributes
     *
     * @param array $attributes
     * @property string $formName
     * @property string $formAction
     * @property string $formMethod
     * @return array
     */
    /*----------------------------------------------------------*/
    private function assembleAttributes(array $attributes){
        /**
         * declare result
         */
        $result = [];
        /**
         * validate form action
         */
        if (str_isURL($this->formAction) || str_isFilePath($this->formAction)) {
            $result['action'] = $this->formAction;
        } else {
            throw new Error('Form Action must be a valid path or URL!');
        }
        /**
         * validate form method
         */
        if ($this->formMethod === 'POST' || $this->formMethod === 'GET') {
            $result['method'] = $this->formMethod;
        } else {
            throw new Error('Form method must be either POST or GET');
        }
        /**
         * set form name
         */
        $result['name'] = $this->formName;
        /**
         * merge attributes
         */
        if (!empty($attributes)) {
            $result = array_merge($result, $attributes);
        }
        return $result;
    }
    /*----------------------------------------------------------*/
    /**
     * validateElements
     * Validates for elements and adds default elements if not included
     * 
     * @param array $formElements
     */
    /*----------------------------------------------------------*/
    private function validateElements(array $formElements){
        return $formElements;
    }
}
?>
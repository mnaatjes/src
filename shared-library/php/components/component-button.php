<?php
    /*----------------------------------------------------------*/
    /**
     * ButtonComponent
     * 
     * @package component
     * @author Michael Naatjes <michael.naatjes87@email.com>
     * 
     * @method void __construct()
     * @method array setAttributes()
     * 
     */
    /*----------------------------------------------------------*/
    class ButtonComponent extends HTMLComponent {
        protected $behaviors = [];
        /*----------------------------------------------------------*/
        /**
         * Constructor for HTMLComponent Class
         * 
         * **Overrides parent class __construct
         * 
         * @param string btnName
         * @param array $attributes optional
         * 
         * @property string $tagName == 'button'
         * @property array $children == empty
         * @property array $data == 'textContent'=>$btnName
         * 
         * @return void
         */
        /*----------------------------------------------------------*/
        public function __construct(string $btnName, array $behaviors=[], string $btnType='button', array $attributes=[]){
            /**
             * TODO:    Assign default values for children
             * TODO:    Assign tagName as button
             * TODO:    Assign btnType to Attributes
             * TODO:    Assign btn-name to textContent of $data array
             * TODO:    Assign behaviors
             */
            $this->tagName      = 'button';
            $this->attributes   = arrayFlatten(array_merge([['type'=>$btnType], $attributes]));
            $this->children     = [];
            $this->data         = ['textContent'=>$btnName];
            $this->behaviors    = [
                'funcType' => $behaviors['funcType'],
                'funcName' => $behaviors['funcName'],
                'funcString' => $behaviors['funcString']
            ];
        }
    }
?>
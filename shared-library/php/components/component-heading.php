<?php
/*----------------------------------------------------------*/
/**
 * HeadingComponent
 * 
 * @package component
 * @author Michael Naatjes <michael.naatjes87@email.com>
 * 
 * @method void __construct()
 * @method array setAttributes()
 * 
 */
/*----------------------------------------------------------*/
class HeadingComponent extends HTMLComponent {
    /*----------------------------------------------------------*/
    /**
     * constructor
     * 
     * @param string $textContent
     * @param string $tag default = h1
     * @param array $attributes
     */
    /*----------------------------------------------------------*/
    public function __construct(string $textContent, string $tag='h1', array $attributes=[]){
        $this->tagName      = $tag;
        $this->attributes   = $attributes;
        $this->children     = [];
        $this->data         = ['textContent'=>$textContent];
    }
}
?>
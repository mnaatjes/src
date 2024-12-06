/*----------------------------------------------------------*/
/**
 * @file src/js/components/dom-controller.js
 * @author mnaatjes
 * @version 1.0.0
 * @date 11-07-2024
 * 
 * @name DOMController
 * @type {Class}
 * @memberof Src.Components
 * @namespace DOMController
 * 
 * @property {HTMLElement} node
 * @property {Object} state
 */
/*----------------------------------------------------------*/
class DOMController {
    constructor(node){
        /**
         * @name node
         * @type {HTMLElement}
         * @memberof DOMController
         */
        this.node = node;
        /**
         * @name state
         * @type {Object}
         * @memberof DOMController
         */
        this.state = new ElementState(this.node);
        /**
         * @name 
         * @type {}
         * @memberof DOMController
         */
        /**
         * debugging
         */
        console.log(this.state.current);
    }
}
/*----------------------------------------------------------*/
/**
 * @name ElementState
 * @type {Class}
 * @memberof Src.Components
 * @property {}
 * @description heirarchical state machine
 */
/*----------------------------------------------------------*/
class ElementState {
    /**
     * 
     */
    #node;
    constructor(node){
        /**
         * @name node
         * @type {HTMLElement}
         * @memberof ElementState
         * @private
         * @description
         */
        this.#node = node;
        /**
         * @name
         * @type {}
         * @memberof ElementState
         * @description
         */
    }
    /*----------------------------------------------------------*/
    /**
     * @name current
     * @type {}
     * @memberof ElementState
     * @public
     * @desciption super-state
     */
    /*----------------------------------------------------------*/
    get current(){
        /**
         * parse state
         */
        return this.#parseState();
    }
    set current(value){}
    /*----------------------------------------------------------*/
    /**
     * @name parseState
     * @type {}
     * @memberof ElementState
     * @private
     * @desciption
     */
    /*----------------------------------------------------------*/
    #parseState(){
        /**
         * check if hidden
         */
        if(this.#hidden === true){
            /**
             * hidden
             */
            return 'hidden';
        } else if(this.#hidden === false){
            /**
             * visible: check if disabled
             */
            if(this.#disabled === true){
                /**
                 * disabled
                 */
                return 'disabled';
            /**
             * enabled: check listening, active, error
             */
            } else if(this.#disabled === false){
                /**
                 * check listening && active
                 */
                if(this.#listening === true && this.#active === true){
                    /**
                     * check error
                     */
                    if(this.error == true){
                        return ['listening', 'active', 'error'];
                    } else {
                        return ['listening', 'active'];
                    }
                /**
                 * check listening or active
                 */
                } else if(this.#listening === true || this.#active === true){
                    /**
                     * check listening, error
                     */
                    if(this.#listening === true){
                        if(this.#error === true){
                            return ['listening', 'error'];
                        }
                    } else if(this.#active === true){
                        return 'active';
                    }
                /**
                 * enabled
                 */
                } else {
                    return 'enabled';
                }
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name disabled
     * @type {Boolean}
     * @memberof ElementState
     * @private
     * @desciption
     */
    /*----------------------------------------------------------*/
    get #disabled(){
        /**
         * check disabled / enabled
         * validate tagName to qualify
         */
        let validTags = [
            'form',
            'input',
            'textarea',
            'select',
            'button',
            'fieldset',
            'legend',
            'label',
            'optgroup',
            'option',
            'a'
        ];
        /**
         * validate
         */
        let isValidTag = validTags.some(tag => tag.toLowerCase() === this.#node.tagName.toLowerCase());
        if(isValidTag === true){
            /**
             * valid input element tagName
             * check disabled attribute
             */
            if(this.#node.hasAttribute('disabled') === true){
                /**
                 * set disabled
                 */
                return true;
            /**
             * check aria-disabled
             */
            } else if(this.#node.hasAttribute('aria-disabled')){
                /**
                 * parse attribute value
                 */
                let attrib = this.#node.getAttribute('aria-disabled');
                if(attrib === 'true'){
                    return true;
                } else {
                    return false;
                }
            }
            /**
             * check classList for disabled className
             */
            else if(this.#node.classList.contains('disabled') === true){
                /**
                 * set disabled
                 */
                return true;
            }
            /**
             * @depreciated check attributes for data-state
             */
            else if(this.#node.hasAttribute('data-state')){
                /**
                 * parse attribute value
                 */
                let attrib = this.#node.getAttribute('data-state');
                if(attrib === 'disabled'){
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            /**
             * element not valid tag to be disabled / enabled
             * return false: can only be enabled
             */
            return false;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name hidden
     * @type {Boolean}
     * @memberof ElementState
     * @private
     * @desciption
     */
    /*----------------------------------------------------------*/
    get #hidden(){
        /**
         * grab computed style and display settings
         */            
        let css     = window.getComputedStyle(this.#node);
        let style   = css.getPropertyValue('display');
        let display = this.#node.style.display;
        /**
         * check computed style
         */
        if(style === 'none'){
            /**
             * set hidden
             */
            return true;
        /**
         * check display settings
         */
        } else if(display === 'none'){
            /**
             * set hidden
             */
            return true;
        /**
         * check hidden attribute
         */
        } else if(this.#node.hasAttribute('hidden')){
            /**
             * init hidden:
             * if hidden attrib present but style != none
             * change style to display none
             */
            if(style !== 'none'){
                this.#node.style.display = 'none';
            }
            /**
             * set hidden
             */
            return true;
        /**
         * @depreciated check data-state
         */
        } else if(this.#node.hasAttribute('data-state')){
            /**
             * parse attribute value
             */
            if(this.#node.getAttribute('data-state') === 'hidden'){
                /**
                 * init hidden
                 */
                if(style !== 'none'){
                    this.#node.style.display = 'none';
                }
                /**
                 * set hidden
                 */
                return true;
            } else {
                /**
                 * data-state value !== hidden
                 */
                return false;
            }
        /**
         * check classList
         */
        } else if(this.#node.classList.contains('hidden') === true){
            /**
             * init hidden
             */
            if(style !== 'none'){
                this.#node.style.display = 'none';
            }
            /**
             * set disabled
             */
            return true;
        /**
         * check aria-hidden
         */
        } else if(this.#node.hasAttribute('aria-hidden')){
            /**
             * parse value
             */
            if(this.#node.getAttribute('aria-hidden') === 'true'){
                /**
                 * element hidden
                 * init hidden
                 */
                if(style !== 'none'){
                    this.#node.style.display = 'none';
                }
                /**
                 * set disabled
                 */
                return true;
            /**
             * Aria = False
             */
            } else {
                return false;
            }
        /**
         * element NOT hidden
         */
        } else {
            return false;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name active
     * @type {Boolean}
     * @memberof ElementState
     * @private
     * @desciption
     */
    /*----------------------------------------------------------*/
    get #active(){
        /**
         * check aria-current
         */
        if(this.#node.hasAttribute('aria-current')){

        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name listening
     * @type {Boolean}
     * @memberof ElementState
     * @private
     * @desciption
     */
    /*----------------------------------------------------------*/
    get #listening(){}
    /*----------------------------------------------------------*/
    /**
     * @name error
     * @type {Boolean}
     * @memberof ElementState
     * @private
     * @desciption
     */
    /*----------------------------------------------------------*/
    get #error(){}
}
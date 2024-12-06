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
        console.dir(this.node);
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
     * private properties
     */
    #node;
    #validTags;
    #states;
    #dataStates;
    #events;
    #inputProperties;
    #elementAttributes;
    #pseudoClasses;
    #ariaAttributes;
    #type;
    #stateMap;
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
         * @name states
         * @type {Array}
         * @memberof ElementState
         * @private
         * @description
         */
        this.#states = [
            'disabled',
            'hidden',
            'active',
            'listening'
        ];
        /**
         * @name validTags
         * @type {Array}
         * @memberof ElementState
         * @private
         * @description
         */
        this.#validTags = [
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
         * @name events
         * @type {Object}
         * @memberof ElementState
         * @private
         * @description
         */
        this.#events = {
            mouse: [
                'click',
                'dblclick',
                'mousedown',
                'mouseup',
                'mouseover',
                'mouseout',
                'mousemove',
                'contextmenu',
                'wheel'
            ],
            keyboard: [
                'keydown',
                'keyup',
                'keypress'
            ],
            form: [
                'submit',
                'reset',
                'change',
                'input',
                'focus',
                'blur',
                'valid',
                'invalid'
            ],
            window: [
                'DOMContentLoaded',
                'load',
                'resize',
                'scroll',
                'unload',
                'error'
            ],
            mobile: [
                'touchstart',
                'touchmove',
                'touchend'
            ],
            animation: [
                'transitionend',
                'animationend',
                'animationiteration',
                'animationstart'
            ],
            draggable: [
                'dragstart',
                'dragend'
            ]
        };
        /**
         * @name pseudoClasses
         * @type {Array}
         * @memberof ElementState
         * @private
         * @description
         */
        this.#pseudoClasses = [
            'active',
            'hover',
            'focus',
            'visited',
            'link',
            'target',
            'enabled',
            'disabled',
            'checked',
            'empty'
        ];
        /**
         * @name elementAttributes
         * @type {Array}
         * @memberof ElementState
         * @private
         * @description
         */
        this.#elementAttributes = [
            'type',
            'name',
            'value',
            'placeholder',
            'maxlength',
            'minlength',
            'pattern',
            'required',
            'readonly',
            'size',
            'cols',
            'rows',
            'multiple',
            'for',
            'draggable',
            'spellcheck',
            'tabindex',
            'title', // tooltip
            'form',
            'autofocus',
            'wrap',
            'hidden'
        ];
        /**
         * @name ariaAttributes
         * @type {Array}
         * @memberof ElementState
         * @private
         * @description
         */
        this.#ariaAttributes = [
            'aria-hidden',
            'aria-label',
            'aria-labelledby',
            'aria-describedby',
            'aria-required',
            'aria-disabled',
            'aria-readonly',
            'aria-checked',
            'aria-expanded',
            'aria-selected',
            'aria-pressed',
            'aria-current',
            'aria-invalid',
            'aria-autocomplete',
            'aria-haspopup',
            'aria-live',
            'aria-atomic',
            'aria-relevant',
            'aria-busy',
            'aria-owns',
            'aria-controls',
            'aria-dropeffect',
            'aria-grabbed'
        ];
        /**
         * @name dataStates
         * @type {Array}
         * @memberof ElementState
         * @private
         * @depreciated
         * @description
         */
        this.#dataStates = [
            'enabled',
            'disabled',
            'hidden',
            'visible', // older
            'listening',
            'active',
            'inactive' // older
        ];
        /**
         * @name stateMap
         * @type {Array}
         * @memberof ElementState
         * @namespace stateMap
         * @private
         * @depreciated
         * @description
         */
        this.#stateMap = {
            /**
             * @name hidden
             * @type {Object}
             * @memberof stateMap
             */
            hidden: {
                /**
                 * @name true
                 * @type {Object}
                 * @memberof stateMap.hidden
                 */
                true: {
                    elementAttributes: {hidden: null},
                    pseudoClasses: 'empty',
                    ariaAttributes: {'aria-hidden': true},
                    classList: 'hidden',
                    styles: {
                        display: 'none',
                        visibility: 'hidden'
                    },
                    dataState: 'hidden'
                },
                /**
                 * @name false
                 * @type {Object}
                 * @memberof stateMap.hidden
                 */
                false: {
                    elementAttributes: null,
                    pseudoClasses: null,
                    ariaAttributes: {'aria-hidden': false},
                    classList: null,
                    styles: {visibility: 'visible'},
                    dataState: 'visible'
                },
                /**
                 * @name children
                 * @type {String | Array}
                 * @memberof stateMap.hidden
                 */
                children: 'disabled',
                /**
                 * @name validTags
                 * @type {Null | Object}
                 * @memberof stateMap.hidden
                 */
                validTags: null
            },
            /**
             * @name disabled
             * @type {Object}
             * @memberof stateMap
             */
            disabled: {
                /**
                 * @name true
                 * @type {Object}
                 * @memberof stateMap.disabled
                 */
                true: {},
                /**
                 * @name false
                 * @type {Object}
                 * @memberof stateMap.disabled
                 */
                false: {
                    elementAttributes: {
                        required: undefined,
                        readonly: undefined,
                        draggable: undefined,
                        tabindex: undefined,
                        title: undefined,
                        form: undefined,
                        autofocus: undefined,
                        multiple: undefined
                    },
                    pseudoClasses: [
                        'active',
                        'hover',
                        'focus',
                        'target'
                    ],
                    ariaAttributes: {
                        'aria-required': undefined,
                        'aria-readonly': undefined,
                        'aria-expanded': undefined,
                        'aria-selected': undefined,
                        'aria-autocomplete': undefined,
                        'aria-haspopup': undefined,
                        'aria-owns': undefined,
                        'aria-controls': undefined,
                        'aria-dropeffect': undefined,
                        'aria-grabbed': undefined
                    },
                    classList: null,
                    styles: null,
                    dataState: 'enabled',
                    /**
                     * @name validTags
                     * @type {Null | Object}
                     * @memberof stateMap.disabled.false
                     */
                    validTags: {
                        input: {elementAttributes: null, pseudoClasses: null, ariaAttributes: {}},
                        textarea: {elementAttributes: null, pseudoClasses: null, ariaAttributes: {}},
                        button: {elementAttributes: null, pseudoClasses: null, ariaAttributes: {}},
                        select: {elementAttributes: null, pseudoClasses: null, ariaAttributes: {}},
                        optgroup: {elementAttributes: null, pseudoClasses: null, ariaAttributes: {}},
                        option: {elementAttributes: null, pseudoClasses: null, ariaAttributes: {}},
                        fieldset: {elementAttributes: null, pseudoClasses: null, ariaAttributes: {}},
                        legend: {elementAttributes: null, pseudoClasses: null, ariaAttributes: {}},
                        label: {elementAttributes: null, pseudoClasses: null, ariaAttributes: {}},
                        anchor: {elementAttributes: null, pseudoClasses: null, ariaAttributes: {}}
                    }
                },
                /**
                 * @name true
                 * @type {String | Array}
                 * @memberof stateMap.disabled
                 */
                children: ['active', 'listening']
            }
        }
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
        console.log(this.#node);
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
        let isValidTag = this.#validTags.some(tag => tag.toLowerCase() === this.#node.tagName.toLowerCase());
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
            /**
             * element does not match checks for disabled
             * element enabled
             * return false
             */
            return false;
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
     * @desciption  This is NOT the active pseudo-class (or clicking an element)
     *              This is the state of an element being current or on the same page
     */
    /*----------------------------------------------------------*/
    get #active(){
        /**
         * check aria-current
         */
        if(this.#node.hasAttribute('aria-current')){
            if(this.#node.getAttribute('aria-current') === 'true'){
                /**
                 * element active
                 */
                return true;
            } else {
                /**
                 * element not active
                 */
                return false;
            }
        }
        /**
         * check className
         * active, current, selected
         */
        if(this.#node.classList.contains('active') === true){
            /**
             * element active class
             */
            return true;
        } else if(this.#node.classList.contains('current') === true){
            /**
             * element current class
             */
            return true;
        } else if(this.#node.classList.contains('selected') === true){
            /**
             * element selected class
             */
            return true;
        }
        /**
         * @depreciated check data-state
         * active, inactive
         */
        if(this.#node.hasAttribute('data-state')){
            let dataState = this.#node.getAttribute('data-state');
            if(dataState === 'active'){
                /**
                 * element active
                 */
                return true;
            } else if(dataState === 'current'){
                /**
                 * element current
                 */
                return true;
            } else if(dataState === 'selected'){
                /**
                 * element selected
                 */
                return true;
            }
            else {
                /**
                 * element inactive
                 */
                return false;
            }
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
    get #listening(){return false;}
    /*----------------------------------------------------------*/
    /**
     * @name
     * @type {Boolean}
     * @memberof ElementState
     * @private
     * @desciption
     */
    /*----------------------------------------------------------*/
}
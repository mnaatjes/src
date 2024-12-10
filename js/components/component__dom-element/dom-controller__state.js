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
    #validInputTags;
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
        this.#validInputTags = [
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
         * debugging
         */
        //this.debugging();
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
    get current(){}
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
    debugging(){
        console.log(`--------Debugging()--------`);
        console.log(this.#listening);
    }
    /*----------------------------------------------------------*/
    /**
     * @name Default
     * @type {Boolean}
     * @typedef SuperState
     * @memberof ElementState
     * @private
     * @desciption 
     */
    /*----------------------------------------------------------*/
    get Default(){
        /**
         * check mounted
         */
        if(this.mounted !== true){
            return false;
        } else {
            /**
             * check rendered
             * check active
             * check data
             */
            if(
                (this.rendered === true || this.rendered === false) &&
                (this.active === null || this.active === false) &&
                (this.data === true || this.data === null)
            ){
                /**
                 * state is default, ready
                 */
                return true;
            } else {
                return false;
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name Init
     * @type {Boolean}
     * @typedef SuperState
     * @memberof ElementState
     * @private
     * @desciption 
     */
    /*----------------------------------------------------------*/
    get Init(){
        /**
         * check mounted
         */
        if(this.mounted === true){
            return false;
        } else {
            return true;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name Live
     * @type {Boolean}
     * @typedef SuperState
     * @memberof ElementState
     * @private
     * @desciption 
     */
    /*----------------------------------------------------------*/
    get Live(){
        /**
         * check mounted
         */
        if(this.mounted !== true){
            return false;
        } else {
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name Error
     * @type {Boolean}
     * @typedef SuperState
     * @memberof ElementState
     * @private
     * @desciption 
     */
    /*----------------------------------------------------------*/
    get Error(){
        /**
         * check mounted
         */
        if(this.mounted !== true){
            return false;
        } else {
            /**
             * check loaded, success
             */
            if(this.#loaded === undefined || this.#success === undefined){
                return undefined;
            } else {
                return !this.#loaded && !this.#success;
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name mounted
     * @type {Boolean}
     * @typedef ParentState
     * @memberof ElementState
     * @public
     * @desciption 
     */
    /*----------------------------------------------------------*/
    get mounted(){
        /**
         * @implements {element.isConnected}
         * @description checks to see if supplied node is connected to dom
         *              determines created / appended / in DOM
         * @returns {Boolean}
         */
        return this.#node.isConnected;
    }
    set mounted(value){
        /**
         * mounted value false
         */
        if(value !== true){
            /**
             * set undefined mainStates
             */
            this.rendered   = undefined;
            this.active     = undefined;
            this.data       = undefined;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name active
     * @type {Boolean}
     * @typedef MainState
     * @memberof ElementState
     * @public
     * @desciption 
     */
    /*----------------------------------------------------------*/
    get rendered(){}
    set rendered(value){
        /**
         * set subStates if undefined
         */
        if(value === undefined){
            this.#hidden    = undefined;
            this.#disabled  = undefined;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name active
     * @type {Boolean}
     * @typedef MainState
     * @memberof ElementState
     * @public
     * @desciption 
     */
    /*----------------------------------------------------------*/
    get active(){}
    set active(value){
        /**
         * set subStates if undefined
         */
        if(value === undefined){
            this.#listening = undefined;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name data
     * @type {Boolean}
     * @typedef MainState
     * @memberof ElementState
     * @public
     * @desciption 
     */
    /*----------------------------------------------------------*/
    get data(){}
    set data(value){
        /**
         * set subStates if undefined
         */
        if(value === undefined){
            this.#loaded    = undefined;
            this.#success   = undefined;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name disabled
     * @type {Boolean}
     * @typedef SubState
     * @memberof ElementState
     * @private
     * @desciption 
     */
    /*----------------------------------------------------------*/
    get #disabled(){}
    set #disabled(value){}
    /*----------------------------------------------------------*/
    /**
     * @name hidden
     * @type {Boolean}
     * @typedef SubState
     * @memberof ElementState
     * @private
     * @desciption
     */
    /*----------------------------------------------------------*/
    get #hidden(){}
    set #hidden(value){}
    /*----------------------------------------------------------*/
    /**
     * @name listening
     * @type {Boolean}
     * @typedef SubState
     * @memberof ElementState
     * @private
     * @desciption
     */
    /*----------------------------------------------------------*/
    get #listening(){
        /**
         * @depreciated check data-state: listening
         */
        if(this.#node.hasAttribute('data-state')){
            if(this.#node.getAttribute('data-state') === 'listening'){
                return true;
            }
        }
        /**
         * check listening events
         */
        else if(this.#node instanceof EventTarget && this.#node.events.length > 0){
            /**
             * set listening
             */
            return true;
        } else {
            /**
             * no listener appended
             */
            return false;
        }
    }
    set #listening(value){}
    /*----------------------------------------------------------*/
    /**
     * @name loaded
     * @type {Method}
     * @typedef SubState
     * @memberof ElementState
     * @private
     * @desciption
     */
    /*----------------------------------------------------------*/
    get #loaded(){
        /**
         * check mounting
         */
        if(this.mounted === true){
            /**
             * check valid tags
             */
            let valid = [
                'img',
                'script',
                'iframe',
                'audio',
                'video'
            ];
            if(valid.includes(this.#node.tagName.toLowerCase())){
                /**
                 * check img instance
                 */
                if(this.#node instanceof HTMLImageElement){
                    return this.#node.complete && this.#node.src !== '';
                }
                /**
                 * check video instance
                 */
                else if(this.#node instanceof HTMLVideoElement){
                    return this.#node.readyState >= 4;
                }
                /**
                 * check iframe instance
                 */
                else if(this.#node instanceof HTMLIFrameElement){
                    return this.#node.contentDocument !== null;
                }
                /**
                 * check script instance
                 */
                else if(this.#node instanceof HTMLScriptElement){
                    /**
                     * check ready state
                     */
                    return this.#node.src !== '';
                }
                /**
                 * otherwise false
                 */
                else {return false;}
            } else {
                /**
                 * tag not valid
                 */
                return undefined;
            }
        }
        /**
         * unmounted --> undefined
         */
        else {
            return undefined;
        }
    }
    set #loaded(value){}
    /*----------------------------------------------------------*/
    /**
     * @name success
     * @type {Boolean}
     * @typedef SubState
     * @memberof ElementState
     * @private
     * @desciption
     */
    /*----------------------------------------------------------*/
    get #success(){
        /**
         * check mounting
         */
        if(this.mounted === true){
            /**
             * check valid tags
             */
            let valid = [
                'img',
                'script',
                'iframe',
                'audio',
                'video'
            ];
            if(valid.includes(this.#node.tagName.toLowerCase())){
                /**
                 * check img instance
                 */
                if(this.#node instanceof HTMLImageElement){
                    return this.#node.complete && this.#node.naturalWidth > 0;
                }
                /**
                 * check video instance
                 */
                else if(this.#node instanceof HTMLVideoElement){
                    return this.#node.readyState >= this.#node.HAVE_ENOUGH_DATA;
                }
                /**
                 * check iframe instance
                 */
                else if(this.#node instanceof HTMLIFrameElement){
                    return this.#node.contentDocument && this.#node.contentDocument.readyState === 'complete';
                }
                /**
                 * check script instance
                 */
                else if(this.#node instanceof HTMLScriptElement){
                    /**
                     * check ready state
                     */
                    return this.#node.src !== '';
                }
                /**
                 * otherwise false
                 */
                else {return false;}
            } else {
                /**
                 * tag not valid
                 */
                return undefined;
            }
        }
        /**
         * unmounted --> undefined
         */
        else {
            return undefined;
        }
    }
    set #success(value){}
}
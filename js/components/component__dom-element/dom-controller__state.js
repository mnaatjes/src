/*----------------------------------------------------------*/
/**
 * @name ElementState
 * @type {Class}
 * @memberof Src.Components
 * @property {}
 * @description heirarchical state machine
 */
/*----------------------------------------------------------*/
export class ElementState {
    /**
     * private properties
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
         * @name debug
         * @type {HTMLElement}
         * @memberof ElementState
         * @public
         * @description
         */
        this.debug = false;
        /**
         * @name _active
         * @type {Null | Boolean}
         * @memberof ElementState
         * @description container value for active property
         */
        this._active = null;
        /**
         * debugging
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
        return {
            Init: this.Init,
            Default: this.Default,
            Live: this.Live,
            Error: this.Error
        };
    }
    set current(value){}
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
        if(this.#mounted !== true){
            return false;
        } else {
            /**
             * check rendered
             * check active
             */
            if(
                (this.rendered === true || this.rendered === false) &&
                (this.active === null || this.active === false)
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
        if(this.#mounted === true){
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
        if(this.#mounted !== true){
            return false;
        } else {
            /**
             * check listening, active
             */
            if(this.#listening && this.active === true){
                return true;
            } else {
                return false;
            }
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
        if(this.#mounted !== true){
            return false;
        } else {
            /**
             * check loaded
             */
            if(this.#loaded === undefined){
                return undefined;
            } else {
                return !this.#loaded;
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
    get #mounted(){
        /**
         * @implements {element.isConnected}
         * @description checks to see if supplied node is connected to dom
         *              determines created / appended / in DOM
         * @returns {Boolean}
         */
        return this.#node.isConnected;
    }
    set #mounted(value){}
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
    get rendered(){
        return this.#node.rendered;
    }
    set rendered(value){}
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
    get active(){
        /**
         * check #listening state
         */
        if(this.#listening === true && this._active == null){
            return false;
        } else {
            /**
             * return proxy value
             */
            return this._active;
        }
    }
    set active(value){
        /**
         * set subStates if undefined
         */
        if(value === undefined){
            /**
             * set listening
             */
            this.#listening = undefined;
            /**
             * set proxy value
             */
            this._active = value;
        }
        /**
         * set proxy value
         */
        this._active = value;
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
    get disabled(){
        /**
         * @name search
         * @type {Array}
         * @memberof disabled
         */
        let search = {
            attributes: false,
            classList: false,
            dataStates: false
        };
        /**
         * check attributes
         */
        search.attributes = [
            {attributeName: 'aria-disabled', value: 'true'},
            {attributeName: 'disabled', value: ''},
        ].some((obj) => {
            /**
             * check if element has attribute
             * check if values match
             */
            return this.#node.hasAttribute(obj.attributeName) && this.#node.getAttribute(obj.attributeName) === obj.value;
        });
        /**
         * check classList
         */
        if(this.#node.classList.contains('disabled')){
            search.classList = true;
        }
        /**
         * check dataState
         */
        if(this.#node.hasAttribute('data-state') && this.#node.getAttribute('data-state') === 'disabled'){
            search.dataStates = true;
        }
        /**
         * check search values
         */
        return Object.values(search).some(value => value);
    }
    set disabled(value){}
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
    get hidden(){
        /**
         * @name search
         * @type {Array}
         * @memberof hidden
         */
        let search = {
            attributes: false,
            classList: false,
            dataStates: false
        };
        /**
         * search attributes
         */
        search.attributes = [
            {attributeName: 'aria-hidden', value: 'true'},
            {attributeName: 'hidden', value: ''},
        ].some((obj) => {
            /**
             * check if element has attribute
             * check if values match
             */
            return this.#node.hasAttribute(obj.attributeName) && this.#node.getAttribute(obj.attributeName) === obj.value;
        });
        /**
         * check dataState
         */
        if(this.#node.hasAttribute('data-state') && this.#node.getAttribute('data-state', 'hidden')){
            search.dataStates = true;
        }
        /**
         * check search values
         */
        return Object.values(search).some(value => value);
    }
    set hidden(value){}
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
    set #listening(value){
        /**
         * set active proxy
         */
        if(value === false){
            this._active = null;
        } else if(value === true){
            this._active = false;
        }
    }
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
        if(this.#mounted === true){
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
}
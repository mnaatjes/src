/*----------------------------------------------------------*/
/**
 * @file src/core/dom-element/dom-element.js
 * @author mnaatjes
 * @version 1.0.0
 * @date 11-07-2024
 * 
 * @module DOMAttribute 
 * @module ElementState 
 */
import { HTMLAttributes, ARIAAttributes, DOMElementEvents } from "../../utils/dom-controller__utils__constants.js";
import { DOMAttribute } from "./dom-element__html-attribute.js";
import { ElementState } from "./dom-element__state.js";

/**
 * @name DOMElement
 * @type {Class}
 * @memberof Src.Components
 * @namespace DOMElement
 * 
 * @property {HTMLElement} node
 * @property {HTMLElement} properties
 * @property {Object} state
 */
/*----------------------------------------------------------*/
export class DOMElement {
    #node;
    #parent;
    #type;
    #defaultDisplay;
    constructor(node, properties=undefined){
        /**
         * @name node
         * @type {HTMLElement}
         * @memberof DOMElement
         * @private
         */
        this.#node = node;
        /**
         * @name parent
         * @type {HTMLElement}
         * @memberof ElementState
         * @private
         * @desciption
         */
        this.#parent = this.#initParent(node, properties);
        /**
         * @name events
         * @type {Array}
         * @memberof ElementState
         * @private
         * @desciption
         */
        this.#node.events = [];
        /**
         * @name rendered
         * @type {Array}
         * @memberof ElementState
         * @private
         * @desciption  rendered / re-rendered state
         *              TODO: figure out how to manage renders and re-renders
         */
        this.#node.rendered = true;
        /**
         * @name type
         * @type {HTMLElement}
         * @memberof DOMElement
         * @private
         */
        this.#type = this.#node.tagName.toLowerCase();
        /**
         * @name state
         * @type {Object}
         * @memberof DOMElement
         * @public
         * @description element state listener / getter
         */
        this.state = new ElementState(this.#node);
        /**
         * @name defaultDisplay
         * @type {String}
         * @memberof DOMElement
         */
        this.#defaultDisplay = this.computedStyle.getPropertyValue('display');
        /**
         * @name props
         * @type {String}
         * @memberof DOMElement
         * TODO: set props
         */
        //this.props = properties.props;
        /**
         * @implements {initDOMElement}
         */
        this.#initDOMElement(node, properties);
        /**
         * debugging
         */
    }
    /*----------------------------------------------------------*/
    /**
     * @name initDOMElement
     * @type {Method}
     * @memberof DOMElement
     * @private
     * @param {String | Object} node
     * @param {Object} properies
     * @description
     */
    /*----------------------------------------------------------*/
    #initDOMElement(node, properties){
        /**
         * validate supplied node
         */
        this.#validateNode(node);
        /**
         * initialize listener methods
         */
        this.#initListeners(properties);
        /**
         * initialize attributes
         */
        this.#initAttributes(properties);
        /**
         * initialize children
         */
        this.#initChildren(properties);
    }
    /*----------------------------------------------------------*/
    /**
     * @name validateNode
     * @type {Method}
     * @memberof DOMElement
     * @private
     * 
     * @param {String | Object} node
     * @property {Object} node
     * @description validates supplied node
     * @returns {Object} validation: Boolean, elementType: String
     */
    /*----------------------------------------------------------*/
    #validateNode(node){
        /**
         * TODO: Check if object
         * TODO: Check if instance of HTML Element
         */
    }
    /*----------------------------------------------------------*/
    /**
     * @name initParent
     * @type {Method}
     * @memberof DOMElement
     * @private
     * 
     * @param {String | Object} node
     * @param {Object} properties
     * @description
     */
    /*----------------------------------------------------------*/
    #initParent(node, properties){
        if(!node.parentElement){
            return properties.parent;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name initAttributes
     * @type {Method}
     * @memberof DOMElement
     * @private
     * @param {Object} properties
     * @property {Array} ARIAAttributes
     * @property {Array} HTMLAttributes
     * @description TODO:   change to already have an array of attributes appropriate
     *                      to element tagName; NOT the entire array of properties
     *              TODO:   set supplied attributes from CreateComponent
     */
    /*----------------------------------------------------------*/
    #initAttributes(properties){
        /**
         * @name formatAttribute
         * @type {Function}
         * @memberof initAttributes
         * @param {String} attribute
         * @description
         * @returns {String}
         */
        function formatAttribute(attribute){
            /**
             * determine if attribute is aria attribute
             */
            if(attribute.startsWith('aria')){
                /**
                 * seperator character
                 * index of character after seperator
                 * slice attribute and return string after seperator
                 */
                let sep     = '-';
                let index   = attribute.indexOf(sep) + 1;
                let suffix  = attribute.slice(index, attribute.length);
                /**
                 * capitalize aria attribute suffix
                 * append prefix aria
                 * return string as propertyName
                 */
                suffix = suffix.charAt(0).toUpperCase() + suffix.slice(1);
                return 'aria' + suffix;
            } else {
                return attribute;
            }
        }
        /**
         * @name attributes
         * @type {Array}
         * @memberof initAttributes
         * @description concat ARIA attributes with HTML attributes
         *              only include valid tag attributes
         */
        let attributes = HTMLAttributes.concat(ARIAAttributes)
        /**
         * return only entries that match tag of element
         */
        .map((entry) => {
            /**
             * exclude attributes that do not match tagName
             */
            if(entry.tags.length == 1){
                /**
                 * return all * tags
                 */
                if(entry.tags[0] === '*'){
                    return entry;
                }
            } else {
                if(entry.tags.includes(this.#type)){
                    return entry;
                }
            }
        })
        /**
         * filter out undefined array elements
         */
        .filter((entry) => entry !== undefined)
        /**
         * map filter for Aria attribute Names
         * create new property: propertyName
         */
        .map((entry) => {
            return {
                /**
                 * copy existing properties
                 */
                ...entry,
                /**
                 * add new property
                 */
                propertyName: formatAttribute(entry.attribute)
            };
        });
        /**
         * loop attributes array
         * create DOMElement properties
         */
        attributes.forEach(entry => {
            /**
             * create Class instance
             */
            DOMElement.prototype[entry.propertyName] = new DOMAttribute(this.#node, {
                attribute: entry.attribute,
                values: entry.values,
                tags: entry.tags
            });
        });
        /**
         * TODO: create DOMAttribute for supplied Data Attributes
         * activate supplied element attributes
         */
        //console.log(properties);
    }
    /*----------------------------------------------------------*/
    /**
     * @name children
     * @type {Array}
     * @memberof DOMElement
     * @public
     * @desciption
     */
    /*----------------------------------------------------------*/
    get children(){
        /**
         * TODO: FIX THIS BULLSHIT
         * check for instances
         * return accumulator array
         */
        let acc = {};
        for(let property in this){
            if(this[property] instanceof DOMElement){
                /**
                 * attach to acc object
                 */
                acc[property] = this[property];
            } else if(Array.isArray(this[property])){
                /**
                 * loop property array to determine if DOMElement Element
                 * init temp arr
                 */
                let arr = [];
                this[property].forEach(item => {
                    if(item instanceof DOMElement){
                        /**
                         * attach to arr
                         */
                        arr.push(item);
                    }
                });
                /**
                 * check if arr has length
                 */
                if(arr.length > 0){
                    /**
                     * attach to acc object
                     */
                    acc[property] = arr;
                }
            }
        }
        return acc;
    }
    set children(value){}
    /*----------------------------------------------------------*/
    /**
     * @name BoundingClientRect
     * @type {Object}
     * @memberof DOMElement
     * @public
     * @desciption
     */
    /*----------------------------------------------------------*/
    get BoundingClientRect(){
        return this.#node.getBoundingClientRect();
    }
    set BoundingClientRect(value){}
    /*----------------------------------------------------------*/
    /**
     * @name style
     * @type {Object}
     * @memberof DOMElement
     * @public
     * @desciption HTML inline DOM style
     */
    /*----------------------------------------------------------*/
    get style(){
        return this.#node.style;
    }
    set style(value){}
    /*----------------------------------------------------------*/
    /**
     * @name computedStyle
     * @type {Object}
     * @memberof DOMElement
     * @public
     * @readonly
     * @property {Method} getPropertyValue
     * @desciption Stylesheet styles
     */
    /*----------------------------------------------------------*/
    get computedStyle(){
        return window.getComputedStyle(this.#node);
    }
    set computedStyle(value){}
    /*----------------------------------------------------------*/
    /**
     * @name initListeners
     * @type {Method}
     * @memberof DOMElement
     * @private
     * @param {Object} properties
     * @property {Array} eventListeners
     */
    /*----------------------------------------------------------*/
    #initListeners(properties){
        /**
         * grab HTML events array
         */
        let eventListeners = DOMElementEvents;
        /**
         * loop event listeners array
         */
        eventListeners.forEach(listener => {
            /**
             * Assign ListenerMethods
             * assign method name to Class
             * declare method name as function
             */
            DOMElement.prototype[listener.methodName] = function(callback, options=undefined){
                /**
                 * @implements {#listen}
                 * invoke listen method
                 */
                this.#listen(listener.type, function(e){callback(e);}, options);
            }
            /**
             * Assign Remove Listener Methods
             * capitalize first letter
             */
            let fChar   = listener.methodName.charAt(0).toUpperCase();
            let word    = listener.methodName.slice(1);
            let removeMethodName = 'remove' + fChar + word;
            /**
             * Assign Remove Listener Method
             */
            DOMElement.prototype[removeMethodName] = function(){
                /**
                 * @implements {#removeListener}
                 * invoke remove listener method
                 */
                this.#removeListener(listener.type);
            }
        });
        /**
         * append pre-defined events from elementEvents
         */
        if(properties !== undefined && typeof properties === 'object' && Object.hasOwn(properties, 'events')){
            /**
             * validate events object
             */
            if(properties.events !== undefined && typeof properties.events === 'object'){
                /**
                 * loop events
                 */
                Object.keys(properties.events).forEach(key => {
                    /**
                     * declare functions, options
                     */
                    let func = properties.events[key];
                    /**
                     * call specified event method and append properties
                     */
                    this[key](func, undefined);
                });
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name initChildren
     * @type {Method}
     * @memberof DOMElement
     * @private
     * @param {Object} properties
     * @property {Array} node.children
     */
    /*----------------------------------------------------------*/
    #initChildren(properties){
        /**
         * @name tagNames
         * @type {Array}
         * @memberof initChildren
         */
        let tagNames = Array.from(this.#node.children)
        .map((child) => {
            return child.tagName.toLowerCase();
        })
        .reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], []);
        /**
         * @name protoChildren
         * @type {Array}
         * @memberof initChildren
         */
        let protoChildren;
        /**
         * validate properties
         */
        if(properties !== undefined){
            /**
             * validate children
             */
            if(Array.isArray(properties.children)){
                protoChildren = properties.children;
            }
        }
        /**
         * @name children
         * @type {Array}
         * @memberof initChildren
         * @description create array from node.children
         *              pull tagName and node from childen
         *              reduce array of matching tagNames
         */
        let children = [];
        /**
         * loop tagNames
         * build children array
         */
        tagNames.forEach(tag => {
            let temp = {
                tagName: tag,
                nodes: [],
                protoElements: []
            };
            /**
             * loop child nodes
             */
            Array.from(this.#node.children).forEach((child, index) => {
                /**
                 * validate protochildren
                 */
                if(protoChildren !== undefined){
                    if(protoChildren[index].type === tag){
                        temp.protoElements.push(protoChildren[index]);
                    }
                }
                /**
                 * build nodes array
                 */
                if(child.tagName.toLowerCase() === tag){
                    temp.nodes.push(child);
                }
            });
            /**
             * push children
             */
            children.push(temp);
        });
        /**
         * refine children array
         * reduce nodes to value if array length === 1
         * reduce protoelements to value if array length === 1
         */
        children.forEach(child => {
            if(child.nodes.length === 1){
                child.nodes = child.nodes[0];
            }
            if(child.protoElements.length === 1){
                child.protoElements = child.protoElements[0];
            }
        });
        /**
         * loop children and append to Class object
         */
        children.forEach(child => {
            /**
             * assign object property
             * for node values NOT arrays
             */
            if(!Array.isArray(child.nodes)){
                /**
                 * create Class property
                 */
                DOMElement.prototype[child.tagName] = new DOMElement(child.nodes, child.protoElements);
                /**
                 * append to children
                 */
            } else {
                /**
                 * create accumulator array
                 * loop nodes and generate nodeControllers
                 */
                let acc = [];
                child.nodes.forEach((node, index) => {
                    acc.push(new DOMElement(node, child.protoElements[index]));
                });
                /**
                 * create class property
                 */
                DOMElement.prototype[child.tagName] = acc;
            }
        });
    }
    /*----------------------------------------------------------*/
    /**
     * @name listen
     * @type {Method}
     * @memberof DOMElement
     * @private
     * @description
     */
    /*----------------------------------------------------------*/
    #listen(type, callback, options){
        /**
         * @name search
         * @type {Boolean}
         * @memberof #listen
         * @description search boolean for event
         */
        let search = false;
        /**
         * search events array for previous click event
         */
        if(this.#node.events.length > 0){
            if(this.#node.events.find(item => item.type === type)){
                search = true;
            }
        }
        /**
         * check if event already exists
         */
        if(search){
            console.error(`${type.toUpperCase()} already exists in ${this.constructor.name}`);
            return;
        } else {
            /**
             * define listener
             */
            let listener = (e) => {
                /**
                 * update Active State: true
                 */
                this.state.active = true;
                /**
                 * append callback
                 */
                callback(e);
                /**
                 * update Active State: false
                 */
                this.state.active = false;
            }
            /**
             * execute addEventListener
             */
            this.#node.addEventListener(type, listener, options);
            /**
             * push data to events array
             */
            this.#node.events.push({type: type, listener: listener});
        }
        
    }
    /*----------------------------------------------------------*/
    /**
     * @name removeListener
     * @type {Method}
     * @memberof DOMElement
     * @private
     * @param {String} type
     * @description
     */
    /*----------------------------------------------------------*/
    #removeListener(type){
        /**
         * @name search
         * @type {Boolean}
         * @memberof #removeListener
         * @description search boolean for event
         */
        let search = false;
        /**
         * @name entry
         * @type {Object}
         * @memberof #removeListener
         * @description entry data of specific event
         */
        let entry;
        /**
         * @name index
         * @type {Object}
         * @memberof #removeListener
         * @description entry index in events array
         */
        let index;
        /**
         * search events array for previous click event
         */
        if(this.#node.events.length > 0){
            /**
             * find events entry for 'click'
             */
            entry = this.#node.events.find(item => item.type === type);
            if(entry){
                /**
                 * set search
                 */
                search = true;
                /**
                 * set index
                 */
                index = this.#node.events.indexOf(entry);
            }
        }
        /**
         * if seach true --> event exists
         * remove event
         */
        if(search){
            /**
             * remove listener
             */
            this.#node.removeEventListener(entry.type, entry.listener);
            /**
             * remove events array entry
             */
            this.#node.events.splice(index, 1);
        /**
         * event does NOT exist and cannot be removed
         * display error
         */
        } else {
            console.error(`${type.toUpperCase()} does not exists and cannot be removed`);
            return;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name enable
     * @type {Method}
     * @memberof DOMElement
     * @public
     * @desciption
     */
    /*----------------------------------------------------------*/
    enable(){
        /**
         * set attributes
         */
    }
    /*----------------------------------------------------------*/
    /**
     * @name disable
     * @type {Method}
     * @memberof DOMElement
     * @public
     * @desciption
     */
    /*----------------------------------------------------------*/
    disable(){
        /**
         * set attributes
         */
    }
    /*----------------------------------------------------------*/
    /**
     * @name show
     * @type {Method}
     * @memberof DOMElement
     * @public
     * @desciption
     */
    /*----------------------------------------------------------*/
    show(){
        /**
         * update attributes
         * hidden
         * aria
         */
        if(this.hidden.enabled){
            this.hidden.remove();
        }
        this.ariaHidden.update(false);
        /**
         * apply default display value
         */
        this.#node.display = this.#defaultDisplay;
    }
    /*----------------------------------------------------------*/
    /**
     * @name hide
     * @type {Method}
     * @memberof DOMElement
     * @public
     * @desciption
     */
    /*----------------------------------------------------------*/
    hide(){
        /**
         * update attributes
         */
        this.hidden.update();
        this.ariaHidden.update(true);
        /**
         * set display to none
         */
        this.#node.display = 'none';
    }
    /*----------------------------------------------------------*/
    /**
     * @name activate
     * @type {Method}
     * @memberof DOMElement
     * @public
     * @desciption
     */
    /*----------------------------------------------------------*/
    activate(){}
    /*----------------------------------------------------------*/
    /**
     * @name deactivate
     * @type {Method}
     * @memberof DOMElement
     * @public
     * @desciption
     */
    /*----------------------------------------------------------*/
    deactivate(){}
    /*----------------------------------------------------------*/
    /**
     * @name write
     * @type {Method}
     * @memberof DOMElement
     * @public
     * @param {String} text
     * @desciption
     */
    /*----------------------------------------------------------*/
    write(text){
        this.#node.textContent = text;
    }
    /*----------------------------------------------------------*/
    /**
     * @name read
     * @type {Method}
     * @memberof DOMElement
     * @public
     * @desciption
     */
    /*----------------------------------------------------------*/
    read(){
        return this.#node.textContent;
    }
    /*----------------------------------------------------------*/
    /**
     * @name mount
     * @type {Method}
     * @memberof DOMElement
     * @public
     * @desciption
     */
    /*----------------------------------------------------------*/
    mount(){
        this.#parent.appendChild(this.#node);
    }
    /*----------------------------------------------------------*/
    /**
     * @name render
     * @type {Method}
     * @memberof DOMElement
     * @public
     * @desciption
     */
    /*----------------------------------------------------------*/
    render(){}
    /*----------------------------------------------------------*/
    /**
     * @name blur
     * @type {Method}
     * @memberof DOMElement
     * @public
     * @desciption
     */
    /*----------------------------------------------------------*/
    blur(){}
    /*----------------------------------------------------------*/
    /**
     * @name addChild
     * @type {Method}
     * @memberof DOMElement
     * @public
     * @desciption
     */
    /*----------------------------------------------------------*/
    addChild(){}
    /*----------------------------------------------------------*/
    /**
     * @name removeChild
     * @type {Method}
     * @memberof DOMElement
     * @public
     * @desciption
     */
    /*----------------------------------------------------------*/
    removeChild(){}
    /*----------------------------------------------------------*/
    /**
     * @name clear
     * @type {Method}
     * @memberof DOMElement
     * @public
     * @desciption
     */
    /*----------------------------------------------------------*/
    clear(){}
}
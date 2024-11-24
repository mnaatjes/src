/*----------------------------------------------------------*/
/**
 * @file src/js/components/component__dom-element.js
 * @author mnaatjes
 * @version 1.0.0
 * @date 11-07-2024
 * 
 * @name DOMElement
 * @type {Class}
 * @memberof Src.Components
 * @namespace DOMElement
 * 
 * @param {String} container_id
 * @property {HTMLElement} node
 * @property {Method} enable
 * @property {Function} disable
 * @property {Function} show
 * @property {Function} hide
 * @property {Object} state
 */
/*----------------------------------------------------------*/
class DOMElement {
    constructor(container_id, parent_node=null){
        /**
         * @name init
         * @type {Object}
         * @memberof DOMElement
         * @description
         */
        this.init = this.initContainer(container_id, parent_node);
        /**
         * @name parent
         * @type {HTMLElement}
         * @memberof DOMElement
         * @description
         */
        this.parent = this.init.parent_node;
        /**
         * @name node
         * @type {HTMLElement}
         * @param {}
         * @property {}
         * @memberof DOMElement
         * @description
         */
        this.node = this.init.node;
        /**
         * @name id
         * @type {HTMLElement}
         * @param {}
         * @property {}
         * @memberof DOMElement
         * @description
         */
        this.id = this.init.node.id;
        /**
         * @name state
         * @type {Object}
         * @memberof DOMElement
         * @namespace State
         * @description
         */
        this.state = {
            enabled: false,
            disabled: false,
            hidden: false,
            active: false,
            listening: false,
            node: this.node,
            /**
             * @name getState
             * @type {Function}
             * @memberof State
             * @param {('enabled' | 'hidden' | 'active' | 'listening')} state
             * @returns {Object[state].value}
             */
            getState: function(state){
                /**
                 * check if state exists
                 */
                if(this.hasOwnProperty(state)){
                    return this[state];
                } else {console.error('Error: Incorrect state property!');}
            },
            /**
             * @name setState
             * @type {Function}
             * @memberof State
             * @param {('enabled' | 'hidden' | 'active' | 'listening')} state
             * @param {Boolean} value target bool
             * @returns {Object.self}
             */
            setState: function(state, value){
                /**
                 * @name result
                 * @type {String}
                 */
                let result;
                /**
                 * check if property exists
                 */
                if(this.hasOwnProperty(state) && value != undefined){
                    /**
                     * set property
                     */
                    if(state != 'listening'){
                        /**
                         * attrib value: enabled
                         */
                        if(state == 'enabled'){
                            if(value == true){result = state;}
                            else {result = 'disabled';}
                        }
                        /**
                         * attrib value: disabled
                         */
                        if(state == 'disabled'){
                            if(value == true){result = state;}
                            else {result = 'enabled';}
                        }
                        /**
                         * attrib value: hidden
                         */
                        if(state == 'hidden'){
                            if(value == true){result = state;}
                            else {result = 'enabled';}
                        }
                        /**
                         * attrib value: active
                         */
                        if(state == 'active'){
                            if(value == true){result = state;}
                            else {result = 'enabled';}
                        }
                        /**
                         * set attribute
                         */
                        this.node.setAttribute('data-state', result);
                    }
                    /**
                     * update state
                     */
                    this.update();
                } else {console.error('Invalid State Setting! Check property name or value.');}
            },
            /**
             * @name update
             * @type {Function}
             * @memberof State
             * @returns {Object.self}
             */
            update: function(){return this.init(this.node);},
            /**
             * @name init
             * @type {Function}
             * @memberof State
             * @param {node}
             * @returns {Object.self}
             */
            init: function(node){
                /**
                 * loop state booleans
                 */
                for(let key in this){
                    if(this.hasOwnProperty(key)){
                        if((typeof this[key]) == 'boolean'){
                            /**
                             * grab DOM state
                             */
                            let data_state = node.getAttribute('data-state');
                            /**
                             * set enabled, visible, active
                             */
                            switch(data_state){
                                case null:
                                    /**
                                     * set properties
                                     */
                                    this.enabled    = true;
                                    this.hidden     = false;
                                    this.active     = false;
                                    /**
                                     * set attribute
                                     */
                                    node.setAttribute('data-state', 'enabled');
                                case 'enabled':
                                    /**
                                     * set properties
                                     */
                                    this.enabled    = true;
                                    this.hidden     = false;
                                    this.active     = false;
                                    break;
                                case 'disabled':
                                    /**
                                     * set properties
                                     */
                                    this.enabled    = false;
                                    this.hidden     = false;
                                    this.active     = false;
                                    break;
                                case 'hidden':
                                    /**
                                     * set properties
                                     */
                                    this.enabled    = false;
                                    this.hidden     = true;
                                    this.active     = false;
                                    break;
                                case 'active':
                                    /**
                                     * set properties
                                     */
                                    this.enabled    = false;
                                    this.hidden     = false;
                                    this.active     = true;
                                    break;
                            }
                            /**
                             * grab onclick attribute
                             */
                            let click = node.getAttribute('onclick');
                            /**
                             * set property
                             */
                            if(click == null){
                                /**
                                 * no listener
                                 */
                                this.listening = false;
                            }
                            else if(click == ''){
                                /**
                                 * no listener
                                 */
                                this.listening = false;
                            } else if((typeof click == 'string') && (click.length > 3)){
                                /**
                                 * yes listener
                                 */
                                this.listening = true;
                            }
                        }
                    }
                }
            }
        };
        /**
         * @name attrib
         * @type {String}
         * @memberof DOMElement
         */
        this.attrib = 'data-state';
        /**
         * @name children
         * @type {HTMLCollection}
         * @property {}
         * @memberof DOMElement
         * @description
         */
        this.children = this.node.children;
        /**
         * @name style
         * @type {Object}
         * @property {}
         * @memberof DOMElement
         * @namespace Style
         * @description
         */
        this.style = {
            /**
             * @name self
             * @type {HTMLElement}
             * @memberof Style
             * @description main object
             */
            node: this.node,
            /**
             * @name active
             * @type {Array}
             * @memberof Style
             * @description classList data
             */
            active: this.node.classList,
            /**
             * @name set
             * @type {Function}
             * @memberof Style
             * @param {String} style
             * @description
             */
            add: function(style){
                /**
                 * @name flag
                 * @type {Boolean}
                 * @description
                 */
                let flag = false;
                /**
                 * check if any active classes
                 */
                if(this.active.length != 0){
                    /**
                     * check if style already set
                     */
                    this.active.forEach(class_name => {
                        if(class_name == style){
                            console.error('Style already exists in classList!');
                        } else {flag = true;}
                    });
                } else {flag = true;}
                /**
                 * if flag = true: add style to classList
                 */
                if(flag){this.node.classList.add(style);}
            },
            /**
             * @name remove
             * @type {Function}
             * @memberof Style
             * @param {String} style
             * @description
             */
            remove(style){
                /**
                 * @name flag
                 * @type {Boolean}
                 * @description
                 */
                let flag = false;
                /**
                 * check if any active classes
                 */
                if(this.active.length != 0){
                    /**
                     * check if style already set
                     */
                    this.active.forEach(class_name => {
                        if(class_name != style){
                            console.error('Style does not exist in classList');
                        } else {flag = true;}
                    });
                } else {flag = true;}
                /**
                 * if flag = true: add style to classList
                 */
                if(flag){this.node.classList.remove(style);}
            },
            /**
             * @name clear
             * @type {Function}
             * @memberof Style
             * @description
             */
            clear: function(){
                /**
                 * check if any active classes
                 */
                if(this.active.length > 0){
                    this.node.classList = '';
                    this.node.removeAttribute('class');
                } else {console.error('classList already Empty!');}
            },
            /**
             * @name display
             * @type {StyleProperty}
             * @memberof Style
             * @description
             */
            display: getComputedStyle(this.node).display,

        };
        /**
         * @name entries
         * @type {Array}
         * @property {}
         * @memberof DOMElement
         * @description
         */
        this.entries = [];
        /**
         * @implements initDOMElement
         */
        this.initDOMElement();
    }
    /*----------------------------------------------------------*/
    /**
     * @name initDOMElement
     * @type {Method}
     * @memberof DOMElement
     * @param {String} container_id
     * @param {HTMLElement} parent_node
     * @description initialize element
     */
    /*----------------------------------------------------------*/
    initDOMElement(){
        /**
         * set state
         */
        this.state.init(this.node);
    }
    /*----------------------------------------------------------*/
    /**
     * @name initContainer
     * @type {Method}
     * @memberof DOMElement
     * @param {String} container_id
     * @param {HTMLElement} parent_node
     * @description get parent and container node.
     *              if parent not provided, aqcuire from container
     *              if container not provided, append to parent
     *              else throw error
     */
    /*----------------------------------------------------------*/
    initContainer(container_id, parent_node){
        /**
         * @name result
         * @type {Object}
         */
        let result = {};
        /**
         * @name result.node
         * @type {HTMLElement | Null}
         */
        result.node = document.getElementById(container_id);
        /**
         * check if node exists
         */
        if(result.node == null && parent_node != null){
            /**
             * create node if parent node exists
             */
            result.node     = document.createElement('div');
            result.node.id  = container_id;
            result.node.setAttribute('data-state', 'enabled');
            /**
             * append to parent
             */
            parent_node.appendChild(result.node);
        /**
         * node exists but parent not included
         */
        } else if(result.node != null && parent_node == null){
            /**
             * get parent if not provided
             * grab from existing node
             */
            result.parent_node = result.node.parentElement;
        } else {
            /**
             * parent node doesn't exist
             * node cannot be injected
             */
            console.error('No Parent Node provided! Cannot create container node.');
            return;
        }
        /**
         * return results
         */
        return result;
    }
    /*----------------------------------------------------------*/
    /**
     * @name update
     * @type {Method}
     * @param {String} func_name
     * @memberof DOMElement
     */
    /*----------------------------------------------------------*/
    update(state, value){
        /**
         * set node attribute
         */
        this.node.setAttribute(this.attrib, state);
        /**
         * update state
         */
        this.state.setState(state, value);
    }
    /*----------------------------------------------------------*/
    /**
     * @name addListener
     * @type {Method}
     * @memberof DOMElement
     * @param {String} event
     * @param {String} listener
     * @returns 
     */
    /*----------------------------------------------------------*/
    addListener(event, listener){
        /**
         * @implements update
         */
        this.node.setAttribute(event, listener);
        /**
         * update state
         */
        this.state.update(this.node);
    }
    /*----------------------------------------------------------*/
    /**
     * @name removeListener
     * @type {Method}
     * @param {String} event
     * @memberof DOMElement
     */
    /*----------------------------------------------------------*/
    removeListener(event){
        /**
         * @implements update
         */
        this.node.removeAttribute(event);
        /**
         * update state
         */
        this.state.update(this.node);
    }
    /*----------------------------------------------------------*/
    /**
     * @name enable
     * @type {Method}
     * @memberof DOMElement
     * @returns {Boolean} true
     */
    /*----------------------------------------------------------*/
    enable(){
        /**
         * @implements update
         */
        this.update('enabled', true);
    }
    /*----------------------------------------------------------*/
    /**
     * @name disable
     * @type {Method}
     * @memberof DOMElement
     * @returns {Boolean} false
     */
    /*----------------------------------------------------------*/
    disable(){
        /**
         * @implements update
         */
        this.update('disabled', true);
    }
    /*----------------------------------------------------------*/
    /**
     * @name show
     * @type {Method}
     * @memberof DOMElement
     * @returns {Boolean} true
     */
    /*----------------------------------------------------------*/
    show(){
        /**
         * set style
         */
        this.node.style.display = this.style.display;
        /**
         * @implements update
         */
        this.update('hidden', false);
    }
    /*----------------------------------------------------------*/
    /**
     * @name hide
     * @type {Method}
     * @memberof DOMElement
     * @returns {Boolean} false
     */
    /*----------------------------------------------------------*/
    hide(){
        /**
         * set style display
         */
        this.node.style.display = 'none';
        /**
         * @implements update
         */
        this.update('hidden', true);
    }
    /*----------------------------------------------------------*/
    /**
     * @name activate
     * @type {Method}
     * @memberof DOMElement
     * @returns {Boolean} true
     */
    /*----------------------------------------------------------*/
    activate(){
        /**
         * @implements update
         */
        this.update('active', true);
    }
    /*----------------------------------------------------------*/
    /**
     * @name deactivate
     * @type {Method}
     * @memberof DOMElement
     * @returns {Boolean} false
     */
    /*----------------------------------------------------------*/
    deactivate(){
        /**
         * @implements update
         */
        this.update('active', false);
    }
    /*----------------------------------------------------------*/
    /**
     * @name writeTo
     * @type {Method}
     * @memberof DOMElement
     * @namespace WriteTo
     * @param {String | Number} output
     */
    /*----------------------------------------------------------*/
    writeTo(output){
        /**
         * @name self
         * @type {Object}
         * @memberof WriteTo
         */
        let self = this;
        /**
         * @name loopChildren
         * @type {Function}
         * @memberof WriteTo
         * @param {Callback} callback
         * @property {HTMLCollection} self.children
         */
        function loopChildren(callback){
            for(let i = 0; i < self.children.length; i++){
                callback(self.children[i]);
            }
        }
        /**
         * function chain
         */
        return {
            /**
             * @name fromId
             * @type {Function}
             * @memberof WriteTo
             * @param {String} element_id
             */
            fromId: function(element_id){
                /**
                 * loop children and check id
                 */
                loopChildren(function(child){
                    if(element_id == child.id){child.innerHTML = output;}
                });
            },
            /**
             * @name fromClassName
             * @type {Function}
             * @memberof WriteTo
             * @param {String} class_name
             */
            fromClassName: function(class_name){
                /**
                 * loop children and check id
                 */
                loopChildren(function(child){
                    /**
                     * loop classList
                     */
                    child.classList.forEach(item => {
                        if(item == class_name){child.innerHTML = output;}
                    });
                });
            },
            /**
             * @name fromTag
             * @type {Function}
             * @memberof WriteTo
             * @param {String} tag_name
             */
            fromTag: function(tag_name){
                /**
                 * loop children and check id
                 */
                loopChildren(function(child){
                    if(child.tagName == tag_name.toUpperCase()){
                        child.innerHTML = output;
                    }
                });
            },
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name write
     * @type {Method}
     * @memberof DOMElement
     * @param {String | Number} output
     */
    /*----------------------------------------------------------*/
    write(output){
        /**
         * write to innerHTML
         */
        this.node.innerHTML = output;
    }
    /*----------------------------------------------------------*/
    /**
     * @name blur
     * @type {Method}
     * @memberof DOMElement
     * @description unfocuses element
     */
    /*----------------------------------------------------------*/
    blur(){this.node.blur();}
    /*----------------------------------------------------------*/
    /**
     * @name clear
     * @type {Method}
     * @memberof DOMElement
     * @returns {Boolean} true
     */
    /*----------------------------------------------------------*/
    clear(){
        /**
         * clear content
         */
        this.node.innerHTML = '';
        /**
         * clear styles
         */
        this.style.clear();
        /**
         * update state
         */
        this.state.update(this.node);
    }
    /*----------------------------------------------------------*/
    /**
     * @name createChildren
     * @type {Method}
     * @memberof DOMElement
     * @returns
     */
    /*----------------------------------------------------------*/
    createChildren(){
        /**
         * TODO:    create n number of child nodes
         *          define tag type
         *          define styles
         *          append classList
         *          create nested, appended, adjacent
         *          add to children list; turn into DOMElements
         *          be able to select easily
         *          be able to write to all in a loop
         *          be able to update just one
         */
    }
}
/*----------------------------------------------------------*/
/**
 * @file src/js/components/component_dom-element/dom-controller__html-attribute.js
 * @memberof DOMElement
 */
/**
 * @name DOMAttribute
 * @type {Class}
 * @namespace DOMAttribute
 * @description
 */
/*----------------------------------------------------------*/
export class DOMAttribute {
    #node;
    #attributeName;
    #validTags;
    #validValues;
    #validValueTypes;
    constructor(node, entry){
        /**
         * @name node
         * @type {HTMLElement}
         * @memberof DOMAttribute
         * @private
         * @description
         */
        this.#node = node;
        /**
         * @name _value
         * @type {Undefined | Null | Boolean | String | Number}
         * @memberof DOMAttribute
         * @description stored value
         */
        this._value;
        /**
         * @name attributeName
         * @type {Array}
         * @memberof DOMAttribute
         * @description
         */
        this.#attributeName = entry.attribute;
        /**
         * @name validTags
         * @type {Array}
         * @memberof DOMAttribute
         * @description
         */
        this.#validTags = entry.tags;
        /**
         * @name validValues
         * @type {Array}
         * @memberof DOMAttribute
         * @description
         */
        this.#validValues = entry.values
        /**
         * @name validValueTypes
         * @type {Object}
         * @memberof AriaAttribute
         * @private
         * @description
         */
        this.#validValueTypes = entry.values.reduce((acc, curr) => {
            if(!acc.includes(typeof curr)){
                /**
                 * ensure valid type not overridden
                 */
                if(!['string', 'number', 'boolean'].includes(curr)){
                    acc.push(typeof curr);
                } else {
                    acc.push(curr);
                }
            }
            return acc;
        }, []);
        /**
         * debugging
         */
    }
    /*----------------------------------------------------------*/
    /**
     * @name enabled
     * @type {Boolean}
     * @memberof DOMAttribute
     * @public
     * @description determines if attribute exsts and returns value form DOM
     */
    /*----------------------------------------------------------*/
    get enabled(){
        /**
         * check if attribute exists
         */
        return this.#has;
    }
    set enabled(value){}
    /*----------------------------------------------------------*/
    /**
     * @name enable
     * @type {Method}
     * @memberof DOMAttribute
     * @public
     * @description 
     */
    /*----------------------------------------------------------*/
    enable(){
        /**
         * check if element already exists
         */
        if(this.#has){
            console.error(`Attribute: ${this.#attributeName} already exists and is enabled!`);
        } else {
            /**
             * check if value proxy is defined
             */
            if(this._value !== undefined){
                /**
                 * add attribute
                 */
                this.add(this._value);
            } else {
                /**
                 * no stored value
                 */
                console.error(`No value stored for ${this.#attributeName}! Please use this.add(value)`);
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name disable
     * @type {Method}
     * @memberof DOMAttribute
     * @public
     * @description 
     */
    /*----------------------------------------------------------*/
    disable(){
        /**
         * call remove
         */
        this.remove();
    }
    /*----------------------------------------------------------*/
    /**
     * @name add
     * @type {Method}
     * @memberof DOMAttribute
     * @public
     * @param {Undefined | Null | Boolean | Number | String} value
     * @description
     */
    /*----------------------------------------------------------*/
    add(value){
        /**
         * check if attribute already exists
         */
        if(this.#has){
            console.error(`${this.#attributeName.toUpperCase()} already Exists and has value of: ${this.#value}`)
        } else {
            /**
             * validate
             */
            if(this.#validate(value)){
                /**
                 * parse value
                 * update value
                 * update DOM attribute value
                 */
                this.#value = value;
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name remove
     * @type {Method}
     * @memberof DOMAttribute
     * @public
     * @description
     */
    /*----------------------------------------------------------*/
    remove(){
        /**
         * check if attrbute exists
         */
        if(this.#has){
            /**
             * store _value
             */
            this._value = this.#value;
            /**
             * remove attribute from DOM
             */
            this.#node.removeAttribute(this.#attributeName);
        } else {
            console.error(`${this.#attributeName} does not exist and cannot be removed!`);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name update
     * @type {Method}
     * @memberof DOMAttribute
     * @public
     * @param {Undefined | Null | Boolean | Number | String} value
     * @description
     */
    /*----------------------------------------------------------*/
    update(value){
        /**
         * check if attribute exists
         */
        if(this.#has){
            /**
             * validate
             */
            if(this.#validate(value)){
                /**
                 * parse value
                 * update value
                 * update DOM attribute value
                 */
                this.#value = value;
            }
        } else {
            this.add(value);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name has
     * @type {Boolean}
     * @memberof DOMAttribute
     * @private
     * @description attribute exists in html element
     */
    /*----------------------------------------------------------*/
    get #has(){return this.#node.hasAttribute(this.#attributeName);}
    /*----------------------------------------------------------*/
    /**
     * @name value
     * @type {Undefined | Null | Boolean | Number | String}
     * @memberof DOMAttribute
     * @private
     * @description
     */
    /*----------------------------------------------------------*/
    get #value(){
        /**
         * check if attribute exists
         */
        if(this.#has){
            /**
             * get type of value
             */
            let value   = this.#node.getAttribute(this.#attributeName);
            let type    = parseType(value);
            /**
             * parse value based on type
             */
            switch(type){
                case 'undefined':
                    return undefined;
                case 'boolean':
                    value = value.toLowerCase();
                    if(value === 'true'){
                        return true;
                    } else if(value === 'false') {
                        return false;
                    } else {
                        return undefined;
                    }
                    break;
                case 'number':
                    return parseFloat(value);
                default: 
                    return value;
            }
            
        } else {
            return undefined;
        }
    }
    set #value(value){
        /**
         * undefined values
         */
        if(value === undefined || value === 'undefined'){
            this.#node.setAttribute(this.#attributeName, '');
        } else {
            /**
             * set DOM attribute value
             */
            this.#node.setAttribute(this.#attributeName, value);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name validate
     * @type {Method}
     * @memberof DOMAttribute
     * @private
     * @param {Undefined | Null | Boolean | Number | String} value
     * @description
     */
    /*----------------------------------------------------------*/
    #validate(value){
        /**
         * get typeof
         * check string types
         */
        let type = typeof value;
        if(type === 'string'){
            type = parseType(value);
        }
        /**
         * validate type
         */
        if(this.#validValueTypes.includes(type)){
            /**
             * check for blanket values
             */
            if(
                this.#validValues.includes('string') ||
                this.#validValues.includes('number') ||
                this.#validValues.includes('boolean')
            ){
                /**
                 * value is fluid and cannot be limited by a list of values
                 */
                return true;
            } else if(this.#validValues.length === 0){
                /**
                 * value not defined
                 */
                return true;
            } else {
                /**
                 * value must match specific
                 */
                return this.#validValues.includes(value);
            }
        } else {
            return false;
        }
    }
}
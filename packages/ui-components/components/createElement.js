import { UIComponent } from "../core/ui-component.js";

/**
 * @file src/packages/ui-components/components/createElement.js
 * @function element
 * @memberof UIComponent
 * @namespace createElement
 * @param {String} tagName
 * @param {Object} attributes
 * @param {Object} data
 * @returns {UIComponent}
 */
export function createElement(tagName, attributes={}, data={}){
    /**
     * create dom element
     */
    let ele = document.createElement(tagName);
    /**
     * check for attributes
     */
    if(Object.keys(attributes).length > 0){
        ele = applyAttributes(ele, attributes);
    }
    return ele;
}
/**
 * @memberof createElement
 * @function validateAttributes
 * @param {Object} attributes
 * @property {Array} validAttribs
 * @returns {boolean}
 */
function validateAttributes(attributes={}){
    return true;
}
/**
 * @memberof createElement
 * @function applyAttributes
 * @param {HTMLElement} ele
 * @param {Object} attributes
 * @returns {boolean}
 */
function applyAttributes(ele, attributes={}){
    /**
     * validate ele
     */
    if(ele === undefined || (typeof ele === 'object' && !(ele instanceof HTMLElement))){
        throw new TypeError(`Element provided is not properly defined in "${applyAttributes.name}"`);
    }
    /**
     * validate attribs
     */
    if(!validateAttributes(attributes)){
        console.error(attributes);
        throw new TypeError('Attributes supplied are not valid!');
    }
    /**
     * apply attribtues
     */
    for(const [key, val] of Object.entries(attributes)){
        /**
         * determine if class or attribute
         */
        if(key === 'class'){
            ele.classList.add(...parseClassList(val));
        } else {
            /**
             * append html attributes
             */
            ele.setAttribute(key, val);
        }
    }
    /**
     * return updated ele
     */
    return ele;
}
/**
 * @memberof createElement
 * @function parseClassList
 * @param {String | Array} classes
 * 
 * @returns {Boolean | Array} false if failed, HTML Element if successful
 */
function parseClassList(classes){
    /**
     * declare class container
     * check if string or array
     */
    let classList = [];
    if(typeof classes === 'string'){
        /**
         * convert string to array:
         * check if single word --> push
         * check if multiple words --> split --> assign
         */
        if(classes.split(' ').length === 1){
            classList.push(classes.trim());
        } else {
            /**
             * trim leading and trailing whitespace
             * generate array from delimiter: spaces
             */
            classList = classes.trim().split(/\s+/);
        }
    } else if(typeof classes === 'object' && Array.isArray(classes)) {
        /**
         * clean entries of whitespace 
         */
        classList = classes.map(str => {
            /**
             * clean string
             */
            str = str.trim();
            /**
             * check that elements are not multiple words
             */
            if(str.includes(' ')){
                return str.split(/\s+/);
            } else {
                return str;
            }
        }).flat(Infinity);
    } else {
        /**
         * classes not formatted properly
         */
        throw new TypeError('"Classes" provided not of correct type! Must be an array or a string!');
    }
    /**
     * append classes
     */
    return classList;
}
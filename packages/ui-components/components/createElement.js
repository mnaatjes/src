import { formTags } from "../core/shared/constants.js";
import { UIComponent } from "../core/ui-component.js";

/**
 * @file src/packages/ui-components/components/createElement.js
 * @function element
 * @memberof UIComponent
 * @namespace createElement
 * @param {String} tagName
 * @param {Object} attributes
 * @param {Object} data
 * @property {Array} validTags 
 * @returns {HTMLElement}
 */
export function createElement(tagName, attributes={}, children=[], props={}){
    /**
     * Validate tag
     * Determine element type
     * Create dom element
     */
    let ele = document.createElement(tagName);
    /**
     * check for attributes
     */
    if(Object.keys(attributes).length > 0){
        ele = applyAttributes(ele, attributes);
    }
    /**
     * check for children
     * validate and apply
     */
    if(children.length > 0){
        ele = applyChildren(ele, children);
    }
    /**
     * check for properties and apply
     */
    if(Object.keys(props).length > 0){
        Object.keys(props).forEach(key => {
            ele[key] = props[key];
        });
    }
    /**
     * return generated element
     */
    return ele;
}
/**
 * @memberof createElement
 * @function applyChildren
 * @param {HTMLElement} parent
 * @param {Object | Array} children
 * @property {Array} validChildren
 */
export function applyChildren(parent, children){
    /**
     * validate children
     */
    if(!(children.every(ele => ele instanceof HTMLElement))){
        throw new TypeError('Children supplied are not all HTMLElement instances!');
    }
    /**
     * Validate child element tags
     */
    if(validateChildElementTags(parent.tagName, children.map(obj => obj.tagName.toLowerCase()))){
        children.forEach(child => {
            parent.appendChild(child);
        });
    }
    /**
     * return element
     */
    return parent;
}
/**
 * @memberof createElement
 * @function validateChildElementTags
 * @param {String} tagName
 * @param {Array} childTags
 * @property {Array} validChildren
 */
function validateChildElementTags(tagName, childTags){
    /**
     * format tagname
     */
    tagName = tagName.toLowerCase();
    /**
     * Check against list of acceptable children
     */
    if(formTags.hasOwnProperty(tagName)){
        return childTags.every(tag => formTags[tagName].children.includes(tag));
    }
    /**
     * default return true
     * @todo add other conditions
     */
    return true;
}
/**
 * @memberof createElement
 * @function validateAttributes
 * @param {String} tagName
 * @param {Object} attributes
 * @property {Array} validAttribs
 * @property {Object} formTags
 * @returns {boolean}
 */
function validateAttributes(tagName, attributes={}){
    /**
     * format tagName
     * check element species
     * 1) Form Element
     * 2) Other Element
     */
    tagName = tagName.toLowerCase();
    if(formTags[tagName] !== undefined){
        /**
         * validate form element attributes
         * return boolean value
         */
        return Object.keys(attributes).every(
            key => {
                /**
                 * Valid value(s) from form tags attributes list
                 * @property {String | Object | Array} validAttributeValue
                 */
                let validAttributeValue = formTags[tagName].attributes[key];
                /**
                 * Supplied attribute typeof value
                 * @property {String} type
                 */
                let type = typeof attributes[key];
                /**
                 * check type of attribute values
                 * object / value type --> search for list
                 */
                if(typeof validAttributeValue === 'object'){
                    /**
                     * @property {Array} formTypes
                     */
                    let formTypes = [
                        'string',
                        'number',
                        'boolean',
                        'bigint',
                        'symbol'
                    ];
                    /**
                     * Check if array of values or object of key->values
                     * 1) Check against valid form attribute value typeof
                     * 2) Check against explicitly defined values
                     */
                    if(Array.isArray(validAttributeValue)){
                        /**
                         * Check that supplied attribute types are included in form types
                         * Check that type matches valid values
                         */
                        if(!(formTypes.includes(type)) || !(validAttributeValue.includes(type))){
                            return key in formTags[tagName].attributes && validAttributeValue.includes(attributes[key]);
                        } else {
                            return key in formTags[tagName].attributes && validAttributeValue.includes(type);
                        }
                    }
                } else {
                    return key in formTags[tagName].attributes && typeof validAttributeValue === type;
                }
                
            }
        );
    }
    /**
     * return boolean
     */
    return false;
}
/**
 * @memberof createElement
 * @function applyAttributes
 * @param {HTMLElement} ele
 * @param {Object} attributes
 * @returns {boolean}
 */
export function applyAttributes(ele, attributes={}){
    /**
     * validate ele
     */
    if(ele === undefined || (typeof ele === 'object' && !(ele instanceof HTMLElement))){
        throw new TypeError(`Element provided is not properly defined in "${applyAttributes.name}"`);
    }
    /**
     * validate attribs
     */
    if(!validateAttributes(ele.tagName, attributes)){
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
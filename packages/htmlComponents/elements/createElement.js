/**
 * @file src/components/createElement
 * @author Michael Naatjes
 * @since 02-27-2025
 * @version 1.0.0
 */
import { voidElements } from "../constants/constants.js";
import { validateChildren, applyElementProps } from "./utils.js"; 
/**
 * @typedef {Object} HTMLProperties - HTML Element Properties
 * @property {String} [name] - Name of HTML Element
 * @property {String | Number} [value] - Value of HTML Element
 * @property {Object} [styles] - Styles object for editing style object of
 */

/**
 * @function createElement
 * @param {String} tagName
 * @param {Object} properties
 * @param {Array} children
 * @returns {HTMLElement}
 */
export function createElement(tagName, properties={}, children=[]){
    /**
     * Validate tagName
     *  1) Check type
     *  2) Check against voidElements list if children
     */
    if(typeof tagName !== 'string'){
        throw new TypeError(`Invalid TagName! "tagName" parameter must be a string!`);
    }
    /**
     * Validate Properties:
     * Check Type
     */
    if(typeof properties !== 'object'){
        throw new TypeError('Properties must be formatted in an object');
    } else if (Object.keys(properties).length === 0){
        console.warn(`Element "${tagName}" has no assigned "properties"!`);
    }
    /**
     * Validate Child Elements:
     * 1) Check if tagName supports children
     * 2) Validate Children
     */
    if(voidElements.includes(tagName) && children.length > 0){
        /**
         * Element does NOT support children
         */
        throw new Error(`The "${tagName}" Element does NOT support Child Elements!`);
    }
    if(!validateChildren(children)){
        throw new Error('Children Array failed validation');
    }
    /**
     * Create Element
     */
    const ele = document.createElement(tagName);
    /**
     * Append Properties
     */
    applyElementProps(ele, properties, 'set');
    /**
     * Append Children
     */
    if(children !== undefined && children.length > 0){
        children.filter(child => typeof child !== 'undefined').forEach(child => {
            if(!(child instanceof HTMLElement) && typeof child === 'object'){
                child = createElement(
                    child.tagName,
                    child.properties,
                    child.hasOwnProperty('children') ? child.children : []
                );
            }
            /**
             * Append children to main element
             */
            ele.appendChild(child);
        });
    }
    /**
     * Return element
     */
    return ele;
}
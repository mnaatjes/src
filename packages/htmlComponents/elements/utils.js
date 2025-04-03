/*----------------------------------------------------------*/
/**
 * @function appendStyles
 * @param {Object} style HTML Element style object
 * @param {Object} styles
 * @returns {Void}
 */

import { dimensionalStyleProps, unitlessStyleProps, regexPatterns } from "../constants/constants.js";
import { appendEvents } from "../utils/appendEvents.js";
import { setProperties } from "../utils/setProperties.js";

/*----------------------------------------------------------*/
export function appendStyles(style, styles){
    /**
     * Format Props
     */
    styles = Object.entries(styles).reduce((_, [key, val]) => {
        if(key.includes('-')){
            key = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
        }
        //console.log(obj[key]);
        return _[key] = val, _;
    }, {});
    /**
     * Apply Props
     */
    for(const prop in styles){
        let value = styles[prop];
        /**
         * Check for numeric value:
         * 1) Check against unitless property list
         * 2) Append necessary units [if needed]
         * 3) Format numeric value as string
         */
        if(isFinite(value) && !isNaN(value) && typeof value !== 'string'){
            // Property if unitless
            if(unitlessStyleProps.includes(prop)){
                // Convert to string
                value = value.toString();
            } else if(dimensionalStyleProps.includes(prop)) {
                // Value requires units
                value = value + 'px';
            }
        }
        /**
         * Apply property and value to style object
         */
        style[prop] = value;
    }
}
/*----------------------------------------------------------*/
/**
 * @function applyElementProps
 * @param {HTMLElement} element
 * @param {Object} attributes
 * @param {String} mode values 'set' or 'remove'
 * @returns {Void} Applies properties to provided HTMLElement
 */
/*----------------------------------------------------------*/
export function applyElementProps(element, properties, mode='set'){
    /**
     * Valid mode values
     * @property {Array} modes
     */
    const modes = ['set', 'remove'];
    /**
     * validate mode
     */
    if(!modes.includes(mode)){
        throw new Error('Wrong mode!');
    }
    /**
     * Check that style is not confused with styles in properties
     */
    if(properties.hasOwnProperty('style') && properties.hasOwnProperty('styles')){
        console.warn('Both "style" and "styles" properties used in creating element. Conflicts possible!');
    }
    /**
     * Destructure Attributes object
     */
    const { id, style, styles, classList, textContent, pattern, innerHTML, ...attributes} = properties;
    /**
     * Set Attributes
     */
    if(mode === 'set'){
        /**
         * Validate and Apply id
         */
        if(id && typeof id === 'string'){
            element.id = id;
        }
        /**
         * Validate and apply textContent
         */
        if(textContent !== undefined){
            element.textContent = textContent;
        }
        /**
         * Validate and apply innerHTML
         */
        if(innerHTML !== undefined){
            element.innerHTML = innerHTML;
        }
        /**
         * Validate and Apply Styles
         * TODO: this does not deep copy style and styles (nested objects/props not included!)
         */
        const styleProps = {...styles, ...style};
        if(typeof style === 'object' && typeof styles === 'object'){
            /**
             * TODO: Check for duplicate properties
             */
        }
        appendStyles(element.style, styleProps);
        /**
         * Validate and Apply pattern
         */
        if(pattern && regexPatterns[pattern].regex instanceof RegExp){
            element.setAttribute('pattern', regexPatterns[pattern].regex.source);
        } else if(pattern !== undefined){
            element.setAttribute('pattern', pattern);
        }
        /**
         * Validate and Apply ClassList
         */
        if(classList && typeof classList === 'string'){
            element.classList.add(classList);
        } else if(classList && typeof classList === 'object' && Array.isArray(classList)){
            element.classList.add(...classList);
        }
        /**
         * Validate and apply attribs
         */
        if(attributes && typeof attributes === 'object' && Object.keys(attributes).length > 0){
            /**
             * destructure attributes for special cases
             */
            const {novalidate, ...rest} = attributes;
            /**
             * Check novalidate values
             * TODO: Modify and update --> Injects "undefined" into html tag
             */
            if(novalidate !== undefined){
                if([false, 'false', null].includes(novalidate)){
                    element.setAttribute(novalidate, '');
                }
            }
            /**
             * Parse Boolean Properties and Set
             */
            const props = setProperties(rest, element);
            /**
             * Parse Event Properties, Attributes
             * Set / Append Events, Listeners
             */
            const attribs = appendEvents(props, element);
            /**
             * Set Remaining Attributes
             */
            for(const prop in attribs){
                element.setAttribute(prop, attribs[prop]);
            }
        }
    }
}
/*----------------------------------------------------------*/
/**
 * @function validateChildren
 * @param {Array} children
 * @returns {Boolean}
 */
/*----------------------------------------------------------*/
export function validateChildren(children=[]){
    /**
     * Check if children is an array
     */
    if(!Array.isArray(children)){
        throw new TypeError('"Children" must be an array!');
    }
    if(children.length === 0){
        /**
         * No children
         */
        return true;
    }
    /**
     * Check that Array contains either HTML element instances or typeof objects
     */
    if(!children.every(child => child instanceof HTMLElement || typeof child === 'object')){
        throw new TypeError('Elements of "Children" array must be: instanceof HTMLElement OR typeof object!');
    }
    /**
     * Check format of Object elements:
     */
    /**
     * @property {Object} schema - createElement Object Schema
     */
    const schema = {
        tagName: 'string',
        properties: 'object',
        children: 'array'
    };
    /**
     * Check format of Child Objects
     * Excluding HTML Elements
     */
    if(!children.filter(ele => !(ele instanceof HTMLElement)).every(child => {
        /**
         * Compare lengths
         */
        const lengthSchema  = Object.keys(schema).length;
        const lengthChild   = Object.keys(child).length;
        if(lengthChild > lengthSchema){
            console.error(`Child Element has TOO MANY properties!:\n${JSON.stringify(child, null, 2)}`);
            return false;
        }
        /**
         * Check against Schema for property and value type
         */
        if(!Object.entries(schema).every(([prop, type], i) => {
            /**
             * Check Property Exists
             */
            if(prop !== 'children' && !child.hasOwnProperty(prop)){
                console.error(`Child is missing: "${prop}" property!`);
                return false;
            }
            /**
             * Check property type:
             * Exempt Children property
             */
            if(typeof child[prop] !== type){
                if(prop === 'children' && child[prop] !== undefined){
                    // check if array
                    return Array.isArray(child[prop]);
                } else if(prop === 'children' && child[prop] === undefined){
                    return true;
                } else {
                    return false;
                }
            }
            /**
             * Property name and type match
             */
            return true;
        })){
            /**
             * Child Properties failed test
             */
            return false;
        }
        /**
         * Child Element Object contains all properties of correct type
         */
        return true;
    })){
        /**
         * Child Elements Failed Test
         */
        return false;
    }
    /**
     * Default: true
     */
    return true;
}
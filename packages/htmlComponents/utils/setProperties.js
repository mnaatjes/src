import { booleanProperties } from "../constants/constants.js";
import { deepCopy } from '../utils/main.js';
/**
 * @function setProperties
 * @param {Object} properties - html element properties from createElement()
 * @param {HTMLElement} element - html element on which to attach properties
 */
export function setProperties(properties, element){
    /**
     * Validate properties
     * Check if empty --> exit
     */
    if(typeof properties !== 'object'){
        throw new TypeError(`Properties provided are NOT an Object! "${(typeof properties).toUpperCase()}" supplied instead!`);
    }
    if(Array.isArray(properties)){
        throw new TypeError(`Properties provided are Array! OBJECT must be provided!`);
    }
    if(Object.keys(properties).length === 0){
        return properties;
    }
    /**
     * Copy properties object
     * @const {Object} copy - copy of properties object
     */
    const copy  = deepCopy(properties);
    /**
     * Check for boolean properties and destructure from copy
     * @const {Array} props - property keys extracted from copy of properties
     */
    const props = booleanProperties.map((prop) => {
        // check that copy contains prop as key
        if(Object.keys(copy).includes(prop)){
            // set property
            element[prop] = copy[prop];
            // remove property from copy
            delete copy[prop];
        }
    });
    /**
     * Return copied, destructuredobject of remaining properties
     */
    return copy;
}
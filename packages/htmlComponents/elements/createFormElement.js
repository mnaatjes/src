import { formElements } from "../constants/constants.js";
import { createElement } from "../elements/createElement.js";
/**
 * @function createFormElement
 * @param {String} tagName
 * @param {Object} properties - Attributes, styles, and properties of the Form Element
 * @param {Array} children - Child Elements HTMLElements or CreateElement Objects
 * 
 */
export function createFormElement(tagName, properties={}, children=[]){
    /**
     * Validate against form Elements
     */
    if(!formElements.includes(tagName)){
        throw new TypeError(`"${tagName}" is NOT a valid Form Element!\nPlease select one of the following:\n ${JSON.stringify(formElements, null, 2)}`);
    }
    /**
     * Generate element
     */
    return createElement(tagName, properties, children);
}
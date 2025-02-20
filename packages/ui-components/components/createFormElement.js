import { formTags } from "../core/shared/constants.js";
import { applyAttributes, applyChildren, createElement } from "./createElement.js";
/**
 * @file createFormElement.js
 * @function createFormElement
 * @param {String} tagName
 * @param {Object} attributes
 * @param {Object} children
 * @param {Object} data
 * @returns {HTMLElement}
 */
export function createFormElement(tagName, attributes, children=[], props={}){
    /**
     * validate tag
     * create DOM element
     */
    if(!(formTags.hasOwnProperty(tagName))){
        throw new Error(`Tagname "${tagName}" is not a valid HTML Form Element!`);
    }
    /**
     * return form element
     */
    return createElement(tagName, attributes, children, props);
}
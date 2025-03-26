/**
 * @file elements/createInputElement.js
 * @author Michael Naatjes
 * @since 02-28-2025
 * @version 1.0.0
 */

import { inputTypes } from "../constants/constants.js";
import { createFormElement } from "./createFormElement.js";

/**
 * @function createInputElement
 * @param {String} type - Input element type; e.g. 'text' or 'image' or 'file'
 * @param {String} name - Input field name (required attribute for all input elements)
 * @param {Object} properties - Required Attributes and Optional attributes
 */
export function createInputElement(type='', name='', properties={}){
    /**
     * Validate Type:
     * 1) Check typeof
     * 2) Check against array
     */
    if(typeof type !== 'string'){
        throw new TypeError('Invalid "type" parameter! Parameter must be a String!');
    }
    if(type.trim().length === 0){
        throw new Error('Invalid "type" parameter!\nType cannot be empty string!');
    }
    if(!inputTypes.map(ele => ele.inputType).includes(type)){
        throw new TypeError(`Invalid "type" value!\n"${type}" is not a valid input type!\nPlease select from the following\n${JSON.stringify(inputTypes.map(ele => ele.inputType), null, 2)}`);
    }
    /**
     * Validate Required
     * 1) Check types of values and length
     * 2) Check that properties contains required props
     * 3) Check optional properties are consistent with input type
     */
    // Add name to properties object
    properties.name = name;
    if(!Object.values(properties).every(val => (typeof val === 'string' && val.length !== 0) || typeof val === 'number' || isFinite(val) || typeof val === 'object')){
        throw new TypeError('Invalid Value for "Required" property!\nProperties must be entered as strings and CANNOT be empty!');
    }
    // Check that properties contains required attributes
    /**
     * @const {Array} required - Required attributes for input type
     */
    const required = inputTypes.find(obj => obj.inputType === type).required;
    if(!required.every(prop => properties.hasOwnProperty(prop))){
        throw new Error(`Input type "${type}" is missing a required attribute!\nType "${type}" must contain the following:\n${JSON.stringify(required, null, 2)}`);
    }
    /**
     * Create Form Element and return
     */
    return createFormElement(
        'input',
        {type, ...properties},
        []
    );
}
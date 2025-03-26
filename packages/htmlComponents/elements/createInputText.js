/**
 * @file elements/createInputText.js
 * 
 */

import { regexPatterns } from "../constants/constants.js";
import { createInputElement } from "./createInputElement.js";

/**
 * @function createInputText
 * @param {String} name - Name attriute for form input element
 * @param {String} text - Display text [placeholder or label] for input text element
 * @param {Object} sizeProps - Size properties to add to element
 * @param {Number} [sizeProps.maxlength] Maximum number of characters allowed; default == 20
 * @param {Number} [sizeProps.minlength] Minimum number of characters needed; default == 2
 * @param {Number} [sizeProps.size] - Visible width (in characters) of input field; default == 20
 * @param {Object} rangeProps - Range and value properties
 * @param {String | Number} [rangeProps.max] - Maxmimum accepted value; e.g. 1999-12-31, 10
 * @param {String | Number} [rangeProps.min] - Minimum accepted value; e.g. 1999-12-31, 10
 * @param {Number} [rangeProps.min] - Numerical granularity value must adhere to; e.g. 4 for minutes
 * @param {String} pattern - Category of regex pattern; Values:'text' (default), 'url', 'filePath', 'zipCode', 'alphaNumeric', 'phone', 'email', 'date', 'time', 'ip', 'hexColor', 'creditCard', 'socialSecurity', 'float', 'int', 'base64'
 * @param {Boolean} required - Form element is required by form; Values: 'true' (default) yes, 'false' no
 * @param {Object} properties - Other properties / attributes to add to element
 * @returns {HTMLElement}
 */
export function createInputText(name='', text='', sizeProps={}, rangeProps={}, pattern='text', styles={}, required=true, properties={}){
    /**
     * Generate input element
     */
    return createInputElement(
        'text',
        name,
        {
            ...sizeProps,
            ...rangeProps,
            required,
            placeholder: text ? text : '',
            pattern,
            styles,
            properties
        }
    );
}
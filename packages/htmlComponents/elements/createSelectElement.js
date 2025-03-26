import { createFormElement } from "./createFormElement.js";

/**
 * @function createSelectElement
 * @param {Object} config - Configuration for element
 * @param {String} config.name - Name for Select element
 * @param {import("./createElement.js").HTMLProperties} config.props - Properties for Select Element
 * @param {Object[]} options - Array of option element data
 * @param {String | Number} options.value - Value of option element
 * @param {String} options.text - Text for option element
 * @param {import("./createElement.js").HTMLProperties} options.props - Properties object for option element
 * @param {Object} properties - Properties for select element
 * @returns {HTMLElement} - returns select element with option children
 */
export function createSelectElement(config={}, options=[]){
    /**
     * Return HTML Form Element
     */
    return createFormElement(
        'select',
        {
            name: config.name,
            ...config.props
        },
        options.map(obj => createFormElement('option', {...obj.props, value: obj.value, textContent: obj.text}))
    )
}
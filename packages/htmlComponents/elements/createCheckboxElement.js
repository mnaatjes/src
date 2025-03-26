import { createElement } from "./createElement.js";
import { createInputElement } from "./createInputElement.js";
import { createFormElement } from "./createFormElement.js";
/**
 * @function createCheckbox
 * @param {Object} config - Configuration for element
 * @param {String} config.name - Name for Select element
 * @param {import("./createElement.js").HTMLProperties} config.props - Properties for Select Element
 * @param {String} label - string for label text value
 * @returns {HTMLElement} - div containing checkbox element and label
 */
export function createCheckbox(name, value, label='', config={}){
    /**
     * Create container element
     */
    const container = createElement('div', 
        {
            styles: !config.styles ? {
                paddingTop: 12,
                paddingBottom: 12,
            } : config.styles
        },
        [
            createInputElement('checkbox', name, {value, ...config.props}),
            createFormElement('label', {textContent: label, styles: {marginLeft: 12, color: '#5c5c5c'}})
        ]
    );
    return container;
}
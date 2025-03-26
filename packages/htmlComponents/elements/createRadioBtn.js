import { createElement } from "./createElement.js";
import { createInputElement } from "./createInputElement.js";
import { createFormElement } from "./createFormElement.js";

/**
 * @function createRadioBtn
 * @param {Object} config - Configuration for element
 * @param {String} config.name - Name for Select element
 * @param {import("./createElement.js").HTMLProperties} config.props - Properties for Select Element
 * @param {String} label - string for label text value
 */
export function createRadioBtn(name, value, label='', config={}){
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
            createInputElement('radio', name, {value, ...config.props}),
            createFormElement('label', {textContent: label})
        ]
    );
    return container;
}
/**
 * @function createRadioList - creates a radio button list under one input name for selection
 * @param {String} name - name of field
 * @param {Object} config - Configuration for element
 * @param {String} config.name - Name for Select element
 * @param {import("./createElement.js").HTMLProperties} config.props - Properties for Select Element
 * @param {Array} buttons - radio buttons
 * @returns {HTMLElement} - list of input[type=radio] buttons under one input.name
 */
export function createRadioList(name='', title='', buttons=[], config={}){
    /**
     * Styles for each radio container
     */
    const styles = {
        flex: 1,
        paddingTop: 12,
        paddingBottom: 12
    };
    /**
     * Create main container
     */
    const container = createElement('div', {}, [
            createElement('h4', {textContent: title}),
            createElement('div', {
                styles: {
                    display: 'flex',
                    flexDirection: 'row',
                    borderBottom: '1px solid #ced4da',
                    marginBottom: 24,
                    color: '#5c5c5c'
                }},
                buttons.map((obj) => {
                    /**
                     * Modify radio button style config
                     */
                    obj.config = !obj.config ? {
                        ...styles
                    } : obj.config;
                    obj.config.styles = !obj.config.styles ? styles : obj.config.styles;
                    /**
                     * Return created Radio Button as child element
                     */
                    return createRadioBtn(name, obj.value, obj.label, obj.config);
                })
            )]
        );
    /**
     * Return element
     */
    return container;
}
import { createFormElement } from "./createFormElement.js";

/**
 * @function createLabelElement
 * 
 * @param {String} eleFor - form element that Label is for
 * @param {String} textContent - Display text
 * @param {import("./createElement").HTMLProperties} props
 * @returns {HTMLElement} label element
 */
export function createLabelElement(eleFor='', textContent='', props={}){
    /**
     * Create element and return
     */
    return createFormElement('label', {
        ...props,
        for: eleFor,
        textContent
    })
}
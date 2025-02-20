/**
 * @file ui-components/core/shared/utils.js
 */
import { fileExtensions } from "./constants.js";

/**
 * @function applyStyles
 * 
 * @param {Object} styles
 * @param {HTMLElement} ele
 * @returns {HTMLElement} with styles applied
 */
function applyStyles(styles, ele){
    /**
     * validate parameter
     */
    if(!styles || typeof styles !== 'object' || Object.keys(styles).length === 0){
        return;
    }
    /**
     * loop prop: val and apply
     */
    for(let prop in styles){
        /**
         * define style value
         */
        let val = styles[prop];
        /**
         * format all props to camelCase
         */
        if(prop.includes('-')){
            prop = prop.replace(/-([a-z])/g, g => g[1].toUpperCase());
        }
        /**
         * test prop for numerical values
         * add "px" if missing
         */
        if (typeof val === 'number' && /^(width|height|top|left|right|bottom|font-size|padding|margin|border-width)$/i.test(prop)) {
            val = val + 'px';
        }
        /**
         * apply styles
         */
        this.style[prop] = val;
    }
}
/**
 * @function registerComponent
 * @description Registers new Component Class as HTML Element
 *              1) Defines custom element
 *              2) Creates new Component Class instance
 *              3) Establishes getter for observedAttributes from Component Class
 *              4) Establishes method for attribute callback
 *              5) Sets Properties from Component Class instance
 * 
 * @param {String} componentName
 * @param {Object} componentClass
 * @returns
 */
export function registerComponent(componentName, componentClass){
    /**
     * define custom element
     */
    customElements.define(componentName, class extends HTMLElement{
        constructor(){
            super();
            const ele = new MyTestComponent(this);
        }
    });
}
/**
 * @function strIsHTML
 * @param {String} str
 * @returns {Boolean} true if string resolves into HTML doc
 */
export function strIsHTML(str){
    /**
     * validate string
     */
    if (typeof str !== 'string') {
        return false;
    }
    /**
     * perform Regex test
     */
    const pattern = /<(\w+)([^>]*>.*?<\/\1>|[^>]*\/>)/i;
    if(pattern.test(str)){
        try {
            const doc = new DOMParser().parseFromString(str, 'text/html');
            return doc.body.children.length > 0;
        } catch (e) {
            return false;
        }
    }
}
/**
 * @function strIsFilePath
 * @param {String} str
 * @returns {Boolean}
 */
export function strIsFilePath(str=''){
    /**
     * validate string
     */
    if (typeof str !== 'string') {
        return false;
    }
    /**
     * search for common file path string elements
     */
    if (str.includes('/') || str.includes('\\')) {
        return true;
    }
    /**
     * check against common Windows drive letters
     */
    if (/^[a-zA-Z]:\\/.test(str) || /^[a-zA-Z]:\//.test(str)) {
        return true;
    }
    /**
     * check aainst file extensions
     */
    if(fileExtensions.some(ext => str.toLowerCase().endsWith(ext))){
        return true;
    }
    /**
     * check against relative file paths
     */
    if (str.startsWith("./") || str.startsWith("../")) {
        return true;
    }
    /**
     * failed checks
     */
    return false;
}
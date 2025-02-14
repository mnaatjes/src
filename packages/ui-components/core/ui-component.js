/*----------------------------------------------------------*/
/**
 * @file src/packages/ui-components/core/ui-component.js
 * @description Core Component Class
 *              1) Provides scaffolding for future custom components
 * 
 * @namespace UIComponent
 */
/*----------------------------------------------------------*/
export class UIComponent {
    constructor(element){
        /**
         * Custom Component HTML Element
         * @type {HTMLElement}
         */
        this.element = element();
        /**
         * 
         * @type {Object}
         */
        this.props = {};
        /**
         * 
         * @type {Object}
         */
        this.eventListeners = {};
        /**
         * Initial rendering of custom element
         * @description Calls 'render' method
         */
        this.render();
    }
    /*----------------------------------------------------------*/
    /**
     * @returns {}
     */
    /*----------------------------------------------------------*/
    createElement(tag){
        return document.createElement(tag);
    }
    /*----------------------------------------------------------*/
    /**
     * Render custom component
     * @returns {null}
     */
    /*----------------------------------------------------------*/
    render(){}
}
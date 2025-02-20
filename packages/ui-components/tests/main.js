/**
 * @file src/packages/ui-components/test/main.js
 * Test file for UI-Component Class
 */
import { strIsFilePath, strIsHTML } from "../core/shared/utils.js";

/**
 * @const {HTMLElement} root
 */
const root = document.getElementById('root');
/**
 * Schema for "generateComponent" function
 * @param {String} componentName    Custom Component tagName
 * @param {String | HTMLTemplateElement} templateStr      @todo Can either be a string or a fetch() response
 * @param {Array} props             Data Attributes to be observed
 */
/**
 * debugging
 */
customElements.define('ele-test', class extends HTMLElement {
    /*----------------------------------------------------------*/
    /**
     * @constructor
     */
    /*----------------------------------------------------------*/
    constructor(){
        super();
        /**
         * Declare shadow property and attach shadow to element
         */
        this.attachShadow({mode: 'open'});
        /**
         * Declare and build template
         * @private
         */
        this._template = this.#setTemplate(`
            <link rel="stylesheet" href="../../../shared-library/styles/css/main.css">
            <div checked="false">
                <small id="banana">
                    I Am A Banana!
                </small>
                <br>
                <button id="clickMe">
                    Click Me!
                </button>
                <h3>I may be deleted</h3>
                <input type="checkbox" name="check" value="none">
            </div>
        `);
        /**
         * Append template clone to shadow root
         */
        this.render(this._template.content.cloneNode(true));
        const heading = document.createElement('h1');
        heading.innerHTML = 'I am a heading';
        this.render(heading);
    }
    /*----------------------------------------------------------*/
    /**
     * Renders element
     * @param {String | HTMLElement} content
     */
    /*----------------------------------------------------------*/
    render(content){
        //console.log(content instanceof DocumentFragment);
        /**
         * initial render condition
         */
        if(content instanceof DocumentFragment){
            this.shadowRoot.appendChild(content);
        } else {
            this.shadowRoot.appendChild(content);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * Gets the observedAttributes
     * @returns {String}
     */
    /*----------------------------------------------------------*/
    static get observedAttributes(){
        /**
         * array of all attributes to check for
         */
        return ['checked'];
    }
    /*----------------------------------------------------------*/
    /**
     * @method attributeChangedCallback
     */
    /*----------------------------------------------------------*/
    attributeChangedCallback(name, oldVal, newVal){
        /**
         * debugging
         */
        console.log(name, oldVal, newVal);
    }
    /*----------------------------------------------------------*/
    /**
     * Applies Template source to an HTMLTemplateElement and returns the element
     * @private
     * @param {String | HTMLElement | String} source HTML string, an HTML Element, or a file path 
     * @method setTemplate
     * @returns {DocumentFragment | Error}
     */
    /*----------------------------------------------------------*/
    #setTemplate(source){
        /**
         * Declares the HTML Template Element to contain template source
         * @type {HTMLTemplateElement} template
         */
        const template = document.createElement('template');
        /**
         * check for filepath
         */
        if(strIsFilePath(source)){
            /**
             * @todo Fetch file path
             */
        }
        /**
         * check for html string
         */
        if(strIsHTML(source)){
            template.innerHTML = source;
            return template;
        }
        /**
         * Check if HTML Element
         */
    }
    /*----------------------------------------------------------*/
    /**
     * @private
     * @method generateChildElements
     */
    /*----------------------------------------------------------*/
    #generateChildElements(){
        const children = [];
        /**
         * check for shadow children
         */
        if(this.shadowRoot){
            children = this.shadowRoot.children;
        } else {
            children = this.children;
        }
        console.log(children);
    }
    /*----------------------------------------------------------*/
    /**
     * @description Every time a new element is added to the DOM this method is called
     */
    /*----------------------------------------------------------*/
    connectedCallback(){
        console.log('DOM Element Connected!');
    }
    
});

root.appendChild(document.createElement('ele-test'));
const test = document.querySelector('ele-test');
test.setAttribute('checked', false);
//console.log(test.children);
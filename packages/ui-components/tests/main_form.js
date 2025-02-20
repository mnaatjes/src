/**
 * Testing Form Component
 */
import { createElement } from '../components/createElement.js';
import { createFormComponent } from '../components/createFormComponent.js';
import { createFormElement } from '../components/createFormElement.js';
/**
 * @const root
 */
const root = document.getElementById('root');
/**
 * define element
 */
let form = createFormComponent(
    {method: 'POST', action: './something.php', name: 'TestForm'}
);

const select = createFormElement(
    'select',
    {name: 'list'},
    [
        createElement('option', {value: 'one'}, [], {textContent: 'Bananaas', id: 'item--01'}),
        createElement('option', {value: 'two'}, [], {textContent: 'Spoon', id: 'item--02'}),
    ]

);
/**
 * @function parseTemplate
 * @param {String | HTMLElement} templateSource
 * @returns {{template: String, props: Object}}
 */
function parseTemplate(templateSource){
    /**
     * Validate templateSource
     */
    if(typeof templateSource !== 'string'){
        throw new TypeError('Template Source must be a string!');
    }
    /**
     * Parse template and extract slot elements
     */
    const propNames     = {};
    const htmlString    = templateSource.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, propName) => {
      propNames[propName] = null;
      return `<slot name="${propName}"></slot>`;
    });
    return {
      html: htmlString,
      props: propNames
    };
}
/**
 * @function createComponent
 * @param {String} elementName HTML Element name **must contain hyphen
 * @param {String | HTMLElement} templateSource Custom Component HTML structure. Could be a string, a file path, or a collection of DOM Elements
 * @param {String | HTMLStyleElement} styles Styles to apply to Custom Component. Could be an innerHTML string, a file path, or a <script> DOM Element
 * @param {String} inference HTMLElement inference for the CustomComponent to Extend. Default == HTMLElement
 * 
 * @description Define Element and Append to DOM
 *              1) Define custom element from CustomComponent Class (which extends inference (e.g. HTMLElement)
 *              2) Declare custom component and create element
 *              3) Append custom component to root in DOM
 * @returns {CustomComponent}
 */
function createComponent(elementName, templateSource, props={}, styles='', inference=HTMLElement){
    /**
     * Parse Template
     */
    const templateObject = parseTemplate(templateSource);
    templateSource       = templateObject.html;
    props                = templateObject.props;
    /**
     * Define Custom Element
     * @tag elementName
     */
    customElements.define(elementName, class extends inference {
        /**
         * Define Static Properties
         */
        static _attributes = Object.keys(props);
        /**
         * Generate new class instance
         * @class
         * @extends {HTMLElement, HTMLTemplateElement}
         */ 
        constructor(){
            super();
            /**
             * @property {Object} _props
             */
            this._props = props;
        }
        /*----------------------------------------------------------*/
        /**
         * Called when Custom Component is inserted into the DOM
         * Setup tasks:
         *      1) Attach Shadow
         *      2) Find and declare Template source
         *      3) Declare Template element
         *      4) Clone Template element content and append to shadowRoot
         * 
         * @property {ShadowRoot}
         * @property {templateSource}
         * @property {HTMLTemplateElement}
         * 
         * @returns {void}
         */
        /*----------------------------------------------------------*/
        connectedCallback(){
            console.log('I am connected!');
            /**
             * Attaches shadow to the custom html component
             * @property {ShadowRoot}
             */
            this.attachShadow({mode: 'open'});
            /**
             * Declare and build Template for custom component
             *      1) Validate Template Source
             *      2) Create Template element node
             *      3) Append Template source to innerHTML
             *      4) Render Template
             * @type {HTMLTemplateElement}
             * @private
             */
            if(!templateSource.trim()){
                throw new Error('Template Source NOT Defined! Cannot create new HTML Custom Component');
            }
            this._template           = document.createElement('template');
            this._template.innerHTML = templateSource;
            this.shadowRoot.appendChild(this._template.content.cloneNode(true));
            /**
             * Define Props
             */
            this.#defineProps();
        }
        /*----------------------------------------------------------*/
        /**
         * Find Attribute Element
         * @private
         * @param {String} attributeName
         * @returns {HTMLElement}
         */
        /*----------------------------------------------------------*/
        #findAttributeElement(attributeName){
            const query = this.shadowRoot.querySelectorAll(`*[${attributeName}]`);
            if(Array.from(query).length > 1){
                console.warn(`QuerySelectAll returned more than one element with ${attributeName}`);
            }
            return query[0];
        }
        /*----------------------------------------------------------*/
        /**
         * Establish Properties
         * 1) Validates props
         * 2) Establishes getters and setters from props
         * @private
         * @property {Object} this._props
         * @returns {Object} _props
         */
        /*----------------------------------------------------------*/
        #defineProps(){
            /**
             * Validate props
             */
            if(typeof this._props !== 'object'){
                throw new TypeError('Props supplied must be an object!');
            }
            /**
             * Generate getters and setters
             */
            for(const key in this._props){
                Object.defineProperty(this, key, {
                    get(){return this._props[key]},
                    set(value){
                        /**
                         * validate value sync
                         */
                        this._props[key] = value;
                        if(this.getAttribute(key) !== value){
                            this.setAttribute(key, value);
                        } else {
                            this.render();
                        }
                    }
                });
            }
            this.count = 23;
        }
        /*----------------------------------------------------------*/
        /**
         * Gets the observedAttributes
         * @returns {String}
         */
        /*----------------------------------------------------------*/
        static get observedAttributes(){
            /**
             * Monitor array of prop keys from props object
             */
            return this._attributes;
        }
        /*----------------------------------------------------------*/
        /**
         * @method attributeChangedCallback
         */
        /*----------------------------------------------------------*/
        attributeChangedCallback(name, oldVal, newVal){
            if(oldVal !== newVal){
                console.log(name, oldVal, newVal);
                this._props[name] = newVal;
                this.render();
            }
        }
        /*----------------------------------------------------------*/
        /**
         * Renders supplied content
         */
        /*----------------------------------------------------------*/
        render(){
            const slots = Array.from(this.shadowRoot.querySelectorAll('slot'));
            slots.forEach(slot => {
                let slotName = slot.name;
                /**
                 * validate slotname and property name
                 */
                if(slotName && this.hasOwnProperty(slotName)){
                    slot.innerHTML = this[slotName];
                }
            });
        }
    });
    /**
     * Create element and return element node
     */
    return document.createElement(elementName);
}
/**
 * implementation
 */
const testElement = createComponent(
    'my-banana',
    `<div count="0" title="This is a Title">
        <h4>{title}</h4>
        <b>Count: {count}</b>
        <img src="./" alt="TestImage">
    </div>`
);
root.appendChild(testElement);
/**
 * timer test
 */
console.log(testElement);

let count = 0;
const timer = setInterval(() => {
    testElement.count = count++;
    if(count >= 5){
        clearInterval(timer);
        console.log('Timer Stopped');
    }
}, 500);
testElement.title = 'Harry Potter and the Philosopher\'s Hemroid'
/**
 * @callback FormCallback
 * @param {Object} data - JSON data response from Fetch
 */
/*----------------------------------------------------------*/
/**
 * @function validateConfig
 * @param {Object} formConfig
 * @returns {Object | Error}
 */
import { createElement } from "./elements/createElement.js";

/*----------------------------------------------------------*/
function validateConfig(formConfig){
    /**
     * Check formConfig is object
     * Check that attributes contains Action
     */
    if(typeof formConfig !== 'object'){
        throw new TypeError('Form Attributes MUST be an Object!');
    }
    if(!formConfig.hasOwnProperty('action')){
        throw new Error('Form Attributes Object missing "Action" property!');
    }
    /**
     * Form Attributes Schema
     * Merge Objects
     */
    const defaultAttributes = {
        method: 'POST', 
        target: '_self', 
        enctype: "application/x-www-form-urlencoded",
        mode: 'submit',
        novalidate: true
    }
    /**
     * @const {Object} formEnctypes
     */
    const formEnctypes = [
        {
            enctype: "application/x-www-form-urlencoded",
            formType: 'default'
        },
        {
            enctype: "text/plain",
            formType: 'text'
        },
        {
            enctype: "application/json",
            formType: 'json'
        },
        {
            enctype: "application/xml",
            formType: "xml"
        },
        {
            enctype: "multipart/form-data",
            formType: 'file'
        }
    ];
    /**
     * Validate Enctype
     */
    if(formConfig.enctype !== undefined && typeof formConfig.enctype === 'string'){
        /**
         * Check valid strings
         * 1) Check if enctype entered
         * 2) Check if formType entered
         */
        if(formConfig.enctype.includes('/')){
            /**
             * String contains slash, check against valid enctypes
             */
            if(!formEnctypes.map(obj => obj.enctype).find(val => val === formConfig.enctype)){
                throw new Error(`Invalid Enctype!\n"${formConfig.enctype}" is not valid\nPlease select from the following:\n${JSON.stringify(formEnctypes, null, 2)}`);
            }
        } else if(formConfig.enctype.trim() !== '') {
            /**
             * Search for enctype from formType string
             */
            const search = formEnctypes.find(obj => {
                return obj.formType === formConfig.enctype.trim();
            });
            if(search !== undefined && typeof search === 'object'){
                /**
                 * Set Enctype from formType
                 */
                formConfig.enctype = search.enctype;
            } else {
                throw new Error(`Invalid Enctype!\n"${formConfig.enctype}" is not valid\nPlease select from the following:\n${JSON.stringify(formEnctypes, null, 2)}`);
            }
        }
        /**
         * Check that enctype for JSON and mode match
         * enctype JSON can ONLY be used with fetch API
         */
        if(formConfig.enctype.includes('json')){
            /**
             * For mode: undefined - Set as fetch and warn user
             */
            if(formConfig.mode === undefined){
                formConfig.mode = 'fetch';
                console.warn(`Form Configuration "mode" not defined.\nMode set to ${formConfig.mode} for enctype "${formConfig.enctype}"`);
            } else if(formConfig.mode === 'submit'){
                /**
                 * Enctype application/json can only be used with fetch API
                 * Form will be set to default values for 'mode' and 'enctype'
                 */
                formConfig.mode     = 'submit';
                formConfig.enctype  = formEnctypes.find((obj) => obj.formType === 'default').enctype;
                console.warn(`Cannot use mode: "submit" with enctype: "application/json"\nConfig reset to:\n${JSON.stringify({mode: formConfig.mode, enctype: formConfig.enctype}, null, 2)}`);

            } else if(typeof formConfig.mode === 'string' && !['fetch', 'submit'].includes(formConfig.mode.trim())){
                throw new Error(`Invalid Form Configuration "mode"!\nMode must be "submit" or "fetch"!`);
            }
        }
    }
    /**
     * Consolidate and return form configuration
     */
    return {...defaultAttributes, ...formConfig};
}
/*----------------------------------------------------------*/
/**
 * @function validateTagName
 * @param {String} tagName 
 * @returns {String} String of element tag
 * @throws {TypeError} - Must be a string and contain a hyphen
 */
/*----------------------------------------------------------*/
function validateTagName(tagName){
    if(typeof tagName !== 'string'){
        throw new TypeError(`TagName type of "${typeof tagName}" is invalid. Type must be string`);
    }
    if(!tagName.includes('-')){
        throw new TypeError(`Invalid tagName! "${tagName}" must include a hyphen (-)!`);
    }
    return tagName;
}
/*----------------------------------------------------------*/
/**
 * @function validateElements
 * @param {formElements}
 * @returns {Object | Error}
 */
/*----------------------------------------------------------*/
function validateElements(formElements){
    /**
     * Validate Form Elements
     */
    if(Array.isArray(formElements)){
        if(formElements.length === 0){
            throw new Error('No Form Elements provided!');
        } else if(!formElements.every(ele => ele instanceof HTMLElement)){
            throw new TypeError('One or more Form Elements is NOT an HTML Element!');
        } else if(formElements.every(ele => ele instanceof HTMLElement)){
            /**
             * Return array of HTML Elements
             */
            return formElements;
        }
    } else {
        throw new TypeError('Form Elements must be provided as an array of HTML Elements');
    }
}
/*----------------------------------------------------------*/
/**
 * Create Custom Form
 *      Generates an HTML Form Element (within ShadowDOM) composed of supplied HTMLElements. 
 *      Handles Client-Side Validation
 *      Allows for direct submit action or AJAX request
 * @function createCustomForm
 * @param {Object} formConfig - Attributes to append to form element and configuration of form handling
 * @param {String} formConfig.tagName - TagName to define the component. Must include a hyphen!
 * @param {String} formConfig.action - filepath
 * @param {String} formConfig.method - Default === POST
 * @param {String} [formConfig.target] - Default === _self
 * @param {String} [formConfig.enctype] - Default === x-www-form-urlencoded; Values can be enctype or fileType ['default', 'json', 'xml', 'text', 'file']
 * @param {String} [formConfig.mode] - Values: 'Submit' or 'Fetch' dictates the Form Action after validation; Default === 'submit'
 * @param {Boolean} [formConfig.novalidate] - Default === true
 * @param {String | Object} [formConfig.styles] - String filepath to link a Stylesheet or an Object of style properties to append to Form element
 * @param {Array} formElements - Array of HTMLElements for the Form
 * @param {FormCallback} [callback] - Callback function executed on mode == 'fetch', 'submit'; Default === undefined
 * @returns {HTMLElement} Custom form element
 * 
 * @version 2.0.0
 */
/*----------------------------------------------------------*/
export function createCustomForm(formConfig={}, formElements=[], callback=undefined){
    /**
     * Validate Parameters
     */
    const config    = validateConfig(formConfig);
    const elements  = validateElements(formElements);
    /**
     * Define custom element
     */
    customElements.define(validateTagName(formConfig.tagName), class extends HTMLElement {
        /*----------------------------------------------------------*/
        /**
         * Build Custom Form Component
         * @constructor
         */
        /*----------------------------------------------------------*/
        constructor(){
            super();
            /**
             * @property {Object} shadowRoot
             */
            this.attachShadow({mode: 'open'});
            /**
             * @property {HTMLTemplateElement} _template
             */
            this._template = document.createElement('template');
            this.shadowRoot.appendChild(this._template.content.cloneNode(true));
            /**
             * Append Form to Shadow Root
             */
            this.#buildForm({
                    action: config.action,
                    method: config.method,
                    enctype: config.enctype,
                    target: config.target,
                    novalidate: undefined
                }, 
                config.styles,
                elements
            );
            /**
             * Enable Form Validation
             */
            this.#validateForm(callback);
        }
        /*----------------------------------------------------------*/
        /**
         * @method buildForm
         * @private
         * @property {Object} properties
         * @param {Object} styles
         * @param {Array} elementsList
         */
        /*----------------------------------------------------------*/
        #buildForm(properties, styles, elementsList){
            /**
             * Validate and add Styles | ClassList
             */
            if(typeof styles === 'object' && Object.keys(styles).length !== 0){
                /**
                 * Append Styles
                 */
                properties = {
                    ...properties,
                    styles
                }
            } else if (typeof styles === 'string'){
                /**
                 * Create a link to a stylesheet
                 * Append link to shadowRoot
                 */
                const link  = document.createElement('link');
                link.rel    = 'stylesheet';
                link.type   = 'text/css';
                link.href   = styles;
                this.shadowRoot.appendChild(link);
            }
            /**
             * Create Form Element
             * Check if styles is a string (filepath) or object of style properties
             */
            const form = createElement(
                'form',
                properties,
                elementsList
            );
            /**
             * Check that form Contains Submit Button:
             * If not, append
             */
            if(!Array.from(form.querySelectorAll('*')).some(
                ele => {
                    if(ele.tagName === 'BUTTON' && ele.type === 'submit'){
                        return true;
                    }
                    if(ele.tagName === 'INPUT' && ele.type === 'submit'){
                        return true;
                    }
                    return false;
                }
            )){
                /**
                 * Generate Submit Button
                 */
                const submit    = document.createElement('input');
                submit.type     = 'submit';
                submit.value    = 'Submit';
                form.appendChild(submit);
            }
            /**
             * Append Form to ShadowRoot
             */
            this.shadowRoot.appendChild(form);
        }
        /*----------------------------------------------------------*/
        /**
         * @method validateForm
         * @private
         * @listens shadowRoot[form]#submit
         * @param {FormCallback} callback
         * 
         * @property {Array} missing - 
         * 
         * @returns {Void}
         * 
         * TODO: Restructure validation to work with ValidityState (ele.validity) object
         */
        /*----------------------------------------------------------*/
        #validateForm(callback){
            this.shadowRoot.querySelector('form').addEventListener('submit', (e) => {
                /**
                 * Prevent Default Behavior
                 */
                e.preventDefault();
                /**
                 * @property {HTMLFormElement} form
                 */
                const form = e.target;
                /**
                 * Clear previous Alert Messages
                 */
                form.querySelectorAll('.alert').forEach(alert => {alert.remove()});
                /**
                 * Check for required attribute elements with missing values
                 * @const {Array} missing
                 */
                const missing = Array.from(form.elements).filter(
                    ele => {
                        /**
                         * TODO: figure out how to make non-input type elements have a required property
                        if(ele.hasAttribute('required') && ele.tagName == 'DIV'){
                            console.log(ele);
                        }
                        */
                        /**
                         * Excluded tagNames
                         */
                        if(['button', 'fieldset'].includes(ele.tagName.toLowerCase())){
                            return false;
                        }
                        /**
                         * Exclude Submit types
                         */
                        if(ele.tagName === 'INPUT' && ['button', 'submit', 'reset', 'image'].includes(ele.type)){
                            return false;
                        }
                        /**
                         * Include attribute 'Required
                         */
                        if(ele.hasAttribute('required')){
                            /**
                             * Check for empty values
                             */
                            switch(ele.tagName.toLowerCase()){
                                /**
                                 * Case: input - Checks against input tagName and type
                                 * 
                                 * @case
                                 * @returns {Boolean} - True if element empty or missing a value
                                 */
                                case 'input':
                                    /**
                                     * @const {Object} inputTypes
                                     */
                                    const inputTypes = {
                                        text: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
                                        dateTime: ['date', 'datetime-local', 'month', 'time', 'week'],
                                        selection: ['checkbox', 'radio', 'range', 'color', 'file']
                                    };
                                    /**
                                     * Loop by type
                                     */
                                    for(const category in inputTypes){
                                        const types = inputTypes[category];
                                        /**
                                         * Text inputs
                                         */
                                        if(category === 'text' && types.includes(ele.type)){
                                            return ele.value.trim() === '' || ele.value.trim().length === 0;
                                        }
                                        /**
                                         * Selection inputs
                                         */
                                        if(category === 'selection' && types.includes(ele.type)){
                                            /**
                                             * Checkbox | Radio
                                             */
                                            if(ele.type === 'checkbox' || ele.type === 'radio'){
                                                return !ele.checked;
                                            }
                                        }
                                    }
                                /**
                                 * Case: Textarea - Checks for empty value
                                 * @case
                                 * @returns {Boolean}
                                 */
                                case 'textarea':
                                    return ele.value.trim() === '';
                                /**
                                 * Case: Select - Checks for empty value
                                 * @case
                                 * @returns {Boolean}
                                 */
                                case 'select':
                                    return ele.value === '';
                                /**
                                 * Case: div - for div containers 
                                 */
                                case 'div': 
                                    return ele.value === '';
                                /**
                                 * Default:
                                 * @case
                                 * @returns {Boolean} false
                                 */
                                default:
                                    return false;
                            }
                        }
                    }
                );
                /**
                 * Check if any required elements missing and insert alert messages
                 */
                if(missing.length > 0){
                    missing.forEach(ele => {
                        /**
                         * Create alert element
                         */
                        const alert         = document.createElement('small');
                        alert.textContent   = '*Required Field!';
                        alert.classList.add('alert');
                        ele.insertAdjacentElement('afterend', alert);
                    });
                } else {
                    /**
                     * Run Action Script
                     */
                    this.#performAction(form, callback);
                }
            })
        }
        /*----------------------------------------------------------*/
        /**
         * @method performAction
         * @private
         * @param {HTMLElement} form - Form Element
         * @param {FormCallback} [callback] - Callback used for fetch
         * @property {Object} config - Form Properties passed to fetch request
         * @returns {Void}
         */
        /*----------------------------------------------------------*/
        #performAction(form, callback=undefined){
            /**
             * Validate mode
             */
            if(config.mode !== 'submit' && config.mode !== 'fetch'){
                throw new Error(`Value for "mode" must be "submit" or "fetch"! "${config.mode}" is invalid`);
            }
            /**
             * Grab Form Data
             * 1) Check enctype to format FormData
             * 2) Format FormData if necessary
             */
            const formData = new FormData(form);
            const data     = {};
            // format json data
            formData.forEach((val, key) => {
                data[key] = val;
            });
            /**
             * Determine mode of action
             */
            if(config.mode === 'submit'){
                /**
                 * If callback present: 
                 *  use callback
                 *  pass form data
                 * Otherwise submit form
                 */
                if(callback && typeof callback === 'function'){
                    callback(data, form);
                } else {
                    form.submit();
                }
            } else if (config.mode === 'fetch'){
                /**
                 * Make AJAX Request for data and perform callback
                 */
                //console.info('Client Side Validation Successful!');
                /**
                 * Fetch
                 */
                fetch(config.action, {
                    method: config.method,
                    headers: {
                        'Content-Type': config.enctype
                    },
                    body: config.enctype.includes('json') ? JSON.stringify(data) : formData
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error(`\n HTTP Error! Status: ${response.status} \n ${response.statusText}`);
                    } return response.json();
                })
                .then(data => {
                    /**
                     * Execute Callback Function
                     */
                    callback(data);
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        }
    });
    /*----------------------------------------------------------*/

    /**
     * Declare and Return Component
     */
    return document.createElement(config.tagName);
}

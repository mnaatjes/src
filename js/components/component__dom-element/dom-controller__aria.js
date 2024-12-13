/*----------------------------------------------------------*/
/**
 * @file src/js/components/component_dom-element/dom-controller__aria.js
 * @name AriaController
 * @type {Class}
 * @memberof Src.Components.DOMController
 * @property {}
 * @description
 */
/*----------------------------------------------------------*/
class AriaController {
    #defaultAttributes;
    constructor(node){
        /**
         * @name defaultAttributes
         * @type {Array}
         * @memberof AriaController
         * @private
         * @description
         */
        this.#defaultAttributes = this.#initDefault();
        /**
         * @name enabled
         * @type {Boolean}
         * @memberof AriaController
         * @public
         * @description
         */
        this.enabled = true;
        /**
         * initialize
         */
        this.#initAria(node);
        /**
         * debugging
         */
        //console.log(this.#defaultAttributes);
    }
    /*----------------------------------------------------------*/
    /**
     * @name initAria
     * @type {Method}
     * @memberof AriaController
     * @namespace initDefault
     * @private
     * @param {HTMLElement} node
     * @description
     */
    /*----------------------------------------------------------*/
    #initAria(node){
        /**
         * generate aria properties
         * create as instances of AriaAttribute
         */
        this.#generateProperties(node);
    }
    /*----------------------------------------------------------*/
    /**
     * @name initDefault
     * @type {Method}
     * @memberof AriaController
     * @namespace initDefault
     * @private
     * @description
     * @returns {Array}
     */
    /*----------------------------------------------------------*/
    #initDefault(){
        /**
         * @name formatAttribute
         * @type {Function}
         * @memberof initDefault
         * @param {String} attribute
         * @description
         * @returns {String}
         */
        function formatAttribute(attribute){
            /**
             * seperator character
             */
            let sep     = '-';
            /**
             * index of character after seperator
             */
            let index   = attribute.indexOf(sep) + 1;
            /**
             * slice attribute and return string after seperator
             */
            return attribute.slice(index, attribute.length);
        }
        /**
         * @name ariaLibrary
         * @type {Array}
         * @memberof initDefault
         */
        let ariaLibrary = [
            {
              attribute: 'aria-activedescendant',
              description: 'Identifies the currently active descendant element within a composite.',
              values: ['string'],
            },
            {
              attribute: 'aria-atomic',
              description: 'Indicates whether assistive technologies should announce changes within an element as a single unit or not.',
              values: [true, false],
            },
            {
              attribute: 'aria-autocomplete',
              description: 'Indicates whether input completion is "none", "inline", "list", or "both".',
              values: ['none', 'inline', 'list', 'both'],
            },
            {
              attribute: 'aria-busy',
              description: 'Indicates whether an element, and its descendants, are currently being updated.',
              values: [true, false, 'loading'],
            },
            {
              attribute: 'aria-checked',
              description: 'Indicates the current "checked" state of a checkable element.',
              values: [true, false, 'mixed'],
            },
            {
              attribute: 'aria-controls',
              description: 'Identifies the element(s) whose contents are controlled by the current element.',
              values: ['string'], 
            },
            {
              attribute: 'aria-current',
              description: 'Indicates the element that represents the current item within a container or set of related elements.',
              values: ['page', 'step', 'location', 'date', 'time', true, false],
            },
            {
              attribute: 'aria-describedby',
              description: 'Identifies the element(s) that provides a textual description for the element.',
              values: ['string'], 
            },
            {
              attribute: 'aria-details',
              description: 'Identifies the element that provides additional contextual information for the element.',
              values: ['string'], 
            },
            {
              attribute: 'aria-disabled',
              description: 'Indicates whether the element is disabled, i.e. not operable.',
              values: [true, false],
            },
            {
              attribute: 'aria-dropeffect',
              description: 'Indicates what actions are supported by the element for drag-and-drop operations.',
              values: ['copy', 'execute', 'link', 'move', 'none', 'popup'],
            },
            {
              attribute: 'aria-errormessage',
              description: 'Identifies the element that provides an error message for the element.',
              values: ['string'], 
            },
            {
              attribute: 'aria-expanded',
              description: 'Indicates whether the element, or another identified element, is expanded or collapsed.',
              values: [true, false],
            },
            {
              attribute: 'aria-flowto',
              description: 'Indicates the element that represents the destination of the navigational flow.',
              values: ['string'], 
            },
            {
              attribute: 'aria-haspopup',
              description: 'Indicates whether the element has popup children or related content.',
              values: [true, false, 'menu', 'listbox', 'tree', 'grid', 'dialog', 'alert', 'grid', 'menubar', 'toolbar', 'statusbar', 'window'],
            },
            {
              attribute: 'aria-hidden',
              description: 'Indicates whether the element and all of its descendants are hidden from the accessibility tree.',
              values: [true, false],
            },
            {
              attribute: 'aria-invalid',
              description: 'Indicates whether the element, and its descendants, are not valid.',
              values: [true, false, 'grammar', 'spelling'],
            },
            {
              attribute: 'aria-keyshortcuts',
              description: 'Indicates keyboard shortcuts that are relevant for activating or giving focus to the element.',
              values: ['string'], 
            },
            {
              attribute: 'aria-label',
              description: 'Defines a text label for the element.',
              values: ['string'], 
            },
            {
              attribute: 'aria-labelledby',
              description: 'Identifies the element(s) that labels the current element.',
              values: ['string'], 
            },
            {
              attribute: 'aria-live',
              description: 'Indicates that an element will be textually "live" updated and describes the types of changes that users would expect to hear.',
              values: ['off', 'polite', 'assertive'],
            },
            {
              attribute: 'aria-modal',
              description: 'Indicates whether an element, or the element that it labels, is modal when displayed.',
              values: [true, false],
            },
            {
              attribute: 'aria-multiline',
              description: 'Indicates whether a text control accepts multiple lines of input.',
              values: [true, false],
            },
            {
              attribute: 'aria-multiselectable',
              description: 'Indicates whether multiple elements within a container can be selected at the same time.',
              values: [true, false],
            },
            {
              attribute: 'aria-orientation',
              description: 'Indicates whether the element is horizontal, vertical, or has no orientation.',
              values: ['horizontal', 'vertical'],
            },
            {
              attribute: 'aria-owns',
              description: 'Identifies an element (or elements) that are descendants of the current element or are known to be associated with the current element.',
              values: ['string'], 
            },
            {
              attribute: 'aria-placeholder',
              description: 'Defines a short hint that describes the expected value of an input element.',
              values: ['string'], 
            },
            {
              attribute: 'aria-pressed',
              description: 'Indicates the current "pressed" state of a toggle button.',
              values: [true, false, 'mixed'],
            },
            {
              attribute: 'aria-readonly',
              description: 'Indicates that the element is not editable.',
              values: [true, false],
            },
            {
              attribute: 'aria-required',
              description: 'Indicates whether the element must be entered by the user before a form may be submitted.',
              values: [true, false],
            },
            {
              attribute: 'aria-selected',
              description: 'Indicates the current "selected" state of an element.',
              values: [true, false],
            },
            {
              attribute: 'aria-sort',
              description: 'Indicates the sorting order for a data table.',
              values: ['ascending', 'descending', 'none', 'other'],
            },
            {
              attribute: 'aria-valuemax',
              description: 'Defines the maximum allowed value for a range.',
              values: ['number'], 
            },
            {
              attribute: 'aria-valuemin',
              description: 'Defines the minimum allowed value for a range.',
              values: ['number'], 
            },
            {
              attribute: 'aria-valuenow',
              description: 'Defines the current value for a range.',
              values: ['number'], 
            },
            {
              attribute: 'aria-valuetext',
              description: 'Defines the text representation of the value for a range.',
              values: ['string'], 
            },
        ];
        /**
         * map ariaLibrary
         * add property methodName
         */
        return ariaLibrary.map(entry => {
            return {
                /**
                 * copy existing properties
                 */
                ...entry,
                /**
                 * add new property
                 */
                propertyName: formatAttribute(entry.attribute)
            };
        });
    }
    /*----------------------------------------------------------*/
    /**
     * @name generateProperties
     * @type {Method}
     * @memberof AriaController
     * @namespace generateProperties
     * @private
     * @param {HTMLElement} node
     * @property {Array} defaultAttributes
     * @description
     */
    /*----------------------------------------------------------*/
    #generateProperties(node){
        /**
         * loop default attribute array
         */
        this.#defaultAttributes.forEach(entry => {
            /**
             * create Class
             */
            AriaController.prototype[entry.propertyName] = new AriaAttribute(node, {
                attribute: entry.attribute,
                values: entry.values
            });
        });
    }
}

/*----------------------------------------------------------*/
/**
 * @file src/js/components/component_dom-element/dom-controller__aria.js
 * @name AriaAttribute
 * @type {Class}
 * @memberof Src.Components.DOMController
 * @property {}
 * @description
 */
/*----------------------------------------------------------*/
class AriaAttribute {
    #node;
    #attributeName;
    #validValues;
    #validTypes;
    constructor(node, entry){
        /**
         * @name enabled
         * @type {}
         * @memberof AriaAttribute
         * @public
         * @description
         */
        this.enabled = true;
        /**
         * @name node
         * @type {}
         * @memberof AriaAttribute
         * @private
         * @description
         */
        this.#node = node;
        /**
         * @name attributeName
         * @type {Object}
         * @memberof AriaAttribute
         * @private
         * @description
         */
        this.#attributeName = entry.attribute;
        /**
         * @name validValues
         * @type {Object}
         * @memberof AriaAttribute
         * @private
         * @description
         */
        this.#validValues = entry.values;
        /**
         * @name validTypes
         * @type {Object}
         * @memberof AriaAttribute
         * @private
         * @description
         */
        this.#validTypes = entry.values.reduce((acc, curr) => {
            if(!acc.includes(typeof curr)){
                /**
                 * ensure valid type not overridden
                 */
                if(!['string', 'number', 'boolean'].includes(curr)){
                    acc.push(typeof curr);
                } else {
                    acc.push(curr);
                }
            }
            return acc;
        }, []);
    }
    /*----------------------------------------------------------*/
    /**
     * @name value
     * @type {Undefined | Null | Boolean | Number | String}
     * @memberof AriaAttribute
     * @description
     */
    /*----------------------------------------------------------*/
    get value(){
        /**
         * check if has attribute
         */
        if(this.has){
            /**
             * attribute present
             * validate
             */
            let value = this.#node.getAttribute(this.#attributeName);
            if(this.#validateType(value)){
                /**
                 * is valid
                 * parse value and return
                 */
                switch(parseType(value)){
                    case 'number':
                        return parseFloat(value);
                    case 'boolean':
                        /**
                         * return matching boolean value
                         */
                        if(value === 'true'){
                            return true;
                        } else if (value === 'false'){
                            return false;
                        } else {
                            /**
                             * error parsing
                             */
                            console.error(`Could not properly parse ${this.#attributeName}`);
                            return undefined;
                        }
                    case 'string':
                        return value;
                    default:
                        return undefined;
                }
            } else {
                /**
                 * error validating
                 * return false
                 */
                return false;
            }
        } else {
            /**
             * attribute not present
             * return undefined
             */
            return undefined;
        }
    }
    set value(value){
        /**
         * validate entry type
         */
        if(this.#validateType(value)){
            /**
             * push to HTML Element
             */
            this.#node.setAttribute(this.#attributeName, value);
        } else {
            /**
             * launch error
             * invalid entry
             * value will be undefined from get
             */
            let msg = `Error: ${value} is an invalid type for ${this.#attributeName}! `;
            msg     += `Valid Types: ${this.#validTypes.join(', ')}`;
            console.error(msg);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name has
     * @type {Boolean}
     * @memberof AriaAttribute
     * @private
     * @description
     */
    /*----------------------------------------------------------*/
    get has(){return this.#node.hasAttribute(this.#attributeName);}
    /*----------------------------------------------------------*/
    /**
     * @name validateType
     * @type {}
     * @memberof validateType
     * @private
     * @param {String} value
     * @property {String} attributeName
     * @property {Array} validValues
     * @property {Array} validTypes
     * @description
     * @returns {Undefined | True | False}
     */
    /*----------------------------------------------------------*/
    #validateType(value){
        /**
         * @name compareType
         * @type {Function}
         * @memberof validateType
         * @param {String} validType
         * @param {String} value
         * @description
         * @returns 
         */
        let compareType = (validType, value) => {
            /**
             * parse value for type
             */
            let type = parseType(value);
            /**
             * compare types
             */
            if(type === validType){
                /**
                 * type valid
                 */
                return true;
            } else {
                /**
                 * invalid type for attribute value
                 */
                console.error(`Aria Attribute: ${this.#attributeName} value is of incorrect type!`);
                return false;
            }
        }
        /**
         * check size of types
         */
        if(this.#validTypes.length > 1){
            /**
             * test all types for validity
             */
            return this.#validTypes.every(entry => compareType(entry, value));
        } else {
            /**
             * single type
             * compare value in attribute to valid types, values
             * return result
             */
            return compareType(this.#validTypes[0], value);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name enable
     * @type {Method}
     * @memberof AriaAttribute
     * @param {Boolean | Number | String}
     * @description
     */
    /*----------------------------------------------------------*/
    enable(value){
      /**
       * determine valid inputs
       */
      this.value = value;
      /**
       * update enabled
       */
      this.enabled = true;
    }
    /*----------------------------------------------------------*/
    /**
     * @name disable
     * @type {Method}
     * @memberof AriaAttribute
     * @description
     */
    /*----------------------------------------------------------*/
    disable(){
        /**
         * update enabled
         */
        this.enabled = false;
    }
}
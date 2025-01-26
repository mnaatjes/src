/*----------------------------------------------------------*/
/**
 * @file src/core/dom-controller/dom-controller.js
 * 
 * @import 
 */
import { HTMLTagNames } from "../../utils/dom-controller__utils__constants.js";
import { DOMElement } from "../dom-element/dom-element.js";
import { DOMProtoElement } from "./dom-proto_element.js";
/**
 * @name DOMController
 * @type {Class}
 * @memberof DOMController
 * @namespace DOMController
 * @property {} 
 * @param {}
 */
/*----------------------------------------------------------*/
export class DOMController{
    constructor(){
        /**
         * @name root
         * @type {HTMLElement}
         * @memberof DOMController
         * @description
         */
        this.root = document.getElementById('root');
        /**
         * @name components
         * @type {Array}
         * @memberof DOMController
         * @description
         */
        this.components = [];
        /**
         * @name
         * @type {}
         * @memberof DOMController
         * @description
         */
    }
    /*----------------------------------------------------------*/
    /**
     * @name createComponent
     * @type {Method}
     * @memberof DOMController
     * @public
     * @param {}
     * @property {}
     * @description
     * @returns {}
     */
    /*----------------------------------------------------------*/
    createComponent(...args){
        /**
         * @name proto
         * @type {Object}
         * @memberof createComponent
         * @description create new ProtoElement
         */
        let proto = new DOMProtoElement(args, this.root);
        /**
         * create element
         */
        let element = document.createElement(proto.type);
        /**
         * assign id
         */
        element = this.#assignId(element, proto.id);
        /**
         * inject text
         */
        element = this.#injectText(element, proto.textContent);
        /**
         * append styles
         */
        element = this.#appendStyles(element, proto.styles);
        /**
         * add classList
         */
        element = this.#assignClassList(element, proto.classList);
        /**
         * append attributes
         * TODO: split events from protoElement attributes
         */
        element = this.#appendAttributes(element, proto.attributes);
        /**
         * append children
         */
        element = this.#appendChildren(element, proto.children);
        /**
         * create DOMElement from protoElement and HTML Element
         */
        return new DOMElement(element, proto);
    }
    /*----------------------------------------------------------*/
    /**
     * @name assignId
     * @type {Method}
     * @memberof DOMController
     * @private
     * @param {HTMLElement} element
     * @param {String} id
     * @description
     * @returns {HTMLElement}
     */
    /*----------------------------------------------------------*/
    #assignId(element, id){
        /**
         * check if undefined
         */
        if(id === undefined){
            return element;
        } else {
            element.id = id;
            return element;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name injectText
     * @type {Method}
     * @memberof DOMController
     * @private
     * @param {HTMLElement} element
     * @param {String} textContent
     * @description
     * @returns {HTMLElement}
     */
    /*----------------------------------------------------------*/
    #injectText(element, textContent){
        /**
         * check if undefined
         */
        if(textContent){
            element.textContent = textContent;
            return element;
        } else {
            return element;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name appendStyles
     * @type {Method}
     * @memberof DOMController
     * @private
     * @param {HTMLElement} element
     * @param {Object} styles
     * @description loops through object of styles and appends to supplied element
     * @returns {HTMLElement}
     */
    /*----------------------------------------------------------*/
    #appendStyles(element, styles){
        /**
         * validate styles
         * loop and append
         */
        if(styles && styles !== undefined && typeof styles === 'object'){
            /**
             * loop styles and append
             */
            for(let key in styles){
                /**
                 * validate syntax of style keys
                 */
                if(!key.includes('-')){
                    element.style[key] = styles[key];
                } else {
                    /**
                     * error: style not formatted properly
                     */
                    throw new Error(`Invalid data format for style property: ${key}`);
                }
            }
            /**
             * return completed element
             */
            return element;
        } else {
            /**
             * styles empty
             */
            return element;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name assignClassList
     * @type {Method}
     * @memberof DOMController
     * @private
     * @param {HTMLElement} element
     * @param {Object} classList
     * @description appends classlist to element
     * @returns {HTMLElement}
     */
    /*----------------------------------------------------------*/
    #assignClassList(element, classList){
        /**
         * check if classlist exists
         */
        if(classList && classList.length > 0){
            /**
             * loop classList and append
             */
            element.classList.add(...classList);
            /**
             * return completed element
             */
            return element;
        } else {
            /**
             * classList empty
             */
            return element;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name appendAttributes
     * @type {Method}
     * @memberof DOMController
     * @private
     * @param {HTMLElement} element
     * @param {Object} attributes
     * @description loops through attribute key, values and appends to element
     * @returns {HTMLElement}
     */
    /*----------------------------------------------------------*/
    #appendAttributes(element, attributes){
        /**
         * validate attributes object
         * check size of attributes
         */
        if(attributes !== undefined && typeof attributes === 'object'){
            if(Object.keys(attributes).length > 0){
                /**
                 * loop attributes and set key, values
                 */
                for(let key in attributes){
                    element.setAttribute(key, attributes[key]);
                }
                /**
                 * return completed element
                 */
                return element;
            } else {
                /**
                 * error: attributes formatting error
                 */
                throw new TypeError('Attributes Object not properly formatted!');
            }
        } else {
            /**
             * attributes empty
             */
            return element;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name appendChildren
     * @type {Method}
     * @memberof DOMController
     * @private
     * @param {HTMLElement} element
     * @param {Object} children
     * @description creates child elements from supplied properties list
     * @returns {HTMLElement}
     */
    /*----------------------------------------------------------*/
    #appendChildren(element, children){
        /**
         * validate children array
         * if not array, undefined, return element
         */
        if(Array.isArray(children) && children.length > 0){
            /**
             * validate contents
             * DOMProtoElement
             * TODO: Set ProtoElement parent
             * Element
             * Other
             */
            children.forEach(child => {
                /**
                 * set child parent as element
                 */
                child.parent = element;
                /**
                 * validate child object
                 */
                if(child instanceof DOMProtoElement){
                    /**
                     * create child Component
                     * append child to component parent element
                     */
                    element.appendChild(this.#createChildComponent(child));
                }
            });
        }
        /**
         * return element
         */
        return element;
    }
    /*----------------------------------------------------------*/
    /**
     * @name createChildComponent
     * @type {Method}
     * @memberof DOMController
     * @private
     * @param {DOMProtoElement | HTMLElement} child
     * @description
     * @returns {HTMLElement}
     */
    /*----------------------------------------------------------*/
    #createChildComponent(child){
        /**
         * create child element
         */
        let childElement = document.createElement(child.type);
        /**
         * assign Id
         */
        childElement = this.#assignId(childElement, child.id);
        /**
         * inject Text
         */
        childElement = this.#injectText(childElement, child.textContent);
        /**
         * append Styles
         */
        childElement = this.#appendStyles(childElement, child.styles);
        /**
         * assign Classlist
         */
        childElement = this.#assignClassList(childElement, child.classList);
        /**
         * append attributes
         */
        childElement = this.#appendAttributes(childElement, child.attributes);
        /**
         * return child html element
         */
        return childElement;
    }
    /*----------------------------------------------------------*/
    /**
     * @name createButton
     * @type {Method}
     * @memberof DOMController
     * @public
     * @param {Array} args
     * @property {}
     * @description
     * @returns {DOMElement}
     */
    /*----------------------------------------------------------*/
    createButton(...args){
        /**
         * @name type
         * @type {String}
         * @memberof createButton
         * @description
         */
        let type = 'button';
        /**
         * @name opts
         * @type {Object}
         * @memberof createButton
         * @description
         */
        let opts = {
            className: 'btn--default'
        };
        /**
         * append args to opts
         */
        args.forEach(item => {
            if(typeof item === 'object'){
                for(let key in item){
                    opts[key] = item[key];
                }
            }
        });
        /**
         * @implements {createComponent}
         */
        return this.createComponent(type, opts);
        
    }
    /*----------------------------------------------------------*/
    /**
     * @name 
     * @type {}
     * @memberof DOMController
     * @private
     * @param {}
     * @property {}
     * @description
     * @returns {}
     */
    /*----------------------------------------------------------*/
}
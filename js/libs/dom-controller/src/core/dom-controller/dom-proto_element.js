/*----------------------------------------------------------*/
/**
 * @file src/core/dom-controller/dom-proto_element.js
 * @imports
 */
import { HTMLTagNames } from "../../utils/dom-controller__utils__constants.js"; 
import { DOMElement } from "../dom-element/dom-element.js";
import { ARIAAttributes } from "../../utils/dom-controller__utils__constants.js";
import { HTMLEvents } from "../../utils/dom-controller__utils__constants.js";
/**
 * @name DOMProtoElement
 * @type {Class}
 * @memberof DOMController
 * @namespace DOMProtoElement
 * @property {} 
 * @param {}
 */
/*----------------------------------------------------------*/
export class DOMProtoElement{
    constructor(args, root){
        /**
         * @constructor
         * @description validate args or throw error
         *              format args into object if string supplied
         *              split args into tagName and HTMLObject
         *              destructure HTML Object
         */
        if(this.#validateArgs(args)){
            /**
             * determine type of args: html string or html obj
             * check size of array
             */
            if(args.length === 1){
                /**
                 * args is html string
                 * parse html string
                 */
                args = this.#parseHTMLString(args);
            }
            /**
             * @name tagName
             * @type {Undefined | String}
             * @memberof constructor
             */
            let tagName;
            /**
             * @name options
             * @type {Undefined | Object}
             * @memberof constructor
             */
            let options;
            /**
             * split args into tagName and options
             * validate tagname
             */
            if(this.#validateTagName(args[0])){
                tagName = args[0];
                /**
                 * @name type
                 * @type {String}
                 * @memberof DOMProtoElement
                 * @public
                 * @description tagName
                 */
                this.type = tagName;
            } else {
                throw new TypeError('Invalid tagName declared');
            }
            /**
             * check if args[1] empty
             * define and validate options
             */
            if(Object.keys(args[1]).length !== 0){
                /**
                 * validate options
                 */
                if(this.#validateOptions(args[1])){
                    /**
                     * define options
                     */
                    options = args[1];
                    /**
                     * @name props
                     * @type {Array}
                     * @memberof DOMProtoElement
                     * @public
                     * @property {String} propName
                     * @property {Number} propIndex
                     * @property {String} propValue
                     * @description register props
                     */
                    this.props = this.#registerProps(options);
                    /**
                     * deconstruct options
                     * define properties
                     */
                    let {
                        id,
                        parent,
                        style,
                        styles,
                        classList,
                        className,
                        textContent,
                        innerHTML,
                        children,
                        attributes,
                        events,
                        ...rest
                    } = options;
                    /**
                     * @name id
                     * @type {String}
                     * @memberof DOMProtoElement
                     * @public
                     * @description
                     */
                    this.id = this.#validateId(id);
                    /**
                     * @name parent
                     * @type {Undefined | String | HTMLElement | DOMElement}
                     * @memberof DOMProtoElement
                     * @public
                     * @description
                     */
                    this.parent = this.#validateParent(parent, root);
                    /**
                     * @name styles
                     * @type {Object}
                     * @memberof DOMProtoElement
                     * @public
                     * @param {Undefined | Object} style
                     * @param {Undefined | Object} styles
                     * @description
                     */
                    this.styles = this.#validateStyles(style, styles);
                    /**
                     * @name classList
                     * @type {Object}
                     * @memberof DOMProtoElement
                     * @public
                     * @description
                     */
                    this.classList = this.#validateClassList(className, classList);
                    /**
                     * @name textContent
                     * @type {Object}
                     * @memberof DOMProtoElement
                     * @private
                     * @property {String} innerHTML
                     * @property {String} textContent
                     * @description
                     */
                    this.textContent = this.#validateText(textContent, innerHTML);
                    /**
                     * @name children
                     * @type {Array}
                     * @memberof DOMProtoElement
                     * @public
                     * @description
                     */
                    this.children = this.#validateChildren(children, innerHTML);
                    /**
                     * @name attributes
                     * @type {Object}
                     * @memberof DOMProtoElement
                     * @public
                     * @description
                     */
                    this.attributes = this.#parseAttributes(attributes, rest, this.type);
                    /**
                     * @name events
                     * @type {Object}
                     * @memberof DOMProtoElement
                     * @public
                     * @property {Function} func
                     * @property {Boolean} options
                     * @description
                     */
                    this.events = this.#parseEvents(events, attributes, rest);
                }
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name validateArgs
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {args}
     * @property {}
     * @description
     * @returns {}
     */
    /*----------------------------------------------------------*/
    #validateArgs(args){
        /**
         * @name msg
         * @description error message
         */
        let msg = 'Arguments invalid type in CreateComponent';
        /**
         * check type
         */
        if(typeof args === 'object' && Array.isArray(args)){
            /**
             * return result
             */
            return true;
        } else {
            console.error(msg);
            return false;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name parseHTMLString
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {args}
     * @property {}
     * @description
     * TODO: allow for nested html tags
     * TODO: recursivly parse for nested html tags
     * @returns {Object<tagName><opts>}
     */
    /*----------------------------------------------------------*/
    #parseHTMLString(args){
        /**
         * @name parser
         * @type {Object}
         * @memberof parseHTMLString
         * @implements {DOMParser}
         */
        let parser = new DOMParser();
        /**
         * @name htmlString
         * @type {String}
         * @memberof parseHTMLString
         */
        let htmlString = Array.isArray(args) ? args[0] : args;
        /**
         * @name doc
         * @type {Object}
         * @memberof parseHTMLString
         */
        let doc = parser.parseFromString(htmlString, 'text/html');
        /**
         * @name type
         * @type {String}
         * @memberof parseHTMLString
         */
        let type = doc.body.firstChild.tagName.toLowerCase();
        /**
         * @name text
         * @type {String}
         * @memberof parseHTMLString
         */
        let text = doc.body.firstChild.textContent;
        /**
         * TODO: check if HTML string or HTML tag only
         */
        /**
         * return object
         */
        return [type, {textContent: text}];
    }
    /*----------------------------------------------------------*/
    /**
     * @name validateTagName
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {tagName}
     * @description
     * @returns {}
     */
    /*----------------------------------------------------------*/
    #validateTagName(tagName){
        /**
         * check if string
         */
        if(typeof tagName === 'string'){
            /**
             * check against valid HTML tags
             */
            if(HTMLTagNames.includes(tagName)){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name validateOptions
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {Object} opts
     * @description
     * @returns {Object}
     */
    /*----------------------------------------------------------*/
    #validateOptions(opts){
        /**
         * check if object
         */
        if(typeof opts === 'object'){
            return true;
        } else {
            return false;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name validateId
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {String} id
     * @description
     * @returns {Undefined | String}
     */
    /*----------------------------------------------------------*/
    #validateId(id){
        if(typeof id === 'string'){
            return id;
        } else if(typeof id === 'undefined'){
            return undefined;
        } else {
            throw new TypeError('Supplied ID not a String');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name validateParent
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {Undefined | String | HTMLElement | DOMElement} parent
     * @param {HTMLElement} root
     * @description
     * TODO: parse type of parent
     * TODO: return result of parent
     * @returns {Undefined | HTMLElement}
     */
    /*----------------------------------------------------------*/
    #validateParent(parent, root){
        if(parent instanceof HTMLElement){
            return parent;
        } else if(parent === undefined && root instanceof HTMLElement){
            return root;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name validateStyles
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {Undefined | Object} style
     * @param {Undefined | Object} styles
     * @description
     * @returns {Object}
     */
    /*----------------------------------------------------------*/
    #validateStyles(style, styles){
        /**
         * @name result
         * @type {Undefined | Object}
         * @memberof validateStyles
         * @description combine params into one object
         *              removes undefined objects
         */
        let result = Object.fromEntries(
            Object.entries({...style, ...styles})
                .map(([key, value]) => {
                /**
                 * check key for hyphen
                 */
                if(key.includes('-')){
                    /**
                     * declare formatting properties
                     */
                    let index   = key.indexOf('-');
                    let capChar = key.charAt(index + 1).toUpperCase();
                    /**
                     * format key
                     */
                    key = key.substring(0, index) + capChar + key.substring(index + 2, key.length);
                }
                /**
                 * return formatted key, value
                 */
                    return [key, value];
                })
        );
        /**
         * validate result
         * return undefined if empty
         */
        if(typeof result === 'object' && Object.keys(result).length === 0){
            result = undefined;
        }
        return result;
    }
    /*----------------------------------------------------------*/
    /**
     * @name validateClassList
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {Undefined | String} className
     * @param {Undefined | Array} classList
     * @description
     * @returns {Array}
     */
    /*----------------------------------------------------------*/
    #validateClassList(className, classList){
        /**
         * @name result
         * @type {Undefined | Array}
         * @memberof validateClassList
         */
        let result = [];
        /**
         * check if className Exists
         */
        if(typeof className === 'string'){
            result.push(className);
        }
        /**
         * check classList
         */
        if(Array.isArray(classList)){
            result = result.concat(classList);
        }
        /**
         * check if result is empty
         * return result
         */
        if(result.length === 0){
            result = undefined;
        }
        return result;
    }
    /*----------------------------------------------------------*/
    /**
     * @name validateText
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {Undefined | String} textContent
     * @param {Undefined | String} innerHTML
     * @description
     * @returns {Undefined | String}
     */
    /*----------------------------------------------------------*/
    #validateText(textContent, innerHTML){
        /**
         * @name result
         * @type {Undefined | String}
         * @memberof validateText
         */
        let result;
        /**
         * check if innerHTML is a string or a child element
         */
        if(!/<[a-z][\s\S]*>/i.test(innerHTML) && innerHTML !== undefined){
            result = innerHTML;
        } else {
            result = textContent;
        }
        /**
         * return result
         */
        return result;

    }
    /*----------------------------------------------------------*/
    /**
     * @name validateChildren
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {Undefined | Array} children
     * @param {Undefined | String} innerHTML
     * @description
     * @returns {Array}
     */
    /*----------------------------------------------------------*/
    #validateChildren(children, innerHTML){
        /**
         * @name result
         * @type {Array}
         * @memberof validateChildren
         */
        let result = [];
        /**
         * @name html
         * @type {Undefined | String | Array | HTMLElement}
         * @memberof validateChildren
         */
        let html;
        /**
         * test innerHTML to see if it contains html
         */
        if(/<[a-z][\s\S]*>/i.test(innerHTML)){
            /**
             * parse innerHTML
             * create protoElement
             * append parent
             */
            html        = this.#parseHTMLString(innerHTML);
            html        = new DOMProtoElement(html);
            html.parent = this;
        }
        /**
         * check if children undefined or empty
         * check if children is an array
         */
        if(children !== undefined && Array.isArray(children)){
            /**
             * check format of children array
             * if format string, obj...
             */
            if(typeof children[0] === 'string' && typeof children[1] === 'object'){
                result = children.reduce((acc, curr, index) => {
                    if(index % 2 === 0){
                        acc.push([curr]);
                    } else {
                        acc[acc.length - 1].push(curr);
                    }
                    return acc;
                }, []);
            } else if(typeof children[0] === 'object'){
                /**
                 * format of array is obj, obj...
                 */
                result = children.reduce((acc, curr, index) => {
                    /**
                     * destructure type, tagName
                     * grab tagName
                     */
                    let {type, tagName, ...rest} = curr;
                    /**
                     * check that tagName or type exists
                     * assign to first array
                     */
                    if(type && typeof type === 'string'){
                        /**
                         * push to first sub-array
                         */
                        acc.push([type]);
                    } else if(tagName && typeof tagName === 'string'){
                        /**
                         * push to first sub-array
                         * delete from curr object
                         */
                        acc.push([tagName]);
                    } else {
                        /**
                         * error, format incorrect
                         */
                        throw new TypeError('type / tagName not specified in Children!');
                    }
                    /**
                     * append rest of supplied object to second array
                     */
                    rest.parent = this;
                    /**
                     * push onto sub-array
                     */
                    acc[acc.length - 1].push(rest);
                    return acc;
                }, []);
            }
        }
        /**
         * convert elements of result array into DOMProtoElements
         */
        result = result.map(child => new DOMProtoElement(child));
        /**
         * append innerHTML if is html protoElement
         */
        if(html instanceof DOMProtoElement){
            result.push(html);
        }
        /**
         * validate result: 
         * not undefined
         * not array length 0
         */
        if(result.length === 0){
            result = undefined;
        }
        /**
         * return result
         */
        return result;
    }
    /*----------------------------------------------------------*/
    /**
     * @name parseAttributes
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {Undefined | Object} attributes
     * @param {Undefined | Object} rest
     * @description
     * @returns {}
     */
    /*----------------------------------------------------------*/
    #parseAttributes(attributes, rest, tagName){
        /**
         * @name result
         * @type {Object}
         * @memberof parseAttributes
         */
        let result = {};
        /**
         * @name prefixes
         * @type {Array}
         * @memberof parseAttributes
         */
        let prefixes = ['data', 'aria'];
        /**
         * @name formatAttribKey
         * @type {Function}
         * @memberof parseAttributes
         * @param {String} key
         * @param {String} prefixes
         */
        function formatAttribKey(key, prefixes){
            /**
             * declare res
             */
            let res;
            /**
             * loop prefixes
             */
            prefixes.forEach(prefix => {
                /**
                 * key contains prefix
                 */
                if(key.toLowerCase().startsWith(prefix)){
                    /**
                     * ignore keys with hyphens
                     */
                    if(!key.includes('-')){
                        /**
                         * format key:
                         * grab index of capital letter
                         * grab suffix
                         */
                        let index;
                        let capChar;
                        for(let i = 0; i < key.length; i++){
                            if(/[A-Z]/.test(key[i])){
                                index   = i;
                                capChar = key[i];
                            }
                        }
                        if(index && capChar){
                            /**
                             * set result
                             */
                            res = prefix + '-' + capChar.toLowerCase() + key.slice(index + 1, key.length);
                        }
                    }
                }
            });
            /**
             * validate res
             * return result
             */
            if(res === undefined){
                res = key;
            }
            return res;
        }
        /**
         * check if attributes undefined
         * check typeof attributes
         * convert to object if array
         */
        if(attributes){
            /**
             * attributes is NOT an array
             */
            if(!Array.isArray(attributes)){
                /**
                 * append key, values to results
                 */
                for(let key in attributes){
                    /**
                     * skip events
                     */
                    if(!key.startsWith('on')){
                        /**
                         * format key
                         */
                        result[key] = attributes[key];
                    }
                }
            } else if(Array.isArray(attributes)){
                /**
                 * loop attributes
                 */
                attributes.forEach(item => {
                    /**
                     * validate attribute entries are objects of single length
                     */
                    if(typeof item === 'object' && Object.keys(item).length === 1){
                        /**
                         * append key, values to results
                         */
                        for(let key in item){
                            /**
                             * skip events
                             */
                            if(!key.startsWith('on')){
                                result[key] = item[key];
                            }
                        }
                    } else if(typeof item === 'object' && Object.keys(item).length > 1){
                        /**
                         * skip events
                         */
                        if(!Object.values(item)[0].startsWith('on')){
                            /**
                             * append first value as key, second value as value
                             */
                            result[Object.values(item)[0]] = Object.values(item)[1];
                        }
                    } else {
                        /**
                         * format error
                         */
                        throw new TypeError('Attribute element not properly formatted!');
                    }
                });
            } else {
                /**
                 * format error
                 */
                throw new TypeError('Attributes object inproperly formatted!');
            }
        }
        /**
         * validate length of rest object
         * parse keys
         */
        if(Object.keys(rest).length > 0){
            /**
             * filter out events from rest
             */
            rest = Object.fromEntries(
                Object.entries(rest).filter(([key]) => !key.startsWith('on'))
            );
            /**
             * parse keys from rest
             * format keys
             */
            for(let key in rest){
                /**
                 * append keys to result
                 */
                result[key] = rest[key];
            }
        }
        /**
         * validate results
         * format result keys
         * validate aria and html attributes
         */
        if(Object.keys(result).length === 0){
            /**
             * assign result undefined
             * return result
             */
            result = undefined;
            return result;
        } else {
            /**
             * format attribute keys and remove duplicates
             */
            result = Object.fromEntries(
                Object.entries(result).map(([key, value]) => [formatAttribKey(key, prefixes), value])
            );
            /**
             * split off aria attribs
             * validate aria attribute keys
             */
            let ariaAttribs = Object.keys(result).filter(
                (key) => key.startsWith('aria')
            ).every(ariaKey => {
                /**
                 * declare aria attributes names
                 * check if attribute is valid
                 */
                let ariaNames = ARIAAttributes.reduce((acc, obj) => {acc.push(obj.attribute); return acc;}, []);
                if(ariaNames.includes(ariaKey)){
                    /**
                     * declare ariaTags
                     * check if aria attrib can be used with tagName
                     */
                    let ariaTags = ARIAAttributes.find(entry => entry.attribute === ariaKey).tags;
                    if(ariaTags.includes(tagName) || ariaTags[0] === '*'){
                        return true;
                    } else {
                        /**
                         * aria attribute invalid for tag
                         */
                        throw new TypeError(`Aria attribute: ${ariaKey} cannot be used with tag: ${tagName}`);
                    }
                } else {
                    /**
                     * invalid aria attribute
                     */
                    throw new TypeError(`Invalid Aria Attribute: ${ariaKey}`);
                }
            });
            /**
             * aria attribute validation passed
             */
            if(ariaAttribs){
                /**
                 * TODO: validate HTML attributes and tags
                 */
                /**
                 * return result
                 */
                return result;
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name parseEvents
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {Undefined | Object | Array} events
     * @param {Undefined | Object | Array} attributes
     * @param {Undefined | Object} rest
     * @property {}
     * @description
     * @returns {}
     */
    /*----------------------------------------------------------*/
    #parseEvents(events, attributes, rest){
        /**
         * @name result
         * @type {Undefined | Object}
         * @memberof parseEvents
         * @description combine params into one object
         *              and filter for events
         *              validate and format events
         */
        let result = Object.fromEntries(
            /**
             * combine params into one object
             */
            Object.entries([attributes, events, rest]
                .reduce((acc, item) => ({...acc, ...item}), {}))
                .filter(([key, value]) => {
                    /**
                     * validate
                     */
                    return (
                        /**
                         * key is an event
                         */
                        (HTMLEvents.includes(key) || HTMLEvents.includes(key.toLowerCase().substring(2))) &&
                        /**
                         * value is a function
                         */
                        typeof value === 'function'
                    );
                })
                .map(([key, value]) => {
                    /**
                     * format key where:
                     * key starts with on and event word isnt capitalized
                     */
                    if(key.startsWith('on') && !/[A-Z]/.test(key[2])){
                        key = 'on' + key.charAt(2).toUpperCase() + key.substring(3);
                    } else if(!key.startsWith('on')) {
                        /**
                         * key is valid event but needs formatting
                         */
                        key = 'on' + key.charAt(0).toUpperCase() + key.substring(1);
                    }
                    /**
                     * return formatted key
                     */
                    return [key, value];
                })
        );
        /**
         * validate result
         * return result
         */
        if(Object.keys(result).length === 0){
            result = undefined;
        }
        return result;
    }
    /*----------------------------------------------------------*/
    /**
     * @name registerProps
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {opts}
     * @property {}
     * @description
     * @returns {}
     */
    /*----------------------------------------------------------*/
    #registerProps(opts){
        /**
         * @name res
         * @type {Array}
         * @memberof registerProps
         * @description traverse opts object and extract props
         *              format response into object entries
         */
        let res = {};
        /**
         * format into object and return 
         * [propName]: {index..., value: }
         */
        this.#traverseOptions(opts).forEach(prop => {
            /**
             * TODO: clean-up propName
             */
            /**
             * append to results object
             */
            res[prop.propName] = {
                index: prop.propIndex,
                value: prop.propValue
            };
        });
        return res;
    }
    /*----------------------------------------------------------*/
    /**
     * @name findProp
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {String} value
     * @description
     * @returns {Object} str: string, prop: string
     */
    /*----------------------------------------------------------*/
    #findProp(value){
        /**
         * define properties
         */
        let regex   = /\{([^}]+)\}/g;
        let matches = value.match(regex);
        if(matches && matches.length !== 0){
            /**
             * strip propName
             * get index value for location of prop
             * strip prop and and brackets from value
             * return propName
             * return value with prop removed
             * return index of prop for value string
             * return boolean of false: indicates variable has not been set
             */
            let propName = matches[0].replace(/[{()}]/g, '');
            return {
                propName: propName,
                propIndex: value.indexOf(propName),
                propValue: undefined
            };
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name traverseOptions
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {Object} obj
     * @param {Array} res
     * @description
     * @returns {Array} res
     */
    /*----------------------------------------------------------*/
    #traverseOptions(obj, res=[]){
        /**
         * traverse keys in obj
         */
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                /**
                 * check type
                 */
                if(typeof obj[key] === 'string'){
                    /**
                     * check for props
                     */
                    let prop = this.#findProp(obj[key]);
                    /**
                     * push propName to results array
                     */
                    if(prop){
                        res.push(prop);
                    }
                } else if(typeof obj[key] === 'object'){
                    /**
                     * traverse deeper
                     */
                    res = this.#traverseOptions(obj[key], res);
                }
            }
        }
        /**
         * return results array
         */
        return res;
    }
    /*----------------------------------------------------------*/
    /**
     * @name
     * @type {Method}
     * @memberof DOMProtoElement
     * @private
     * @param {}
     * @property {}
     * @description
     * @returns {}
     */
    /*----------------------------------------------------------*/
}
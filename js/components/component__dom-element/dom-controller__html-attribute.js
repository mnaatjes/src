/*----------------------------------------------------------*/
/**
 * @file src/js/components/component_dom-element/dom-controller__html-attribute.js
 * @name HTMLAttributesController
 * @type {Class}
 * @memberof Src.Components.DOMController
 * @property {}
 * @description
 */
/*----------------------------------------------------------*/
class HTMLAttributesController {
    #defaultAttributes;
    constructor(node){
      /**
       * @name defaultAttributes
       * @type {Array}
       * @memberof HTMLAttributesController
       * @private
       * @description
       */
      this.#defaultAttributes = HTMLAttributes;
      /**
       * initialize
       */
      this.#initHTMLAttributes(node);
    }
  /*----------------------------------------------------------*/
  /**
   * @name initHTMLAttributes
   * @type {Method}
   * @memberof HTMLAttributesController
   * @namespace initHTMLAttributes
   * @private
   * @param {HTMLElement} node
   * @description
   */
  /*----------------------------------------------------------*/
  #initHTMLAttributes(node){
      /**
       * generate aria properties
       * create as instances of HTMLAttribute
       */
      this.#generateProperties(node);
  }
  /*----------------------------------------------------------*/
  /**
   * @name generateProperties
   * @type {Method}
   * @memberof HTMLAttributesController
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
        HTMLAttributesController.prototype[entry.attribute] = new HTMLAttribute(node, {
            attribute: entry.attribute,
            tags: entry.tags,
            values: entry.values
        });
    });
}
  /*----------------------------------------------------------*/
  /**
   * @name enabled
   * @type {Boolean | Array}
   * @memberof HTMLAttributesController
   * @public
   * @description
   */
  /*----------------------------------------------------------*/
  get enabled(){}
  set enabled(value){}
}

/*----------------------------------------------------------*/
/**
 * @name DOMAttribute
 * @type {Class}
 * @memberof Src.Components.DOMController
 * @namespace DOMAttribute
 * @description
 */
/*----------------------------------------------------------*/
class DOMAttribute {
    #node;
    #attributeName;
    #validTags;
    #validValues;
    constructor(node, entry){
        /**
         * @name node
         * @type {HTMLElement}
         * @memberof DOMAttribute
         * @private
         * @description
         */
        this.#node = node;
        /**
         * @name attributeName
         * @type {Array}
         * @memberof DOMAttribute
         * @description
         */
        this.#attributeName = entry.attribute;
        /**
         * @name validTags
         * @type {Array}
         * @memberof DOMAttribute
         * @description
         */
        this.#validTags = entry.tags;
        /**
         * @name validValues
         * @type {Array}
         * @memberof DOMAttribute
         * @description
         */
        this.#validValues = entry.values
    }
}
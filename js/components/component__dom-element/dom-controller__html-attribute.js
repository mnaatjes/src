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
      this.#defaultAttributes = this.#initDefault();
      /**
       * initialize
       */
      this.#initHTMLAttributes(node);
    }
  /*----------------------------------------------------------*/
  /**
   * @name initDefault
   * @type {Method}
   * @memberof HTMLAttributesController
   * @namespace initDefault
   * @private
   * @description
   */
  /*----------------------------------------------------------*/
  #initDefault(){
    let HTMLAttributeLib = [
        {
          attribute: "accept",
          tags: ["input"],
          description: "Specifies the types of files that the server accepts.",
          values: ['string'], // MIME Types
          valueDescription: 'MIME Types'
        },
        {
          attribute: "autocomplete",
          tags: ["form", "input", "select", "textarea"],
          description: "Indicates whether controls in this form can by default have their values automatically completed by the browser.",
          values: ['string']
        },
        {
          attribute: "capture",
          tags: ["input"],
          description: "Specifies whether the user can take a photo or record video with the device.",

        },
        {
          attribute: "crossorigin",
          tags: ["audio", "img", "link", "script", "video"],
          description: "How the element handles cross-origin requests."
        },
        {
          attribute: "dirname",
          tags: ["input", "textarea"],
          description: "Provides a hint to the browser of the expected type of data to be entered by the user."
        },
        {
          attribute: "disabled",
          tags: ["button", "fieldset", "input", "optgroup", "option", "select", "textarea"],
          description: "Indicates that the element is disabled and cannot be used by the user."
        },
        {
          attribute: "draggable",
          tags: ["*"], // Applicable to all HTML elements
          description: "Specifies whether the element is draggable."
        },
        {
          attribute: "elementtiming",
          tags: ["*"], // Applicable to all HTML elements
          description: "Indicates whether the user agent should report timing information for this element."
        },
        {
          attribute: "for",
          tags: ["label", "output"],
          description: "Specifies which element(s) the label is associated with."
        },
        {
          attribute: "hidden",
          tags: ["*"], // Applicable to all HTML elements
          description: "Hides the element."
        },
        {
          attribute: "inputmode",
          tags: ["textarea", "contenteditable"],
          description: "Provides a hint as to the type of data that might be entered by the user."
        },
        {
          attribute: "max",
          tags: ["input", "meter", "progress"],
          description: "Specifies the maximum value allowed."
        },
        {
          attribute: "maxlength",
          tags: ["input", "textarea"],
          description: "Specifies the maximum number of characters allowed."
        },
        {
          attribute: "min",
          tags: ["input", "meter"],
          description: "Specifies the minimum value allowed."
        },
        {
          attribute: "minlength",
          tags: ["input", "textarea"],
          description: "Specifies the minimum number of characters allowed."
        },
        {
          attribute: "multiple",
          tags: ["input", "select"],
          description: "Indicates that the user can select multiple options."
        },
        {
          attribute: "pattern",
          tags: ["input"],
          description: "Specifies a regular expression for the value."
        },
        {
          attribute: "placeholder",
          tags: ["input", "textarea"],
          description: "Provides a hint to the user of what kind of information to enter."
        },
        {
          attribute: "readonly",
          tags: ["input", "textarea"],
          description: "Makes the element read-only."
        },
        {
          attribute: "rel",
          tags: ["a", "area", "link"],
          description: "Specifies the relationship between the current document and the linked document."
        },
        {
          attribute: "required",
          tags: ["input", "select", "textarea"],
          description: "Indicates that the element must be filled in before the form can be submitted."
        },
        {
          attribute: "size",
          tags: ["input", "select", "textarea"],
          description: "Specifies the visible width of the element in pixels or characters."
        },
        {
          attribute: "step",
          tags: ["input"],
          description: "Specifies the allowed step between values."
        },
        {
          attribute: "tabindex",
          tags: ["*"], // Applicable to all HTML elements
          description: "Specifies the tabbing order for the element."
        },
        {
          attribute: "title",
          tags: ["*"], // Applicable to all HTML elements
          description: "Provides a tooltip for the element."
        }
      ];
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
  #initHTMLAttributes(node){}
}
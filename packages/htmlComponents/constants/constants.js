/**
 * @file constants.js
 */
/**
 * @const {Array}  HTMLElementProperties
 */
export const HTMLElementProperties = [
  "id",
  "className",
  "textContent",
  "innerHTML",
  "style",
  "src", 
  "href", 
  "alt", 
  "title",
  "value", 
  "checked",
  "selected", 
  "disabled",
  "readOnly",
  "placeholder", 
  "type", 
  "width", 
  "height", 
  "controls", 
  "autoplay", 
  "loop", 
  "muted", 
  "volume", 
  "dataset", 
  "tabIndex",
  "contentEditable",
  "spellcheck",
  "lang",
  "dir", 
  "hidden",
  "draggable",
  "dropzone",
  "accessKey",
  "form", 
  "name",
  "action", 
  "method", 
  "target", 
  "accept", 
  "acceptCharset",
  "autocomplete",
  "formAction", 
  "formEnctype", 
  "formMethod", 
  "formNoValidate", 
  "formTarget", 
  "maxLength",
  "minLength",
  "pattern",
  "required",
  "size",
  "step",
  "defaultChecked",
  "defaultValue"
];
/**
 * @const {Array} voidElements
 * @description HTML Elements that are self-closing and do not accept children
 */
export const voidElements = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
/**
 * @const {Array} formElements
 * @description Valid HTML Elements for a Form
 */
export const formElements = [
  "button",
  "datalist",
  "fieldset",
  "input",
  "label",
  "legend",
  "meter",
  "optgroup",
  "option",
  "output",
  "progress",
  "select",
  "textarea"
];
/**
 * @const {Array} inputTypes
 */
export const inputTypes = [
  {
    inputType: "text",
    required: ["name"],
    options: ["value", "placeholder", "maxlength", "minlength", "pattern", "readonly", "disabled", "size", "autocomplete", "list", "spellcheck", "required"]
  },
  {
    inputType: "password",
    required: ["name"],
    options: ["value", "placeholder", "maxlength", "minlength", "pattern", "readonly", "disabled", "size", "autocomplete", "required"]
  },
  {
    inputType: "email",
    required: ["name"],
    options: ["value", "placeholder", "maxlength", "minlength", "pattern", "readonly", "disabled", "size", "autocomplete", "multiple", "list", "required"]
  },
  {
    inputType: "number",
    required: ["name"],
    options: ["value", "min", "max", "step", "placeholder", "readonly", "disabled", "required"]
  },
  {
    inputType: "checkbox",
    required: ["name"],
    options: ["value", "checked", "disabled", "required"]
  },
  {
    inputType: "radio",
    required: ["name"],
    options: ["value", "checked", "disabled", "required"]
  },
  {
    inputType: "file",
    required: ["name"],
    options: ["accept", "multiple", "disabled", "required"]
  },
  {
    inputType: "submit",
    required: ["name"],
    options: ["value", "disabled"]
  },
  {
    inputType: "reset",
    required: ["name"],
    options: ["value", "disabled"]
  },
  {
    inputType: "button",
    required: ["name"],
    options: ["value", "disabled"]
  },
  {
    inputType: "date",
    required: ["name"],
    options: ["value", "min", "max", "step", "disabled", "required"]
  },
  {
    inputType: "datetime-local",
    required: ["name"],
    options: ["value", "min", "max", "step", "disabled", "required"]
  },
  {
    inputType: "time",
    required: ["name"],
    options: ["value", "min", "max", "step", "disabled", "required"]
  },
  {
    inputType: "month",
    required: ["name"],
    options: ["value", "min", "max", "step", "disabled", "required"]
  },
  {
    inputType: "week",
    required: ["name"],
    options: ["value", "min", "max", "step", "disabled", "required"]
  },
  {
    inputType: "color",
    required: ["name"],
    options: ["value", "disabled", "list"]
  },
  {
    inputType: "range",
    required: ["name"],
    options: ["value", "min", "max", "step", "disabled", "list"]
  },
    {
    inputType: "search",
    required: ["name"],
    options: ["value", "placeholder", "maxlength", "minlength", "pattern", "readonly", "disabled", "size", "autocomplete", "list", "spellcheck", "required"]
  },
  {
    inputType: "tel",
    required: ["name"],
    options: ["value", "placeholder", "maxlength", "minlength", "pattern", "readonly", "disabled", "size", "autocomplete", "list", "spellcheck", "required"]
  },
  {
    inputType: "url",
    required: ["name"],
    options: ["value", "placeholder", "maxlength", "minlength", "pattern", "readonly", "disabled", "size", "autocomplete", "list", "spellcheck", "required"]
  },
  {
    inputType: "hidden",
    required: ["name"],
    options: ["value"]
  },
  {
    inputType: "image",
    required: ["src", "alt"],
    options: ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "width", "height", "disabled"]
  }
];
/**
 * @const {Array} unitlessStyleProps - Style property names not requiring units like px or rem appended to them
 */
export const unitlessStyleProps = [
  'opacity',
  'zIndex',
  'fontWeight',
  'lineHeight',
  'flexGrow',
  'flexShrink',
  'order',
  'zoom'
];
/**
 * @const {Array} dimensionalStyleProps - Style property names requiring dimensional units
 */
export const dimensionalStyleProps = [
  "width",
  "height",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight",
  "top",
  "right",
  "bottom",
  "left",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "borderWidth",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "fontSize",
  "letterSpacing",
  "wordSpacing",
  "textIndent",
  "outlineWidth",
  "columnWidth",
  "columnGap",
  "gap",
  "rowGap",
  "columnRuleWidth",
  "strokeWidth",
];
/**
 * @const {Object} regexPatterns - Regex patters for various string | number types
 */
export const regexPatterns = {
  url: {
    regex: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    text: 'URL'
  },
  filePath: {
    regex: /^([a-zA-Z]:)?(\\[^<>:"/\\|?*]+)+\\?$/, // Windows, adjust for other OS
    text: 'File Path'
  },
  zipCode: {
    regex: /^\d{5}(-\d{4})?$/,
    text: 'Zip Code'
  },
  text: {
    regex: /^[a-zA-Z\s]+$/, // Basic text, letters and spaces.
    text: 'Capital and Lower Case letters'
  },
  alphaNumeric: {
    regex: /^[a-zA-Z0-9]+$/,
    text: 'Letters and Numbers'
  },
  phone: {
    regex: /^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/, // International numbers allowed
    text: 'Phone Number'
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    text: 'Email Address'
  },
  date: {
    regex:  /^\d{2}-\d{2}-\d{4}$/, // YYYY-MM-DD format
    text: 'Date: DD-MM-YYYY'
  },
  time: {
    regex: /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/, // HH:MM or HH:MM:SS
    text: 'Time HH:MM or HH:MM:SS'
  },
  ip: {
    regex: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    text: 'IP Address'
  },
  hexColor: {
    regex: /^#([0-9a-f]{3}|[0-9a-f]{6})$/i,
    text: 'Color Hexidecimal'
  },
  creditCard: {
    regex: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
    text: 'Credit Card Number'
  },
  socialSecurity: {
    regex: /^\d{3}-?\d{2}-?\d{4}$/,
    text: 'Social Security Number'
  },
  float: {
    regex: /^-?\d+(\.\d+)?$/, // Allows for negative and decimal numbers
    text: 'Decimal Number'
  },
  int: {
    regex: /^-?\d+$/, // Allows for negative integers
    text: 'Integer Number'
  }
};
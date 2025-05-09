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
/**
 * @const {Array<attribute: String, listener: String>} eventNamePairs
 */
export const eventNamePairs = [
  { attribute: "onabort", listener: "abort" },
  { attribute: "onanimationcancel", listener: "animationcancel" },
  { attribute: "onanimationend", listener: "animationend" },
  { attribute: "onanimationiteration", listener: "animationiteration" },
  { attribute: "onanimationstart", listener: "animationstart" },
  { attribute: "onauxclick", listener: "auxclick" },
  { attribute: "onbeforeinput", listener: "beforeinput" },
  { attribute: "onblur", listener: "blur" },
  { attribute: "oncancel", listener: "cancel" },
  { attribute: "oncanplay", listener: "canplay" },
  { attribute: "oncanplaythrough", listener: "canplaythrough" },
  { attribute: "onchange", listener: "change" },
  { attribute: "onclick", listener: "click" },
  { attribute: "onclose", listener: "close" },
  { attribute: "oncompositionend", listener: "compositionend" },
  { attribute: "oncompositionstart", listener: "compositionstart" },
  { attribute: "oncompositionupdate", listener: "compositionupdate" },
  { attribute: "oncontextmenu", listener: "contextmenu" },
  { attribute: "oncopy", listener: "copy" },
  { attribute: "oncuechange", listener: "cuechange" },
  { attribute: "oncut", listener: "cut" },
  { attribute: "ondblclick", listener: "dblclick" },
  { attribute: "ondrag", listener: "drag" },
  { attribute: "ondragend", listener: "dragend" },
  { attribute: "ondragenter", listener: "dragenter" },
  { attribute: "ondragleave", listener: "dragleave" },
  { attribute: "ondragover", listener: "dragover" },
  { attribute: "ondragstart", listener: "dragstart" },
  { attribute: "ondrop", listener: "drop" },
  { attribute: "ondurationchange", listener: "durationchange" },
  { attribute: "onended", listener: "ended" },
  { attribute: "onerror", listener: "error" },
  { attribute: "onfocus", listener: "focus" },
  { attribute: "onfocusin", listener: "focusin" },
  { attribute: "onfocusout", listener: "focusout" },
  { attribute: "onformdata", listener: "formdata" },
  { attribute: "onfullscreenchange", listener: "fullscreenchange" },
  { attribute: "onfullscreenerror", listener: "fullscreenerror" },
  { attribute: "ongotpointercapture", listener: "gotpointercapture" },
  { attribute: "onhashchange", listener: "hashchange" },
  { attribute: "oninput", listener: "input" },
  { attribute: "oninvalid", listener: "invalid" },
  { attribute: "onkeydown", listener: "keydown" },
  { attribute: "onkeypress", listener: "keypress" },
  { attribute: "onkeyup", listener: "keyup" },
  { attribute: "onlanguagechange", listener: "languagechange" },
  { attribute: "onload", listener: "load" },
  { attribute: "onloadeddata", listener: "loadeddata" },
  { attribute: "onloadedmetadata", listener: "loadedmetadata" },
  { attribute: "onloadstart", listener: "loadstart" },
  { attribute: "onlostpointercapture", listener: "lostpointercapture" },
  { attribute: "onmessage", listener: "message" },
  { attribute: "onmessageerror", listener: "messageerror" },
  { attribute: "onmousedown", listener: "mousedown" },
  { attribute: "onmouseenter", listener: "mouseenter" },
  { attribute: "onmouseleave", listener: "mouseleave" },
  { attribute: "onmousemove", listener: "mousemove" },
  { attribute: "onmouseout", listener: "mouseout" },
  { attribute: "onmouseover", listener: "mouseover" },
  { attribute: "onmouseup", listener: "mouseup" },
  { attribute: "onoffline", listener: "offline" },
  { attribute: "ononline", listener: "online" },
  { attribute: "onopen", listener: "open" },
  { attribute: "onpagehide", listener: "pagehide" },
  { attribute: "onpageshow", listener: "pageshow" },
  { attribute: "onpaste", listener: "paste" },
  { attribute: "onpause", listener: "pause" },
  { attribute: "onplay", listener: "play" },
  { attribute: "onplaying", listener: "playing" },
  { attribute: "onpointercancel", listener: "pointercancel" },
  { attribute: "onpointerdown", listener: "pointerdown" },
  { attribute: "onpointerenter", listener: "pointerenter" },
  { attribute: "onpointerleave", listener: "pointerleave" },
  { attribute: "onpointermove", listener: "pointermove" },
  { attribute: "onpointerout", listener: "pointerout" },
  { attribute: "onpointerover", listener: "pointerover" },
  { attribute: "onpointerup", listener: "pointerup" },
  { attribute: "onpopstate", listener: "popstate" },
  { attribute: "onprogress", listener: "progress" },
  { attribute: "onratechange", listener: "ratechange" },
  { attribute: "onrejectionhandled", listener: "rejectionhandled" },
  { attribute: "onreset", listener: "reset" },
  { attribute: "onresize", listener: "resize" },
  { attribute: "onscroll", listener: "scroll" },
  { attribute: "onsecuritypolicyviolation", listener: "securitypolicyviolation" },
  { attribute: "onseeked", listener: "seeked" },
  { attribute: "onseeking", listener: "seeking" },
  { attribute: "onselect", listener: "select" },
  { attribute: "onselectionchange", listener: "selectionchange" },
  { attribute: "onselectstart", listener: "selectstart" },
  { attribute: "onslotchange", listener: "slotchange" },
  { attribute: "onstalled", listener: "stalled" },
  { attribute: "onstorage", listener: "storage" },
  { attribute: "onsubmit", listener: "submit" },
  { attribute: "onsuspend", listener: "suspend" },
  { attribute: "ontimeupdate", listener: "timeupdate" },
  { attribute: "ontoggle", listener: "toggle" },
  { attribute: "ontouchcancel", listener: "touchcancel" },
  { attribute: "ontouchend", listener: "touchend" },
  { attribute: "ontouchmove", listener: "touchmove" },
  { attribute: "ontouchstart", listener: "touchstart" },
  { attribute: "ontransitioncancel", listener: "transitioncancel" },
  { attribute: "ontransitionend", listener: "transitionend" },
  { attribute: "ontransitionrun", listener: "transitionrun" },
  { attribute: "ontransitionstart", listener: "transitionstart" },
  { attribute: "onunhandledrejection", listener: "unhandledrejection" },
  { attribute: "onunload", listener: "unload" },
  { attribute: "onvolumechange", listener: "volumechange" },
  { attribute: "onwaiting", listener: "waiting" },
  { attribute: "onwheel", listener: "wheel" },
];
/**
 * @const {Array} booleanProperties - HTML attribute properties which do not set a value
 */
export const booleanProperties = [
  "checked",
  "disabled",
  "readonly",
  "multiple",
  "selected",
  "required",
  "hidden",
  "draggable",
  "contentEditable",
  "spellcheck",
  "isMap",
  "noValidate",
  "defaultChecked",
  "defaultSelected",
  "autoplay", 
  "controls", 
  "loop", 
  "muted",
  "defaultMuted",
  "async",
  "defer",
  "reversed",
  "inert",
];
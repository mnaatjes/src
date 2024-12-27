console.log('Working...');
/**
 * @typedef {import("../src/core/dom-element/dom-element.js").DOMElement} DOMElement
 */
import { DOMElement } from "../src/core/dom-element/dom-element.js";
let ele = new DOMElement(document.getElementById('btn--home'));
ele.hide();
console.log(ele);
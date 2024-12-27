console.log('Working...');
/**
 * @module DOMController
 * @module DOMElement
 */
import { DOMController } from "../src/core/dom-controller/dom-controller.js";
import { DOMElement } from "../src/core/dom-element/dom-element.js";
/**
 * debugging DOMController
 */
console.log(new DOMController());
/**
 * debugging: DOMElement
 */
let ele = new DOMElement(document.getElementById('btn--home'));
ele.hide();
console.log(ele);
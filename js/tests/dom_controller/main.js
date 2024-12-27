console.log('Working...');
/**
 * @typedef {import("../../components/component__dom-element/dom-controller").DOMController} DOMController
 */
import { DOMController } from "../../components/component__dom-element/dom-controller.js";
let ele = new DOMController(document.getElementById('btn--home'));
ele.hide();
console.log(ele);
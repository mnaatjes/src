/**
 * @module DOMController
 * @module DOMElement
 */
import { DOMController } from "../src/core/dom-controller/dom-controller.js";
/**
 * debugging DOMController
 */
const app = new DOMController();
const test = app.createComponent('div', {
    styles: {
        border: '1px solid red',
        borderRadius: '8px',
        padding: '12px'
    },
    children: [
        'h1', {textContent: 'I am a Title'}
    ]
});
const button = app.createComponent('<button>I am a button</button>');
console.log(test);
test.mount();
button.mount();
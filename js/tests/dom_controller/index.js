/*----------------------------------------------------------*/
/**
 * @file src/js/tests/dom_controller/index.js
 */
/*----------------------------------------------------------*/
/**
 * @implements {DOMController}
 */
const ele = new DOMController(document.getElementById('link--home'));
console.log(ele);
/**
 * Debugging
 */
//console.log(ele.state.current);
/*
console.log(`--------SuperStates--------`);
console.error(`Default: ${state.Default}`);
console.error(`Init: ${state.Init}`);
console.error(`Live: ${state.Live}`);
console.error(`Error: ${state.Error}`);
console.log(`--------ParentStates--------`);
console.error(`Mounted: ${state.mounted}`);
state.debugging();*/
/**
 * @description DOMElement and DOMController Spec
 */
/*
const element = new DOMElement(
    document.getElementById(''), // dom element or create element
    'id-of-element', // id of element --> search for or create
    'h3' // search for or create
);
let params = {
    id: 'string',
    tagName: 'h3',
    element: document.getElementById(),
    styles: ['className', 'className'], // or styles: 'string'
    parent: document.getElementById(), // or string-id
    children: ['params', 'params']
};
*/
/**
 * test getDOMStructure
 * returns object of DOM elements
 */

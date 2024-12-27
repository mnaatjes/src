/*----------------------------------------------------------*/
/**
 * @file src/js/tests/dom_controller/index.js
 */
/*----------------------------------------------------------*/

/**
 * @implements {DOMController}
 */
const ele = new DOMController(document.getElementById('btn--home'));
console.log(ele.children)
let x = ele.read();
console.log(x);
/**
 * Debugging
 */


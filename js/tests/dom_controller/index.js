/*----------------------------------------------------------*/
/**
 * @file src/js/tests/dom_controller/index.js
 */
/*----------------------------------------------------------*/
/**
 * @implements {DOMController}
 */
const ele = new DOMController(document.getElementById('link--home'));
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
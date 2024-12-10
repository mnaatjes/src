/*----------------------------------------------------------*/
/**
 * @file src/js/tests/dom_controller/index.js
 */
/*----------------------------------------------------------*/
/**
 * @implements {DOMController}
 */
//const test = new DOMController(document.getElementById('input--aria'));
/**
 * @implements {ElementState}
 */
//const state = new ElementState(document.createElement('div'));
//const state = new ElementState(document.getElementById('header--home'));
//const state = new ElementState(document.getElementById('btn--listen'));
const ele   = new DOMController(document.getElementById('btn--listen'));
ele.onMouseOver(function(){console.log('callback function works');});
ele.onClick(function(e){console.log('click'); console.log(e);});
ele.removeOnClick();
/**
 * Debugging
 */
/*
console.log(`--------SuperStates--------`);
console.error(`Default: ${state.Default}`);
console.error(`Init: ${state.Init}`);
console.error(`Live: ${state.Live}`);
console.error(`Error: ${state.Error}`);
console.log(`--------ParentStates--------`);
console.error(`Mounted: ${state.mounted}`);
state.debugging();*/
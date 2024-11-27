/*----------------------------------------------------------*/
/**
 * @file js/src/tests/canvas/index.js
 * 
 * @memberof Src.Tests
 * @namespace Test.Canvas
 */
/*----------------------------------------------------------*/
/**
 * declare DOM elements
 */
const viewport  = document.getElementById('viewport');
viewport.pos    = viewport.getBoundingClientRect();
const canvas    = viewport.querySelector('canvas');
/**
 * set up canvas
 */
canvas.width    = viewport.pos.width - 48;
canvas.height   = viewport.pos.height - 48;
canvas.center   = {
    x: canvas.width / 2,
    y: canvas.height / 2
};
/**
 * determine canvas properties
 */
canvas.A = {x: 0, y: 0};
canvas.B = {x: canvas.width, y: 0};
canvas.C = {x: canvas.width, y: canvas.height};
canvas.D = {x: 0, y: canvas.height};
/**
 * set up context
 */
const ctx = canvas.getContext('2d');
console.log(ctx);
/**
 * quadtree
 */
const quad = new Quadtree(canvas);
/**
 * set start time
 * set previous time
 */
const startTime     = parseFloat(performance.now().toFixed(4));
let previousTime    = startTime;
/**
 * @name draw
 * @type {Function}
 * @memberof Canvas
 */
function draw(timestamp){
    /**
     * set timestamp
     */
    if(!timestamp){
        timestamp = startTime;
    }
    /**
     * set delta time
     * set elapsed time
     */
    let deltaTime   = timestamp - previousTime;
    let elapsedTime = parseFloat(((timestamp - startTime) * 0.001).toFixed(4));
    console.log(`ELAPSED: ${elapsedTime}`);
    /**
     * clear canvas
     */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /**
     * update previous
     */
    previousTime = timestamp;
    /**
     * request animation
     */
    //requestAnimationFrame(draw);
}
/**
 * run
 */
requestAnimationFrame(draw);
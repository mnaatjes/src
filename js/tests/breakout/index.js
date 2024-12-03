/*----------------------------------------------------------*/
/**
 * @file js/src/tests/breakout/index.js
 * 
 * @memberof Src.Tests
 * @namespace Test.Breakout
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
 * set up context
 */
const ctx = canvas.getContext('2d');
/**
 * Quadtree Constants
 */
const capacity          = 2;
const boundary          = new CanvasRect(0, 0, canvas.width, canvas.height);
boundary.strokeColor    = 'red';
const quad              = new Quadtree(boundary, capacity);
/**
 * circle
 */
const ball = new CanvasCircle(100, 100, 10, 'red');
/**
 * animation theatre
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
    //console.log(`ELAPSED: ${elapsedTime}`);
    /**
     * clear canvas
     */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /**
     * render circle
     */
    ball.drawCircle(ctx);
    ball.v  = {mag: 1.5, theta: 45};
    ball.update();
    console.log(ball.displacement);
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
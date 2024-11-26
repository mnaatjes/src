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
 * set up context
 */
const ctx = canvas.getContext('2d');
/**
 * test rectangle
 */
const rect = new CanvasRect(-10, -10, 20, 20);
/**
 * debugging getters
 */
console.log(rect.sides);
/**
 * debugging setters
 */
/**
 * set start time
 * 4 decimal places
 */
const start = parseFloat(performance.now().toFixed(4));
/**
 * rect properties
 */
rect.fillColor      = 'red';
rect.strokeColor    = 'black';
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
        timestamp = start;
    }
    /**
     * calc elapsed time
     * 4 decimal places
     * in seconds
     */
    let elapsed = parseFloat(((timestamp - start) * 0.001).toFixed(4));
    /**
     * clear canvas
     */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /**
     * draw rect
     */
    rect.drawRect(ctx);
    rect.x += 0.20;
    rect.y += 0.20;
    /**
     * move rect
     * TODO: if change angle of velocity vector --> velocity should adjust x, y components
     */
    console.log(`DIST: ${rect.dist}`);
    console.log(`DIR: ${rect.dir}`);
    console.log(`TOTAL DIST: ${rect.totalDist}`);
    console.log(`Elapsed: ${elapsed}`);
    /**
     * change direction
     */
    if(elapsed >= 4.0){
        rect.x += 0.25;
        rect.y -= 0.25;
    }
    /**
     * set direction
     */
    rect.dir = rect.calcDirection();
    /**
     * request animation
     */
    //requestAnimationFrame(draw);
}
/**
 * run
 */
requestAnimationFrame(draw);

/**
 * test getter setter
 */
/*
class Person {
    constructor(fname, lname){
        this.fname  = fname;
        this.lname  = lname;
        this.num    = null;
    }
    get fullName(){
        console.log('SET fullName');
        return `${this.fname} ${this.lname}`;
    }
    get root(){
        console.log('GET root');
        return Math.sqrt(this.num);
    }
    set root(value){
        console.log('SET Root: this.num defined');
        this.num = Math.pow(value, 2);
    }
}
let gemi    = new Person('Gemini', 'Naatjes');
gemi.num    = 25;
gemi.root;
gemi.root   = 4;
*/
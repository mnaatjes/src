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
const rect = new CanvasRect(50, 50, 50, 50);
rect.fillColor      = 'red';
rect.strokeColor    = 'black';
/**
 * @name draw
 * @type {Function}
 * @memberof Canvas
 */
function draw(){
    /**
     * clear canvas
     */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /**
     * draw rect
     */
    rect.drawRect(ctx);
    console.log(rect.x);
    console.log(rect.cx);
    /**
     * move rect
     */
    rect.x += 1;
    rect.update()
    /**
     * request animation
     */
    //requestAnimationFrame(draw);
}
rect.test = 'dog';
/**
 * run
 */
requestAnimationFrame(draw);

/**
 * test getter setter
 */
class Person {
    constructor(fname, lname){
        this.fname  = fname;
        this.lname  = lname;
        this.num    = null;
    }
    get fullName(){
        return `${this.fname} ${this.lname}`;
    }
    get root(){
        return Math.sqrt(this.num);
    }
    set root(value){
        this.num = Math.pow(value, 2);
    }
}
let gemi = new Person('Gemini', 'Naatjes');
console.log(gemi.fullName);
gemi.num = 25;
console.log(gemi.root);
gemi.root = 4;
console.log(gemi.num);
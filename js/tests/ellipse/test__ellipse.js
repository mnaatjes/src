/*----------------------------------------------------------*/
/**
 * @file src/js/tests/test__ellipse.js
 * @author mnaatjes
 * @version 1.0.0
 * @date    11-24-2024
 * 
 * @memberof Ellipse
 * @namespace TestEllipse
 * 
 * @type {Math}
 * @description for an ellipse a > b
 * @param {Number} x origin-x
 * @param {Number} y origin-y
 * @param {Number} a semi-major axis (x-axis / horizontal)
 * @param {Number} b semi-minor axis (y-axis / vertical)
 */
/*----------------------------------------------------------*/
/**
 * @name angle
 */
let angle = 0;
/**
 * @name scale
 */
function scale(num){
    return num * 30;
}
/**
 * @name viewport
 * @type {CanvasDrawImage}
 */
const canvas        = document.getElementById('viewport');
canvas.width        = 400;
canvas.height       = 400;
const ctx           = canvas.getContext('2d');

const data_venus    = orbital_elements[4];
const orbit_venus   = new Ellipse(scale(data_venus.semiMajorAxis), scale(data_venus.semiMinorAxis), 200, 200);
const shape         = orbit_venus;
//const shape = 
/**
 * switch x, y
 */
let cx;
let cy;
if(shape.h == null && shape.k == null){
    cx = shape.x;
    cy = shape.y;
} else {
    cx = shape.h;
    cy = shape.k;
}
/**
 * @name drawCircle
 */
function drawCircle(x, y, r, color){
    /**
     * render circle
     */
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}
/**
 * @name drawBlock
 */
function renderPlanet(){
    /**
     * clear rect
     */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /**
     * draw circle
     */
    drawCircle(200, 200, 25, 'orange');
    /**
     * draw ellipse
     */
    ctx.beginPath();
    ctx.ellipse(cx, cy, shape.a, shape.b, 0, 0, 2 * Math.PI);
    ctx.stroke();
    /**
     * @name block
     */
    const planet = {
        w: 10,
        h: 10,
        pos: shape.getPoint(angle)
    };
    //console.log(`x: ${block.pos.x.toFixed(2)}, y: ${block.pos.y.toFixed(2)}`);
    //console.log(`Parametric Angle: ${shape.getParametricAngle(block.pos.x, block.pos.y)}`);
    //console.log(`Eccentric Angle: ${shape.getEccentricAngle(block.pos.x, block.pos.y)}`);
    /**
     * draw planet
     */
    drawCircle(planet.pos.x, planet.pos.y, planet.w, 'red');
    /**
     * add to angle
     */
    angle += 0.25;
    /**
     * request animation frame
     */
    requestAnimationFrame(renderPlanet);
}

renderPlanet();
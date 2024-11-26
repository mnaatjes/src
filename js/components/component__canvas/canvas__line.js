/*----------------------------------------------------------*/
/**
 * @file js/src/components/component__canvas/canvas__line.js
 * 
 * @name Line
 * @type {Class}
 * @memberof Component.Canvas
 * @namespace Line
 */
/*----------------------------------------------------------*/
class Line{
    constructor(startX, startY, length, weight){
        this.length = length;
        this.weight = weight;
        this.start  = {x: startX, y: startY}
        this.end    = this.getEndCoords(startX, startY, length, weight);
    }
    /*----------------------------------------------------------*/
    /**
     * @name getEndCoords
     * @type {Method}
     * @memberof Line
     * @param {RenderingContext} ctx
     * @param {Number} startX
     * @param {Number} startY
     * @param {Number} length
     * @param {Number} weight
     * @description 
     * @returns {Object} end.x, end.y
     */
    /*----------------------------------------------------------*/
    getEndCoords(startX, startY, length, weight){
        
    }
}
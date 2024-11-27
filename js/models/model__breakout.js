/*----------------------------------------------------------*/
/**
 * @file src/js/models/model__breakout.js
 * @author mnaatjes
 * @version 1.0.0
 * @date  11-24-2024
 * 
 * @memberof Src.Models
 * @name Breakout
 * @namespace Breakout
 */
/*----------------------------------------------------------*/
/*----------------------------------------------------------*/
/**
 * @name Bricks
 * @type {Class}
 * @memberof Breakout
 * @namespace Bricks
 */
/*----------------------------------------------------------*/
class Bricks {
    constructor(rows, cols, canvasWidth, canvasHeight){
        this.rows           = rows;
        this.cols           = cols;
        this.padding        = 25;
        this.brickWidth     = 75;
        this.brickHeight    = 20;
        this.bricks         = this.buildBricks(rows, cols, canvasWidth, canvasHeight);
    }
    /*----------------------------------------------------------*/
    /**
     * @name buildBricks
     * @type {Method}
     * @param {Number} rows
     * @param {Number} cols
     * @param {Number} cW canvas width
     * @param {Number} ch canvas height
     * @property {Number} padding 
     */
    /*----------------------------------------------------------*/
    buildBricks(rows, cols, canvasWidth, canvasHeight){
        /**
         * @name res
         * @type {Array}
         */
        let res = [];
        /**
         * calculate margins
         */
        let fieldWidth  = cols * (this.brickWidth + this.padding);
        let marginX     = (canvasWidth - fieldWidth) / 2;
        console.log(marginX);
        /**
         * loop cols
         */
        for(let col = 0; col < cols; col++){
            /**
             * declare res cols arr
             */
            res[col] = [];
            /**
             * loop rows
             */
            for(let row = 0; row < rows; row++){
                let x           = col * (this.brickWidth + this.padding);
                let y           = row * (this.brickHeight + this.padding);
                res[col][row]   = new CanvasRect(x + marginX, y + this.padding, this.brickWidth, this.brickHeight);
                /**
                 * set attributes
                 */
                res[col][row].fillColor = '#0095DD';
            }
        }
        return res;
    }
    /*----------------------------------------------------------*/
    /**
     * @name drawBricks
     * @type {Method}
     * @memberof Bricks
     * @param {RenderingContext} ctx
     */
    /*----------------------------------------------------------*/
    drawBricks(ctx){
        this.bricks.forEach(col => {
            col.forEach(brick => {
                brick.drawRect(ctx);
            });
        });
    }
}
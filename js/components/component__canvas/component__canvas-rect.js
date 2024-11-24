/*----------------------------------------------------------*/
/**
 * @file objects/obj__rect.js
 * 
 * @name Rect
 * @type {Class}
 * @memberof CoinBreakdown
 * @namespace Rect
 */
/*----------------------------------------------------------*/
class Rect{
    constructor(x, y, width, height){
        this.x          = x;
        this.y          = y;
        this.width      = width;
        this.height     = height;
    }
    /*----------------------------------------------------------*/
    /**
     * @name initRect
     * @type {Method}
     * @memberof Rect
     * @description 
     */
    /*----------------------------------------------------------*/
    initRect(){}
    /*----------------------------------------------------------*/
    /**
     * @name drawRect
     * @type {Method}
     * @memberof Rect
     * @param {Object} ctx
     * @description
     */
    /*----------------------------------------------------------*/
    drawRect(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    /*----------------------------------------------------------*/
    /**
     * @name updateRect
     * @type {Method}
     * @memberof Rect
     * @description
     */
    /*----------------------------------------------------------*/
    updateRect(){
        this.x += 0;
        this.y += 0;
    }
}
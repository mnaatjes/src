/*----------------------------------------------------------*/
/**
 * @file js/src/components/component__canvas/canvas__circle.js
 * 
 * @name CanvasCircle
 * @type {Class}
 * @memberof Component.Canvas
 * @namespace CanvasCircle
 */
/*----------------------------------------------------------*/
class CanvasCircle extends Circle{
    constructor(h, k, r, strokeColor, fillColor=null){
        super(h, k, r);
        /**
         * @name strokeColor
         * @memberof CanvasEllipse
         * @type {String}
         */
        this.strokeColor = strokeColor;
        /**
         * @name fillColor
         * @memberof CanvasEllipse
         * @type {String}
         */
        this.fillColor = fillColor;
    }
    /*----------------------------------------------------------*/
    /**
     * @name drawCircle
     * @type {Method}
     * @memberof CanvasCircle
     * @param {CanvasCon} ctx
     * @description
     */
    /*----------------------------------------------------------*/
    drawCircle(ctx){
        /**
         * save canvas context
         */
        ctx.save();
        /**
         * render ellipse
         * style color
         */
        ctx.beginPath();
        ctx.strokeStyle = this.strokeColor;
        /**
         * determine fill
         */
        if(this.fillColor !== null){
            ctx.fillStyle = this.fillColor;
        }
        /**
         * render circle
         */
        ctx.arc(this.h, this.k, this.r, 0, 2 * Math.PI);
        /**
         * render stroke
         * render fill
         */
        ctx.stroke();
        if(this.fillColor !== null){
            ctx.fill();
        }
        /**
         * restore canvas context
         */
        ctx.restore();
    }
}
/*----------------------------------------------------------*/
/**
 * @file js/src/components/component__canvas/canvas__ellipse.js
 * 
 * @name CanvasEllipse
 * @type {Class}
 * @memberof Component.Canvas
 * @namespace CanvasEllipse
 */
/*----------------------------------------------------------*/
class CanvasEllipse extends Ellipse{
    constructor(a, b, h=null, k=null){
        super(a, b, h, k);
        /**
         * @name strokeColor
         * @memberof CanvasEllipse
         * @type {String}
         */
        this.strokeColor = '#333333';
        /**
         * @name fillColor
         * @memberof CanvasEllipse
         * @type {String}
         */
        this.fillColor = null;
    }
    /*----------------------------------------------------------*/
    /**
     * @name drawEllipse
     * @type {Method}
     * @memberof CanvasEllipse
     * @param {Object} ctx
     * @description
     */
    /*----------------------------------------------------------*/
    drawEllipse(ctx){
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
         * determine type of ellipse
         * for ellipse where a > b
         */
        if(this.a >= this.b){
            /**
             * determine origin
             * origin at (x, y)
             */
            if((this.h == 0 && this.k == 0) || this.h == null && this.k == null){
                ctx.ellipse(this.x, this.y, this.a, this.b, 0, 0, 2 * Math.PI);
            /**
             * origin at (h, k)
             */
            } else {
                ctx.ellipse(this.h, this.k, this.a, this.b, 0, 0, 2 * Math.PI);
            }
        }
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
    /*----------------------------------------------------------*/
    /**
     * @name moveEllipse
     * @type {Method}
     * @memberof Rect
     * @param {Number} x
     * @param {Number} y
     * @description
     */
    /*----------------------------------------------------------*/
    moveEllipse(x, y){}
}
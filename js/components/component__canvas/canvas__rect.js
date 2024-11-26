/*----------------------------------------------------------*/
/**
 * @file js/src/components/component__canvas/canvas__rect.js
 * 
 * @name CanvasRect
 * @type {Class}
 * @memberof Component.Canvas
 * @namespace CanvasRect
 */
/*----------------------------------------------------------*/
class CanvasRect extends Rectangle {
    constructor(x, y, width, height=null){
        super(x, y, width, height);
        /**
         * @name strokeColor
         * @memberof CanvasRect
         * @type {String}
         */
        this.strokeColor = null;
        /**
         * @name strokeWidth
         * @memberof CanvasRect
         * @type {String}
         */
        this.strokeWidth = 1;
        /**
         * @name fillColor
         * @memberof CanvasRect
         * @type {String}
         */
        this.fillColor = null;
    }
    /*----------------------------------------------------------*/
    /**
     * @name drawRect
     * @type {Method}
     * @memberof CanvasRect
     * @param {Object} ctx
     * @description
     */
    /*----------------------------------------------------------*/
    drawRect(ctx){
        /**
         * pause ctx
         */
        ctx.save();
        /**
         * if fill color set
         * fill rectangle
         */
        if(this.fillColor !== null){
            /**
             * set fill color
             */
            ctx.fillStyle = this.fillColor;
            /**
             * check rotation
             */
            if(this.rotation > 0){
                /**
                 * translate rect to center
                 * rotate context
                 */
                ctx.translate(this.cx, this.cy);
                ctx.rotate(this.rotation * Math.PI / 180);
                /**
                 * render rect with rotation
                 */
                ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
            } else {
                /**
                 * render rect with zero rotation
                 */
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }

        }
        /**
         * if stroke color set
         * outline rectangle
         */
        if(this.strokeColor !== null){
            /**
             * set stroke color
             * set stroke width
             */
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth   = this.lineWidth;
            /**
             * check rotation
             */
            if(this.rotation > 0){
                /**
                 * render rotated rect
                 */
                ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
            } else {
                /**
                 * render rect with zero rotation
                 */
                ctx.strokeRect(this.x, this.y, this.width, this.height);
            }
        /**
         * no stroke or fill defined
         */
        } else if(this.fillColor === null && this.strokeColor === null){
            console.error('No Fill or Stroke Defined');
        }
        /**
         * resume ctx
         */
        ctx.restore();
    }
    /*----------------------------------------------------------*/
    /**
     * @name updateRect
     * @type {Method}
     * @memberof CanvasRect
     * @param {Number} x
     * @param {Number} y
     * @description
     */
    /*----------------------------------------------------------*/
    updateRect(x, y){
        this.x += x;
        this.y += y;
    }
}
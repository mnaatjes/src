/**
 * @function setCanvasSize
 * @param {HTMLElement} canvas
 * @param {RenderingContext} ctx
 * @param {Object} size
 * @param {Number} size.x 
 * @param {Number} size.y
 * @property {Number} dpr - device pixel ratio
 * @property {Object} rect - Canvas Rectangle
 */
export function setCanvasSize(canvas, ctx, size={x:640, y: 480}){
    /**
     * Set Style height and width
     */
    canvas.style.width  = size.x + 'px';
    canvas.style.height = size.y + 'px';
    /**
     * Properties
     */
    const dpr   = window.devicePixelRatio;
    const rect  = canvas.getBoundingClientRect();
    /**
     * Set Canvas width and height
     */
    canvas.width    = rect.width * dpr;
    canvas.height   = rect.height * dpr;
    /**
     * Scale Canvas
     */
    ctx.scale(dpr, dpr);
}
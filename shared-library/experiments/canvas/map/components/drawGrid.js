/**
 * @file canvas/map/components/drawGrid.js
 * @function drawGrid
 * @param {HTMLElement} canvas
 * @param {RenderingContext} ctx
 * @param {Object} gridSize
 */
export function drawGrid(canvas, ctx, gridSize={x: 10, y:10}){
    const w = canvas.width;
    const h = canvas.height;
    console.log(w);
    console.log(h);
    /**
     * Color grid lines and width
     */
    ctx.strokeStyle = '#333';
    ctx.lineWidth   = 1;
    /**
     * draw verticals
     */
    for(let x = 0; x <= gridSize.x; x++){
        const posX = x * (w / gridSize.x);
        ctx.beginPath();
        ctx.moveTo(posX, 0);
        ctx.lineTo(posX, h);
        ctx.stroke();
    }
    /**
     * draw horizontals
     */
    for(let y = 0; y <= gridSize.y; y++){
        const posY = y * (h / gridSize.y);
        ctx.beginPath();
        ctx.moveTo(0, posY);
        ctx.lineTo(w, posY);
        ctx.stroke();
    }
}
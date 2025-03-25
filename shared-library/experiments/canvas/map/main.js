/**
 * @file canvas/map/main.js
 */

import { drawGrid } from "./components/drawGrid.js";
import { drawMap } from "./components/drawMap.js";
import { mapData } from "./constants/mapData.js";
import { diamondSquare, printDiamondSquare } from "./utils/diamondSquare.js";
import { setCanvasSize } from "./utils/setCanvasSize.js";
/**
 * @type {HTMLElement} canvas
 */
const canvas = document.getElementById('viewport');
/**
 * @type {RenderingContext} ctx
 */
const ctx = canvas.getContext('2d');
/**
 * Set Dimensions
 */
setCanvasSize(canvas, ctx, {x: 3200, y: 3200});
/**
 * Test Grid
 */
//drawGrid(canvas, ctx, {x:8, y:8});
/**
 * Test Map
 */
//console.log(mapData);
const arr = diamondSquare(9, 0.125, {min: 0.0, max: 8000, step: 10});
const mainMap = arr.map((row) => {
    return row.map((tile) => {
        return diamondSquare(16, 0.25, {
            min: (tile - 1000) > 0 ? tile - 1000 : 0, 
            max: tile, 
            step: 10
        });
    })
});
/**
 * Debugging
 * Draw test map
 */
ctx.clearRect(0, 0, canvas.width, canvas.height);
const rows      = mainMap.length;
const cols      = mainMap[0].length;
const scale     = 1.0;
//console.log(`rows: ${rows}, cols: ${cols}`);
//console.log(mainMap);
//console.log('---------------');
for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
        /**
         * Debugging
         */
        //console.log(`row: ${row}, col: ${col}`);
        /**
         * Tile Properties
         */
        const tile      = mainMap[row][col];
        const tileSize  = tile.length * scale;
        const tileCount = tile.length;
        /**
         * Grid Square Properties
         */
        const gridSqr = tileSize * tileCount;
        const gx = col * gridSqr;
        const gy = row * gridSqr;
        //console.log(`gx: ${gx}, gy: ${gy}`);
        /**
         * Render Grid
         */
        ctx.strokeStyle = '#333';
        ctx.lineWidth   = 1;
        ctx.strokeRect(gx, gy, gridSqr, gridSqr);
        /**
         * Parse Tile Arrays
         */
        for(let tileRow = 0; tileRow < tile.length; tileRow++){
            for(let tileCol = 0; tileCol < tile[0].length; tileCol++){
                /**
                 * get pixed
                 */
                const pixel = tile[tileRow][tileCol];
                /**
                 * Define x and y coords
                 */
                const x = col * gridSqr + tileCol * tileSize;
                const y = row * gridSqr + tileRow * tileSize;
                console.log(`x: ${x}, y: ${y}`);
                /**
                 * Draw
                 */
                //const color     = (pixel > 5000) ? 'tan' : (pixel <= 5000 && pixel > 1000) ? 'green' : 'blue';
                ctx.fillStyle   = heatmapColor(pixel);
                ctx.fillRect(x, y, tileSize * scale, tileSize * scale);
            }
        }
        console.log('-------------------------------');
    }
}
console.log(heatmapColor(7888));
/**
 * @function heatmapColor
 * @param {Number} elevation
 * 
 * @property {Number} normal - normalized color value
 * @property {Array} colorStops
 * 
 * @returns {String} - color hex value
 */
function heatmapColor(elevation){
    const normal = elevation / 8000;
    const colorStops = [
        {pos: 0.00, color: {r: 0, g: 0, b: 255}},
        {pos: 0.25, color: {r: 0, g: 255, b: 0}},
        {pos: 0.50, color: {r: 255, g: 255, b: 0}},
        {pos: 0.75, color: {r: 255, g: 165, b: 0}},
        {pos: 1.00, color: {r: 255, g: 0, b: 0}}
    ];
    /**
     * Find color stops
     */
    let lower, upper;
    for(let i = 0; i < colorStops.length; i++){
        if(normal >= colorStops[i].pos && normal <= colorStops[i + 1].pos){
            lower = colorStops[i];
            upper = colorStops[i + 1];
            break;
        }
    }
    if(!lower || !upper){
        if(normal === 0){
            lower = colorStops[0];
            upper = colorStops[0];
        } else if (normal === 1){
            lower = colorStops[colorStops.length - 1];
            upper = colorStops[colorStops.length - 1];
        } else {
            /**
             * Return default value
             */
            return '#000000';
        }
    }
    /**
     * Interpolate Color
     */
    const range = upper.pos - lower.pos;
    const pos   = (normal - lower.pos) / range;
    /**
     * Declare RGB
     */
    const r = Math.round(lower.color.r + (upper.color.r - lower.color.r) * pos);
    const g = Math.round(lower.color.g + (upper.color.g - lower.color.g) * pos);
    const b = Math.round(lower.color.b + (upper.color.b - lower.color.b) * pos);
    /**
     * Convert to hex color value
     */
    const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return '#' + hex;
}
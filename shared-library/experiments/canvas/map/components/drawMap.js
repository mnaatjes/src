import { mapData, tileSize } from "../constants/mapData.js";
import { defineConfig } from "../utils/defineConfig.js";

/**
 * @function drawMap
 * @param {HTMLElement} canvas
 * @param {RenderingContext} ctx
 * @param {Array} data - map data in 2D array
 * 
 * @property {Number} tileSize
 */
export function drawMap(canvas, ctx, data=[]){
    /**
     * Properties
     */
    const rows      = data.length;
    const cols      = data[0].length;
    /**
     * Clear canvas
     */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /**
     * Draw map based on map data
     */
    for(let y = 0; y < rows; y++){
        for(let x = 0; x < cols; x++){
            const tile = data[y][x];
            /**
             * Load and render terrain feature
             */
            tile.terrain.img.onload = () => {
                ctx.drawImage(tile.terrain.img, x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }
}

import { mapTile, terrainTypes, tileSize } from "../constants/mapData.js";
import { deepCopy } from "../utils/deepCopy.js";
import { generateRandomIndex } from "../utils/randomIndex.js";
/**
 * @function generateMap
 * @param {Object} config
 * @param {Number} config.cols
 * @param {Number} config.rows
 * @param {Number} config.tileSize
 * 
 * @property {Number} tileSize
 * @property {Object} mapTile
 * @property {Array} terrainTypes
 * 
 * @returns {Array} - 2D array of map data containing tile objects
 */
export function generateMap(config={
    cols: 5,
    rows: 5,
    tileSize: tileSize
}){
    /**
     * Return 2D Array of mapData
     * 1) Render Cols
     * 2) Render Rows
     */
    return Array.from({length: config.rows}, (_, i) => {
        /**
         * Return Columns
         */
        return Array.from({length: config.cols}, (_, j) => {
            /**
             * Return Generated Tile
             */
            return generateTile();
        });
    });
}
/**
 * @function generateTile
 * @property {Object} tile
 * @property {Object} mapTile
 * @returns {Object} - completed tile
 */
function generateTile(){
    /**
     * Properties
     */
    const tile = deepCopy(mapTile);
    /**
     * Generate Terrain
     */
    tile.terrain = generateTerrain(tile.terrain);
    /**
     * Return Completed Tile
     */
    return tile;
}
/**
 * @function generateTerrain
 * @param {Object} terrain
 * @returns {Object} - terrain object defined
 */
function generateTerrain(terrain){
    terrain.type       = terrainTypes[generateRandomIndex(terrainTypes)];
    terrain.img        = new Image();
    terrain.img.src    = 'assets/' + terrain.type + '.png';
    /**
     * Return
     */
    return terrain;
}
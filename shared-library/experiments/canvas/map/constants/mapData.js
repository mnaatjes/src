import { generateMap } from "../utils/generateMap.js";

/**
 * @const {Object} mapTile - Data structure for map tile defining default properties
 */
export const mapTile = {
    terrain: {
        type: undefined,
        img: undefined
    },
    occupied: false
};
/**
 * @const {Array} terrainTypes - String values of terrain features
 */
export const terrainTypes = [
    'grassland',
    'plains',
    'desert',
    'tundra',
    'hills',
    'mountains',
    'forest',
    'rainforest',
    'marsh',
    'oasis',
    'floodplains',
    'coast',
    'ocean',
];
/**
 * @const {Number} tileSize
 */
export const tileSize = 72;
/**
 * @const {Array} mapData - Test map data
 */
export const mapData = generateMap();
/**
 * @function defineConfig - Defines configuration object for tile map
 * @param {HTMLElement} canvas - canvas html element
 * @param {RenderingContext} ctx - canvas 2d context
 * @param {Array} data - tile map data
 * 
 * @returns {Object} - config object with all properties necessary for drawing tile map
 */
export function defineConfig(canvas, ctx, data, tileSize){
    /**
     * Generate an object instance and return
     */
    return new class {
        constructor(){
            /**
             * @property {Object} camera
             */
            this.camera = {
                x: 200,
                y: 120
            };
            /**
             * @property {Object} tile
             */
            this.tile   = {
                start: {
                    x: Math.floor(this.camera.x / tileSize),
                    y: Math.floor(this.camera.y / tileSize)
                },
                end: {
                    x: Math.ceil((this.camera.x + width) / tileSize),
                    y: Math.ceil((this.camera.y + height) / tileSize)
                }
            };
            /**
             * @property {Object} clamp
             */
            this.clamp  = {
                start: {
                    x: Math.max(0, this.tile.start.x),
                    y: Math.max(0, this.tile.start.y)
                },
                end: {
                    x: Math.min(cols, this.tile.end.x),
                    y: Math.min(rows, this.tile.end.y)
                }
            };
        }
   };
}
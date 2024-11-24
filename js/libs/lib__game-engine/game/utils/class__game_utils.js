/*----------------------------------------------------------*/
/**
 * @file game/utils/class__game-utils.js
 * @name GameUtils
 * @type {Class}
 * @namespace GameUtils
 * @description detect collision between multiple objects
 *              collission conditions
 *              return boolean for each object
 *              return object associated with boolean value
 *              append boolean value to object state in Game class
 * @returns {Object}
 */
/*----------------------------------------------------------*/
class GameUtils{
    /*----------------------------------------------------------*/
    /**
     * @name Constructor
     * @type {Method}
     * @memberof GameUtils
     * @property {} 
     * @description
     */
    /*----------------------------------------------------------*/
    constructor(){}
    /*----------------------------------------------------------*/
    /**
     * @name initGameUtils
     * @type {Method}
     * @memberof GameUtils
     * @property {} 
     * @description
     */
    /*----------------------------------------------------------*/
    initGameUtils(){
        /**
         * @implements this.getRects
         */
        let rects = this.getRects();
        /**
         * @description loop rectangles and calculate distances
         * @implements this.calculateDistances
         */
        for(let i = 0; i < rects.length; i++){
            let rect_a = rects[i];
            // loop each rect again to compare
            for(let j = 0; j < rects.length; j++){
                let rect_b = rects[j];
                // filter out same object
                if(rect_a !== rect_b){
                    /**
                     * @implements this.calculateDistances
                     */
                    this.calculateDistances(rect_a, rect_b);
                    /**
                     * @implements this.detectCollisions
                     */
                    this.detectCollisions(rect_a, rect_b);
                }
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name getRects
     * @type {Method}
     * @memberof GameUtils
     * @param {Object} this
     * @description
     */
    /*----------------------------------------------------------*/
    getRects(){
        let rects       = [];
        let properties  = Object.entries(this);
        // loop properties
        properties.forEach((property) => {
            // get property key / values
            let prop_name   = property[0];
            let prop_value  = property[1];
            // sort instances of Rect Class
            if(prop_value instanceof Rect){
                // push to rects array
                rects.push({key: prop_name, prop: prop_value});
            }
        });
        // return array
        return rects;
    }
    /*----------------------------------------------------------*/
    /**
     * @name calculateDistances
     * @type {Method}
     * @memberof GameUtils
     * @param {Object} sprite_a
     * @param {Object} sprite_b
     * @property {} 
     * @description
     */
    /*----------------------------------------------------------*/
    calculateDistances(rect_a, rect_b){
        /**
         * set properties
         */
        let sprite_a    = rect_a.prop;
        let key_b       = rect_b.key;
        let sprite_b    = rect_b.prop;
        /**
         * @name center distance from centers
         * @type {Object}
         * @memberof calculateDistance
         * @param {Object} sprite_a
         * @param {Object} sprite_b
         * @description distance between centers
         * @returns {Object} distance.centers.x, distance.centers.y
         */
        let center = parseFloat(
            Math.sqrt(
                Math.pow(sprite_b.centroid.x - sprite_a.centroid.x, 2)
                +
                Math.pow(sprite_b.centroid.y - sprite_a.centroid.y, 2)
            ).toFixed(2)
        );
        /**
         * @name sep minimum seperation distance needed
         * @type {Object}
         * @memberof calculateDistance
         * @param {Object} sprite_a
         * @param {Object} sprite_b
         * @description distance between centers
         * @returns {Object} distance.centers.x, distance.centers.y
         */
        let sep = {
            x: sprite_a.semi.w + sprite_b.semi.w,
            y: sprite_a.semi.h + sprite_b.semi.h
        };
        /**
         * @description insert properties into rect objects
         */
        sprite_a.distances.push({key: key_b, center: center, sep: sep});
    }
    /*----------------------------------------------------------*/
    /**
     * @name detectCollisions
     * @type {Method}
     * @memberof GameUtils
     * @namespace detectCollisions
     * @param {Object} rect_a
     * @param {Object} rect_b
     * @property {} 
     * @description
     */
    /*----------------------------------------------------------*/
    detectCollisions(rect_a, rect_b){
        /**
         * set properties: Rect objects
         */
        let sprite_a    = rect_a.prop;
        let key_b       = rect_b.key;
        let sprite_b    = rect_b.prop;
        /**
         * @name condition
         * @type {Object}
         * @memberof detectCollisions
         */
        let condition = {
            left: function(sprite_a, sprite_b){return sprite_a.x < (sprite_b.x + sprite_b.width);},
            right: function(sprite_a, sprite_b){return (sprite_a.x + sprite_a.width) > sprite_b.x;},
            top: function(sprite_a, sprite_b){return (sprite_a.y + sprite_a.height) > sprite_b.y;},
            bottom: function(sprite_a, sprite_b){return sprite_a.y < (sprite_b.y + sprite_b.height);}
        };
        /**
         * @name isInsideRect
         * @type {Function}
         * @memberof detectCollisions
         * @description
         */
        function isInsideRect(sprite_a, sprite_b){
            let results = {};
            Object.entries(sprite_a.vertex).forEach(vertex => {
                /**
                 * 
                 */
                let key = vertex[0];
                let x   = vertex[1].x;
                let y   = vertex[1].y;
                if(
                    x >= sprite_b.x &&
                    x <= sprite_b.x + sprite_b.width &&
                    y >= sprite_b.y &&
                    y <= sprite_b.y + sprite_b.height
                ){results[key] = {x: x, y: y};}
            });
            return results;
        }
        let intersects = isInsideRect(sprite_a, sprite_b);
        /**
         * @name areaOfOverlap
         * @type {Object}
         * @memberof detectCollisions
         * @description
         */
        /**
         * @description insert properties into intersects
         */
        sprite_a.intersects.push({key: key_b, intersects: intersects});
        /**
         * @description insert properties into collisions
         */
        sprite_a.collisions.push({key: key_b});
    }
}
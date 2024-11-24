/*----------------------------------------------------------*/
/**
 * @file game/utils/function__collisions.js
 * @name detectCollision
 * @type {Function}
 * @memberof Game.utils
 * @param {Object} sprites
 * @description detect collision between multiple objects
 *              collission conditions
 *              return boolean for each object
 *              return object associated with boolean value
 *              append boolean value to object state in Game class
 * @returns {Object}
 */
/*----------------------------------------------------------*/
function detectCollision(sprites){
    
    // TODO: Report where on sprite object has collided

    let condition = {
        left: function(sprite_a, sprite_b){return sprite_a.x < (sprite_b.x + sprite_b.width);},
        right: function(sprite_a, sprite_b){return (sprite_a.x + sprite_a.width) > sprite_b.x;},
        top: function(sprite_a, sprite_b){return (sprite_a.y + sprite_a.height) > sprite_b.y;},
        bottom: function(sprite_a, sprite_b){return sprite_a.y < (sprite_b.y + sprite_b.height);}
    };
    /**
     * capture collision data
     */
    let capture = [];
    /**
     * loop array of sprites and compare
     */
    for(let i = 0; i < sprites.length; i++){
        // properties
        let sprite_a = sprites[i];
        // inner loop for comparison
        for(let j = 0; j < sprites.length; j++){
            let sprite_b = sprites[j];
            // exclude identical objects
            if(sprite_a !== sprite_b){
                // exclude objects already collided with one another
                if(
                    sprite_a.collision === undefined && sprite_b.collision === undefined ||
                    sprite_a.collision === true && sprite_b.collision === undefined ||
                    sprite_a.collision === undefined && sprite_b.collision === true
                ){
                    // apply condition logic
                    if (
                        condition.left(sprite_a, sprite_b) &&
                        condition.right(sprite_a, sprite_b) &&
                        condition.top(sprite_a, sprite_b) &&
                        condition.bottom(sprite_a, sprite_b)
                    ){
                        // output array of collisions
                        capture.push({objects: {a: sprite_a, b: sprite_b}});
                        // modify object
                        sprite_a.collision = true;
                        sprite_b.collision = true;
                        // evaluate collision since collision == true
                        //evaluateCollision(sprite_a, sprite_b);
                    }
                }
            }
        }
    }
    //console.log(capture);
}
/*----------------------------------------------------------*/
/**
 * @file game/utils/function__collisions.js
 * @name evaluateCollision
 * @type {Function}
 * @memberof Game.utils
 * @param {Object} sprite_a
 * @param {Object} sprite_b
 * @description 
 * @returns {Object}
 */
/*----------------------------------------------------------*/
function evaluateCollision(sprite_a, sprite_b){

}
/**
 * a - a
 * a - b
 * a - c
 * a - d
 * b - a
 * b - b
 * b - c
 * b - d
 * c - a
 * c - b
 * c - c
 * c - d
 * d - a
 * d - b
 * d - c
 * d - d
 */
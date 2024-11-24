/*----------------------------------------------------------*/
/**
 * @file index.js
 * @author mnaatjes
 * @name Game
 * @type {Class}
 * @memberof NumberGame
 * @namespace Game
 * @description
 * @source https://www.sitepoint.com/quick-tip-game-loop-in-javascript/
 */
/*----------------------------------------------------------*/
class Game extends GameUtils {
    /*----------------------------------------------------------*/
    /**
     * @name Constructor
     * @type {Method}
     * @memberof Game
     * @param {HTMLElement} parent
     * @param {String} width
     * @param {String} height
     * @description
     */
    /*----------------------------------------------------------*/
    constructor(parent, width, height){
        super();
        /**
         * @name animation_id
         * @type {}
         * @memberof Game
         * @param {}
         * @description
         */
        this.animation_id;
        /**
         * @name 
         * @type {}
         * @memberof Game
         * @param {}
         * @description
         */
        this.parent     = parent;
        /**
         * @name 
         * @type {}
         * @memberof Game
         * @param {}
         * @description
         */
        this.width      = width;
        /**
         * @name 
         * @type {}
         * @memberof Game
         * @param {}
         * @description
         */
        this.height     = height;
        /**
         * @name 
         * @type {}
         * @memberof Game
         * @param {}
         * @description
         */
        this.canvas_obj = this.generateCanvas(width, height);
        /**
         * @name 
         * @type {}
         * @memberof Game
         * @param {}
         * @description
         */
        this.canvas     = this.canvas_obj.canvas;
        /**
         * @name 
         * @type {}
         * @memberof Game
         * @param {}
         * @description
         */
        this.ctx        = this.canvas_obj.context;
        /**
         * @name 
         * @type {}
         * @memberof Game
         * @param {}
         * @description
         */
        //this.blockA = new Rect(10, 100, 50, 50);
        this.blockB = new Rect(100, 100, 400, 200); // red
        this.blockC = new Rect(200, 200, 400, 300); // blue
        //this.blockD = new Rect(400, 125, 75, 75);
        this.blockB.color = 'red';
        this.blockC.color = 'blue';
        /**
         * @name 
         * @type {}
         * @memberof Game
         * @param {}
         * @description
         */
        this.start = 0;
        /**
         * @implements initGame
         */
        this.initGame();
    }
    /*----------------------------------------------------------*/
    /**
     * @name initGame
     * @type {Method}
     * @memberof Game
     * @description
     */
    /*----------------------------------------------------------*/
    initGame(){
        /**
         * display canvas
         */
        this.parent.appendChild(this.canvas);
        /**
         * @name
         * @type {}
         * @memberof
         * @description
         */
        this.fps = 0;
        /**
         * 
         */
        let fps_node = document.getElementById('fps__display');
        /**
         * start loop
         */
        //this.animation_id = window.requestAnimationFrame(() => this.gameLoop(this.start));
        /**
         * debugging
         */
        this.renderGame();
        this.updateGame();
        //this.stopLoop();
    }
    /*----------------------------------------------------------*/
    /**
     * @name generateCanvas
     * @type {Method}
     * @memberof Game
     * @description
     */
    /*----------------------------------------------------------*/
    generateCanvas(width, height){
        /**
         * @name canvas
         * @type {HTMLElement}
         * @memberof generateCanvas
         */
        let canvas = document.createElement('canvas');
        /**
         * @name ctx
         * @type {Object}
         * @memberof generateCanvas
         */
        let ctx = canvas.getContext('2d');
        /**
         * @name ratio
         * @type {Number}
         * @memberof generateCanvas
         * @implements this.getPixelRatio
         */
        let ratio = this.getPixelRatio(ctx);
        /**
         * set canvas attributes
         */
        canvas.width           = Math.round(width * ratio);
        canvas.height          = Math.round(height * ratio);
        canvas.style.width     = width + 'px';
        canvas.style.height    = height + 'px';
        /**
         * scale ctx to get pixel density
         */
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        /**
         * return canvas
         */
        return {canvas: canvas, context: ctx};
    }
/*----------------------------------------------------------*/
    /**
     * @name getPixelRatio
     * @type {Method}
     * @memberof Game
     * @param {Object} ctx context
     * @property {}
     * @returns {Number}
     * @description divide device pixel ratio (window) by backing ratio: result == pixel ratio
     */
    /*----------------------------------------------------------*/
    getPixelRatio(ctx){
        /**
         * @name backing_stores
         * @type {Array}
         */
        let backing_stores = [
            'webkitBackingStorePixelRatio',
            'mozBackingStorePixelRatio',
            'msBackingStorePixelRatio',
            'oBackingStorePixelRatio',
            'backingStorePixelRatio'
        ];
        /**
         * @name device_ratio
         * @global
         * @type {Window}
         * @returns {Number}
         */
        let device_ratio = window.devicePixelRatio;
        /**
         * @name backing_ratio
         * @global
         * @type {Window<Function>}
         * @returns {Number}
         * @description reduce array to single backing store ratio; default == 1
         */
        let backing_ratio = backing_stores.reduce(function(prev, curr){
            return (ctx.hasOwnProperty(curr)? ctx[curr] : 1);
        });
        /**
         * return result
         */
        return device_ratio / backing_ratio;
    }
    /*----------------------------------------------------------*/
    /**
     * @name update
     * @type {Method}
     * @memberof Game
     * @param {} elapsed
     * @description
     */
    /*----------------------------------------------------------*/
    updateGame(elapsed){
        //console.log(elapsed);
        //this.blockA.updateRect();
        this.blockB.updateRect();
        this.blockC.updateRect();
        //this.blockD.updateRect();
        /**
         * @implements this.initGameUtils
         */
        this.initGameUtils();
        //console.log(this.blockB.distances);
        //console.log(this.blockB.collisions);
    }
    /*----------------------------------------------------------*/
    /**
     * @name draw
     * @type {Method}
     * @memberof Game
     * @description
     */
    /*----------------------------------------------------------*/
    renderGame(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        //this.blockA.drawRect(this.ctx);
        this.blockB.drawRect(this.ctx);
        this.blockC.drawRect(this.ctx);
        //this.blockD.drawRect(this.ctx);
    }
    /*----------------------------------------------------------*/
    /**
     * @name loop
     * @type {Method}
     * @memberof Game
     * @param {} timestamp
     * @description
     */
    /*----------------------------------------------------------*/
    gameLoop(timestamp){
        let elapsed = timestamp - this.start;
        /**
         * show fps
         */
        this.showFPS(this.start, timestamp);
        /**
         * update
         */
        this.updateGame();
        /**
         * draw
         */
        this.renderGame();
        /**
         * request frame
         */
        this.start = timestamp;
        window.requestAnimationFrame(() => {this.gameLoop(performance.now())});
    }
    /*----------------------------------------------------------*/
    /**
     * @name showFPS
     * @type {Method}
     * @memberof Game
     * @param {} timestamp
     * @description TODO: Not outputting proper number 0.02s
     */
    /*----------------------------------------------------------*/
    showFPS(start, timestamp){
        let delta = (timestamp - start) / 1000;
        document.getElementById('fps__display').innerHTML = 'FPS: ' + delta.toFixed(2) + 's';
    }
    /*----------------------------------------------------------*/
    /**
     * @name stopLoop
     * @type {Method}
     * @memberof Game
     * @description
     */
    /*----------------------------------------------------------*/
    stopLoop(){
        window.cancelAnimationFrame(this.animation_id);
    }
}
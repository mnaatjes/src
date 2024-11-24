/*----------------------------------------------------------*/
/**
 * @file index.js
 * @author mnaatjes
 * @name Game
 * @type {Class}
 * @memberof NumberGame
 * @namespace Game
 * @description
 * @source https://bengsfort.github.io/articles/making-a-js-game-part-1-game-engine/
 */
/*----------------------------------------------------------*/
class Game {
    /*----------------------------------------------------------*/
    /**
     * @name Constructor
     * @type {Class}
     * @memberof Game
     * @param {HTMLElement} parent
     * @param {String} width
     * @param {String} height
     * @description
     */
    /*----------------------------------------------------------*/
    constructor(parent, width, height, fps_target, fps_show){
        /**
         * @name parent
         * @type {HTMLElement}
         * @memberof Game
         */
        this.parent = parent;
        /**
         * @name constants
         * @type {Object}
         * @property {Number} constants.w
         * @property {Number} constants.h
         * @property {Number} constants.fps_t
         * @property {Number} constants.fps_s
         * @memberof Game
         */
        this.constants = {
            w: width,
            h: height,
            fps_t: fps_target,
            fps_s: fps_show
        };
        /**
         * @name state
         * @type {Object}
         * @property {}
         * @description
         */
        this.state = {};
        /**
         * @implements this.initGame
         */
        this.initGame(this.constants.w, this.constants.h);
    }
    /*----------------------------------------------------------*/
    /**
     * @name initGame
     * @type {Method}
     * @memberof Game
     * @property {}
     * @description
     */
    /*----------------------------------------------------------*/
    initGame(width, height){
        /**
         * @name that
         * @type {Object}
         * @memberof initGame
         * @description becomes 'this'
         */
        var that;
        /**
         * @name viewport
         * @type {HTMLElement}
         * @memberof Game
         */
        this.viewport = this.generateCanvas(width, height);
        /**
         * @name context
         * @type {}
         * @memberof Game
         */
        this.context = this.viewport.getContext('2d');
        /**
         * define viewport attributes
         */
        this.viewport.width     = width;
        this.viewport.height    = height;
        this.viewport.id        = 'game_viewport';
        this.viewport.style.border = '1px solid #333';
        this.viewport.style.borderRadius = '8px';
        /**
         * append to parent
         */
        this.parent.appendChild(this.viewport);
        /**
         * @instance updateGame
         * @instance renderGame
         * @instance gameLoop
         */
        this.updateGame(this);
        this.renderGame(this);
        this.gameLoop(this);
        /**
         * test: text injection
         */
        let text                = 'Here is a new canvas to test';
        //let text_width       = this.context.measureText(text).width;
        let text_c_x            = this.viewport.width / 2;
        let text_c_y            = this.viewport.height / 2;
        this.context.font       = '24px Arial';
        this.context.textAlign  = 'center';
        this.context.fillText(text, text_c_x, text_c_y, 800);
        /**
         * set that
         */
        that = this;
        /**
         * returns
         */
        return this;
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
     * @name generateCanvas
     * @type {Method}
     * @memberof Game
     * @namespace generateCanvas
     * @param {Number} w width
     * @param {Number} h height
     * @property {}
     * @returns {}
     * @description 
     */
    /*----------------------------------------------------------*/
    generateCanvas(w, h){
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
        canvas.width           = Math.round(w * ratio);
        canvas.height          = Math.round(h * ratio);
        canvas.style.width     = w + 'px';
        canvas.style.height    = h + 'px';
        /**
         * scale ctx to get pixel density
         */
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        /**
         * return canvas
         */
        return canvas;
    }
    /*----------------------------------------------------------*/
    /**
     * @name updateGame
     * @type {Method}
     * @memberof Game
     * @namespace
     * @param {Object} scope == this
     * @property {}
     * @returns {}
     * @description game loop: self referencing function
     */
    /*----------------------------------------------------------*/
    updateGame(scope){
        console.log(scope);
        /**
         * @name updateEntity
         * @type {Function}
         * @param {t_frame}
         * @description called by gameLoop
         *              performs state calculations / updates
         * @returns {} state
         */
        function updateEntity(t_frame){
            /**
             * @name state
             * @memberof Game
             * @param {}
             * @param {}
             * @returns {}
             * @description state = scope.state OR {empty object}
             *              if scope.state is falsey (null, undefined, 0, "") --> state == {}
             *              state is a new object based off global state of scope (this)
             */
            let state = scope.state || {};
            /**
             * if entities, iterate and call each update
             */
            console.log(state.hasOwnProperty('entities'));
            if(state.hasOwnProperty('entities')){
                /**
                 * @name entities
                 * @type {}
                 */
                let entities = state.entities;
                /**
                 * loop entities
                 */
                for (let entity of entities){
                    /**
                     * fire each entity's 'render' method
                     */
                    entities[entity].updateEntity();
                }
            }
            /**
             * return
             */
            return state;
        }
        /**
         * @implements updateEntity
         */
        return updateEntity(scope);
    }
    /*----------------------------------------------------------*/
    /**
     * @name renderGame
     * @type {Method}
     * @memberof Game
     * @namespace renderGame
     * @param {} scope
     * @property {}
     * @returns {}
     * @description called by game update
     *              uses global state to re-render canvas
     *              will also call all game entities 'render' method
     */
    /*----------------------------------------------------------*/
    renderGame(scope){
        /**
         * @name w width
         * @type {Number}
         * @memberof renderGame
         * @description
         */
        let w = scope.constants.w;
        /**
         * @name h height
         * @type {Number}
         * @memberof renderGame
         * @description
         */
        let h = scope.constants.h;
        /**
         * @name render
         * @type {Function}
         * @memberof renderGame
         * @description
         */
        function render(w, h, scope){
            /**
             * clear canvas
             */
            scope.context.clearRect(0, 0, w, h);
            /**
             * display text
             */
            scope.context.font      = '24px Arial';
            scope.context.fillStyle = '#000';
            scope.context.fillText('Testing, testing, 1, 2, 3...', 5, 50);
            console.log(scope.context.fps_s);
            /**
             * render fps display
             */
            if(scope.context.fps_s){
                scope.context.fillStyle = '$ff0';
                scope.context.fillText('FPS: ', w - 100, 50);
            }
            /**
             * if entities exist
             */
            if(scope.state.hasOwnProperty('entities')){
                /**
                 * @name entities
                 */
                let entities = scope.state.entities;
                /**
                 * loop entities
                 */
                for(let entity of entities){
                    /**
                     * fire render
                     */
                    entities[entity].render();
                }
            }
        }
        return render(w, h, scope);
    }
    /*----------------------------------------------------------*/
    /**
     * @name gameLoop
     * @type {Method}
     * @memberof Game
     * @namespace gameLoop
     * @param {} 
     * @property {}
     * @returns {}
     * @description
     */
    /*----------------------------------------------------------*/
    gameLoop(scope){
        /**
         * 
         */
        let loop = this;
        /**
         * intitialize timer variables to calculate FPS
         */
        let fps             = scope.constants.fps_t;
        let fps_interval    = 1000/fps;
        let before          = window.performance.now();
        /**
         * @name cycles
         * @type {Object}
         * @property {Object} cycles.new
         * @property {Object} cycles.old
         * @description set up object to capture alternating fps data
         */
        let cycles = {
            new: {
                frame_count: 0,
                start_time: before,
                since_start: 0
            },
            old: {
                frame_count: 0,
                start_time: before,
                since_start: 0
            }
        };
        /**
         * alternating frame rate vars
         */
        let reset_interval  = 5;
        let reset_state     = 'new';
        /**
         * execute initial value
         */
        loop.fps = 0;
        /**
         * @name mainLoop
         * @type {Function}
         * @memberof gameLoop
         * @description main game rendering loop
         * @returns {} loop.main
         */
        loop.main = function(t_frame){
            /**
             * request animation frame
             * setting to 'stopLoop': window.cancelAnimationFrame(loop.stopLoop)
             */
            loop.stopLoop = window.requestAnimationFrame(loop.main);
            /**
             * time since last loop
             */
            let now                 = t_frame;
            let elapsed             = (now - before);
            let active_cycle        = (now - before);
            let targetResetInterval = (now - before);
            /**
             * at desired interval --> render
             */
            if(elapsed > fps_interval){
                /**
                 * set before == now for next frame
                 * adjust specified fps
                 */
                before = now - (elapsed % fps_interval);
                /**
                 * increment values for both active and alternate fps calcs
                 * TODO: FIX: cycles is not iterable
                 */
                for(let i = 0; i < Object.entries(cycles); i++){ 
                    console.log(cycles[i]);
                    return;
                    ++cycles[calc].frame_count;
                    cycles[calc].since_start = now - cycles[calc].start_time;
                }
                return;
                /**
                 * choose correct fps calc; 
                 * update exposed fps value
                 */
                active_cycle    = cycles[reset_state];
                loop.fps        = Math.round(1000 / (active_cycle.since_start / active_cycle.frame_count) * 100) / 100;
                /**
                 * if frame counts are equal
                 */
                targetResetInterval = (
                    cycles.new.frame_count === cycles.old.frame_count
                    ? reset_interval * fps // if true: wait interval
                    : ((reset_interval * 2) * fps) // if false: double interval
                );
                /**
                 * if active calc goes over interval;
                 * reset it to 0 and flag alternate calc to be active
                 */
                if(active_cycle.frame_count > targetResetInterval){
                    cycles[reset_state].frame_count = 0;
                    cycles[reset_state].start_time  = now;
                    cycles[reset_state].since_start = 0;
                    // reset state
                    reset_state = (reset_state === 'new' ? 'old' : 'new');
                }
                /**
                 * update game state
                 */
                scope.updateEntity(now);
                /**
                 * render next frame
                 */
                scope.render();
            }
            /**
             * update game state
             * TODO: FIX: scope.update() is not a function
             */
            scope.state = scope.updateEntity(now); // scope.update(now) ??
            /**
             * render next frame
             */
            scope.render();
        };
        /**
         * start main loop
         */
        let x = loop.main();
        console.log(x);
        // return loop
        return loop;
    }
}
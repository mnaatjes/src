/*----------------------------------------------------------*/
/**
 * @file src/js/utils/utils__math__circle.js
 * @author mnaatjes
 * @version 1.0.0
 * @date  11-24-2024
 * 
 * @memberof Src.Utils
 * @name Circle
 * @namespace Circle
 * 
 * @type {Math}
 * @description 
 * @param {Number} h center-x
 * @param {Number} k center-y
 * @param {Number} r radius
 */
/*----------------------------------------------------------*/
class Circle {
    constructor(h, k, r){
        this.x  = h; // x pos center
        this.y  = k; // y pos center
        this.r  = r; // radius
        this.ix = h; // initial h pos
        this.iy = k; // initial k pos
        this.px = h; // previous h pos
        this.py = k; // previous k pos
        this.velocity = {magnitude: 2, direction: 45};      // velocity
        this.vx = 0.0; // velocity h
        this.vy = 0.0; // velicity k
        this.prevDir;
        this.distances = [];
        this.ax = 0.0; // acceleration for h
        this.ay = 0.0; // acceleration for k
        this.mass = 8.0; // mass of circle
    }
    /*----------------------------------------------------------*/
    /**
     * @name area
     * @type {Number}
     * @property {Number} r radius
     */
    /*----------------------------------------------------------*/
    get area(){return parseFloat((Math.PI * Math.pow(this.r, 2)).toFixed(4));}
    /*----------------------------------------------------------*/
    /**
     * @name circumference
     * @type {Number}
     * @property {Number} r radius
     */
    /*----------------------------------------------------------*/
    get circumference(){return parseFloat((2 * Math.PI * this.r).toFixed(4));}
    /*----------------------------------------------------------*/
    /**
     * @name d diameter
     * @type {Number}
     * @property {Number} r radius
     */
    /*----------------------------------------------------------*/
    get d(){return parseFloat((2 * this.r).toFixed(4));}
    /*----------------------------------------------------------*/
    /**
     * @name dx delta x
     * @memberof Circle
     * @description
     */
    /*----------------------------------------------------------*/
    get dx(){return this.x - this.px;}
    /*----------------------------------------------------------*/
    /**
     * @name dy delta y
     * @memberof Circle
     * @description
     */
    /*----------------------------------------------------------*/
    get dy(){return this.y - this.py;}
    /*----------------------------------------------------------*/
    /**
     * @name update
     * @type {Method}
     * @memberof Circle
     * @property {Number} time 
     * @description
     */
    /*----------------------------------------------------------*/
    update(time){
        /**
         * calculate forces:
         * friction
         * gravity
         */
        /**
         * report displacement:
         * calculate deltaX, deltaY
         * direction
         * magnitude
         * from previous x,y pos --> current x,y pos
         */
        this.displacement = {
            magnitude: parseFloat((Math.sqrt(Math.pow(this.x - this.ix, 2) + Math.pow(this.y - this.iy, 2))).toFixed(4)),
            direction: parseFloat((Math.atan2((this.y - this.iy), (this.x - this.ix)) * (180 / Math.PI)).toFixed(4))
        };
        /**
         * calculate velocity:
         * magnitude
         * direction
         */
        this.velocity = {
            magnitude: parseFloat((Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2))).toFixed(4)),
            direction: parseFloat((Math.atan2(this.dy, this.dx) * (180 / Math.PI)).toFixed(4)),
            average: parseFloat((this.displacement.magnitude / time).toFixed(4))
        };
        /**
         * calculate velocity components:
         * vx, vy
         */
        //this.vx = parseFloat((this.velocity.magnitude * Math.cos(this.velocity.direction)).toFixed(4));
        //this.vy = parseFloat((this.velocity.magnitude * Math.sin(this.velocity.direction)).toFixed(4));
        /**
         * reset ph, pk
         */
        this.px = this.x;
        this.py = this.y;
        /**
         * set acceleration
         */
        this.mass = 90;
        this.ax = 0.084 / this.mass;
        this.ay = 0.12 / this.mass;
        /**
         * add acceleration
         */
        this.vx += (this.ax) * time;
        this.vy += (this.ay) * time;
        /**
         * apply force
         */
        this.x  += this.vx;
        this.y  += this.vy;
        /**
         * debugging
         */
        //console.log(this.velocity.magnitude);
        //console.log(this.vy);
    }
}
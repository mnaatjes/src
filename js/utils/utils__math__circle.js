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
        this.h  = h; // x pos center
        this.k  = k; // y pos center
        this.r  = r; // radius
        this.ih = h; // initial h pos
        this.ik = k; // initial k pos
        this.ph = h; // previous h pos
        this.pk = k; // previous k pos
        this.vh = 0; // velocity h
        this.vk = 0; // velicity k
        this.prevDir;
        this.distances = [];
        this.ah = 1; // acceleration for h
        this.ak = 1; // acceleration for k
        this.mass = 1.0; // mass of circle
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
     * @name calcDirection
     * @type {Function}
     * @memberof Rectangle
     * @property {Number} h center x pos
     * @property {Number} k center y pos
     */
    /*----------------------------------------------------------*/
    calcDirection(){return parseFloat((Math.atan2(this.h, this.k) * (180 / Math.PI)).toFixed(2));}
    /*----------------------------------------------------------*/
    /**
     * @name dir direction
     * @type {Number}
     * @memberof Rectangle
     * @param {Number} value direction in degrees
     * @property {Number} ph
     * @property {Number} pk
     * @property {Number} prevDir
     * @description direction from origin (0,0) of canvas
     */
    /*----------------------------------------------------------*/
    get dir(){return this.calcDirection();}
    set dir(value){
        /**
         * initial direction
         */
        if(this.prevDir === undefined){
            /**
             * define previous direction
             */
            this.prevDir = value;
        }
        /**
         * direction change
         */
        else if(this.prevDir !== value){
            /**
             * update previous direction
             */
            this.prevDir = value;
            /**
             * calculate distance from: current pos and previous pos
             * push to distances
             */
            this.distances.push(this.dist);
            /**
             * update previous x, y pos
             */
            this.ph = this.h;
            this.pk = this.k;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name dist
     * @type {Number}
     * @memberof Rectangle
     * @property {Number} ph previous center x pos
     * @property {Number} pk previous center y pos
     * @property {Number} h center x pos
     * @property {Number} k center y pos
     * @description represents the total PATH length traveled
     *              no consideration of direction
     * TODO:    Adapt to circle
     *          Get px, py
     */
    /*----------------------------------------------------------*/
    get dist(){return parseFloat(Math.sqrt(Math.pow(this.h - this.ph, 2) + Math.pow(this.k - this.pk, 2)).toFixed(4));}
    /*----------------------------------------------------------*/
    /**
     * @name totalDist total distance
     * @type {Number}
     * @memberof Rectangle
     * @property {Array} distances
     * TODO:    Not calculating total!!
     *          calculates distance from origin instead
     */
    /*----------------------------------------------------------*/
    get totalDist(){
        /**
         * initial distance
         * has no change in direction
         */
        if(this.distances.length === 0){
            /**
             * distance from start
             * before direction change
             */
            return this.dist;
        } else if(this.distances.length >= 1){
            /**
             * current distance
             * plus recorded distances
             */
            return parseFloat((this.distances.reduce((acc, curr) => acc + curr, 0) + this.dist).toFixed(4));
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name deltaX change in x pos
     * @type {Number}
     * @memberof Rectangle
     * @description change in x pos from previous center x to current center x
     * TODO: Update for circle
     */
    /*----------------------------------------------------------*/
    get deltaH(){return this.h - this.ph;}
    /*----------------------------------------------------------*/
    /**
     * @name deltaY change in y pos
     * @type {Number}
     * @memberof Rectangle
     * @description change in y pos from previous center y to current center y
     * TODO: Update for circle
     */
    /*----------------------------------------------------------*/
    get deltaK(){return this.k - this.pk;}
    /*----------------------------------------------------------*/
    /**
     * @name v velocity
     * @type {Object}
     * @memberof Rectangle
     */
    /*----------------------------------------------------------*/
    get v(){
        /**
         * if vx, vy undefined
         */
        if(this.vh === undefined && this.vk === undefined){
            return {mag: 0, theta: this.dir};
        } else {
            /**
             * calculate velocity from components
             */
            return {
                mag: Math.sqrt(Math.pow(this.vh, 2) + Math.pow(this.vk, 2)),
                theta: this.dir
            };
        }
    }
    set v(value){
        /**
         * set vx
         */
        this.vh = value.mag * Math.cos(value.theta * (Math.PI / 180));
        /**
         * set vy
         */
        this.vk = value.mag * Math.sin(value.theta * (Math.PI / 180));
        /**
         * set velocity of x, y
         * TODO: THIS IS NOT CORRECT
         */
        this.h += this.vh * this.ah;
        this.k += this.vk * this.ak;
    }
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
         * add acceleration to velocity 
         * with each update
         */
        this.vh += this.ah;
        this.vk += this.ak;
        /**
         * calculate forces:
         * friction
         * gravity
         */
        /**
         * calculate velocity:
         * magnitude
         * direction
         */
        /**
         * report displacement:
         * calculate deltaX, deltaY
         * direction
         * magnitude
         * from previous x,y pos --> current x,y pos
         */
        this.displacement = {
            magnitude: parseFloat((Math.sqrt(Math.pow(this.deltaH, 2) + Math.pow(this.deltaK, 2))).toFixed(4)),
            angle: parseFloat((Math.atan2(this.deltaH, this.deltaK) * (180 / Math.PI)).toFixed(4))
        };
        /**
         * reset ph, pk
         */
        this.ph = this.h;
        this.pk = this.k;
    }
}
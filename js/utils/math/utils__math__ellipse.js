/*----------------------------------------------------------*/
/**
 * @file src/js/utils/utils__math__ellipse.js
 * @author mnaatjes
 * @version 1.2.0
 * @date    11-18-2024
 * @update  11-24-2024
 * 
 * @memberof Src.Utils
 * @name Ellipse
 * @namespace Ellipse
 * 
 * @type {Math}
 * @description for an ellipse a > b
 * @param {Number} x origin-x
 * @param {Number} y origin-y
 * @param {Number} a semi-major axis (x-axis / horizontal)
 * @param {Number} b semi-minor axis (y-axis / vertical)
 */
/*----------------------------------------------------------*/
class Ellipse {
    constructor(a, b, h=null, k=null){
        this.x  = 0;
        this.y  = 0;
        this.h  = (h == 0) ? null: (h == null) ? null: h;
        this.k  = (k == 0) ? null: (k == null) ? null: k;
        this.a  = a;
        this.b  = b;
        this.vertices   = this.findVertices(h, k, a, b);
        this.coVertices = this.findCoVertices(h, k, a, b);
        this.majorAxis  = this.getMajorAxis(a, b);
        this.minorAxis  = this.getMinorAxis(a, b);
        this.foci       = this.getFoci(a, b);
    }
    /*----------------------------------------------------------*/
    /**
     * @name findVertices
     * @type {Method}
     * @memberof Ellipse
     * @param {Number} h origin-x axis
     * @param {Number} k origin-y axis
     * @param {Number} a semi-major / minor axis
     * @param {Number} b semi-minor / major axis
     */
    /*----------------------------------------------------------*/
    findVertices(h, k, a, b){
        /**
         * for ellipse where a > b
         */
        if(a > b){
            /**
             * determine if origin is 0,0
             */
            if(h === 0 && k === 0){
                return {
                    A: {x: a, y: 0},
                    B: {x: -a, y: 0}
                };
            } else {
                return {
                    A: {x: h + a, y: k},
                    B: {x: h - a, y: k}
                };
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name findCoVertices
     * @type {Method}
     * @memberof Ellipse
     * @param {Number} h origin-x axis
     * @param {Number} k origin-y axis
     * @param {Number} a semi-major / minor axis
     * @param {Number} b semi-minor / major axis
     */
    /*----------------------------------------------------------*/
    findCoVertices(h, k, a, b){
        /**
         * for an ellipse where a > b
         */
        if(a > b){
            /**
             * determine if origin is 0,0
             */
            if(h === 0 && k === 0){
                return {
                    A: {x: 0, y: k},
                    B: {x: 0, y: -k}
                };
            } else {
                return {
                    A: {x: h, y: k + b},
                    B: {x: h, y: k - b}
                };
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name getMajorAxis
     * @type {Method}
     * @memberof Ellipse
     * @param {Number} a semi-major / minor axis
     * @param {Number} b semi-minor / major axis
     */
    /*----------------------------------------------------------*/
    getMajorAxis(a, b){
        if(a > b){ return a;}
        else if (b > a){return b;}
    }
    /*----------------------------------------------------------*/
    /**
     * @name getMinorAxis
     * @type {Method}
     * @memberof Ellipse
     * @param {Number} a semi-major / minor axis
     * @param {Number} b semi-minor / major axis
     * @property {Number} this.majorAxis
     */
    /*----------------------------------------------------------*/
    getMinorAxis(a, b){
        if(a > b){ return b;}
        else if(b > a){return a;}
    }
    /*----------------------------------------------------------*/
    /**
     * @name getFoci
     * @type {Method}
     * @memberof Ellipse
     * @param {Number} a
     * @param {Number} b
     */
    /*----------------------------------------------------------*/
    getFoci(a, b){
        /**
         * for an ellipse where a > b
         */
        if(a > b){
            return {
                A: {x: 0, y: Math.sqrt(Math.pow(a, 2) - Math.pow(b, 2))},
                B: {x: 0, y: -Math.sqrt(Math.pow(a, 2) - Math.pow(b, 2))}
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name getPoint
     * @type {Math}
     * @param {Number} theta parametric angle
     * @property {Number} h
     * @property {Number} k
     * @property {Number} a
     * @property {Number} b
     * @returns {Object} {x, y}
     */
    /*----------------------------------------------------------*/
    getPoint(theta){
        /**
         * for an ellipse a > b
         */
        if(this.a > this.b){
            /**
             * convert theta to radians
             */
            theta = degToRad(theta);
            /**
             * if origin at (0, 0)
             */
            if(this.h == null && this.k == null){
                /**
                 * return x, y coordinates
                 */
                return {x: this.a * Math.cos(theta), y: this.b * Math.sin(theta)};
            }
            /**
             * if origin at (h, k)
             */
            else {
                /**
                 * return (x, y) at (h, k)
                 */
                return {x: this.h + this.a * Math.cos(theta), y: this.k + this.b * Math.sin(theta)};
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name getParametricAngle
     * @type {Math}
     * @description
     * @param {Number} x coordinate x-axis
     * @param {Number} y coordinate y-axis
     * @property {Number} a
     * @property {Number} b
     * @returns {Number} theta perametric angle
     */
    /*----------------------------------------------------------*/
    getParametricAngle(x, y){
        /**
         * for an ellipse where a > b
         */
        if(this.a > this.b){
            /**
             * for an ellipse centered at (0,0)
             */
            if(this.h == null && this.k == null){
                /**
                 * find parametric angle using arc-tangent
                 */
                let theta = Math.atan((y / this.b) / (x / this.a));
                /**
                 * return parametric angle in degrees
                 */
                return radToDeg(theta);
            /**
             * for an ellipse centered at h, k
             */
            } else {
                /**
                 * find slope from (h,k) to point
                 * find arc-tangent of slope
                 * convert to degrees
                 */
                let theta = Math.atan2((y - this.k / this.b), (x - this.h / this.a));
                return radToDeg(theta);
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name getEccentricAngle
     * @type {Math}
     * @description
     * @param {Number} theta parametric angle
     * @property {Number} a
     * @property {Number} b
     * @returns {Number} polar angle
     */
    /*----------------------------------------------------------*/
    getEccentricAngle(x, y){
        let theta = Math.atan2(y, x);
        /**
         * calculate phi
         */
        let phi = Math.asin((this.b / this.a) * Math.sin(theta));
        return radToDeg(phi);
    }
    /*----------------------------------------------------------*/
    /**
     * @name getPolarAngle
     * @type {Math}
     * @description
     * @param {Number} theta parametric angle
     * @property {Number} a
     * @property {Number} b
     * @returns {Number} polar angle
     */
    /*----------------------------------------------------------*/
    getPolarAngle(theta){
        /**
         * convert theta to radians t
         */
        let t = degToRad(theta);
        /**
         * for an ellipse a > b
         */
        if(this.a > this.b){
            /**
             * convert to polar
             */
            let x = this.a * Math.cos(t);
            let y = this.b * Math.sin(t);
            /**
             * calculate radius
             */
            let r       = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            let result  = Math.atan2(y, x);
            return radToDeg(result);
        }

    }
}
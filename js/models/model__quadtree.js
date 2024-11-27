/*----------------------------------------------------------*/
/**
 * @file src/js/models/model__quadtree.js
 * @author mnaatjes
 * @version 1.0.0
 * @date  11-24-2024
 * 
 * @memberof Src.Models
 * @name Quadtree
 * @namespace Quadtree
 */
/*----------------------------------------------------------*/
class Quadtree {
    constructor(boundary, capacity){
        /**
         * @name boundary
         * @type {Number}
         * @memberof Quadtree
         * @description the perimeter (edged) of a specific rectangular region
         *              represented by a node in the tree;
         *              defined the spacial limits of an area
         */
        this.boundary = boundary;
        /**
         * @name capacity
         * @type {Number}
         * @memberof Quadtree
         * @description the max number of data points in a single node
         *              before it is split into four child nodes
         */
        this.capacity = capacity;
        /**
         * @name points
         * @type {Array}
         * @memberof Quadtree
         * @description array to keep track of objects (points)
         *              within each boundary
         */
        this.points = [];
        /**
         * @name
         * @type {Number}
         * @memberof Quadtree
         * @description
         */
    }
    /*----------------------------------------------------------*/
    /**
     * @name insert
     * @type {Method}
     * @memberof Quadtree
     * @param {Object} point point/object being inserted into tree
     * @description inserts object into boundary
     */
    /*----------------------------------------------------------*/
    insert(point){
        /**
         * check: if boundary does NOT contain point
         * return false
         * 
         */
        if(!this.boundary.contains(point)){
            return false;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name subdivide
     * @type {Method}
     * @memberof Quadtree
     * @description subdivide squares into smaller squares
     *              subdivide nodes into 4 child nodes
     */
    /*----------------------------------------------------------*/
    subdivide(){}
    /*----------------------------------------------------------*/
    /**
     * @name query
     * @type {Method}
     * @memberof Quadtree
     * @description locate a point in a particular range
     */
    /*----------------------------------------------------------*/
    query(){}
    /*----------------------------------------------------------*/
    /**
     * @name display
     * @type {Method}
     * @memberof Quadtree
     * @description render
     */
    /*----------------------------------------------------------*/
    display(){}
}

/*----------------------------------------------------------*/
/**
 * @name Point
 * @type {Class}
 * @memberof Quadtree
 */
/*----------------------------------------------------------*/
class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
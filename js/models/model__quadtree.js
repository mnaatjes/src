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
         * @name divided
         * @type {Number}
         * @memberof Quadtree
         * @description
         */
        this.divided = false;
        /**
         * quadrant declarations
         */
        this.northeast;
        this.northwest;
        this.southwest;
        this.southeast;
    }
    /*----------------------------------------------------------*/
    /**
     * @name insert
     * @type {Method}
     * @memberof Quadtree
     * @param {Object} point point/object being inserted into tree
     * @param {RenderingContext} ctx canvas context
     * @description inserts object into boundary
     */
    /*----------------------------------------------------------*/
    insert(point, ctx){
        /**
         * check: if boundary does NOT contain point
         * return false
         * 
         */
        if(!this.boundary.contains(point.x, point.y)){
            return false;
        }
        /**
         * check the length of points arr
         * if length is less than capacity: insert
         */
        if(this.points.length < this.capacity){
            this.points.push(new CanvasEllipse(5, 5, point.x, point.y));
            return true;
        } else {
            /**
             * check if boundary divided
             */
            if(this.divided === false){
                /**
                 * subdivide the tree into 4 smaller quadrants
                 */
                this.subdivide();
            }
            /**
             * run through quadrants
             */
            if(this.northeast.insert(point, ctx)){
                return true;
            } else if(this.northwest.insert(point, ctx)){
                return true;
            } else if(this.southwest.insert(point, ctx)){
                return true;
            } else if(this.southeast.insert(point, ctx)){
                return true;
            }
        }
        /**
         * if point couldn't be deligated
         */
        return false;
    }
    /*----------------------------------------------------------*/
    /**
     * @name subdivide
     * @type {Method}
     * @memberof Quadtree
     * @namespace subdivide
     * @description subdivide squares into smaller squares
     *              subdivide nodes into 4 child nodes
     */
    /*----------------------------------------------------------*/
    subdivide(){
        /**
         * set properties
         * size
         */
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.width;
        let h = this.boundary.height;
        /**
         * @name northeast
         * @type {Object}
         * @memberof subdivide
         * @implements {Quadtree}
         */
        this.northeast = new Quadtree(new CanvasRect(x + w/2, y, w/2, h/2), this.capacity);
        this.northeast.boundary.strokeColor = 'red';
        /**
         * @name northwest
         * @type {Object}
         * @memberof subdivide
         * @implements {Quadtree}
         */
        this.northwest = new Quadtree(new CanvasRect(x, y/2, w/2, h/2), this.capacity);
        this.northwest.boundary.strokeColor = 'red';
        /**
         * @name southwest
         * @type {Object}
         * @memberof subdivide
         * @implements {Quadtree}
         */
        this.southwest = new Quadtree(new CanvasRect(x + w/2, y + h/2, w/2, h/2), this.capacity);
        this.southwest.boundary.strokeColor = 'red';
        /**
         * @name southeast
         * @type {Object}
         * @memberof subdivide
         * @implements {Quadtree}
         */
        this.southeast = new Quadtree(new CanvasRect(x, y + h/2, w/2, h/2), this.capacity);
        this.southeast.boundary.strokeColor = 'red';
        /**
         * set boolean divided
         */
        this.divided = true;
    }
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
    renderTree(ctx){
        /**
         * render boundary
         */
        this.boundary.drawRect(ctx);
        /**
         * render root level
         * loop array and draw points
         */
        for(let i = 0; i < this.points.length; i++){
            /**
             * draw each point as an ellipse
             */
            this.points[i].fillColor = 'red';
            this.points[i].drawEllipse(ctx);
        }
        /**
         * render child nodes
         */
        if(this.divided){
            /**
             * render all quadrants
             */
            this.northeast.renderTree(ctx);
            this.northwest.renderTree(ctx);
            this.southwest.renderTree(ctx);
            this.southeast.renderTree(ctx);
        }
    }
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
/*----------------------------------------------------------*/
/**
 * @file src/js/utils/utils__math__rectangle.js
 * @author mnaatjes
 * @version 1.0.0
 * @date  11-24-2024
 * 
 * @memberof Src.Utils
 * @name Rectangle
 * @namespace Rectangle
 * 
 * @type {Math}
 * @description 
 * @param {Number} x origin-x
 * @param {Number} y origin-y
 * @param {Number} width
 * @param {Number} height
 */
/*----------------------------------------------------------*/
class Rectangle {
    constructor(x, y, width, height=null){
        this.x          = x;
        this.y          = y;
        this.width      = width;
        this.height     = (height == null) ? width : height;
        this.rotation   = 0;
        this.ix         = x + (width / 2);
        this.iy         = y + (height / 2);
        this.px         = this.ix;
        this.py         = this.iy;
        this.vx;
        this.vy;
        this.prevDir;
        this.distances  = [];
        this.ax         = 1;
        this.ay         = 1;
        //this.vectors = this.updateVectors(this.vertices);
        //this.diagonals  = Math.sqrt(Math.pow(this.width, 2) + (Math.pow(this.height, 2)));
    }
    /*----------------------------------------------------------*/
    /**
     * @name area
     * @type {Number}
     * @property {Number} width
     * @property {Number} height
     */
    /*----------------------------------------------------------*/
    get area(){return this.width * this.height;}
    /*----------------------------------------------------------*/
    /**
     * @name perimeter
     * @type {Number}
     * @property {Number} width
     * @property {Number} height
     */
    /*----------------------------------------------------------*/
    get perimeter(){return 2 * (this.width + this.height);}
    /*----------------------------------------------------------*/
    /**
     * @name cx
     * @type {Number}
     * @property {Number} x
     * @property {Number} width
     */
    /*----------------------------------------------------------*/
    get cx(){return this.x + (this.width / 2);}
    /*----------------------------------------------------------*/
    /**
     * @name cy
     * @type {Number}
     * @property {Number} y
     * @property {Number} height
     */
    /*----------------------------------------------------------*/
    get cy(){return this.y + (this.height / 2);}
    /*----------------------------------------------------------*/
    /**
     * @name A
     * @type {Number}
     * @property {Number} x
     * @property {Number} y
     */
    /*----------------------------------------------------------*/
    get A(){return this.calcVertex(this.x, this.y);}
    /*----------------------------------------------------------*/
    /**
     * @name B
     * @type {Number}
     * @property {Number} x
     * @property {Number} y
     * @property {Number} width
     */
    /*----------------------------------------------------------*/
    get B(){return this.calcVertex(this.x + this.width, this.y);}
    /*----------------------------------------------------------*/
    /**
     * @name C
     * @type {Number}
     * @property {Number} x
     * @property {Number} y
     * @property {Number} width
     * @property {Number} height
     */
    /*----------------------------------------------------------*/
    get C(){return this.calcVertex(this.x + this.width, this.y + this.height);}
    /*----------------------------------------------------------*/
    /**
     * @name D
     * @type {Number}
     * @property {Number} x
     * @property {Number} y
     * @property {Number} height
     */
    /*----------------------------------------------------------*/
    get D(){return this.calcVertex(this.x, this.y + this.height);}
    /*----------------------------------------------------------*/
    /**
     * @name vertices
     * @type {Object}
     * @property {Number} A
     * @property {Number} B
     * @property {Number} C
     * @property {Number} D
     */
    /*----------------------------------------------------------*/
    get vertices(){return {A: this.A, B: this.B, C: this.C, D: this.D};}
    /*----------------------------------------------------------*/
    /**
     * @name sides
     * @type {Object}
     * @property {Number} A
     * @property {Number} B
     * @property {Number} C
     * @property {Number} D
     * @description sides from vertices
     */
    /*----------------------------------------------------------*/
    get sides(){return {
        AB: {A: this.A, B: this.B},
        BC: {B: this.B, C: this.C},
        CD: {C: this.C, D: this.D},
        DA: {D: this.D, A: this.A}
    };}
    /*----------------------------------------------------------*/
    /**
     * @name dir direction
     * @type {Number}
     * @memberof Rectangle
     * @param {Number} value direction in degrees
     * @property {Number} ix
     * @property {Number} iy
     * @property {Number} px
     * @property {Number} py
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
            this.px = this.cx;
            this.py = this.cy;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name totalDist total distance
     * @type {Number}
     * @memberof Rectangle
     * @property {Array} distances
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
     * @name calcDirection
     * @type {Function}
     * @memberof Rectangle
     * @property {Number} cx center x pos
     * @property {Number} cy center y pos
     */
    /*----------------------------------------------------------*/
    calcDirection(){return parseFloat((Math.atan2(this.cy, this.cx) * (180 / Math.PI)).toFixed(2));}
    /*----------------------------------------------------------*/
    /**
     * @name dist
     * @type {Number}
     * @memberof Rectangle
     * @property {Number} px previous center x pos
     * @property {Number} py previous center y pos
     * @property {Number} cx center x pos
     * @property {Number} cy center y pos
     * @description represents the total PATH length traveled
     *              no consideration of direction
     */
    /*----------------------------------------------------------*/
    get dist(){return parseFloat(Math.sqrt(Math.pow(this.cx - this.px, 2) + Math.pow(this.cy - this.py, 2)).toFixed(4));}
    /*----------------------------------------------------------*/
    /**
     * @name calcDistance
     * @type {Function}
     * @memberof Rectangle
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @description
     */
    /*----------------------------------------------------------*/
    calcDistance(x1, y1, x2, y2){}
    /*----------------------------------------------------------*/
    /**
     * @name deltaX change in x pos
     * @type {Number}
     * @memberof Rectangle
     * @description change in x pos from previous center x to current center x
     */
    /*----------------------------------------------------------*/
    get deltaX(){return this.cx - this.px;}
    /*----------------------------------------------------------*/
    /**
     * @name deltaY change in y pos
     * @type {Number}
     * @memberof Rectangle
     * @description change in y pos from previous center y to current center y
     */
    /*----------------------------------------------------------*/
    get deltaY(){return this.cy - this.py;}
    /*----------------------------------------------------------*/
    /**
     * @name velo velocity
     * @type {Object}
     * @memberof Rectangle
     */
    /*----------------------------------------------------------*/
    get v(){
        /**
         * if vx, vy undefined
         */
        if(this.vx === undefined && this.vy === undefined){
            return {mag: 0, theta: this.dir};
        } else {
            /**
             * calculate velocity from components
             */
            return {
                mag: Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2)),
                theta: this.dir
            };
        }
    }
    set v(value){
        /**
         * set vx
         */
        this.vx = value.mag * Math.cos(value.theta * (Math.PI / 180));
        /**
         * set vy
         */
        this.vy = value.mag * Math.sin(value.theta * (Math.PI / 180));
        /**
         * set velocity of x, y
         */
        this.x += this.vx * this.ax;
        this.y += this.vy * this.ay;
    }
    /*----------------------------------------------------------*/
    /**
     * @name dispX displacement vector
     * @type {Number}
     * @memberof Rectangle
     * @property {Number} fx center x position final
     * @property {Number} fy center y position final
     * @property {Number} ix initial center x position
     * @description change in position of an object
     *              from initial pos --> final position
     *              magnitude of distance
     *              direction
     */
    /*----------------------------------------------------------*/
    get dispX(){
        return {
            mag: this.fx - this.ix, 
            dir: parseFloat((Math.atan2(this.fy, this.fx) * (180 / Math.PI)).toFixed(2))
        };
    }
    /*----------------------------------------------------------*/
    /**
     * @name dispY displacement vector
     * @type {Number}
     * @memberof Rectangle
     * @property {Number} fx center x position final
     * @property {Number} fy center y position final
     * @property {Number} iy initial center y position
     * @description change in position of an object
     *              from initial pos --> final position
     *              magnitude of distance
     *              direction
     */
    /*----------------------------------------------------------*/
    get dispY(){
        return {
            mag: this.fy - this.iy, 
            dir: parseFloat((Math.atan2(this.fy, this.fx) * (180 / Math.PI)).toFixed(2))
        };
    }
    /*----------------------------------------------------------*/
    /**
     * @name calcVertex
     * @type {Method}
     * @memberof Rectangle
     * @param {Object} x
     * @param {Object} y
     * @property {Number} cx
     * @property {Number} cy
     * @property {Number} rotation deg
     */
    /*----------------------------------------------------------*/
    calcVertex(x, y){
        /**
         * @name getRotationMatrix
         * @type {Function}
         * @memberof calcVertex
         * @param {Number} theta in degrees
         */
        function getRotationMatrix(theta){
            /**
             * convert theta to radians
             */
            theta = theta * Math.PI / 180;
            /**
             * return matrix
             */
            return [
                [Math.cos(theta), -Math.sin(theta)],
                [Math.sin(theta), Math.cos(theta)]
            ];
        };
        /**
         * @name matrix
         * @type {Array}
         * @memberof getVerticies
         */
        let matrix = getRotationMatrix(this.rotation);
        /**
         * translate in
         */
        x = x - this.cx;
        y = y - this.cy;
        /**
         * perform calculation
         */
        let result = {
            x: (x * matrix[0][0]) + (y * matrix[0][1]),
            y: (x * matrix[1][0]) + (y * matrix[1][1])
        };
        /**
         * translate out
         */
        result.x = parseFloat((result.x + this.cx).toFixed(4));
        result.y = parseFloat((result.y + this.cy).toFixed(4));
        /**
         * return object (x, y)
         */
        return result;
    }
    /*----------------------------------------------------------*/
    /**
     * @name isInside
     * @memberof Rectangle
     * @param {Number} x x coordinate of point
     * @param {Number} y y coordinate of point
     * @returns {Boolean} true = contains; false = outside
     */
    /*----------------------------------------------------------*/
    isInside(x, y){
        /**
         * redefine vertices for ease of use
         */
        let A = this.vertices.A;
        let B = this.vertices.B;
        let C = this.vertices.C;
        let D = this.vertices.D;
        /**
         * calc min and max
         */
        let minX = Math.min(A.x, B.x, C.x, D.x);
        let minY = Math.min(A.y, B.y, C.y, D.y);
        let maxX = Math.max(A.x, B.x, C.x, D.x);
        let maxY = Math.max(A.y, B.y, C.y, D.y);
        /**
         * check if point is within min/max
         */
        return (
            x >= minX && x <= maxX && y >= minY && y <= maxY
        );
    }
    /*----------------------------------------------------------*/
    /**
     * @name pointInside
     * @type {Method}
     * @memberof Rectangle
     * @namespace pointInside
     * @param {Number} x x-axis of point
     * @param {Number} y y-axis of point
     * @property {Object} this.sides
     */
    /*----------------------------------------------------------*/
    pointInside(x, y){
        /**
         * @name result
         * @type {Null | False | True}
         */
        let result = null;
        /**
         * @name calcAreaTriangle
         */
        function calcAreaTriangle(A, B, C){
            return (1/2) * Math.abs(
                (A.x * (B.y - C.y)) + (B.x * (C.y - A.y)) + (C.x * (A.y - B.y))
            );
        }
        /**
         * @name point
         */
        let point = {x: x, y: y};
        /**
         * define triangles
         */
        let triangles = [];
        /**
         * loop sides
         */
        for(let key in this.sides){
            let side     = this.sides[key];
            let vertices = [];
            /**
             * grab vertexes
             */
            for(let vertex in side){
                vertices.push({pos: side[vertex], label: vertex});
            }
            /**
             * push point onto vertices
             */
            vertices.push({pos: point, label: 'P'});
            /**
             * push vertices into triangle
             */
            triangles.push(vertices);
        }
        /**
         * loop triangles and perform area calculations
         */
        let areas = [];
        let sides = [];
        triangles.forEach(triangle => {
            /**
             * calculate area
             */
            let area = calcAreaTriangle(triangle[0].pos, triangle[1].pos, triangle[2].pos);
            let side = {
                [triangle[0].label + triangle[1].label]: {
                    [triangle[0].label]: triangle[0].pos,
                    [triangle[1].label]: triangle[1].pos
                }
            };
            /**
             * push onto arrs
             */
            areas.push(area);
            sides.push(side);
        });
        /**
         * sum areas of triangles
         */
        let sum = areas.reduce((acc, curr) => acc + curr, 0);
        /**
         * compare sum to area
         */
        if(sum > this.area){
            /**
             * point is OUTSIDE rect
             */
            result = null;
        } else if(sum === this.area){
            /**
             * declare distances arr
             */
            let distances = [];
            /**
             * intersection
             * loop triangle areas to determine if point is on perimeter
             */
            areas.forEach(area => {
                /**
                 * determine if point lies on perimiter
                 * or is inside
                 */
                if(area === 0){
                    result = false;
                } else {
                    result = true;
                }
            });
        }
        /**
         * return result
         */
        return result;
    }
    /*----------------------------------------------------------*/
    /**
     * @name updateVelocity
     * @type {Method}
     * @memberof Rectangle
     * @description
     */
    /*----------------------------------------------------------*/
    updateVelocity(){}
}
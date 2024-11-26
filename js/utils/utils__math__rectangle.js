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
        this.test       = null;
        this.x          = x;
        this.y          = y;
        this.width      = width;
        this.height     = (height == null) ? width : height;
        /**
         * @name cx center x pos
         */
        this.cx = x + (this.width / 2);
        /**
         * @name cy center y pos
         */
        this.cy = y + (this.height / 2);
        /**
         * @name rotation rotation in degrees
         */
        this.rotation = 0;
        /**
         * @name vertices verticies of a rect (A, B, C, D)
         */
        this.vertices = this.updateVertices(this.x, this.y, this.width, this.height, this.rotation);
        this.A = this.vertices.A
        this.B = this.vertices.B
        this.C = this.vertices.C
        this.D = this.vertices.D
        /**
         * @name sides
         */
        this.sides = this.updateSides(this.vertices);
        /**
         * @name vectors AB, BC...
         */
        this.vectors = this.updateVectors(this.vertices);
        /**
         * @name diagonals AC length
         */
        this.diagonals  = Math.sqrt(Math.pow(this.width, 2) + (Math.pow(this.height, 2)));
        this.perimeter  = 2 * (this.width + this.height);
        this.area       = this.width * this.height;
        /**
         * @name ix initial position x
         */
        this.ix = this.x;
        /**
         * @name iy initial position y
         */
        this.iy = this.y;
        /**
         * @name dx displacement vector x
         * @description current pos - initial pos
         */
        this.dx = this.updateDX(this.x, this.y, this.ix, this.iy).x;
        /**
         * @name dy displacement vector y
         * @description current pos - initial pos
         */
        this.dy = this.updateDX(this.x, this.y, this.ix, this.iy).y;
        /**
         * @name direction 
         * @description direction of displacement vector rel x-axis (counter-clockwise)
         */
        this.direction = this.updateDirection(this.dx, this.dy);
        /**
         * @name vx velocity x
         * @description velocity = displacement vector / time interval
         */
        this.vx = this.updateVelocity(this.dx, this.dy, 1).x;
        /**
         * @name vy velocity y
         * @description velocity = displacement vector / time interval
         */
        this.vy = this.updateVelocity(this.dx, this.dy, 1).y;
    }
    /*----------------------------------------------------------*/
    /**
     * @name test
     */
    /*----------------------------------------------------------*/
    set test(value){
        if(value !== 'dog'){console.error('Not a doggie');}
    }
    /*----------------------------------------------------------*/
    /**
     * @name updateCenter
     * @type {Method}
     * @memberof Rectangle
     * @param {Number} x
     */
    /*----------------------------------------------------------*/
    updateCenter(x, y){}
    /*----------------------------------------------------------*/
    /**
     * @name update
     * @type {Method}
     * @memberof Rectangle
     * @param {Object} props
     */
    /*----------------------------------------------------------*/
    update(x, y, w, h, rotation){
        
    }
    /*----------------------------------------------------------*/
    /**
     * @name updateSides
     * @type {Method}
     * @memberof Rectangle
     * @param {Object} vertices
     */
    /*----------------------------------------------------------*/
    updateSides(vertices){
        let acc = [];
        let res = {};
        Object.keys(vertices).forEach((key, i) => {
            let obj = vertices[key];
            /**
             * accumulate values
             */
            acc.push({[key]: obj});
            /**
             * compose values from A - C
             */
            if(i > 0){
                /**
                 * get vertex key
                 */
                for(let k in acc[i - 1]){
                    /**
                     * push sides + obj values
                     */
                    res[k + key] = {
                        [k]: acc[i - 1][k],
                        [key]: obj
                    };
                }
            }
            /**
             * compose values DA
             */
            if(i == Object.entries(vertices).length - 1){
                /**
                 * get key acc
                 */
                for(let k in acc[0]){
                    res[key + k] = {
                        [key]: obj,
                        [k]: acc[0][k]
                    };
                }
            }
        });
        /**
         * return result
         */
        return res;
    }
    /*----------------------------------------------------------*/
    /**
     * @name isInside
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
     * @name updateDirection
     * @type {Method}
     * @memberof Rectangle
     * @param {Number} dx displacement vector x
     * @param {Number} dy displacement vector y
     * @description reference angle = x-axis (counter-clockwise)
     * @returns {Number} angle of direction rel x-axis
     */
    /*----------------------------------------------------------*/
    updateDirection(dx, dy){
        return Math.atan2(dy, dx) * (180 / Math.PI);
    }
    /*----------------------------------------------------------*/
    /**
     * @name updateDX update displacement vector
     * @type {Method}
     * @memberof Rectangle
     * @param {Number} cx current x pos
     * @param {Number} cy current y pos
     * @param {Number} ix initial x pos
     * @param {Number} iy initial y pos
     * @description movement from one place to another
     *              origin --> initial pos = Si; origin --> final pos = Sf
     *              deltaS == difference: dS = Sf - Si
     *              OR: for displacement vector AB: A(-5, 8), B(6,0)
     *              (xB - xA, yB - yA) == (11, -8) or 11i - 8j
     */
    /*----------------------------------------------------------*/
    updateDX(cx, cy, ix, iy){
        return {x: cx - ix, y: cy - iy};
    }
    /*----------------------------------------------------------*/
    /**
     * @name updateVelocity
     * @type {Method}
     * @memberof Rectangle
     * @param {Number} dx displacement vector x
     * @param {Number} dy displacement vector y
     * @param {Number} timeInterval
     * @description
     */
    /*----------------------------------------------------------*/
    updateVelocity(dx, dy, timeInterval){
        return {x: dx / timeInterval, y: dy / timeInterval};
    }
    /*----------------------------------------------------------*/
    /**
     * @name updateVertices
     * @type {Method}
     * @memberof Rectangle
     * @namespace getVertices
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @param {Number} rotation in degrees
     * @description clockwise top-left corner == A
     *              VERTICES BASED ON ORIGIN AT TOP-LEFT!!!
     *              (DEFAULT CANVAS ORIENTATION)
     */
    /*----------------------------------------------------------*/
    updateVertices(x, y, width, height, rotation=0){
        /**
         * @name calcVertex
         * @type {Function}
         * @memberof updateVertices
         * @namespace calcVertex
         */
        function calcVertex(x, y, cx, cy, theta){
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
            let matrix = getRotationMatrix(theta);
            /**
             * translate in
             */
            x = x - cx;
            y = y - cy;
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
            result.x = parseFloat((result.x + cx).toFixed(4));
            result.y = parseFloat((result.y + cy).toFixed(4));
            /**
             * return object (x, y)
             */
            return result;
        }
        /**
         * @name vNormal
         * @type {Object}
         * @memberof updateVertices
         */
        let vNormal = {
            A: {x: x, y: y},
            B: {x: x + width, y: y},
            C: {x: x + width, y: y + height},
            D: {x: x, y: y + height}
        };
        /**
         * check rotation
         */
        if(rotation == 0){
            /**
             * no rotation
             */
            return vNormal;
        } else if (rotation > 0){
            /**
             * return object
             */
            return {
                A: calcVertex(vNormal.A.x, vNormal.A.y, this.cx, this.cy, this.rotation),
                B: calcVertex(vNormal.B.x, vNormal.B.y, this.cx, this.cy, this.rotation),
                C: calcVertex(vNormal.C.x, vNormal.C.y, this.cx, this.cy, this.rotation),
                D: calcVertex(vNormal.D.x, vNormal.D.y, this.cx, this.cy, this.rotation)
            };
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name updateVectors
     * @type {Method}
     * @memberof Rectangle
     * @namespace getVectors
     * @param {Object} v vertices
     * @description clockwise top-left corner == A
     *              rectangular form / representation: vector represented by coordinates
     *                  given as: (x, y)
     * 
     *              polar form / representation:
     *                  magnitude: width
     *                  angle (from positive x-axis): e.g. 30deg from x-axis
     *                  given as: 3<30deg OR (3, 30deg)
     */
    /*----------------------------------------------------------*/
    updateVectors(vertex){
        /**
         * @name calcMagnitude
         * @type {Function}
         * @memberof updateVectors
         */
        function calcMagnitude(x, y){return Math.sqrt((Math.pow(x, 2)) + (Math.pow(y, 2)));}
        /**
         * @name calcTheta
         * @type {Function}
         * @memberof updateVectors
         * @returns theta in degrees
         */
        function calcTheta(x, y){return Math.atan(y/x) * (180 / Math.PI);}
        /**
         * build return object
         */
        let res = {
            /**
             * top side
             */
            AB: {
                x: vertex.B.x - vertex.A.x, 
                y: vertex.B.y - vertex.A.y,
                mag: null, 
                theta: null
            },
            /**
             * right side
             */
            BC: {
                x: vertex.C.x - vertex.B.x, 
                y: vertex.C.y - vertex.B.y,
                mag: null, 
                theta: null
            },
            /**
             * bottom side
             */
            CD: {
                x: vertex.D.x - vertex.C.x, 
                y: vertex.D.y - vertex.C.y,
                mag: null, 
                theta: null
            },
            /**
             * left side
             */
            DA: {
                x: vertex.A.x - vertex.D.x, 
                y: vertex.A.y - vertex.D.y,
                mag: null, 
                theta: null
            },
            /**
             * diagonal AC:
             * top left to bottom right
             */
            AC: {
                x: vertex.C.x - vertex.A.x,
                y: vertex.C.y - vertex.A.y,
                mag: null,
                theta: null
            },
            /**
             * diagonal BD:
             * top right to bottom left
             */
            BD: {
                x: vertex.D.x - vertex.B.x,
                y: vertex.D.y - vertex.B.y,
                mag: null,
                theta: null
            }
        };
        /**
         * calculate magnitude
         */
        res.AB.mag = calcMagnitude(res.AB.x, res.AB.y);
        res.BC.mag = calcMagnitude(res.BC.x, res.BC.y);
        res.CD.mag = calcMagnitude(res.CD.x, res.CD.y);
        res.DA.mag = calcMagnitude(res.DA.x, res.DA.y);
        res.AC.mag = calcMagnitude(res.AC.x, res.AC.y);
        res.BD.mag = calcMagnitude(res.BD.x, res.BD.y);
        /**
         * calculate theta
         */
        res.AB.theta = calcTheta(res.AB.x, res.AB.y);
        res.BC.theta = calcTheta(res.BC.x, res.BC.y);
        res.CD.theta = calcTheta(res.CD.x, res.CD.y);
        res.DA.theta = calcTheta(res.DA.x, res.DA.y);
        res.AC.theta = calcTheta(res.AC.x, res.AC.y);
        res.BD.theta = calcTheta(res.BD.x, res.BD.y);
        /**
         * return object
         */
        return res;
    }
}
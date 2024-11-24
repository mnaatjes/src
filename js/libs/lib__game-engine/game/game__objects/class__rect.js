/*----------------------------------------------------------*/
/**
 * @file game/game__objects/class__rect.js
 * @name Rect
 * @type {Class}
 * @memberof NumberGame
 * @namespace Rect
 */
/*----------------------------------------------------------*/
class Rect{
    /*----------------------------------------------------------*/
    /**
     * @name Constructor
     * @type {Method}
     * @memberof Rect
     * @param {Number} x
     * @param {Number} y
     * @description
     */
    /*----------------------------------------------------------*/
    constructor(x, y, width, height){
        this.x          = x;
        this.y          = y;
        this.width      = width;
        this.height     = height;
        this.color      = '';
        this.distances  = [];
        this.collisions = [];
        this.intersects = [];
        /**
         * @implements
         */
        this.initRect();
    }
    /*----------------------------------------------------------*/
    /**
     * @name initRect
     * @type {Method}
     * @memberof Rect
     * @description apply mathmatical properties to Rect Object
     */
    /*----------------------------------------------------------*/
    initRect(){
        /**
         * @implements getVertices
         */
        this.getVertices();
        /**
         * @implements getSemiProps
         */
        this.getSemiProps();
        /**
         * @implements getCentroid
         */
        this.getCentroid();
        /**
         * @implements getArea
         */
        this.getArea();
        /**
         * @implements getSides
         */
        this.getSides();
        /**
         * debugging
         */
        console.log(this);
    }
    /*----------------------------------------------------------*/
    /**
     * @name getSemiProps
     * @type {Method}
     * @memberof Rect
     * @param {Object} this
     * @property {Number} this.semi.w semi-width
     * @property {Number} this.semi.h semi-height
     * @description 
     * @returns {Object} semi.w, semi.h
     */
    /*----------------------------------------------------------*/
    getSemiProps(){
        let semi = {
            w: this.width / 2,
            h: this.height / 2
        };
        // return
        return this.semi = semi;
    }
    /*----------------------------------------------------------*/
    /**
     * @name getVertices
     * @type {Method}
     * @memberof Rect
     * @param {Object} this
     * @property {Number} this.vertices.a top-left
     * @property {Number} this.vertices.b top-right
     * @property {Number} this.vertices.c bottom-right
     * @property {Number} this.vertices.d bottom-left
     * @description 
     * @returns {Object} vertices
     */
    /*----------------------------------------------------------*/
    getVertices(){
        let vertices = {
            a: {x: this.x, y: this.y},
            b: {x: this.x + this.width, y: this.y},
            c: {x: this.x + this.width, y: this.y + this.height},
            d: {x: this.x, y: this.y + this.height}
        };

        // return vertices
        return this.vertex = vertices;
    }
    /*----------------------------------------------------------*/
    /**
     * @name getCentroid
     * @type {Function}
     * @memberof Rect
     * @param {Object} this
     * @property {Number} this.centroid.x centerX
     * @property {Number} this.centroid.y centerY
     * @description 
     * @returns {Object} centroid.x, centroid.y
     */
    /*----------------------------------------------------------*/
    getCentroid(){
        let centroid = {
            x: (this.vertex.a.x + this.vertex.b.x + this.vertex.c.x + this.vertex.d.x) / 4,
            y: (this.vertex.a.y + this.vertex.b.y + this.vertex.c.y + this.vertex.d.y) / 4
        };

        // return centroid
        return this.centroid = centroid;
    }
    /*----------------------------------------------------------*/
    /**
     * @name getArea
     * @type {Method}
     * @memberof Rect
     * @description
     */
    /*----------------------------------------------------------*/
    getArea(){
        return this.area = this.width * this.height;
    }
    /*----------------------------------------------------------*/
    /**
     * @name getSides
     * @type {Method}
     * @memberof Rect
     * @description
     */
    /*----------------------------------------------------------*/
    getSides(){
        // set self
        let self = this;
        // return 
        return this.sides = {
            ab: {a: self.vertex.a, b: self.vertex.b, len: this.calcLength(self.vertex.a, self.vertex.b)},
            bc: {b: self.vertex.b, c: self.vertex.c, len: this.calcLength(self.vertex.b, self.vertex.c)},
            cd: {c: self.vertex.c, d: self.vertex.d, len: this.calcLength(self.vertex.c, self.vertex.d)},
            da: {d: self.vertex.d, a: self.vertex.a, len: this.calcLength(self.vertex.d, self.vertex.a)}
        };
    }
    /*----------------------------------------------------------*/
    /**
     * @name calcLength
     * @type {Method}
     * @memberof Rect
     * @description
     */
    /*----------------------------------------------------------*/
    calcLength(vertex_a, vertex_b){
        return Math.sqrt(
            Math.pow(vertex_b.x - vertex_a.x, 2) + Math.pow(vertex_b.y - vertex_a.y, 2)
        );
    }
    /*----------------------------------------------------------*/
    /**
     * @name drawRect
     * @type {Method}
     * @memberof Rect
     * @param {Object} ctx
     * @description
     */
    /*----------------------------------------------------------*/
    drawRect(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    /*----------------------------------------------------------*/
    /**
     * @name updateRect
     * @type {Method}
     * @memberof Rect
     * @description
     */
    /*----------------------------------------------------------*/
    updateRect(){
        this.x += 0;
        this.y += 0;
    }
}
/*----------------------------------------------------------*/
/**
 * @file json-db/src/core/json-query.js
 * 
 */
/**
 * @name JSONQuery
 * @type {Class}
 * @namespace JSONQuery
 * @memberof JSONDB
 */
/*----------------------------------------------------------*/
export class JSONQuery{
    constructor(data){
        /**
         * @name sql
         * @type {Undefined | Array | Object}
         * @memberof JSONQuery
         */
        this.data = data;
        /**
         * @name result
         * @type {Undefined | Array | Object}
         * @memberof JSONQuery
         */
        this.result;
    }
    /*----------------------------------------------------------*/
    /**
     * @name select
     * @type {Method}
     * @memberof JSONQuery
     * @param {Array} keys
     * @property {Array} result
     * @returns {Array} result
     */
    /*----------------------------------------------------------*/
    select(keys){}
    /*----------------------------------------------------------*/
    /**
     * @name where
     * @type {Method}
     * @memberof JSONQuery
     * @param {Object} condition
     * @returns {Array} result
     */
    /*----------------------------------------------------------*/
    where(condition){}
    /*----------------------------------------------------------*/
    /**
     * @name orderBy
     * @type {Method}
     * @memberof JSONQuery
     * @param {ArrayLike} args
     * @returns {Array} result
     */
    /*----------------------------------------------------------*/
    orderBy(args){}
}
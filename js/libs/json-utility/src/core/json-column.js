/*----------------------------------------------------------*/
/**
 * @file json-utility/src/core/json-column.js
 * 
 * @name JSONColumn
 * @type {Class}
 * @namespace JSONColumn
 * @memberof JSONUtility
 */
/*----------------------------------------------------------*/
export class JSONColumn{
    constructor(colName, dataType, data){
        /**
         * @name colName
         * @type {String}
         * @memberof JSONColumn
         * @description
         */
        this.colName = colName;
        /**
         * @name dataType
         * @type {String}
         * @memberof JSONUtility
         * @description
         */
        this.dataType = dataType;
        /**
         * @name values
         * @type {Undefined | Array | Object}
         * @memberof JSONUtility
         * @description
         */
        //this.values = [];
        /**
         * @name 
         * @type {}
         * @memberof JSONUtility
         * @description
         */
    }
    /*----------------------------------------------------------*/
    /**
     * @name values
     * @type {Array}
     * @memberof JSONColumn
     * @returns {Array}
     */
    /*----------------------------------------------------------*/
    get values(){}
    set values(value){}
    /*----------------------------------------------------------*/
    /**
     * @name 
     * @type {}
     * @memberof JSONColumn
     * @param {}
     * @returns {}
     */
    /*----------------------------------------------------------*/
}
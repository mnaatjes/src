/*----------------------------------------------------------*/
/**
 * @file json-utility/src/core/json-table.js
 * 
 * @import 
 */
import { SQLParser } from "./sql-parser.js";
/**
 * @name JSONTable
 * @type {Class}
 * @namespace JSONTable
 * @memberof JSONUtility
 */
/*----------------------------------------------------------*/
export class JSONTable{
    #dataType;
    #parser;
    constructor(tableName){
        /**
         * @name tableName
         * @type {String}
         * @memberof JSONTable
         * @description
         */
        this.tableName = tableName;
        /**
         * @name schema
         * @type {Object}
         * @memberof JSONTable
         * @description
         */
        this.schema = {};
        /**
         * @name length
         * @type {Number}
         * @memberof JSONTable
         * @description
         */
        this.length;
        /**
         * @name data
         * @type {Undefined | Object | Array}
         * @memberof JSONTable
         * @description
         */
        this.data;
        /**
         * @name dataType
         * @type {Undefined | Object | Array}
         * @memberof JSONTable
         * @private
         * @description
         */
        this.#dataType = typeof this.data;
        /**
         * @name parser
         * @type {Object}
         * @memberof JSONTable
         * @private
         * @description
         */
        this.#parser = new SQLParser();
    }
    /*----------------------------------------------------------*/
    /**
     * @name 
     * @type {Method}
     * @memberof JSONTable
     * @param {}
     * @property {}
     * @returns {}
     */
    /*----------------------------------------------------------*/
}
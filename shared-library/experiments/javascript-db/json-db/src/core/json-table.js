/*----------------------------------------------------------*/
/**
 * @file json-db/src/core/json-table.js
 * 
 * @module JSONQuery
 */
import { JSONQuery } from "./json-query.js";
/**
 * @name JSONTable
 * @type {Class}
 * @namespace JSONTable
 * @memberof JSONDB
 */
/*----------------------------------------------------------*/
export class JSONTable{
    #dataType;
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
        this.data = [
            {person: 'gemini', age: 1, animal: 'dog'},
            {person: 'apollo', age: 8, animal: 'cat'},
            {person: 'prince', age: 5, animal: 'cat'},
        ];
        /**
         * @name queries
         * @type {Array}
         * @memberof JSONTable
         * @description
         */
        this.queries = [];
        /**
         * @name results
         * @type {Array}
         * @memberof JSONTable
         * @description
         */
        this.results = [];
        /**
         * @name dataType
         * @type {Undefined | Object | Array}
         * @memberof JSONTable
         * @private
         * @description
         */
        this.#dataType = typeof this.data;
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
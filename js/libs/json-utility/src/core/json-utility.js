/*----------------------------------------------------------*/
/**
 * @file json-utility/src/core/json-utility.js
 * 
 * @module JSONTable
 */
import { JSONQuery } from "./json-query.js";
import { JSONTable } from "./json-table.js";
import { SQLParser } from "./sql-parser.js";
/**
 * @name JSONUtility
 * @type {Class}
 * @namespace JSONUtility
 */
/*----------------------------------------------------------*/
export class JSONUtility extends SQLParser{
    #parser;
    constructor(dbName){
        super();
        /**
         * @name dbName
         * @type {String}
         * @memberof JSONUtility
         * @description
         */
        this.dbName = this.#validateName(dbName);
        /**
         * @name tables
         * @type {Array}
         * @memberof JSONUtility
         * @description
         */
        this.tables = [];
    }
    /*----------------------------------------------------------*/
    /**
     * @name tables
     * @type {Undefined | Array}
     * @memberof JSONUtility
     * @public
     */
    /*----------------------------------------------------------*/
    get tables(){}
    set tables(value){}
    /*----------------------------------------------------------*/
    /**
     * @name validateName
     * @type {Method}
     * @memberof JSONUtility
     * @private
     * @param {dbName}
     * @returns {Undefined | String}
     * @throws {SyntaxError}
     */
    /*----------------------------------------------------------*/
    #validateName(dbName){
        if(typeof dbName === 'string'){
            return dbName;
        } else {
            throw new SyntaxError(`Improper DB Name! DB Name must be a string!`);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name query
     * @type {Method}
     * @memberof JSONUtility
     * @param {String} sql
     * @property {}
     * @returns {}
     */
    /*----------------------------------------------------------*/
    query(sql){
        /**
         * validate sql string
         */
        if(typeof sql !== 'string'){
            throw new SyntaxError('Supplied SQL Statement is not a string!');
        }
        /**
         * break up sql statement into array of substrings
         */
        sql = this.parseSQL(sql);
        return;
        /**
         * validate sql array
         */
        if(!Array.isArray(sql) || sql.length === 0){
            throw new TypeError('SQL would not be parsed! Please check Statement and try again');
        }
        /**
         * parse sql
         * get select statement
         */
        let statement = sql.map(str => this.parseStatement(str)).filter(res => res !== undefined)[0];
        console.log(statement);
        /**
         * get tableName
         * get tableData
         */
        let tableName = sql.map(str => this.parseTable(str)).filter(res => res !== undefined)[0];
        let tableData = this[tableName].data;
        /**
         * @implements {JSONQuery}
         */
        let query = new JSONQuery();
        console.log(query);
    }
    /*----------------------------------------------------------*/
    /**
     * @name createTable
     * @type {Method}
     * @memberof JSONUtility
     * @public
     * @param {String} tableName
     * @param {Object} args
     * @returns {Boolean}
     */
    /*----------------------------------------------------------*/
    createTable(tableName, ...args){
        /**
         * @implements {JSONTable}
         * @description create new table and append to this.object
         */
        this[tableName] = new JSONTable(tableName);

    }
    /*----------------------------------------------------------*/
    /**
     * @name alterTable
     * @type {Method}
     * @memberof JSONUtility
     * @public
     * @param {String} tableName
     * @param {Object} args
     * @returns {Boolean}
     */
    /*----------------------------------------------------------*/
    alterTable(tableName, ...args){}
    /*----------------------------------------------------------*/
    /**
     * @name dropTable
     * @type {Method}
     * @memberof JSONUtility
     * @public
     * @param {String} tableName
     * @param {Object} args
     * @returns {Boolean}
     */
    /*----------------------------------------------------------*/
    dropTable(tableName, ...args){}
}
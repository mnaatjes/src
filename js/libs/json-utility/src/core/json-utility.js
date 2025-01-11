/*----------------------------------------------------------*/
/**
 * @file src/core/json-utility.js
 * 
 * @import 
 */
/**
 * @name JSONUtility
 * @type {Class}
 * @namespace JSONUtility
 */
/*----------------------------------------------------------*/
export class JSONUtility{
    constructor(dbName){
        /**
         * @name dbName
         * @type {String}
         * @memberof JSONUtility
         * @description
         */
        this.dbName = this.#validateName(dbName);
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
     * @name createTable
     * @type {Method}
     * @memberof JSONUtility
     * @public
     * @param {String} tableName
     * @param {Object} args
     * @returns {Boolean}
     */
    /*----------------------------------------------------------*/
    createTable(tableName, ...args){}
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
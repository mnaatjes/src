/*----------------------------------------------------------*/
/**
 * @file src/core/json-table.js
 * 
 * @module JSONColumn
 * @module parseType
 */
import { JSONColumn } from "./json-column.js";
import { validateData } from "../utils/validate-data.js";
import { parseType } from "../utils/parse-type.js";
import { parseConstraint } from "../utils/parse-constraint.js";
/**
 * @name JSONTable
 * @type {Class}
 * @memberof JSONUtility
 * @namespace JSONTable
 */
/*----------------------------------------------------------*/
export class JSONTable{
    constructor(tableName, configs){
        /**
         * @name tableName
         * @type {String}
         * @memberof JSONTable
         * @description
         */
        this.tableName = this.#validateName(tableName);
        /**
         * @name _columns
         * @type {String}
         * @memberof JSONTable
         * @private
         * @description
         */
        this._columns = this.#initColumns(configs);
        /**
         * @name records
         * @type {Array}
         * @memberof JSONTable
         * @public
         * @description
         */
        this.records = [];
    }
    /*----------------------------------------------------------*/
    /**
     * @name columns
     * @type {Undefined | Array}
     * @memberof JSONTable
     * @public
     */
    /*----------------------------------------------------------*/
    get columns(){}
    set columns(value){}
    /*----------------------------------------------------------*/
    /**
     * @name validateName
     * @type {Method}
     * @memberof JSONTable
     * @private
     * @param {String} tableName
     * @returns {Undefined | String}
     * @throws {SyntaxError}
     */
    /*----------------------------------------------------------*/
    #validateName(tableName){
        if(typeof tableName === 'string'){
            return tableName;
        } else {
            throw new SyntaxError(`Improper Table Name! Table Name must be a string!`);
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name initColumns
     * @type {Method}
     * @memberof JSONTable
     * @private
     * @param {Object | Array} configs
     * @param {Object} options
     * @returns {Array}
     */
    /*----------------------------------------------------------*/
    #initColumns(configs){
        /**
         * validate configs
         */
        if(typeof configs === 'object' && Array.isArray(configs)){
            /**
             * @name data
             * @type {Array}
             * @memberof initColumns
             * @description destructured data array from column args supplied
             */
            let data = this.#parseData(configs);
            /**
             * @name settings
             * @type {Object}
             * @memberof initColumns
             * @description destructures settings object from column args array
             */
            let settings = this.#parseSettings(configs);
            /**
             * @name settings
             * @type {Object}
             * @memberof initColumns
             * @description destructures settings object from column args array
             */
            let attributes = this.#parseAttributes(data, settings);
        } else {
            throw SyntaxError(`Arguments improperly formatted for Table: ${this.tableName}`);
        }
        /**
         * debugging
         */
    }
    /*----------------------------------------------------------*/
    /**
     * @name #parseData
     * @type {Method}
     * @memberof JSONTable
     * @private
     * @param {Array} configs
     * @returns {Array} parses and validates data from arguments
     */
    /*----------------------------------------------------------*/
    #parseData(configs){
        /**
         * isolate array
         */
        let arr = configs.find(item => Array.isArray(item));
        /**
         * check arr defined
         * validate objects inside data
         */
        if(arr !== undefined){
            if(arr.length === 1){
                /**
                 * valid data, cannot compare to another record
                 */
                return arr;
            } else if(arr.length > 1){
                /**
                 * validate records in data
                 */
                if(validateData(arr)){
                    /**
                     * valid data
                     */
                    return arr;
                }
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name #parseSettings
     * @type {Method}
     * @memberof JSONTable
     * @private
     * @param {Array} configs
     * @returns {}
     */
    /*----------------------------------------------------------*/
    #parseSettings(configs){
        /**
         * check that all config items are objects
         */
        if(configs.every(item => typeof item === 'object' && !Array.isArray(item))){
            /**
             * roll into one object
             */
            return configs.reduce((acc, obj) => ({...acc, ...obj}), {});
        } else {
            return configs.find(item => !Array.isArray(item) && typeof item === 'object');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name #parseAttributes
     * @type {Method}
     * @memberof JSONTable
     * @private
     * @param {Array} configs
     * @returns {}
     */
    /*----------------------------------------------------------*/
    #parseAttributes(data, settings){
        /**
         * @name attributes
         * @type {Object}
         * @memberof initColumns
         * @description an object that has the attributes for the table column
         */
        let attributes;
        /**
         * determine if data supplied
         */
        if(data !== undefined){
            /**
             * grab attributes from data
             */
            attributes = Object.entries(data[0]).map(([key, value]) => ({
                colName: key,
                defaultValue: undefined,
                type: parseType(value),
                constraint: parseConstraint(key, value)
            }));
            /**
             * add additional column attributes if needed
             * TODO: check if PKEY, FKEY, or CKEY exist
             * TODO: check for default values
             * TODO: check if values are different between records
             * TODO: assign a key and missing constraints
             * TODO: assign default value if none defined
             */
            console.log(attributes);
            console.log(settings);
        }
        /**
         * check if attributes already defined via data
         */

    }
    /*----------------------------------------------------------*/
    /**
     * @name validateAttributes
     * @type {Method}
     * @memberof JSONTable
     * @private
     * @param {}
     * @returns {}
     */
    /*----------------------------------------------------------*/
    /*----------------------------------------------------------*/
    /**
     * @name 
     * @type {Method}
     * @memberof JSONTable
     * @private
     * @param {}
     * @returns {}
     */
    /*----------------------------------------------------------*/
}
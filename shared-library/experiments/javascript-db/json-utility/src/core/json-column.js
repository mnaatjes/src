/*----------------------------------------------------------*/
/**
 * @file src/core/json-column.js
 * 
 */
/**
 * @name JSONColumn
 * @type {Class}
 * @memberof JSONUtility
 * @namespace JSONColumn
 */
/*----------------------------------------------------------*/
export class JSONColumn{
    #types;
    #constraints;
    constructor(colName, type, constraint){
        /**
         * @name colName
         * @type {Array}
         * @memberof JSONColumn
         * @public
         * @description
         */
        this.colName = this.#validateName(colName);
        /**
         * @name types
         * @type {Array}
         * @memberof JSONColumn
         * @private
         * @description
         */
        this.#types = [
            'int',
            'float',
            'string',
            'text',
            'date',
            'bool'
        ];
        /**
         * @name constraints
         * @type {Array}
         * @memberof JSONColumn
         * @private
         * @description
         */
        this.#constraints = [
            'NULL',
            'NOT NULL',
            'UNIQUE',
            'PKEY',
            'FKEY',
            'CKEY'
        ];
    }
    /*----------------------------------------------------------*/
    /**
     * @name assignKey
     * @type {Method}
     * @memberof JSONColumn
     * @public
     * @param {Number | String} key
     * @param {String} keyType
     * @returns {Boolean}
     */
    /*----------------------------------------------------------*/
    assignKey(key, keyType){}
    /*----------------------------------------------------------*/
    /**
     * @name alter
     * @type {Method}
     * @memberof JSONColumn
     * @public
     * @param {Object} args
     * 
     * @property {Function} drop
     * @property {Function} modify
     * @property {Function} rename
     * @property {Function} addConstraint
     * @property {Function} dropConstraint
     * @returns {Boolean}
     */
    /*----------------------------------------------------------*/
    alter(key, keyType){}
    /*----------------------------------------------------------*/
    /**
     * @name isNumeric
     * @type {Method}
     * @memberof JSONColumn
     * @public
     * @param {String} colName
     * 
     * @returns {Boolean}
     */
    /*----------------------------------------------------------*/
    isNumeric(colName){}
    /*----------------------------------------------------------*/
    /**
     * @name validateName
     * @type {Method}
     * @memberof JSONColumn
     * @private
     * @param {String} colName
     * @returns {Undefined | String}
     * @throws {SyntaxError}
     */
    /*----------------------------------------------------------*/
    #validateName(colName){}
    /*----------------------------------------------------------*/
    /**
     * @name validateType
     * @type {Method}
     * @memberof JSONColumn
     * @private
     * @param {String} type
     * @returns {Boolean}
     */
    /*----------------------------------------------------------*/
    #validateType(type){}
    /*----------------------------------------------------------*/
    /**
     * @name validateConstraint
     * @type {Method}
     * @memberof JSONColumn
     * @private
     * @param {String} constraint
     * @returns {Boolean}
     */
    /*----------------------------------------------------------*/
    #validateConstraint(constraint){}
}
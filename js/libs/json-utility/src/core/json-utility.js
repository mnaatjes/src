/*----------------------------------------------------------*/
/**
 * @file json-utility/src/core/json-utility.js
 * @module JSONColumn
 */
import { JSONColumn } from "./json-column.js";
/**
 * @name JSONUtility
 * @type {Class}
 * @namespace JSONUtility
 */
/*----------------------------------------------------------*/
export class JSONUtility{
    constructor(data){
        /**
         * @implements {#validateData()}
         * @description validate data, parse into array, assign primary key
         */
        let valid = this.#validateData(data);
        if(!Array.isArray(valid.data)){
            throw new TypeError('Data unable to be formatted. Please check supplied data');
        }
        if(typeof valid.pkey.increment !== 'number'){
            throw new TypeError('Primary Key could not be assigned. Please check supplied data');
        }
        /**
         * @name data
         * @type {Array | Object}
         * @memberof JSONUtility
         * @description
         */
        this.data = valid.data;
        /**
         * @name pkey
         * @type {Object}
         * @memberof JSONUtility
         * @description
         */
        this.pkey = valid.pkey;
        /**
         * @name queries
         * @type {Array}
         * @memberof JSONUtility
         * @description
         */
        this.queries = [];
        /**
         * @name result
         * @type {Undefined | Array | Object}
         * @memberof JSONUtility
         * @description
         */
        this.result;
        /**
         * @name columns
         * @type {Array}
         * @memberof JSONUtility
         * @description
         */
        this.columns = [];
    }
    /*----------------------------------------------------------*/
    /**
     * @name isJSONString
     * @type {Method}
     * @memberof JSONUtility
     * @private
     * @param {Array | Object} data
     * @returns {Boolean}
     */
    /*----------------------------------------------------------*/
    #isJSONString(data){
        /**
         * get typeof
         */
        let type = typeof data;
        /**
         * check if string
         */
        if(type === 'string'){
            try{
                JSON.parse(data);
            } catch (error){
                /**
                 * not a json string
                 */
                return false;
            }
            /**
             * json string
             */
            return true;
        } else {
            return false;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name validateData
     * @type {Method}
     * @memberof JSONUtility
     * @private
     * @param {Array | Object} data
     * @returns {Array | Object} data
     */
    /*----------------------------------------------------------*/
    #validateData(data){
        /**
         * check if json string
         */
        if(this.#isJSONString(data)){
            data = JSON.parse(data);
        }
        /**
         * check if object
         * convert to array
         */
        if(typeof data === 'object' && !Array.isArray(data)){
            /**
             * TODO: convert object to array
             */
            data = [];
        }
        /**
         * ensure array
         * else return type error
         */
        if(Array.isArray(data) && data.length > 0){
            /**
             * validate keys
             * validate PKEY
             */
            data     = this.#validateKeys(data);
            let pkey = this.#validatePKEY(data);
            /**
             * assign PKEY if not already
             */
            if(data.every(obj => !obj.hasOwnProperty(pkey.prop))){
                data = data.map((obj, index) => (
                    {...obj, [pkey.prop]: index}
                ));
            }
            return {data, pkey};
        } else {
            throw new TypeError('Data supplied is not of valid type: JSON String, Object, Array');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name validateKeys
     * @type {Method}
     * @memberof JSONUtility
     * @private
     * @param {Array} data
     * @returns {Array}
     */
    /*----------------------------------------------------------*/
    #validateKeys(data){
        /**
         * check keys match length and keyName
         */
        /**
         * @name keys
         * @type {Undefined | Array}
         * @memberof generateColumns
         * @description keys from first object in array
         */
        let keys = Object.keys(data[0]);
        /**
         * @name missingKeys
         * @type {Undefined | Array}
         * @memberof generateColumns
         * @description keys from first object not present in an object entry
         */
        let missingKeys = data.reduce((acc, obj) => {
            let missing = keys.filter(prop => !Object.keys(obj).includes(prop));
            if(missing){
                return acc.concat(missing);
            }
            return acc;
        }, []);
        /**
         * @name extraKeys
         * @type {Undefined | Array}
         * @memberof generateColumns
         * @description extra keys beyond the keys in first entry of array
         */
        let extraKeys = data.reduce((acc, obj) => {
            let extra = Object.keys(obj).filter(prop => !keys.includes(prop));
            if(extra){
                return acc.concat(extra);
            }
            return acc;
        }, []);
        /**
         * add missing keys to entries
         */
        if(missingKeys.length > 0){
            /**
             * entry(s) has missing key
             */
            missingKeys.forEach(prop => {
                data = data.map(obj => {
                    if(!obj.hasOwnProperty(prop)){
                        obj[prop] = undefined;
                    }
                    return obj;
                });
            });
        }
        /**
         * add extra keys to entries
         */
        if(extraKeys.length > 0){
            /**
             * entry(s) has extra key
             * 
             * inject into every entry
             */
            extraKeys.forEach(prop => {
                data = data.map(obj => {
                    if(!obj.hasOwnProperty(prop)){
                        obj[prop] = undefined;
                    }
                    return obj;
                });
            });
        }
        /**
         * redefine keys
         * validate array objects
         */
        keys = Object.keys(data[0]);
        /**
         * @name matchKeys
         * @type {Boolean}
         * @memberof generateColumns
         * @description all keys match
         */
        let matchKeys = data.every(obj => {
            return Object.keys(obj).every(key => keys.includes(key)) && keys.every(key => obj.hasOwnProperty(key));
        });
        /**
         * final validation and return error / data
         */
        if(matchKeys){
            return data;
        } else {
            throw new TypeError('Data could not be parsed properly! Please review data.');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name #validatePKEY
     * @type {Method}
     * @memberof JSONUtility
     * @private
     * @param {Array} data
     * @returns {Array} data with id
     */
    /*----------------------------------------------------------*/
    #validatePKEY(data){
        /**
         * declare pkey container
         */
        let pkeys = [];
        /**
         * check for auto-increment property
         */
        let numbers = Object.keys(data[0]).filter(prop => {
            return data.every(obj => typeof obj[prop] === 'number');
        });
        /**
         * check length of numbers array
         */
        if(numbers.length > 0){
            /**
             * check if any of these properties are auto increment
             * sort by property name
             * check if incremented
             * check rate of increment
             */
            numbers.forEach(num => {
                let sorted = data.slice().sort((a, b) => a[num] - b[num]);
                /**
                 * get difference in values
                 */
                let diff = data.slice(1).reduce((acc, obj, index) => {
                    return [...acc, obj[num] - data[index][num]];
                }, []);
                /**
                 * check if diff array empty
                 * check if diff array has all equal values
                 */
                if(diff.length > 1){
                    /**
                     * check if all increment differences are equal
                     */
                    let testIncrement = diff.every((curr, index, arr) => {
                        return index === 0 || curr === arr[index - 1];
                    });
                    if(testIncrement){
                        /**
                         * auto increment value found
                         * append to pkeys array
                         */
                        pkeys.push({prop: num, increment: diff[0]});
                    }
                }
            });
            /**
             * check if any pkeys
             */
            if(pkeys.length !== 0){
                return pkeys[0];
            } else {
                return {prop: 'pkey', increment: 1};
            }
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name orderBy
     * @type {Method}
     * @memberof JSONUtility
     * @param {String} prop
     * @param {String} dir asc, desc
     * @property {}
     * @returns {Array}
     */
    /*----------------------------------------------------------*/
    orderBy(prop, dir='ASC'){
        /**
         * validate direction
         */
        dir = dir.toLowerCase();
        if(dir === 'asc' || dir === 'desc'){
            /**
             * sort array
             */
            return this.data.slice().sort((a, b) => {
                if(dir === 'asc'){
                    return a[prop] > b[prop] ? 1: -1;
                } else if(dir === 'desc'){
                    return a[prop] < b[prop] ? 1: -1;
                }
            });
        } else {
            throw new TypeError('Sort direction must be in "ASC" or "DESC"');
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name select
     * @type {Method}
     * @memberof JSONUtility
     * @param {String} props
     * @param {Arraylike} args conditions
     * @returns {Array}
     */
    /*----------------------------------------------------------*/
    select(props, ...args){
        /**
         * @name query
         */
        let query = this.#query(this.data, args);
        console.log(query);
        /**
         * check length of props
         * destructure props
         * validate props
         */
        /**
         * filter data from props
         */
        
    }
    /*----------------------------------------------------------*/
    /**
     * @name query
     * @type {Method}
     * @memberof JSONUtility
     * @param {Array} conditions
     * @returns {Array}
     */
    /*----------------------------------------------------------*/
    #query(data, conditions){
        /**
         * perform filter
         */
        return data.filter(obj => {
            /**
             * perform every verification
             */
            return conditions.every(condition => {
                /**
                 * destructure prop, op, value
                 */
                let [prop, op, val] = condition.split(' ');
                /**
                 * evaluate operator
                 */
                switch(op){
                    case '>':
                        return obj[prop] > parseFloat(val);
                    case '>=':
                        return obj[prop] >= parseFloat(val);
                    case '<':
                        return obj[prop] < parseFloat(val);
                    case '<=':
                        return obj[prop] <= parseFloat(val);
                    case '=':
                    case '==':
                        return obj[prop] === val;
                    case '!=':
                        return obj[prop] !== val;
                    default:
                        throw new Error(`Invalid operator: ${op} used!`);
                }
            });
        });
    }
    /*----------------------------------------------------------*/
    /**
     * @name 
     * @type {Method}
     * @memberof JSONUtility
     * @param {}
     * @property {}
     * @returns {}
     */
    /*----------------------------------------------------------*/
}
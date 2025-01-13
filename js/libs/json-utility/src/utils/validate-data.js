/*----------------------------------------------------------*/
/**
 * @file json-utility/src/utils/validate-data.js
 * 
 * @name validateData
 * @type {Function}
 * @memberof JSONUtility.Utils
 * 
 * @param {Array | Object} data
 * @returns {Boolean} type
 */

import { parseType } from "./parse-type.js";

/*----------------------------------------------------------*/
export function validateData(data){
    /**
     * @name equalArrays
     * @type {Function}
     * @memberof validateData
     * @param {Object} arrs
     * @returns {Boolean}
     */
    function equalArrays(...arrs){
        /**
         * loop arrs
         */
        if(arrs.length === 2){
            /**
             * check length
             */
            if(arrs[0].length !== arrs[1].length){
                return false;
            }
            /**
             * loop primary array
             */
            for(let i = 0; i < arrs[0].length; i++){
                /**
                 * compare elements
                 */
                if(arrs[0][i] !== arrs[1][i]){
                    /**
                     * warn and return false
                     */
                    console.warn(`Element has unmatching type: Arr1: ${arrs[0][i]} !== Arr2: ${arrs[1][i]} at Index: ${i}`);
                    return false;
                }
            }
            /**
             * evaluated correctly
             */
            return true;
        } else {
            throw new TypeError('Too many arrays supplied');
        }
    }
    /**
     * check if object or array
     */
    if(typeof data === 'object' && Array.isArray(data)){
        /**
         * is Array
         */
        if(data.length <= 1){
            /**
             * data has only one record
             */
            return true;
        } else if(data.length > 1){
            /**
             * declare first record's keys
             * declare first record's types
             */
            let keys    = Object.keys(data[0]);
            let types   = Object.values(data[0]).map(type => parseType(type));
            /**
             * perform tests: keys
             */
            let testKeys = data.slice(1).every(obj => {
                return equalArrays(Object.keys(obj), keys);
            });
            /**
             * perform test: types
             */
            let testTypes = data.slice(1).every(obj => {
                return equalArrays(Object.values(obj).map(type => parseType(type)), types);
            });
            /**
             * check tests
             */
            if(testKeys === true && testTypes === true){
                /**
                 * passed validation
                 */
                return true;
            } else {
                /**
                 * failed validation
                 */
                return false;
            }
        }
    } else if(typeof data === 'object' && !Array.isArray(data)){
        /**
         * is Object
         * TODO: validate data as object
         */
    } else {
        throw new SyntaxError('Data is not an Object or Array!');
    }
}
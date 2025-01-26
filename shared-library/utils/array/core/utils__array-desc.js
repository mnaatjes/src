/*----------------------------------------------------------*/
/**
 * @file /src/utils/utils__array/core/utils__array-desc.js
 * 
 * @function sortDesc
 * @memberof Utils.Array
 * 
 * @param {Array} arr Input array
 * @param {String} key object key to sort array by
 * TODO: change key to args
 * @description sorts an array in descending order
 * @returns {Array} reordered array in descending order
 */

/**
 * Imports isUniformType Array method from ArrayExtensions
 */
import { isUniformType } from './utils__array-isUniformType.js';
/*----------------------------------------------------------*/

export function sortDesc(arr, key=undefined){
    /**
     * check if uniform
     */
    if(isUniformType(arr)){
        /**
         * check data types: numbers, strins, objects
         */
        let type = typeof arr[0];
        switch(type){
            /**
             * @type {Number}
             */
            case 'number':
            /**
             * @type {String}
             */
                return arr.sort((a, b) => b - a);
            case 'string': 
                return arr.sort().reverse();
            /**
             * @type {Object}
             */
            case 'object':
                /**
                 * validate key
                 */
                if(key !== undefined && arr.every(obj => obj.hasOwnProperty(key))){
                    return arr.slice().sort((a, b) => {
                        return a[key] < b[key] ? 1 : -1;
                    });
                } else {
                    /**
                     * key invalid
                     */
                    throw new TypeError('Invalid object key supplied. Please ensure (for an array of objects) that the key exists in the supplied data');
                }
            default:
                throw new TypeError('Cannot sort array. Array elements must be: Numbers, Strings');
        }
    }
}
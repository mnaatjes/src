/*----------------------------------------------------------*/
/**
 * @file /src/utils/utils__array/core/utils__array-distinct.js
 * 
 * @function distinct
 * @memberof Utils.Array
 * 
 * @param {Array} arr Input array
 * @param {String[]} keys property name
 * 
 * @description 
 * @returns {Array}
 */

/**
 * Imports isUniformType Array method from ArrayExtensions
 */
import { isUniformType } from './utils__array-isUniformType.js';
/**
 * Imports helper function validate-conditions
 */
import { validateConditions } from '../helpers/validate-conditions.js';
/**
 * Imports helper function evaluate-conditions
 */
import { evaluateConditions } from '../helpers/evaluate-conditions.js';
/*----------------------------------------------------------*/
export function distinct(arr, keys=undefined){
    /**
     * no args provided
     */
    if(arr.length === 0){
        return undefined;
    } else if(arr.length === 1){
        return arr;
    } else {
        /**
         * validate array for uniformity and that each element is an object
         */
        if(isUniformType(arr)){
            /**
             * check if keys
             */
            if(keys !== undefined){
                keys = keys.split(',').map(str => str.trim());
                let distinct = new Set();
                /**
                 * return distinct result targeted at properties
                 */
                return arr.filter(obj => {
                    let values = keys.map(key => obj[key]).join('|');
                    
                    if(!distinct.has(values)){
                        distinct.add(values);
                        return true;
                    } else {
                        return false;
                    }
                });
            } else {
                /**
                 * return distinct result
                 */
                return Array.from(new Set(arr));
            }
        } else {
            throw new TypeError('Array elements must be objects to use conditions and other parameters');
        }
    }
}
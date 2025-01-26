/*----------------------------------------------------------*/
/**
 * @file /src/utils/utils__array/core/utils__array-count.js
 * 
 * @function count
 * @memberof Utils.Array
 * 
 * @param {Array} arr Input array
 * @param {...(String[])} conditions    A variable number of arguments
 *                                      Can be conditions for evaluation
 * 
 * @description Counts the total number of entries in the array
 * @returns {Number} Returns length of array (defined by conditional parameters)
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
export function count(arr, ...conditions){
    /**
     * no args provided
     */
    if(conditions.length === 0){
        return arr.length;
    } else {
        /**
         * validate array for uniformity and that each element is an object
         */
        if(isUniformType(arr) && typeof arr[0] === 'object'){
            /**
             * parse conditions:
             */
            if(conditions.length === 1){
                conditions = conditions[0].split(',').map(item => item.trim());
            }
            /**
             * validate conditions
             */
            if(validateConditions(conditions)){
                /**
                 * return result number
                 */
                return evaluateConditions(arr, conditions).length;
            }
        } else {
            throw new TypeError('Array elements must be objects to use conditions and other parameters');
        }
    }
}
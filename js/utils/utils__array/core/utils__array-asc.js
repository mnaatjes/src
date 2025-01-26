/*----------------------------------------------------------*/
/**
 * @file /src/utils/utils__array/core/utils__array-asc.js
 * 
 * @function sortAsc
 * @memberof Utils.Array
 * 
 * @param {Array} arr Input array
 * @param {...(String[] | Function[])} args A variable number of arguments
 *                                          Can be strings: keys / property names
 *                                          Can be functions: custom comparison functions
 * 
 * @description returns an array in ascending order
 * @returns {Array} reordered array in ascending order
 */
/**
 * Imports isUniformType Array method from ArrayExtensions
 */
import { isUniformType } from './utils__array-isUniformType.js';
/*----------------------------------------------------------*/
export function sortAsc(arr, ...args){
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
                return arr.sort((a, b) => a - b);
            /**
             * @type {String}
             */
            case 'string': 
                return arr.sort();
            /**
             * @type {Object}
             */
            case 'object':
                /**
                 * validate array of objects and not array of arrays
                 */
                if(arr.every(ele => !Array.isArray(ele))){
                    /**
                     * validate args
                     * destructure keys from args
                     * validate keys
                     */
                    let keys;
                    if(args.length > 0 && args.every(ele => typeof ele === 'string')){
                        /**
                         * check if args is a collection of strings or a single string
                         */
                        if(args.length === 1){
                            keys = args[0].split(',').map(item => item.trim());
                        } else {
                            keys = args;
                        }
                        /**
                         * validate keys
                         */
                        if(arr.every(obj => keys.every(key => obj.hasOwnProperty(key)))){
                            /**
                             * perform sort
                             */
                            return arr.slice().sort((a, b) => {
                                /**
                                 * sort by property
                                 */
                                for(let key of keys){
                                    if(a[key] < b[key]){
                                        return -1;
                                    } else if(a[key] > b[key]){
                                        return 1;
                                    }
                                }
                                /**
                                 * property values are equal
                                 */
                                return 0;
                            });
                        } else {
                            /**
                             * error: keys don't match
                             */
                        }
                    }
                    return;
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
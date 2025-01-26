/*----------------------------------------------------------*/
/**
 * @file /src/utils/utils__array/core/utils__array-min.js
 * 
 * @function min
 * @memberof Utils.Array
 * 
 * @param {Array} arr Input array
 * @param {...(String[] | Function[])} args A variable number of arguments
 *                                          Can be strings: keys / property names
 *                                          Can be functions: custom comparison functions
 * 
 * @description searches for the array entry of lowest value and returns that entry
 * @returns {*} element of lowest value
 */

/**
 * Imports isUniformType Array method from ArrayExtensions
 */
import { isUniformType } from './utils__array-isUniformType.js';
/*----------------------------------------------------------*/

export function min(arr, ...args){
    /**
     * check if uniform
     */
    if(isUniformType(arr)){
        /**
         * check size
         */
        if(arr.length === 0){
            return undefined;
        }
        /**
         * switch output by array element type
         */
        let type = typeof arr[0];
        switch(type){
            /**
             * @type {Number | String}
             */
            case 'number':
            case 'string':
                return arr.slice().sort()[0];
            /**
             * @type {Object | Array}
             */
            case 'object':
                /**
                 * validate is elements are objects and not arrays
                 */
                if(!Array.isArray(arr[0])){
                    let keys;
                    let temp;
                    /**
                     * determine if arguments supplied are keys
                     */
                    if(args.length > 0 && args.every(ele => typeof ele === 'string')){
                        /**
                         * check if args is a collection of strings or a single string
                         */
                        if(args.length === 1){
                            temp = args[0].split(',').map(item => item.trim());
                        } else {
                            temp = args;
                        }
                        /**
                         * validate keys
                         */
                        if(arr.every(obj => temp.every(key => obj.hasOwnProperty(key)))){
                            /**
                             * set keys as temp
                             */
                            keys = temp;
                        }
                    } else {
                        /**
                         * define keys from array element
                         */
                        keys = Object.keys(arr[0]);
                    }
                    /**
                     * set min element as first element
                     */
                    let min = arr[0];
                    /**
                     * loop array and parse min entry
                     */
                    for(let i = 0; i < arr.length; i++){
                        let isMin = true;
                        /**
                         * eval keys
                         */
                        for(let key of keys){
                            if(arr[i][key] < min[key]){
                                min = arr[i];
                                break;
                            } else if(arr[i][key] > min[key]){
                                isMin = false;
                                break;
                            }
                        }
                        /**
                         * set min entry
                         */
                        if(isMin){
                            min = arr[i];
                        }
                    }
                    /**
                     * return entry
                     */
                    return min;
                }
            default:
                throw new Error('Invalid Type');
        }
    } else {
        /**
         * error: not all elements alike
         */
        throw new Error('Array not of uniform type. Cannot access method');
    }
}
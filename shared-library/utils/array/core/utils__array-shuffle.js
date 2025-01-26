/*----------------------------------------------------------*/
/**
 * @file /src/utils/utils__array/core/utils__array-shuffle.js
 * 
 * @function shuffle
 * @memberof Utils.Array
 * 
 * @param {Array} arr input array
 * @description shuffles elements within copy of array called on
 * @returns {Array} array of shuffled entries
 */
/*----------------------------------------------------------*/
export function shuffle(arr){
    /**
     * copy original array
     */
    arr = arr.slice();
    /**
     * loop array from length
     * as long as i > 0, decrement
     */
    for(let i = arr.length - 1; i > 0; i--){
        /**
         * define random number for shuffle
         */
        let j = Math.floor(Math.random() * (i + 1));
        /**
         * swap array elements
         */
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
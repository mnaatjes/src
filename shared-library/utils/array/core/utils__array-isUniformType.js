/**
 * @file /src/utils/utils__array/core/utils__array-isUniformType.js
 * 
 * @function isUniformType
 * @memberof Utils.Array
 * 
 * @param {Array} arr Input array
 * @description checks to see if all array elements are of the same data type
 * @returns {Boolean} true or false depending on uniformity
 */
/*----------------------------------------------------------*/
export function isUniformType(arr){
    /**
     * check for empty array
     */
    if(arr.length === 0){
        return true;
    }
    /**
     * define type
     * run every test
     */
    return arr.every(ele => typeof ele === typeof arr[0]);
}
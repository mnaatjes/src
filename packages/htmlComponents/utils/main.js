/**
 * @file htmlcomponents/utils/main.js
 */
/*----------------------------------------------------------*/
/**
 * @function deepCopy
 * @param {Object} - object to deep copy
 * @returns {Object} - deep copy of an object
 */
/*----------------------------------------------------------*/
export function deepCopy(obj){
    /**
     * Validate Obj
     */
    if(typeof obj !== 'object' || obj === null){
        return obj;
    }
    /**
     * Declare copy container
     * Perform copy
     */
    const copy = {};
    for(const prop in obj){
        if(obj.hasOwnProperty(prop)){
            copy[prop] = deepCopy(obj[prop]);
        }
    }
    /**
     * Return object
     */
    return copy;
}
/*----------------------------------------------------------*/
/**
 * @function camelCase
 * @param {String} str
 * @param {String} subStr
 * @returns {String} - camelCase
 */
/*----------------------------------------------------------*/
export function camelCase(str, subStr){
    const index  = str.indexOf(subStr);
    const suffix = str.substring(index + subStr.length);
    return subStr + suffix.charAt(0).toUpperCase() + suffix.substring(1);
}
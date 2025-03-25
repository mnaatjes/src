/**
 * @function deepCopy
 * @param {Object} obj - default [nested] object to copy
 * @returns {Object} - deep copy of object
 */
export function deepCopy(obj){
    /**
     * Validate
     */
    if(typeof obj !== 'object' || obj === null){
        return obj;
    }
    // Check if array or obj
    const copy = Array.isArray(obj) ? [] : {};
    /**
     * Parse key, value - recursive
     */
    for(const key in obj){
        if(obj.hasOwnProperty(key)){
            copy[key] = deepCopy(obj[key]);
        }
    }
    /**
     * Return deep copy
     */
    return copy;
}
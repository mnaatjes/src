/**
 * @function generateRandomIndex
 * @param {Array} arr - supplied array
 * @returns {Number}
 */
export function generateRandomIndex(arr){
    /**
     * Validate
     */
    if(!Array.isArray(arr)){
        throw new TypeError('Supplied parameter must be an array!');
    }
    /**
     * Return value
     */
    return Math.floor(Math.random() * arr.length);
}
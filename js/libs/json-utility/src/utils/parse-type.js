/*----------------------------------------------------------*/
/**
 * @file json-utility/src/utils/parse-type.js
 * 
 * @name parseType
 * @type {Function}
 * @memberof JSONUtility.Utils
 * 
 * @param {Undefined | Boolean | String | Number | Object} value
 * @returns {String} type
 */
/*----------------------------------------------------------*/
export function parseType(value){
    /**
     * Evaluate Strings
     */
    if(typeof value === 'string'){
        if(!isNaN(parseFloat(value)) && isFinite(value)){
            /**
             * for numbers
             */
            if(value % 1 !== 0){
                /**
                 * int
                 */
                return 'int';
            } else if(value % 1 === 0){
                /**
                 * float
                 */
                return 'float';
            }
        } else if(!isNaN(Date.parse(value))){
            /**
             * for date
             */
            return 'date';
        } else if(value.length > 255){
            /**
             * for text
             */
            return 'text';
        } else if(value.length === 4 && (value === 'true' || value === 'false')){
            /**
             * for boolean
             */
            return 'boolean';
        } else {
            /**
             * for string
             */
            return typeof value;
        }
    /**
     * Evaluate Numbers
     */
    } else if(typeof value === 'number'){
        /**
         * for numbers
         */
        if(value % 1 !== 0){
            /**
             * int
             */
            return 'int';
        } else if(value % 1 === 0){
            /**
             * float
             */
            return 'float';
        }
    /**
     * Evaluate Objects
     */
    } else if(typeof value === 'object'){
        /**
         * check for null
         */
        if(value === null){
            return 'null';
        } else {
            return typeof value;
        }
    } else {
        /**
         * does not match criteria
         */
        throw SyntaxError('Value type does not match criteria');
    }
}
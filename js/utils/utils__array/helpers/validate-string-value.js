/*----------------------------------------------------------*/
/**
 * @file /src/utils/utils__array/helpers/validate-string-value.js
 * 
 * @function validateStrValue
 * @memberof Utils.Array.Helpers
 * 
 * @param {String} targetType
 * @param {String} strValue
 * 
 * @description
 * @returns {Boolean}
 */
/*----------------------------------------------------------*/
export function validateStrValue(targetType, strValue){
    /**
     * get string value type
     */
    let type;
    if (strValue === 'true' || strValue === 'false') {
        type = 'boolean';
    } else if (!isNaN(Number(strValue))) {
        type = 'number';
    } else if (strValue === 'null') {
        type = 'null';
    } else if (strValue === 'undefined') {
        type = 'undefined'
    } else { 
        type = 'string'
    }
    /**
     * compare types
     */
    return type === targetType;
}
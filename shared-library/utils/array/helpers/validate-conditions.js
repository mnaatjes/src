/*----------------------------------------------------------*/
/**
 * @file /src/utils/utils__array/helpers/validate-conditions..js
 * 
 * @function validateConditions
 * @memberof Utils.Array.Helpers
 * 
 * @param {(String[])} conditions    A variable number of arguments
 *                                      Can be conditions for evaluation
 * 
 * @description Checks that array of condition strings is valid
 * @returns {Boolean} Returns true if supplied conditional strings are valid
 */
/*----------------------------------------------------------*/
export function validateConditions(conditions){
    return conditions.some(
        condition =>
            ['<', '<=', '>', '>=', '=', '==', '!=', '!=='].some(operator =>
                condition.includes(operator)
        )
    )
}
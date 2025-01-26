/*----------------------------------------------------------*/
/**
 * @file /src/utils/utils__array/helpers/evaluate-conditions..js
 * 
 * @function evaluateConditions
 * @memberof Utils.Array.Helpers
 * 
 * @param {Array} arr Input array
 * @param {(String[])} conditions    A variable number of arguments
 *                                      Can be conditions for evaluation
 * 
 * @description Checks that array of condition strings is valid
 * @returns {Boolean} Returns true if supplied conditional strings are valid
 */
/**
 * Imports validateStrValue
 */
import { validateStrValue } from "./validate-string-value.js";

/*----------------------------------------------------------*/
export function evaluateConditions(arr, conditions){
    /**
     * destructure conditions
     */
    conditions = conditions.map((str) => {
        let [prop, op, val] = str.split(' ');
        /**
         * validate property
         * validate operator
         * validate value
         */
        if(arr.every(obj => obj.hasOwnProperty(prop))){
            if([">", "<", ">=", "<=", "==", "=", "!=", "!=="].includes(op)){
                if(validateStrValue(typeof arr[0][prop], val)){
                    /**
                     * return valid properties
                     */
                    return {
                        property: prop,
                        operator: op,
                        value: val
                    };
                } else {
                    throw new TypeError(`Invalid Value Type: "${val}" is not a valid value`);
                }
            } else {
                throw new TypeError(`Invalid Operator: "${op}" is not a valid conditional operator!`);
            }
        } else {
            throw new TypeError(`Invalid Property: "${prop}" does not exist in array!`);
        }
    });
    /**
     * generate functions
     */
    let funcs = conditions.map((condition) => {
        return new Function(`return this.${condition.property} ${condition.operator} ${condition.value}`);
    });
    /**
     * apply functions
     */
    return arr.filter(obj => {
        /**
         * apply condition functions
         */
        return funcs.every(func => {
            return func.call(obj);
        });
    });
}
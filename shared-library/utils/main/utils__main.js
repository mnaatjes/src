/*----------------------------------------------------------*/
/**
 * @file src/js/utils/utils__main.js
 * @author mnaatjes
 * @version 1.0.0
 * @date    11-15-2024
 * @updated 12-12-2024
 * @memberof Src.Utils
 * 
 * @name UtilsMain
 * @namespace UtilsMain
 */
/*----------------------------------------------------------*/

/*----------------------------------------------------------*/
/**
 * @name randNum
 * @type {Function}
 * @memberof UtilsMain
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} between min and max, random
 */
/*----------------------------------------------------------*/
function randNum(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*----------------------------------------------------------*/
/**
 * @name getGCF
 * @type {Function}
 * @memberof UtilsMain
 * @param {Number} a
 * @param {Number} b
 * @returns {Number} greatest common factor
 */
/*----------------------------------------------------------*/
function getGCF(a, b){
    /**
     * ensure b is not 0
     */
    if(a == 0){return b;}

    return getGCF(b % a, a);

}
/*----------------------------------------------------------*/
/**
 * @name range
 * @type {Function}
 * @memberof UtilsMain
 * @param {number} start beginning of range
 * @param {number} end end of range
 * @returns {Boolean} false
 */
/*----------------------------------------------------------*/
function range(start, end) {
    /**
     * @name result
     * @description array for range numbers
     */
    let result = [];
    /**
     * loop and build array range
     */
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    /**
     * return result
     */
    return result;
}
/*----------------------------------------------------------*/
/**
 * @name tryParseInt
 * @type {Function}
 * @memberof UtilsMain
 * @param {Number | String | Float} num
 * @returns {Boolean}
 */
/*----------------------------------------------------------*/
function tryParseInt(num){
    /**
     * try
     */
    try{
        return Number.isInteger(parseInt(num));
    /**
     * error condition
     */
    } catch(error){
        return false;
    }
}
/*----------------------------------------------------------*/
/**
 * @name tryParseFloat
 * @type {Function}
 * @memberof UtilsMain
 * @param {Number | String | Float} num
 * @returns {Boolean}
 */
/*----------------------------------------------------------*/
function tryParseFloat(num){
    /**
     * try
     */
    try{
        return !isNaN(parseFloat(num));
    /**
     * error condition
     */
    } catch(error){
        return false;
    }
}
/*----------------------------------------------------------*/
/**
 * @name enableNode
 * @type {Function}
 * @memberof UtilsMain
 * @param {HTMLElement} node
 * @returns {Boolean} false
 */
/*----------------------------------------------------------*/
function enableNode(node){
    node.setAttribute('data-state', 'enabled');
    return true;
}
/*----------------------------------------------------------*/
/**
 * @name disableNode
 * @type {Function}
 * @memberof UtilsMain
 * @param {HTMLElement} node
 * @returns {Boolean} false
 */
/*----------------------------------------------------------*/
function disableNode(node){
    node.setAttribute('data-state', 'disabled');
    return false;
}
/*----------------------------------------------------------*/
/**
 * @name clearNode
 * @type {Function}
 * @memberof UtilsMain
 * @param {HTMLElement} node
 * @returns {Boolean} false
 */
/*----------------------------------------------------------*/
function clearNode(node){
    node.innerHTML = '';
    return true;
}
/*----------------------------------------------------------*/
/**
 * @name writeNode
 * @type {Function}
 * @memberof UtilsMain
 * @param {HTMLElement} node
 * @param {String} string
 * @returns {Boolean} false
 */
/*----------------------------------------------------------*/
function writeNode(node, string){
    node.innerHTML = string;
    return true;
}
/*----------------------------------------------------------*/
/**
 * @name traverseJSON
 * @type {Function}
 * @memberof UtilsMain
 * @param {String | Object} obj json object
 * @param {Function} callback perform actions on key, value pairs
 * @returns {Object} json key, values
 */
/*----------------------------------------------------------*/
function traverseJSON(obj, callback){
    /**
     * check if string
     */
    if(typeof json == 'string'){json = JSON.parse(json);}
    /**
     * loop json value key pairs
     */
    for(let key in obj){
        /**
         * check if key exists
         */
        if(obj.hasOwnProperty(key)){
            /**
             * run callback
             */
            callback(key, obj[key]);
            /**
             * iterate through next object
             */
            if(typeof obj[key] == 'object'){
                /**
                 * call function
                 */
                traverseJSON(obj[key], callback);
            }
        }
    }
}
/*----------------------------------------------------------*/
/**
 * @name listJSON
 * @type {Function}
 * @memberof UtilsMain
 * @param {String | Object} obj json object
 * @param {Number} depth selector for how deep
 * @param {Function} callback execute function
 * @param {Number} curr current depth
 * @returns {Object} list objects at depth n
 */
/*----------------------------------------------------------*/
function listJSON(obj, depth, callback, curr=0){
    /**
     * check depth
     */
    if(curr == depth){
        /**
         * if depths match
         * check if value is object
         * and object is not empty
         */
        if(typeof obj === 'object' && obj != null){
            /**
             * perform callback actions
             */
            callback(obj, curr);
        } 
    } else {
        /**
         * if depths don't match
         * go deeper into object
         * loop object for inner objects
         */
        for(let key in obj){
            /**
             * validate obj
             */
            if(typeof obj[key] === 'object' && obj[key] != null){
                /**
                 * run self
                 * at increased depth
                 */
                listJSON(obj[key], depth, callback, (curr + 1));
            }
        }
    }
}
/*----------------------------------------------------------*/
/**
 * @name setCSSStyles
 * @type {Funciton}
 * @memberof UtilsMain
 * @param {Object} element
 * @param {Object} styles property: value pairs
 * @param {String} styles.key property
 * @param {String | Object} styles.value prop-value or css function-value pair
 * @param {Object} styles.value.obj func, value
 * @param {Array} styles.value.[obj]
 */
/*----------------------------------------------------------*/
function setCSSStyles(element, styles){
    for(let property in styles){
        if(typeof styles[property] == 'object'){
            /**
             * if is object:
             * css property containing a function or functions
             */
            let obj = styles[property];
            /**
             * grab fun and value from object
             * set style property with function and value
             */
            let row = '';
            for(let func in obj){
                row += `${func}(${obj[func]}) `;
            }
            /**
             * execute style change
             */
            //console.log(row);
            element.style[property] = row;
        } else if(Array.isArray(styles[property])){
            // TODO: Fix looping array
            // TODO: Get function from key
            // TODO: Get value from obj[key]
            /**
             * if is array:
             * define catcher string
             */
            let row = '';
            /**
             * loop func, values and collect
             */
            styles[property].forEach(obj => {
                 row += ` ${obj.func}(${obj.value})`;
            });
            /**
             * set style property with functions and values
             */
            element.style[property] = row;
        }
        else {
            /**
             * if is normal:
             * regular css expression
             */
            element.style[property] = styles[property];
        }
    }
}
/*----------------------------------------------------------*/
/**
 * @name degToRad
 * @type {Function}
 * @memberof UtilsMain
 * @description
 * @param {Number} degrees
 * @returns {Number} radians
 */
/*----------------------------------------------------------*/
function degToRad(degrees){return degrees * (Math.PI / 180);}
/*----------------------------------------------------------*/
/**
 * @name radToDeg
 * @type {Function}
 * @memberof UtilsMain
 * @description
 * @param {Number} radians
 * @returns {Number} degrees
 */
/*----------------------------------------------------------*/
function radToDeg(radians){return radians * (180 / Math.PI);}
/*----------------------------------------------------------*/
/**
 * @name findCenter
 * @type {Function}
 * @memberof UtilsMain
 * @description
 * @param {Object} element
 * @property {Object} rect
 * @returns {Object} {cx, cy}
 */
/*----------------------------------------------------------*/
function findCenter(element){
    /**
     * @name rect
     * @type {Object}
     * @description client rect object
     */
    let rect    = element.getBoundingClientRect();
    let cx      = rect.left + rect.width / 2;
    let cy      = rect.top + rect.height / 2;
    /**
     * return as object
     */
    return {cx: cx, cy: cy};
}
/*----------------------------------------------------------*/
/**
 * @name isNumber
 * @type {Function}
 * @memberof UtilsMain
 * @param {String} value
 * @returns {Boolean}
 */
/*----------------------------------------------------------*/
function isNumber(value){
    /**
     * test if number
     */
    if(!isNaN(value) && isFinite(value)){
        /**
         * check float
         */
        try {
            if(parseFloat(value) || parseFloat(value) === 0){
                return true;
            }
        } catch (error) {
            /**
             * cannot parse number
             */
            return false;
        }
    } else {
        /**
         * result didnt pass test
         * return: not a number
         */
        return false;
    }
}
/*----------------------------------------------------------*/
/**
 * @name isBoolean
 * @type {Function}
 * @memberof UtilsMain
 * @param {String} value
 * @returns {Undefined | Boolean}
 */
/*----------------------------------------------------------*/
function isBoolean(value){
    /**
     * check if already a boolean
     */
    if(typeof value === 'boolean'){
        return true;
    } else if(typeof value === 'number' || typeof value === 'object') {
        return false;
    } else if (typeof value === 'string') {
        /**
         * set to lower case
         */
        value = value.toLowerCase();
        /**
         * check if boolean
         */
        return (value === 'true' || value === 'false');
    } else {
        return undefined;
    }
}
/*----------------------------------------------------------*/
/**
 * @name tryJSONParse
 * @type {Function}
 * @memberof UtilsMain
 * @param {String} value
 * @returns {Boolean}
 */
/*----------------------------------------------------------*/
function tryJSONParse(value){
    /**
     * check if string
     */
    if(typeof value === 'string'){
        /**
         * try JSON.parse
         */
        try {
            /**
             * parse and return true
             */
            JSON.parse(value);
            return true;
        } catch (error){
            /**
             * could not parse string
             */
            return false;
        }
    } else {
        /**
         * value is not a string
         */
        return false;
    }
}
/*----------------------------------------------------------*/
/**
 * @name parseType
 * @type {Function}
 * @memberof UtilsMain
 * @description
 * @param {Undefined | Null | Boolean | Number | String} value
 * @property {}
 * @returns {}
 */
/*----------------------------------------------------------*/
function parseType(value){
    /**
     * check if null
     */
    if(value === null){
        return 'null';
    /**
     * check if array
     */
    } else if(Array.isArray(value)){
        return 'array';
    /**
     * evaluate typeof
     */
    } else {
        /**
         * check if value is a string
         */
        if(typeof value === 'string'){
            /**
             * check if empty
             * trim value of leading, ending whitespace
             * check length
             */
            if(value.trim().length >= 1){
                /**
                 * check JSON
                 */
                if(tryJSONParse(value)){
                    /**
                     * value IS JSON object
                     * parse value and evaluate data type
                     */
                    value = JSON.parse(value);
                    /**
                     * check if array
                     */
                    if(Array.isArray(value)){
                        return 'array';
                    } else {
                        return typeof value;
                    }
                } else {
                    /**
                     * value is not a json object
                     * check boolean
                     */
                    if(isBoolean(value)){
                        return 'boolean';
                    /**
                     * check number
                     */
                    } else if(isNumber(value)){
                        return 'number';
                    } else {
                        return 'string';
                    }
                }
            } else {
                /**
                 * empty value
                 */
                return 'undefined';
            }
        } else {
            return typeof value;
        }
    }
}
/*----------------------------------------------------------*/
/**
 * @name 
 * @type {Function}
 * @memberof UtilsMain
 * @description
 * @param {}
 * @property {}
 * @returns {}
 */
/*----------------------------------------------------------*/
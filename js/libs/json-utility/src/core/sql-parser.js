/*----------------------------------------------------------*/
/**
 * @file json-utility/src/core/sql-parser.js
 * 
 * @name SQLParser
 * @type {Class}
 * @namespace SQLParser
 * @memberof JSONUtility
 */
/*----------------------------------------------------------*/
export class SQLParser{
    constructor(){
        /**
         * @name #queries
         * @type {Array}
         * @memberof SQLParser
         * @private
         * @description major query statements; indicates type of query to run
         */
        this._queries = [
            "SELECT",
            "INSERT",
            "UPDATE",
            "DELETE"
        ];
        /**
         * @name _commands
         * @type {Array}
         * @memberof SQLParser
         * @private
         * @description preceed table name
         */
        this._commands = [
            "FROM",
            "INTO"
        ];
        /**
         * @name _filters
         * @type {Array}
         * @memberof SQLParser
         * @private
         * @description preceed conditional clause; what follows contains entire clause
         */
        this._filters = [
            "WHERE",
            "HAVING"
        ];
        /**
         * @name _sorters
         * @type {Array}
         * @memberof SQLParser
         * @private
         * @description conditions for sorting
         */
        this._sorters = [
            "ORDER BY",
            "TOP"
        ];
        /**
         * @name _limiters
         * @type {Array}
         * @memberof SQLParser
         * @private
         * @description conditions for limiting
         */
        this._limiters = [
            "LIMIT",
            "OFFSET"
        ];
        /**
         * @name _funcs
         * @type {Array}
         * @memberof SQLParser
         * @private
         * @description functions associated with SELECT queries and conditional clauses
         */
        this._funcs = [
            "AVG",
            "ABS",
            "SUM",
            "MIN",
            "MAX"
        ];
        /**
         * @name _logical
         * @type {Array}
         * @memberof SQLParser
         * @private
         * @description logical operators associated with clauses and statements
         */
        this._logical = [
            "AND",
            "BETWEEN",
            "IN",
            "LIKE",
            "NOT",
            "OR",
            "SOME",
        ];
    }
    /*----------------------------------------------------------*/
    /**
     * @name parseSQL
     * @type {Method}
     * @memberof SQLParser
     * @param {String} sql
     * @returns {Array}
     */
    /*----------------------------------------------------------*/
    parseSQL(sql){
        /**
         * @name result
         */
        let result;
        /**
         * @name delimiters
         * @type {Object}
         * @memberof parseSQL
         * @description Build delimiters object
         *              delimiters from this.properties array of SQL keywords
         */
        let delimiters = this.#generateDelimiters(sql);
        /**
         * TODO: split statement: query-type, keys, table-name, func(optional)
         * TODO: split where clause into conditional clauses
         * TODO: return completed object
         */
        let partitions = this.#partitionString(sql, delimiters);
        /**
         * return result
         */
        return result;
    }
    /*----------------------------------------------------------*/
    /**
     * @name parseSQL
     * @type {Method}
     * @memberof SQLParser
     * @param {String} sql
     * @returns {Array}
     */
    /*----------------------------------------------------------*/
    defunct__parseSQL(sql){
        let keywords = ["SELECT", "FROM", "WHERE", "AND"];
        let start    = 0;
        let result   = {};
        /**
         * loop keywords
         */
        keywords.forEach((key, index) => {
            /**
             * get end index
             */
            let end = sql.indexOf(keywords[index + 1]);
            if(end !== -1){
                /**
                 * push onto result
                 */
                result[key.toLowerCase()] = sql.substring(start, end).trim();
                /**
                 * reset start
                 */
                start = end;
            } else {
                /**
                 * check if already exists
                 */
                if(!result.hasOwnProperty(key.toLowerCase())){
                    result[key.toLowerCase()] = sql.substring(start, end).trim();
                }
            }
        });
        /**
         * return result array
         */
        return result;
    }
    /*----------------------------------------------------------*/
    /**
     * @name parseTable
     * @type {Method}
     * @memberof SQLParser
     * @param {String} sql
     * @returns {String}
     */
    /*----------------------------------------------------------*/
    parseTable(sql){
        return this.#parseAfter(sql, 'from');
    }
    /*----------------------------------------------------------*/
    /**
     * @name parseCondition
     * @type {Method}
     * @memberof SQLParser
     * @param {Arraylike} strings
     * @returns {}
     */
    /*----------------------------------------------------------*/
    parseCondition(strings){
        if(Array.isArray(strings)){
            /**
             * @name result
             */
            let result = [];
            strings.forEach(string => {
                /**
                 * split into parts
                 * TODO: check against ALL operators
                 */
                let parts = string.split('=');
                /**
                 * check for syntax error
                 */
                if(parts.length !== 2){
                    throw new SyntaxError(`SQL condition improperly formatted!: ${string}`);
                }
                /**
                 * get key and value
                 * trim both
                 * TODO: validate key
                 * TODO: validate value
                 */
                let key     = parts[0].trim();
                let value   = parts[1].trim();
                result.push({key, value});
            });
            return result;
        } else {
            throw new Error();
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name generateDelimiters
     * @type {Method}
     * @memberof SQLParser
     * @param {String} str
     * @private
     * @returns {String} word after the target
     */
    /*----------------------------------------------------------*/
    #generateDelimiters(str){
        /**
         * @name result
         * @type {Object}
         * @memberof generateDelimiters
         */
        let result = {};
        /**
         * @name tests
         * @type {Object}
         * @memberof generateDelimiters
         * @description Object of arrays to filter delimiters from
         */
        let tests = {};
        for(let key in this){
            if(this.hasOwnProperty(key) && key.startsWith('_') && Array.isArray(this[key])){
                /**
                 * assign tests obj
                 */
                tests[key.substring(1, key.length)] = this[key];
            }
        }
        /**
         * @name arr
         * @type {Array}
         * @memberof generateDelimiters
         */
        let arr = str.split(" ");
        /**
         * loop entries in tests object
         * perform map and filter to return result
         * use key of results obj to access this[property]
         */
        Object.entries(tests).forEach(test => {
            /**
             * declare properties
             */
            let key     = test[0];
            let values  = test[1];
            /**
             * run parser
             * store in result
             */
            let res     = this.#parseDelimiter(key, values, arr);
            result[key] = res[key];
            /**
             * debugging
             */
        });
        /**
         * clear up result
         * remove undefined
         */
        return Object.fromEntries(Object.entries(result).filter(
            ([_, value]) => value !== undefined
        ));
    }
    /*----------------------------------------------------------*/
    /**
     * @name #parseDelimiter
     * @type {Method}
     * @memberof SQLParser
     * @param {String} key key of this.properties test array
     * @param {Array} val array from this.properties tests
     * @param {Array} arr array from sql string
     * @private
     * @returns {Object}
     */
    /*----------------------------------------------------------*/
    #parseDelimiter(key, values, arr){
        /**
         * @name includesFunc
         * @type {Function}
         * @memberof parseDelimiter
         * @param {String} str
         * @param {String} key
         * @param {Array} values
         * @returns {Boolean}
         */
        function includesFunc(str, key, values){
            let res = false;
            if(key === 'funcs'){
                /**
                 * parse '(' from str
                 */
                let subStr = str.substring(0, str.indexOf('('));
                if(values.includes(subStr)){
                    res = true;
                }
            }
            return res;
        }
        /**
         * @name res
         * @type {Undefined | String | Array}
         */
        let res = arr.map(str => (values.includes(str) ? str : includesFunc(str, key, values) ? str.substring(0, str.indexOf('(')) : undefined))
            .filter(item => item !== undefined);
        /**
         * Check if multiple of just one value
         */
        if(res.length <= 1){
            return {[key]: res[0]}
        } else {
            return {[key]: res};
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name partitionString
     * @type {Method}
     * @memberof SQLParser
     * @param {String} sql
     * @param {Object} delimiters
     * @private
     * @returns {Object}
     */
    /*----------------------------------------------------------*/
    #partitionString(sql, delimiters){
        /**
         * TODO: get start index
         * TODO: get end index: strEnd - 1
         * TODO: return str from start to end
         */
        let result  = {};
        let pairs   = Object.values(delimiters).slice(1)
            .map((value, index) => [Object.values(delimiters)[index], value])
            .filter((pair, index) => {
                let start   = sql.indexOf(pair[0]);
                let end     = sql.indexOf(pair[1]);
                console.log(end);
                if(start < end){
                    //console.log(pair);
                }
            });
        
        /**
         * return result array
         */
        //console.log(pairs);
        return;
    }
    /*----------------------------------------------------------*/
    /**
     * @name parseAfter
     * @type {Method}
     * @memberof SQLParser
     * @param {String} sql
     * @param {String} target
     * @private
     * @returns {String} word after the target
     */
    /*----------------------------------------------------------*/
    #parseAfter(str, target){
        /**
         * validate string
         */
        if(typeof str !== 'string'){
            return undefined;
        } else if(str.length === 0) {
            return undefined;
        }
        /**
         * turn sql into lower case
         * target to lower
         */
        str     = str.toLowerCase();
        target  = target.toLowerCase();
        /**
         * check for target
         */
        if(str.includes(target)){
            /**
             * gather properties
             */
            let start = str.indexOf(target) + target.length;
            return str.substring(start).trim().split(' ')[0];
        } else {
            return undefined;
        }
    }
    /*----------------------------------------------------------*/
    /**
     * @name 
     * @type {Method}
     * @memberof SQLParser
     * @param {}
     * @property {}
     * @returns {}
     */
    /*----------------------------------------------------------*/
}
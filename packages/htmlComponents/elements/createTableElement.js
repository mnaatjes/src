/*----------------------------------------------------------*/
/**
 * @function createTableElement
 * 
 * @param {Object | Array} data - Data to parse into tabular form
 * 
 * @param {Object} options - options for tabular data
 * 
 * @param {Object | String} [options.caption] - Caption Element Properties | Text
 * 
 * @param {Object} [options.colgroup] - Container for colgroup properties
 * @param {Object} [options.colgroup.enabled] - Enable colgroups; default === false
 * @param {Object[]} [options.colgroup.col] - Array of col objects
 * @param {Number} [options.colgroup.col.span] - Span size of col
 * @param {Object} [options.colgroup.col.style] - Styling for col
 * @param {import("./createElement").HTMLProperties} [options.colgroup.props] - Other properties for col in colgroup
 * 
 * @param {Object} [options.thead] - thead container object
 * @param {Boolean} [options.thead.enabled] - enable or disable thead; default === true | enabled
 * @param {String[]} [options.thead.headers] - array of strings explicitly defining thead headers
 * @param {import("./createElement").HTMLProperties} [options.thead.props] - thead properties
 * 
 * @param {Object} [options.tbody] - tbody container object
 * @param {Boolean} [options.tbody.enabled] - enable or disable tbody; default === true | enabled
 * @param {import("./createElement").HTMLProperties} [options.tbody.props] - tbody properties
 * 
 * @param {Object} [options.tfoot] - tfoot container object
 * @param {Boolean} [options.tfoot.enabled] - enable or disable thead; default === false | disabled
 * 
 * @param {Object} [properties] - Properties for table element
 * 
 * @returns {HTMLElement} HTML Table Element
 */

import { createElement } from "./createElement.js";

/*----------------------------------------------------------*/
export function createTableElement(data, options={}, properties={}){
    /**
     * @function validateData
     * @param {Array} data
     * @returns {Boolean} true === valid data
     */
    function validateData(data=[]){
        /**
         * Check is object and array
         */
        if(typeof data !== 'object' || !Array.isArray(data)){
            /**
             * Check if single object
             */
            if(typeof data === 'object'){
                data = [data];
            } else {
                throw new TypeError('Data supplied is NOT correct data-type! Data must be an array!');
            }
        }
        /**
         * Check data exists
         */
        if(data.length === 0){
            throw new Error('Data Array supplied is EMPTY!');
        }
        /**
         * Check every element is an object and has same number of properties
         */
        const row = Object.keys(data[0]);
        return data.every(obj => {
            const curr = Object.keys(obj);
            return curr.length === row.length;
        })
    }
    /**
     * @function validateKeys
     * @param {Array} keys
     * @param {Array} data
     * @param {Boolean} fromHeaders
     */
    function validateKeys(keys, data, fromHeaders){
        /**
         * Check keys data-type
         */
        if(keys === null){
            throw new Error('Keys could not be defined! Please check data and options.thead.headers array!');
        }
        /**
         * Check keys based on source
         */
        if(fromHeaders){
            /**
             * keys from input options.thead.headers array
             */
            return Object.keys(data[0]).length === keys.length;
        } else {
            /**
             * keys from first object of data
             */
            return data.every(obj => {
                const curr = Object.keys(obj);
                return curr.every(key => keys.includes(key));
            });
        }
    }
    /**
     * Validate Data
     */
    if(!validateData(data)){
        throw new Error('Data supplied is inconsistent! Not all keys present in each row! Please check data!');
    }
    /**
     * Check if data object or array
     */
    if(typeof data === 'object'){
        if(!Array.isArray(data)){
            data = [data];
        }
    }
    /**
     * Declare options schema and consolidate with options:
     * 
     * @const {Object} schemaColgroup - schema for colgroup properties
     * @const {Object} schemaHead - Schema for options thead properties
     * @const {Object} schemaBody - Schema for options tbody properties
     * @const {Object} schemaFoot - Schema for options tfoot properties
     */
    const schemaColgroups = {

    };
    const schemaHead = {
        enabled: true,
        headers: [],
        props: {}
    };
    const schemaBody = {
        enabled: true,
        props: {}
    };
    const schemaFoot = {
        enabled: false,
        footings: [],
        props: {}
    };
    const config = {
        colgroups: {

        },
        thead: {...schemaHead, ...options.thead},
        tbody: {...schemaBody, ...options.tbody},
        tfoot: {...schemaFoot, ...options.tfoot}
    };
    /**
     * @const {Array} keys - keys array for tabular data
     */
    const keys  = config.thead.enabled && config.thead.headers.length > 0 ? config.thead.headers
                : config.thead.enabled && config.thead.headers.length === 0 ? Object.keys(data[0])
                : null;
    /**
     * Validate Keys
     */
    if(config.thead.enabled){
        if(!validateKeys(keys, data, config.thead.headers.length > 0)){
            throw new Error('Keys do not match columns in data! Please check data array and options.thead.headers!');
        }
    }
    /**
     * Create Table Element
     */
    const table = createElement('table', properties);
    /**
     * Create colgroup
     */

    /**
     * Create thead
     */
    if(config.thead.enabled){
        table.appendChild(
            createTableSection([keys], {tagName: 'thead', props: config.thead.props})
        )
    }
    /**
     * Create tbody
     */
    if(config.tbody.enabled){
        table.appendChild(
            createTableSection(data.map(obj => Object.values(obj)), {tagName: 'tbody', props: config.tbody.props})
        )
    }
    /**
     * Create tfoot
     */
    if(config.tfoot.enabled){
        table.appendChild(
            createTableSection([footings], {tagName: 'tfoot', props: config.tfoot.props})
        )
    }
    /**
     * return completed table
     */
    return table;
}
/*----------------------------------------------------------*/
/**
 * @function createColgroup
 * @param {Object[]} colgroup - Array of col objects
 * @param {Number} colgroup.span - Span size of col
 * @param {Object} colgroup.style - Styling for col in colgroup
 * @param {import("./createElement").HTMLProperties} colgroup.props - Other properties for col in colgroup
 * @returns {HTMLElement} colgroup element
 */
/*----------------------------------------------------------*/
export function createColgroup(colgroup=[]){
    /**
     * 
     */
    colgroup.forEach(col => {
        console.log(col.span);
        console.log(col.style);
        console.log(col.props);
    });
}

/*----------------------------------------------------------*/
/**
 * @function createTableSection
 * @param {String[][]} cols - 2d array of column and row data
 * @param {Object} config - Properties for tBody elements
 * @param {String} config.tagName - type of table section: thead, tbody, tfoot
 * @param {import("./createElement").HTMLProperties} [config.colProps] - column properties
 * @param {import("./createElement").HTMLProperties} [config.cellProps] - cell props properties
 */
/*----------------------------------------------------------*/
export function createTableSection(cols=[], config={}){
    /**
     * Validate table section tags
     */
    if(config.tagName === undefined){
        throw new Error('Table Section in "config.tagName" is missing!\nInclude value of "thead, tbody, or tfoot"!');
    }
    if(typeof config.tagName !== 'string'){
        throw new TypeError('Invalid "config.tagName" value! Value must be a string!');
    }
    if(!['thead', 'tbody', 'tfoot'].includes(config.tagName)){
        throw new TypeError(`Invalid "config.tagName" provided!\n"${config.tagName}" is not valid!`);
    }
    const section = createElement(config.tagName, config.props);
    /**
     * Map columns into tr and td tags
     */
    cols.map(col => {
        /**
         * Declare column element
         */
        const tr = document.createElement('tr');
        /**
         * Map and append td elements
         */
        col.map(row => {
            const cell       = document.createElement(config.tagName === 'thead' ? 'th' : 'td');
            cell.textContent = row;
            tr.appendChild(cell);
        });
        /**
         * Append column to table section element
         */
        section.appendChild(tr);
    });
    /**
     * return completed table section element
     */
    return section;
}

/*----------------------------------------------------------*/
/**
 * @file src/js/data/src/converter__json-to-js.js
 * 
 * @memberof Data.Src
 * @description converts json file data to javascript file with variable
 */
/*----------------------------------------------------------*/
const { jsonToJS }  = require('../helpers/json-to-js.js');
const { fetchData } = require('../helpers/fetch.js');
/**
 * fetch data
 */
fetchData('http://localhost/src/js/data/json/surnames.json')
    .then(data => {
        /**
         * write data to js file
         */
        jsonToJS(data, '../js/surnames.js', 'surnames');
    });
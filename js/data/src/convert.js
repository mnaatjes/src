/*----------------------------------------------------------*/
/**
 * @file src/js/data/helpers/csv-to-json.js
 * 
 * @function convert.js
 * @memberof Data.Helpers
 * 
 * @param {String} filePathCSV path to input csv file
 * @param {String} filePathJSON path to input csv file
 * @param {String} title
 * @param {Array} colsTotal total columns (i.e. property names)
 * @param {Array} colsOutput columns to include in output data
 * @description 
 * @returns {Promise}
 */
/*----------------------------------------------------------*/
const { csvToJavascript } = require('../helpers/csv-to-javascript.js');
/**
 * @implements { csvToJavascript }
 */
csvToJavascript(
    '../csv/word-freq-top5000.csv', 
    '../json/english.json',
    [
        'rank',
        'word',
        'parts',
        'frequency',
        'dispersion'
    ],
    [
        'rank',
        'word',
        'parts',
        'frequency',
        'dispersion'
    ],
    'english',
    '../js/english.js'
)
.then((jsonData) => {
    console.log(jsonData);
    console.log('Success!');
});
/*----------------------------------------------------------*/
/**
 * @file src/js/data/src/converter__csv-to-json.js
 * 
 * @memberof Data.Src
 * @description 
 */
/*----------------------------------------------------------*/
/**
 * @requires csvToJSON
 */
const { csvToJSON } = require('../helpers/csv-to-json.js');
/**
 * @constant csvFile
 * @constant csvFile
 * @constant csvFile
 * @constant csvFile
 */
const csvFile       = '../csv/common-surnames-by-country.csv';
const jsonFile      = '../json/surnames.json';
const colsTotal     = [
    /**
    "Country",
    "Country Group",
    "Region",
    "Population",
    "Note",
    "Year",
    "Romanization",
    "Index",
    "Name Group",
    "Gender",
    "LocalizedName",
    "RomanizedName"
    */
    'country',
    'rank',
    'index',
    'nameGroup',
    'localizedName',
    'surname',
    'count',
    'percent'
];
const colsOutput    = [
    /**
    "Country",
    "Country Group",
    "Year",
    "Index",
    "Gender",
    "RomanizedName"
    */
    'country',
    'rank',
    'surname',
    'count',
];
/**
 * @implements {csvToJSON}
 */
let x = await csvToJSON(csvFile, jsonFile, colsTotal, colsOutput)
    .then(() => {
        console.log('CSV converted Successfully');
    })
    .catch((error) => {
        console.error('Error:', error);
    })
console.log(x);
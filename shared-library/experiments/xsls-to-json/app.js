/**
 * @namespace XLSXTOJSON
 */
const xlsx = require('./main.js');

const inputDir       = './json';
const outputDir      = './json/combined';
const outputFileName = 'dnaatjes_phone_records';
/**
 * @implements {convertMultiple}
 */
//xlsx.convertMultiple(inputDir, outputDir);
//xlsx.combineJSON(inputDir, outputDir, outputFileName);
xlsx.convertToCSV();
/*----------------------------------------------------------*/
/**
 * @file src/js/data/helpers/csv-to-javascript.js
 * 
 * @function csvToJavascript
 * @memberof Data.Helpers
 * 
 * @param {String} filePathCSV path to input csv file
 * @param {String} filePathCSV path to output json file
 * @param {Array} colsTotal total columns (i.e. property names)
 * @param {Array} colsOutput columns to include in output data
 * @description 
 * @returns {Promise}
 */
/*----------------------------------------------------------*/
const fs            = require('fs');
const { parse }     = require('csv-parse');
const { fetchData } = require('../helpers/fetch.js');

function csvToJavascript(filePathCSV, filePathJSON, colsTotal, colsOutput, constName, filePathJavascript){
    /**
     * create promise and return
     */
    return new Promise((resolve, reject) => {
        /**
         * declare result
         */
        const result = [];
        /**
         * read csv file
         */
        fs.createReadStream(filePathCSV)
            .pipe(parse({columns: colsTotal}))
            .on('data', (row) => {
                /**
                 * declare selected data
                 */
                const data = {};
                /**
                 * trim values and set row
                 */
                colsOutput.forEach(col => {
                    data[col] = row[col].trim();
                });
                /**
                 * push to result
                 */
                result.push(data);
            })
            .on('error', (error) => reject(error))
            .on('end', () => {
                /**
                 * write to JSON file
                 */
                fs.writeFileSync(filePathJSON, JSON.stringify(result, null, 2), 'utf-8');
                /**
                 * grab json data
                 */
                const jsonData = JSON.stringify(result, null, 2);
                /**
                 * write javascript file
                 */
                try {
                    /**
                     * create variable and assign data to it
                     */
                    const jsContent = `export const ${constName} = ${jsonData};\n`;
                    /**
                     * write file
                     */
                    fs.writeFileSync(filePathJavascript, jsContent, 'utf-8');
                    console.log('Great Success!');
                } catch(error){
                    console.error(`Error saving data to javascript file: ${error}`);
                }
                /**
                 * resolve promise and return json data
                 */
                resolve(jsonData);
            })
    });
}
/**
 * @exports csvToJavascript
 */
module.exports = { csvToJavascript };
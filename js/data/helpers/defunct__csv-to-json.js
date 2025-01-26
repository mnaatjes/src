/*----------------------------------------------------------*/
/**
 * @file src/js/data/helpers/csv-to-json.js
 * 
 * @function csvToJSON
 * @memberof Data.Helpers
 * 
 * @param {String} fpCSV path to input csv file
 * @param {String} fpJSON path to output json file
 * @param {Array} colsTotal total columns (i.e. property names)
 * @param {Array} colsOutput columns to include in output data
 * @description 
 * @returns {Promise}
 */
/*----------------------------------------------------------*/
async function csvToJSON(fpCSV, fpJSON, colsTotal, colsOutput){
  /**
   * @function parseValue
   * @memberof csvToJSON
   * 
   * @param {String} value
   * @returns {*} formatted value
   */
  function parseValue(value){
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      } else if (!isNaN(Number(value))) {
        return Number(value);
      } else if (value === 'null') {
        return null;
      } else if (value === 'undefined') {
        return undefined;
      } else if (value.match(/^\d{4}-\d{2}-\d{2}$/) !== null) { 
        // Check for ISO 8601 date format (YYYY-MM-DD)
        const date = new Date(value);
        return date;
      } else {
        return value;
      }
  }
  /**
   * @constant {Object} fs - File System Module
   */
  const fs = require('fs');
  /**
   * @constant {Object} parse - File System Module
   */
  const { parse } = require('csv-parse');
  /**
   * return promise
   */
  return new Promise((resolve, reject) => {
      /**
       * declare results arr
       */
      const results = [];
      /**
       * open read and parse
       */
      fs.createReadStream(fpCSV)
        .pipe(parse({columns: colsTotal}))
        .on('data', (row) => {
          /**
           * define selected data
           */
          const data = {};
          colsOutput.forEach(col => {
            /**
             * trim values
             */
            row[col] = row[col].trim();
            /**
             * check for empty values
             */
              if(row[col].length !== 0){
                data[col] = parseValue(row[col]);
              } else {
                data[col] = null;
              }
          });
          results.push(data);
        })
        /**
         * on reject, report error
         */
        .on('error', (error) => reject(error))
        .on('end', () => {
          /**
           * write to json file
           */
          fs.writeFileSync(fpJSON, JSON.stringify(results, null, 2), 'utf-8', (error) => {
            if(error){
              reject(error);
            } else {
              resolve();
            }
          });
        });
  });
}
/**
 * @exports csvToJSON
 */
module.exports = { csvToJSON };
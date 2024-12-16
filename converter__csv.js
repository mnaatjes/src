/**
 * requirements
 */
const { error } = require('console');
const csvToJSON = require('csvtojson');
const fs = require('fs');
/**
 * file path
 */
const fpCSV     = 'csv/mimetypes.csv';
const fpJSON    = 'json/mimetypes.json';

csvToJSON()
    .fromFile(fpCSV)
    .then((jsonArray) => {
        fs.writeFileSync(fpJSON, JSON.stringify(jsonArray, null, 2));
        console.log('Complete...');
    })
    .catch((error) => {
        console.error(error);
    });
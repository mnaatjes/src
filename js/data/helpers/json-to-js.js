/*----------------------------------------------------------*/
/**
 * @file src/js/data/src/json-to-js.js
 * 
 * @function jsonToJS
 * @memberof Data.Src
 * 
 * @param {Object} jsonData
 * @param {String} fpOutput path/to/output/file.js
 * @param {String} constName
 * @description 
 */
/*----------------------------------------------------------*/
function jsonToJS(jsonData, fpOutput, constName){
    /**
     * @constant fs
     */
    const fs = require('fs');
    try {
        /**
         * create variable and assign data to it
         */
        const jsContent = `export const ${constName} = ${JSON.stringify(jsonData, null, 2)};\n`;
        /**
         * write file
         */
        fs.writeFileSync(fpOutput, jsContent, 'utf-8');
        console.log('Great Success!');
    } catch(error){
        console.error(`Error saving data to javascript file: ${error}`);
    }
}

module.exports = {jsonToJS};
/**
 * @name xsls-to-json
 */
const xlsx  = require('xlsx');
const fs    = require('fs');
const path  = require('path');
const parse = require('json2csv');
/**
 * @function xslxToJSON
 * @description convert xlsx to json
 */
function xslxToJSON(filePath){
    try {
        let workbook = xlsx.readFile(filePath);
        let json     = {};

        workbook.SheetNames.forEach((sheetname) => {
            let sheet = workbook.Sheets[sheetname];
            json[sheetname] = xlsx.utils.sheet_to_json(sheet);
        });
        return json;
    } catch(error){
        console.error(`Error processing file: ${filePath}`, error);
        return null;
    }
}
/**
 * @function convertMultiple
 * @description
 */
function convertMultiple(inputDir, outputDir){
    /**
     * create output directory if it does not exist
     */
    if(!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir, {recursive: true});
    }
    /**
     * read xsls doc
     */
    fs.readdir(inputDir, (err, files) => {
        if(err){
            console.error('Ooops', err);
            return;
        } else {
            /**
             * loop files and apply conversion
             */
            files.forEach((file) => {
                let filePath    = path.join(inputDir, file);
                let fileExt     = path.extname(file).toLowerCase();

                if(fileExt === '.xlsx' || fileExt === '.xls'){
                    /**
                     * grab data from conversion function
                     */
                    let data = xslxToJSON(filePath);
                    if(data){
                        let fileName    = path.basename(file, fileExt);
                        let outputPath  = path.join(outputDir, `${fileName}.json`);
                        /**
                         * write json file
                         */
                        fs.writeFile(outputPath, JSON.stringify(data, null, 2), (err) => {
                            if(err){
                                console.error(`Error writing JSON file ${outputPath}`, err);
                            } else {
                                console.log(`Converted ${file} to ${fileName}.json!`);
                            }
                        });
                    }
                }
            });
        }
    });
}
/**
 * @function combineJSON
 */
function combineJSON(inputDir, outputDir, outputFileName, mergeArrays=false){
    try {
        /**
         * check input dir
         */
        if(!fs.existsSync(inputDir)){
            throw new Error(`Input Directory: ${inputDir} does not exist`);
        }
        /**
         * assign props
         */
        let data    = {};
        let files   = fs.readdirSync(inputDir);
        /**
         * loop files and convert
         */
        files.forEach(file => {
            let filePath = path.join(inputDir, file);
            /**
             * check that files are json files
             */
            if(path.extname(file).toLowerCase() === '.json'){
                try{
                    let fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                    /**
                     * evaluate key, value pairs
                     */
                    for(let key in fileData){
                        if(fileData.hasOwnProperty(key)){
                            if(mergeArrays && Array.isArray(data[key])){
                                data[key] = data[key].concat(fileData[key]);
                            } else {
                                data[key] = fileData[key];
                            }
                        }
                        /**
                         * return message
                         */
                        console.log(`Data combined successfully from ${file}`);
                    }
                    /**
                     * write new file
                     * return message
                     */
                    fs.writeFileSync(outputDir + '/' + outputFileName + '.json', JSON.stringify(data, null, 2), 'utf-8');
                    console.log(`JSON files combined into: ${outputDir}`);
                } catch(parseError){
                    console.error(`Error parsing some json: ${parseError}`);
                    return null;
                }
            }
        });
    } catch(error){
        console.error(`Error combining JSON Files`, error);
        return null;
    }
}
/**
 * @function convertToCSV
 */
function convertToCSV(inputFilePath, outputFilePath){
    try{
        let json = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));
        if(!Array.isArray(json)){
            throw new Error(`Cannot parse! Data must be an array of objects`);
        }
    } catch(err){
        console.error(`Could not convert JSON file to CSV!`, err);
        return null;
    }
}
/**
 * @exports
 */
module.exports = {
    convertMultiple,
    xslxToJSON,
    combineJSON,
    convertToCSV
};
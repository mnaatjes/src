/*----------------------------------------------------------*/
/**
 * @file src/js/data/helpers/fetch.js
 * 
 * @function fetchData
 * @memberof Data.Src
 * 
 * @param {String} filePath /path/to/file.js
 * @description converts json file data to javascript file with variable
 */
/*----------------------------------------------------------*/
async function fetchData(filePath) {
    try {
        const res = await fetch(filePath);
        /**
         * report error
         */
        if(!res.ok){
            throw new Error(`HTTP ERROR: status ${res.status}`);
        }
        /**
         * grab data
         * return data
         */
        const jsonData = await res.json();
        return jsonData;
    } catch (error){
        console.error('Problems!', error);
        return null;
    }
}
/**
 * @exports fetchData
 */
module.exports = { fetchData };
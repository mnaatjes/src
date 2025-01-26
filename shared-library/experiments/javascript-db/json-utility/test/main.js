/**
 * @file json-utility/test/main.js
 * 
 * @import
 * @module JSONUtility
 */
import { JSONUtility } from "../src/core/json-utility.js"; 
console.log('JSON Utility');
console.log('----------------');
/**
 * @description dummy data
 */
const weatherData = [];

/**
 * @name randomDate
 * @type {Function}
 */
function randomDate(){
    let start   = new Date(2020, 0, 1); // Jan 1 2022
    let end     = new Date(); // today
    let random  = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return random.toISOString().slice(0, 10);
}
/**
 * @name randomCode
 * @type {Function}
 * @param {Number} len length of code
 */
function randomCode(len, min=undefined, max=undefined){
    if(min === undefined && max === undefined){
        min = Math.pow(10, len - 1);
        max = Math.pow(10, len) -1;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;

}
for (let i = 0; i <= 99; i++) {
  weatherData.push({
    //id: i,
    date: randomDate(),
    zipCode: randomCode(5, 1000, 99950), // Example: Generate a simple location code
    temperature: Math.floor(Math.random() * 40) - 10, // Random temperature between -10 and 30 degrees Celsius
    humidity: Math.floor(Math.random() * 81) + 20, // Random humidity between 20% and 100%
    windSpeed: Math.floor(Math.random() * 21) // Random wind speed between 0 and 20 mph
  });
}
const test = new JSONUtility(JSON.stringify(weatherData));
test.orderBy('zipCode', 'asc');
let result = test.select('zipCode, date', 'zipCode > 3000');
console.log(result);
//console.log(test.dataType);
//console.log(test);

/*----------------------------------------------------------*/
/**
 * @file /src/utils/utils__array/test/main.js
 * 
 */
import * as _ from '../core/utils__array.js';
/*----------------------------------------------------------*/
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
for (let i = 0; i <= 60003; i++) {
  weatherData.push({
    //id: i,
    date: randomDate(),
    zip: randomCode(5, 99930, 99950), // Example: Generate a simple location code
    temp: Math.floor(Math.random() * 100) - 10, // Random temperature between -10 and 30 degrees Celsius
    humidity: Math.floor(Math.random() * 81) + 20, // Random humidity between 20% and 100%
    wind: Math.floor(Math.random() * 21) // Random wind speed between 0 and 20 mph
  });
}
/**
 * @name randomDates
 * @type {Array}
 */
const randomDates = [];
for(let i = 0; i < 6; i++){
    randomDates.push(randomDate());
}
/**
 * @name randomNums
 * @type {Array}
 */
const randomNums = [];
for(let i = 0; i < 100; i++){
    randomNums.push(randomCode(_, 350, 360));
}
/**
 * @name randomArrs
 * @type {Array}
 */
const randomArrs = [];
for(let i = 0; i < 12; i++){
    let subLen  = Math.floor(Math.random() * (6 - 1)) + 1;
    let sub     = [];
    for(let j = 0; j < subLen; j++){
        sub.push(randomCode(2, 1, 19));
    }
    randomArrs.push(sub);
}
/**
 * @implements {shuffle, sortAsc, sortDesc }
 */
console.log(_.distinct(weatherData, 'temp, zip'));
/*
console.log(randomNums);
console.log(_.shuffle(randomNums));
console.log(_.sortAsc(randomNums));
console.log(_.sortDesc(randomNums));
console.log(_.min(randomNums));
*/
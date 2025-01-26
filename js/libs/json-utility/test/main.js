/**
 * @file libs/json-utility/main.js
 * 
 * @module JSONUtility
 */
import { JSONUtility } from "../src/core/json-utility.js";

const test = new JSONUtility('Test DB');
const settings = {
    person: {},
    age: {},
    city: {}
};
const options = {
    pkey: 'person'
};
const data = [
    { person: "Alice", age: 0, city: "New York", month: '10-12-46'},
    { person: "Bob", age: 30, city: "Los Angeles", month: '1-5-45'},
    { person: "Charlie", age: 22, city: "Chicago", month: '2-5-89'},
    { person: "David", age: 22, city: "London", month: '5-8-21'}
];
test.createTable('Test Table', data);
//test.createTable('Test Table', settings, options);

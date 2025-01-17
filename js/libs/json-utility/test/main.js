/*----------------------------------------------------------*/
/**
 * @file json-utility/src/test/main.js
 * @namespace JSONUtility.Main
 * @implements {JSONUtility}
 */
/*----------------------------------------------------------*/
import { JSONUtility } from "../src/core/json-utility.js";

const test = new JSONUtility('DBName');
test.createTable('pets');
test.query('SELECT SUM(*) FROM pets WHERE animal = "dog" AND age = 2');
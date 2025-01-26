/*----------------------------------------------------------*/
/**
 * @file json-db/src/test/main.js
 * @namespace JSONDB.Main
 * @implements {JSONDB}
 */
/*----------------------------------------------------------*/
import { JSONDB } from "../src/core/json-db.js";

const test = new JSONDB('DBName');
test.createTable('pets');
test.query('SELECT SUM(*) FROM pets WHERE animal = "dog" AND age = 2');
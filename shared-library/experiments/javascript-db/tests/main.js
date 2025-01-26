/*----------------------------------------------------------*/
/**
 * @file src/js/services/jsdb/tests/main.js
 * @author Michael Naatjes
 * @version 1.0.0
 * 
 * @memberof JSDB
 * @description 
 */
/*----------------------------------------------------------*/
/**
 * @description connect to mysql server
 * @constant { mysql, connection }
 */
const mysql      = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'phpmyadmin',
    password: 'rtt234egs',
    database: 'test_express'
})
/**
 * check for error
 */
connection.connect((error) => {
    if(error){
        console.error('Connection error:', error);
    } else {
        console.log(`Connection to ${'test_express'} successful!`);
    }
});
/**
 * @function createTable
 * @memberof JSDB
 * @description
 * @returns {}
 */
async function createTable(res){
    try {
        connection.query('', (error, results) => {
            if(error){
                console.log('Error executing query:', error.stack);
            }
            res.json(results);
            return;
        });
    } catch(error){
        console.error('Error creating table:', error);
    }
}
const sql = 'CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)';
/**
 * @constant { express, app, port }
 */
const express   = require('express');
const app       = express();
const port      = 3000;
/**
 * @implements {express}
 * @description main page
 */
app.get('/', (req, res) => {
    res.send('Hello Gemini');
    /**
     * attempt to create table
     */
    connection.query(sql, (error, results) => {
        if(error){
            console.error('Error executing query:', error);
            res.status(500).send('Error creating table');
            return
        }
        res.json(results);
    });
});
/**
 * @listens port#3000
 * @description report to console that server is listening
 */
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
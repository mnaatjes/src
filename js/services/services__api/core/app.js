/*----------------------------------------------------------*/
/**
 * @file src/js/services/services__api/core/app.js
 * @author Michael Naatjes
 * @version 1.0.0
 * 
 * @namespace APIService
 * @description 
 */
/*----------------------------------------------------------*/
/**
 * @description data to display via api
 * @constant { surnames }
 */
//import {surnames} from './data/surnames.js';
const {surnames} = require('./data/surnames.js');
/**
 * @description express.js constants
 * @constant { app, express, port }
 */
const express   = require('express');
const app       = express();
const path      = require('path');
const port      = 3000;
/**
 * define public directory
 */
app.use(express.static(path.join(__dirname, 'public')));
/**
 * set up ejs as view engine
 * establish views directory
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
/**
 * main route
 */
app.get('/', (req, res) => {
    /**
     * serve static file
     */
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
/**
 * info service
 */
app.get('/info', (req, res) => {
    /**
     * render ejs file
     */
    res.render('info.ejs', {list: surnames});
});
/**
 * port listener
 */
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
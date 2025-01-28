/*----------------------------------------------------------*/
/**
 * @file src/apps/file-converter/app.js
 * @version 1.0.0
 * 
 * @namespace FileConverter
 * @description application for converting csv files to json
 */
/*----------------------------------------------------------*/
/**
 * @description express.js constants
 * @constant { app, express, port }
 */
const express           = require('express');
const uploadMiddleware  = require('./middleware/upload-middleware');
const app               = express();
const path              = require('path');
const port              = 3000;
/**
 * define public directory
 */
app.use(express.static(path.join(__dirname, 'public')));
/**
 * import stylesheet
 */
app.use('/styles/css', express.static('../../shared-library/styles/css'));
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
    //res.sendFile(path.join(__dirname, 'public', 'index.html'));
    /**
     * serve view index.ejs
     */
    res.render('index.ejs');
});
/**
 * post to upload
 */
app.post('/upload', uploadMiddleware(path), (req, res) => {
    /**
     * attempt to req file and json
     */
    try {
        if(!req.file){
            /**
             * no file selected for upload
             */
            return res.status(400).json({error: 'No file uploaded!'});
        }
        /**
         * resolve json from file upload
         */
        //res.json();
        res.render('info.ejs', {message: 'File Uploaded Successfully', filename: req.file.filename, ext: path.extname(req.file.filename)});
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Error uploading file'});
    }
});
/**
 * port listener
 */
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
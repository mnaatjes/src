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
const e = require('express');
const express   = require('express');
const multer    = require('multer');
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
 * configure multer
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        let unique = Date.now() + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '__' + unique + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});
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
 * post to upload
 */
app.post('/upload', upload.single('file'), (req, res) => {
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
        res.json({message: 'File Uploaded Successfully', filename: req.file.filename});
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Error uploading file'})
    }

});
/**
 * port listener
 */
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
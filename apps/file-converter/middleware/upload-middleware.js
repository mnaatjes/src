/*----------------------------------------------------------*/
/**
 * @file src/apps/file-converter/middleware/upload-middleware.js
 * @version 1.0.0
 * 
 * @module uploadMiddleware
 * @description
 */
/*----------------------------------------------------------*/
/**
 * @function uploadMiddleware
 */
const uploadMiddleware = (pathModule) => {
    /**
     * @module multer
     */
    const multer = require('multer');
    /**
     * configure multer
     * @constant storage
     * @type {Object}
     */
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            let unique = Date.now() + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '__' + unique + pathModule.extname(file.originalname));
        }
    });
    /**
     * @const upload
     */
    const upload = multer({storage: storage});
    /**
     * @constant uploadMiddleware
     */
    return upload.single('file');
};
/**
 * @exports upload
 */
module.exports = uploadMiddleware;
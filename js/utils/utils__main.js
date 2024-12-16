/*----------------------------------------------------------*/
/**
 * @file src/js/utils/utils__main.js
 * @author mnaatjes
 * @version 1.0.0
 * @date    11-15-2024
 * @updated 12-12-2024
 * @memberof Src.Utils
 * 
 * @name UtilsMain
 * @namespace UtilsMain
 */
/*----------------------------------------------------------*/

/*----------------------------------------------------------*/
/**
 * @name randNum
 * @type {Function}
 * @memberof UtilsMain
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} between min and max, random
 */
/*----------------------------------------------------------*/
function randNum(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*----------------------------------------------------------*/
/**
 * @name getGCF
 * @type {Function}
 * @memberof UtilsMain
 * @param {Number} a
 * @param {Number} b
 * @returns {Number} greatest common factor
 */
/*----------------------------------------------------------*/
function getGCF(a, b){
    /**
     * ensure b is not 0
     */
    if(a == 0){return b;}

    return getGCF(b % a, a);

}
/*----------------------------------------------------------*/
/**
 * @name range
 * @type {Function}
 * @memberof UtilsMain
 * @param {number} start beginning of range
 * @param {number} end end of range
 * @returns {Boolean} false
 */
/*----------------------------------------------------------*/
function range(start, end) {
    /**
     * @name result
     * @description array for range numbers
     */
    let result = [];
    /**
     * loop and build array range
     */
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    /**
     * return result
     */
    return result;
}
/*----------------------------------------------------------*/
/**
 * @name tryParseInt
 * @type {Function}
 * @memberof UtilsMain
 * @param {Number | String | Float} num
 * @returns {Boolean}
 */
/*----------------------------------------------------------*/
function tryParseInt(num){
    /**
     * try
     */
    try{
        return Number.isInteger(parseInt(num));
    /**
     * error condition
     */
    } catch(error){
        return false;
    }
}
/*----------------------------------------------------------*/
/**
 * @name tryParseFloat
 * @type {Function}
 * @memberof UtilsMain
 * @param {Number | String | Float} num
 * @returns {Boolean}
 */
/*----------------------------------------------------------*/
function tryParseFloat(num){
    /**
     * try
     */
    try{
        return !isNaN(parseFloat(num));
    /**
     * error condition
     */
    } catch(error){
        return false;
    }
}
/*----------------------------------------------------------*/
/**
 * @name enableNode
 * @type {Function}
 * @memberof UtilsMain
 * @param {HTMLElement} node
 * @returns {Boolean} false
 */
/*----------------------------------------------------------*/
function enableNode(node){
    node.setAttribute('data-state', 'enabled');
    return true;
}
/*----------------------------------------------------------*/
/**
 * @name disableNode
 * @type {Function}
 * @memberof UtilsMain
 * @param {HTMLElement} node
 * @returns {Boolean} false
 */
/*----------------------------------------------------------*/
function disableNode(node){
    node.setAttribute('data-state', 'disabled');
    return false;
}
/*----------------------------------------------------------*/
/**
 * @name clearNode
 * @type {Function}
 * @memberof UtilsMain
 * @param {HTMLElement} node
 * @returns {Boolean} false
 */
/*----------------------------------------------------------*/
function clearNode(node){
    node.innerHTML = '';
    return true;
}
/*----------------------------------------------------------*/
/**
 * @name writeNode
 * @type {Function}
 * @memberof UtilsMain
 * @param {HTMLElement} node
 * @param {String} string
 * @returns {Boolean} false
 */
/*----------------------------------------------------------*/
function writeNode(node, string){
    node.innerHTML = string;
    return true;
}
/*----------------------------------------------------------*/
/**
 * @name traverseJSON
 * @type {Function}
 * @memberof UtilsMain
 * @param {String | Object} obj json object
 * @param {Function} callback perform actions on key, value pairs
 * @returns {Object} json key, values
 */
/*----------------------------------------------------------*/
function traverseJSON(obj, callback){
    /**
     * check if string
     */
    if(typeof json == 'string'){json = JSON.parse(json);}
    /**
     * loop json value key pairs
     */
    for(let key in obj){
        /**
         * check if key exists
         */
        if(obj.hasOwnProperty(key)){
            /**
             * run callback
             */
            callback(key, obj[key]);
            /**
             * iterate through next object
             */
            if(typeof obj[key] == 'object'){
                /**
                 * call function
                 */
                traverseJSON(obj[key], callback);
            }
        }
    }
}
/*----------------------------------------------------------*/
/**
 * @name listJSON
 * @type {Function}
 * @memberof UtilsMain
 * @param {String | Object} obj json object
 * @param {Number} depth selector for how deep
 * @param {Function} callback execute function
 * @param {Number} curr current depth
 * @returns {Object} list objects at depth n
 */
/*----------------------------------------------------------*/
function listJSON(obj, depth, callback, curr=0){
    /**
     * check depth
     */
    if(curr == depth){
        /**
         * if depths match
         * check if value is object
         * and object is not empty
         */
        if(typeof obj === 'object' && obj != null){
            /**
             * perform callback actions
             */
            callback(obj, curr);
        } 
    } else {
        /**
         * if depths don't match
         * go deeper into object
         * loop object for inner objects
         */
        for(let key in obj){
            /**
             * validate obj
             */
            if(typeof obj[key] === 'object' && obj[key] != null){
                /**
                 * run self
                 * at increased depth
                 */
                listJSON(obj[key], depth, callback, (curr + 1));
            }
        }
    }
}
/*----------------------------------------------------------*/
/**
 * @name setCSSStyles
 * @type {Funciton}
 * @memberof UtilsMain
 * @param {Object} element
 * @param {Object} styles property: value pairs
 * @param {String} styles.key property
 * @param {String | Object} styles.value prop-value or css function-value pair
 * @param {Object} styles.value.obj func, value
 * @param {Array} styles.value.[obj]
 */
/*----------------------------------------------------------*/
function setCSSStyles(element, styles){
    for(let property in styles){
        if(typeof styles[property] == 'object'){
            /**
             * if is object:
             * css property containing a function or functions
             */
            let obj = styles[property];
            /**
             * grab fun and value from object
             * set style property with function and value
             */
            let row = '';
            for(let func in obj){
                row += `${func}(${obj[func]}) `;
            }
            /**
             * execute style change
             */
            //console.log(row);
            element.style[property] = row;
        } else if(Array.isArray(styles[property])){
            // TODO: Fix looping array
            // TODO: Get function from key
            // TODO: Get value from obj[key]
            /**
             * if is array:
             * define catcher string
             */
            let row = '';
            /**
             * loop func, values and collect
             */
            styles[property].forEach(obj => {
                 row += ` ${obj.func}(${obj.value})`;
            });
            /**
             * set style property with functions and values
             */
            element.style[property] = row;
        }
        else {
            /**
             * if is normal:
             * regular css expression
             */
            element.style[property] = styles[property];
        }
    }
}
/*----------------------------------------------------------*/
/**
 * @name degToRad
 * @type {Function}
 * @memberof UtilsMain
 * @description
 * @param {Number} degrees
 * @returns {Number} radians
 */
/*----------------------------------------------------------*/
function degToRad(degrees){return degrees * (Math.PI / 180);}
/*----------------------------------------------------------*/
/**
 * @name radToDeg
 * @type {Function}
 * @memberof UtilsMain
 * @description
 * @param {Number} radians
 * @returns {Number} degrees
 */
/*----------------------------------------------------------*/
function radToDeg(radians){return radians * (180 / Math.PI);}
/*----------------------------------------------------------*/
/**
 * @name findCenter
 * @type {Function}
 * @memberof UtilsMain
 * @description
 * @param {Object} element
 * @property {Object} rect
 * @returns {Object} {cx, cy}
 */
/*----------------------------------------------------------*/
function findCenter(element){
    /**
     * @name rect
     * @type {Object}
     * @description client rect object
     */
    let rect    = element.getBoundingClientRect();
    let cx      = rect.left + rect.width / 2;
    let cy      = rect.top + rect.height / 2;
    /**
     * return as object
     */
    return {cx: cx, cy: cy};
}
/*----------------------------------------------------------*/
/**
 * @name isNumber
 * @type {Function}
 * @memberof UtilsMain
 * @param {String} value
 * @returns {Boolean}
 */
/*----------------------------------------------------------*/
function isNumber(value){
    /**
     * test if number
     */
    if(!isNaN(value) && isFinite(value)){
        /**
         * check float
         */
        try {
            if(parseFloat(value)){
                return true;
            }
        } catch (error) {
            /**
             * cannot parse number
             */
            return false;
        }
    } else {
        /**
         * result didnt pass test
         * return: not a number
         */
        return false;
    }
}
/*----------------------------------------------------------*/
/**
 * @name isBoolean
 * @type {Function}
 * @memberof UtilsMain
 * @param {String} value
 * @returns {Undefined | Boolean}
 */
/*----------------------------------------------------------*/
function isBoolean(value){
    /**
     * check if already a boolean
     */
    if(typeof value === 'boolean'){
        return true;
    } else if(typeof value === 'number' || typeof value === 'object') {
        return false;
    } else if (typeof value === 'string') {
        /**
         * set to lower case
         */
        value = value.toLowerCase();
        /**
         * check if boolean
         */
        return (value === 'true' || value === 'false');
    } else {
        return undefined;
    }
}
/*----------------------------------------------------------*/
/**
 * @name isString
 * @type {Function}
 * @memberof UtilsMain
 * @param {String} value
 * @returns {Boolean}
 */
/*----------------------------------------------------------*/
function isString(value){
    /**
     * trim value of leading, ending whitespace
     */
    value = value.trim();
    /**
     * check length
     * return boolean
     */
    return value.length >= 1 && typeof value === 'string';
}
/*----------------------------------------------------------*/
/**
 * @name tryJSONParse
 * @type {Function}
 * @memberof UtilsMain
 * @param {String} value
 * @returns {Boolean}
 */
/*----------------------------------------------------------*/
function tryJSONParse(value){
    /**
     * check if string
     */
    if(typeof value === 'string'){
        /**
         * try JSON.parse
         */
        try {
            /**
             * parse and return true
             */
            JSON.parse(value);
            return true;
        } catch (error){
            /**
             * could not parse string
             */
            return false;
        }
    } else {
        /**
         * value is not a string
         */
        return false;
    }
}
/*----------------------------------------------------------*/
/**
 * @name parseType
 * @type {Function}
 * @memberof UtilsMain
 * @property {String} value
 * @description
 * @returns {Undefined | String} typeof value supplied
 */
/*----------------------------------------------------------*/
function parseType(value){
    /**
     * check if number
     */
    if(!isNumber(value)){
        /**
         * check boolean
         */
        if(!isBoolean(value)){
            /**
             * check string
             */
            if(!isString(value)){
                return undefined;
            } else {
                /**
                 * check if stringified JSON value:
                 */
                if(tryJSONParse(value)){
                    /**
                     * parse json string
                     */
                    let json = JSON.parse(value);
                    /**
                     * check Array, Object
                     */
                    if(Array.isArray(json)){
                        /**
                         * return type
                         */
                        return 'array';
                    } else {
                        /**
                         * return typeof
                         */
                        return typeof json;
                    }
                } else {
                    /**
                     * value is not a JSON string
                     * return type
                     */
                    return 'string';
                }
            }
        } else {
            /**
             * return type
             */
            return 'boolean';
        }
    } else {
        /**
         * return type
         */
        return 'number';
    }
}
/*----------------------------------------------------------*/
/**
 * @name isMIMEType
 * @type {Function}
 * @memberof UtilsMain
 * @namespace isMIMEType
 * @description
 * @param {String} value
 * @property {}
 * @returns {}
 */
/*----------------------------------------------------------*/
function isMIMEType(value){
    /**
     * @name mimeTypes
     * @type {Array}
     * @memberof isMIMEType
     */
    let mimeTypes = [
        {
          ext: ".aac",
          description: "AAC audio",
          mimeType: "audio/aac"
        },
        {
          ext: ".abw",
          description: "AbiWord document",
          mimeType: "application/x-abiword"
        },
        {
          ext: ".apng",
          description: "Animated Portable Network Graphics (APNG) image",
          mimeType: "image/apng"
        },
        {
          ext: ".arc",
          description: "Archive document (multiple files embedded)",
          mimeType: "application/x-freearc"
        },
        {
          ext: ".avif",
          description: "AVIF image",
          mimeType: "image/avif"
        },
        {
          ext: ".avi",
          description: "AVI: Audio Video Interleave",
          mimeType: "video/x-msvideo"
        },
        {
          ext: ".azw",
          description: "Amazon Kindle eBook format",
          mimeType: "application/vnd.amazon.ebook"
        },
        {
          ext: ".bin",
          description: "Any kind of binary data",
          mimeType: "application/octet-stream"
        },
        {
          ext: ".bmp",
          description: "Windows OS/2 Bitmap Graphics",
          mimeType: "image/bmp"
        },
        {
          ext: ".bz",
          description: "BZip archive",
          mimeType: "application/x-bzip"
        },
        {
          ext: ".bz2",
          description: "BZip2 archive",
          mimeType: "application/x-bzip2"
        },
        {
          ext: ".cda",
          description: "CD audio",
          mimeType: "application/x-cdf"
        },
        {
          ext: ".csh",
          description: "C-Shell script",
          mimeType: "application/x-csh"
        },
        {
          ext: ".css",
          description: "Cascading Style Sheets (CSS)",
          mimeType: "text/css"
        },
        {
          ext: ".csv",
          description: "Comma-separated values (CSV)",
          mimeType: "text/csv"
        },
        {
          ext: ".doc",
          description: "Microsoft Word",
          mimeType: "application/msword"
        },
        {
          ext: ".docx",
          description: "Microsoft Word (OpenXML)",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        },
        {
          ext: ".eot",
          description: "MS Embedded OpenType fonts",
          mimeType: "application/vnd.ms-fontobject"
        },
        {
          ext: ".epub",
          description: "Electronic publication (EPUB)",
          mimeType: "application/epub+zip"
        },
        {
          ext: ".gz",
          description: "GZip Compressed Archive",
          mimeType: "application/gzip. Note, Windows and macOS upload .gz files with the \nnon-standard MIME type application/x-gzip."
        },
        {
          ext: ".gif",
          description: "Graphics Interchange Format (GIF)",
          mimeType: "image/gif"
        },
        {
          ext: ".htm, .html",
          description: "HyperText Markup Language (HTML)",
          mimeType: "text/html"
        },
        {
          ext: ".ico",
          description: "Icon format",
          mimeType: "image/vnd.microsoft.icon"
        },
        {
          ext: ".ics",
          description: "iCalendar format",
          mimeType: "text/calendar"
        },
        {
          ext: ".jar",
          description: "Java Archive (JAR)",
          mimeType: "application/java-archive"
        },
        {
          ext: ".jpeg, .jpg",
          description: "JPEG images",
          mimeType: "image/jpeg"
        },
        {
          ext: ".js",
          description: "JavaScript",
          mimeType: "text/javascript (Specifications: HTML and RFC 9239)"
        },
        {
          ext: ".json",
          description: "JSON format",
          mimeType: "application/json"
        },
        {
          ext: ".jsonld",
          description: "JSON-LD format",
          mimeType: "application/ld+json"
        },
        {
          ext: ".mid, .midi",
          description: "Musical Instrument Digital Interface (MIDI)",
          mimeType: "audio/midi, audio/x-midi"
        },
        {
          ext: ".mjs",
          description: "JavaScript module",
          mimeType: "text/javascript"
        },
        {
          ext: ".mp3",
          description: "MP3 audio",
          mimeType: "audio/mpeg"
        },
        {
          ext: ".mp4",
          description: "MP4 video",
          mimeType: "video/mp4"
        },
        {
          ext: ".mpeg",
          description: "MPEG Video",
          mimeType: "video/mpeg"
        },
        {
          ext: ".mpkg",
          description: "Apple Installer Package",
          mimeType: "application/vnd.apple.installer+xml"
        },
        {
          ext: ".odp",
          description: "OpenDocument presentation document",
          mimeType: "application/vnd.oasis.opendocument.presentation"
        },
        {
          ext: ".ods",
          description: "OpenDocument spreadsheet document",
          mimeType: "application/vnd.oasis.opendocument.spreadsheet"
        },
        {
          ext: ".odt",
          description: "OpenDocument text document",
          mimeType: "application/vnd.oasis.opendocument.text"
        },
        {
          ext: ".oga",
          description: "Ogg audio",
          mimeType: "audio/ogg"
        },
        {
          ext: ".ogv",
          description: "Ogg video",
          mimeType: "video/ogg"
        },
        {
          ext: ".ogx",
          description: "Ogg",
          mimeType: "application/ogg"
        },
        {
          ext: ".opus",
          description: "Opus audio in Ogg container",
          mimeType: "audio/ogg"
        },
        {
          ext: ".otf",
          description: "OpenType font",
          mimeType: "font/otf"
        },
        {
          ext: ".png",
          description: "Portable Network Graphics",
          mimeType: "image/png"
        },
        {
          ext: ".pdf",
          description: "Adobe Portable Document Format (PDF)",
          mimeType: "application/pdf"
        },
        {
          ext: ".php",
          description: "Hypertext Preprocessor (*Personal Home Page*)",
          mimeType: "application/x-httpd-php"
        },
        {
          ext: ".ppt",
          description: "Microsoft PowerPoint",
          mimeType: "application/vnd.ms-powerpoint"
        },
        {
          ext: ".pptx",
          description: "Microsoft PowerPoint (OpenXML)",
          mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        },
        {
          ext: ".rar",
          description: "RAR archive",
          mimeType: "application/vnd.rar"
        },
        {
          ext: ".rtf",
          description: "Rich Text Format (RTF)",
          mimeType: "application/rtf"
        },
        {
          ext: ".sh",
          description: "Bourne shell script",
          mimeType: "application/x-sh"
        },
        {
          ext: ".svg",
          description: "Scalable Vector Graphics (SVG)",
          mimeType: "image/svg+xml"
        },
        {
          ext: ".tar",
          description: "Tape Archive (TAR)",
          mimeType: "application/x-tar"
        },
        {
          ext: ".tif, .tiff",
          description: "Tagged Image File Format (TIFF)",
          mimeType: "image/tiff"
        },
        {
          ext: ".ts",
          description: "MPEG transport stream",
          mimeType: "video/mp2t"
        },
        {
          ext: ".ttf",
          description: "TrueType Font",
          mimeType: "font/ttf"
        },
        {
          ext: ".txt",
          description: "Text, (generally ASCII or ISO 8859-*n*)",
          mimeType: "text/plain"
        },
        {
          ext: ".vsd",
          description: "Microsoft Visio",
          mimeType: "application/vnd.visio"
        },
        {
          ext: ".wav",
          description: "Waveform Audio Format",
          mimeType: "audio/wav"
        },
        {
          ext: ".weba",
          description: "WEBM audio",
          mimeType: "audio/webm"
        },
        {
          ext: ".webm",
          description: "WEBM video",
          mimeType: "video/webm"
        },
        {
          ext: ".webp",
          description: "WEBP image",
          mimeType: "image/webp"
        },
        {
          ext: ".woff",
          description: "Web Open Font Format (WOFF)",
          mimeType: "font/woff"
        },
        {
          ext: ".woff2",
          description: "Web Open Font Format (WOFF)",
          mimeType: "font/woff2"
        },
        {
          ext: ".xhtml",
          description: "XHTML",
          mimeType: "application/xhtml+xml"
        },
        {
          ext: ".xls",
          description: "Microsoft Excel",
          mimeType: "application/vnd.ms-excel"
        },
        {
          ext: ".xlsx",
          description: "Microsoft Excel (OpenXML)",
          mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        },
        {
          ext: ".xml",
          description: "XML",
          mimeType: "application/xml is recommended as of RFC 7303 (section 4.1), but text/xml \nis still used sometimes. You can assign a specific MIME type to a file with \n.xml extension depending on how its contents are meant to be interpreted. \nFor instance, an Atom feed is application/atom+xml, but application/xml \nserves as a valid default."
        },
        {
          ext: ".xul",
          description: "XUL",
          mimeType: "application/vnd.mozilla.xul+xml"
        },
        {
          ext: ".zip",
          description: "ZIP archive",
          mimeType: "application/zip. Note, Windows uploads .zip files with the non-standard \nMIME type application/x-zip-compressed."
        },
        {
          ext: ".3gp",
          description: "3GPP audio/video container",
          mimeType: "video/3gpp; audio/3gpp if it doesn't contain video"
        },
        {
          ext: ".3g2",
          description: "3GPP2 audio/video container",
          mimeType: "video/3gpp2; audio/3gpp2 if it doesn't contain video"
        },
        {
          ext: ".7z",
          description: "7-zip archive",
          mimeType: "application/x-7z-compressed"
        }
    ];
}
/*----------------------------------------------------------*/
/**
 * @name 
 * @type {Function}
 * @memberof UtilsMain
 * @description
 * @param {}
 * @property {}
 * @returns {}
 */
/*----------------------------------------------------------*/
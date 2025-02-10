/**
 * File Uploads - Constants
 */
/**
 * @type {Object}
 * Object of ALL file types
 */
export const file_types = {
    ".aac": {
      mimeType: "audio/aac",
      name: "AAC audio"
    },
    ".abw": {
      mimeType: "application/x-abiword",
      name: "AbiWord document"
    },
    ".arc": {
      mimeType: "application/x-freearc",
      name: "Archive"
    },
    ".avi": {
      mimeType: "video/x-msvideo",
      name: "AVI video"
    },
    ".azw": {
      mimeType: "application/vnd.amazon.ebook",
      name: "Amazon Kindle eBook"
    },
    ".bin": {
      mimeType: "application/octet-stream",
      name: "Binary file"
    },
    ".bmp": {
      mimeType: "image/bmp",
      name: "Bitmap image"
    },
    ".bz": {
      mimeType: "application/x-bzip",
      name: "Bzip archive"
    },
    ".bz2": {
      mimeType: "application/x-bzip2",
      name: "Bzip2 archive"
    },
    ".csh": {
      mimeType: "application/x-csh",
      name: "C shell script"
    },
    ".css": {
      mimeType: "text/css",
      name: "Cascading Style Sheets (CSS)"
    },
    ".csv": {
      mimeType: "text/csv",
      name: "Comma-separated values"
    },
    ".doc": {
      mimeType: "application/msword",
      name: "Microsoft Word document (older .doc)"
    },
    ".docx": {
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      name: "Microsoft Word document (.docx)"
    },
    ".eot": {
      mimeType: "application/vnd.ms-fontobject",
      name: "Embedded OpenType (EOT) font"
    },
    ".epub": {
      mimeType: "application/epub+zip",
      name: "Electronic Publication (EPUB)"
    },
    ".gif": {
      mimeType: "image/gif",
      name: "Graphics Interchange Format (GIF)"
    },
    ".gz": {
      mimeType: "application/gzip",
      name: "Gzip archive"
    },
    ".htm": {
      mimeType: "text/html",
      name: "HTML document"
    },
    ".html": {
      mimeType: "text/html",
      name: "HTML document"
    },
    ".ico": {
      mimeType: "image/vnd.microsoft.icon",
      name: "Icon"
    },
    ".ics": {
      mimeType: "text/calendar",
      name: "iCalendar"
    },
    ".jar": {
      mimeType: "application/java-archive",
      name: "Java Archive (JAR)"
    },
    ".jpeg": {
      mimeType: "image/jpeg",
      name: "JPEG image"
    },
    ".jpg": {
      mimeType: "image/jpeg",
      name: "JPEG image"
    },
    ".js": {
      mimeType: "text/javascript",
      name: "JavaScript"
    },
    ".json": {
      mimeType: "application/json",
      name: "JSON data"
    },
    ".mid": {
      mimeType: "audio/midi",
      name: "Musical Instrument Digital Interface (MIDI)"
    },
    ".midi": {
      mimeType: "audio/midi",
      name: "Musical Instrument Digital Interface (MIDI)"
    },
    ".mp3": {
      mimeType: "audio/mpeg",
      name: "MP3 audio"
    },
    ".mpeg": {
      mimeType: "video/mpeg",
      name: "MPEG video"
    },
    ".mp4": {
      mimeType: "video/mp4",
      name: "MP4 video"
    },
    ".otf": {
      mimeType: "font/otf",
      name: "OpenType font"
    },
    ".png": {
      mimeType: "image/png",
      name: "Portable Network Graphics (PNG) image"
    },
    ".pdf": {
      mimeType: "application/pdf",
      name: "Portable Document Format (PDF)"
    },
    ".ppt": {
      mimeType: "application/vnd.ms-powerpoint",
      name: "Microsoft PowerPoint presentation (older .ppt)"
    },
    ".pptx": {
      mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      name: "Microsoft PowerPoint presentation (.pptx)"
    },
    ".rar": {
      mimeType: "application/vnd.rar",
      name: "RAR archive"
    },
    ".rtf": {
      mimeType: "text/rtf",
      name: "Rich Text Format (RTF)"
    },
    ".sh": {
      mimeType: "application/x-sh",
      name: "Shell script"
    },
    ".svg": {
      mimeType: "image/svg+xml",
      name: "Scalable Vector Graphics (SVG)"
    },
    ".swf": {
      mimeType: "application/x-shockwave-flash",
      name: "Shockwave Flash"
    },
    ".tar": {
      mimeType: "application/x-tar",
      name: "Tape Archive (TAR)"
    },
    ".tif": {
      mimeType: "image/tiff",
      name: "Tagged Image File Format (TIFF)"
    },
    ".tiff": {
      mimeType: "image/tiff",
      name: "Tagged Image File Format (TIFF)"
    },
    ".ttf": {
      mimeType: "font/ttf",
      name: "TrueType font"
    },
    ".txt": {
      mimeType: "text/plain",
      name: "Plain text"
    },
    ".vsd": {
      mimeType: "application/vnd.visio",
      name: "Microsoft Visio diagram"
    },
    ".wav": {
      mimeType: "audio/wav",
      name: "Waveform Audio File Format (WAV)"
    },
    ".weba": {
      mimeType: "audio/webm",
      name: "WebM audio"
    },
    ".webm": {
      mimeType: "video/webm",
      name: "WebM video"
    },
    ".webp": {
      mimeType: "image/webp",
      name: "WebP image"
    },
    ".woff": {
      mimeType: "font/woff",
      name: "Web Open Font Format (WOFF)"
    },
    ".woff2": {
      mimeType: "font/woff2",
      name: "Web Open Font Format 2 (WOFF2)"
    },
    ".xhtml": {
      mimeType: "application/xhtml+xml",
      name: "XHTML document"
    },
    ".xls": {
      mimeType: "application/vnd.ms-excel",
      name: "Microsoft Excel spreadsheet (older .xls)"
    },
    ".xlsx": {
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      name: "Microsoft Excel spreadsheet (.xlsx)"
    },
    ".xml": {
      mimeType: "application/xml",
      name: "XML data"
    },
    ".xul": {
      mimeType: "application/vnd.mozilla.xul+xml",
      name: "XUL document"
    },
    ".zip": {
      mimeType: "application/zip",
      name: "ZIP archive"
    },
    "3gp": {
      mimeType: "video/3gpp",
      name: "3GPP video"
    },
      "3g2": {
      mimeType: "video/3gpp2",
      name: "3GPP2 video"
    },
    ".sql": {
        mimeType: "text/x-sql", 
        name: "SQL Script",
    },
    ".sqlite": {
        mimeType: "application/x-sqlite3",
        name: "SQLite Database",
    },
    ".db": { 
        mimeType: "application/octet-stream", // A very general type
        name: "Database File (Generic)",
    },
    ".dump": { 
        mimeType: "application/octet-stream", // Could also be text/plain or application/sql
        name: "SQL Dump File",
    },
    ".psql": {
        mimeType: "text/x-sql",
        name: "PostgreSQL Script"
    },
    ".mysql": {
        mimeType: "text/x-sql",
        name: "MySQL Script"
    },
    ".pgsql": {
        mimeType: "text/x-sql",
        name: "PostgreSQL Script"
    },
    ".tql": {
        mimeType: "text/x-sql",
        name: "Transact-SQL Script" // For SQL Server
    },
    ".dbs": {
        mimeType: "application/octet-stream",
        name: "Database File (Generic)"
    }
};
/**
 * @type {Object}
 * Object of Data file types
 */
export const data_file_types = ['.csv', '.json'].reduce((obj, key) => {
    if(file_types.hasOwnProperty(key)){
        obj[key] = file_types[key];
    }
    return obj;
}, {});
/**
 * @type {Object}
 * Object of Data file types
 */
const text_file_types = ['txt', 'text', 'doc', 'docx', 'pdf'].reduce((obj, key) => {
    if(file_types.hasOwnProperty(key)){
        obj[key] = file_types[key];
    }
    return obj;
}, {});
/**
 * @type {Object}
 * Object of Data file types
 */
const img_file_types = ['jpg', 'jpeg', 'svg', 'webp', 'gif', 'ico', 'png'].reduce((obj, key) => {
    if(file_types.hasOwnProperty(key)){
        obj[key] = file_types[key];
    }
    return obj;
}, {});
/**
 * @type {Object}
 * Collection of valid data types for output
 */
export const output_data_types = ['.csv', '.json', '.sql'].reduce((obj, key) => {
    if(file_types.hasOwnProperty(key)){
        obj[key] = file_types[key];
    }
    return obj;
}, {});

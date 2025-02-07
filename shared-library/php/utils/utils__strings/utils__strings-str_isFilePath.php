<?php
    /*----------------------------------------------------------*/
    /**
     * utils__strings-str_isFilePath.php
     * 
     * 
     * @author Michael Naatjes <michael.naatjes87@gmail.com>
     * @version 1.0.0
     * @since 02-07-2025
     */
    /*----------------------------------------------------------*/
    /**
     * str_isFilePath
     * 
     * @param string $path
     * @return boolean
     */
    function str_isFilePath(string $path): bool{
        /**
         * disqualifying tests: 
         * check for empty string
         */
        if(trim($path) === ""){
            return false;
        }
        /**
         * check for invalid characters
         */
        if (preg_match('/[<>:"|?*]/', $path)) {
            return false;
        }
        /**
         * check for control characters
         */
        if (preg_match('/[\x00-\x1F\x7F]/', $path)) {
            return false;
        }
        /**
         * check for excessive charaters: e.g. //, ///
         */
        if (preg_match('/\/{2,}/', $path)) {
            return false;
        }
        /**
         * check if the path contains a parent reference
         */
        if (preg_match('/^\.{1,2}\//', $path)) {
            return true;
        }
        /**
         * check for windows drive letters
         */
        if (preg_match('/^[a-zA-Z]:\\\\|^\\\\\\\\/', $path)) {
            return true;
        }
        /**
         * check for common path indicators
         */
        if (preg_match('/^[\/\\\\.]/', $path)) {
            return true;
        }
        /**
         * attempt to resolve path
         */
        $resolved = realpath(dirname($path));
        if($resolved !== false){
            return true;
        }
        /**
         * if cannot resolve --> check against patterns
         */
        /**
         * check for common directory path string structures
         */
        if($path[0] === "/" || $path[0] === '\\' || strpos($path, ':') !== false){
            return true;
        }
        /**
         * supplied path is not a path
         */
        return true;
    }
    /**
     * @test checks against array
     */
    /*
    $paths = [
        "/var/www/html/index.php",       // True
        "relative/path/to/file.txt",      // True
        "/absolute/path/to/image.jpg",    // True
        "C:\\Windows\\System32\\drivers\\etc\\hosts", // True (Windows path)
        "\\\\server\\share\\file.txt", // True (Windows network path)
        "index.html",                    // True (relative path)
        "./config.ini",                   // True (relative path)
        "../data/data.txt",              // True (relative path)
        "path with spaces/file.pdf",      // True (path with spaces)
        "path/with/unicode/characters/тест.txt", // True (path with Unicode)
        "invalid<path",                 // False (< is invalid)
        "invalid>path",                 // False (> is invalid)
        "invalid:path",                 // False (: is invalid)
        "invalid\"path",                 // False (" is invalid)
        "invalid|path",                 // False (| is invalid)
        "invalid?path",                 // False (? is invalid)
        "invalid*path",                 // False (* is invalid)
        "path\x00with\x01control", // False (control characters)
        "//double/slash", // False (double slash)
        "///triple/slash", // False (triple slash)
        "",                             // False (empty string)
        " ",                             // False (whitespace only)
        "http://www.example.com",        // (This is not checked here, as the function only checks format)
    ];
    foreach($paths as $path){
        echo "'$path' is a file path: " . (str_isFilePath($path) ? 'true' : 'false') . '<hr><br><br>';
    }
    */
?>
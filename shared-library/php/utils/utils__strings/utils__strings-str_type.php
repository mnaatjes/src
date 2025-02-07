<?php
    /*----------------------------------------------------------*/
    /**
     * utils__strings-str_type.php
     * Contains str_type function
     * 
     * @author Michael Naatjes <michael.naatjes87@gmail.com>
     * @version 1.0.0
     * @since 02-07-2025
     */
    /*----------------------------------------------------------*/
    /**
     * str_type
     * Returns the type of a supplied string
     * 
     * @param string $str
     * 
     * @return string
     */
    function str_type(string $str): string{
        /**
         * format string before reading
         */
        $str = trim($str);
        /**
         * check if empty
         */
        if(empty($str)){
            return 'empty';
        }
        /**
         * check for boolean | null values
         */
        switch(strtolower($str)){
            case 'true':
                return 'boolean';
            case 'false':
                return 'boolean';
            case 'null':
                return 'null';
        }
        /**
         * check for numbers: int | float
         */
        if(is_numeric($str)){
            /**
             * specify which numeric type: int | float
             * cast as int | float
             */
            $intVal     = (int)$str;
            $floatVal   = (float)$str;
            /**
             * validate via comparison
             */
            if($str == (string)$intVal){
                return 'integer';
            } else if($str == (string)$floatVal && strpos($str, '.' !== false)){
                return 'float';
            } else {
                return 'number';
            }
        }
        /**
         * check date format
         */
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $str)) { // YYYY-MM-DD
            return "date";
        }
        /**
         * check time format
         */
        if (preg_match('/^\d{2}:\d{2}(:\d{2})?$/', $str)) { // HH:MM or HH:MM:SS
            return "time";
        }
        /**
         * check colors
         */
        if (preg_match('/^rgb\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}\s*\)$/', $str)) {
            return "rgb";
        }
        if (preg_match('/^rgba\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3},\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/', $str)) {
            return "rgba";
        }

        if (preg_match('/^#([0-9a-fA-F]{3}){1,2}$/', $str)) {
            return "hex";
        }
        /**
         * return default value
         */
        return 'string';
    }
    /**
     * @test debug str_type method against array of various strings that fall within the parsing parameters
     * debuging str_type()
     */
    /*
     $stringArray = [
        // Date strings
        "2023-10-27",
        "10/27/2023",
        "Oct 27, 2023",
        "27 Oct 2023",
        "20231027", 

        // Time strings
        "10:30:00",
        "10:30",
        "10:30 AM",
        "2:30 PM",
        "14:30:00", // 24-hour format

        // RGBA strings
        "rgba(255, 0, 0, 0.5)",
        "rgba(0, 255, 0, 1)",
        "rgba(0, 0, 255, 0.2)",

        // RGB strings
        "rgb(255, 0, 0)",
        "rgb(0, 255, 0)",
        "rgb(0, 0, 255)",

        // Color hex value strings
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#f00",      // Short form
        "#a0522d",  // Sienna

        // Integer strings
        "123",
        "-456",
        "0",
        "1234567890",

        // Float strings
        "3.14159",
        "-2.718",
        "0.0",
        "1.23e-4", // Scientific notation
        "123.0",    // Note: PHP might treat this as an int if cast directly.
        "123.",
        ".45",

        // Other strings (just for variety)
        "Hello, world!",
        "This is a test string.",
        "Special characters: !@#$%^&*()",
        "", // Empty string
        " ", // String with a space
        // URLS
        "https://www.example.com",
        "/var/www/html/index.php",
        "http://another.example.net/page",
        "relative/path/to/file.txt",
        "/absolute/path/to/image.jpg",
        "ftp://example.com/file.zip",
        "file:///path/to/local/file.html", // Local file URL
        "path/with spaces/file.pdf", // Path with spaces
        "https://example.com/path?query=string", // URL with query
        "/path/with/unicode/characters/тест.txt", // Path with Unicode
        "http://example.com/unicode/characters/测试.html", // URL with Unicode
        "C:\\Windows\\System32\\drivers\\etc\\hosts", // Windows path (use carefully!)
        "\\\\server\\share\\file.txt", // Windows network path (UNC)
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxglj2+j+68AArz/jY/4B9YwAAAABJRU5ErkJggg==", // Data URL
        "invalid-url", // Not a URL or path
        "this is not a path", // Not a URL or path
        "/var/www/html/index.php",       // True
        "relative/path/to/file.txt",      // True
        "/absolute/path/to/image.jpg",    // True
        "C:\\Windows\\System32\\drivers\\etc\\hosts", // True (Windows path)
        "\\\\server\\share\\file.txt", // True (Windows network path)
        "http://www.example.com",        // False (URL)
        "https://example.com/page",      // False (URL)
        "ftp://example.com/file.zip",      // False (URL)
        "index.html",                    // True (relative path)
        "./config.ini",                   // True (relative path)
        "../data/data.txt",              // True (relative path)
        "path with spaces/file.pdf",      // True (path with spaces)
        "path/with/unicode/characters/тест.txt", // True (path with Unicode)
        "invalid-path",                 // False (likely not a path)
        "",                             // False (empty string)
        " ",                             // False (space)
        "data:image/png;base64,...",      // False (Data URL)
        "mailto:user@example.com", // False (Mailto link)
    ];
    $result = [];
    foreach ($stringArray as $string) {
        console($string);
        console(str_type($string));
        echo '<br><br><hr>';

        $result[] = str_type($string);
    }
    */
?>
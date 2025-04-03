<?php
/*----------------------------------------------------------*/
/**
 * debug
 *
 * @param mixed $var
 * @param int $indent
 * 
 * @property string $output
 * @return void
 */
/**
 * require and use functions
 */
require_once __DIR__ . '/../utils__arrays/utils__array-methods.php';
require_once 'utils__debug-format-output.php';
require_once 'utils__debug-get-var-size.php';
require_once 'utils__debug-replace-str.php';
require_once 'utils__debug-reveal-str.php';
/*----------------------------------------------------------*/
function debug($var, int $indent=2){
    /**
     * create reveal function and append to document
     */
    $jsFunc     = sprintf('
        function reveal(ele){
            let prev = ele.previousElementSibling;
            prev.style.display = "inline-block";
            ele.style.cursor = "default";
        };

        function replace(ele){
            let next = ele.nextElementSibling;
            next.style.display = "inline-block";
            ele.style.display = "none";
            ele.style.cursor = "none";
        };
    ');
    $jsScript   = printf('<script>%s</script>', $jsFunc);
    /**
     * TODO: Write to file
     * TODO: Check if file already exists
     * TODO: Check if function exists and matches
     */
    /**
     * main stylesheet
     */
    $cssContainer = arrayJoin(
        [
            'display'           => 'block',
            'color'             => '#590d22',
            'background-color'  => '#ffc2c2',
            'font-size'         => '12px',
            'border-bottom'     => '1px solid #666',
            'width'             => '100%',
            'margin'            => '0 auto 12px auto',
            'padding'           => '24px',
            'font-family'       => 'Arial',
            'line-height'       => '1.5',
            'box-shadow'        => '1px 1px 1px 2px rgba(0,0,0, 0.2)',
        ], '', ':', '; '
    );
    /**
     * gather relavant properties
     * 
     * @property array $trace       - returns array of trace elements
     * @property string $filePath   - filepath from trace
     * @property array  $pathInfo   - information on the $var filePath
     * @property string $line       - line from trace
     * @property string $result     - output string declared
     */
    $trace      = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1)[0];
    $line       = $trace['line'];
    $filePath   = $trace['file'];
    $varName    = 'undefined';
    $fileName   = pathinfo($filePath)['basename'];
    /**
     * grab variable name (if called using variable)
     */
    $varLine    = file($fileName)[$line -1];
    $pattern    = '/' . preg_quote(__FUNCTION__, '/') . '\(\$(\w+)\);/';
    if(preg_match($pattern, $varLine, $matches)){
        $varName = $matches[1];
    }
    /**
     * compile file information and format with javascript
     */
    $fileInfo = revealStrOutput('<b>$' . $varName . '</b>  ' . substr($filePath, 0, strpos($filePath, $fileName)), $fileName . ' : ' . $line);
    /**
     * prepend output data
     */
    /**
     * call formatting function
     */
    $result = $fileInfo;
    /**
     * run variable query and formatting
     */
    $result .= formatOutput($var, $indent);
    /**
     * print output
     */
    printf('<div style="%s">%s</div>', $cssContainer, $result);
}
?>
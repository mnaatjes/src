<?php
/*----------------------------------------------------------*/
/**
 * replaceStrOutput
 * 
 * @param string $replace   - replacement string
 * @param string $original  - original string
 * 
 * @return string
 */
/*----------------------------------------------------------*/
function replaceStrOutput(string $original, string $replace): string{
    return sprintf('<span style="cursor: pointer" onclick="replace(this)">%s</span><span style="display:none;">%s</span><br><br>', $original, $replace);
}
?>
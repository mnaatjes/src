<?php
/*----------------------------------------------------------*/
/**
 * revealStrOutput
 * 
 * @param string $hidden
 * @param string $visible
 * 
 * @return string 
 */
/*----------------------------------------------------------*/
function revealStrOutput(string $hidden, string $visible): string{
    return sprintf('<span style="display: none;">%s</span><i style="cursor: pointer" onclick="reveal(this)">%s</i><br>', $hidden, $visible);
}
?>
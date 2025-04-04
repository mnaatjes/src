<?php
    /*----------------------------------------------------------*/
    /**
     * Generates a random boolean value from random_int().
     * 
     * @param void
     * @return bool
     */
    /*----------------------------------------------------------*/
    function random_bool(){
        return (bool) random_int(0, 1);
    }
?>
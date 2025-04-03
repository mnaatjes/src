<?php
    /**
     * @filesource src/shared-library/php/lib/log_debug.php
     */
    /**
     * Log Debugging information
     * 
     * @param string $message
     * @param null $variable
     * @param string $filepath default = FP_DUMP_LOG
     */
    function log_dump($message='ham', $variable=null, $filepath=FP_DUMP_LOG){
        /**
         * Debug Backtrace
         */
        $debug  = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1);
        $line   = $debug[0]['line'];
        /**
         * Declare properties
         */
        $timestamp  = date('Y-m-d H:i:s');
        $logMsg     = "Timestamp: $timestamp" . "\nFilepath:" . $_SERVER['SCRIPT_FILENAME'] . "($line)" . "\nMessage: $message \n";
        /**
         * Check if variable supplied
         */
        if($variable !== null){
            // Start output buffer and capture var_dump
            ob_start();
            var_dump($variable);
            $dump    = ob_get_clean();
            $logMsg .= $dump . "\n";
        }
        $logMsg .= "---------------------------------------------------------------------------\n\n";
        /**
         * Print to file
         */
        file_put_contents($filepath, $logMsg, FILE_APPEND);
    }
?>
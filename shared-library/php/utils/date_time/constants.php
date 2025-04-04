<?php
    /*----------------------------------------------------------*/
    /**
     * DateTime Constants
     */
    /*----------------------------------------------------------*/
    /**
     * @var string DATETIME_UNIX - DateTime in UNIX format
     */
    define('DATETIME_UNIX', 'U');
    /**
     * @var string DATETIME_ISO - DateTime in ISO format
     */
    define('DATETIME_ISO', 'c');
    /**
     * @var string DATETIME_YMDHIS - DateTime in Y-m-d H:i:s format
     */
    define('DATETIME_YMDHIS', 'Y-m-d H:i:s');
    /*----------------------------------------------------------*/
    /**
     * Date Constants
     */
    /*----------------------------------------------------------*/
    /**
     * @var string DATE_YMD - DateTime in Y-m-d format
     */
    define('DATE_YMD', 'Y-m-d');
    /**
     * @var string DATE_DMY - Date in d-m-Y format
     */
    define('DATE_DMY', 'd-m-Y');
    /**
     * @var string DATE_SHORT - Date in Short format
     */
    define('DATE_SHORT', 'm/d/Y');
    /**
     * @var string DATE_SHORT_YMD - Date in Short format with Year-Month-Day
     */
    define('DATE_SHORT_YMD', 'Y/m/d');
    /**
     * @var string DATE_TEXT_SHORT - Date in Text format
     */
    define('DATE_TEXT_SHORT', 'M d, Y');
    /**
     * @var string DATE_TEXT - Date in Text format
     */
    define('DATE_TEXT', 'F jS, Y');
    /**
     * @var string DATE_TEXT_LONG - Date in Long format
     */
    define('DATE_TEXT_LONG', 'l, F jS, Y');
    /*----------------------------------------------------------*/
    /**
     * Time Constants
     */
    /*----------------------------------------------------------*/
    /**
     * @var string TIME_CLOCK - Time in Long format
     */
    define('TIME_CLOCK', 'g:i A');
    /**
     * @var string TIME_CLOCK_LOWER - Time in Long format with lowercase am/pm
     */
    define('TIME_CLOCK_LOWER', 'g:i a');
    /**
     * @var string TIME_CLOCK_SEC - Time in Long format with seconds
     */
    define('TIME_CLOCK_SEC', 'g:i:s A');
    /**
     * @var string TIME_CLOCK_SEC_MIL - Time in Long format with milliseconds
     */
    define('TIME_CLOCK_SEC_MIL', 'g:i:s.u A');
    /**
     * @var string TIME_MIL - Time in Short format
     */
    define('TIME_MIL', 'H:i');
    /**
     * @var string TIME_MIL_SEC - Time in Short format with seconds
     */
    define('TIME_MIL_SEC', 'H:i:s');
    /**
     * @var string TIME_MIL_SEC_MIL - Time in Short format with milliseconds
     */
    define('TIME_MIL_SEC_MIL', 'H:i:s.u');
    /*----------------------------------------------------------*/
    /**
     * Timezone Constants
     */
    /*----------------------------------------------------------*/
    /**
     * @var string TIMEZONE_DEFAULT - Default Timezone (UTC)
     */
    define('TIMEZONE_DEFAULT', 'UTC');
    /**
     * @var string TIMEZONE_ID - Timezone Identifier; e.g. America/New_York
     */
    define('TIMEZONE_ID', 'e');
    /**
     * @var string TIMEZONE_OFFSET - Timezone Offset; e.g. -0500
     */
    define('TIMEZONE_OFFSET', 'O');
?>
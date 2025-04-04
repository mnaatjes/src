<?php
    /**
     * Generates the last day(int) of a given month(int) and an [optional] year.
     * 
     * @param int $month - 2 digit month
     * @param int [$year] - 4 digit year; Default Current
     * @param int $calendar - Calendar type; Default Gregorian (CAL_GREGORIAN, CAL_JULIAN, CAL_FRENCH);
     * @return int - Integer representation of last day of month (28 | 21 | 30 | 31)
     */
    function get_last_day_month(int $month, int $year=0, int $calendar=CAL_GREGORIAN){
        /**
         * Validate month
         */
        if($month < 1 || $month > 12){
            throw new ValueError('Month argument MUST BE between 1 and 12');
        }
        /**
         * Validate year
         */
        if($year === 0){
            $year = (int) date('Y');
        } else if($year < 1970){
            throw new ValueError('Year argument CANNOT be less than 1970!');
        }
        /**
         * Use cal_days_in_month() to get the last day of the month
         * Return int value
         */
        return cal_days_in_month($calendar, $month, $year);
    }
?>
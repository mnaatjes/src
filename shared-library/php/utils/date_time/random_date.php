<?php
    /*----------------------------------------------------------*/
    /**
     * Random Date Generator.
     * 
     * @param string $format - DateTime format output; Default 'U' (DATETIME_UNIX)
     * 
     * @param array $years - 4 digit format:
     *              - min(int) - 4 digit min year; Default 1970
     *              - max(int) - 4 digit max year; Default Current
     * 
     * @param array $months - 2 digit format:
     *              - min(int) - 2 digit min month; Default 1
     *              - max(int) - 2 digit max month; Default 12
     * 
     * @param int $dates - 2 digit format:
     *              - min(int) - 2 digit min date; Default 1
     *              - max(int) - 2 digit max date; Default 31 (December); Maximum date for $months['max']
     * 
     * 
     * @return int|string - Returns UNIX date-time(int) or formatted date-time(string)
     */
    /*----------------------------------------------------------*/
    function random_date(string $format=DATETIME_UNIX, array $years=[], array $months=[], array $dates=[]){
        /**
         * Assign Default values:
         * 1) $years
         * 2) $months
         * 3) $dates
         */
        if(empty($years)){
            $years = [
                'min' => 1970,
                'max' => (int) date('Y')
            ];
        }
        if(empty($months)){
            $months = [
                'min' => 1,
                'max' => 12
            ];
        }
        if(empty($dates)){
            $dates = [
                'min' => 1,
                'max' => get_last_day_month($months['max'])
            ];
        }
        /**
         * Generate Random Date from min and max values
         */
        $year   = random_int($years['min'], $years['max']);
        $month  = random_int($months['min'], $months['max']);
        $date   = random_int($dates['min'], $dates['max']);
        /**
         * Generate Random Date
         */
        $date_time = new DateTime();
        $date_time->setDate($year, $month, $date);
        $timestamp = $date_time->format($format);
        /**
         * Validate output format
         */
        if($format === DATETIME_UNIX){
            $timestamp = (int) $timestamp;
        }
        /**
         * Return Formatted DateTime
         */
        return $timestamp;
    }
?>
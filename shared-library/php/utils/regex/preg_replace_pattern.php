<?php
    /**
     * Regex function to convert a string into a pattern and apply new pattern to target string
     * TODO: Convert $search_pattern into $replace_pattern
     * TODO: Convert $search_pattern for preg_quote
     * @example 
     *      $template   = 'Here is a {param} item'
     *      $search     = '{(\w+)\}'
     *      $replace    = '/{(\w+)\}/'
     *      $subject    = 'Here is a {1234} item'
     *      returns preg_match()
     */
    function preg_replace_pattern(string $template, string $search_pattern, string $replace_pattern, string $target){
        /**
         * Format template
         */
        $template = preg_quote($template, "/");
        /**
         * Create pattern
         */
        $pattern = '/' . preg_replace($search_pattern, $replace_pattern, $template) . '/';
        /**
         * Use pattern on target
         */
        $result = preg_match($pattern, $target, $match);

        return array_merge($match, ['count' => $result]);
    }
    //$test = preg_replace_pattern('Here is a {test} string', '/\\\{(\w+)\\\}/', '\{(\w+)\}', 'Here is a {2345} string');
    
?>
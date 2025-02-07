<?php
/*----------------------------------------------------------*/
/**
 * elements-constants.php
 * 
 * This file contains the HTML Form Element Constants used in 
 * the FormElement Class
 * 
 * @package HTMLFormElements
 * @author Michael Naatjes <michael.naatjes87@gmail.com>
 * @version 1.0.0
 * @since 02-07-2025
 */
/*----------------------------------------------------------*/
define('FORM_ELEMENTS', [
    'input' => [
        'attributes' => [
            "name"         => "string", 
            "disabled"     => "boolean",
            "form"         => "string", // form element id
            "autocomplete" => "string", 
            "tabindex"     => "integer",
            "title"        => "string", // for tooltip
            "id"           => "string", 
            "class"        => "string", 
            "style"        => "string", 
            "lang"         => "string", 
            "hidden"       => "boolean",
            "type"         => "string"
        ],
        'types'      => [
            "text"           => [
                "value"        => "string", 
                "required"     => "boolean", 
                "placeholder"  => "string", 
                "maxlength"    => "integer", // Maximum characters
                "minlength"    => "integer", // Minimum characters
                "pattern"      => "string", // regex
                "readonly"     => "boolean", 
                "autocomplete" => "string", 
            ],
            "password"       => [
                "value"        => "string", 
                "required"     => "boolean", 
                "placeholder"  => "string", 
                "maxlength"    => "integer", 
                "minlength"    => "integer", 
                "autocomplete" => "string", 
            ],
            "email"          => [
                "value"        => "string", 
                "required"     => "boolean",
                "placeholder"  => "string", // Hint text
                "maxlength"    => "integer", // Maximum characters
                "minlength"    => "integer", // Minimum characters
                "pattern"      => "string", // regex
                "multiple"     => "boolean", 
                "autocomplete" => "string", 
            ],
            "number"         => [
                "value"       => "number", 
                "required"    => "boolean", 
                "placeholder" => "string", 
                "min"         => "number", 
                "max"         => "number", 
                "step"        => "number", 
            ],
            "checkbox"       => [
                "value"    => "string", 
                "checked"  => "boolean", 
                "required" => "boolean", 
            ],
            "radio"          => [
                "value"    => "string", 
                "checked"  => "boolean", 
                "required" => "boolean", 
            ],
            "file"           => [
                "accept"   => "string", // file MIME types
                "multiple" => "boolean", 
                "required" => "boolean", 
            ],
            "submit"         => [ 
                "value" => "string", 
            ],
            "reset"          => [
                "value" => "string", 
            ],
            "button"         => [
                "value" => "string", 
            ],
            "hidden"         => [ 
                "value" => "string",
            ],
            "image"          => [ // Acts like a submit button
                "src" => "string", // URL of the image
                "alt" => "string", 
            ],
            "range"          => [
                "min"   => "number",
                "max"   => "number",
                "step"  => "number",
                "value" => "number",
            ],
            "color"          => [
                "value" => "hex", // Hex color code
            ],
            "date"           => [
                "min"   => "date", // Date string
                "max"   => "date", // Date string
                "value" => "date", // Date string
            ],
            "month"          => [
                "min"   => "string", // Date string (YYYY-MM)
                "max"   => "string", // Date string (YYYY-MM)
                "value" => "string", // Date string (YYYY-MM)
            ],
            "week"           => [
                "min"   => "string", // Date string (YYYY-W##)
                "max"   => "string", // Date string (YYYY-W##)
                "value" => "string", // Date string (YYYY-W##)
            ],
            "time"           => [
                "min"   => "time", // Time string
                "max"   => "time", // Time string
                "value" => "time", // Time string
            ],
            "datetime-local" => [
                "min"   => "string", // Date and time string
                "max"   => "string", // Date and time string
                "value" => "string", // Date and time string
            ],
        ]
    ]
]);
?>
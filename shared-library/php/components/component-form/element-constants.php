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
    /**
     * html element: input
     */
    'input'    => [
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
                "enctype"  => "string"
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
        ],
        // element does not allow child elements
        'children'   => null
    ],
    /**
     * html element: select
     */
    'select'   => [
        'attributes' => [
            'id'           => 'string',
            'name'         => 'string',
            'autocomplete' => 'string',
            'autofocus'    => 'boolean',
            'disabled'     => 'boolean',
            'form'         => 'string',
            'multiple'     => 'boolean',
            'required'     => 'boolean',
            'size'         => 'integer'
        ],
        'types'      => null,
        'children'   => ['option', 'optgroup']
    ],
    /**
     * html element: fieldset
     */
    'fieldset' => [
        'attributes' => [
            'disabled' => 'boolean',
            'form'     => 'string',
            'name'     => 'string'
        ],
        'types'      => null,
        'children'   => ['legend']
    ],
    /**
     * html element: label
     */
    'label'    => [
        'attributes' => [
            'for'  => 'string',
            'form' => 'string'
        ],
        'types'      => null,
        'children'   => true
    ],
    /**
     * html element: legend
     */
    'legend'   => [
        'attributes' => [],
        'types'      => null,
        'children'   => true
    ],
    /**
     * html element: meter
     */
    'meter'    => [
        'attributes' => [
            'value' => 'number',
            'min'   => 'number',
            'max'   => 'number',
        ],
        'types'      => null,
        'children'   => null
    ],
    /**
     * html element: optgroup
     */
    'optgroup' => [
        'attributes' => [
            'label' => 'string'
        ],
        'types'      => null,
        'children'   => ['option']
    ],
    /**
     * html element: option
     */
    'option'   => [
        'attributes' => [
            'label'    => 'string',
            'selected' => 'boolean',
            'value'    => 'string'
        ],
        'types'      => null,
        'children'   => null
    ],
    /**
     * html element: output
     */
    'output'   => [
        'attributes' => [
            'for' => 'string'
        ],
        'types'      => null,
        'children'   => null
    ],
    /**
     * html element: progress
     */
    'progress' => [
        'attributes' => [],
        'types'      => null,
        'children'   => null
    ],
    /**
     * html element: textarea
     */
    'textarea' => [
        'attributes' => [
            'name'         => 'string',
            'cols'         => 'integer',
            'rows'         => 'integer',
            'maxlength'    => 'integer',
            'placeholder'  => 'string',
            'required'     => 'boolean',
            'readonly'     => 'boolean',
            'autofocus'    => 'boolean',
            'wrap'         => 'string',
            'autocomplete' => 'string',
            'dirname'      => 'string',
            'spellcheck'   => 'boolean'
        ],
        'types'      => null,
        'children'   => null
    ],
    /**
     * html element: button
     */
    'button'   => [
        'attributes' => [
            "autofocus" => "boolean",
            "disabled" => "boolean",
            "form" => "string",
            "formaction" => "string",
            "formenctype" => "string",
            "formmethod" => "string",
            "formnovalidate" => "boolean",
            "formtarget" => "string",
            "name" => "string",
            "type" => "string",
            "value" => "string"  
        ],
        'types'      => ['submit', 'reset', 'button'],
        'children'   => null
    ]
]);
?>
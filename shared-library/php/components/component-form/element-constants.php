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
            'types' => [
                "text" => [
                    "name" => "string", // Essential for form submission
                    "value" => "string", // Initial value
                    "required" => "boolean", // Whether field is required
                    "placeholder" => "string", // Hint text
                    "maxlength" => "integer", // Maximum characters
                    "minlength" => "integer", // Minimum characters
                    "pattern" => "string", // Regular expression for validation
                    "readonly" => "boolean", // Prevents user input
                    "disabled" => "boolean", // Disables the input
                    "autocomplete" => "string", // Autocomplete options
                    "form" => "string", // ID of the associated form
                ],
                "password" => [
                    "name" => "string", // Essential for form submission
                    "value" => "string", // Initial value (consider if really needed for password)
                    "required" => "boolean", // Whether field is required
                    "placeholder" => "string", // Hint text
                    "maxlength" => "integer", // Maximum characters
                    "minlength" => "integer", // Minimum characters
                    "autocomplete" => "string", // Autocomplete options (e.g., "new-password", "current-password")
                    "form" => "string", // ID of the associated form
                ],
                "email" => [
                    "name" => "string", // Essential for form submission
                    "value" => "string", // Initial value
                    "required" => "boolean", // Whether field is required
                    "placeholder" => "string", // Hint text
                    "maxlength" => "integer", // Maximum characters
                    "minlength" => "integer", // Minimum characters
                    "pattern" => "string", // Regular expression for validation (email format)
                    "multiple" => "boolean", // Allows multiple email addresses
                    "autocomplete" => "string", // Autocomplete options
                    "form" => "string", // ID of the associated form
                ],
                "number" => [
                    "name" => "string", // Essential for form submission
                    "value" => "number", // Initial value
                    "required" => "boolean", // Whether field is required
                    "placeholder" => "string", // Hint text
                    "min" => "number", // Minimum value
                    "max" => "number", // Maximum value
                    "step" => "number", // Increment/decrement step
                    "form" => "string", // ID of the associated form
                ],
                "checkbox" => [
                    "name" => "string", // Essential for form submission
                    "value" => "string", // Value sent when checked
                    "checked" => "boolean", // Initial checked state
                    "required" => "boolean", // Whether field is required (use with caution)
                    "form" => "string", // ID of the associated form
                ],
                "radio" => [
                    "name" => "string", // Essential for form submission (same name for group)
                    "value" => "string", // Value sent when selected
                    "checked" => "boolean", // Initial checked state
                    "required" => "boolean", // Whether field is required (use with caution)
                    "form" => "string", // ID of the associated form
                ],
                "file" => [
                    "name" => "string", // Essential for form submission
                    "accept" => "string", // Allowed file types (MIME types)
                    "multiple" => "boolean", // Allows multiple file selection
                    "required" => "boolean", // Whether field is required
                    "form" => "string", // ID of the associated form
                ],
                "submit" => [ // Often handled by the <button> element, but can be an input
                    "name" => "string", // Optional name for the submit button
                    "value" => "string", // Text displayed on the button
                    "form" => "string", // ID of the associated form
                ],
                "reset" => [
                    "value" => "string", // Text displayed on the button
                    "form" => "string", // ID of the associated form
                ],
                "button" => [
                    "name" => "string", // Optional name for the button
                    "value" => "string", // Value sent when the button is clicked
                    "form" => "string", // ID of the associated form
                ],
                "hidden" => [ // For storing data that is not visible to the user
                    "name" => "string",
                    "value" => "string",
                    "form" => "string", // ID of the associated form
                ],
                "image" => [ // Acts like a submit button
                    "name" => "string",
                    "src" => "string", // URL of the image
                    "alt" => "string", // Alternative text for the image
                    "form" => "string", // ID of the associated form
                ],
                "range" => [
                    "name" => "string",
                    "min" => "number",
                    "max" => "number",
                    "step" => "number",
                    "value" => "number",
                    "form" => "string", // ID of the associated form
                ],
                "color" => [
                    "name" => "string",
                    "value" => "string", // Hex color code
                    "form" => "string", // ID of the associated form
                ],
                "date" => [
                    "name" => "string",
                    "min" => "string", // Date string
                    "max" => "string", // Date string
                    "value" => "string", // Date string
                    "form" => "string", // ID of the associated form
                ],
                "month" => [
                    "name" => "string",
                    "min" => "string", // Date string (YYYY-MM)
                    "max" => "string", // Date string (YYYY-MM)
                    "value" => "string", // Date string (YYYY-MM)
                    "form" => "string", // ID of the associated form
                ],
                "week" => [
                    "name" => "string",
                    "min" => "string", // Date string (YYYY-W##)
                    "max" => "string", // Date string (YYYY-W##)
                    "value" => "string", // Date string (YYYY-W##)
                    "form" => "string", // ID of the associated form
                ],
                "time" => [
                    "name" => "string",
                    "min" => "string", // Time string
                    "max" => "string", // Time string
                    "value" => "string", // Time string
                    "form" => "string", // ID of the associated form
                ],
                "datetime-local" => [
                    "name" => "string",
                    "min" => "string", // Date and time string
                    "max" => "string", // Date and time string
                    "value" => "string", // Date and time string
                    "form" => "string", // ID of the associated form
                ],
            ]
        ]
    ]);
?>
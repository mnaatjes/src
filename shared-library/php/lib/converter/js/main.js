/**
 * @file converter/js/main.js
 * @author Michael Naatjes
 * @version 1.0.0
 * @since 02-08-2025
 */
/**
 * Import file types object
 */
import { data_file_types, output_data_types } from "./constants.js";
/**
 * @function formatBytes
 * @description converts bytes to kb, or mb based on size
 * @param {Number} bytes
 * @returns {String}
 */
function formatBytes(bytes){
    if(bytes < 1024){
        return bytes + 'B';
    } else if(bytes < (1024 * 1024)){
        return (bytes / 1024).toFixed(2) + 'KB';
    } else if(bytes < (1024 * 1024 * 1024)){
        return (bytes / (1024 * 1024)).toFixed(2) + 'MB';
    } else {
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
    }
}
/**
 * input elements
 */
const select_input  = document.querySelector('select[name="select--input"]');
const select_output = document.querySelector('select[name="select--output"]');
const input_name    = document.querySelector('input[name="fileName"]');
const input_desc    = document.querySelector('textarea[name="desc"]');
/**
 * file elements
 */
const file_input    = document.querySelector('input[type="file"]');
const file_button   = document.getElementById('file--button');
const file_display  = document.getElementById('file--display');
/**
 * button elements
 */
const btn_submit    = document.querySelector('input[name="btn--submit"]');
const btn_reset     = document.querySelector('input[name="btn--reset"]');
/**
 * add options to select_input
 */
Object.keys(data_file_types).forEach(type => {
    let option = document.createElement('option');
    option.value = type;
    option.textContent = data_file_types[type].name;
    select_input.appendChild(option);
});
/**
 * add options to select_output
 */
Object.keys(output_data_types).forEach(type => {
    let option          = document.createElement('option');
    option.value        = type;
    option.textContent  = output_data_types[type].name;
    select_output.appendChild(option);
});
/**
 * @listens file_button#click
 * Listen for file upload button click
 */
file_button.addEventListener('click', function(e){
    /**
     * @fires file_input
     * trigger file_input
     */
    file_input.click();

});
/**
 * @listens file_input#change
 * When file selected, display filename value
 */
file_input.addEventListener('change', function(e){
    /**
     * @type {File}
     * First file uploaded
     */
    let file = file_input.files[0];
    if(file){
        /**
         * grab extension
         * validate type and ext
         */
        let fileExt = (file.name.split('.').length > 1) ? file.name.split('.').pop() : 'none';
        /**
         * check for file type error
         */
        if(!(output_data_types.hasOwnProperty('.' + fileExt))){
            /**
             * @fires file_display
             * Prints out file size
             */
            file_display.textContent = 'Invalid File Type!';
            file_button.setAttribute('data-error', 'true');
            /**
             * @fires btn_reset
             * @fires btn_submit
             */
            btn_submit.setAttribute('data-enabled', 'false');
            btn_reset.setAttribute('data-enabled', 'false');
        } else {
            if(file_button.hasAttribute('data-error')){
                file_button.removeAttribute('data-error');
            }
            if(btn_reset.hasAttribute('data-enabled')){
                btn_reset.removeAttribute('data-enabled');
            }
            if(btn_submit.hasAttribute('data-enabled')){
                btn_submit.removeAttribute('data-enabled');
            }
            /**
             * @fires file_display
             * Prints out file size
             */
            file_display.textContent = formatBytes(file.size);
        }
    }
});
/**
 * @listens btn_submit#click
 */
/*
btn_submit.addEventListener('click', function(e){
    if(input_name.value.length < 10){
        e.preventDefault();
        input_name.setAttribute('data-error', 'true');
    }
    if(input_desc.value.length < 10){
        e.preventDefault();
        input_desc.setAttribute('data-error', 'true');
    }
    if(file_input.files.length == 0){
        e.preventDefault();
        file_button.setAttribute('data-error', 'true');
    }
})
*/
/**
 * @listens input_name#change
 */
input_name.addEventListener('input', function(e){
    if(e.target.value.length > 10 && e.target.hasAttribute('data-error')){
        e.target.removeAttribute('data-error');
    }
})
/**
 * @listens input_name#change
 */
input_desc.addEventListener('input', function(e){
    if(e.target.value.length > 10 && e.target.hasAttribute('data-error')){
        e.target.removeAttribute('data-error');
    }
})
/**
 * upload form handling
 */
/**
 * import table function
 */
import { createTable } from "../../../../../packages/ui-components/table.js";
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
 * HTML Elements
 */
const input_file    = document.querySelector('input[name="file"]');
const btn_file      = document.getElementById('file--button');
const desc_file     = document.getElementById('file--display');
/**
 * @listens btn_file#click
 * Trigger input file element from new button
 */
btn_file.addEventListener('click', function(e){
    /**
     * clear existing files
     * trigger input[file]
     */
    input_file.value = '';
    input_file.click();
});
/**
 * @listens input_file#change
 * 
 */
input_file.addEventListener('change', function(e){
    /**
     * check that files object has only one file
     */
    if(input_file.files.length > 1){
        alert('Must reset form! Can only upload one file!');
    }
    let file = input_file.files[0];
    console.log(input_file.files);
    desc_file.textContent = '';
    desc_file.appendChild(
        createTable({
            name: file.name,
            size: formatBytes(file.size),
            type: file.type,
    }));
});


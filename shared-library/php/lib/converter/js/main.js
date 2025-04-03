import { createCustomForm } from '../../../../../packages/htmlComponents/createCustomForm.js';
import { createElement } from '../../../../../packages/htmlComponents/elements/createElement.js';
import { createInputElement } from '../../../../../packages/htmlComponents/elements/createInputElement.js';
import { createSelectElement } from '../../../../../packages/htmlComponents/elements/createSelectElement.js';
import { createTableElement } from '../../../../../packages/htmlComponents/elements/createTableElement.js';
/**
 * @file php/lib/converter/js/main.js
 * @description Main js for file converter form
 */
const fileProps = [];
const root      = document.getElementById('root');
const component = createCustomForm(
    {
        tagName: 'file-form',
        action: '../../lib/converter/form.php',
        enctype: 'file',
        mode: 'submit',
        styles: '../../../styles/css/main.css',
        method: 'POST'
    },
    [
        createInputElement('text', 'filename', {placeholder: 'Enter output filename', required: true}),
        createElement('label', {
            id: 'file--button',
            for: 'file--path',
        }),
        createInputElement('file', 'file--path[]', {
            id: 'file--path',
            accept: '.xml, .json, .csv',
            multiple: true,
            onchange: function(e){
                /**
                 * Declare file--display element
                 * Clear file--display
                 * Check for files
                 */
                const display       = component.shadowRoot.getElementById('file--display');
                display.innerHTML   = '';
                /**
                 * Grab File Details
                 * Display Details in Table
                 */
                if(this.files.length > 0){
                    /**
                     * Loop files object and evaluate:
                     * 1) Declare each file
                     * 2) Generate file properties
                     * 3) Append File props to fileProps
                     */
                    for(let i = 0; i < this.files.length; i++){
                        // declare file object
                        const file  = this.files[i];
                        // generate file properties
                        const props = {
                            name: file.name,
                            size: file.size > (1024 * 1024) ? (file.size / (1024 * 1024)).toFixed(2) + 'MB' :
                                    file.size > 1024 ? (file.size / 1024).toFixed(2) + 'KB' :
                                    file.size + 'B',
                            type: file.type
                        };
                        // append to fileProps
                        fileProps.push(props);
                    }
                    /**
                     * Generate Display Table
                     */
                    const table = createTableElement(fileProps, {}, {id: 'file--table'});
                    display.appendChild(table);
                }
            }
        }),
        createElement('div', {id: 'file--display', styles: {marginBottom: 24}}),
        createSelectElement({name: 'output--ext'}, [
            {value: 'csv', text: 'Comma-Separated Values'},
            {value: 'json', text: 'JavaScript Object Notation'},
            {value: 'xml', text: 'Extensible Markup Language'}
        ])
    ],
    function(formData, form){
        /**
         * Check if output ext matches incoming extension
         * Reset if true
         */
        const filepath = 'file--path';
        const fileList = component.shadowRoot.getElementById(filepath).files;
        // append fileList to form data
        for(let i = 0; i < fileList.length; i++){
            formData.append(filepath, fileList[i]);
        }
        form.submit();
        /*
        const ext   = file.name.substring(file.name.lastIndexOf('.') + 1);
        if(ext === data['output--ext']){
            /**
             * TODO: Don't reset form if matching ext
             */
            /*
            form.reset();
            form.querySelector('[id="file--table"').innerHTML = '';
            const small = document.createElement('small');
            small.style.color = 'red';
            small.textContent = 'Form Reset! Output File Ext cannot be the same as incoming File Ext!';
            form.querySelector('[id="file--display"').appendChild(small);
        } else {
            /**
             * Validated
             * Submit Form
             */
            /*
            form.submit();
        }
        */
    }
);
/**
 * Mount component
 */
root.appendChild(component);
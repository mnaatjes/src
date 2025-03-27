import { createCustomForm } from '../../../../../packages/htmlComponents/createCustomForm.js';
import { createElement } from '../../../../../packages/htmlComponents/elements/createElement.js';
import { createInputElement } from '../../../../../packages/htmlComponents/elements/createInputElement.js';
import { createSelectElement } from '../../../../../packages/htmlComponents/elements/createSelectElement.js';
/**
 * @file php/lib/converter/js/main.js
 * @description Main js for file converter form
 */
let count  = 1;
const root = document.getElementById('root');
const form = createCustomForm(
    {
        tagName: 'file-form',
        action: 'post',
        enctype: 'file',
        mode: 'submit',
        styles: '../../../styles/css/main.css'
    },
    [
        createInputElement('text', 'filename', {placeholder: 'Enter output filename'}),
        createInputElement('file', 'file-path', {id: 'file--path'}),
        createElement('label', {
            id: 'file--button',
            onClick: function(e){
                const upload = form.shadowRoot.getElementById('file--path');
                console.log(upload);
            },
        }),
        createElement('div', {id: 'file--display', styles: {marginBottom: 24}}),
        createSelectElement({name: 'output-ext'}, [
            {value: 'csv', text: 'Comma-Separated Values'},
            {value: 'json', text: 'JavaScript Object Notation'},
            {value: 'xlsx', text: 'Excel Speadsheet'},
            {value: 'xml', text: 'Extensible Markup Language'}
        ])
    ]
);
/**
 * Mount component
 */
root.appendChild(form);
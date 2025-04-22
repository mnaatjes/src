/**
 * PHP HTTP Request / Response Test Environment Client Requests
 * @file main.js
 */
/**
 * @const uri
 */
const uri = './test.php';
/**
 * Imports
 */
import { fetch_simple } from './js/fetch_simple.js';
import { createTableElement } from '../../../../../packages/htmlComponents/elements/createTableElement.js';
/**
 * Constants HTML Elements
 */
const display   = document.getElementById('display');
const form      = document.getElementById('form');
/**
 * @listen form#submit 
 */
//form.addEventListener('submit', onFetchForm);
/**
 * Planets Request
 */
document.getElementById('btn_planets').addEventListener('click', function(e){
    // fetch
    fetch_simple(uri + '/planets', {}, function(data){
        display.innerHTML = '';
        display.appendChild(
            createTableElement(data, {
                caption: "Order of the Planets",
                thead: {
                    headers: ['Planet', 'Order', 'Type', 'Radius', 'Mass', 'Period', 'Rotation', 'Moons', 'Rings']
                }
            })
        );
    });
});
/**
 * Restaurant Users
 */
document.getElementById('btn_users').addEventListener('click', function(e){
    fetch_simple(
        uri + '/users/items',
        {},
        function(data){
            console.log(data);
            display.innerHTML = '';
            display.appendChild(
                createTableElement(
                    data,
                    {
                        caption: 'Restaurant Reservations',
                        thead: {
                            headers: ['ID', 'First', 'Last', 'Email', 'Phone', 'History', 'Prefreences', 'Points']
                        }
                    }
                )
            );
        }
    )
});
/**
 * Speech Get All
 */
/*
document.getElementById('form_speech').addEventListener('submit', function(e){
    e.preventDefault();
    console.log(e);
});
*/
/**
 * @author: Michael Naatjes
 * @date: 2025-04-05
 * @description: This file contains the test cases for the requests library.
 */
const root      = document.getElementById('root');
const display   = document.getElementById('display');
const input     = document.getElementById('input');
/**
 * @listens {click} document#input
 */
input.addEventListener('keyup', function(e){
    const value = e.target.value;
    fetch('src/test.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            input: value,
            test: 'test'
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        //display.innerHTML = data.value;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
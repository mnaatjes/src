/**
 * PHP HTTP Request / Response Test Environment Client Form Handling
 * @file form.js
 */
/**
 * @listens#submit
 */
export function onFetchForm(e){
    // Prevent Default
    e.preventDefault();
    // Capture form data
    const formData  = new FormData(this);
    const dataObj   = Object.fromEntries(formData.entries());
    // perform fetch
    fetch(this.getAttribute('action'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObj)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const form = document.getElementById('form--upload');

function formSubmit(e){
    // stop submit
    e.preventDefault();
    // declare form data
    const formData  = new FormData(this);
    const inputA    = document.getElementById('fileListA');
    const inputB    = document.getElementById('fileListB');
    const fileListA = inputA.files;
    const fileListB = inputB.files;
    console.log(formData.get('file--data[]'));
    this.submit();
}
form.addEventListener('submit', formSubmit);
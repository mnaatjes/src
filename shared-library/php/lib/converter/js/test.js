const form = document.getElementById('form--upload');

function formSubmit(e){
    e.preventDefault();
    console.log(this);
    const formData = new FormData(this);
    const data = {};
    formData.forEach((val, key) => {
        data[key] = val;
    });
    this.submit();
}
form.addEventListener('submit', formSubmit);
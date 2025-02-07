/**
 * @description catch upload button and trigger file upload
 * @listens click#
 */
const btn_choose = document.getElementById('choose-file');
const input_file = document.querySelector('input[type="file"]');
const bnt_submit = document.getElementById('upload');

btn_choose.addEventListener('click', function(e){
    /**
     * trigger input-file
     */
    input_file.click();
});
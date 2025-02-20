/**
 * @file createFormComponent.js
 * Custom HTMLElement Form
 */
export function createFormComponent(formData={}, formElements={}, submit='Submit', reset=''){
    /**
     * destructure form data
     * @type {String} formAction
     * @type {String} formMethod default = POST
     * @type {String} formName
     * @type {String} formEncrypt porperty attached post-param
     * 
     * validate required params filled
     */
    if(typeof formData !== 'object'){
        throw new TypeError('Form Data must be an object including: Method, Action, and Name');
    }
    const { method, action, name } = formData;
    if(method.length == 0){
        method = 'POST';
    }
    if(action.length == 0 || name.length === 0){
        throw new Error('Form Action or Form Name undefined!');
    }
    /**
     * validate elements
     * valid tagNames
     * valid input types
     * valid children
     */
    /**
     * validate submit and reset button params
     */
    /**
     * Generate Class:
     * attach shadow
     * generate html component template
     * render template
     * attach props
     * establish component methods
     */
}
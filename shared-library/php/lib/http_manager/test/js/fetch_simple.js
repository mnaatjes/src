/**
 * Simple fetch template
 * @param {string} uri Resource path
 * @param {object} config
 * @param {string} config.method Default GET
 * @param {object} config.headers Headers object
 * @param {string} config.body Default empty
 * @param {callable} onSuccess Data handling callback
 * @param {callable} onFailure Error handling callback
 */
export function fetch_simple(
    uri,
    config={},
    onSuccess=function(data){
        console.log(data);
    }, 
    onFailure=function(errors){
        console.error(errors);
    }
){
    /**
     * Set Defaults
     */
    config = {...{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }, ...config
    }};
    console.log(config);
    /**
     * Perform fetch with default values
     */
    fetch(
        uri, 
        {...config}
    )
    .then(response =>{
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data =>{
        onSuccess(data);
    })
    .catch(error => {
        onFailure(error);
    });
}
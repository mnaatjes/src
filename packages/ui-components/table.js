/**
 * @file src/packages/ui-components/table.js
 * Function that generates a table component
 */
export function createTable(data, title='', attributes={}) {
    /**
     * declare major elements
     */
    const caption   = document.createElement('caption');
    const table     = document.createElement('table');
    const thead     = document.createElement('thead');
    const tbody     = document.createElement('tbody');
    /**
     * set caption
     * append to table
     */
    if(title.trim().length > 0){
        caption.textContent = title;
    }
    /**
     * validate data: array or object
     * parse data:
     */
    if(typeof data === 'object' && !Array.isArray(data)){
        let keys    = Object.keys(data).map(key => {
            return key.charAt(0).toUpperCase() + key.slice(1);
        });
        let values  = Object.values(data);
        let rowHead = document.createElement('tr');
        let width   = keys.length;
        let height  = 1;
        /**
         * generate thead cols
         */
        keys.forEach(key => {
            let th = document.createElement('th');
            th.textContent = key;
            rowHead.appendChild(th);
        });
        /**
         * append row head to thead
         */
        thead.appendChild(rowHead);
        /**
         * generate tbody rows
         * generate tbody cols
         */
        for(let i = 0; i < height; i++){
            let rowBody = document.createElement('tr');
            values.forEach(val => {
                let td = document.createElement('td');
                td.textContent = val;
                rowBody.appendChild(td);
            });
            tbody.appendChild(rowBody);
        }
    }
    /**
     * append caption
     * append thead
     * append tbody
     */
    if(title.trim().length > 0){
        table.appendChild(caption);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}
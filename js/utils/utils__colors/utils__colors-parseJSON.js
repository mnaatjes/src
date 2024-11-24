/*----------------------------------------------------------*/
/**
 * @file utils/utils__colors/utils__colors-parseJSON.js
 * 
 * @name ColorsJSON
 * @type {Class}
 * 
 * @memberof Utils.Colors
 * @namespace ColorsJSON
 */
/*----------------------------------------------------------*/
class ColorsJSON {
    constructor(fp){
        /**
         * @name records
         * @type {Object}
         * @memberof ColorsJSON
         */
        this.records = [];
        /**
         * @description load json
         * @implements {initColorsJSON}
         */
        this.initColorsJSON(fp);
    }
    /*----------------------------------------------------------*/
    /**
     * @name initColorsJSON
     * @type {Method}
     * @memberof ColorsJSON
     * @param {String} fp file path
     * @description
     */
    /*----------------------------------------------------------*/
    async initColorsJSON(fp){
        /**
         * save data
         * define properties
         */
        let json        = await this.fetchJSON(fp);
        let palettes    = [];
        let tint_types  = [
            {id: 100, value: 'container'},
            {id: 200, value: 'main'},
            {id: 300, value: 'variant'},
            {id: 400, value: 'mid'},
            {id: 500, value: 'dim'},
            {id: 600, value: 'onContainer'},
            {id: 700, value: 'stroke'},
        ];
        /**
         * check depth
         * extract palette titles
         * from first object
         */
        listJSON(json[Object.keys(json)[0]], 0, function(obj){
            /**
             * extract color palette titles
             * check to make sure doubles not extracted
             * join tints object to array
             */
            for(let key in obj){
                if(key !== 'name' && !palettes.some(item => item.palette === key)){
                    /**
                     * declare palette object
                     */
                    let palette = {palette: key, tints: []};
                    /**
                     * loop numeric ids
                     */
                    for(let id in obj[key]){
                        /**
                         * declare tint object
                         */
                        let item = obj[key][id];
                        let tint = {id: null, value: null, type: null};
                        /**
                         * parse tint id
                         * assign type based on id number
                         */
                        if(!isNaN(id)){
                            /**
                             * declare type result
                             */
                            let res;
                            /**
                             * assign id
                             * assign hex
                             */
                            tint.id     = id;
                            tint.value  = item.value;
                            /**
                             * loop tint types
                             * parse based on num value
                             */
                            tint_types.forEach(type => {
                                if(type.id == id){res = type.value;}
                            });
                            /**
                             * assign tint type
                             */
                            tint.type = res;
                            /**
                             * push tints 
                             */
                            palette.tints.push(tint);
                        }
                    }
                    /**
                     * push everything into palettes array
                     */
                    palettes.push(palette);
                }
            }
        });
        console.log(palettes);
    }
    /*----------------------------------------------------------*/
    /**
     * @name convertToCSS
     * @type {Method}
     * @memberof ColorsJSON
     * @param {Object} json
     * @description
     */
    /*----------------------------------------------------------*/
    convertToCSS(){}
    /*----------------------------------------------------------*/
    /**
     * @name convertToSCSS
     * @type {Method}
     * @memberof ColorsJSON
     * @param {Object} json
     * @description
     */
    /*----------------------------------------------------------*/
    convertToSCSS(){}
    /*----------------------------------------------------------*/
    /**
     * @name fetchJSON
     * @type {Method}
     * @memberof ColorsJSON
     * @param {String} fp file path
     * @description
     */
    /*----------------------------------------------------------*/
    async fetchJSON(fp){
        /**
         * try file path
         * fetch json from file
         */
        try{
            let response = await fetch(fp);
            /**
             * no response
             * throw error
             */
            if(!response){
                throw new Error('Something went wrong!');
            }
            /**
             * return data
             */
            let data = await response.json();
            return data;
        }
        /**
         * catch error
         */
        catch(error){
            console.error('Rut rooo: ', error);
        }
    }
}
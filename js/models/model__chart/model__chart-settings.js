/*----------------------------------------------------------*/
/**
 * @file src/js/models/model__chart-settings.js
 * 
 * @name ChartSettings
 * @type {Class}
 * 
 * @memberof Chart
 * @namespace ChartSettings
 */
/*----------------------------------------------------------*/
class ChartSettings{
    constructor(canvas_w, canvas_h, config, dataset){
        /**
         * @name w
         * @type {Number}
         * @memberof ChartSettings
         */
        this.w = canvas_w - config.offsetX;
        /**
         * @name h
         * @type {Number}
         * @memberof ChartSettings
         */
        this.h = canvas_h - config.offsetY;
        /**
         * @name origin
         * @type {Object}
         * @memberof ChartSettings
         */
        this.origin = {
            x: 0 + config.offsetX,
            y: 0 + config.offsetY
        };
        /**
         * @name aspect
         * @type {Object}
         * @memberof ChartSettings
         */
        this.aspect = this.getAspectRatio(this.w, this.h);
        /**
         * @name col_numbers
         * @type {Array}
         * @memberof configureSettings
         * @description 
         */
        this.col_numbers = dataset.reduce((acc, item) => {acc.push(item.data); return acc;}, []);
        /**
         * @name col_labels
         * @type {Array}
         * @memberof configureSettings
         * @description 
         */
        this.col_labels = dataset.reduce((acc, item) => {acc.push(item.label); return acc;}, []);
        /**
         * @name data_count
         * @type {Number}
         * @memberof configureSettings
         * @description 
         */
        this.data_count = this.col_numbers.length;
        /**
         * @name max_value
         * @type {Number}
         * @memberof configureSettings
         * @description 
         */
        this.max_value = Math.max(...this.col_numbers);
        /**
         * @name abs_max
         * @type {Object}
         * @memberof configureSettings
         * @description 
         */
        this.abs_max = {
            x_axis: {x: this.w, y: 0},
            y_axis: {x: 0, y: this.h},
            value: this.calcCeiling(this.max_value)
        }
        /**
         * @name scale_factor_x
         * @type {Number}
         * @memberof configureSettings
         * @description 
         */
        this.scale_factor_x = parseFloat((this.w / this.data_count).toFixed(2));
        /**
         * @name scale_factor_y
         * @type {Number}
         * @memberof configureSettings
         * @description 
         */
        this.scale_factor_y = parseFloat(((this.h - this.origin.y) / this.abs_max.value).toFixed(2));
        /**
         * @name scales
         * @type {Number}
         * @memberof configureSettings
         * @description 
         */
        this.scales = {
            x_axis: this.buildScale('x'),
            y_axis: this.buildScale('y'),
        };
        /**
         * @name plots
         * @type {Number}
         * @memberof configureSettings
         * @description 
         */
        this.plots = this.formatData(this.scales.x_axis.scale, this.scales.y_axis.scale, this.col_numbers, this.col_labels);
    }
    /*----------------------------------------------------------*/
    /**
     * @name getAspectRatio
     * @type {Method}
     * @memberof ChartSettings
     * @param {Number} width
     * @param {Number} height
     * @returns {Object} 
     */
    /*----------------------------------------------------------*/
    getAspectRatio(width, height){
        /**
         * calculate greatest common factor
         */
        let gcf = getGCF(width, height);
        /**
         * calculate aspect ratio
         */
        return {x: width / gcf, y: height / gcf};
    }
    /*----------------------------------------------------------*/
    /**
     * @name getDistances
     * @type {Method}
     * @memberof ChartSettings
     * @param {Object} scale
     * @returns {Number | Array}
     */
    /*----------------------------------------------------------*/
    getDistances(scale){
        /**
         * reduce scale into array of values
         */
        let arr = scale.reduce((acc, temp) => {acc.push(temp.start); return acc;}, []);
        /**
         * split array into pairs
         */
        let res = [];
        for(let i = 0; i < arr.length - 1; i++){
            /**
             * split and calculate centers
             */
            res.push(this.calcDistance(arr[i], arr[i + 1]));
        }
        /**
         * reduce result
         */
        res = res.reduce((acc, curr) => {
            return acc.includes(curr) ? acc : [...acc, curr];
        }, []);
        /**
         * if len == 1; parse
         */
        if(res.length == 1){
            res = parseFloat(res.join(''));
        } else if(res.length > 1) {
            res = Math.min(...res);
        } else {console.error('Cannot Calculate Distances!');}
        /**
         * return value
         */
        return parseFloat((res).toFixed(2));
    }
    /*----------------------------------------------------------*/
    /**
     * @name getCenters
     * @type {Method}
     * @memberof ChartSettings
     * @param {Object} scale
     * @returns {Object}
     */
    /*----------------------------------------------------------*/
    getCenters(scale){
        /**
         * reduce scale into array of values
         */
        let arr = scale.reduce((acc, temp) => {acc.push(temp.start); return acc;}, []);
        /**
         * split array into pairs
         */
        let res = [];
        for(let i = 0; i < arr.length - 1; i++){
            /**
             * split and calculate centers
             */
            res.push(this.calcCenter(arr[i], arr[i + 1]));
        }
        return res;
    }
    /*----------------------------------------------------------*/
    /**
     * @name calcCeiling
     * @type {Method}
     * @memberof ChartSettings
     * @param {Number} num
     * @returns {Number} ceiling by magnitude
     */
    /*----------------------------------------------------------*/
    calcCeiling(num){
        /**
         * determine magnitude
         */
        let mag = Math.abs(num) < 100 ? 10
                : Math.abs(num) < 1000 ? 100
                : Math.abs(num) < 10000 ? 1000
                : 1;
        /**
         * return ceiling
         */
        return Math.ceil(num / mag) * mag;
    }
    /*----------------------------------------------------------*/
    /**
     * @name calcCenter
     * @type {Method}
     * @memberof ChartSettings
     * @param {Object} a
     * @param {Object} b
     * @returns {Number} distance
     */
    /*----------------------------------------------------------*/
    calcCenter(a, b){return {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2};}
    /*----------------------------------------------------------*/
    /**
     * @name calcDistance
     * @type {Method}
     * @memberof ChartSettings
     * @param {Object} a
     * @param {Object} b
     * @returns {Number} distance
     */
    /*----------------------------------------------------------*/
    calcDistance(a, b){
        /**
         * calculate deltas
         */
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        /**
         * return calculation
         */
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }
    /*----------------------------------------------------------*/
    /**
     * @name scaleData
     * @type {Method}
     * @memberof ChartSettings
     * @param {Number} num
     * @param {String} axis x, y
     * @returns {Number} 
     */
    /*----------------------------------------------------------*/
    scaleData(num, axis){
        /**
         * determine axis
         */
        let factor;
        if(axis == 'x'){factor = this.scale_factor_x;}
        else if(axis == 'y'){factor = this.scale_factor_y;}
        /**
         * return number
         */
        return parseFloat((num * factor).toFixed(2));
    }
    /*----------------------------------------------------------*/
    /**
     * @name buildScale
     * @type {Method}
     * @memberof ChartSettings
     * @param {String} axis x, y
     * @returns {Array} 
     */
    /*----------------------------------------------------------*/
    buildScale(axis){
        /**
         * define result
         */
        let result = {scale: [], labels: []};
        /**
         * @name findDivisor
         * @type {Function}
         * @memberof ChartSettings
         * @param {Number} dividend
         */
        function findDivisor(dividend){
            /**
             * loop based on dividend
             */
            for(let i = 1; i <= dividend; i++){
                /**
                 * if divided remainder is zero
                 * and dividend / i (divisor) == 10
                 * return divisor
                 */
                if(dividend % i === 0 && dividend / i === 10){
                    return i;
                }
            }
            /**
             * if no divisor results in 10
             * find nearest divisor
             */
            let close_divisor   = 1;
            let close_result    = dividend;
            /**
             * loop
             */
            for(let i = 1; i <= dividend; i++){
                /**
                 * if no remainder
                 * set result
                 */
                let quotient = dividend / i;
                /**
                 * check if number is close to 20
                 */
                console.log(Math.ceil(i));
                console.log(Math.ceil(i));
                if(quotient <= 15){
                    return Math.ceil(i);
                }
            }
            console.error('Cannot Compute Number!');
            return null;
        }
        /**
         * determine axis
         */
        let num;
        let dec;
        if(axis == 'x'){
            num = this.data_count;
            dec = 1;
        }
        else if(axis == 'y'){
            num = this.abs_max.value;
            /**
             * determine decrement
             */
            dec = findDivisor(num);
        }
        else {console.error('Number not defined in ChartSettings.buildScale');}
        /**
         * loop from abs max value
         */
        for(let i = num; i >= 0; i -= dec){
            /**
             * define temp object
             */
            let temp_obj = {
                value: i,
                scaled: this.scaleData(i, axis),
                start: {x: null, y: null},
                end: {x: null, y: null}
            };
            /**
             * determine which axis is being built
             */
            if(axis == 'x'){
                /**
                 * x-axis definitions
                 * start
                 */
                temp_obj.start = {
                    x: this.scaleData(i, axis) + this.origin.x,
                    y: this.origin.y - (this.origin.y / 2)
                };
                temp_obj.end = {
                    x: this.scaleData(i, axis) + this.origin.x,
                    y: this.h + (this.origin.y / 2)
                };
            } else if(axis == 'y'){
                /**
                 * y-axis definitions
                 */
                temp_obj.start = {
                    x: this.origin.x - (this.origin.x / 2),
                    y: this.scaleData(i, axis) + this.origin.y
                };
                temp_obj.end = {
                    x: this.w + this.origin.x,
                    y: this.scaleData(i, axis) + this.origin.y
                };
            }
            /**
             * push to result
             */
            result.scale.push(temp_obj);
        }
        /**
         * calculate center coords of x-axis areas
         */
        let centers = this.getCenters(result.scale);
        /**
         * reverse centers for proper output
         */
        centers.reverse();
        /**
         * loop scale and input center position
         * for labels
         */
        centers.forEach((center, i) => {
            /**
             * define obj container
             */
            let temp_obj = {
                value: null,
                plot: null
            }
            /**
             * determine plot, label from axis
             */
            if(axis == 'x'){
                /**
                 * if x axis: from labels
                 */
                temp_obj.value  = this.col_labels[i];
                temp_obj.plot   = center;
            } else if (axis == 'y'){
                temp_obj.value  = result.scale[i].value;
                temp_obj.plot   = {x: (this.origin.x / 2) - 10, y: result.scale[i].start.y};
            }
            /**
             * push object onto result
             */
            result.labels.push(temp_obj);
        });
        /**
         * reverse arrays
         */
        result.scale.reverse();
        result.labels.reverse();
        /**
         * return result
         */
        return result;
    }
    /*----------------------------------------------------------*/
    /**
     * @name formatData
     * @type {Method}
     * @memberof ChartSettings
     * @namespace formatData
     * @description
     * @param {Object} scale
     * @param {Object} col_num
     * @param {Object} col_label
     * @returns {Object}
     */
    /*----------------------------------------------------------*/
    formatData(scale_x, scale_y, col_num, col_label){
        /**
         * define result
         */
        let result = [];
        /**
         * calculate distances
         */
        let sep = this.getDistances(scale_x);
        /**
         * calculate width of bar
         */
        let wid = sep / (this.aspect.x / this.aspect.y);
        /**
         * calculate padding
         */
        let pad = (sep - wid) / 2;
        /**
         * loop data
         */
        col_num.forEach((num, i) => {
            /**
             * start coords for each sector
             */
            let x_axis = scale_x[i].start;
            let y_axis = scale_y[i].start;
            /**
             * define temp object
             */
            let temp_obj = {
                start: {x: x_axis.x + pad, y: this.origin.y},
                end: {
                    x: x_axis.x - pad,
                    y: this.scaleData(num, 'y') == 0 ? this.origin.y : this.scaleData(num, 'y')
                },
                w: wid,
                h: this.scaleData(num, 'y'),
            };
            /**
             * push to result
             */
            result.push(temp_obj);
        });
        /**
         * return result
         */
        return result;
    }
}
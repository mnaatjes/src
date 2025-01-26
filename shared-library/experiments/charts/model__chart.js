/*----------------------------------------------------------*/
/**
 * @file src/js/models/model__chart.js
 * 
 * @name Chart
 * @type {Class}
 * 
 * @memberof Src.Models
 * @namespace Chart
 */
/*----------------------------------------------------------*/
class Chart {
    constructor(parent_id, config){
        /**
         * @name parent
         * @type {Object}
         * @memberof Chart
         */
        this.parent = new DOMElement(parent_id);
        /**
         * @name config
         * @type {Object}
         * @memberof Chart
         */
        this.config = config;
        /**
         * @name canvas_obj
         * @type {Object}
         * @memberof Chart
         */
        this.chart_obj = this.generateCanvas(config.chart.width, config.chart.height);
        /**
         * @name canvas
         * @type {Object}
         * @memberof Chart
         */
        this.canvas = this.chart_obj.canvas;
        /**
         * @name ctx
         * @type {Object}
         * @memberof Chart
         */
        this.ctx = this.chart_obj.context;
        /**
         * @name dataset
         * @type {Array}
         * @memberof Chart
         */
        this.dataset = [];
        /**
         * @name settings
         * @type {Array}
         * @memberof Chart
         */
        this.settings = {scales: {}};
        /**
         * @implements this.initChart
         */
        this.initChart();
    }
    /*----------------------------------------------------------*/
    /**
     * @name initChart
     * @type {Method}
     * @memberof Chart
     * @description
     */
    /*----------------------------------------------------------*/
    initChart(){
        /**
         * append canvas
         */
        this.parent.node.appendChild(this.canvas);
    }
    /*----------------------------------------------------------*/
    /**
     * @name generateCanvas
     * @type {Method}
     * @memberof Chart
     * @param {Number} width
     * @param {Number} height
     * @description
     */
    /*----------------------------------------------------------*/
    generateCanvas(width, height){
        /**
         * @name canvas
         * @type {HTMLElement}
         * @memberof generateCanvas
         */
        let canvas = document.createElement('canvas');
        /**
         * @name ctx
         * @type {Object}
         * @memberof generateCanvas
         */
        let ctx = canvas.getContext('2d');
        /**
         * @name ratio
         * @type {Number}
         * @memberof generateCanvas
         * @implements this.getPixelRatio
         */
        let ratio = this.getPixelRatio(ctx);
        /**
         * set canvas attributes
         */
        canvas.width        = Math.round(width * ratio);
        canvas.height       = Math.round(height * ratio);
        /**
         * update config object
         */
        this.config.chart.width     = canvas.width;
        this.config.chart.height    = canvas.height;
        /**
         * set styling lengths
         */
        canvas.style.width  = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
        /**
         * TODO: ctx.scale
         * scale ctx to get pixel density
         */
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        /**
         * invert coordinate system
         */
        ctx.scale(1, -1);
        ctx.translate(0, -canvas.height);
        /**
         * return canvas
         */
        return {canvas: canvas, context: ctx};
    }
    /*----------------------------------------------------------*/
    /**
     * @name getPixelRatio
     * @type {Method}
     * @memberof Chart
     * @param {Object} ctx context
     * @returns {Number}
     * @description divide device pixel ratio (window) by backing ratio
     */
    /*----------------------------------------------------------*/
    getPixelRatio(ctx){
        /**
         * @name backing_stores
         * @type {Array}
         */
        let backing_stores = [
            'webkitBackingStorePixelRatio',
            'mozBackingStorePixelRatio',
            'msBackingStorePixelRatio',
            'oBackingStorePixelRatio',
            'backingStorePixelRatio'
        ];
        /**
         * @name device_ratio
         * @global
         * @type {Window}
         * @returns {Number}
         */
        let device_ratio = window.devicePixelRatio;
        /**
         * @name backing_ratio
         * @global
         * @type {Window<Function>}
         * @returns {Number}
         * @description reduce array to single backing store ratio; default == 1
         */
        let backing_ratio = backing_stores.reduce(function(prev, curr){
            return (ctx.hasOwnProperty(curr)? ctx[curr] : 1);
        });
        /**
         * return result
         */
        //return device_ratio / backing_ratio;
        return 1.0;
    }
    /*----------------------------------------------------------*/
    /**
     * @name updateChart
     * @type {Method}
     * @memberof Chart
     * @description
     * @param {Array} dataset
     */
    /*----------------------------------------------------------*/
    updateChart(dataset){
        /**
         * configure chart settings
         */
        this.settings = new ChartSettings(this.canvas.width, this.canvas.height, this.config, dataset);
        /**
         * clear existing chart
         */
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        /**
         * render scales
         */
        this.renderScale(this.settings.scales);
        /**
         * rest render
         */
        this.renderChart(this.settings.plots);
    }
    /*----------------------------------------------------------*/
    /**
     * @name renderScale
     * @type {Method}
     * @memberof Chart
     * @param {Object} scales scales object x_axis, y_axis
     * @description 
     */
    /*----------------------------------------------------------*/
    renderScale(scales){
        /**
         * get colors
         */
        let colors = ['#5c5c5c', '#cccccc'];
        /**
         * definitions
         */
        let scaleX = scales.x_axis.scale;
        let scaleY = scales.y_axis.scale;
        /**
         * x-axis scale
         */
        scaleX.forEach((scale, index) => {
            /**
             * select color
             */
            let color;
            if (index == 0){color = colors[0];}
            else {color = colors[1]}
            /**
             * draw scale
             */
            this.drawLine(scale.start, scale.end, color, 1.0);
        });
        /**
         * y-axis scale
         */
        scaleY.forEach((scale, index) => {
            /**
             * select color
             */
            let color;
            if (index == 0){color = colors[0];}
            else {color = colors[1]}
            /**
             * draw scale
             */
            this.drawLine(scale.start, scale.end, color, 1.0);
        });
        /**
         * definitions
         */
        let labelX      = scales.x_axis.labels;
        let labelY      = scales.y_axis.labels;
        let conf_title  = this.config.scales.text.titles;
        let conf_units  = this.config.scales.text.units;
        /**
         * x-axis lables
         */
        labelX.forEach(label => {
            /**
             * draw text
             */
            this.drawText(label.value, label.plot, conf_title.color, conf_title.font);
        });
        /**
         * y-axis lables
         */
        labelY.forEach(label => {
            /**
             * draw text
             */
            this.drawText(label.value, label.plot, conf_units.color, conf_units.font);
        });
    }
    /*----------------------------------------------------------*/
    /**
     * @name renderChart
     * @type {Method}
     * @memberof Chart
     * @param {Array} data_plots
     * @description 
     */
    /*----------------------------------------------------------*/
    renderChart(plots){
        /**
         * loop data plots
         */
        plots.forEach(data => {
            /**
             * render bars
             */
            this.drawBar(data.start.x, data.start.y, data.w, data.h, '#cccccc');
        });
    }
    /*----------------------------------------------------------*/
    /**
     * @name drawBar
     * @type {Method}
     * @memberof Chart
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @param {String} fill
     * @param {String} stroke
     * @description 
     */
    /*----------------------------------------------------------*/
    drawBar(x, y, width, height, fill, stroke=null){
        /**
         * save canvas
         */
        this.ctx.save();
        /**
         * apply outline styles
         * line width
         * stroke color
         */
        this.ctx.lineWidth      = 1.0;
        this.ctx.strokeStyle    = '#333333';
        /**
         * apply rect styles
         * fill
         * opacity
         */
        this.ctx.fillStyle      = fill;
        this.ctx.globalAlpha    = 0.5;
        /**
         * render rectangle
         * stroke
         * fill
         */
        this.ctx.strokeRect(x, y, width, height)
        this.ctx.fillRect(x, y, width, height);
        /**
         * restore canvas
         */
        this.ctx.restore();
    }
    /*----------------------------------------------------------*/
    /**
     * @name drawText
     * @type {Method}
     * @memberof Chart
     * @param {String} text
     * @param {Object} pos {x, y}
     * @property {String} style
     * @property {String} font
     * @property {String} align
     * @property {Number} max_width
     * @description 
     */
    /*----------------------------------------------------------*/
    drawText(text, pos, style, font){
        /**
         * save context
         */
        this.ctx.save();
        /**
         * fix invertex text
         * text properties
         */
        this.ctx.direction = 'rtl';
        this.ctx.scale(1, -1);
        this.ctx.textAlign      = 'center';
        this.ctx.textBaseline   = 'middle';
        this.ctx.font           = font;
        this.ctx.fillStyle      = style;
        /**
         * render label
         */
        this.ctx.fillText(text, pos.x, -pos.y);
        /**
         * restore context
         */
        this.ctx.restore();
    }
    /*----------------------------------------------------------*/
    /**
     * @name drawLine
     * @type {Method}
     * @memberof Chart
     * @namespace DrawLine
     * @param {Object} config.line
     * @param {Number} index
     * @property {Object} start x, y
     * @property {Object} end x, y
     * @property {String} style
     * @property {String} weight
     * @description 
     */
    /*----------------------------------------------------------*/
    drawLine(start, end, style, weight){
        /**
         * pasuse context
         */
        this.ctx.save();
        /**
         * define properties
         */
        this.ctx.strokeStyle = style;
        this.ctx.lineWidth   = weight;
        /**
         * render line
         */
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
        /**
         * restore context
         */
        this.ctx.restore();
    }
}
//-------------------------------------------------------------------------------------------------------
// CIS 174: Class - OpenWeather API
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/***
 * @name api_weather_key    @type {string}
 * @name city               @type {HTMLInputElement}
 * @name state              @type {HTMLInputElement}
 * @name country            @type {HTMLInputElement}
 * @name units              @type {HTMLInputElement}
 * @name city               @type {HTMLInputElement}
 */
/*------------------------------------------------------*/
const api_weather_key   = '87f4a90948e268def071e4ccdf01a784';
const city              = 'Kalamazoo';
const state             = 'Michigan';
const country           = 'US';
const units             = 'imperial';
/*------------------------------------------------------*/
/***
  * @name WeatherAPI
 * @type {class}
 * @constructor Initialize Class instance
 *      @param {string} api_key
 *      @property {string} url_geocoder
 *      @property {string} url_current
 *      @property {string} url_forecast
 */
/*------------------------------------------------------*/
class WeatherAPI {
    constructor(api_key){
        this.api_key        = api_key;
        this.url_geocoder = 'http://www.google.xom';
    }
}

let weather = new WeatherAPI();
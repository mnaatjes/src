//-------------------------------------------------------------------------------------------------------
// CIS 174: Functions - Fetch Api: OpenWeather API
//-------------------------------------------------------------------------------------------------------
const api_weather_key   = '87f4a90948e268def071e4ccdf01a784';
const city              = 'Kalamazoo';
const state             = 'Michigan';
const country           = 'US';
const units             = 'imperial';
/*------------------------------------------------------*/
/***
 * @name getWeather
 * @type {async function}
 * @param {string}  city full name; e.g. Kalamazoo
 * @param {string}  state full name; e.g. Michigan
 * @param {string}  country 2 letter code; e.g. US, UK
 * @param {string}  api_key from api
 * @param {string}  weather_type current, forecast
 * @param {string}  units imperial, metric
 */
/*------------------------------------------------------*/
function getWeather(city, state, country, api_key, weather_type, units){
    // API URL properties
    const api_weather_url_current   = 'https://api.openweathermap.org/data/2.5/weather';
    const api_weather_url_forecast  = 'http://api.openweathermap.org/data/2.5/forecast';
    let result;
    let api_url;
    // get long, lat
    let geocoder = getLongLat(city, state, country, api_key);
    // select weather api url
    if(weather_type == 'forecast'){
        api_url = `${api_weather_url_forecast}?lat=${geocoder.lat}&lon=${geocoder.lon}&appid=${api_key}&units=${units}`;
    } else if (weather_type == 'current'){
        api_url = `${api_weather_url_current}?lat=${geocoder.lat}&lon=${geocoder.lon}&appid=${api_key}&units=${units}`;
    }
    // pull weather data from api
    fetchApi(api_url, city);
    // get weather object from session storage
    result = sessionStorage.getItem(city);
    return JSON.parse(result);
}
/*------------------------------------------------------*/
/***
 * @name getLongLat
 * @type {async function}
 * Parameters:
 * @param {string}  city full name; e.g. Kalamazoo
 * @param {string}  state full name; e.g. Michigan
 * @param {string}  country 2 letter code; e.g. US, UK
 * @param {string}  api_key from api
 * Properties:
 * @property {string} api_weather_url_geocoder 
 */
/*------------------------------------------------------*/
function getLongLat(city, state, country, api_key){
    const api_weather_url_geocoder  = 'http://api.openweathermap.org/geo/1.0/direct?';
    let storage_name_geocode        = `Geocoder:${city}`;
    // create api url
    let api_url_geocoder = `${api_weather_url_geocoder}q=${city},${state},${country}&limit=5&appid=${api_key}`;
    // get geoCode location information
    fetchApi(api_url_geocoder, storage_name_geocode);
    let geocode     = JSON.parse(sessionStorage.getItem(storage_name_geocode));
    let geo_object  = geocode;
    let result;
    geo_object.forEach(geo_item => {
        if(geo_item.name == city){
            console.log(geo_item);
            // return object
            let temp_obj = {
                'lon': geo_item.lon,
                'lat': geo_item.lat,
            };
            result = temp_obj;
        } else {result = false;}
    });
    return result;
}
/*------------------------------------------------------*/
/***
 * @name fetchApi
 * @type {async function}
 * @param {string} api_url full url including api_key to fetch from api
 * @param {string} storage_name string to name in session storage; e.g. city name
 */
/*------------------------------------------------------*/
async function fetchApi(api_url, storage_name){
    try {
        const response = await fetch(api_url);
        // failure
        if(!response.ok){
            throw ('ERROR!');
        }
        // success
        const json_obj = await response.json();
        // store
        sessionStorage.setItem(storage_name, JSON.stringify(json_obj));
    }
    catch(error) {
        console.error(`ERROR: ${error}`);
        document.querySelector('[class="error"]').innerHTML = 'ERROR: Unable to fetch API Data!';
    }
}
// Implementation
let weather = getWeather(city, state, country, api_weather_key, 'forecast', 'imperial');
console.log(weather);
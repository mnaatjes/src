/**
 * @file packages/htmlComponents/utils/parseEventProps.js
 * @description Parses events from attributes / properties object
 */
/*----------------------------------------------------------*/
/**
 * @function appendEvents
 * @param {Object} properties - Properties object from createElement
 * @param {HTMLElement} element - HTML Element to add event listeners
 * 
 * @property {Array} events - Events array that will be added to element
 * 
 * @returns {Object} - Remaining properties with events removed
 */

import { eventNamePairs } from "../constants/constants.js";
import { deepCopy } from '../utils/main.js';

/*----------------------------------------------------------*/
export function appendEvents(properties, element){
    /**
     * Validate properties
     * Check if empty --> exit
     */
    if(typeof properties !== 'object'){
        throw new TypeError(`Properties provided are NOT an Object! "${(typeof properties).toUpperCase()}" supplied instead!`);
    }
    if(Array.isArray(properties)){
        throw new TypeError(`Properties provided are Array! OBJECT must be provided!`);
    }
    if(Object.keys(properties).length === 0){
        return properties;
    }
    /**
     * Copy properties object
     * @const {Object} copy - copy of properties object
     */
    const copy = deepCopy(properties);
    /**
     * Declare Events Container
     * @const {Array<{ name: String, type: String, handler: Function }>} events - Events Container / Collector
     */
    const events = [];
    /**
     * Destructure "listeners", "listener", "events" from properties
     */
    ['listeners', 'listener', 'events'].map((key) => {
        if(properties.hasOwnProperty(key)){
            /**
             * Delete key from properties copy
             */
            delete copy[key];
            /**
             * Check type of prop: array, object
             */
            const prop = properties[key];
            // Exit if prop is NOT an object!
            if(typeof prop !== 'object'){
                console.warn(`Events must be supplied in either ARRAY or OBJECT form! "${(typeof prop).toUpperCase()}" Supplied in "${key}"!`);
                return;
            }
            /**
             * Parse Properties and append to Events Array
             */
            if(Array.isArray(prop)){
                prop.forEach(obj => {
                    /**
                     * Validate event object
                     */
                    const item = validateEventObj(obj);
                    if(typeof item !== 'object'){
                        return;
                    }
                    events.push(item);
                });
            } else {
                /**
                 * Process and validate event props
                 */
                for(const key in prop){
                    const item = validateEventObj({name: key, handler: prop[key]});
                    if(typeof item !== 'object'){
                        return;
                    }
                    events.push(item);
                }
            }
        }
    });
    /**
     * Evaluate remaining properties for event-types
     */
    for(const key in copy){
        // check if value is a function --> if not, exit
        if(typeof copy[key] === 'function'){
            const item = validateEventObj({name: key, handler: copy[key]});
            if(typeof item === 'object'){
                events.push(item);
                delete copy[key];
            }
        }
    }
    /**
     * Add Event Listeners
     */
    events.forEach(obj => {
        /**
         * Add event listener to element
         */
        element.addEventListener(obj.type, obj.handler);
        /**
         * Save event type and handler function to element for later refrence / removal
         */
        element[obj.name] = {
            type: obj.type,
            handler: obj.handler
        };
    });
    /**
     * Return remaining properties
     */
    return copy;
}
/*----------------------------------------------------------*/
/**
 * @function validateEventObj
 * @param {Object} obj - Event Object
 * 
 * @property {Array} eventNamePairs
 * 
 * @returns {Object<{ name: String, type: String, handler: Function }> | Boolean} - returns object on success or Boolean(false) if invalid
 */
/*----------------------------------------------------------*/
function validateEventObj(obj){
    /**
     * Check for "name" and "handler" property names
     * Check if "type" is valid
     * Generate event object and push to events array
     */
    if(obj.hasOwnProperty('name') && obj.hasOwnProperty('handler')){
        // Validate handler
        if(typeof obj.handler !== 'function'){
            console.warn(`Event "${obj.name}" is missing a function for the "handler" property! "${(typeof obj.handler).toUpperCase()}" supplied!`);
            return false;
        }
        // Validate "name" / "type" from eventNamePairs array of values
        const type = !obj.type ? obj.name.toLowerCase() : obj.type.toLowerCase();
        let index;
        if(!eventNamePairs.some((obj, i) => {
            if(obj.attribute === type || obj.listener === type){
                index = i;
                return true;
            }
            return false;
        })){
            // Invalid event type!
            console.warn(`Invalid Event Name / Type! ${type} supplied is not a valid!`);
            return false;
        }
        // Declare and append event object to events array
        return {
                name: obj.name,
                type: type === eventNamePairs[index].listener ? type : eventNamePairs[index].listener,
                handler: obj.handler
        };
    } else {
        return false;
    }
}
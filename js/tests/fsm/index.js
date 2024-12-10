/*----------------------------------------------------------*/
/**
 * @file src/js/tests/fsm/test.js
 * @author mnaatjes
 * @namespace Test.FSM
 */
/*----------------------------------------------------------*/
/**
 * @name states
 * @type {Array}
 * @description 
 */
const states = [
    'mounted',
    'unmounted'
];
/**
 * @name transitions
 * @type {Object}
 * @property {String} transitions[currentState] delta function: S * Sigma --> S(new)
 * @property {Object} transitions[currentState].deltaFunc Input Symbol --> newState
 * @description 
 */
const transitions = {
    mounted: {},
    unmounted: {}
};

/*----------------------------------------------------------*/
/**
 * @name SubState
 * @type {Class}
 * @memberof ElementState
 * 
 * @param {String} stateName    
 * @param {Array} properties    (Array of Objects) Acceptable input properties 
 *                              (exclusive undefined) that produce boolean of true
 * 
 * @description
 */
/*----------------------------------------------------------*/
class SubState {
    constructor(stateName, properties){
        /**
         * @name name
         * @type {}
         * @memberof SubState
         * @description
         */
        this.name = stateName;
        /**
         * @name properties
         * @type {Object}
         * @memberof SubState
         * @description
         */
        this.properties = properties;
    }
    /*----------------------------------------------------------*/
    /**
     * @name current
     * @type {Boolean}
     */
    /*----------------------------------------------------------*/
    get current(){}
    set current(input){
        
    }
}
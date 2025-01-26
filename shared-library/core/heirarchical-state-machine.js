/*----------------------------------------------------------*/
/**
 * @name State
 * @type {Class}
 * @memberof ElementState
 * @desciption Heirarchical State Machine
 */
/*----------------------------------------------------------*/
class State {
    constructor(stateName){
        /**
         * @name stateName
         * @type {String}
         * @memberof State
         */
        this.stateName = stateName;
        /**
         * @name subStates
         * @type {String}
         * @memberof State
         */
        this.subStates = {};
    }
    /*----------------------------------------------------------*/
    /**
     * @name addSubstate
     * @type {Method}
     * @memberof State
     * @param {String} newState
     * @param {String} newSubstate
     */
    /*----------------------------------------------------------*/
    addSubstate(newSubstate){
        this.subStates[stateName] = newSubstate;
    }
}
/*----------------------------------------------------------*/
/**
 * @name HSM
 * @type {Class}
 * @memberof ElementState
 * @desciption Heirarchical State Machine
 */
/*----------------------------------------------------------*/
class HSM {
    constructor(states){
        /**
         * @name states
         * @type {}
         * @memberof HSM
         */
        this.states = states;
        /**
         * @name
         * @type {}
         * @memberof HSM
         */
    }
    /*----------------------------------------------------------*/
    /**
     * @name transition
     * @type {Method}
     * @memberof HSM
     * @param {String} event
     */
    /*----------------------------------------------------------*/
    transition(event){}
}

const machine   = new HSM('idle');
let active      = new State('active');
active.addSubstate('hidden');
console.log(active);
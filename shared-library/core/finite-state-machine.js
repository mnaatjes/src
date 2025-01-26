/*----------------------------------------------------------*/
/**
 * @file src/js/components/fsm.js
 * @author mnaatjes
 * @version 1.0.0
 * @date 12/07/2024
 * 
 * @name FSM
 * @type {Class}
 * @memberof Src.Components
 * @namespace FiniteStateMachine
 * @description Sigma:  finite, non-empty set of input symbols (alphabet)
 *              S (Q):  finite, non-empty set of states
 *              s0:     initial state
 *              delta:  state transition function: delta: S * Sigma --> S
 * 
 * @property {Array} states S(Q) finite, non-empty set of states
 * @property {Object} transitions delta function(s)
 * @property {String} transitions[state] Sigma --> S
 * @property {String} currentState (s0) initial state
 */
/*----------------------------------------------------------*/
class FSM {
    constructor(states, transitions){
        /**
         * @name states
         * @type {Array}
         * @memberof FiniteStateMachine
         * @description
         */
        this.states = states;
        /**
         * @name transitions
         * @type {Object}
         * @memberof FiniteStateMachine
         * @description
         */
        this.transitions = transitions;
        /**
         * @name currentState
         * @type {String}
         * @memberof FiniteStateMachine
         * @description start with initial state
         */
        this.currentState = states[0];
    }
    /*----------------------------------------------------------*/
    /**
     * @name update
     * @type {Method}
     * @memberof FSM
     * @param {Object} input input event which triggers state transition
     * @description
     */
    /*----------------------------------------------------------*/
    update(input){
        /**
         * @name nextState S(next)
         */
        let nextState = this.transitions[this.currentState]?.[input];
        /**
         * check if undefined
         */
        if(nextState){
            /**
             * update current state
             */
            this.currentState = nextState;
        } else {
            /**
             * alert
             */
            console.error('Input Invalid: Cannot transition states!');
        }
        console.log(this.currentState);
    }
    /*----------------------------------------------------------*/
    /**
     * @name getCurrent
     * @type {Method}
     * @memberof FSM
     * @description
     */
    /*----------------------------------------------------------*/
    getCurrent(){return this.currentState;}
}
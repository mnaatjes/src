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
//const states        = ['off', 'on', 'standby'];
/**
 * @name transitions
 * @type {Object}
 * @property {String} transitions[currentState] delta function: S * Sigma --> S(new)
 * @property {Object} transitions[currentState].deltaFunc Input Symbol --> newState
 * @description 
 */

/*
const transitions   = {
    'off': {
        'power': 'on',
        'resume': 'awake'
    },
    'on': {
        'power': 'off',
        'standby':'standby'
    },
    'standby': {
        'power': 'on',
        'resume': 'on'
    },
    'awake': {
        'power': 'bananana'
    }
};
const machine = new FSM(states, transitions);

class Computer {
    constructor(fsm){
        this.state = fsm;
    }
    powerOn(){
        if(this.state.currentState === 'off'){
            this.state.update('power');
        } else {console.error('Power Already On')}
    }
    powerOff(){
        if(this.state.currentState === 'on'){
            this.state.update('power');
        } else if(this.state.currentState == 'standby'){
            this.state.update('power');
            this.state.update('power');
        } else {console.error('Power Already Off')}
    }
    standby(){this.state.update('standby');}
}

const pc = new Computer(machine);
pc.powerOn();
pc.standby();
pc.powerOff();
pc.powerOff();
*/
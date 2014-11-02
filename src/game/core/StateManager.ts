import Game = require('./Game');
import State = require('./State');

class StateManager {
    private states: Array<State> = [];
    private currentState: State = null;

    constructor(private game:Game) {

    }

    add(name:string, state:State) {
        this.states[name] = state;
    }

    start(name:string, ...args) {
        var state = this.states[name];

        if (this.currentState) {
            this.currentState.destroy();
        }

        if (state.init) {
            state.init.apply(args);
        }

        state.create();

        this.currentState = state;
    }

    update(dt: number, time: number): State {
        this.currentState.update(dt, time);

        return this.currentState;
    }
}

export = StateManager;

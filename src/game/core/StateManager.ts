import _ = require('lodash');

import Game = require('./Game');
import State = require('./State');

class StateManager {
    private states: Array<State> = [];
    private active: Array<string> = [];

    constructor(private multi: boolean = false) {

    }

    add(name: string, state:State) {
        this.states[name] = state;
    }

    get(name: string): State {
        if (!_.has(this.states, name)) {
            throw "State '" + name + "' does not exist on state manager";
        }

        return this.states[name];
    }

    start(name: string, ...args) {
        var state;

        if (!_.has(this.states, name)) {
            throw "State '" + name + "' does not exist on state manager";
        }

        state = this.states[name];

        if (!this.multi) this.stopAll();

        if (_.has(state, 'init')) {
            state.init.apply(args);
        }

        state.create();

        this.active.push(name);
    }

    stop(name: string) {
        var state;

        if (!_.has(this.states, name)) {
            throw "State '" + name + "' does not exist on state manager";
        }

        if (!_.contains(this.active, name)) {
            throw "State '" + name + "' is not active and can not be stopped";
        }

        state = this.states[name];

        state.destroy();

        _.remove(this.active, (n) => { return n === name; });
    }

    stopAll(): void {
        _.each(this.active, (n) => {
            this.stop(n);
        });
    }

    update(dt: number, time: number): any {
        _.each(this.active, (n) => {
            this.states[n].update(dt, time);
        });

        return (!this.multi && this.active.length)
            ? this.active
            : this.active;
    }
}

export = StateManager;

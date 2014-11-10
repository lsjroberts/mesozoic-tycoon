import State = require('./State');
import StateManager = require('./StateManager');

import RequestAnimationFrame = require("awayjs-core/lib/utils/RequestAnimationFrame");

class Game {
    public states: StateManager;
    public state: State;

    public timer: RequestAnimationFrame;
    public time: number = 0;

    constructor() {
        this.states = new StateManager(false);

        this.initListeners();
    }

    private initListeners(): void {
        this.timer = new RequestAnimationFrame(this.onEnterFrame, this);
        this.timer.start();
    }

    private onEnterFrame(dt: number): void {
        this.time += dt;

        this.state = this.states.update(dt, this.time);
    }
}

export = Game;

import StateManager = require('./StateManager');

import RequestAnimationFrame = require("awayjs-core/lib/utils/RequestAnimationFrame");

class Game {
    public states:StateManager;

    public timer: RequestAnimationFrame;
    public time: number = 0;

    constructor() {
        this.states = new StateManager(this);

        this.initListeners();
    }

    private initListeners(): void {
        this.timer = new RequestAnimationFrame(this.onEnterFrame, this);
        this.timer.start();
    }

    private onEnterFrame(dt: number): void {
        this.time += dt;

        this.states.update(dt, this.time);
    }
}

export = Game;

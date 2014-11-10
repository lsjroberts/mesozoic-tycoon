import Sense = require('./Sense');
import Actor = require('../../Actor');

class Hearing extends Sense {
    constructor(private target: Actor,
                private distance: number = 100,
                private fov: number = 360
    ) {
        super();
    }
}

export = Hearing;
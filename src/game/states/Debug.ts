import Mesh = require("awayjs-display/lib/entities/Mesh");
import PrimitivePlanePrefab = require("awayjs-display/lib/prefabs/PrimitivePlanePrefab");

import Game = require('./Game');

module Debug {
    export class Plane extends Game.BasicState {
        // Scene Objects
        public plane: Mesh;

        create() {
            super.create();
            this.initObjects();
        }

        initObjects() {
            this.plane = <Mesh> new PrimitivePlanePrefab(1000, 1000).getNewObject();
            this.plane.y = -20;

            this.scene.addChild(this.plane);
        }
    }
}

export = Debug;

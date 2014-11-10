import Mesh = require("awayjs-display/lib/entities/Mesh");
import Scene = require("awayjs-display/lib/containers/Scene");

import Actor = require('../core/Actor');

/**
 * --------------------------------------------------------------------------
 * NPC
 * --------------------------------------------------------------------------
 *
 *
 *
 */

class NPC extends Actor {
    constructor(mesh: Mesh, scene: Scene) {
        super(mesh, scene);
    }


}

export = Life;
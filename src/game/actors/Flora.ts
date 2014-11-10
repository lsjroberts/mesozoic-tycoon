import Mesh = require("awayjs-display/lib/entities/Mesh");
import Scene = require("awayjs-display/lib/containers/Scene");
import PrimitiveCubePrefab = require("awayjs-display/lib/prefabs/PrimitiveCubePrefab");
import TriangleMethodMaterial = require("awayjs-methodmaterials/lib/TriangleMethodMaterial");

import Life = require('./NPC');

/**
 * --------------------------------------------------------------------------
 * Flora
 * --------------------------------------------------------------------------
 *
 * These actors represent the various plants that can exist within the game
 * world.
 *
 */

module Flora {
    export class Plant extends Life {
        constructor(scene: Scene = null) {
            var size = 20.0,
                mesh;

            mesh = <Mesh> new PrimitiveCubePrefab(size, size, size).getNewObject();
            this.material = new TriangleMethodMaterial(0x66FF33, 1);
            mesh.material = this.material;

            super(mesh, scene);
        }
    }
}

export = Flora;
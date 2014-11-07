import Mesh = require("awayjs-display/lib/entities/Mesh");
import PrimitiveCubePrefab = require("awayjs-display/lib/prefabs/PrimitiveCubePrefab");
import TriangleMethodMaterial = require("awayjs-methodmaterials/lib/TriangleMethodMaterial");

import Life = require('./Life');

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
        constructor() {
            var size = 20.0,
                mesh;

            mesh = <Mesh> new PrimitiveCubePrefab(size, size, size).getNewObject();
            mesh.material = new TriangleMethodMaterial(0x66FF33, 1);

            super(mesh);
        }
    }
}

export = Flora;
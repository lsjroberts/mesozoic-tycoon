import Mesh = require("awayjs-display/lib/entities/Mesh");
import Scene = require("awayjs-display/lib/containers/Scene");
import PrimitiveCubePrefab = require("awayjs-display/lib/prefabs/PrimitiveCubePrefab");
import TriangleMethodMaterial = require("awayjs-methodmaterials/lib/TriangleMethodMaterial");

import Life = require('./NPC');

/**
 * --------------------------------------------------------------------------
 * Fauna
 * --------------------------------------------------------------------------
 *
 * These actors represent the various animals that can exist within the game
 * world.
 *
 */

module Fauna {
    export class Animal extends Life {
        private behaviour: Behaviour;

        constructor(scene: Scene = null) {
            var size = 40.0,
                mesh;

            mesh = <Mesh> new PrimitiveCubePrefab(size, size, size).getNewObject();
            mesh.material = new TriangleMethodMaterial(0xFF3366, 1);

            super(mesh, scene);
        }
    }

    export class CarnivoreBehaviour extends Behaviour {

    }

    export class HerbivoreBehaviour extends Behaviour {

    }

    export class Carnivore extends Animal {
        constructor(scene: Scene = null) {
            super(scene);

            this.behaviour = new CarnivoreBehaviour();
        }
    }

    export class Herbivore extends Animal {
        constructor(scene: Scene = null) {
            super(scene);

            this.behaviour = new HerbivoreBehaviour();
        }
    }

    export class Omnivore extends Animal {
        constructor(scene: Scene = null) {
            super(scene);

            this.behaviour = Behaviour.mix(
                new CarnivoreBehaviour(),
                new HerbivoreBehaviour()
            );
        }
    }
}

export = Fauna;
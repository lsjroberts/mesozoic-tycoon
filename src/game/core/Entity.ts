import Mesh = require("awayjs-display/lib/entities/Mesh");
import Scene = require("awayjs-display/lib/containers/Scene");
import TriangleMethodMaterial = require('awayjs-methodmaterials/lib/TriangleMethodMaterial');

/**
 * --------------------------------------------------------------------------
 * Entity
 * --------------------------------------------------------------------------
 *
 * An entity is a game object that can be present within a scene. It does
 * not necessarily need to be visible to the player, but may have a
 * defined position and orientation.
 *
 */

class Entity {
    public mesh: Mesh;
    public material: TriangleMethodMaterial;

    constructor(mesh: Mesh, scene: Scene = null) {
        this.mesh = mesh;

        if (scene) {
            scene.addChild(mesh);
        }
    }

    lookAt(entity: Entity): void {
        this.mesh.lookAt(entity.mesh.scenePosition);
    }
}

export = Entity;
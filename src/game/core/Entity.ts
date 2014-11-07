import Mesh = require("awayjs-display/lib/entities/Mesh");

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

    constructor(mesh: Mesh) {
        this.mesh = mesh;
    }

    lookAt(entity: Entity): void {
        this.mesh.lookAt(entity.mesh.scenePosition);
    }
}

export = Entity;
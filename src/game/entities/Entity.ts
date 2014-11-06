import Mesh = require("awayjs-display/lib/entities/Mesh");

/**
 * --------------------------------------------------------------------------
 * Entity
 * --------------------------------------------------------------------------
 *
 * An entity is a game object that can be present within a scene. It does
 * not necessarily need to be visible to the player, but will have a
 * defined position and orientation.
 *
 */

class Entity {
    public x: number;
    public y: number;
    public z: number;
    public mesh: Mesh;

    update(dt: number, time: number): void {

    }
}

export = Entity;
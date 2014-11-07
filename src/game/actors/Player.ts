import Actor = require('../core/Actor');

/**
 * --------------------------------------------------------------------------
 * Player
 * --------------------------------------------------------------------------
 *
 * This actor represents the player and actions she can perform.
 *
 */

class Player extends Actor {
    private pickedActors: Array<Actor>;

    pickActorAtCurrentPosition(): Actor {
        var mouse = this.getMousePosition();

        var actor = this;

        // actor = ?

        return actor;
    }

    pickActor(actor: Actor): void {

    }

    pickActors(actors: Array<Actor>): void {

    }

    placeActor(actor: Actor): void {

    }

    getMousePosition(): Array<number> {
        return [];
    }
}
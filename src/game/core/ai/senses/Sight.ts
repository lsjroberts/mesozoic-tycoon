import _ = require('lodash');
import Vector3D = require('awayjs-core/lib/geom/Vector3D');

import Sense = require('./Sense');
import Actor = require('../../Actor');

class Sight extends Sense {
    constructor(private target: Actor,
                private distance: number = 100,
                private fov: number = 90
    ) {
        super();
    }

    check(actors: Array<Actor>, awareness: number = 1): Array<Actor> {
        var tVector = this.target.mesh.scenePosition;

        actors = _.filter(actors, (actor) => {
            var aNorm: Vector3D,
                dot: number;

            aNorm = actor.mesh.scenePosition.clone();
            aNorm.normalize();

            dot = tVector.dotProduct(aNorm);

            return dot > Math.cos(this.fov / 2);
        });

        return actors;
    }
}

export = Sight;
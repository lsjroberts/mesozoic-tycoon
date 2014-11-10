import State = require('../../core/State');

/**
 * --------------------------------------------------------------------------
 * Life States
 * --------------------------------------------------------------------------
 *
 * ...
 *
 */

module Life {
    export class Idle extends State {
        create() {

        }
    }

    export class Consume extends State {

    }

    export class Eat extends Consume {

    }

    export class Drink extends Consume {

    }

    export class Grow extends State {
        create() {

        }
    }

    export class Reproduce extends State {

    }

    export class Die extends State {
        create() {

        }
    }
}

export = Life;
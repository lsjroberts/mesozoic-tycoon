import Game = require('./game/core/Game');
import Boot = require('./game/states/Boot');
import Debug = require('./game/states/Debug');

var game;

var addDebugStates = function() {
    game.states.add('debug.plane', new Debug.Plane());
    game.states.add('debug.primitives', new Debug.Primitives());
    game.states.add('debug.florafauna', new Debug.FloraFauna());
};

window.onload = function() {
    window['game'] = game = new Game();

    game.states.add('boot', new Boot());

    addDebugStates();

    game.states.start('boot');
    game.states.start('debug.florafauna');
};

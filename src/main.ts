import Game = require('./game/core/Game');
import Boot = require('./game/states/Boot');
import Debug = require('./game/states/Debug');

window.onload = function() {
    var game = new Game();

    game.states.add('boot', new Boot);

    game.states.add('debug.plane', new Debug.Plane);

    game.states.start('boot');
    game.states.start('debug.plane');
};

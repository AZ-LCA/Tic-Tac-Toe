import game from './game.js';
import player from './player.js';

function init() {
    const myGame = new game();
    myGame.setUpGameGrid();
}

init();
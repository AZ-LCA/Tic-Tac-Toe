import game from './game.js';
import player from './player.js';

function init() {
    const playerOne = new player('X');
    const playerTwo = new player('O');
    const myGame = new game();
    myGame.setUpGameGrid();
}

init();
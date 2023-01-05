import player from "./player";

export default class game{
    constructor() {
        this.gameGrid;
        this.turnNumber = 1;
        this.playerOne = new player('X');
        this.playerTwo = new player('O');
    }
    setUpGameGrid() {
        const gridNodeList = document.querySelector('.grid_container').childNodes;
        const gameArray = []
        Array.from(gridNodeList).forEach((value, index) => {
            if (index%2 !== 0) {
                console.log('cp1');
                value.addEventListener('click', this.determinePlayerTurn());
                console.log('cp1');
                gameArray.push(value);
            }
        })
        console.log(gameArray);
    }
    determinePlayerTurn() {
        console.log('cp2');
        if (this.turnNumber % 2 !== 0) {
            console.log('cp3');
            console.log(playerOne);
            this.playerOne.startTurn();
            console.log('cp4');
            this.turnNumber += 1;
        } else if (this.turnNumber < 10) {
            this.playerTwo.startTurn();
            this.turnNumber += 1;
        } else {
            this.gameOver();
        }
    }
    gameOver() {
        console.log('gameover');
    }
}


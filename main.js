//import game from './game.js';
//import player from './player.js';

class game{
    constructor() {
        this.gameGrid;
        this.defaultGrid = document.importNode(document.querySelector('.grid_container'), true);
        this.turnNumber = 1;
        this.playerOne = new player('X', 'player one');
        this.playerTwo = new player('O', 'player Two');
        this.end = {
            end: false
        }
        console.log(this.defaultGrid);
    }
    linkGameGrid() {
        const gridNodeList = document.querySelector('.grid_container').childNodes;
        const gameArray = []
        Array.from(gridNodeList).forEach((value, index) => {
            if (index%2 !== 0) {
                value.addEventListener('click', (event) => {this.determinePlayerTurn(event, this.playerOne, this.playerTwo, this.gameGrid, this.end)});
                gameArray.push(value);
            }
        })
        this.gameGrid = gameArray;
        // this.defaultGrid = gameArray;
    }
    determinePlayerTurn(event, playerOne, playerTwo, gameGrid, end) {
        //playerOne and playerTwo stay as the same players - no new copies made
        if (end.end !== true) {
            let target = event.target;
            if (target.innerText === 'X' || target.innerText === 'O') {
                return;
            }
            if (this.turnNumber % 2 !== 0) {
                playerOne.startTurn(target);
                this.checkWin(playerOne, this.turnNumber, gameGrid, end);
            } else {
                playerTwo.startTurn(target);
                this.checkWin(playerTwo, this.turnNumber, gameGrid, end);
            }
            this.turnNumber += 1;
        }

    }
    checkWin(player, turnNumber, gameGrid, end) {
        //Check rows and Columns
        //setUp current row
        let whichOne = 'column';
        for (let rowOrColumn=0;rowOrColumn<2;rowOrColumn++) {
            if (rowOrColumn===0) {
                whichOne = 'row';
            } else {
                whichOne = 'column';
            }
            for (let rowColumnNum=0;rowColumnNum<3;rowColumnNum++) {
                //If all three are matching then call win and return
                const className = whichOne + `${rowColumnNum+1}`;
                const winNum = gameGrid.filter(rowColumn => rowColumn.classList.contains(className))
                .reduce((accumulator, rowColumnVal) => {
                    if (rowColumnVal.innerText === player.noughtsOrCrosses) {
                        return accumulator +=1;
                    } else {
                        return accumulator + 0;
                    }
                },0);
                if (winNum === 3) {
                    end.end = true;
                    this.gameOver(true, player);
                    return;
                }
            }
            if (gameGrid[0].innerText === gameGrid[4].innerText === gameGrid[8].innerText || gameGrid[2].innerText === gameGrid[4].innerText === gameGrid[6].innerText) {
                end.end = true;
                this.gameOver(true, player);
                return;
            }
        }
        if (turnNumber === 9) {
            end.end = true;
            this.gameOver(false, undefined);
            return;
        }

    }
    gameOver(win, player) {
        //Use a timeout so experience is not rushed
        if (win) {
            //Hide grid and show text saying /player/ won the game
            player.winCount+=1;
            console.log(`${player.playerName} wins!`);
        } else {
            //Hide grid and let players know that there is a draw
            console.log('Tie');
        }
        //invite the players to play again with a button under the text
        //Update win counter that will be added
        //Get a tag that will display whos turn it is
        //Underneath show button that takes the user to the (no way back) results page. They can see the final score there.
    }
}

class player {
    constructor(symbol, name) {
        this.playerName = name;
        this.noughtsOrCrosses = symbol;
        this.winCount = 0;
    }
    startTurn(target) {
        //Ensure the same square isnt clicked on multiple times
        target.innerText = this.noughtsOrCrosses;
        

    }
}

//Remember scope when using init() function
function init() {
    const myGame = new game();
    myGame.linkGameGrid();
}
init();


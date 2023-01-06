//import game from './game.js';
//import player from './player.js';

class game{
    constructor() {
        this.gameGrid;
        this.defaultGrid = document.importNode(document.querySelector('.grid_container'), true);
        this.turnNumber = 1;
        this.playerOne = new player('X', 'Player one');
        this.playerTwo = new player('O', 'Player two');
        this.play= {
            play: true
        }
        this.end = {
            end: false
        }
        this.playerTurn = document.querySelector('.player_turn');
        this.winRatio = document.querySelector('.win_count');
    }
    linkGameGrid() {
        this.turnNumber = 1;
        this.end.end = false;
        this.play.play = true;
        console.log('1');
        const gridNodeList = document.querySelector('.grid_container').childNodes;
        const gameArray = []
        console.log(gridNodeList);
        Array.from(gridNodeList).forEach((value, index) => {
            if (index%2 !== 0) {
                value.addEventListener('click', (event) => {this.determinePlayerTurn(event/*, this.playerOne, this.playerTwo, this.gameGrid, this.end, this.playerTurn, this.defaultGrid, this.play*/)});
                gameArray.push(value);
                console.log('3');
            }
        });
        console.log('4');
        this.playerTurn.innerText = `${this.playerOne.playerName}'s turn`;
        this.winRatio.innerText = `${this.playerOne.winCount}:${this.playerTwo.winCount}`;
        this.gameGrid = gameArray;
        // this.defaultGrid = gameArray;
    }
    determinePlayerTurn(event /*, playerOne, playerTwo, gameGrid, end, playerTurn, defaultGrid, play*/) {
        //playerOne and playerTwo stay as the same players - no new copies made
        if (this.end.end !== true) {
            let target = event.target;
            if (target.innerText === 'X' || target.innerText === 'O') {
                return;
            }
            if (this.turnNumber % 2 !== 0) {
                this.playerOne.startTurn(target, this.playerTwo, this.playerTurn);
                this.checkWin(this.playerOne, this.turnNumber);
            } else {
                this.playerTwo.startTurn(target, this.playerOne, this.playerTurn);
                this.checkWin(this.playerTwo, this.turnNumber);
            }
            this.turnNumber += 1;
        }
        this.winRatio.innerText = `${this.playerOne.winCount}:${this.playerTwo.winCount}`;
    }
    checkWin(player, turnNumber) {
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
                const winNum = this.gameGrid.filter(rowColumn => rowColumn.classList.contains(className))
                .reduce((accumulator, rowColumnVal) => {
                    if (rowColumnVal.innerText === player.noughtsOrCrosses) {
                        return accumulator +=1;
                    } else {
                        return accumulator + 0;
                    }
                },0);
                if (winNum === 3) {
                    this.end.end = true;
                    this.gameOver(true, player);
                    return;
                }
            }
            if (this.gameGrid[0].innerText === this.gameGrid[4].innerText === this.gameGrid[8].innerText || this.gameGrid[2].innerText === this.gameGrid[4].innerText === this.gameGrid[6].innerText) {
                this.end.end = true;
                this.gameOver(true, player);
                return;
            }
        }
        if (turnNumber === 9) {
            this.end.end = true;
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
        setTimeout(() => {
            const grid = document.querySelector('.grid_container')
            grid.innerHTML = '';
            const endMessage = document.createElement('div');
            endMessage.style.cssText =  `
            background-color: #000000;
            color: #ffffff;
            padding: 10px;
            margin-left: auto;
            margin-right: auto;
            margin-top: auto;
            margin-bottom: auto;
            border-radius:16px;
            aspect-ratio: 1;
            font-size: 64px;
            grid-row:  1;
            grid-column: 2;
            `;
            endMessage.innerText = `${player.playerName} wins!`;
            const body = document.querySelector('body');
            grid.appendChild(endMessage);
            const resetButton = document.createElement('button');
            resetButton.classList.add('reset_button');
            resetButton.innerText = `Reset grid? \n (play again)`;
            resetButton.style.cssText = `
            background-color: #000000;
            color: #ffffff;
            padding: 10px;
            margin-left: auto;
            margin-right: auto;
            margin-top: auto;
            margin-bottom: auto;
            border-radius:16px;
            aspect-ratio: 1;
            font-size: 64px;
            grid-row:  2;
            grid-column: 2;
            `;
            resetButton.addEventListener('click', () => {
                grid.remove();
                body.appendChild(this.defaultGrid);
                link();
            });
            grid.appendChild(resetButton);
            
        }, 3000);
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
    startTurn(target, player, playerTurn) {
        //Ensure the same square isnt clicked on multiple times
        target.innerText = this.noughtsOrCrosses;
        playerTurn.innerText = `${player.playerName}'s turn`;

    }
}

//Remember scope when using init() function

const myGame = new game();
function link() {
    myGame.linkGameGrid();
}
myGame.linkGameGrid();


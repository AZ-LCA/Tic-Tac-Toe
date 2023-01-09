class game {
    constructor() {
        this.grid;
        this.playerOne = new player('Player One', 'X');
        this.playerTwo = new player('Player Two', 'O');
        this.gameInfo = {
            playerTurn: document.querySelector(`.player_turn`),
            winCount: document.querySelector(`.win_count`)
        }
        this.turns = 1;
    }
    setUpBoard() {
        this.gameInfo.playerTurn.innerText = `Turn: ${this.playerOne.name}`;
        this.gameInfo.winCount.innerText = `Player One: ${this.playerOne.wins} | Player Two: ${this.playerTwo.wins}`;
        this.grid = document.querySelector('.grid_container');
        for (let rows=1;rows<4;rows++) {
            for (let columns=1;columns<4;columns++) {
                const cell = document.createElement(`div`);
                cell.classList.add(`row${rows}`);
                cell.classList.add(`column${columns}`);
                cell.classList.add(`grid_cell`);
                cell.addEventListener(`click`, () => {this.getPlayerTurn(event)});
                this.grid.appendChild(cell);
            }
        }
    }
    getPlayerTurn(event) {
        const initialTargetValue = event.target.innerText;
        if (`Turn: ${this.playerOne.name}` === this.gameInfo.playerTurn.innerText) {
            this.playerOne.turn(event);
            const targetValue = event.target.innerText;
            if (initialTargetValue !== targetValue) {
                this.gameInfo.playerTurn.innerText = `Turn: Player Two`;
            }
        } else {
            this.playerTwo.turn(event);
            const targetValue = event.target.innerText;
            if (initialTargetValue !== targetValue) {
                this.gameInfo.playerTurn.innerText = `Turn: Player One`;
            }

        }
        const isGameOver = this.gameOver();
        if (isGameOver !== true) {
            this.turns += 1;
        } else {
            this.endScreen();
        }
    }
    gameOver() {
        let columnsRows = ['column', 'row'];
        const cells = Array.from(this.grid.childNodes)
        for (let i=0;i<2;i++) {
            for (let j=1;j<4;j++) {
                const getGroup = cells.filter(columnOrRow => columnOrRow.classList.contains(`${columnsRows[i]}${j}`));
                if (getGroup[0].innerText === getGroup[1].innerText && getGroup[1].innerText === getGroup[2].innerText && getGroup[0].innerText !== '') {
                    if (this.turns % 2 !== 0) {
                        this.winner(this.playerOne);
                        return true;
                    } else {
                        this.winner(this.playerTwo);
                        return true;
                    }
                }
            }
        }
        if ((cells[0].innerText === cells[4].innerText && cells[8].innerText === cells[4].innerText && cells[4].innerText !== '') || (cells[2].innerText === cells[4].innerText && cells[6].innerText === cells[4].innerText && cells[4].innerText !== '')) {
            if (this.turns % 2 !== 0) {
                this.winner(this.playerOne);
                return true;
            } else {
                this.winner(this.playerTwo);
                return true;
            }
        } else if(this.turns === 9) {
            this.tie()
            return true;
        }
    }
    winner(player) {
        this.grid.innerHTML = '';
        const winMessage = document.createElement(`div`);
        winMessage.classList.add(`win_message`);
        winMessage.innerText = `${player.name} wins!`;
        this.grid.appendChild(winMessage);
        player.wins += 1;
        this.gameInfo.winCount.innerText = `Player One: ${this.playerOne.wins} | Player Two: ${this.playerTwo.wins}`;


    }
    tie() {

        this.grid.innerHTML = '';
        const tieMessage = document.createElement(`div`);
        tieMessage.classList.add(`tie_message`);
        tieMessage.innerText = `It's a tie!`;
        this.grid.appendChild(tieMessage);
    }
    endScreen() {
        setTimeout(() => {
            this.grid.innerHTML = '';
            const playAgain = document.createElement(`button`);
            playAgain.classList.add(`play_again_button`);
            playAgain.innerText = `Play again`;
            playAgain.addEventListener(`click`, () => this.newGame(this.grid));
            const end = document.createElement(`button`);
            end.classList.add(`end_button`);
            end.innerText = `End game`;
            end.addEventListener(`click`, () => this.endSession(this.grid));
            this.grid.appendChild(playAgain);
            this.grid.appendChild(end);
            this.gameInfo.playerTurn.innerText = '';
        }, 5000)
    }
    newGame(grid) {
        this.turns = 1;
        grid.innerHTML = '';
        this.setUpBoard()
    }
    endSession(grid) {
        grid.innerHTML = '';
        const thankYou = document.createElement('div');
        thankYou.classList.add(`thanks_message`);
        thankYou.innerText = `Thanks for playing!`;
        grid.appendChild(thankYou);
    }
}
class player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.wins = 0;
    }
    turn(event) {
        if (event.target.innerText === '') {
            event.target.innerText = this.symbol;
        }
    }
}
//I want to prepend both the playerturn and the winratio
//Need to add an event listener to each cell with player + turnNumb info

const myGame = new game();
myGame.setUpBoard();
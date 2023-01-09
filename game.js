class game {
    constructor() {
        this.grid;
        this.playerOne = new player('Player One', 'X');
        this.playerTwo = new player('Player Two', 'O');
        this.ongoing = {
            currentGame: true,
            playSession: true
        }
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
        if (!isGameOver) {
            this.turns += 1;
        }
    }
    gameOver() {
        let columnsRows = ['column', 'row'];
        const cells = Array.from(this.grid.childNodes)
        for (let i=0;i<2;i++) {
            for (let j=1;j<4;j++) {
                const getGroup = cells.filter(columnOrRow => columnOrRow.classList.contains(`${columnsRows[i]}${j}`));
                console.log(getGroup[0], getGroup[1], getGroup[2]);
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
        console.log(`${player.name} wins!`);
    }
    tie() {
        console.log(`Tie`);
    }
    endScreen() {
        console.log('EndScreen');
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
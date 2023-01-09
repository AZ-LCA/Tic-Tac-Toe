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
        this.turns += 1;
        //this.gameOver();
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
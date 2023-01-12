class game {
    constructor() {
        //An empty grid
        this.grid;
        //Creating two instances of the player class
        console.log(this.playerOne);
        if (localStorage.p1Name !== null) {
            this.playerOne = new player(localStorage.getItem('p1Name'), localStorage.getItem('p1Symbol'));//new player('Player One', 'X');
            this.playerTwo = new player(localStorage.getItem('p2Name'), localStorage.getItem('p2Symbol'));//new player('Player Two', 'O');
        }
        //Creating a gameInfo object which contains variables that represent the messages visible on the game page
        this.gameInfo = {
            playerTurn: document.querySelector(`.player_turn`),
            winCount: document.querySelector(`.win_count`),
            gameOngoing: true,
            // ai: false
        }
        //Setting number of turns to one
        this.turns = 1;
    }
    inputScreenPlayers() {
        // Creates an input screen if players haven't been defined yet (no local storage)
        if (this.playerOne.name === null) {
            //I set up the grid cells and populate them with inputs that have placeholders that describe what the  boxes are used for
            const p1NameContainer = document.createElement('div');
            p1NameContainer.classList.add('player_one_name');
            const p1Name = document.createElement('input');
            p1Name.maxLength = '30';
            p1Name.placeholder = 'Player One Name';
            p1NameContainer.appendChild(p1Name);
            const p1SymbolContainer = document.createElement('div');
            p1SymbolContainer.classList.add('player_one_symbol');
            const p1Symbol = document.createElement('input');
            p1Symbol.maxLength = '1';
            p1Symbol.placeholder = 'Player One Symbol';
            p1SymbolContainer.appendChild(p1Symbol);
            document.querySelector('.grid_container').appendChild(p1NameContainer);
            document.querySelector('.grid_container').appendChild(p1SymbolContainer);
            const p2NameContainer = document.createElement('div');
            p2NameContainer.classList.add('player_two_name');
            const p2Name = document.createElement('input');
            p2Name.placeholder = 'Player Two Name';
            p2Name.maxLength = '30';
            p2NameContainer.appendChild(p2Name);
            const p2SymbolContainer = document.createElement('div');
            p2SymbolContainer.classList.add('player_two_symbol');
            const p2Symbol = document.createElement('input');
            p2Symbol.maxLength = '1';
            p2Symbol.placeholder = 'Player Two Symbol';
            p2SymbolContainer.appendChild(p2Symbol);
            document.querySelector('.grid_container').appendChild(p2NameContainer);
            document.querySelector('.grid_container').appendChild(p2SymbolContainer);
            //Making a checkbox to determine if this is an AI opponent
            // const checkboxCell = document.createElement('div');
            // checkboxCell.classList.add('ai_checkbox');
            // const checkbox = document.createElement('input');
            // checkbox.setAttribute(`type`, `checkbox`);
            // const checkboxlabel = document.createElement('label');
            // checkboxlabel.innerText = 'AI opponent';
            // checkboxCell.appendChild(checkboxlabel);
            // checkboxlabel.appendChild(checkbox);
            // document.querySelector('.grid_container').appendChild(checkboxCell);
            //I made a button to finalise the creation
            const createCharacters = document.createElement('button');
            createCharacters.classList.add('new_session_button');
            createCharacters.innerText = 'Create';
            createCharacters.addEventListener('click', () => {this.makePlayers(p1Name.value, p1Symbol.value, p2Name.value, p2Symbol.value)});/*, checkbox.value*/
            document.querySelector('.grid_container').appendChild(createCharacters);
        } else {
            //If players are defined then skip
            this.setUpBoard();
        }
    }
    makePlayers(p1name, p1symbol, p2name, p2symbol) {
        /*, checkbox*/
        //I do input checks here
        if (p1name === '') {
            p1name = 'Player One';
        }
        if (p1symbol === '') {
            p1symbol = 'X';
        }
        if (p2name === '') {
            p2name = 'Player Two';
        }
        if (p2symbol === '') {
            p2symbol = 'O';
        }
        if (p1name === p2name) {
            p1name = `${p1name} (Player One)`;
            p2name = `${p2name} (Player Two)`;
        }
        if (p1symbol === p2symbol) {
            p1symbol = `${p1symbol}1`;
            p2symbol = `${p2symbol}2`;
        }
        // if (checkbox === 'on') {
        //     this.gameInfo.ai = true;
        // }
        //I set my values in local storage for reference
        document.querySelector('.grid_container').innerHTML = '';
        // localStorage.setItem('ai',JSON.stringify(this.gameInfo.ai));
        localStorage.setItem('p1Name',p1name);
        localStorage.setItem('p1Symbol',p1symbol);
        localStorage.setItem('p2Name',p2name);
        localStorage.setItem('p2Symbol',p2symbol);
        //I assign the values to the players and call the setUp function
        this.playerOne = new player(p1name, p1symbol);
        this.playerTwo = new player(p2name, p2symbol);
        this.setUpBoard();
        const sfx = new Audio(`SFX/Game-SFX/mixkit-positive-interface-beep-221.wav`);
        sfx.play();
    }
    checkLoad() {
        //This will run each time the board is set up
        //It only runs if a game is in progress and a session has not been ended
        try {
            //I check to make sure a game is ongoing and only load turns and game position if the value is true
            if (JSON.parse(window.localStorage.getItem('gameOngoing')) === true) {
                const cells = JSON.parse(localStorage.getItem('cells'));
                this.gameInfo.playerTurn.innerText = localStorage.getItem('playerTurn');
                this.turns =JSON.parse(localStorage.getItem('turns'));
                Array.from(this.grid.childNodes).forEach((node, index) => {
                    node.innerText = cells[index];
                });
            }
            //Then I load the rest of the stored information regardless
            //this.gameInfo.ai = JSON.parse(localStorage.getItem('ai'));
            this.playerOne.wins = JSON.parse(localStorage.getItem('oneWins'));
            this.playerTwo.wins = JSON.parse(localStorage.getItem('twoWins'));
            //This finds which player's turn it is
            if (this.turns % 2 !== 0) {
                this.gameInfo.playerTurn.innerText = `Turn: ${this.playerOne.name}`;
            } else {
                this.gameInfo.playerTurn.innerText = `Turn: ${this.playerTwo.name}`;
            }
            //This corrects null values to zero values
            if (this.playerOne.wins === null) {
                this.playerOne.wins = 0;
            }
            if (this.playerTwo.wins === null) {
                this.playerTwo.wins = 0;
            }
            //This refreshes the wincount to accurately reflect the status of the loaded game
            this.gameInfo.winCount.innerText = `${this.playerOne.name}: ${this.playerOne.wins} | ${this.playerTwo.name}: ${this.playerTwo.wins}`;

        } catch(err) {
            //If there is an error then I get an error message
            //I used this during testing
            console.log(err.message);
        }
    }
    setUpBoard() {
        //This function sets up the board
        //First I set the game info to display which player's turn it is and the overall score
        this.gameInfo.playerTurn.innerText = `Turn: ${this.playerOne.name}`;
        this.gameInfo.winCount.innerText = `${this.playerOne.name}: ${this.playerOne.wins} | ${this.playerTwo.name}: ${this.playerTwo.wins}`;
        //I set grid to the container I set up in my html file
        this.grid = document.querySelector('.grid_container');
        //I populate the grid here, adding appropriate tags as I go (using the for loops)
        for (let rows=1;rows<4;rows++) {
            for (let columns=1;columns<4;columns++) {
                const cell = document.createElement(`div`);
                cell.classList.add(`row${rows}`);
                cell.classList.add(`column${columns}`);
                cell.classList.add(`grid_cell`);
                //I add an event listener that gives players to oppurtunity to make moves
                cell.addEventListener(`click`, () => {this.getPlayerTurn(event)});
                //Then I append the cell to the grid
                this.grid.appendChild(cell);
            }
        }
        this.checkLoad();
    }
    getPlayerTurn(event) {
        //I get the initial value of the target
        const initialTargetValue = event.target.innerText;
        //I check which player's turn it is
        if (`Turn: ${this.playerOne.name}` === this.gameInfo.playerTurn.innerText) {
            //I call player one's turn method
            this.playerOne.turn(event);
            //I get the new value of the target cell
            const targetValue = event.target.innerText;
            //If the player has been allowed to change the contents of the target cell, advance to the next go. Otherwise, the player takes their go again
            if (initialTargetValue !== targetValue) {
                this.gameInfo.playerTurn.innerText = `Turn: ${this.playerTwo.name}`;
            }
            // if (this.gameInfo.ai === true) {
            //     this.playerTwo.aiTurn(event, this.grid);
            //     this.gameInfo.playerTurn.innerText = `Turn: ${this.playerOne.name}`;
            // }
        } else if (`Turn: ${this.playerTwo.name}` === this.gameInfo.playerTurn.innerText) {
            this.playerTwo.turn(event);
            const targetValue = event.target.innerText;
            if (initialTargetValue !== targetValue) {
                this.gameInfo.playerTurn.innerText = `Turn: ${this.playerOne.name}`;
            }

        }
        //I check fro gameOver conditions
        const isGameOver = this.gameOver();
        //If the game is not over then add a turn and continue on as normal
        if (isGameOver !== true) {
            this.turns += 1;
            const cells = Array.from(this.grid.childNodes).map(node => {
                return node.innerText;
            });
            window.localStorage.setItem('cells', JSON.stringify(cells));
            window.localStorage.setItem('turns', JSON.stringify(this.turns));
            window.localStorage.setItem('oneWins', JSON.stringify(this.playerOne.wins));
            window.localStorage.setItem('twoWins', JSON.stringify(this.playerTwo.wins));
            window.localStorage.setItem('playerTurn', this.gameInfo.playerTurn.innerText);
            window.localStorage.setItem('gameOngoing', JSON.stringify(this.gameInfo.gameOngoing));
            // console.log(localStorage.getItem('grid'));
            // console.log(this.grid);
        } else {
            //Otherwise, go to the endscreen method
            this.gameInfo.gameOngoing = false;
            window.localStorage.setItem('gameOngoing', JSON.stringify(this.gameInfo.gameOngoing));
            window.localStorage.setItem('oneWins', JSON.stringify(this.playerOne.wins));
            window.localStorage.setItem('twoWins', JSON.stringify(this.playerTwo.wins));
            this.endScreen();
        }
    }
    //This function checks for all conditions that can cause a game over
    gameOver() {
        //I set up an array that I will use in conjunction with my array methods
        let columnsRows = ['column', 'row'];
        //I set a constant to be a list of all of the grid's cells
        const cells = Array.from(this.grid.childNodes);
        //I iterate this for loop twixe, first to go through columns and second to go through rows
        for (let i=0;i<2;i++) {
            //Now I set j=1 to that I do not need to worry about manipulating the value of j when using it. j<4 so that the loop iterates three times
            for (let j=1;j<4;j++) {
                //Each iteration I filter the cells list to get a specific row or column
                const getGroup = cells.filter(columnOrRow => columnOrRow.classList.contains(`${columnsRows[i]}${j}`));
                //I check if the column or row contains only X or O
                if (getGroup[0].innerText === getGroup[1].innerText && getGroup[1].innerText === getGroup[2].innerText && getGroup[0].innerText !== '') {
                    //Then I check for the player that won using the number of turns that have occured thusfar
                    //Then a player specific method called winner is called
                    //after the function runs, I exit the function
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
        //This checks the diagonals for a win and then uses turns to determine a player
        if ((cells[0].innerText === cells[4].innerText && cells[8].innerText === cells[4].innerText && cells[4].innerText !== '') || (cells[2].innerText === cells[4].innerText && cells[6].innerText === cells[4].innerText && cells[4].innerText !== '')) {
            if (this.turns % 2 !== 0) {
                this.winner(this.playerOne);
                return true;
            } else {
                this.winner(this.playerTwo);
                return true;
            }
        } else if(this.turns === 9) {
            //This checks the number of turns to determine if the game has resulted in a tie
            //If so it launches a tie method
            this.tie()
            return true;
        }
    }
    winner(player) {
        //This gets rid of all the childnodes in grid
        this.grid.innerHTML = '';
        //I create a new div for the win message and set it up
        const winMessage = document.createElement(`div`);
        winMessage.classList.add(`win_message`);
        winMessage.innerText = `${player.name} wins!`;
        //I append it to the grid
        this.grid.appendChild(winMessage);
        //I increment the winner's number of wins and update the gameinfo
        player.wins += 1;
        this.gameInfo.winCount.innerText = `${this.playerOne.name}: ${this.playerOne.wins} | ${this.playerTwo.name}: ${this.playerTwo.wins}`;
        //Getting an sfx from a filepath in the project and playing it
        const sfx = new Audio(`SFX/End-SFX/SFX1.wav`);
        sfx.play();
    }
    tie() {
        //Same as wins, but a different message and I do not update the gameinfo
        this.grid.innerHTML = '';
        const tieMessage = document.createElement(`div`);
        tieMessage.classList.add(`tie_message`);
        tieMessage.innerText = `It's a tie!`;
        this.grid.appendChild(tieMessage);
        //Getting an sfx from a filepath in the project and playing it
        const sfx = new Audio(`SFX/End-SFX/SFX1.wav`);
        sfx.play();
    }
    endScreen() {
        //I set a timeout to allow players to read the win or tie message
        setTimeout(() => {
            //I empty the grid html again
            this.grid.innerHTML = '';
            //I set up two new buttons and add event listeners
            const playAgain = document.createElement(`button`);
            playAgain.classList.add(`play_again_button`);
            playAgain.innerText = `Play again`;
            playAgain.addEventListener(`click`, () => this.newGame(this.grid));
            const end = document.createElement(`button`);
            end.classList.add(`end_button`);
            end.innerText = `End game`;
            end.addEventListener(`click`, () => this.endSession(this.grid));
            //I append them to the grid
            this.grid.appendChild(playAgain);
            this.grid.appendChild(end);
        }, 5000)
    }
    newGame(grid) {
        //This function resets some values not covered by the setUpBoard method and then calls it, for a fresh game (retaining the number of wins)
        this.turns = 1;
        grid.innerHTML = '';
        this.setUpBoard();
        const sfx = new Audio(`SFX/Game-SFX/mixkit-arcade-game-jump-coin-216.wav`);
        sfx.play();
    }
    endSession(grid) {
        //Empties the grid and adds a thanks message - this is the final tab as the player ends their session
        localStorage.clear();
        this.playerOne = undefined;
        this.playerTwo = undefined;
        grid.innerHTML = '';
        const thankYou = document.createElement('div');
        thankYou.classList.add(`thanks_message`);
        thankYou.innerText = `Thanks for playing!`;
        grid.appendChild(thankYou);
        //User can start fresh by clicking this button
        const newSession = document.createElement('button');
        newSession.classList.add(`new_session_button`);
        newSession.innerHTML = `<a class = 'link_container' target = '_self'>Start new session</a>`;
        newSession.addEventListener('click', this.playAudioMove);
        grid.appendChild(newSession);
        //I get rid of the playerturn gameinfo as it is irrelevant now
        this.gameInfo.playerTurn.innerText = '';
        const sfx = new Audio(`SFX/Game-SFX/mixkit-arcade-game-jump-coin-216.wav`);
        sfx.play();
    }
    playAudioMove() {
        const sfx = new Audio(`SFX/Game-SFX/mixkit-positive-interface-beep-221.wav`);
        sfx.play();
        window.open('game.html', '_self');
    }
}
class player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.wins = 0;
        //this.score = 0;
    }
    turn(event) {
        if (event.target.innerText === '') {
            //Setting the target cell to be the player's associated symbol
            event.target.innerText = this.symbol;
            //Getting an sfx from a filepath in the project and playing it
            const sfx = new Audio(`SFX/Game-SFX/SFX1.wav`);
            sfx.play();
        }
    }
    // aiTurn(event,grid) {
    //     localStorage.setItem('score', JSON.stringify(this.score));
    //     const cells = Array.from(grid.childNodes).map(node => {
    //        cells.push(node.innerText); 
    //     })
    //     const winningIndex = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    // }
}

let myGame = new game();
myGame.inputScreenPlayers();
//Plan for tomorrow - give players the ability to customise their own characters - this can be done before the playing grid is made

//I will be giving players the opportunity to create their own names and symbols (will need to update local storage to include the player names and symbols)
# Tic-Tac-Toe

## User Stories

- As a user, I should be able to start a new tic tac toe game
- As a user, I should be able to click on a square to add X first and then O, and so on
- As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next
- As a user, I should not be able to click the same square twice
- As a user, I should be shown a message when I win, lose or tie
- As a user, I should not be able to continue playing once I win, lose, or tie
- As a user, I should be able to play the game again without refreshing the page

## Planning

### Making a start page

- In order to give the user the option to start their own tic-tac-toe game I decided to make a homepage
- Used another grid as the formatting is simple enough
- Used the aspect-ratio and calc() for first time - documentation below
### Setting up my board

- I decided on a css grid as tic-tac-toe is played in a grid
- To make the board look like a tic-tac-toe board, I used aspect-ratio, which made my grid components into squares
- In addition I changed the border colors of all the edges to be white
- to stop the grid from overflowing I set max-width to 100vh

### Dealing with scope

- I decided to put all of my classes back into one javascript docs to make it easier to work with
- I realised that my issue was with scope - more specifically, my init() function. I solved the porblem by creating chains of parameters that pass through to each functino they are needed in

### Making player turns

- To make player turns, I made use of two functions - a determine playerturn function, and a startTurn function. The determine player function method would calculate which player was next by using the turn number. Then the player's turn would start as the startFunction gets called. They  could then click a specific grid part and it would update to include the player's symbol


### Checking win conditions

- To check win condiitons, I called a function each turn, called checkWin(), that would check for gameOver conditions. If any get found, the gameover() function gets called.
- I found out that whilst variable parameters cannot be changed in functions, parameters that are objects can have their properties changed - so I made an object and changed its property to stop the game from continuing

- As of Morning Fri 6 Jan it only outputs values to the console and increments player wincounts. I have made a logic plan that I will paste in below

```js
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
```
## Technical documents used
https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio - for aspect-ratio
https://developer.mozilla.org/en-US/docs/Web/CSS/calc - for calc()
https://www.quirksmode.org/css/units-values/viewport.html - view width and height (vw,vh)
https://flaviocopes.com/fix-import-call-expects-one-argument/ - help with modules
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import - help with import

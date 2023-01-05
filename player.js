export default class player {
    constructor(symbol) {
        this.noughtsOrCrosses = symbol;
    }
    startTurn() {
        console.log(this.noughtsOrCrosses);
    }
}
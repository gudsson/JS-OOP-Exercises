/////////////////////////////////
// Object-Oriented Tic-Tac-Toe //
/////////////////////////////////

const readline = require('readline-sync');

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
}

class Board {
  constructor() {
    this.squares = {};

    for (let idx = 1; idx <= 9; idx++) {
      this.squares[idx] = new Square();
    }
  }

  displayWithClear(scoreline = '') {
    console.clear();
    console.log("");
    console.log("");
    this.displayMatch(scoreline);
  }

  displayMatch(scoreline = '') {
    console.log(scoreline);
    console.log(``);
    console.log(`     |     |`);
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log(`     |     |`);
    console.log(`-----+-----+-----`);
    console.log(`     |     |`);
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log(`     |     |`);
    console.log(`-----+-----+-----`);
    console.log(`     |     |`);
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log(`     |     |`);
    console.log(``);
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  isEmpty() {
    return this.unusedSquares().length === 9;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.wins = 0;
  }

  getMarker() {
    return this.marker;
  }

  incrementWins() {
    this.wins += 1;
  }

  getScore() {
    return this.wins;
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class TTTGame {
  static WINS_THRESHOLD = 3;
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  playMatch() {
    this.displayWelcomeMessage();

    while (true) {
      this.playIndividualGame();
      if (this.someoneWonMatch()) break;
      if (!this.playAgain()) break;
    }

    this.displayMatchResults();
    this.displayGoodbyeMessage();
  }

  playIndividualGame() {
    this.resetGame();
    while (true) {

      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear(this.getScoreline());
    }

    this.updateScore();
    this.board.displayWithClear(this.getScoreline());
    this.displayGameResults();
  }

  playAgain() {
    let answer;

    while (true) {
      console.log("Would you like to play again? ('y' or 'n')");
      answer = readline.question("=> ").toLowerCase();

      if (['y', 'n'].includes(answer)) break;

      console.log('\nSorry, invalid choice');
    }

    return answer === 'y';
  }

  resetGame() {
    if (this.board.isEmpty()) {
      this.board.displayMatch(this.getScoreline());
    } else {
      this.board = new Board();
      this.board.displayWithClear(this.getScoreline());
    }
  }

  isFirstMatch() {
    return this.board.unusedSquares().length === 9;
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }

  joinOr(choices, separator = ', ', outro = 'or') {
    if (choices.length === 1) return choices.toString();
    return `${choices.slice(0, -1).join(separator)} ${outro} ${choices.slice(-1)}`;
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      choice = readline.question(`Choose a square (${this.joinOr(validChoices)}): `);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice = this.computerOffensiveMove() || this.computerDefensiveMove();

    if (!choice) {
      choice = this.pickMiddleSquare();
    }

    if (!choice) {
      choice = this.pickSquareAtRandom();
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  pickMiddleSquare() {
    return this.board.isUnusedSquare("5") ? "5" : null;
  }

  pickSquareAtRandom() {
    let choice;
    let validChoices = this.board.unusedSquares();

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    return choice;
  }

  computerOffensiveMove() {
    return this.getAtRiskSquare(this.computer);
  }

  computerDefensiveMove() {
    return this.getAtRiskSquare(this.human);
  }

  getAtRiskSquare(offensivePlayer) {
    let row = this.getAtRiskRow(offensivePlayer);
    if (row) {
      let squareToDefend = row.find(square => {
        return this.board.isUnusedSquare(square);
      });
      return squareToDefend;
    }

    return null;
  }

  getAtRiskRow(offensivePlayer) {
    let rows = TTTGame.POSSIBLE_WINNING_ROWS;
    for (let idx = 0; idx < rows.length; idx++) {
      if (this.board.countMarkersFor(offensivePlayer, rows[idx]) === 2 &&
        rows[idx].some(square => this.board.isUnusedSquare(square))) {
        let rowToCheck = rows[idx];
        return rowToCheck;
      }
    }
    return null;
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  displayGameResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!\n");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!\n");
    } else {
      console.log("A tie game. How boring.\n");
    }
  }

  updateScore() {
    if (this.isWinner(this.human)) {
      this.human.incrementWins();
    } else if (this.isWinner(this.computer)) {
      this.computer.incrementWins();
    }
  }

  displayMatchResults() {
    if (this.human.getScore() === TTTGame.WINS_THRESHOLD) {
      console.log(`Congratulations!  You won this match`
      + ` ${this.human.getScore()} games to ${this.computer.getScore()}.`);
    } else {
      console.log(`Oh dear.  The computer won this match`
      + ` ${this.computer.getScore()} games to ${this.human.getScore()}.`);
    }
  }

  displayGoodbyeMessage() {
    console.log("\nThanks for playing Tic Tac Toe!  Goodbye!");
  }

  getScoreline() {
    return `First to ${TTTGame.WINS_THRESHOLD} wins!\nCurrent Score: `
    + `Player ${this.human.getScore()} vs. Computer ${this.computer.getScore()}\n`;
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  someoneWonMatch() {
    let maxScore = Math.max(this.human.getScore(), this.computer.getScore());
    return maxScore === TTTGame.WINS_THRESHOLD;
  }
}

let game = new TTTGame();
game.playMatch();
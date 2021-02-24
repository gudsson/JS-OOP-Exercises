/////////////////////////////////
// Object-Oriented Tic-Tac-Toe //
/////////////////////////////////

// Textual description of the game.

// - Tic Tac Toe is a 2-player board game.
// - The board is a 3x3 grid.
// - Players take turns marking a square with a marker that identifies the
//   player.
// - Traditionally, the player to go first uses the marker X to mark her
//   squares, and the player to go second uses the marker O.
// - The first player to mark 3 squares in a row with her marker wins the game.
// - A row can be a horizontal row, a vertical column, or either of the two
//   diagonals (top-left to bottom-right and top-right to bottom-left).
// - There is one human player and one computer player.
// - The human player always moves (places a marker) first in the initial
//   version of our game; you can change that later.

// Game (n)
// Board (n)
// Row (n)
// Square (n)
// Marker (n)
// Player (n)
// - Mark (v)
// - Play (v)
// Human (n)
// Computer (n)

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

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }

  display() {
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
  }

  getMarker() {
    return this.marker;
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

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.playGame();
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  }

  playGame() {
    this.resetGame();
    while (true) {

      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }

    this.board.displayWithClear();
    this.displayResults();
  }

  playAgain() {
    let answer;

    while (true) {
      console.log("\nWould you like to play again? ('y' or 'n')");
      answer = readline.question("=> ").toLowerCase();

      if (['y', 'n'].includes(answer)) break;

      console.log('Sorry, invalid choice');
    }

    return answer === 'y';
  }

  resetGame() {
    let isFirstMatch = (this.board.unusedSquares().length === 9);
    if (isFirstMatch) {
      this.board.display();
    } else {
      this.board = new Board();
      this.board.displayWithClear();
    }
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
    // console.log('at risk square: ' + choice);
    // console.log('AI: ' + choice);
    // let pause = readline.question();

    if (!choice) {
      choice = this.pickMiddleSquare();
      // console.log('Middle: ' + choice);
      // let pause = readline.question();
    }

    if (!choice) {
      choice = this.pickSquareAtRandom();
      // console.log('Random: ' + choice);
      // let pause = readline.question();
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
    return this.getAtRiskSquare(this.computer, this.human);
  }

  computerDefensiveMove() {
    return this.getAtRiskSquare(this.human, this.computer);
  }

  getAtRiskSquare(offensivePlayer, defensivePlayer) {
    let row = this.getAtRiskRow(offensivePlayer, defensivePlayer);
    if (row) {
      let squareToDefend = row.find(square => {
        return this.board.isUnusedSquare(square);
      });
      return squareToDefend;
    }

    return null;
  }

  getAtRiskRow(offensivePlayer, defensivePlayer) {
    let rows = TTTGame.POSSIBLE_WINNING_ROWS;
    for (let idx = 0; idx < rows.length; idx++) {
      if (this.board.countMarkersFor(offensivePlayer, rows[idx]) === 2 &&
      this.board.countMarkersFor(defensivePlayer, rows[idx]) === 0) {
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

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  }

  displayGoodbyeMessage() {
    console.log("\nThanks for playing Tic Tac Toe!  Goodbye!");
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }
}

let game = new TTTGame();
game.play();
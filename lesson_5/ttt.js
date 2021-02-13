// textual description of the game.

// - Tic Tac Toe is a 2-player board game.
// - The board is a 3x3 grid.
// - Players take turns marking a square with a marker
//   that identifies the player.
// - Traditionally, the player to go first uses the marker
//   X to mark her squares, and the player to go second uses
//   the marker O.
// - The first player to mark 3 squares in a row with
//   her marker wins the game.
// - A row can be a horizontal row, a vertical column,
//   or either of the two diagonals (top-left to bottom-right
//   and top-right to bottom-left).
// - There is one human player and one computer player.
// - The human player always moves (places a marker) first
//   in the initial version of our game; you can change that later.

// Game (n)
// Board (n)
// Row (n)
// Square (n)
// Marker (n)
// Player (n)
//    Mark (v)
//    Play (v)
//    Human (n)
//    Computer (n)
class Square {
  // static UNUSED_SQUARE = " ";
  // static HUMAN_MARKER = "X";
  // static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }
}

Square.UNUSED_SQUARE = " ";
Square.HUMAN_MARKER = "X";
Square.COMPUTER_MARKER = "O";

class Board {
  constructor() {
    //STUB - we'll talk about stubs a bit later
    // We need a way to model the 3x3 grid. Perhaps "squares"?
    // What data structure should we use? An Array? An Object? Something else?
    // What should the data structure store? Strings? Numbers? Square objects?
    this.squares = {};

    for (let idx = 1; idx <= 9; idx++) {
      this.squares[idx] = new Square();
    }
    //   1: new Square(),
    //   2: new Square(),
    //   3: new Square(),
    //   4: new Square("X"),
    //   5: new Square(),
    //   6: new Square("O"),
    //   7: new Square(),
    //   8: new Square(),
    //   9: new Square(),
    // };
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares[1]}  |  ${this.squares[2]}  |  ${this.squares[3]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares[4]}  |  ${this.squares[5]}  |  ${this.squares[6]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares[7]}  |  ${this.squares[8]}  |  ${this.squares[9]}`);
    console.log("     |     |");
    console.log("");
  }
}

class Row {
  constructor() {
    //STUB
    // We need some way to identify a row of 3 squares
  }
}

class Marker {
  constructor() {
    //STUB
    // A marker is something that represents a player's "piece" on the board.
  }
}

class Player {
  constructor() {
    //STUB
    // maybe a "marker" to keep track of this player's symbol (i.e., 'X' or 'O')
  }

  mark() {
    //STUB
    // We need a way to mark the board with this player's marker.
    // How do we access the board?
  }

  play() {
    //STUB
    // We need a way for each player to play the game.
    // Do we need access to the board?
  }
}

class Human extends Player {
  constructor() {
    //STUB
  }
}

class Computer extends Player {
  constructor() {
    //STUB
  }
}

class TTTGame {
  constructor() {
    this.board = new Board();
  }

  play() {
    //SPIKE
    this.displayWelcomeMessage();

    while (true) {
      this.board.display();

      this.firstPlayerMoves();
      if (this.gameOver()) break;

      this.secondPlayerMoves();
      if (this.gameOver()) break;
      break; // <= execute loop only once for now
    }

    this.displayResults();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.log("Welcome to Tic Tac Toe!");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    //STUB
    // show the results of this game (win, lose, tie)
  }

  firstPlayerMoves() {
    //STUB
    // the first player makes a move
  }

  secondPlayerMoves() {
    //STUB
    // the second player makes a move
  }

  gameOver() {
    //STUB
    return false;
  }
}

let game = new TTTGame();
game.play();
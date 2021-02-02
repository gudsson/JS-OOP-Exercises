/////////////////////////////////////////
// Object-Oriented Rock-Paper-Scissors //
/////////////////////////////////////////

// RPS is a two-player game where each player chooses one of three possible
// moves: rock, paper, or scissors. The winner is chosen by comparing their
// moves with the following rules:

// Rock crushes scissors, i.e., rock wins against scissors.
// Scissors cuts paper, i.e., scissors beats paper.
// Paper wraps rock, i.e., paper beats rock.
// If the players chose the same move, the game is a tie.

// Nouns: player, move, rule
// Verbs: choose, compare

function createPlayer() {
  return {
    // possible state: player name?
    // possible state: player's current move?

    choose() {
      // not yet implemented
    },
  };
}

function createMove() {
  return {
    // possible state: type of move (paper, rock, scissors)
  };
}

function createRule() {
  return {
    // possible state? not clear whether Rules need state
  };
}

// Since we don't yet know where to put `compare`, let's define
// it as an ordinary function.
let compare = function(move1, move2) {
  // not yet implemented
};

const RPSGame = {
  human: createPlayer(),
  computer: createPlayer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  play() {
    displayWelcomeMessage();
    this.human.choose();
    this.computer.choose();
    displayWinner();
    displayGoodbyeMessage();
  },
};

RPSGame.play();
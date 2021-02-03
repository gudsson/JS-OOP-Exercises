/* eslint-disable max-lines-per-function */
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

const readline = require('readline-sync');
const MIN_MATCH_LENGTH = 1;
const MAX_MATCH_LENGTH = 100;

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    name: 'computer',

    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    }
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    name: 'human',

    choose() {
      let choice;

      while (true) {
        console.log('\nPlease choose rock, paper, or scissors:');
        choice = readline.question('=> ');
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    }
  };

  return Object.assign(playerObject, humanObject);
}

function createPlayer() {
  return {
    name: null,
    move: null,
    wins: 0
  };
}

// function createMove() {
//   return {
//     // possible state: type of move (paper, rock, scissors)
//   };
// }

// function createRule() {
//   return {
//     // possible state? not clear whether Rules need state
//   };
// }

// // Since we don't yet know where to put `compare`, let's define
// // it as an ordinary function.
// let compare = function(move1, move2) {
//   // not yet implemented
// };

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  gamesPlayedInMatch: 0,
  winsNeeded: null,
  gameWinner: null,
  matchWinner: null,

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  getWinsNeeded() { // get match length from user (best-of-n)
    let matchLength;
    let invalidMsg = "\nSorry, that's not a valid choice.  Pick a number between " +
      ` ${MIN_MATCH_LENGTH} and ${MAX_MATCH_LENGTH} and press <enter>:`;

    console.log(`\nMatch Length: How many games must you win to take the match?`);
    while (true) {
      matchLength = Number(readline.question(`=> First to `).replace(/[^\d]/g, ''));

      // verify match length
      if (matchLength >= MIN_MATCH_LENGTH
        && matchLength <= MAX_MATCH_LENGTH) {
        break;
      } else {
        console.log(invalidMsg);
      }
    }

    console.log(`Game on.  Good luck!`);
    this.winsNeeded = matchLength;
  },

  displayMoves() {
    console.log(`\nYou chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}\n`);
  },

  getWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (humanMove === computerMove) {
      this.gameWinner = null;
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
              (humanMove === 'paper' && computerMove === 'scissors') ||
              (humanMove === 'scissors' && computerMove === 'rock')) {
      this.gameWinner = this.computer;
    } else {
      this.gameWinner = this.human;
    }
  },

  displayWinner() {
    if (!this.gameWinner) {
      console.log(`It's a tie!`);
    } else {
      console.log((this.gameWinner.name === 'human' ? 'You win!' : 'Computer wins!'));
    }
  },

  updateScore() {
    this.gamesPlayedInMatch += 1;

    if (this.gameWinner) this.gameWinner.wins += 1;
  },

  displayScore() {
    let humanWins = this.human.wins;
    let computerWins = this.computer.wins;
    let ties = this.gamesPlayedInMatch - (humanWins + computerWins);

    let scoreboardIntro = `Current Score:`;
    scoreboardIntro += `\n${'='.repeat(14)}`;

    console.log(`\n${scoreboardIntro}`);
    console.log(`Player:    ${humanWins} ${(humanWins === 1 ? 'win' : 'wins')}`);
    console.log(`Computer:  ${computerWins} ${(computerWins === 1 ? 'win' : 'wins')}`);
    console.log(`Ties:      ${ties} ${(ties === 1 ? 'tie' : 'ties')}`);
  },

  playAgain() {
    console.log('\nWould you like to play again? (y/n)');
    let answer = readline.question('=> ');
    return answer.toLowerCase()[0] === 'y';
  },

  someoneWonMatch() {
    return [this.human.wins, this.computer.wins].includes(this.winsNeeded);
  },

  getMatchWinner() {
    if (this.human.wins === this.winsNeeded) {
      this.matchWinner = this.human;
    } else {
      this.matchWinner = this.computer;
    }
  },

  displayMatchWinner() {
    let winner = (this.matchWinner.name === 'human') ? 'You' : 'Computer';
    let winnerText = `${winner} ${(winner === 'You' ? 'are' : 'is')} `
      + `the first to win ${this.winsNeeded} games and `
      + `${(winner === 'You' ? 'win' : 'wins')} the match!`;

    console.log(`\n${winnerText}`);
  },

  clearMatchInfo() {
    this.winsNeeded = null;
    this.matchWinner = null;
    this.gamesPlayedInMatch = 0;
    this.human.wins = 0;
    this.computer.wins = 0;
  },

  displayGameplay() {
    this.displayMoves();
    this.displayWinner();
  },

  getMoves() {
    this.human.choose();
    this.computer.choose();
  },

  play() {
    this.displayWelcomeMessage();
    this.getWinsNeeded();

    while (true) {
      this.getMoves();
      this.getWinner();
      this.displayGameplay();
      this.updateScore();
      this.displayScore();

      if (this.someoneWonMatch()) {
        this.getMatchWinner();
        this.displayMatchWinner();
        this.clearMatchInfo();
      }

      if (!this.playAgain()) break;
      if (!this.winsNeeded) this.getWinsNeeded();
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
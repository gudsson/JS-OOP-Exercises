/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/////////////////////////////////////////
// Object-Oriented Rock-Paper-Scissors //
/////////////////////////////////////////

const readline = require('readline-sync');
const MIN_MATCH_LENGTH = 1;
const MAX_MATCH_LENGTH = 100;

function createPlayer() {
  // const CHOICES1 = [69];
  return {
    name: null,
    move: null,
    wins: 0,
    moveHistory: [],
    addMove(gameWinner = null) {
      this.moveHistory.push([this.move, (gameWinner) ? gameWinner.name : null]);
    }
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    name: 'computer',
    weights: {},

    choose(moveOptions) {
      let randomIndex = Math.floor(Math.random() * moveOptions.length);
      this.move = moveOptions[randomIndex];
      console.log(this.calculateWeights(moveOptions));
    },

    calculateWeights(moveOptions) {
      const DEFAULT_WEIGHT = 1 / moveOptions.length;
      const MIN_WEIGHT = DEFAULT_WEIGHT / 2;

      let weights = moveOptions.map(move => {
        let moveOccurences = this.moveHistory.filter(arr => {
          return arr[0] === move;
        });
        let humanWins = moveOccurences.filter(arr => {
          return arr[1] === 'human';
        }).length;

        let weight = Math.max(MIN_WEIGHT, (humanWins / moveOccurences || 0));

        return weight;
      });

      return weights;
    }
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    name: 'human',

    choose(moveOptions) {
      let choice;

      while (true) {
        console.log('\nPlease choose rock, paper, scissors, lizard, or spock:');
        choice = readline.question('=> ');
        if (moveOptions.includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    }
  };

  return Object.assign(playerObject, humanObject);
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
  gameWinners: [],
  matchWinner: null,

  displayWelcomeMessage(subtitle = "") {
    let title = 'Welcome to Rock, Paper, Scissors, LIZARD, SPOCK!';
    let maxLen = title.length + 2;
    let border = `+${'-'.repeat(maxLen)}+`;
    console.clear();

    console.log(border);
    console.log(`|${' '.repeat(maxLen)}|`);
    console.log(`| ${title} |`);
    if (subtitle) {
      console.log(`| ${'-'.repeat(title.length)} |`);
      console.log(`|${subtitle.padStart((maxLen + subtitle.length) / 2, " ")
        .padEnd(maxLen, ' ')}|`);
    }
    console.log(`|${' '.repeat(maxLen)}|`);
    console.log(border);
  },

  displayGoodbyeMessage() {
    console.log('\nThanks for playing Rock, Paper, Scissors, Lizard, Spock. Goodbye!');
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

    this.winsNeeded = matchLength;
  },

  displayMoves() {
    console.log(`\nYou chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}\n`);
  },

  getWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    let movesDefeatedBy = {
      rock: ['lizard', 'scissors'],
      paper: ['rock', 'spock'],
      scissors: ['paper', 'lizard'],
      lizard: ['spock', 'paper'],
      spock: ['rock', 'scissors']
    };

    if (humanMove === computerMove) {
      this.gameWinner = null;
    } else if ((computerMove === 'rock' && movesDefeatedBy.rock.includes(humanMove)) ||
              (computerMove === 'paper' && movesDefeatedBy.paper.includes(humanMove)) ||
              (computerMove === 'scissors' && movesDefeatedBy.scissors.includes(humanMove)) ||
              (computerMove === 'lizard' && movesDefeatedBy.lizard.includes(humanMove)) ||
              (computerMove === 'spock' && movesDefeatedBy.spock.includes(humanMove))) {
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

  getScoreline() {
    let scoreline = `First to ${this.winsNeeded} wins | Player ${this.human.wins}`
      + ` v. Computer ${this.computer.wins}`;
    return scoreline;
  },

  displayHistory() {
    let title = 'Matchup History: Player v. Computer';
    let humanMoves = this.human.moveHistory;
    let computerMoves = this.computer.moveHistory;
    let moveArr = [];

    console.log(`\n${title}\n${'='.repeat(title.length)}`);

    // combine move history with winner array
    for (let idx = 0; idx < humanMoves.length; idx++) {
      moveArr.push({
        id: (idx + 1),
        player: humanMoves[idx][0],
        computer: computerMoves[idx][0],
        result: this.gameWinners[idx],
      });
    }

    moveArr.forEach(game => {
      let playerMove = game.result === 'human' ? game.player.toUpperCase() : game.player;
      let computerMove = game.result === 'computer' ? game.computer.toUpperCase() : game.computer;

      console.log(`      Game ${game.id}:  ${playerMove} v. ${computerMove}`);
    });

    console.log('===');
    console.log(this.computer.moveHistory);
  },

  addToWinnerHistory() {
    let winner = null;

    if (this.gameWinner) {
      winner = this.gameWinner.name;
    }

    this.gameWinners.push(winner);
  },

  playAgain() {
    let answer;

    while (true) {
      console.log('\nWould you like to play again? (y/n)');
      answer = readline.question('=> ').toLowerCase();
      if (['y', 'n'].includes(answer[0])) break;
      console.log('Sorry, invalid choice.');
    }

    return answer[0] === 'y';
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
    const CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    this.human.choose(CHOICES);
    this.computer.choose(CHOICES);
  },

  recordMoves() {
    this.human.addMove();
    this.computer.addMove(this.gameWinner);
  },

  play() {
    this.displayWelcomeMessage();
    this.getWinsNeeded();

    while (true) {
      this.displayWelcomeMessage(this.getScoreline());
      this.getMoves();
      this.getWinner();
      this.updateScore();
      this.displayWelcomeMessage(this.getScoreline());
      this.displayGameplay();
      this.recordMoves();
      this.addToWinnerHistory();
      this.displayHistory();

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
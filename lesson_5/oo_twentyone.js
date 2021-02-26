///////////////////
// OO Twenty-One //
///////////////////

const readline = require('readline-sync');

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.hide = false;
  }

  static SUITS = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];

  static RANKS = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    Jack: 10,
    Queen: 10,
    King: 10,
    Ace: 11
  }

  static MAX_ACE_VALUE = Card.RANKS.Ace;
  static MIN_ACE_VALUE = 1;

  getCardName() {
    return (this.hide) ? `an unknown card` : `${this.rank} of ${this.suit}`;
  }

  getRank() {
    return this.rank;
  }

  isAce() {
    return this.rank === 'Ace';
  }

  isHidden() {
    return this.hide;
  }

  getCardValue() {
    return (this.isHidden()) ? 0 : Card.RANKS[this.rank];
  }

  hideCard() {
    this.hide = true;
  }

  unhideCard() {
    this.hide = false;
  }
}

class Deck {
  constructor() {
    this.cardsInDeck = [];
    this.buildDeck();
  }

  buildDeck() {
    Object.keys(Card.RANKS).forEach(rank => {
      Card.SUITS.forEach(suit => {
        let newCard = new Card(rank, suit);
        this.cardsInDeck.push(newCard);
      });
    });
  }

  countRemainingCards() {
    return this.cardsInDeck.length;
  }

  dealCard() {
    let randomCardIdx = Math.floor(this.countRemainingCards() * Math.random());
    return this.cardsInDeck.splice(randomCardIdx, 1)[0];
  }
}

class Hand {
  constructor(owner) {
    this.hand = [];
    this.handValue = null;
    this.owner = owner;
  }

  clearHand() {
    this.hand = [];
  }

  takeCard(card) {
    this.hand.push(card);
  }

  joinOr(choices, separator = ', ', outro = 'and') {
    if (choices.length === 1) return choices.toString();
    return `${choices.slice(0, -1).join(separator)} ${outro} ${choices.slice(-1)}`;
  }

  getHandDescription() {
    let cardNames = this.hand.map(card => card.getCardName());
    return `${this.getName()} has: ${this.joinOr(cardNames)}`;
  }

  sumRawHandValue() {
    return this.hand.map(card => {
      return card.getCardValue();
    }).reduce((total, current) => total + current, 0);
  }

  updateHandValue(bustThreshold = null) {
    this.handValue = this.sumRawHandValue();

    if (bustThreshold && this.handValue > bustThreshold) {
      this.aceAdjustment(bustThreshold);
    }
  }

  countAces() {
    return this.hand.filter(card => card.isAce()).length;
  }

  hit(card) {
    this.takeCard(card);
  }

  getHandValue() {
    return this.handValue;
  }

  aceAdjustment(bustThreshold) {
    for (let idx = 0; idx < this.countAces(); idx++) {
      this.handValue -= (Card.MAX_ACE_VALUE - Card.MIN_ACE_VALUE);
      if (this.handValue <= bustThreshold) break;
    }
  }

  getName() {
    return this.owner;
  }
}

class PlayerHand extends Hand {
  constructor() {
    super('Player');
    this.wallet = PlayerHand.STARTING_CASH;
  }

  static STARTING_CASH = 5;
  static WINNING_THRESHOLD = 2 * PlayerHand.STARTING_CASH;
  static BET_AMOUNT = 1;

  showHand() {
    console.log(`${this.getHandDescription()} (Total of ${this.handValue}).`);
  }

  getCashOnHand() {
    return this.wallet;
  }

  showCashOnHand() {
    console.log(`$${this.getCashOnHand()}`);
  }

  addWinnings() {
    this.wallet += PlayerHand.BET_AMOUNT;
  }

  subtractBet() {
    this.wallet -= PlayerHand.BET_AMOUNT;
  }

  isBroke() {
    return this.wallet <= 0;
  }

  isRich() {
    return this.wallet >= PlayerHand.WINNING_THRESHOLD;
  }
}

class DealerHand extends Hand {
  constructor() {
    super('Dealer');
  }

  static HIT_THRESHOLD = 17;

  hideHoleCard() {
    this.hand[1].hideCard();
  }

  showHoleCard() {
    this.hand[1].unhideCard();
  }

  isHoleHidden() {
    return this.hand[1].isHidden();
  }

  showHand() {
    let scorePrefix = (this.isHoleHidden()) ? 'Showing' : 'Total of';
    console.log(`${this.getHandDescription()} (${scorePrefix} ${this.handValue}).`);
  }
}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.player = new PlayerHand();
    this.dealer = new DealerHand();
  }

  static HIT = 'h';
  static STAY = 's';
  static BUST_THRESHOLD = 21;

  start() {
    this.displayWelcomeMessage();

    while (true) {
      this.playSingleHand();
      if (this.financialExit()) {
        this.displayFinancialGoodbyeMessage();
        break;
      }
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  }

  playSingleHand() {
    this.openingDeal();
    this.showHands();

    this.playerTurn();

    if (!this.isBusted(this.player)) {
      this.dealerTurn();
    }

    this.updateCashOnHand();
    this.showHands();
    this.displayResult();
  }

  financialExit() {
    return (this.player.isBroke() || this.player.isRich());
  }

  getWinner() {
    if (this.isBusted(this.player)) return this.dealer;
    if (this.isBusted(this.dealer)) return this.player;

    let playerScore = this.player.getHandValue();
    let dealerScore = this.dealer.getHandValue();

    if (playerScore > dealerScore) return this.player;
    if (playerScore < dealerScore) return this.dealer;
    return null;
  }

  updateCashOnHand() {
    let winner = this.getWinner();

    if (winner === this.player) {
      this.player.addWinnings();
    } else if (winner === this.dealer) {
      this.player.subtractBet();
    }
  }

  openingDeal() {
    this.resetGame();
    this.dealCards();
    this.dealer.hideHoleCard();
  }

  resetGame() {
    this.deck = new Deck();
    this.resetHands();
  }

  resetHands() {
    this.player.clearHand();
    this.dealer.clearHand();
  }

  dealCards() {
    for (let idx = 0; idx < 2; idx++) {
      this.player.takeCard(this.deck.dealCard());
      this.dealer.takeCard(this.deck.dealCard());
    }
  }

  updateHands(arrayOfPlayers) {
    arrayOfPlayers.forEach(person => {
      person.updateHandValue(TwentyOneGame.BUST_THRESHOLD);
    });
  }

  showHands() {
    this.updateHands([this.player, this.dealer]);
    this.printCashInfo();
    this.dealer.showHand();
    this.player.showHand();
  }

  playerTurn() {
    while (this.hitOrStay() === TwentyOneGame.HIT) {
      this.hit(this.player);
      if (this.isBusted(this.player)) break;
    }
  }

  dealerTurn() {
    this.dealer.showHoleCard();
    console.clear();
    this.showHands();

    while (this.dealer.getHandValue() < DealerHand.HIT_THRESHOLD) {
      this.continuationPrompt(`Press <enter> for Dealer's move...`);
      this.hit(this.dealer);
    }
  }

  isBusted(player) {
    return player.getHandValue() > TwentyOneGame.BUST_THRESHOLD;
  }

  hitOrStay() {
    let answer;

    while (true) {
      console.log(`\nDo you want to hit [h] or stay [s]?`);
      answer = readline.question('=> ').toLowerCase();

      if ([TwentyOneGame.HIT, TwentyOneGame.STAY].includes(answer)) break;
      console.log('\nInvalid response.');
    }

    return answer;
  }

  printCashInfo() {
    console.clear();
    console.log(`The buy-in is $${PlayerHand.BET_AMOUNT} `
      + `| You have $${this.player.getCashOnHand()} remaining.\n`);
  }

  hit(player) {
    console.log(`${player.getName()} hits!`);
    player.hit(this.deck.dealCard());
    player.updateHandValue(TwentyOneGame.BUST_THRESHOLD);

    console.clear();
    this.showHands();
  }

  playAgain() {
    let answer;

    while (true) {
      console.log("\nWould you like to play again? ('y' or 'n')");
      answer = readline.question("=> ").toLowerCase();

      if (['y', 'n'].includes(answer)) break;

      console.log('\nSorry, invalid choice');
    }

    return answer === 'y';
  }

  continuationPrompt(text) {
    readline.question(`\n${text}`);
  }

  displayWelcomeMessage() {
    console.clear();
    let title = "Welcome to Twenty-One!";
    let horizontalBorder = `+${'-'.repeat(title.length + 2)}+`;

    console.log(horizontalBorder);
    console.log(`| ${title.toUpperCase()} |`);
    console.log(horizontalBorder);

    console.log(`\nClosest to ${TwentyOneGame.BUST_THRESHOLD} without `
      + `going over wins the hand. Good luck!`);

    this.continuationPrompt(`Press <enter> to continue...`);
  }

  displayFinancialGoodbyeMessage() {
    if (this.player.isBroke()) {
      console.log(`\nYou're broke. Game Over. Now get out!`);
    } else if (this.player.isRich()) {
      console.log(`\nYou're now rich. Your success has bankrupted our casino.  Now get out!`);
    }
  }

  displayResult() {
    let playerScore = this.player.getHandValue();
    let dealerScore = this.dealer.getHandValue();

    console.log(``);

    if (this.isBusted(this.player)) {
      printWithBorders(`YOU LOSE! You BUST (${playerScore} > ${TwentyOneGame.BUST_THRESHOLD}).`);
    } else if (this.isBusted(this.dealer)) {
      printWithBorders(`YOU WIN! Dealer BUSTS (${dealerScore} > ${TwentyOneGame.BUST_THRESHOLD}).`);
    } else if (playerScore > dealerScore) {
      printWithBorders(`YOU WIN! Your score of ${playerScore} beats the Dealer's ${dealerScore}.`);
    } else if (playerScore < dealerScore) {
      printWithBorders(`YOU LOSE! Dealer's score of ${dealerScore} beats the your measly ${playerScore}.`);
    } else {
      printWithBorders(`Push! Game ends in a draw (Total of ${playerScore} a piece).`);
    }

    function printWithBorders(text) {
      let border = '='.repeat(text.length);
      console.log(`${border}\n${text}\n${border}`);
    }
  }

  displayGoodbyeMessage() {
    console.log("\nThanks for playing Tic Tac Toe!  Goodbye!");
  }
}

let game = new TwentyOneGame();
game.start();
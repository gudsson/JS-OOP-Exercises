///////////////////
// OO Twenty-One //
///////////////////

// Game (n)
//      start (v)
// Deck (n)
//      deal (v) (should this be here, or in Dealer?)
// Card (n)
// Participant (n)
// Player (n)
//      hit (v)
//      stay (v)
//      bust (state)
//      Score (n, state)
// Dealer (n)
//      hit (v)
//      stay (v)
//      deal (v) (should this be here, or in Deck?)
//      bust (state)
//      Score (n, state)

const readline = require('readline-sync');

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.hide = false;
  }

  static SUITS = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];

  static RANKS = {
    // 2: 2,
    // 3: 3,
    // 4: 4,
    // 5: 5,
    // 6: 6,
    // 7: 7,
    // 8: 8,
    // 9: 9,
    // 10: 10,
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
    return (this.hide) ? 0 : Card.RANKS[this.rank];
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

class Participant {
  constructor() {
    this.hand = [];
    this.handValue = 0;
  }

  // dealHand() {
  //   this.hand
  // }
  takeCard(card) {
    this.hand.push(card);
  }

  joinOr(choices, separator = ', ', outro = 'and') {
    if (choices.length === 1) return choices.toString();
    return `${choices.slice(0, -1).join(separator)} ${outro} ${choices.slice(-1)}`;
  }

  showHand() {
    let cardNames = this.hand.map(card => card.getCardName());
    let scorePrefix = (this.hand.some(card => card.isHidden())) ? 'Showing' : 'Total of';
    this.updateRawHandValue();

    console.log(`${this.constructor.name} has: `
      + `${this.joinOr(cardNames)} (${scorePrefix} ${this.handValue}).`);
  }

  updateRawHandValue() {
    this.handValue = this.hand.map(card => {
      return card.getCardValue();
    }).reduce((total, current) => total + current, 0);
  }

  countAces() {
    return this.hand.filter(card => card.isAce()).length;
  }

  hit(card) {
    this.takeCard(card);
  }

  stay() {
    //STUB
  }

  bust() {
    //STUB
  }

  getHandValue(bustThreshold = null) {
    if (bustThreshold && this.handValue > bustThreshold) {
      this.aceAdjustment(bustThreshold);
    }
    // this.aceAdjustment();

    return this.handValue;
  }

  aceAdjustment(bustThreshold) {
    for (let idx = 0; idx < this.countAces(); idx++) {
      this.handValue -= (Card.MAX_ACE_VALUE - Card.MIN_ACE_VALUE);
      if (this.handValue <= bustThreshold) break;
    }
  }

  score() {
    //STUB
  }
}

class Player extends Participant {
  constructor() {
    super();
    this.wallet = Player.STARTING_CASH;
  }

  static STARTING_CASH = 5;
  static WINNING_THRESHOLD = 2 * Player.STARTING_CASH;
  static BET_AMOUNT = 1;

  getCashOnHand() {
    return this.wallet;
  }

  showCashOnHand() {
    console.log(`$${this.getCashOnHand}`);
  }

  placeBet() {
    this.wallet -= Player.BET_AMOUNT;
  }

  addWinnings() {
    this.wallet += Player.BET_AMOUNT * 2;
  }

  isBroke() {
    return this.wallet <= 0;
  }

  isRich() {
    return this.wallet >= Player.WINNING_THRESHOLD;
  }
}

class Dealer extends Participant {
  constructor() {
    super();
  }

  static HIT_THRESHOLD = 17;

  hideHoleCard() {
    this.hand[1].hideCard();
  }

  showHoleCard() {
    this.hand[1].unhideCard();
  }
}

class TwentyOneGame {
  constructor() {
    //STUB
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  static HIT = 'h';
  static STAY = 's';
  static BUST_THRESHOLD = 21;

  start() {
    //SPIKE
    this.displayWelcomeMessage();

    //playSingleHand
    while (true) {
      this.playSingleHand();
      // if (this.player.isBroke() || this.player.isRich()) break;
      if (!this.playAgain()) break;
    }


    this.displayResult();
    this.displayGoodbyeMessage();
  }

  playSingleHand() {
    while (true) {
      this.dealCards();
      this.showCards();
      this.playerTurn();
      // this.dealerTurn();
      let pause = readline.question();
      if (pause) break;
    }
  }

  dealCards() {
    for (let idx = 0; idx < 2; idx++) {
      this.player.takeCard(this.deck.dealCard());
      this.dealer.takeCard(this.deck.dealCard());
    }

    this.dealer.hideHoleCard();
  }

  showCards() {
    //STUB
    this.dealer.showHand();
    this.player.showHand();
    // this.deck.cardsInDeck.forEach(card => {
    //   console.log(card.getCardName());
    // });
  }

  playerTurn() {
    // console.log(this.hitOrStay()); ///
    while (this.hitOrStay() === TwentyOneGame.HIT) {
      this.hit(this.player);
      if (this.isBusted(this.player)) break;
    }
  }

  isBusted(player) {
    let handValue = player.getHandValue(TwentyOneGame.BUST_THRESHOLD);
    return handValue > TwentyOneGame.BUST_THRESHOLD;
  }

  // calculateHandScore(player) {
  //   player.
  // }

  hitOrStay() { //DONE
    let answer;

    while (true) {
      console.log(`\nDo you want to hit [h] or stay [s]?`);
      answer = readline.question('=> ').toLowerCase();

      if ([TwentyOneGame.HIT, TwentyOneGame.STAY].includes(answer)) break;
      console.log('\nInvalid response.');
    }

    return answer;
  }

  hit(player) {
    player.hit(this.deck.dealCard());
    console.log(`${player.constructor.name} hits!`);
    //check if busted

    console.log('hit!');
    this.showCards();
  }

  dealerTurn() {
    //STUB
  }

  displayWelcomeMessage() { //DONE
    console.clear();
    let title = "Welcome to Twenty-One!";
    let horizontalBorder = `+${'-'.repeat(title.length + 2)}+`;

    console.log(horizontalBorder);
    console.log(`| ${title.toUpperCase()} |`);
    console.log(horizontalBorder);
    console.log("");
  }

  displayGoodbyeMessage() { //DONE
    console.log("\nThanks for playing Tic Tac Toe!  Goodbye!");
  }

  displayResult() {
    //STUB
  }

  playAgain() { //DONE
    let answer;

    while (true) {
      console.log("Would you like to play again? ('y' or 'n')");
      answer = readline.question("=> ").toLowerCase();

      if (['y', 'n'].includes(answer)) break;

      console.log('\nSorry, invalid choice');
    }

    return answer === 'y';
  }
}

let game = new TwentyOneGame();
game.start();
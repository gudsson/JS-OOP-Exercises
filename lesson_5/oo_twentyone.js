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

  getCardName() {
    return `${this.rank} of ${this.suit}`;
  }

  getRank() {
    return this.rank;
  }

  isAce() {
    return this.rank === 'Ace';
  }

  getPointValue() {
    return null;
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

  displayHand() {
    //STUB
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
  }

  bust() {
    //STUB
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

  showHoleCard() {

  }

  hideHoleCard() {}
}

class TwentyOneGame {
  constructor() {
    //STUB
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

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
    this.dealCards();
    this.showCards();
    // this.playerTurn();
    // this.dealerTurn();
    let pause = readline.question();
  }

  dealCards() {
    for (let idx = 0; idx < 2; idx++) {
      this.player.takeCard(this.deck.dealCard());
      this.dealer.takeCard(this.deck.dealCard());
    }
  }

  showCards() {
    //STUB
    console.log(this.player.hand);
    console.log(this.dealer.hand);
    // this.deck.cardsInDeck.forEach(card => {
    //   console.log(card.getCardName());
    // });
  }

  playerTurn() {
    //STUB
  }

  dealerTurn() {
    //STUB
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Twenty-One!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("\nThanks for playing Tic Tac Toe!  Goodbye!");
  }

  displayResult() {
    //STUB
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
}

let game = new TwentyOneGame();
game.start();
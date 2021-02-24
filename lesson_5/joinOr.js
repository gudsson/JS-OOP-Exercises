

class TTTGame {
  constructor() {
    this.validChoices = [ 7];
  }

  joinOr(choices, separator = ', ', outro = 'or') {
    if (choices.length === 1) return choices.toString();
    return `${choices.slice(0, -1).join(separator)} ${outro} ${choices.slice(-1)}`;
  }

  play() {
    console.log(this.joinOr(this.validChoices));
  }
}

let game = new TTTGame();
game.play();
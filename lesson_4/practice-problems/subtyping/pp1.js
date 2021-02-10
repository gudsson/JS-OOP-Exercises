// Suppose we have the following classes:

class Game {
  play() {
    return 'Start the game!';
  }
}

class Bingo extends Game {
  rulesOfPlay() {
    // rules of play
  }
}

// What would happen if we added a play method to the Bingo class, keeping in
// mind that there is already a method of this name in the Game class from
// which the Bingo class inherits? Explain your answer. What do we call it
// when we define a method like this?

// If we add a new play method to the Bingo class, objects created by Bingo will
// use that method instead of looking up the prototype chain and finding it in
// the Game class. As soon as JavaScript finds a method, it calls it. When a 
// class redefines a method that a superclass defines.
// We call this "method overriding."


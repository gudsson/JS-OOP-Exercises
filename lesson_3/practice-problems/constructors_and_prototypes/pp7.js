// In this problem, we'll ask you to create a new instance of an
// object, without having direct access to the constructor function:

let ninjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else
let ninjaB = new ninjaA.constructor();

console.log(ninjaA.constructor === ninjaB.constructor); // => true

// Hint
// The value assigned to ninjaA is an object created by a constructor
// function. As such, this object has a constructor property that
// points back to its constructor. Think of a way to use this
// property; that should help lead you to a solution.
function Greeting() {}

Greeting.prototype.greet = function(message) {
  console.log(message);
};

function Hello() {}

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function() {
  this.greet('Hello!');
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function() {
  this.greet("Goodbye");
};

// Case 1
// let hello = new Hello();
// hello.hi();
// => 'Hello!'

// Case 2
// let hello = new Hello();
// hello.bye();
// => Error (TypeError)

// Case 3
// let hello = new Hello();
// hello.greet();
// => undefined

// Case 4
// let hello = new Hello();
// hello.greet('Goodbye');
// => 'Goodbye'

// Case 5
// Hello.hi();
// => TypeError
//////////////////////////
// Name the Constructor //
//////////////////////////

// Update the following code so that, instead of logging the values, each
// statement logs the name of the constructor to which it belongs.

console.log("Hello".constructor.name);
console.log([1,2,3].constructor.name);
console.log({name: 'Srdjan'}.constructor.name);

// Expected output:
// => String
// => Array
// => Object

// Discussion
// The constructor property returns a reference to the Object constructor
// function that created the instance object. This constructor function
// has access to name property which returns the function's name as
// specified when it was created.
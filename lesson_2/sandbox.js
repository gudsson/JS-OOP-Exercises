function Dog(name, breed, weight) {
  // Object.setPrototypeOf(this, Dog.myPrototype);
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.myPrototype = {
  bark() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  }
};

let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);
// maxi.bark(); // 'Woof!'

console.log(Object.keys(maxi));

console.log(maxi.hasOwnProperty('myPrototype')); // false
console.log(dexter.hasOwnProperty('bark')); // false
console.log(biggie.hasOwnProperty('bark')); // false
// Object.getPrototypeOf(maxi).bark === Dog.myPrototype.bark; // true
// Object.getPrototypeOf(dexter).bark === Dog.myPrototype.bark; // true
// Object.getPrototypeOf(biggie).bark === Dog.myPrototype.bark; // true